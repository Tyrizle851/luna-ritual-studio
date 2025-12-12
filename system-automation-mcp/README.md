# System Automation MCP Server

A comprehensive Model Context Protocol (MCP) server that provides **full system access** for Windows, including filesystem operations, application control, and desktop automation.

## Capabilities

### 📁 Filesystem Operations
- **Read files** - Read any file on your system
- **Write files** - Create or modify files
- **List directories** - Browse folder contents
- **Create directories** - Make new folders (with parent directories)
- **Delete files/directories** - Remove files or entire folders
- **Check file existence** - Verify if files/folders exist

### 🚀 Application Control
- **Launch any application** - Open Excel, Notepad, Chrome, or any .exe
- **Open files with apps** - Launch apps with specific files
- **Close applications** - Terminate running processes
- **List running apps** - See all open applications with window titles

### 🖱️ Desktop Automation
- **Send keyboard input** - Type text, send special keys (Enter, Ctrl+A, etc.)
- **Mouse clicks** - Click at specific screen coordinates (left/right/middle)
- **Window management** - Find and activate windows by title
- **List all windows** - See all open windows
- **Take screenshots** - Capture screen or specific windows

### ⚙️ System Commands
- **Execute commands** - Run PowerShell, CMD, or any executable
- **Clipboard access** - Read and write clipboard contents

## Installation

The server is already configured in `.cursor/mcp.json`. After restarting Cursor, it will be available.

## Usage Examples

### Open Excel with a file
```javascript
launch_application({
  app: "excel",
  file: "C:\\Users\\fordt\\Documents\\report.xlsx"
})
```

### Read a file
```javascript
read_file({
  filePath: "C:\\Users\\fordt\\Documents\\data.txt"
})
```

### Type text into active window
```javascript
send_keys({
  keys: "Hello World{Enter}",
  delay: 50
})
```

### Click at coordinates
```javascript
click({
  x: 500,
  y: 300,
  button: "left"
})
```

### Take a screenshot
```javascript
take_screenshot({
  savePath: "C:\\Users\\fordt\\Desktop\\screenshot.png"
})
```

### Execute PowerShell command
```javascript
execute_command({
  command: "Get-Process | Select-Object Name, CPU",
  shell: "powershell"
})
```

## Security Note

This MCP server has **full system access**. It can:
- Read/write any file you have permissions for
- Launch any application
- Control your mouse and keyboard
- Execute system commands

**Only use this if you trust the AI assistant completely.** Consider restricting access to specific directories if needed.

## Requirements

- Windows 10/11
- Node.js (already installed)
- PowerShell (included with Windows)

## Troubleshooting

If the server doesn't appear in Cursor:
1. Restart Cursor completely (not just reload window)
2. Check that `system-automation-mcp/index.js` exists
3. Verify Node.js is in your PATH
4. Check Cursor's MCP server logs for errors

