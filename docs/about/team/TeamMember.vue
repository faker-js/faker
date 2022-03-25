<script lang="ts" setup>
import type { Member } from './TeamMember';

defineProps<{ member: Member }>();
</script>

<template>
  <div class="TeamMember">
    <div class="avatar">
      <img :src="'https://github.com/' + member.github + '.png'" width="140" />
    </div>
    <div class="info">
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
      <template v-if="member.roles?.length">
        <span>
          Roles: <i>{{ member.roles.join(', ') }}</i>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.TeamMember {
  padding: 0.5em;

  display: flex;
  align-items: center;
}

.TeamMember .avatar {
  flex: 0 0 140px;
  margin-right: 1em;
}

.TeamMember .avatar img {
  border-radius: 50%;
}
</style>
