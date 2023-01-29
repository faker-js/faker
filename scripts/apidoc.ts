import { faker } from '../src';
import { generate } from './apidoc/generate';
import { initMarkdownRenderer } from './apidoc/signature';

async function build(): Promise<void> {
  await initMarkdownRenderer();
  faker.setDefaultRefDate(Date.UTC(2023, 0, 1));
  await generate();
}

build().catch(console.error);
