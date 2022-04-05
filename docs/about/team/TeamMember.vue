<script lang="ts" setup>
import type { Member } from './TeamMember';

defineProps<{ member: Member }>();
</script>

<template>
  <div class="TeamMember">
    <div class="avatar">
      <img :src="'https://github.com/' + member.github + '.png'" width="120" />
    </div>
    <div class="info">
      <div class="name">
        <b>{{ member.name }}</b>
      </div>
      <div class="socials">
        <a :href="'https://github.com/' + member.github">
          <img
            src="https://img.icons8.com/ios-glyphs/344/github.png"
            alt="GitHub"
            title="GitHub"
            width="32"
          />
        </a>
        <a v-if="member.gitlab" :href="'https://gitlab.com/' + member.gitlab">
          <img
            src="https://img.icons8.com/color/344/gitlab.png"
            alt="GitLab"
            title="GitLab"
            width="32"
          />
        </a>
        <a
          v-if="member.twitter"
          :href="'https://twitter.com/' + member.twitter"
        >
          <img
            src="https://img.icons8.com/color/344/twitter.png"
            alt="Twitter"
            title="Twitter"
            width="32"
          />
        </a>
      </div>
      <div v-if="member.roles?.length" class="roles">
        <span>Roles: </span>
        <template v-for="(role, index) in member.roles">
          <i>{{ role }}</i>
          <span v-if="index < member.roles.length - 1">, </span>
        </template>
      </div>
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
  flex: 0 0 120px;
  margin-right: 1em;
}

.TeamMember .avatar img {
  border-radius: 50%;
}

.TeamMember .roles i {
  white-space: nowrap;
}
</style>
