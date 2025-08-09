import * as vscode from 'vscode';
import { getGitPath, isRepository } from './git/utils';
import { gitStatus } from './git/commands';
import { getLogRepoPath, getLogsTimeInterval } from './config';
import { processChanges } from './actions';
import { isDeveloperWorking } from './changes';
import path from 'path';

let intervalId: NodeJS.Timeout | null = null;

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('coding-logs.init', async () => {
        await initializeLogs();
    });
    initializeLogs();
    context.subscriptions.push(disposable);
}

export function deactivate() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

async function initializeLogs() {
    const workspacePath = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    const gitPath = getGitPath();
    const isRepo = await isRepository(workspacePath || '');
    if (gitPath === null) {
        vscode.window.showErrorMessage("Git is not installed or not configured properly.");
        return;
    } else if (!isRepo) {
        return;
    }
    vscode.window.showInformationMessage("Coding logs initialized correctly");
    const cwd = await getCwd();
    const timeInterval = getLogsTimeInterval();

    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        generateLog(cwd);
    }, timeInterval);
};

const getCwd = async (
): Promise<string> => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        return "";
    }
    const workspacePath = workspaceFolders[0].uri.fsPath;
    const isRepo = await isRepository(workspacePath);
    if (!isRepo) {
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
    const folder = path.basename(cwd);
    const folderPath = path.join(logRepoPath, folder);
    const isDevWorking = await isDeveloperWorking(cwd, folderPath);
    if (changes.length <= 0 || !isDevWorking) {
        vscode.window.showInformationMessage("You need to work!!!");
        return;
    }
    processChanges(logRepoPath, cwd, changes);
};