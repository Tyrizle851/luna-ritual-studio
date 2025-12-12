#!/usr/bin/env node

/**
 * System Automation MCP Server
 * Provides full system access: filesystem, application launching, desktop automation
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import { fileURLToPath } from "url";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = new Server(
  {
    name: "system-automation-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// PowerShell helper function
async function runPowerShell(script) {
  const encodedScript = Buffer.from(script).toString("base64");
  const command = `powershell -EncodedCommand ${encodedScript}`;
  const { stdout, stderr } = await execAsync(command, {
    maxBuffer: 10 * 1024 * 1024, // 10MB buffer
  });
  if (stderr && !stderr.includes("Warning")) {
    throw new Error(stderr);
  }
  return stdout.trim();
}

// List all available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // ========== FILESYSTEM OPERATIONS ==========
      {
        name: "read_file",
        description: "Read the contents of a file",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Absolute or relative path to the file",
            },
          },
          required: ["filePath"],
        },
      },
      {
        name: "write_file",
        description: "Write content to a file (creates if doesn't exist)",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Absolute or relative path to the file",
            },
            content: {
              type: "string",
              description: "Content to write to the file",
            },
          },
          required: ["filePath", "content"],
        },
      },
      {
        name: "list_directory",
        description: "List files and directories in a path",
        inputSchema: {
          type: "object",
          properties: {
            dirPath: {
              type: "string",
              description: "Path to the directory",
            },
          },
          required: ["dirPath"],
        },
      },
      {
        name: "create_directory",
        description: "Create a directory (and parent directories if needed)",
        inputSchema: {
          type: "object",
          properties: {
            dirPath: {
              type: "string",
              description: "Path to create",
            },
          },
          required: ["dirPath"],
        },
      },
      {
        name: "delete_file",
        description: "Delete a file or directory",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Path to file or directory to delete",
            },
          },
          required: ["filePath"],
        },
      },
      {
        name: "file_exists",
        description: "Check if a file or directory exists",
        inputSchema: {
          type: "object",
          properties: {
            filePath: {
              type: "string",
              description: "Path to check",
            },
          },
          required: ["filePath"],
        },
      },

      // ========== APPLICATION CONTROL ==========
      {
        name: "launch_application",
        description: "Launch any application by executable name, file path, or Windows app name",
        inputSchema: {
          type: "object",
          properties: {
            app: {
              type: "string",
              description: "Application name (e.g., 'excel', 'notepad', 'chrome') or full path to .exe",
            },
            args: {
              type: "array",
              items: { type: "string" },
              description: "Command line arguments",
            },
            file: {
              type: "string",
              description: "File to open with the application (optional)",
            },
          },
          required: ["app"],
        },
      },
      {
        name: "close_application",
        description: "Close an application by process name",
        inputSchema: {
          type: "object",
          properties: {
            processName: {
              type: "string",
              description: "Process name (e.g., 'excel', 'notepad')",
            },
          },
          required: ["processName"],
        },
      },
      {
        name: "list_running_applications",
        description: "List all currently running applications",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },

      // ========== DESKTOP AUTOMATION ==========
      {
        name: "send_keys",
        description: "Send keyboard input to the active window",
        inputSchema: {
          type: "object",
          properties: {
            keys: {
              type: "string",
              description: "Keys to send (e.g., 'Hello World', '{Enter}', '{Ctrl+A}')",
            },
            delay: {
              type: "number",
              description: "Delay between keystrokes in milliseconds (default: 50)",
            },
          },
          required: ["keys"],
        },
      },
      {
        name: "click",
        description: "Click at specific screen coordinates",
        inputSchema: {
          type: "object",
          properties: {
            x: {
              type: "number",
              description: "X coordinate",
            },
            y: {
              type: "number",
              description: "Y coordinate",
            },
            button: {
              type: "string",
              enum: ["left", "right", "middle"],
              description: "Mouse button (default: left)",
            },
          },
          required: ["x", "y"],
        },
      },
      {
        name: "get_window_by_title",
        description: "Find and activate a window by title",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Window title (partial match supported)",
            },
          },
          required: ["title"],
        },
      },
      {
        name: "list_windows",
        description: "List all open windows",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "take_screenshot",
        description: "Take a screenshot of the entire screen or a specific window",
        inputSchema: {
          type: "object",
          properties: {
            windowTitle: {
              type: "string",
              description: "Optional: Window title to screenshot (screenshots entire screen if omitted)",
            },
            savePath: {
              type: "string",
              description: "Optional: Path to save screenshot (default: temp directory)",
            },
          },
        },
      },

      // ========== SYSTEM COMMANDS ==========
      {
        name: "execute_command",
        description: "Execute a system command (PowerShell, CMD, or any executable)",
        inputSchema: {
          type: "object",
          properties: {
            command: {
              type: "string",
              description: "Command to execute",
            },
            shell: {
              type: "string",
              enum: ["powershell", "cmd", "default"],
              description: "Shell to use (default: powershell)",
            },
          },
          required: ["command"],
        },
      },
      {
        name: "get_clipboard",
        description: "Get clipboard contents",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "set_clipboard",
        description: "Set clipboard contents",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "Text to set in clipboard",
            },
          },
          required: ["text"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // ========== FILESYSTEM OPERATIONS ==========
      case "read_file": {
        const content = await fs.readFile(args.filePath, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      }

      case "write_file": {
        await fs.mkdir(path.dirname(args.filePath), { recursive: true });
        await fs.writeFile(args.filePath, args.content, "utf-8");
        return {
          content: [
            {
              type: "text",
              text: `File written successfully: ${args.filePath}`,
            },
          ],
        };
      }

      case "list_directory": {
        const entries = await fs.readdir(args.dirPath, { withFileTypes: true });
        const items = entries.map((entry) => ({
          name: entry.name,
          type: entry.isDirectory() ? "directory" : "file",
          path: path.join(args.dirPath, entry.name),
        }));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(items, null, 2),
            },
          ],
        };
      }

      case "create_directory": {
        await fs.mkdir(args.dirPath, { recursive: true });
        return {
          content: [
            {
              type: "text",
              text: `Directory created: ${args.dirPath}`,
            },
          ],
        };
      }

      case "delete_file": {
        const stats = await fs.stat(args.filePath);
        if (stats.isDirectory()) {
          await fs.rmdir(args.filePath, { recursive: true });
        } else {
          await fs.unlink(args.filePath);
        }
        return {
          content: [
            {
              type: "text",
              text: `Deleted: ${args.filePath}`,
            },
          ],
        };
      }

      case "file_exists": {
        try {
          await fs.access(args.filePath);
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ exists: true, path: args.filePath }),
              },
            ],
          };
        } catch {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({ exists: false, path: args.filePath }),
              },
            ],
          };
        }
      }

      // ========== APPLICATION CONTROL ==========
      case "launch_application": {
        let command = args.app;
        if (args.file) {
          command = `"${args.app}" "${args.file}"`;
        } else if (args.args && args.args.length > 0) {
          command = `"${args.app}" ${args.args.join(" ")}`;
        }

        const psScript = `
          Start-Process -FilePath "${args.app}" ${
          args.file ? `-ArgumentList "${args.file}"` : ""
        } ${args.args ? `-ArgumentList ${args.args.map((a) => `"${a}"`).join(",")}` : ""}
          Start-Sleep -Seconds 1
          Write-Output "Application launched: ${args.app}"
        `;

        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || `Application launched: ${args.app}`,
            },
          ],
        };
      }

      case "close_application": {
        const psScript = `
          Get-Process -Name "${args.processName}" -ErrorAction SilentlyContinue | Stop-Process -Force
          Write-Output "Closed: ${args.processName}"
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || `Application closed: ${args.processName}`,
            },
          ],
        };
      }

      case "list_running_applications": {
        const psScript = `
          Get-Process | Where-Object {$_.MainWindowTitle -ne ""} | 
          Select-Object ProcessName, MainWindowTitle, Id | 
          ConvertTo-Json
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      // ========== DESKTOP AUTOMATION ==========
      case "send_keys": {
        const delay = args.delay || 50;
        const psScript = `
          Add-Type -AssemblyName System.Windows.Forms
          $keys = "${args.keys.replace(/"/g, '\\"')}"
          $delay = ${delay}
          foreach ($char in $keys.ToCharArray()) {
            [System.Windows.Forms.SendKeys]::SendWait($char)
            Start-Sleep -Milliseconds $delay
          }
          Write-Output "Keys sent: ${args.keys}"
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || "Keys sent successfully",
            },
          ],
        };
      }

      case "click": {
        const button = args.button || "left";
        const psScript = `
          Add-Type -TypeDefinition @"
            using System;
            using System.Runtime.InteropServices;
            public class Mouse {
              [DllImport("user32.dll")]
              public static extern bool SetCursorPos(int x, int y);
              [DllImport("user32.dll")]
              public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, int dwExtraInfo);
              public const uint MOUSEEVENTF_LEFTDOWN = 0x02;
              public const uint MOUSEEVENTF_LEFTUP = 0x04;
              public const uint MOUSEEVENTF_RIGHTDOWN = 0x08;
              public const uint MOUSEEVENTF_RIGHTUP = 0x10;
            }
"@
          [Mouse]::SetCursorPos(${args.x}, ${args.y})
          Start-Sleep -Milliseconds 10
          if ("${button}" -eq "left") {
            [Mouse]::mouse_event([Mouse]::MOUSEEVENTF_LEFTDOWN, 0, 0, 0, 0)
            [Mouse]::mouse_event([Mouse]::MOUSEEVENTF_LEFTUP, 0, 0, 0, 0)
          } elseif ("${button}" -eq "right") {
            [Mouse]::mouse_event([Mouse]::MOUSEEVENTF_RIGHTDOWN, 0, 0, 0, 0)
            [Mouse]::mouse_event([Mouse]::MOUSEEVENTF_RIGHTUP, 0, 0, 0, 0)
          }
          Write-Output "Clicked at (${args.x}, ${args.y})"
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || "Click executed",
            },
          ],
        };
      }

      case "get_window_by_title": {
        const psScript = `
          Add-Type -TypeDefinition @"
            using System;
            using System.Runtime.InteropServices;
            public class Window {
              [DllImport("user32.dll")]
              public static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);
              [DllImport("user32.dll")]
              public static extern bool SetForegroundWindow(IntPtr hWnd);
              [DllImport("user32.dll")]
              public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder text, int count);
              public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
            }
"@
          $title = "${args.title}"
          $found = $false
          [Window]::EnumWindows({
            param($hWnd)
            $sb = New-Object System.Text.StringBuilder 256
            [Window]::GetWindowText($hWnd, $sb, $sb.Capacity) | Out-Null
            if ($sb.ToString() -like "*$title*") {
              [Window]::SetForegroundWindow($hWnd) | Out-Null
              $found = $true
              return $false
            }
            return $true
          }, [IntPtr]::Zero)
          if ($found) {
            Write-Output "Window activated: $title"
          } else {
            Write-Output "Window not found: $title"
          }
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      case "list_windows": {
        const psScript = `
          Get-Process | Where-Object {$_.MainWindowTitle -ne ""} | 
          Select-Object ProcessName, MainWindowTitle, Id | 
          ConvertTo-Json
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result,
            },
          ],
        };
      }

      case "take_screenshot": {
        const savePath =
          args.savePath ||
          path.join(
            process.env.TEMP || process.env.TMP || ".",
            `screenshot-${Date.now()}.png`
          );
        const psScript = `
          Add-Type -AssemblyName System.Windows.Forms
          Add-Type -AssemblyName System.Drawing
          $bounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
          $bitmap = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
          $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
          $graphics.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
          $bitmap.Save("${savePath.replace(/\\/g, "\\\\")}", [System.Drawing.Imaging.ImageFormat]::Png)
          $graphics.Dispose()
          $bitmap.Dispose()
          Write-Output "Screenshot saved: ${savePath}"
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || `Screenshot saved: ${savePath}`,
            },
          ],
        };
      }

      // ========== SYSTEM COMMANDS ==========
      case "execute_command": {
        const shell = args.shell || "powershell";
        let command = args.command;
        if (shell === "powershell") {
          command = `powershell -Command "${command.replace(/"/g, '\\"')}"`;
        } else if (shell === "cmd") {
          command = `cmd /c "${command.replace(/"/g, '\\"')}"`;
        }
        const { stdout, stderr } = await execAsync(command, {
          maxBuffer: 10 * 1024 * 1024,
        });
        return {
          content: [
            {
              type: "text",
              text: stdout || stderr || "Command executed",
            },
          ],
        };
      }

      case "get_clipboard": {
        const psScript = `
          Add-Type -AssemblyName System.Windows.Forms
          [System.Windows.Forms.Clipboard]::GetText()
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || "",
            },
          ],
        };
      }

      case "set_clipboard": {
        const psScript = `
          Add-Type -AssemblyName System.Windows.Forms
          [System.Windows.Forms.Clipboard]::SetText("${args.text.replace(/"/g, '\\"')}")
          Write-Output "Clipboard set"
        `;
        const result = await runPowerShell(psScript);
        return {
          content: [
            {
              type: "text",
              text: result || "Clipboard set",
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("System Automation MCP server running on stdio");
}

main().catch(console.error);

