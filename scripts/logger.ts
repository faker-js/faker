import { cliui } from '@poppinss/cliui';
import type { TaskCallback } from '@poppinss/cliui/build/src/types';

export type Task = Parameters<TaskCallback>[0];

export const ui = cliui();
