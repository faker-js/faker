<script setup lang="ts">
import { onMounted } from 'vue';
import { formatResult } from './format';

type FakerModule = Awaited<typeof import('@faker-js/faker')>;

const { target } = defineProps<{ target: string }>();

let pendingFrame: number | null = null;
let fakerModulePromise: Promise<FakerModule> | null = null;
const invocationEndPattern = /^([^ ].*)?\)(\.\w+)?;? ?(\/\/|$)/;

function scheduleEnhancement(): void {
  if (pendingFrame != null) {
    cancelAnimationFrame(pendingFrame);
  }

  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = null;
    void enhanceCodeBlocks();
  });
}

async function enhanceCodeBlocks(): Promise<void> {
  const blocks = Array.from(
    document.querySelectorAll<HTMLElement>('pre > code')
  ).filter((block) => block.textContent?.includes('@faker-js/faker'));

  if (blocks.length === 0) {
    return;
  }

  const fakerModule = await loadFakerModule();
  if (fakerModule == null) {
    return;
  }

  for (const block of blocks) {
    processCodeBlock(block, fakerModule);
  }
}

async function loadFakerModule(): Promise<FakerModule | null> {
  if (fakerModulePromise == null) {
    try {
      fakerModulePromise = import('@faker-js/faker') as Promise<FakerModule>;
    } catch (error) {
      console.error('[ApiDocsLocale] Failed to load Faker module.', error);
      return null;
    }
  }

  try {
    return await fakerModulePromise;
  } catch (error) {
    console.error('[ApiDocsLocale] Failed to load Faker module.', error);
    return null;
  }
}

function processCodeBlock(block: HTMLElement, fakerModule: FakerModule): void {
  block.querySelectorAll('.comment-delete-marker').forEach((el) => el.remove());

  const domLines = block.querySelectorAll<HTMLElement>('.line');
  if (domLines.length === 0) {
    return;
  }

  const fakerInstance = resolveFakerInstance(fakerModule);
  if (fakerInstance == null) {
    return;
  }

  const invocations = collectInvocations(domLines, target, fakerInstance);

  for (const { domLine, expression, varName, fakerInstance } of invocations) {
    const evaluation = evaluateExpression(expression, varName, fakerInstance);
    const rendered =
      evaluation instanceof Error
        ? `Error: ${evaluation.message}`
        : formatResult(evaluation);

    insertComment(domLine, rendered);
  }
}

function resolveFakerInstance(fakerModule: FakerModule): unknown | null {
  return (fakerModule as Record<string, unknown>)[target] ?? null;
}

function collectInvocations(
  domLines: NodeListOf<HTMLElement>,
  varName: string,
  fakerInstance: unknown
) {
  const targets: Array<{
    domLine: HTMLElement;
    expression: string;
    varName: string;
    fakerInstance: unknown;
  }> = [];

  if (!varName) {
    return targets;
  }

  for (let index = 0; index < domLines.length; index++) {
    const domLine = domLines[index];
    const text = domLine.textContent ?? '';

    if (!text.includes(`${varName}.`)) {
      continue;
    }

    const startIndex = index;

    while (
      index < domLines.length &&
      !invocationEndPattern.test(domLines[index]?.textContent ?? '')
    ) {
      index++;
    }

    if (index >= domLines.length) {
      break;
    }

    const endIndex = index;
    const expression = extractExpression(domLines, startIndex, endIndex);
    const expressionVarName = expression.match(/^([\w$]+)/)?.[1] ?? '';

    if (!expression || expressionVarName !== varName) {
      continue;
    }

    targets.push({
      domLine: domLines[endIndex]!,
      expression,
      varName,
      fakerInstance,
    });
  }

  return targets;
}

function extractExpression(
  domLines: NodeListOf<HTMLElement>,
  startIndex: number,
  endIndex: number
): string {
  const chunks: string[] = [];

  for (let i = startIndex; i <= endIndex; i++) {
    const text = domLines[i]?.textContent ?? '';
    const commentIndex = text.indexOf('//');
    const code = commentIndex === -1 ? text : text.slice(0, commentIndex);
    chunks.push(code);
  }

  return chunks.join('\n').trim().replace(/;\s*$/, '');
}

function evaluateExpression(
  expression: string,
  varName: string,
  fakerInstance: unknown
): unknown {
  try {
    const fn = new Function(
      varName,
      `"use strict"; return (${expression});`
    ) as (fakerArg: unknown) => unknown;

    return fn(fakerInstance);
  } catch (error) {
    return error instanceof Error
      ? error
      : new Error(String(error ?? 'Unknown error'));
  }
}

function insertComment(domLine: HTMLElement, content: string): void {
  const lines = content.split('\n');

  if (lines.length === 1) {
    ensureTrailingSpace(domLine);
    domLine.insertAdjacentHTML('beforeend', newCommentSpan(lines[0]!));
    return;
  }

  for (const line of [...lines].reverse()) {
    domLine.insertAdjacentHTML('afterend', newCommentLine(line));
  }
}

function ensureTrailingSpace(domLine: HTMLElement): void {
  const lastElement = domLine.lastElementChild as HTMLElement | null;
  if (lastElement != null) {
    const text = lastElement.textContent ?? '';
    if (!/\s$/.test(text)) {
      lastElement.textContent = `${text} `;
    }
    return;
  }

  if (!/\s$/.test(domLine.textContent ?? '')) {
    domLine.append(' ');
  }
}

function newCommentLine(content: string): string {
  return `<span class="line comment-delete-marker">
${newCommentSpan(content)}
</span>`;
}

function newCommentSpan(content: string): string {
  return `<span class="comment-delete-marker" style="--shiki-light:#6A737D;--shiki-dark:#6A737D">// ${content}</span>`;
}

onMounted(() => {
  scheduleEnhancement();
});
</script>

<template>
  <span class="api-docs-locale-hook" style="display: none" />
</template>
