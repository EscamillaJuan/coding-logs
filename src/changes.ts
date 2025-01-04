import path from 'path';
import { gitDiff, gitIntendToAdd } from './git/commands';
import * as fs from 'fs';

export const storeChanges = async (
  cwd: string,
  dir: string,
) => {
  await gitIntendToAdd(cwd);
  const changes = await gitDiff(cwd);
  const file = path.join(dir, "changes.txt");
  fs.writeFileSync(file, changes, { encoding: 'utf-8' });
};

export const isDeveloperWorking = async (
  cwd: string,
  dir: string,
): Promise<boolean> => {
  await gitIntendToAdd(cwd);
  const newChanges = await gitDiff(cwd);
  const changesFilePath = path.join(dir, "changes.txt");
  if (!fs.existsSync(changesFilePath)) {
    return true;
  }
  const oldChanges = fs.readFileSync(changesFilePath);
  return newChanges !== oldChanges.toString();
};