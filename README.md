# Mac Studio M3 Ultra 大模型实验平台

![版本](https://img.shields.io/badge/版本-2.0-blue)
![状态](https://img.shields.io/badge/状态-开发中-yellow)

## 项目概述

Mac Studio M3 Ultra 大模型实验平台是一个专为探索、测试和评估最新的大型语言模型（包括671B级别的DeepSeek模型）、新兴应用范式及相关工具链而设计的环境。本平台利用Mac Studio M3 Ultra的强大性能，结合严格的环境隔离、全面的性能监控和便捷的远程访问，为大模型实验提供了一个灵活、高效的解决方案。

## 核心特性

- **环境隔离**: 使用Conda/Miniforge实现Python环境隔离，避免依赖冲突
- **多框架支持**: 支持Ollama、Llama.cpp、MLX、PyTorch等多种框架
- **模型管理**: 清晰的模型存储结构和元数据管理系统
- **远程访问**: 基于Tailscale的安全网络连接，实现从任何位置访问
- **实验管理**: 使用Weights & Biases追踪实验参数、指标和结果
- **文档系统**: 严谨详细的文档管理，记录经验和最佳实践

## 版本历史

### [当前日期] - v2.0 (增强规范性与过程卫生)

- **MCP 服务管理:**
    - 引入详细的 `docs/mcp_services/MCP服务管理指南.md`，包含分阶段实践。
    - 增加明确的"路径与结构规范"，统一管理服务代码、配置、环境和文档。
    - 区分 `stdio` 和 `sse`/`http` 服务管理策略，推荐为后者使用 Docker Compose。
    - 强化密钥管理和 `.gitignore` 配置要求。
- **文档系统:**
    - `documentation_system.md` 明确要求所有文档类型纳入版本控制，并鼓励贡献知识库。
    - 更新文档模板和自动化脚本示例。
- **Vibe Coding 规则:**
    - `.cursor/rules/vibe_coding_rules.mdc` 全面更新，与 `documentation_system.mdc`, `prd.mdc`, `MCP服务管理指南.md` 对齐。
    - 增加文档版本控制、知识库贡献、资源意识、检查客户端文档、模型路径引用等规则。
- **PRD:**
    - 新增"标准与流程演进规范"功能需求，确保未来扩展的一致性。
    - 微调用户故事验收标准，反映更严格的文档和规则要求。
- **平台部署指南 (`docs/Mac Studio.md`):**
    - 更新版本至 2.2。
    - 整合路径规范、MCP 管理策略、文档化实践和平台演进规范等最新要求。
    - 明确实验管理工具首选 WandB。

## 快速开始

### 1. 环境设置

```bash
# 克隆仓库
git clone https://github.com/yourusername/mac-studio-llm-platform.git
cd mac-studio-llm-platform

# 创建基础环境
conda create -n base_env python=3.10 -y
conda activate base_env
pip install -r requirements.txt
```

### 2. 远程访问设置

请参考 [远程访问设置指南](docs/remote_access.md) 配置Tailscale和SSH连接。

### 3. 运行第一个实验

```bash
# 激活环境
conda activate llm_env

# 运行示例实验
python experiments/example_inference.py --model llama2-7b --quantize 4bit
```

## 文档导航

- [产品需求文档](prd.md) - 详细的产品需求和规划
- [文档管理系统](documentation_system.md) - 文档结构、标准和模板
- [系统架构](docs/architecture.md) - 系统架构和组件说明
- [平台部署指南](docs/Mac%20Studio.md) - Mac Studio 配置和工作流指南
- [环境管理](docs/environment_management.md) - 环境创建和管理指南
- [模型管理](docs/model_management.md) - 模型获取、存储和使用指南
- [实验指南](docs/experiment_guide.md) - 实验设计和执行标准
- [远程访问](docs/remote_access.md) - 远程访问设置和使用指南
- [MCP服务管理指南](docs/mcp_services/MCP服务管理指南.md) - MCP 服务管理最佳实践
- [知识库 - 故障排查](knowledge_base/troubleshooting.md) - 常见问题和解决方案
- [知识库 - 最佳实践](knowledge_base/best_practices.md) - 最佳实践集合
- [Vibe Coding规则](vibe_coding_rules.md) - AI辅助编码工具规则

## 目录结构

```
mac-studio-llm-platform/
├── README.md                 # 项目总体说明
├── prd.md                    # 产品需求文档 (或 .cursor/rules/prd.mdc)
├── .cursor/                  # Cursor 配置和规则
│   └── rules/
│       ├── vibe_coding_rules.mdc
│       ├── documentation_system.mdc
│       └── ...               # 其他 .mdc 规则文件
├── docs/                     # 详细文档
│   ├── architecture.md       # 系统架构
│   ├── Mac Studio.md         # 平台部署指南
│   ├── environment_management.md  # 环境管理
│   └── ...
│   └── mcp_services/         # MCP 服务文档
│       └── MCP服务管理指南.md
│       └── {service_name}.md
├── environments/             # 环境配置文件 (Conda .yml, requirements.txt等)
│   ├── base_env.yml
│   └── ...
├── models/                   # 模型管理 (结构遵循 Mac Studio.md)
│   ├── README.md
│   └── metadata/
├── mcp_services/             # MCP 服务代码 (结构遵循 MCP 指南)
│   ├── service_a/
│   └── service_b/
├── experiments/              # 实验代码
│   ├── templates/
│   └── examples/
├── scripts/                  # 实用脚本
│   ├── create_env.py
│   └── ...
└── knowledge_base/           # 知识库
    ├── best_practices.md
    └── troubleshooting.md
```

## 使用场景

本平台适用于以下场景：

1. **模型评估**: 测试和比较不同大型语言模型的性能和能力
2. **应用开发**: 开发基于大模型的应用和工具
3. **微调实验**: 进行小规模的模型微调和适应
4. **Agent研究**: 探索和开发基于大模型的Agent系统
5. **技术验证**: 验证新兴的LLM技术和方法

## 贡献指南

欢迎贡献代码、文档或知识！请参考 [贡献指南](docs/contributing.md) 了解详情。

## 许可证

[MIT License](LICENSE)

## 联系方式

如有问题或建议，请联系项目维护者。
