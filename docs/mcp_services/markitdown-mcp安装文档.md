# Markitdown-MCP 安装与配置文档

## 1. 项目概述

**MarkItDown-MCP** 是一个轻量级STDIO和SSE MCP服务器，用于调用MarkItDown工具。它提供了一个强大的文档转换工具，能够将各种格式的文件（PDF、Word、Excel、PowerPoint等）转换为Markdown格式，方便在LLM应用中使用。

### 1.1 主要功能

MarkItDown-MCP暴露了一个核心工具：`convert_to_markdown(uri)`，其中uri可以是任何`http:`、`https:`、`file:`或`data:`URI。

### 1.2 支持的文件格式

- PDF
- PowerPoint
- Word
- Excel
- 图像（包含EXIF元数据和OCR）
- 音频（包含EXIF元数据和语音转录）
- HTML
- 基于文本的格式（CSV、JSON、XML）
- ZIP文件（遍历内容）
- YouTube URL
- EPub
- 等等

## 2. 安装目的

在Mac Studio M3 Ultra大模型实验平台上安装MarkItDown-MCP的主要目的是：

1. **增强Claude与各类文档的交互能力** - 使Claude能够理解和处理各种格式的文档
2. **提升信息提取效率** - 将非文本格式文档转换为结构化的Markdown格式，保留重要信息和格式
3. **支持复杂数据分析** - 帮助处理和分析复杂的文档数据
4. **丰富平台工具链** - 作为大模型实验平台的重要工具补充

## 3. 安装流程记录

由于MarkItDown-MCP需要Python 3.10或更高版本，而当前系统使用的是Python 3.9.13，因此采用了创建独立Python环境的方式进行安装。

### 3.1 环境准备

首先创建一个独立的Python 3.10环境：

```bash
conda create -n markitdown python=3.10 -y
conda activate markitdown
```

### 3.2 安装MarkItDown-MCP

在激活的markitdown环境中安装包：

```bash
pip install markitdown-mcp
```

这将自动安装markitdown-mcp及其所有依赖项（包括核心的markitdown库和MCP服务器组件）。

### 3.3 配置Claude桌面版集成

创建Claude配置目录并设置配置文件：

```bash
mkdir -p ~/.config/Claude/
```

编辑Claude配置文件`~/.config/Claude/claude_desktop_config.json`，添加以下内容：

```json
{
  "mcpServers": {
    "markitdown": {
      "command": "conda",
      "args": [
        "run",
        "-n",
        "markitdown",
        "markitdown-mcp"
      ]
    }
  }
}
```

这种配置方式确保Claude可以在独立的conda环境中运行markitdown-mcp服务器，避免与系统Python环境的冲突。

## 4. 使用方法

### 4.1 基本使用

在Claude桌面版中，可以通过以下方式使用MarkItDown：

1. 启动Claude桌面版
2. 使用类似以下的提示语：
   ```
   请帮我分析这个PDF文档：[文件路径或URL]
   ```

3. Claude将自动调用MarkItDown-MCP服务器处理文档，然后基于文档内容进行分析或回答问题

### 4.2 本地文件访问

要访问本地文件，需要确保文件路径格式正确。例如：

```
file:///Users/username/Documents/example.pdf
```

### 4.3 Web内容转换

可以直接提供网页URL，MarkItDown-MCP会将网页内容转换为Markdown格式：

```
https://example.com/page.html
```

## 5. 故障排除

### 5.1 常见问题

1. **Python版本错误**：确保使用Python 3.10或更高版本
2. **路径问题**：确保文件路径格式正确，对于本地文件使用`file://`前缀
3. **权限问题**：确保服务器有足够的权限读取文件

### 5.2 调试方法

可以使用`mcpinspector`工具进行调试：

```bash
conda activate markitdown
npm install -g @modelcontextprotocol/inspector
npx @modelcontextprotocol/inspector
```

然后通过浏览器访问http://localhost:5173/，选择STDIO模式并输入以下命令：

```
conda run -n markitdown markitdown-mcp
```

点击"Connect"，然后使用"Tools"选项卡测试功能。

## 6. 安全考虑

MarkItDown-MCP服务器在默认情况下没有身份验证功能，会以运行它的用户权限运行。出于这个原因，在SSE模式下运行服务器时，建议将服务器绑定到`localhost`。

## 7. 参考资源

- [MarkItDown GitHub仓库](https://github.com/microsoft/markitdown)
- [MarkItDown-MCP文档](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp)
- [Model Context Protocol文档](https://modelcontextprotocol.io/)

## 8. 维护记录

| 日期 | 操作 | 操作人 |
|------|------|--------|
| 2025-04-21 | 初始安装 | 系统管理员 |

---

文档创建日期：2025-04-21
文档版本：1.0 