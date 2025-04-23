# Context7 MCP服务

## 1. 服务概述

**服务名称**：context7-mcp
**功能**：为Claude提供实时Web搜索、文档检索和代码搜索功能
**协议**：Model Context Protocol (MCP)
**版本**：1.0.0
**维护者**：系统管理员

Context7 MCP服务是一个功能强大的MCP服务器，它使Claude AI能够访问来自GitHub仓库upstash/context7的实时文档和代码。服务支持对文档进行语义搜索、代码查询以及获取外部URL内容，极大地增强了Claude在技术文档分析、代码理解和实时信息检索方面的能力。

## 2. 功能特性

服务提供的核心工具：

- **fetch_context7_documentation**: 获取整个Context7文档
- **search_context7_documentation**: 在Context7文档中进行语义搜索
- **search_context7_code**: 在Context7代码仓库中搜索代码
- **fetch_generic_url_content**: 获取任意URL的内容（遵循robots.txt规则）
- **web_search**: 进行实时Web搜索（可选功能）

## 3. 安装与配置

### 3.1 环境要求

- Node.js 18或更高版本
- NPM或Yarn包管理器
- 网络连接（用于实时信息获取）

### 3.2 安装步骤

```bash
# 全局安装
npm install -g @upstash/context7-mcp

# 或使用npx直接运行（无需安装）
npx @upstash/context7-mcp
```

### 3.3 Claude Desktop配置

在Claude Desktop配置文件中添加服务：

**配置文件位置**：`~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "context7-mcp": {
      "command": "npx",
      "args": [
        "@upstash/context7-mcp"
      ]
    }
  }
}
```

### 3.4 配置选项

服务可以通过环境变量或配置文件进行定制：

1. **环境变量配置**:
   ```bash
   CONTEXT7_API_KEY=your_api_key npx @upstash/context7-mcp
   ```

2. **配置文件** (`.context7rc`):
   ```json
   {
     "apiKey": "your_api_key",
     "searchLimit": 10,
     "cacheExpiry": 3600
   }
   ```

### 3.5 API密钥获取

如需使用高级功能（如更高的搜索限制或专用API），请访问[Context7官网](https://context7.io)获取API密钥。

## 4. 使用方法

### 4.1 基本用法

在Claude中，可以使用以下方式调用服务：

```
请帮我查找Context7文档中关于Redis集成的信息。
```

Claude会自动使用appropriate MCP工具获取相关信息。

### 4.2 文档搜索

使用语义搜索在Context7文档中查找信息：

```
请搜索Context7文档中关于"连接字符串格式"的内容。
```

### 4.3 代码搜索

在Context7代码库中搜索特定代码：

```
请查找Context7代码库中关于处理WebSocket连接的代码实现。
```

### 4.4 URL内容获取

获取特定URL的内容：

```
请获取并分析这个URL的内容：https://example.com/api-docs.html
```

### 4.5 Web搜索（如可用）

进行实时网络搜索：

```
请搜索最新的Context7版本发布信息。
```

## 5. 故障排查

### 5.1 常见问题

1. **连接错误**
   - 错误：无法连接到服务
   - 解决方案：检查网络连接和服务配置

2. **API限制**
   - 错误：达到API调用限制
   - 解决方案：获取或升级API密钥，或减少请求频率

3. **权限问题**
   - 错误：无法访问某些URL
   - 解决方案：确认URL是公开可访问的且符合robots.txt规则

4. **超时问题**
   - 错误：请求超时
   - 解决方案：检查网络连接，或设置更长的超时时间

### 5.2 调试方法

使用以下命令启用调试日志：

```bash
DEBUG=context7:* npx @upstash/context7-mcp
```

可以使用MCP Inspector工具进行更详细的调试：

```bash
npx @modelcontextprotocol/inspector
```

### 5.3 日志位置

- Claude Desktop日志：`~/Library/Logs/Claude/`
- MCP服务器日志：`~/Library/Logs/Claude/mcp-server-context7-mcp.log`

## 6. 安全考虑

- 服务访问的是公开可用的信息
- API密钥应妥善保管，不应包含在共享代码中
- 服务遵循robots.txt规则，尊重网站访问策略
- 对于敏感信息，应审查查询和响应内容

## 7. 使用限制

免费版本可能有以下限制：
- API调用次数限制
- 搜索结果数量限制
- 并发请求限制
- 缓存过期时间限制

具体限制可能随时变化，请参考官方文档获取最新信息。

## 8. 使用案例

- **技术文档检索**：快速查找Context7特定功能的文档
- **代码实现分析**：理解Context7内部实现机制
- **问题排查辅助**：查找错误代码相关信息
- **最新信息获取**：获取Context7最新发布和更新信息
- **API理解**：分析和理解Context7 API用法

## 9. 参考资源

- [Context7 GitHub仓库](https://github.com/upstash/context7)
- [Context7官方文档](https://context7.io/docs)
- [Model Context Protocol文档](https://modelcontextprotocol.io/)
- [Claude Desktop文档](https://claude.ai/docs)

## 维护记录

| 日期 | 版本 | 内容 | 操作人 |
|------|------|------|--------|
| 2025-04-21 | 1.0 | 初始安装和配置 | 系统管理员 |

---

文档创建日期：2025-04-21
文档版本：1.0 