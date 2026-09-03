#!/usr/bin/env node

import { argv } from 'node:process';
import { generateModuleTree } from './module-tree/generate-module-tree';

await generateModuleTree(argv[2]);
