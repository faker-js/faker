import { env } from 'node:process';

export const CI_PREFLIGHT = env.CI_PREFLIGHT === 'true';
