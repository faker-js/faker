/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

// Invoked on the commit-msg git hook by simple-git-hooks.

import { readFileSync } from 'fs';
import colors from 'picocolors';

// get $1 from commit-msg script
const msgPath = process.argv[2];
const msg = readFileSync(msgPath, 'utf-8').trim();

const releaseRE = /^v\d/;
const commitRE =
  /^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/;

const isMergeCommit = msg.startsWith('Merge remote-tracking-branch');

if (!isMergeCommit && !releaseRE.test(msg) && !commitRE.test(msg)) {
  console.log();

  const label = colors.bgRed(colors.white(' ERROR '));
  const message = colors.red(`invalid commit message format.`);
  const desc = colors.red(
    `Proper commit message format is required for automated changelog generation. Examples:\n\n`
  );

  const examples = [
    `feat: add 'comments' option`,
    `fix: handle events on blur (close #28)`,
  ]
    .map((e) => colors.green(`    ${e}`))
    .join('\n');

  const summary = colors.red(
    `  See .github/commit-convention.md for more details.\n`
  );

  console.error(`  ${label}${message}\n\n  ${desc}${examples}\n\n${summary}`);

  process.exit(1);
}
