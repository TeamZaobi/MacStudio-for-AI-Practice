# Mac Studio M3 Ultra 大模型实验平台

![版本](https://img.shields.io/badge/版本-1.0-blue)
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
- [系统架构](docs/architecture.md) - 系统架构和组件说明
- [环境管理](docs/environment_management.md) - 环境创建和管理指南
- [模型管理](docs/model_management.md) - 模型获取、存储和使用指南
- [实验指南](docs/experiment_guide.md) - 实验设计和执行标准
- [远程访问](docs/remote_access.md) - 远程访问设置和使用指南
- [故障排查](docs/troubleshooting.md) - 常见问题和解决方案
- [Vibe Coding规则](vibe_coding_rules.md) - AI辅助编码工具规则

## 目录结构

```
mac-studio-llm-platform/
├── README.md                 # 项目总体说明
├── prd.md                    # 产品需求文档
├── vibe_coding_rules.md      # Vibe Coding规则
├── documentation_system.md   # 文档管理系统说明
├── docs/                     # 详细文档
│   ├── architecture.md       # 系统架构
│   ├── environment_management.md  # 环境管理
│   └── ...
├── environments/             # 环境配置文件
│   ├── base_env.yml
│   └── ...
├── models/                   # 模型管理
│   ├── README.md
│   └── metadata/
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
