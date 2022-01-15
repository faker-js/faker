<script setup>
defineProps({
  text: String,
  type: String,
  vertical: String,
});
</script>

<template>
  <span class="badge" :class="type" :style="{ verticalAlign: vertical }">
    {{ text }}
  </span>
</template>

<style scoped>
.badge.tip {
  background-color: #40af7c;
}

.badge.danger {
  background-color: #cb0300;
}

.badge.warning {
  background-color: #e7c000;
}

.badge.info {
  background-color: #476482;
}

.badge {
  display: inline-block;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: var(--c-bg);
  vertical-align: top;
  transition: color var(--t-color), background-color var(--t-color);
}
</style>
