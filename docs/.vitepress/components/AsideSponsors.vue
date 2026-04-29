<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import type { Sponsor } from 'vitepress/dist/client/theme-default/components/VPSponsorsGrid.vue';
import { VPDocAsideSponsors } from 'vitepress/theme';
import { computed, onMounted } from 'vue';

/**
 * @see https://graphql-docs-v2.opencollective.com/types/Member
 */
interface Backer {
  account: {
    name: string | null;
    slug: string;
    imageUrl: string | null;
  };
  since: string;
  isActive: boolean;
  totalDonations: {
    value: number | null;
    currency: string | null;
    valueInCents: number | null;
  };
}

const backersStorage = useLocalStorage<{
  lastUpdated: number;
  lastFailedAt?: number;
  backers: Backer[];
}>('fakerjs-backers', {
  lastUpdated: 0,
  backers: [],
});

const sponsors = computed<Sponsor[]>(
  () =>
    backersStorage.value?.backers
      .filter((backer) => backer.account.imageUrl)
      .map((backer) => ({
        name: backer.account.name ?? backer.account.slug,
        img: backer.account.imageUrl!,
        url: `https://opencollective.com/${backer.account.slug}`,
      }))
      .slice(0, 10) || []
);

async function fetchBackers(): Promise<Backer[]> {
  const response = await fetch('https://api.opencollective.com/graphql/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      operationName: 'GetFakerJSDonations',
      query: `query GetFakerJSDonations {
  account(slug: "fakerjs") {
    name
    slug
    members(role: BACKER, limit: 1000) {
      totalCount
      nodes {
        account {
          name
          slug
          imageUrl
        }
        since
        isActive
        totalDonations {
          value
          currency
          valueInCents
        }
      }
    }
  }
}
`,
      variables: {},
    }),
  }).then((res) => res.json());

  return (response.data.account.members.nodes as Backer[]).toSorted(
    (a, b) =>
      (b.totalDonations.valueInCents ?? 0) -
      (a.totalDonations.valueInCents ?? 0)
  );
}

// OpenCollective's unauthenticated GraphQL quota is 10 requests/minute,
// so back off for a minute after a failure.
const FAILURE_BACKOFF_MS = 60 * 1000;

onMounted(async () => {
  // Refresh every start of the month
  const now = new Date();
  const lastUpdated = new Date(backersStorage.value.lastUpdated);
  const recentlyFailed =
    Date.now() - (backersStorage.value.lastFailedAt ?? 0) < FAILURE_BACKOFF_MS;
  if (
    !recentlyFailed &&
    (backersStorage.value.backers.length === 0 ||
      now.getFullYear() !== lastUpdated.getFullYear() ||
      now.getMonth() !== lastUpdated.getMonth())
  ) {
    try {
      const backers = await fetchBackers();
      backersStorage.value = {
        lastUpdated: Date.now(),
        backers,
      };
    } catch {
      // Cache the failure so we don't burn the OpenCollective quota
      // on every page load while the API is unavailable.
      backersStorage.value = {
        ...backersStorage.value,
        lastFailedAt: Date.now(),
      };
    }
  }
});
</script>

<template>
  <VPDocAsideSponsors
    v-if="sponsors.length > 0"
    tier="Top 10 Sponsors"
    size="xmini"
    :data="sponsors"
  />
</template>
