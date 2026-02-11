<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue';
import { formatResult } from './format';
import RefreshButton from './refresh-button.vue';

const {
  examples,
  refresh,
  refreshOnLoad = false,
} = defineProps<{
  examples: string;
  refresh?: () => Promise<unknown[]>;
  refreshOnLoad?: boolean;
}>();

const code = useTemplateRef('code');
const codeBlock = computed(() => code.value?.querySelector('div pre code'));
const codeLines = ref<Element[]>();

function initRefresh(): Element[] {
  if (codeBlock.value == null) {
    return [];
  }
  const domLines = codeBlock.value.querySelectorAll('.line');
  let lineIndex = 0;
  const result: Element[] = [];
  while (lineIndex < domLines.length) {
    // Skip empty and preparatory lines (no '^faker.' invocation)
    if (
      domLines[lineIndex]?.children.length === 0 ||
      !/^\w*faker\w*\./i.test(domLines[lineIndex]?.textContent ?? '')
    ) {
      lineIndex++;
      continue;
    }

    // Skip to end of the invocation (if multiline)
    while (
      domLines[lineIndex] != null &&
      !/^([^ ].*)?\)(\.\w+)?;? ?(\/\/|$)/.test(
        domLines[lineIndex]?.textContent ?? ''
      )
    ) {
      lineIndex++;
    }

    if (lineIndex >= domLines.length) {
      break;
    }

    const domLine = domLines[lineIndex];
    result.push(domLine);
    lineIndex++;

    // Purge old results
    if (domLine.lastElementChild?.textContent?.startsWith('//')) {
      // Inline comments
      domLine.lastElementChild.remove();
    } else {
      // Multiline comments
      while (domLines[lineIndex]?.children[0]?.textContent?.startsWith('//')) {
        domLines[lineIndex].previousSibling?.remove(); // newline
        domLines[lineIndex].remove(); // comment
        lineIndex++;
      }
    }

    // Add space between invocation and comment (if missing)
    const lastElementChild = domLine.lastElementChild;
    if (
      lastElementChild != null &&
      !lastElementChild.textContent?.endsWith(' ')
    ) {
      lastElementChild.textContent += ' ';
    }
  }

  return result;
}

async function onRefresh(): Promise<void> {
  if (refresh != null && codeBlock.value != null) {
    codeLines.value ??= initRefresh();

    const results = await refresh();

    // Remove old comments
    codeBlock.value
      .querySelectorAll('.comment-delete-marker')
      .forEach((el) => el.remove());

    // Insert new comments
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const domLine = codeLines.value[i];
      const prettyResult = formatResult(result);
      const resultLines = prettyResult.split('\\n');

      if (resultLines.length === 1) {
        domLine.insertAdjacentHTML('beforeend', newCommentSpan(resultLines[0]));
      } else {
        for (const line of resultLines.reverse()) {
          domLine.insertAdjacentHTML('afterend', newCommentLine(line));
        }
      }
    }
  }
}

function newCommentLine(content: string): string {
  return `<span class="line comment-delete-marker">\n${newCommentSpan(content)}</span>`;
}

function newCommentSpan(content: string): string {
  return `<span class="comment-delete-marker" style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// ${content}</span>`;
}

if (refresh != null && refreshOnLoad) {
  onMounted(async () => {
    await onRefresh();
  });
}
</script>

<template>
  <RefreshButton v-if="refresh != null" class="refresh" :refresh="onRefresh" />
  <div ref="code" v-html="examples" />
</template>

<style scoped>
.refresh {
  margin-left: 0.5em;
}
</style>
