#!/usr/bin/env node

import { generate } from './apidoc/generate';
import { initMarkdownRenderer } from './apidoc/markdown';

await initMarkdownRenderer();
await generate();
