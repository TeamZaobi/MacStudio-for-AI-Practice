# Mac Studio M3 Ultra - Vibe Coding Rules

## 1. 概述

本文档定义了Mac Studio M3 Ultra大模型实验平台的Vibe Coding规则，专为Cursor等AI辅助编码工具设计。这些规则提供了关键原则和模式，详细实现请参考相应的文档。

> **重要提示**: 本文档不包含所有细节，而是提供关键指导并引导您查看相关详细文档。

## 2. 文档引用指南

根据不同任务，请参考以下文档：

- **环境管理**: 查看 `documentation_system.md` 中的"环境级文档"部分
- **模型处理**: 查看 `models/README.md` 获取模型管理最佳实践
- **实验设计**: 查看 `experiments/README.md` 了解实验设计和执行标准
- **性能优化**: 查看 `knowledge_base/performance.md` 获取Apple Silicon优化技巧
- **故障排除**: 查看 `knowledge_base/troubleshooting.md` 获取常见问题解决方案

## 3. 核心编码原则

### 3.1 命名约定

- **文件名**: 小写字母和下划线分隔 (例如: `model_loader.py`)
- **类名**: 驼峰命名法 (例如: `ModelManager`)
- **函数和变量**: 小写字母和下划线分隔 (例如: `load_model()`)
- **常量**: 全大写字母和下划线分隔 (例如: `MAX_BATCH_SIZE`)
- **环境名**: 描述性名称和下划线分隔 (例如: `llama2_70b_rag`)

### 3.2 导入顺序

```python
# 标准库导入
import os
import sys

# 第三方库导入
import torch
import numpy as np

# 本地模块导入
from utils.logging import setup_logger
```

### 3.3 文档要求

每个模块、类和函数必须有文档字符串，包括:
- 简要描述
- 参数说明
- 返回值说明
- 异常说明（如适用）

详细标准请参考 `documentation_system.md`。

## 4. 关键模式和最佳实践

### 4.1 环境管理

```python
# 创建新环境时使用此模式
conda create -n {env_name} python=3.10 -y
conda activate {env_name}
pip install {packages}
conda env export > environment_{env_name}.yml
```

每个环境创建后必须记录在文档中。详细请参考环境管理文档。

### 4.2 模型加载

```python
# 模型加载的标准模式
try:
    # 设置适当的量化参数
    load_kwargs = {"device_map": "mps"}
    if model_size > 13:  # 大于13B的模型
        load_kwargs.update({"load_in_4bit": True})

    # 加载模型
    model = AutoModelForCausalLM.from_pretrained(model_path, **load_kwargs)
    tokenizer = AutoTokenizer.from_pretrained(model_path)

    return model, tokenizer
except Exception as e:
    logger.error(f"模型加载失败: {str(e)}")
    raise
```

对于超大模型（如671B DeepSeek），请参考 `models/large_models.md` 获取特殊处理指南。

### 4.3 实验执行

```python
# 实验执行的标准模式
def run_experiment(config_path):
    # 1. 加载配置
    config = load_config(config_path)

    # 2. 设置随机种子确保可复现性
    set_seed(config.get("seed", 42))

    # 3. 初始化实验跟踪
    wandb.init(project=config["project_name"], config=config)

    # 4. 执行实验逻辑
    # ...

    # 5. 记录结果
    wandb.log({"metric": value})
```

详细的实验设计和执行标准请参考实验文档。

## 5. Apple Silicon 优化

- 优先使用 MPS 后端而非 CPU
- 对于大型模型，使用4-bit或8-bit量化
- 监控内存使用，避免OOM错误
- 考虑使用MLX框架获得更好的性能

详细优化技巧请参考性能优化文档。

## 6. 常见问题与解决方案

当遇到以下问题时，请参考相应文档：

- **内存不足**: 参考 `knowledge_base/memory_management.md`
- **模型加载失败**: 参考 `knowledge_base/model_loading.md`
- **MPS后端问题**: 参考 `knowledge_base/mps_issues.md`
- **远程连接问题**: 参考 `knowledge_base/remote_access.md`

## 7. Vibe Coding工具调用技巧

### 7.1 分块修改策略

在使用Cursor等AI辅助编码工具时，大量的读写调用容易失败。要提高成功率，请遵循以下原则：

- **小批量修改**: 每次修改不超过200行代码
- **分步操作**: 将大型文件修改分解为多个小步骤
- **逐步确认**: 每次修改后确认变更已成功应用
- **增量修改**: 优先使用增量修改而非全文件替换

示例工作流程：

1. 首先查看文件当前状态
2. 确定要修改的特定部分（不超过200行）
3. 只修改该部分，保持其他部分不变
4. 确认修改成功后再进行下一部分

### 7.2 读写工具调用模式

#### 7.2.1 文件读取

```python
# 推荐模式：安全读取文件
def read_file(file_path):
    """安全地读取文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        logger.error(f"文件不存在: {file_path}")
        return None
    except Exception as e:
        logger.error(f"读取文件失败: {str(e)}")
        return None
```

#### 7.2.2 文件写入

```python
# 推荐模式：安全写入文件
def write_file(file_path, content, mode='w'):
    """安全地写入文件"""
    # 创建目录（如果不存在）
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    try:
        with open(file_path, mode, encoding='utf-8') as f:
            f.write(content)
        return True
    except Exception as e:
        logger.error(f"写入文件失败: {str(e)}")
        return False
```

#### 7.2.3 JSON数据处理

```python
# 推荐模式：JSON数据读写
import json

def load_json(file_path):
    """加载JSON文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"加载JSON失败: {str(e)}")
        return None

def save_json(file_path, data, indent=2):
    """保存JSON文件"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=indent)
        return True
    except Exception as e:
        logger.error(f"保存JSON失败: {str(e)}")
        return False
```

#### 7.2.4 数据流处理

处理大型文件或数据流时，使用迭代器和生成器：

```python
# 推荐模式：处理大型文件
def process_large_file(file_path, chunk_size=1024*1024):
    """分块处理大型文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                # 处理数据块
                process_chunk(chunk)
        return True
    except Exception as e:
        logger.error(f"处理文件失败: {str(e)}")
        return False
```

#### 7.2.5 并发读写

当需要并发处理多个文件时：

```python
# 推荐模式：并发文件处理
from concurrent.futures import ThreadPoolExecutor

def process_files_concurrently(file_paths, process_func, max_workers=4):
    """并发处理多个文件"""
    import concurrent.futures
    results = {}
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_file = {executor.submit(process_func, file_path): file_path
                          for file_path in file_paths}
        for future in concurrent.futures.as_completed(future_to_file):
            file_path = future_to_file[future]
            try:
                results[file_path] = future.result()
            except Exception as e:
                logger.error(f"处理文件 {file_path} 失败: {str(e)}")
                results[file_path] = None
    return results
```

有关读写工具的更多技巧和最佳实践，请参考 `knowledge_base/io_operations.md`。

## 8. 文档维护

- 发现新的最佳实践时，更新相关文档
- 遇到并解决新问题时，添加到知识库
- 定期审查和更新文档

详细的文档维护流程请参考文档管理系统文档。
