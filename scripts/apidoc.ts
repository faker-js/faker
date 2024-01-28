#!/usr/bin/env node

import { generate } from './apidoc2/generate';

async function build(): Promise<void> {
  // await initMarkdownRenderer();
  await generate();
}

build().catch((error) => {
  // Workaround until top level await is available
  console.error(error);
  process.exit(1);
});
