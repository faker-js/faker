<script lang="ts" setup>
import membersData from './members.json';
import TeamMember from './TeamMember.vue';
</script>

<template>
  <div class="TeamPage">
    <h2>Core Team</h2>
    <TeamMember
      v-for="member in membersData.core"
      :key="member.name"
      :member="member"
    />

    <h2>Contributors</h2>
    <TeamMember
      v-for="member in membersData.contributors"
      :key="member.name"
      :member="member"
    />

    <h2>Honorable previous members</h2>
    <TeamMember
      v-for="member in membersData.previous"
      :key="member.name"
      :member="member"
    />
  </div>
</template>
