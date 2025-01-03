import { workspace } from 'vscode';

export const getLogRepoPath = (
): string => {
  const config = workspace.getConfiguration('codingLogs');
  return config.get('logsRepositoryPath', '');
};

export const getLogsTimeInterval = (
): number => {
  const config = workspace.getConfiguration('codingLogs');
  const intervalMin = config.get("checkIntervalTime", 30);
  return intervalMin * 60000;
};