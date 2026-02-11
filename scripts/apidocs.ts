#!/usr/bin/env node

import { generate } from './apidocs/generate';
import { initMarkdownRenderer } from './shared/markdown';

await initMarkdownRenderer();
await generate();
