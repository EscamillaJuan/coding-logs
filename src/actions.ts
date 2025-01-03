import * as fs from 'fs';
import * as path from 'path';
import { gitAdd, gitCommit, gitPush } from './git/commands';
import { storeChanges } from './changes';

export const processChanges = async (
  dir: string,
  cwd: string,
  changes: string[]
) => {
  const file = path.basename(cwd);
  const commit = generateCommit(changes);
  const logPath = path.join(dir, `${file}_logs.md`);
  const content = generateLogFile(commit, changes);
  if (fs.existsSync(logPath)) {
    fs.appendFileSync(logPath, content, { encoding: 'utf-8' });
  } else {
    fs.writeFileSync(logPath, content, { encoding: 'utf-8' });
  }
  await gitAdd(dir, logPath);
  await gitCommit(dir, commit);
  await gitPush(dir);
  storeChanges(cwd, dir);
};

const generateCommit = (
  changes: string[]
): string => {
  const summary = changes.reduce(
    (acc, line) => {
      if (line.startsWith('M')) { acc.modified++; }
      else if (line.startsWith('A')) { acc.added++; }
      else if (line.startsWith('D')) { acc.deleted++; }
      else if (line.startsWith('??')) { acc.created++; }
      return acc;
    },
    { modified: 0, added: 0, deleted: 0, created: 0 }
  );
  return `log: ${summary.added} added, ${summary.modified} modified, ${summary.deleted} deleted, ${summary.created} created.`;
};

const generateLogFile = (
  commitMessage: string,
  changes: string[]
): string => {
  const date = new Date().toISOString();
  const changeDetails = changes.map(line => `- ${line}`).join('\n');
  return `
  ### Commit Message\n
  ${commitMessage}\n\n
  ### Commit Details\n
  ${changeDetails}\n\n
  _Log generated on ${date}_\n\n
  ------------------------------\n\n`;
};
