# Markitdown MCP服务

## 1. 服务概述

**服务名称**：markitdown
**功能**：将各种格式的文档转换为Markdown格式
**协议**：Model Context Protocol (MCP)
**版本**：0.0.1a3
**维护者**：系统管理员

Markitdown MCP服务是一个轻量级的STDIO和SSE MCP服务器，用于调用MarkItDown工具将各种格式的文档（PDF、Office文档、图像等）转换为Markdown格式。此服务为Claude AI提供了处理多种文档格式的能力，极大地扩展了Claude的应用场景。

## 2. 功能特性

服务提供的核心工具：`convert_to_markdown(uri)`，其中uri可以是：
- `http:`或`https:` - 网络资源
- `file:` - 本地文件
- `data:` - 数据URI

### 2.1 支持的文档格式

- **文档**：PDF、Word (DOCX)、PowerPoint (PPTX)、Excel (XLSX/XLS)、EPub
- **图像**：JPG、PNG、GIF等（包含EXIF元数据和OCR）
- **音频**：WAV、MP3等（包含EXIF元数据和语音转录）
- **网页**：HTML
- **文本**：CSV、JSON、XML、Markdown
- **压缩文件**：ZIP（遍历内容）
- **在线资源**：YouTube视频（转录）

## 3. 安装与配置

### 3.1 环境要求

- Python 3.10或更高版本
- Conda环境管理
- 足够的存储空间用于处理文档

### 3.2 安装步骤

```bash
# 创建专用conda环境
conda create -n markitdown python=3.10 -y
conda activate markitdown

# 安装markitdown-mcp
pip install markitdown-mcp
```

### 3.3 Claude Desktop配置

在Claude Desktop配置文件中添加服务：

**配置文件位置**：`~/Library/Application Support/Claude/claude_desktop_config.json`

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

### 3.4 配置选项

服务可以以两种模式运行：

1. **STDIO模式**（默认）- 适用于Claude Desktop等客户端
   ```bash
   markitdown-mcp
   ```

2. **SSE模式** - 提供网络服务
   ```bash
   markitdown-mcp --sse --host 127.0.0.1 --port 3001
   ```

### 3.5 容器部署选项

可以使用Docker容器运行服务：

```bash
# 构建镜像
docker build -t markitdown-mcp:latest .

# 运行容器
docker run -it --rm markitdown-mcp:latest

# 挂载本地目录访问文件
docker run -it --rm -v /本地路径:/workdir markitdown-mcp:latest
```

## 4. 使用方法

### 4.1 基本用法

在Claude中，只需提供文档的URI，服务会自动将其转换为Markdown：

```
请帮我分析这个PDF文档：file:///Users/username/Documents/document.pdf
```

### 4.2 本地文件访问

访问本地文件时，需要使用正确的file URI格式：

```
file:///absolute/path/to/file.pdf
```

注意：
- 必须使用绝对路径
- 需要三个斜杠（一个为协议，两个为根路径）
- 路径中的空格需要编码为%20

### 4.3 网络资源访问

访问网络资源时，直接使用URL：

```
https://example.com/document.pdf
```

### 4.4 输出格式

服务将文档转换为结构化的Markdown，保留：
- 标题结构
- 列表和编号
- 表格
- 链接和引用
- 图像（转换为描述或链接）
- 代码块和格式化文本

## 5. 故障排查

### 5.1 常见问题

1. **Python版本错误**
   - 错误信息：`Requires-Python >=3.10`
   - 解决方案：使用Python 3.10或更高版本的环境

2. **文件路径问题**
   - 错误：找不到文件
   - 解决方案：确保使用正确的file URI格式和绝对路径

3. **权限问题**
   - 错误：无法访问文件
   - 解决方案：确保服务有文件的读取权限

4. **大文件处理**
   - 错误：处理超时或内存错误
   - 解决方案：增加服务器资源或拆分大文件

### 5.2 调试方法

使用MCP Inspector工具调试服务：

```bash
# 安装inspector
npm install -g @modelcontextprotocol/inspector

# 运行inspector
npx @modelcontextprotocol/inspector
```

通过浏览器访问`http://localhost:5173/`：
1. 选择STDIO或SSE连接类型
2. 输入服务命令或URL
3. 点击"Connect"
4. 测试服务功能

### 5.3 日志位置

- Claude Desktop日志：`~/Library/Logs/Claude/`
- MCP服务器日志：`~/Library/Logs/Claude/mcp-server-markitdown.log`

## 6. 安全考虑

- 服务运行时使用启动它的用户权限
- 默认情况下没有身份验证机制
- 推荐在SSE模式下绑定到localhost
- 注意处理敏感文档时的数据安全

## 7. 依赖项

主要依赖包括：
- markitdown (0.1.1+)
- mcp
- 文档处理库（根据文档类型）：
  - PDF: pdfminer-six
  - Office: mammoth, openpyxl, python-pptx
  - 图像: PIL
  - 音频: pydub, speechrecognition
  - 其他格式的特定处理库

## 8. 使用案例

- **文档分析**：将复杂文档转换为Claude可处理的格式
- **数据提取**：从PDF报告、表格等提取信息
- **内容总结**：帮助Claude理解和总结文档内容
- **文档比较**：转换多个文档以便比较差异
- **知识库构建**：将各种格式的文档整合到知识库中

## 9. 参考资源

- [MarkItDown GitHub](https://github.com/microsoft/markitdown)
- [MarkItDown-MCP文档](https://github.com/microsoft/markitdown/tree/main/packages/markitdown-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop文档](https://claude.ai/docs)

## 维护记录

| 日期 | 版本 | 内容 | 操作人 |
|------|------|------|--------|
| 2025-04-21 | 1.0 | 初始安装和配置 | 系统管理员 |

---

文档创建日期：2025-04-21
文档版本：1.0 