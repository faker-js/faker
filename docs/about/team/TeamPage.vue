<script lang="ts" setup>
import membersData from './members.json';
import TeamMember from './TeamMember.vue';
</script>

<template>
  <div class="TeamPage">
    <div class="core">
      <h2>Core Team</h2>
      <div class="members">
        <TeamMember
          v-for="member in membersData.core"
          :key="member.name"
          :member="member"
        />
      </div>
    </div>

    <div class="contributors">
      <h2>Contributors</h2>
      <div class="members">
        <TeamMember
          v-for="member in membersData.contributors"
          :key="member.name"
          :member="member"
        />
      </div>
    </div>

    <div class="previous">
      <h2>Honorable previous members</h2>
      <div class="members">
        <TeamMember
          v-for="member in membersData.previous"
          :key="member.name"
          :member="member"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.TeamPage .members {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.TeamPage .members .TeamMember {
  width: 50%;
}

@media (max-width: 120rem) {
  .TeamPage .members .TeamMember {
    width: 100%;
  }
}
</style>
