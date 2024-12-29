import { workspace } from 'vscode';

export const getLogRepoPath = (
):
  string => {
  const config = workspace.getConfiguration('codingLogs');
  return config.get('logsRepository', '');
};