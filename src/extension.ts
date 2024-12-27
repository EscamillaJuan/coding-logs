import * as vscode from 'vscode';
import { getRepositoryChanges, initGitExtension } from './commands';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('coding-logs.init', async () => {
		const repo = await initGitExtension();
		getRepositoryChanges(repo);
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }