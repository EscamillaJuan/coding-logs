import * as fs from 'fs';
import * as path from 'path';
import { gitAdd, gitCommit, gitPush } from './git/commands';
import { storeChanges } from './changes';

export const processChanges = async (
  dir: string,
  cwd: string,
  changes: string[]
) => {
  const folder = path.basename(cwd);
  const folderPath = path.join(dir, folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  const now = new Date();
  const timestamp = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}-${String(now.getHours()).padStart(2, '0')}_${String(now.getMinutes()).padStart(2, '0')}`;
  const logFile = `${timestamp}.md`;
  const logFilePath = path.join(folderPath, logFile);

  const commit = generateCommit(changes);
  const content = generateLogFile(commit, changes);

  fs.writeFileSync(logFilePath, content, { encoding: 'utf-8' });

  await gitAdd(dir, logFilePath);
  await gitCommit(dir, commit);
  await gitPush(dir);
  storeChanges(cwd, folderPath);
};

const generateCommit = (
  changes: string[]
): string => {
  const summary = changes.reduce(
    (acc, line) => {
      if (line.trim().startsWith('M')) { acc.modified++; }
      else if (line.trim().startsWith('A')) { acc.added++; }
      else if (line.trim().startsWith('D')) { acc.deleted++; }
      else if (line.trim().startsWith('??')) { acc.created++; }
      return acc;
    },
    { modified: 0, added: 0, deleted: 0, created: 0 }
  );
  return `Message: ${summary.added} added, ${summary.modified} modified, ${summary.deleted} deleted, ${summary.created} created.`;
};

export const generateLogFile = (
  commitMessage: string,
  changes: string[]
): string => {
  const now = new Date();
  const timestamp = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const changeDetails = changes
    .map(line => ` - ${line.trim()}`)
    .join('\n');
  return `
  ## 🚀 Commit Summary
  **${commitMessage}**
  ## 📋 Changes Included
${changeDetails}
  ---
  ⏰ Commit generated on **${timestamp}**
  ------------------------------
  `;
};
