# Coding Logs

**Coding Logs** is a Visual Studio Code extension designed to track your Git-based productivity. It periodically checks for changes in your codebase and helps you maintain a consistent contribution history on GitHub. Whether you're aiming to keep your GitHub contribution graph active or tracking daily activity, **Coding Logs** has you covered.

### Why Use Coding Logs?

GitHub only tracks contributions when changes are made to the **default branch** of a repository. This means that work done in other branches or separate projects often doesn't appear in your GitHub contributions graph.

**Coding Logs** solves this problem by creating a simple and automated way to log your activity. With this extension, every change you make—regardless of the branch or project—can contribute to your GitHub contributions graph. It helps you:

- Maintain a consistent and impressive contribution history on GitHub.
- Ensure all your coding efforts are recognized, even if you're working across multiple projects or branches.
- Track your daily productivity and monitor your progress over time.

This is especially useful for developers who want to reflect their actual coding activity in their GitHub profile, whether for personal tracking, portfolio building, or job opportunities.

## 🚀 Features

- **Automatic Git Change Tracking**: The extension checks for changes in your Git repository at customizable intervals.
- **Productivity Tracking**: Log changes to reflect your daily activity and keep your GitHub contributions consistent.
- **Customizable Check Interval**: Adjust the interval (in minutes) for change detection—default is every 30 minutes.
- **Git Repository Support**: Compatible with any Git repository in Visual Studio Code.
- **Cross-platform**: Works seamlessly on Windows, macOS, and Linux.

---

## 📦 Requirements

To use **Coding Logs**, ensure the following:

1. **Git**: Install and configure Git.  
   Download Git here: [Git Installation Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

2. **Visual Studio Code**: Install Visual Studio Code.  
   Download VS Code here: [VS Code](https://code.visualstudio.com/).

3. **Remote Repository**:
   - Create a remote repository on a platform like GitHub, GitLab, or Bitbucket.
   - Clone the repository to your local machine.
   - Ensure that the repository is configured to allow remote commands like `git push`.
     - Use a **Personal Access Token (PAT)** or **SSH Key** to avoid being prompted for a password every time.
     - For guidance on creating tokens or SSH keys:
       - [GitHub: Creating a Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)
       - [GitHub: Generating an SSH Key](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

---

## ⚙️ Extension Settings

**Coding Logs** offers the following configurable settings:

1. **`codingLogs.logsRepositoryPath`**  
   **Required** – Specify the directory path of the repository where logs will be stored. This repository tracks productivity and doesn't store sensitive code details.  
   Example:
   ```json
   "codingLogs.logsRepositoryPath": "/path/to/log-repo"
   ```
2. **`codingLogs.checkIntervalTime`**
   Optional – Set the time interval (in minutes) for checking changes in your Git repository. Default is 30 minutes.  
   Example:
   ```json
   "codingLogs.checkIntervalTime": 60
   ```
   You can configure these settings in Settings (Ctrl+,) or directly in settings.json.

## Known Issues

- **Interval accuracy**: The interval may not be precise in very short durations due to how the checks are scheduled in the background.
- **Commit Descriptions**: Commits in the log repository are generic and summarize changes (e.g., "Files modified, added, or deleted").

## 💡 How It Works

Set the logs repository path where your logs will be stored.
Configure the check interval time to determine how frequently the extension checks for changes.
The extension detects Git changes (added, modified, or deleted files) and logs them automatically in the specified repository.
The logged changes contribute to your GitHub activity, keeping your contribution graph updated.

## Example Workflow:

- You make some changes to your codebase.
- The extension automatically tracks those changes in the interval you configure.
- Every time a change is detected, it is logged, ensuring that your GitHub contribution graph stays active.
- You can see your contributions being updated without having to worry about missing a commit.

## Release Notes

### 1.0.0

- Initial release of the extension.
- Review changes from your Git repository and stores them in a specified logs repository.
- Adds basic configuration for setting the repository path and check interval.
- Introduces a changes.txt file to store local comparisons of changes (not pushed to remote repositories).
- Saves a detailed summary of changes in markdown format, organized into project-specific folders.

---
