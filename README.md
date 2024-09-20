# Blockless Wizard - VS Code Extension

Welcome to **Blockless Wizard**, a powerful VS Code extension designed to streamline the development and deployment of decentralized, serverless applications on the Blockless Network. By integrating common Blockless CLI commands and workflows directly into VS Code, this extension simplifies your development process, allowing you to execute complex tasks with minimal effort—without leaving your editor.

## Features

### 1. Blockless CLI Installation

- **Automatic Installation**: Install the Blockless CLI directly from VS Code without manual commands.
  - Supports installation via `curl` or `wget` on macOS and Linux.
  - Provides guidance for Windows users to install the CLI manually.

### 2. Project Initialization

- **Quick Start Projects**: Initialize new projects like decentralized functions or static websites directly from VS Code.
  - Choose from frameworks such as AssemblyScript, Rust, React, Vite, and more.
  - Select starter templates, including "Hello World" examples.

### 3. Project Management

- **Guided Setup**: After project initialization, the extension guides you through setup and management.
  - Automatically change directories, install dependencies, and run development servers.
  - Build and prepare your projects with ease.

### 4. Deployment Automation

- **One-Click Deployment**: Deploy Blockless Functions or Static Sites to the Blockless Network directly from VS Code.
  - Eliminate the need to switch to the terminal for deployment commands.
  - Receive real-time feedback on deployment success or failure.

### 5. Integrated CLI Commands

- **Seamless CLI Access**: Access key Blockless CLI commands within VS Code's Command Palette.
  - **Login**: Authenticate with the Blockless Network via wallet connection.
  - **Invoke and Test**: Run and test functions before deployment.
  - **Deployment**: Deploy applications and view results, including invocation URLs.

### 6. Local Preview and Testing

- **In-Editor Preview**: Preview and test your applications locally before deploying.
  - After building a static site, preview it at a local address (e.g., `http://localhost:3000`) directly within VS Code.

## Requirements

- **Visual Studio Code** version 1.60.0 or higher.
- **Node.js** version 12.x or higher (for Node.js-based projects).
- **Blockless CLI** (if not already installed, the extension can install it for you).
- **Internet Connection**: Required for installing dependencies and deploying to the Blockless Network.

## Installation

### Install the Extension

1. **Open VS Code**.
2. Go to the **Extensions** view (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Search for **"Blockless Wizard"**.
4. Click **Install**.

### Set Up the Blockless CLI

- **Automatic Installation**:
  - Upon first use, if the Blockless CLI is not detected, the extension will prompt you to install it.
  - Follow the on-screen instructions for automatic installation (macOS and Linux).

- **Manual Installation (Windows)**:
  - Windows users will be directed to the [Blockless CLI Installation Guide](https://docs.blockless.network/cli-installation) for manual setup.

## Usage

### Initialize a New Project

1. **Open the Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type **"Blockless: Initialize Project"** and select it.
3. **Choose Project Type**:
   - Select **Blockless Function** or **Blockless Site**.
4. **Select Framework**:
   - Options include **AssemblyScript**, **Rust**, **React**, **Vite**, etc.
5. **Choose Starter Template**:
   - Pick from available templates (e.g., "Hello World").
6. **Specify Project Name**:
   - Enter a name for your new project.
7. The extension will:
   - Create the project directory.
   - Install necessary dependencies.
   - Set up the development environment.

### Deploy Your Application

1. **Open the Command Palette**.
2. Type **"Blockless: Deploy Application"** and select it.
3. The extension will:
   - Build your project if necessary.
   - Deploy it to the Blockless Network.
   - Provide feedback on deployment status.
   - Display the invocation URL or endpoint.

### Log In to the Blockless Network

- If not already authenticated:

  1. **Open the Command Palette**.
  2. Type **"Blockless: Login"** and select it.
  3. Follow prompts to connect your wallet and authenticate.

### Preview Locally

1. **Open the Command Palette**.
2. Type **"Blockless: Start Local Preview"** and select it.
3. The extension will:
   - Start a local development server.
   - Open the application in your default browser or provide a local URL.

## Extension Settings

This extension contributes the following settings:

- **`blocklessWizard.autoInstallCLI`**: Automatically install the Blockless CLI if not detected.
  - **Type**: `boolean`
  - **Default**: `true`

- **`blocklessWizard.defaultFramework`**: Set your preferred default framework for new projects.
  - **Type**: `string`
  - **Options**: `"AssemblyScript"`, `"Rust"`, `"React"`, `"Vite"`, etc.
  - **Default**: `"AssemblyScript"`

- **`blocklessWizard.showDeploymentNotifications`**: Show notifications after deployment.
  - **Type**: `boolean`
  - **Default**: `true`

## Known Issues

- **Windows CLI Installation**: Automatic CLI installation is not available on Windows. Users must install the Blockless CLI manually.
- **Framework Compatibility**: Some frameworks may have limited support. Refer to the [Blockless Documentation](https://docs.blockless.network) for details.
- **Deployment Errors**: Network issues may cause deployment failures. Ensure a stable internet connection.

## Troubleshooting

- **Blockless CLI Not Found**:
  - If automatic installation fails, manually install the CLI from the [Blockless CLI GitHub Repository](https://github.com/blocklessnetwork/cli).
- **Authentication Issues**:
  - Ensure your wallet is properly set up and connected.
  - Check for any network restrictions or firewall settings blocking the authentication process.
- **Command Failures**:
  - View the **Output** panel in VS Code for detailed error logs.
  - Verify that all dependencies are installed and up to date.

## Release Notes

### Version 1.0.0

- **Initial Release**:
  - Automatic Blockless CLI installation.
  - Project initialization with multiple frameworks.
  - Integrated deployment and local preview.
  - In-editor access to Blockless CLI commands.

## Contributing

We welcome contributions! If you encounter issues or have feature requests, please submit them via the [GitHub Issues](https://github.com/yourusername/blockless-wizard/issues) page.

### How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Submit a pull request to the main branch.

## License

This extension is licensed under the [MIT License](LICENSE).

---

Thank you for using Blockless Wizard! We hope this extension enhances your development experience on the Blockless Network.

---
Feel free to reach out with any questions or feedback.
