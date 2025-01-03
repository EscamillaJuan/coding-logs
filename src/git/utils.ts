import { execFile, ExecOptions } from "child_process";
import { extensions } from "vscode";


const execute = async (
  command: string,
  args: string[],
  options: ExecOptions = {}
): Promise<string> => {
  const fullCommand = process.platform === "win32"
    ? `& "${command}" ${args.join(" ")}`
    : `${command} ${args.join(" ")}`;
  return new Promise((resolve) => {
    execFile(
      command,
      args,
      { ...options, encoding: 'utf8' },
      (err, stdout, stderr): void => {
        if (err || stderr) {
          resolve("");
        } else {
          resolve(stdout.trim());
        }
      }
    );
  });
};

export const getGitPath = (
): string => {
  const gitUtil = extensions.getExtension('vscode.git');
  if (gitUtil?.exports.enabled) {
    return gitUtil.exports.getAPI(1).git.path;
  }
  return "git";
};

export const runGit = async (
  cwd: string,
  ...args: string[]
): Promise<string> => {
  return await execute(getGitPath(), args, {
    cwd: cwd,
    env: { ...process.env, LC_ALL: "C" },
  });
};

export const isRepository = async (
  cwd: string
): Promise<boolean> => {
  try {
    const result = await runGit(cwd, 'rev-parse', '--is-inside-work-tree');
    return result.trim() === 'true';
  } catch (error) {
    return false;
  }
};