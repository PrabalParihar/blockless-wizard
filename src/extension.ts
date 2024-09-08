import * as vscode from 'vscode';
import { exec } from 'child_process';
import { spawn } from 'child_process';

// Utility function to run a shell command and handle output
function runCommand(command: string, outputChannel: vscode.OutputChannel, successMessage?: string) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            outputChannel.appendLine(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            outputChannel.appendLine(`Stderr: ${stderr}`);
            return;
        }
        outputChannel.appendLine(stdout);
        if (successMessage) {
            outputChannel.appendLine(successMessage);
        }
    });
}

// Function to handle interactive CLI commands (for init and other interactive prompts)
function runInteractiveCommand(command: string, args: string[], outputChannel: vscode.OutputChannel) {
    const child = spawn(command, args, { shell: true });

    // Show the output channel to the user
    outputChannel.show();

    // Handle stdout to capture prompts and outputs
    child.stdout.on('data', (data) => {
        const output = data.toString();
        outputChannel.appendLine(output);

        // Handle specific prompts, such as selecting frameworks and templates
        if (output.includes('Pick a framework')) {
            vscode.window.showQuickPick(['Assembly Script', 'Rust'], { placeHolder: 'Pick a framework' }).then((framework) => {
                if (framework) {
                    child.stdin.write(`${framework}\n`);
                }
            });
        }

        if (output.includes('Pick a starter template')) {
            vscode.window.showQuickPick(['Hello World', 'Price Oracle'], { placeHolder: 'Pick a starter template' }).then((template) => {
                if (template) {
                    child.stdin.write(`${template}\n`);
                }
            });
        }

        if (output.includes('Do you want to use TypeScript')) {
            vscode.window.showQuickPick(['Yes', 'No'], { placeHolder: 'Do you want to use TypeScript?' }).then((answer) => {
                if (answer) {
                    child.stdin.write(`${answer === 'Yes' ? 'Y' : 'N'}\n`);
                }
            });
        }
    });

    // Handle stderr for errors
    child.stderr.on('data', (data) => {
        outputChannel.appendLine(`Error: ${data.toString()}`);
    });

    // Handle process close
    child.on('close', (code) => {
        if (code === 0) {
            outputChannel.appendLine('Command completed successfully.');
        } else {
            outputChannel.appendLine(`Command exited with code ${code}`);
        }
    });
}

// Function to handle the login command and dynamically show the login URL
function runLoginCommand(command: string, args: string[], outputChannel: vscode.OutputChannel) {
    const child = spawn(command, args, { shell: true });

    outputChannel.show();

    // Capture stdout to detect the login URL
    child.stdout.on('data', (data) => {
        const output = data.toString();
        outputChannel.appendLine(output);

        // Check if the output contains the dynamic login URL
        const urlMatch = output.match(/http:\/\/(127\.0\.0\.1|0\.0\.0\.0):\d+/);
        if (urlMatch) {
            const loginUrl = urlMatch[0];

            vscode.window.showInformationMessage(`Please complete your login: ${loginUrl}`, 'Open URL').then(selection => {
                if (selection === 'Open URL') {
                    vscode.env.openExternal(vscode.Uri.parse(loginUrl));
                }
            });
        }
    });

    child.stderr.on('data', (data) => {
        outputChannel.appendLine(`Error: ${data.toString()}`);
    });

    child.on('close', (code) => {
        if (code === 0) {
            outputChannel.appendLine('Login process completed successfully.');
        } else {
            outputChannel.appendLine(`Login process exited with code ${code}`);
        }
    });
}

// Utility function to run a command with sudo and handle password prompt
function runSudoCommand(command: string, outputChannel: vscode.OutputChannel) {
    vscode.window.showInputBox({
        prompt: 'Enter your sudo password',
        password: true,
        ignoreFocusOut: true
    }).then(password => {
        if (!password) {
            vscode.window.showErrorMessage('Password is required to run sudo commands.');
            return;
        }

        const child = spawn('sudo', ['-S', 'sh', '-c', command]);

        // Send the password to sudo when prompted
        child.stdin.write(`${password}\n`);

        child.stdout.on('data', data => {
            outputChannel.appendLine(`Output: ${data}`);
        });

        child.stderr.on('data', data => {
            outputChannel.appendLine(`Error: ${data}`);
        });

        child.on('close', code => {
            if (code === 0) {
                outputChannel.appendLine('Command executed successfully.');
            } else {
                outputChannel.appendLine(`Command exited with code ${code}`);
            }
        });
    });
}

// Check if the user is logged into Blockless CLI
function checkLogin(outputChannel: vscode.OutputChannel, callback: () => void) {
    exec('bls whoami', (error, stdout, stderr) => {
        if (stdout.includes('Connected')) {
            outputChannel.appendLine('You are logged in.');
            callback();
        } else {
            vscode.window.showErrorMessage('You are not logged in. Please log in first.');
            outputChannel.appendLine('Not logged in. Run "Blockless: Login to Network" first.');
        }
    });
}

export function activate(context: vscode.ExtensionContext) {
    const outputChannel = vscode.window.createOutputChannel('Blockless CLI');
    outputChannel.show(); // Always show the output channel to display messages

    // Blockless Login Command
    const login = vscode.commands.registerCommand('blockless.login', () => {
        const command = 'bls';
        const args = ['login'];

        outputChannel.appendLine('Starting Blockless login process...');
        runLoginCommand(command, args, outputChannel);
    });

    // Install Blockless CLI Command
    const installCLI = vscode.commands.registerCommand('blockless.installCLI', () => {
        const command = `curl https://raw.githubusercontent.com/BlocklessNetwork/cli/main/download.sh | bash`;
        outputChannel.appendLine('Installing Blockless CLI...');
        runSudoCommand(command, outputChannel);
    });

    // Initialize Blockless Function (only after login)
	const initFunction = vscode.commands.registerCommand('blockless.initFunction', () => {
        vscode.window.showInputBox({ prompt: 'Enter your project name' }).then(projectName => {
            if (projectName) {
                const args = ['function', 'init', '--name', projectName];
                runInteractiveCommand('bls', args, outputChannel);
            } else {
                vscode.window.showErrorMessage('Project name is required to initialize a function.');
            }
        });
    });


    // Deploy Blockless Function (only after login)
    const deployFunction = vscode.commands.registerCommand('blockless.deployFunction', () => {
        checkLogin(outputChannel, () => {
            const command = `bls function deploy`;
            runCommand(command, outputChannel, "Function deployed successfully.");
        });
    });

    // Invoke Blockless Function (only after login)
    const invokeFunction = vscode.commands.registerCommand('blockless.invokeFunction', () => {
        checkLogin(outputChannel, () => {
            const command = `bls function invoke`;
            runCommand(command, outputChannel, "Function invoked successfully.");
        });
    });

    // Register all commands
    context.subscriptions.push(login, installCLI, initFunction, deployFunction, invokeFunction);
}

export function deactivate() {}