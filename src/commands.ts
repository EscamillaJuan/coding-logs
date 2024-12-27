import vscode from 'vscode';

export const initGitExtension = async () => {
  const gitExtension = vscode.extensions.getExtension('vscode.git');
  if (!gitExtension?.isActive) {
    await gitExtension?.activate();
  }
  const gitApi = gitExtension?.exports.getAPI(1);
  const currentRepository = gitApi.repositories[0];
  return currentRepository;
};

export const getRepositoryChanges = async (currentRepository: { status: any; diff: () => any; }) => {
  await currentRepository.status;
  const diff = await currentRepository.diff();
  console.log(diff);
};