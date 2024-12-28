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
  dir: string
): Promise<string> => {
  return await runGit(dir, "add", ".");
};

export const gitCommit = async (
  dir: string,
  message: string
): Promise<string> => {
  return await runGit(dir, "commit", "-m", `"${message}"`);
};