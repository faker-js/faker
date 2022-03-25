<script lang="ts" setup>
import membersData from './members.json';
import TeamMember from './TeamMember.vue';
</script>

<template>
  <div class="TeamPage">
    <TeamMember
      v-for="member in membersData"
      :key="member.name"
      :member="member"
    />
  </div>
</template>
