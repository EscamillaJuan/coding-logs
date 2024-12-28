import { workspace } from 'vscode';

export const getLogRepo = (
):
  string => {
  const config = workspace.getConfiguration('codingLogs');
  return config.get('logsRepository', '');
};