# Mac Studio M3 Ultra 文档管理系统

## 1. 概述

本文档详细描述了Mac Studio M3 Ultra大模型实验平台的文档管理系统。严谨详细的文档管理是确保实验可复现性、知识积累和经验传承的关键。本系统旨在提供一个全面的框架，用于记录、组织和共享与平台相关的所有知识和经验。

## 2. 文档结构

### 2.1 多层次文档架构

文档管理系统采用分层结构，确保信息的组织性和可访问性：

1. **平台级文档**
   - `README.md` - 项目总体说明
   - `prd.md` - 产品需求文档
   - `architecture.md` - 系统架构概述
   - `setup_guide.md` - 初始设置指南
   - `maintenance.md` - 维护计划和指南

2. **环境级文档**
   - `/environments/README.md` - 环境管理概述
   - `/environments/{env_name}.md` - 每个环境的详细文档
   - `/environments/templates/` - 环境模板和最佳实践

3. **模型级文档**
   - `/models/README.md` - 模型管理概述
   - `/models/catalog.md` - 模型目录和元数据
   - `/models/{model_family}/` - 特定模型家族的文档

4. **实验级文档**
   - `/experiments/README.md` - 实验管理概述
   - `/experiments/{experiment_type}/` - 按实验类型组织的文档
   - `/experiments/templates/` - 实验模板和标准

5. **工具和脚本文档**
   - `/tools/README.md` - 工具概述
   - `/tools/{tool_name}.md` - 每个工具的详细文档
   - `/scripts/README.md` - 脚本库概述

6. **知识库**
   - `/knowledge_base/README.md` - 知识库概述
   - `/knowledge_base/troubleshooting.md` - 问题排查指南
   - `/knowledge_base/best_practices.md` - 最佳实践集合
   - `/knowledge_base/lessons_learned.md` - 经验教训记录

7. **Vibe Coding规则**
   - `/vibe_coding/README.md` - Vibe Coding概述
   - `/vibe_coding/cursor_rules.md` - Cursor规则文件
   - `/vibe_coding/code_snippets.md` - 代码片段库

## 3. 文档标准

### 3.1 文件命名约定

- 使用小写字母和下划线
- 文件名应简洁明了，反映内容
- 使用标准的文件扩展名（`.md`、`.yml`等）
- 示例：`model_loading_guide.md`、`experiment_template.yml`

### 3.2 文档格式标准

- 使用Markdown格式（GitHub Flavored Markdown）
- 每个文档应包含标题、日期、作者和版本信息
- 使用标准的标题层级（`#`、`##`、`###`等）
- 代码块应指定语言（如```python）
- 使用表格组织结构化数据
- 使用链接引用相关文档

### 3.3 文档模板

每类文档都有标准模板，确保一致性和完整性：

#### 实验文档模板
```markdown
# 实验：{实验名称}

## 元数据
- **ID**: {实验ID}
- **日期**: {YYYY-MM-DD}
- **作者**: {作者名}
- **环境**: {环境名称}
- **模型**: {使用的模型}
- **标签**: {相关标签}

## 目标
{实验目标的简明描述}

## 方法
{实验方法的详细描述}

## 设置
{环境设置、参数配置等}

```python
# 关键配置代码
```

## 结果
{实验结果的描述和分析}

## 结论
{从实验中得出的结论}

## 后续步骤
{建议的后续实验或改进}

## 参考
{相关文档、论文或资源的链接}
```

#### 模型文档模板
```markdown
# 模型：{模型名称}

## 元数据
- **名称**: {模型全名}
- **来源**: {Hugging Face/GitHub/其他}
- **URL**: {源URL}
- **参数量**: {参数数量}
- **格式**: {原始格式}
- **下载日期**: {YYYY-MM-DD}

## 描述
{模型的简要描述}

## 量化版本
- **4-bit**: {路径和性能特点}
- **8-bit**: {路径和性能特点}
- **GGUF**: {路径和性能特点}

## 性能特点
{在Mac Studio上的性能特点}

## 使用示例
```python
# 加载和使用模型的示例代码
```

## 注意事项
{使用此模型时的特殊考虑}

## 相关实验
{使用此模型的实验链接}
```

## 4. 自动化文档生成

### 4.1 环境文档自动生成

使用脚本自动从Conda环境生成文档：

```python
# 示例：环境文档生成脚本
import subprocess
import yaml
import os
from datetime import datetime

def generate_env_doc(env_name):
    """为指定的Conda环境生成文档"""
    # 获取环境信息
    result = subprocess.run(
        f"conda env export -n {env_name}",
        shell=True, capture_output=True, text=True
    )
    env_yaml = yaml.safe_load(result.stdout)
    
    # 生成文档
    doc = f"# 环境：{env_name}\n\n"
    doc += f"## 元数据\n"
    doc += f"- **创建日期**: {datetime.now().strftime('%Y-%m-%d')}\n"
    doc += f"- **Python版本**: {env_yaml['dependencies'][0].split('=')[1]}\n"
    doc += f"- **用途**: [填写环境用途]\n\n"
    
    doc += f"## 依赖包\n\n"
    doc += "### 核心包\n\n"
    doc += "| 包名 | 版本 | 用途 |\n"
    doc += "|------|------|------|\n"
    
    # 添加主要包信息
    for dep in env_yaml['dependencies']:
        if isinstance(dep, str) and not dep.startswith('python'):
            name = dep.split('=')[0]
            version = dep.split('=')[1] if '=' in dep else "latest"
            doc += f"| {name} | {version} | [填写用途] |\n"
    
    # 保存文档
    os.makedirs("environments", exist_ok=True)
    with open(f"environments/{env_name}.md", "w") as f:
        f.write(doc)
    
    print(f"环境文档已生成：environments/{env_name}.md")

# 使用示例
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        generate_env_doc(sys.argv[1])
    else:
        print("请提供环境名称")
```

### 4.2 实验记录自动化

使用Jupyter notebooks自动记录实验过程：

```python
# 在notebook开头添加的自动记录元数据的代码
import wandb
from datetime import datetime
import getpass
import socket
import sys
import platform
import torch
import os

# 记录实验元数据
experiment_metadata = {
    "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    "user": getpass.getuser(),
    "hostname": socket.gethostname(),
    "python_version": sys.version,
    "platform": platform.platform(),
    "torch_version": torch.__version__,
    "cuda_available": torch.cuda.is_available(),
    "gpu_info": torch.cuda.get_device_name(0) if torch.cuda.is_available() else "N/A",
    "experiment_name": "实验名称",  # 修改为实际实验名称
}

# 显示元数据
for key, value in experiment_metadata.items():
    print(f"{key}: {value}")

# 可选：初始化WandB
wandb.init(
    project="mac-studio-experiments",
    name=experiment_metadata["experiment_name"],
    config=experiment_metadata
)

# 实验结束时，导出notebook为markdown
def export_notebook_to_md():
    notebook_name = os.path.basename(globals()['_dh'][0])
    os.system(f"jupyter nbconvert --to markdown {notebook_name}.ipynb")
    print(f"Notebook已导出为markdown: {notebook_name}.md")
```

### 4.3 模型元数据自动化

使用脚本自动记录模型元数据：

```python
# 示例：模型元数据记录脚本
import json
import os
import argparse
from datetime import datetime
import hashlib

def calculate_file_hash(filepath):
    """计算文件的SHA256哈希值"""
    sha256_hash = hashlib.sha256()
    with open(filepath, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def record_model_metadata(model_path, model_name, source_url, model_type, description):
    """记录模型元数据"""
    # 获取文件信息
    file_size = os.path.getsize(model_path) / (1024 * 1024 * 1024)  # 转换为GB
    file_hash = calculate_file_hash(model_path)
    
    # 创建元数据
    metadata = {
        "name": model_name,
        "file_path": model_path,
        "file_size_gb": round(file_size, 2),
        "file_hash": file_hash,
        "source_url": source_url,
        "model_type": model_type,
        "description": description,
        "date_added": datetime.now().strftime("%Y-%m-%d"),
        "added_by": os.getenv("USER")
    }
    
    # 确保目录存在
    os.makedirs("models/metadata", exist_ok=True)
    
    # 保存元数据
    metadata_path = f"models/metadata/{model_name.replace('/', '_')}.json"
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=2)
    
    # 更新目录
    update_model_catalog(metadata)
    
    print(f"模型元数据已记录：{metadata_path}")

def update_model_catalog(metadata):
    """更新模型目录"""
    catalog_path = "models/catalog.md"
    
    # 如果目录不存在，创建它
    if not os.path.exists(catalog_path):
        with open(catalog_path, "w") as f:
            f.write("# 模型目录\n\n")
            f.write("| 模型名称 | 类型 | 大小(GB) | 添加日期 | 描述 |\n")
            f.write("|---------|------|----------|----------|------|\n")
    
    # 添加新模型到目录
    with open(catalog_path, "a") as f:
        f.write(f"| {metadata['name']} | {metadata['model_type']} | {metadata['file_size_gb']} | {metadata['date_added']} | {metadata['description']} |\n")

# 使用示例
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="记录模型元数据")
    parser.add_argument("--path", required=True, help="模型文件路径")
    parser.add_argument("--name", required=True, help="模型名称")
    parser.add_argument("--url", required=True, help="模型源URL")
    parser.add_argument("--type", required=True, help="模型类型")
    parser.add_argument("--desc", required=True, help="模型描述")
    
    args = parser.parse_args()
    record_model_metadata(args.path, args.name, args.url, args.type, args.desc)
```

## 5. 版本控制与同步

### 5.1 文档版本控制

- 所有文档都应纳入Git版本控制
- 文档更新应包含有意义的提交消息
- 重大更新应创建标签或发布版本
- 文档应与代码保持同步，使用相同的分支和标签

### 5.2 文档更新工作流

1. **检查**: 确认文档是否需要更新
2. **更新**: 修改相关文档
3. **审查**: 自我审查或请同事审查
4. **提交**: 提交更改，包含清晰的提交消息
5. **同步**: 确保文档与代码同步

### 5.3 文档审查清单

- [ ] 文档格式是否符合标准？
- [ ] 内容是否准确、最新？
- [ ] 是否包含所有必要信息？
- [ ] 链接是否有效？
- [ ] 是否有拼写或语法错误？
- [ ] 是否与相关文档保持一致？

## 6. 知识库管理

### 6.1 问题与解决方案记录

每当遇到并解决问题时，应记录到知识库中：

```markdown
## 问题: {简明问题描述}

### 症状
{详细描述问题的表现}

### 环境
- **系统**: macOS {版本}
- **硬件**: Mac Studio M3 Ultra
- **相关软件**: {软件名称和版本}

### 原因
{问题的根本原因分析}

### 解决方案
{详细的解决步骤}

```bash
# 如果适用，包含相关命令
```

### 注意事项
{使用此解决方案时的注意事项}

### 参考
{相关资源链接}
```

### 6.2 最佳实践收集

持续收集和更新最佳实践：

```markdown
## 最佳实践: {实践名称}

### 适用场景
{描述此最佳实践适用的场景}

### 实践详情
{详细描述最佳实践}

### 示例
```python
# 示例代码
```

### 好处
{采用此实践的好处}

### 注意事项
{实施此实践时的注意事项}
```

### 6.3 经验教训记录

记录项目中的经验教训：

```markdown
## 经验教训: {简明描述}

### 背景
{提供背景信息}

### 事件
{描述发生的事件}

### 影响
{事件的影响}

### 学到的教训
{从事件中学到的教训}

### 改进建议
{如何避免类似问题或改进流程}
```

## 7. 文档维护

### 7.1 定期审查

- 每月审查一次核心文档
- 每季度审查一次所有文档
- 使用审查清单确保质量

### 7.2 文档健康检查

定期运行脚本检查文档健康状况：

```python
# 示例：文档健康检查脚本
import os
import re
import datetime

def check_docs_health(docs_dir):
    """检查文档健康状况"""
    issues = []
    
    # 遍历所有markdown文件
    for root, _, files in os.walk(docs_dir):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                
                # 检查文件
                with open(filepath, "r") as f:
                    content = f.read()
                    
                    # 检查标题
                    if not re.search(r'^# ', content, re.MULTILINE):
                        issues.append(f"{filepath}: 缺少主标题")
                    
                    # 检查日期
                    if not re.search(r'\d{4}-\d{2}-\d{2}', content):
                        issues.append(f"{filepath}: 可能缺少日期")
                    
                    # 检查空链接
                    if re.search(r'\[\]\(\)', content):
                        issues.append(f"{filepath}: 包含空链接")
                    
                    # 检查TODO标记
                    todos = re.findall(r'TODO', content)
                    if todos:
                        issues.append(f"{filepath}: 包含{len(todos)}个TODO标记")
    
    # 生成报告
    report = f"# 文档健康检查报告\n\n"
    report += f"**日期:** {datetime.datetime.now().strftime('%Y-%m-%d')}\n\n"
    
    if issues:
        report += "## 发现的问题\n\n"
        for issue in issues:
            report += f"- {issue}\n"
    else:
        report += "**恭喜!** 未发现文档问题。\n"
    
    # 保存报告
    with open("doc_health_report.md", "w") as f:
        f.write(report)
    
    print(f"文档健康检查完成，发现{len(issues)}个问题。详情请查看doc_health_report.md")

# 使用示例
if __name__ == "__main__":
    check_docs_health(".")
```

### 7.3 文档更新日志

维护一个文档更新日志，记录重要变更：

```markdown
# 文档更新日志

## [2023-12-01]
### 添加
- 添加了模型管理指南
- 添加了实验模板

### 修改
- 更新了环境设置指南
- 改进了故障排查文档

### 修复
- 修复了安装指南中的错误链接
```

## 8. 与Vibe Coding工具集成

### 8.1 Cursor Rules文件与文档同步

确保Cursor Rules文件与文档系统保持同步：

- Rules文件应引用相关文档
- 文档应包含Rules文件的相关部分
- 更新Rules文件时同时更新相关文档

### 8.2 自动化文档生成与Vibe Coding

使用Vibe Coding工具辅助文档生成：

- 使用Cursor生成文档模板
- 使用AI辅助完善文档内容
- 使用Rules文件确保文档风格一致

## 9. 实施计划

### 9.1 初始设置

1. 创建文档目录结构
2. 设置文档模板
3. 初始化Git仓库
4. 创建初始README和指南

### 9.2 持续维护

1. 每次实验后更新相关文档
2. 每周整理和组织新增知识
3. 每月审查文档健康状况
4. 每季度进行全面文档审查

## 10. 结论

严谨详细的文档管理是Mac Studio M3 Ultra大模型实验平台成功的关键。通过实施本文档管理系统，我们可以确保知识的积累、经验的传承和实验的可复现性，从而最大化平台的价值和效率。
