import * as vscode from 'vscode';
import { getGitPath, isRepository } from './git/utils';
import { createLog } from './actions';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('coding-logs.init', async () => {
		createLog();
	});
	context.subscriptions.push(disposable);
}

export function deactivate() { }