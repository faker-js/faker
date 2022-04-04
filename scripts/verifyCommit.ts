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

  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.red(
      `invalid commit message format.`
    )}

  ${colors.red(
    `Proper commit message format is required for automated changelog generation. Examples:`
  )}

  ${colors.green(`feat: add 'comments' option`)}
  ${colors.green(`fix: handle events on blur (close #28)`)}

  ${colors.red(`See .github/commit-convention.md for more details.`)}
`
  );

  process.exit(1);
}
