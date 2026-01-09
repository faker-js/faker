<script setup lang="ts">
import type { Sponsors } from 'vitepress/dist/client/theme-default/components/VPSponsors.vue';
import { VPDocAsideSponsors } from 'vitepress/theme';
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { bronze, gold, individuals, silver } from './sponsors.json';

const sponsors: Ref<Sponsors[]> = ref([
  { tier: 'Individuals (>>$500)', size: 'big', items: individuals },
  { tier: 'Gold ($500)', size: 'small', items: gold },
  { tier: 'Silver ($250)', size: 'mini', items: silver },
  { tier: 'Bronze ($100)', size: 'xmini', items: bronze },
]);

onMounted(async () => {
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
        }
        since
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

  const sorted = response.data.account.members.nodes.toSorted(
    (a, b) => b.totalDonations.valueInCents - a.totalDonations.valueInCents
  );

  console.log(sorted.slice(0, 10));
});
</script>

<template>
  <VPDocAsideSponsors :data="sponsors" />
</template>
