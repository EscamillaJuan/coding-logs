import { execFile, ExecOptions } from "child_process";
import { dirname } from "path";
import { extensions } from "vscode";


const execute = async (
  commmand: string,
  args: string[],
  options: ExecOptions = {}
): Promise<string> => {
  return new Promise((res) => {
    execFile(
      commmand,
      args,
      { ...options, encoding: 'utf8' },
      (err, stdout, stderr): void => {
        if (err || stderr) {
          res("");
        } else {
          res(stdout.trim());
        }
      }
    );
  });
};


export const getGitPath = (): string => {
  const gitUtil = extensions.getExtension('vscode.git');
  if (gitUtil?.exports.enabled) {
    return gitUtil.exports.getAPI(1).git.path;
  }
  return "git";
};

export const runGit = async (cwd: string, ...args: string[]) => {
  execute(getGitPath(), args, {
    cwd: dirname(cwd),
    env: { ...process.env, LC_ALL: "C" },
  });
};


