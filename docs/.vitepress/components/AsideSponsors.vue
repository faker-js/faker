<script setup lang="ts">
import type { Sponsors } from 'vitepress/dist/client/theme-default/components/VPSponsors.vue';
import { VPDocAsideSponsors } from 'vitepress/theme';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { bronze, gold, individuals, silver } from './sponsors.json';

const sponsors: Ref<Sponsors[]> = ref([
  { tier: 'Individuals (>>$500)', size: 'big', items: individuals },
  { tier: 'Gold ($500)', size: 'small', items: gold },
  { tier: 'Silver ($250)', size: 'mini', items: silver },
  { tier: 'Bronze ($100)', size: 'xmini', items: bronze },
]);
</script>

<template>
  <VPDocAsideSponsors :data="sponsors" />
</template>
