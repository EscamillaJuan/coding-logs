import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getGitPath, isRepository } from './git/utils';
import { gitAdd, gitCommit, gitPull, gitPush, gitStatus } from './git/commands';
import { getLogRepo } from './config';

const processChanges = (
  dir: string,
  changes: string[]
): string => {
  const logFolder = path.join(dir, 'logs');
  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }
  const commit = generateCommit(changes);
  const logPath = path.join(logFolder, 'git-status-log.md');
  const content = generateLogFile(commit, changes);
  fs.writeFileSync(logPath, content, { encoding: 'utf-8' });
  return commit;
};

function generateCommit(
  changes: string[]
): string {
  const summary = changes.reduce(
    (acc, line) => {
      if (line.startsWith('M')) { acc.modified++; }
      else if (line.startsWith('A')) { acc.added++; }
      else if (line.startsWith('D')) { acc.deleted++; }
      return acc;
    },
    { modified: 0, added: 0, deleted: 0 }
  );
  return `Summary: ${summary.added} added, ${summary.modified} modified, ${summary.deleted} deleted.`;
}

function generateLogFile(
  commitMessage: string,
  changes: string[]
): string {
  const date = new Date().toISOString();
  const changeDetails = changes.map(line => `- ${line}`).join('\n');
  return `# Git Log\n\n## Commit Message\n${commitMessage}\n\n## Status Details\n${changeDetails}\n\n_Log generated on ${date}_\n\n`;
}

export const createLog = async (
) => {
  const gitPath = getGitPath();
  if (gitPath === null) {
    vscode.window.showErrorMessage("Git is not installed or not configured properly.");
    return;
  };
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders || workspaceFolders.length === 0) {
    vscode.window.showErrorMessage("No workspace folder is open.");
    return;
  }
  const workspacePath = workspaceFolders[0].uri.fsPath;
  const isRepo = await isRepository(workspacePath);
  if (!isRepo) {
    vscode.window.showErrorMessage("The current folder is not a Git repository.");
    return;
  }
  const changes = await gitStatus(workspacePath);

  const logRepo = getLogRepo();

  if (logRepo.length <= 0) {
    vscode.window.showErrorMessage("Logs repository not configured properly.");
    return;
  }
  const commit = processChanges(logRepo, changes);
  await gitPull(logRepo);
  await gitAdd(logRepo);
  await gitCommit(logRepo, commit);
  await gitPush(logRepo);
};

