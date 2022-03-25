<script lang="ts" setup>
import type { Member } from './TeamMember';

defineProps<{ member: Member }>();
</script>

<template>
  <div class="TeamMember">
    <b>{{ member.name }}</b>
    <br />
    <a v-if="member.github" :href="'https://github.com/' + member.github">
      GitHub
    </a>
    <span v-if="member.gitlab">|</span>
    <a v-if="member.gitlab" :href="'https://gitlab.com/' + member.gitlab">
      GitLab
    </a>
    <span v-if="member.twitter">|</span>
    <a v-if="member.twitter" :href="'https://twitter.com/' + member.twitter">
      Twitter
    </a>
    <br />
    <template v-if="member.role?.length">
      <span
        >Roles: <i>{{ member.role.join(', ') }}</i></span
      >
    </template>
  </div>
</template>

<style scoped>
.TeamMember {
  padding: 0.5em;
}
</style>
