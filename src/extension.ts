import * as vscode from 'vscode';
import { getGitPath, isRepository } from './git/utils';
import { gitStatus } from './git/commands';
import { getLogRepoPath } from './config';
import { processChanges } from './actions';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('coding-logs.init', async () => {
		const gitPath = getGitPath();
		if (gitPath === null) {
			vscode.window.showErrorMessage("Git is not installed or not configured properly.");
			return;
		};
		const cwd = await getCwd();
		setInterval(() => {
			generateLog(cwd);
		}, 60000);
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }

const getCwd = async (
): Promise<string> => {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders || workspaceFolders.length === 0) {
		vscode.window.showErrorMessage("No workspace folder is open.");
		return "";
	}
	const workspacePath = workspaceFolders[0].uri.fsPath;
	const isRepo = await isRepository(workspacePath);
	if (!isRepo) {
		vscode.window.showErrorMessage("The current folder is not a Git repository.");
		return "";
	}
	return workspacePath;
};

const generateLog = async (
	cwd: string,
) => {
	const changes = await gitStatus(cwd);
	const logRepoPath = getLogRepoPath();
	if (logRepoPath.length <= 0) {
		vscode.window.showErrorMessage("Logs repository not configured properly.");
		return;
	}
	if (changes.length <= 0) { return; }
	processChanges(logRepoPath, cwd, changes);
};