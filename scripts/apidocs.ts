#!/usr/bin/env node

import { generate } from './apidocs/generate';
import { initMarkdownRenderer } from './apidocs/utils/markdown';

await initMarkdownRenderer();
await generate();
