<script setup lang="ts">
import {
  VPTeamMembers,
  VPTeamPage,
  VPTeamPageSection,
  VPTeamPageTitle,
} from 'vitepress/theme';
import { contributors, core, emeriti } from './members.json';
</script>

<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>Meet the Team</template>
      <template #lead>
        The development of Faker is guided by an international team, some of
        whom have chosen to be featured below.
      </template>
    </VPTeamPageTitle>

    <VPTeamMembers :members="core" />

    <VPTeamPageSection>
      <template #title>Team Contributors</template>
      <template #members>
        <VPTeamMembers :members="contributors" />
      </template>
    </VPTeamPageSection>

    <VPTeamPageSection>
      <template #title>Team Emeriti</template>
      <template #lead>
        Here we honor some no-longer-active team members who have made valuable
        contributions in the past.
      </template>
      <template #members>
        <VPTeamMembers size="small" :members="emeriti" />
      </template>
    </VPTeamPageSection>
  </VPTeamPage>
</template>
