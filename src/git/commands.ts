import { runGit } from "./utils";

export const gitPull = async (
  dir: string
): Promise<string> => {
  return await runGit(dir, "pull");
};

export const gitPush = async (
  dir: string
): Promise<string> => {
  return await runGit(dir, "push");
};

export const gitStatus = async (
  dir: string
): Promise<string[]> => {
  const output = await runGit(dir, "status", "--porcelain");
  return output.split("\n").filter(Boolean);
};

export const gitAdd = async (
  dir: string,
  file: string,
): Promise<string> => {
  return await runGit(dir, "add", file);
};

export const gitCommit = async (
  dir: string,
  message: string
): Promise<string> => {
  return await runGit(dir, "commit", "-m", `"${message}"`);
};

export const gitDiff = async (
  cwd: string,
): Promise<string> => {
  return await runGit(cwd, 'diff');
};

export const gitIntendToAdd = async (
  cwd: string,
) => {
  return await runGit(cwd, "add", "--intent-to-add", ".");
};