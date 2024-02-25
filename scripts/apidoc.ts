#!/usr/bin/env node

import { generate } from './apidoc/generate';
import { initMarkdownRenderer } from './apidoc/utils/markdown';

await initMarkdownRenderer();
await generate();
