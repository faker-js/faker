import { generate } from './apidoc/generate';
import { initMarkdownRenderer } from './apidoc/signature';

async function build(): Promise<void> {
  await initMarkdownRenderer();
  await generate();
}

build().catch(console.error);
