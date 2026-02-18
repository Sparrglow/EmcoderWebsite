# Emcoder CLI v2.0 — 使用说明书（保姆级）

嵌入式 MCU 智能开发 AI Agent 系统。集 AI 对话、代码生成、知识检索、串口通信、固件烧录、硬件调试、QEMU 仿真于一体，提供 **CLI / TUI / REST API / WebSocket** 四种交互方式。

> 最后更新：2026-02-15

---

## 目录

- [1. 系统概览](#1-系统概览)
- [2. 安装与环境准备](#2-安装与环境准备)
- [3. 配置（完整参考）](#3-配置完整参考)
- [4. 启动后端服务](#4-启动后端服务)
- [5. CLI 命令行工具](#5-cli-命令行工具)
- [6. TUI 终端界面](#6-tui-终端界面)
- [7. REST API 完整参考](#7-rest-api-完整参考)
- [8. WebSocket 端点](#8-websocket-端点)
- [9. AI Agent 系统](#9-ai-agent-系统)
- [10. Skill 插件系统](#10-skill-插件系统)
- [11. RAG 知识库](#11-rag-知识库)
- [12. 代码引擎](#12-代码引擎)
- [13. 硬件功能](#13-硬件功能)
- [14. 数据捕获与管线](#14-数据捕获与管线)
- [15. 安全机制](#15-安全机制)
- [16. 编辑协议](#16-编辑协议)
- [17. 测试](#17-测试)
- [18. 架构参考](#18-架构参考)
- [19. 故障排查](#19-故障排查)
- [20. 附录](#20-附录)

---

## 1. 系统概览

### 1.1 定位

Emcoder 是一个面向嵌入式 MCU 开发的 **AI Sidecar 服务**。它以后端引擎的身份运行，可被 CLI、TUI、VSCode 扩展或任意 HTTP/WebSocket 客户端调用。

### 1.2 核心能力一览

| 能力 | 说明 |
|------|------|
| AI 对话 | 基于 Agent Loop（Think → Act → Observe → Repeat）的多轮推理，支持 14 种工具调用 |
| 代码生成 | 生成符合 HAL/LL/ESP-IDF 规范的嵌入式 C 代码 |
| 知识检索 (RAG) | FAISS 向量索引 + 增量 RAG，内置 STM32/ESP32 知识库 |
| Skill 插件 | 可扩展的平台技能系统，自动发现、懒加载、关键词 + 语义匹配 |
| 工程管理 | 创建 / 构建 / 解析 CubeMX / ESP-IDF / Keil 工程 |
| 串口通信 | 端口枚举、监控、数据收发、WebSocket 透传 |
| 固件烧录 | 支持 STM32 (st-flash / STM32CubeProgrammer) 和 ESP32 (esptool) |
| 硬件调试 | OpenOCD 调试会话，内存/寄存器读写，GDB 命令 |
| QEMU 仿真 | 无硬件情况下运行固件仿真，支持执行/内存/中断追踪 |
| 静态分析 | MISRA C 子集检查、安全审计、圈复杂度度量 |
| 约束检查 | 引脚冲突检测、电气规格验证、资源限制检查 |
| 日志分析 | 嵌入式错误模式库 + 错误链追踪 + 根因分析 |
| 状态机分析 | 从 C 代码提取 FSM，检测死锁和不可达状态 |
| 编辑协议 | Agent 不直接写磁盘，生成 EditProposal 由前端审批 |
| 数据捕获 | 统一的硬件数据采集管线（过滤 + 采样 + AI 上下文格式化） |
| 遥测监控 | CPU/内存/构建/崩溃上报，WebSocket 仪表盘 |

### 1.3 支持的 MCU 平台

| 平台 | 芯片系列 | Skill ID |
|------|---------|----------|
| STM32 | F1, F4, F7, H7, L0, L4, G0, G4, U5 | `stm32` |
| ESP32 | ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6, ESP32-H2 | `esp32` |

> Skill 系统可扩展——添加新平台只需在 `app/skills/embedded/` 下新建目录，无需改动主框架。

### 1.4 支持的 LLM 提供商

| 提供商 | 默认模型 | API 兼容协议 | 默认端点 |
|--------|---------|-------------|---------|
| Qwen (通义千问) | qwen-max | OpenAI 兼容 | `dashscope.aliyuncs.com/compatible-mode/v1` |
| DeepSeek | deepseek-coder | OpenAI 兼容 | `api.deepseek.com/v1` |
| OpenAI | gpt-4-turbo-preview | 原生 | `api.openai.com/v1` |
| Groq | llama2-70b-4096 | OpenAI 兼容 | `api.groq.com/openai/v1` |
| Ollama (本地) | codellama | OpenAI 兼容 | `localhost:11434/v1` |
| Anthropic | claude-3 | 原生 | — |

### 1.5 三种交互方式

| 方式 | 适用场景 | 启动命令 |
|------|---------|---------|
| CLI (Click) | 脚本化、CI/CD、快速命令 | `python -m cli <command>` |
| TUI (Textual) | 终端交互、无 GUI 环境 | `python -m cli tui` |
| REST API + WebSocket | VSCode 扩展、Web 前端、第三方集成 | `python run.py` |

---

## 2. 安装与环境准备

### 2.1 系统要求

| 项目 | 要求 |
|------|------|
| Python | 3.10 或更高 |
| 操作系统 | Windows / macOS / Linux |
| 内存 | 建议 8 GB+（RAG 嵌入模型约需 500 MB） |
| 磁盘 | 约 2 GB（含 Python 包 + 模型缓存） |

### 2.2 安装步骤

```powershell
# 1. 克隆仓库
git clone <repo-url>
cd EmcoderCLI

# 2. 创建虚拟环境
python -m venv .venv

# Windows 激活
.venv\Scripts\Activate.ps1

# Linux/macOS 激活
# source .venv/bin/activate

# 3. 安装依赖
cd backend
pip install -r requirements.txt
```

> **提示**：首次运行时，sentence-transformers 嵌入模型（~500 MB）会自动下载。  
> 如果下载慢，可设置 Hugging Face 镜像：`$env:HF_ENDPOINT = "https://hf-mirror.com"`

### 2.3 核心依赖一览

| 分类 | 包 |
|------|-----|
| Web 框架 | fastapi ≥0.104, uvicorn[standard] ≥0.24, pydantic ≥2.5, pydantic-settings ≥2.1, python-multipart, python-dotenv |
| LLM/AI | langchain ≥0.1, langchain-community, openai ≥1.3, httpx ≥0.25, tiktoken ≥0.5 |
| RAG 向量检索 | faiss-cpu ≥1.7.4, sentence-transformers ≥2.2.2, numpy ≥1.24 |
| C 代码解析 | pycparser ≥2.21 |
| 日志 & 格式化 | structlog ≥23.2, rich ≥13.7 |
| 异步 | aiofiles ≥23.2, anyio ≥4.0 |
| 工具库 | tenacity ≥8.2, orjson ≥3.9, PyYAML ≥6.0.1, packaging ≥23.0 |
| 串口 | pyserial ≥3.5 |
| CLI/TUI | click ≥8.1, textual ≥0.85, aiohttp ≥3.9 |
| 系统监控 | psutil ≥5.9 |
| 测试 | pytest ≥7.4, pytest-asyncio ≥0.23, pytest-cov, black, ruff, mypy |

### 2.4 MCU 工具链（可选，按需安装）

根据目标平台安装对应外部工具：

| 工具 | 用途 | 下载地址 | 环境变量 |
|------|------|---------|---------|
| ARM GCC | STM32 交叉编译 | developer.arm.com | `MCU_ARM_GCC_PATH` |
| STM32CubeMX | 工程生成 | st.com | `MCU_STM32CUBEMX_PATH` |
| STM32CubeProgrammer | STM32 烧录 | st.com | `MCU_STM32_PROGRAMMER_PATH` |
| ESP-IDF | ESP32 开发框架 | docs.espressif.com | `MCU_ESP_IDF_PATH` |
| esptool | ESP32 烧录 | `pip install esptool` | `MCU_ESPTOOL_PATH` |
| OpenOCD | 调试服务器 | openocd.org | `MCU_OPENOCD_PATH` |
| QEMU (ARM) | 仿真 | qemu.org | — |

> **小贴士**：所有工具均为可选，未安装时相关功能会优雅降级。Skill 系统的 `detect_cli()` 可自动检测并报告安装状态。

---

## 3. 配置（完整参考）

### 3.1 配置文件

将 `.env.example`（如有）复制为 `.env` 并编辑：

```powershell
cd backend
copy .env.example .env   # 或 cp .env.example .env
```

配置系统基于 **Pydantic Settings**，支持：
- `.env` 文件自动加载
- 环境变量覆盖（优先级高于 `.env`）
- 嵌套分隔符 `__`（如 `LLM__TEMPERATURE=0.5`）
- 类型自动验证

### 3.2 完整配置项

#### 3.2.1 服务核心（顶层 Settings）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `APP_NAME` | str | `Emcoder` | 应用名称 |
| `VERSION` | str | `0.1.0` | 版本号 |
| `DEBUG` | bool | `false` | 调试模式 |
| `ENVIRONMENT` | str | `development` | 运行环境：`development` / `testing` / `production` |
| `HOST` | str | `127.0.0.1` | 监听地址 |
| `PORT` | int | `8002` | 监听端口（范围 1024-65535） |
| `LOG_LEVEL` | str | `INFO` | 日志级别：`DEBUG` / `INFO` / `WARNING` / `ERROR` / `CRITICAL` |
| `LOG_FORMAT` | str | `text` | 日志格式：`text` / `json` |
| `LOG_FILE` | str | 无 | 日志文件路径（留空只输出控制台） |
| `DATA_DIR` | str | `data` | 数据存储根目录 |

#### 3.2.2 LLM 配置（`LLM_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `LLM_PROVIDER` | str | `qwen` | 提供商：`openai` / `qwen` / `deepseek` / `anthropic` / `groq` / `ollama` |
| `LLM_API_KEY` | str | 无 | API 密钥 |
| `LLM_API_BASE` | str | 自动（按 provider） | 自定义 API 端点 |
| `LLM_MODEL_NAME` | str | `qwen-max` | 主模型 |
| `LLM_CODE_MODEL_NAME` | str | 同主模型 | 代码生成专用模型 |
| `LLM_TEMPERATURE` | float | `0.7` | 生成温度（0.0 ~ 2.0） |
| `LLM_MAX_TOKENS` | int | `4096` | 最大输出 token 数（100 ~ 32000） |
| `LLM_TIMEOUT` | int | `180` | 请求超时（秒） |
| `LLM_MAX_RETRIES` | int | `3` | 失败重试次数 |
| `LLM_FALLBACK_PROVIDER` | str | 无 | 备选提供商 |
| `LLM_FALLBACK_MODEL` | str | 无 | 备选模型 |

**API Key 解析优先级**：

```
LLM_API_KEY > DASHSCOPE_API_KEY > OPENAI_API_KEY > DEEPSEEK_API_KEY
```

**各提供商专属配置示例**：

```dotenv
# ── Qwen (通义千问) ──
DASHSCOPE_API_KEY=sk-xxx
LLM_PROVIDER=qwen
LLM_MODEL_NAME=qwen-plus

# ── DeepSeek ──
DEEPSEEK_API_KEY=sk-xxx
LLM_PROVIDER=deepseek
LLM_MODEL_NAME=deepseek-coder

# ── OpenAI ──
OPENAI_API_KEY=sk-xxx
LLM_PROVIDER=openai
LLM_MODEL_NAME=gpt-4-turbo-preview

# ── Groq ──
LLM_API_KEY=gsk_xxx
LLM_PROVIDER=groq
LLM_MODEL_NAME=llama2-70b-4096

# ── Ollama (本地, 无需 API Key) ──
LLM_PROVIDER=ollama
LLM_MODEL_NAME=codellama
LLM_API_BASE=http://localhost:11434/v1

# ── Anthropic ──
LLM_API_KEY=sk-ant-xxx
LLM_PROVIDER=anthropic
LLM_MODEL_NAME=claude-3
```

#### 3.2.3 RAG 知识库（`RAG_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `RAG_VECTOR_STORE` | str | `faiss` | 向量存储引擎：`faiss` / `chroma` |
| `RAG_INDEX_PATH` | str | `data/rag_index` | 索引文件路径 |
| `RAG_EMBEDDING_MODEL` | str | `sentence-transformers/all-MiniLM-L6-v2` | 嵌入模型 |
| `RAG_EMBEDDING_DIMENSION` | int | `384` | 嵌入向量维度 |
| `RAG_DEFAULT_TOP_K` | int | `5` | 默认检索返回条数 |
| `RAG_SIMILARITY_THRESHOLD` | float | `0.5` | 相似度阈值（0.0 ~ 1.0） |
| `RAG_KNOWLEDGE_BASE_PATH` | str | `data/knowledge_base` | 知识库文档目录 |

#### 3.2.4 Skill 系统（`SKILL_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `SKILL_EXTRA_SKILL_DIRS` | list | `[]` | 额外 Skill 目录（JSON 数组格式） |
| `SKILL_USER_CONFIG_PATH` | str | `~/.emcoder/config.json` | 用户 Skill 配置覆盖文件 |
| `SKILL_ENABLE_SEMANTIC_MATCH` | bool | `false` | 启用语义匹配（需 sentence-transformers） |

#### 3.2.5 工程管理（`PROJECT_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `PROJECT_WORKSPACE_PATH` | str | `workspace` | 工程工作区根目录 |
| `PROJECT_TEMPLATE_PATH` | str | `data/templates` | 工程模板目录 |
| `PROJECT_DEFAULT_PLATFORM` | str | `stm32` | 默认目标平台 |
| `PROJECT_AUTO_BUILD` | bool | `false` | 代码生成后自动编译 |

#### 3.2.6 Agent 引擎（`AGENT_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `AGENT_MAX_ROUNDS` | int | `20` | 单次对话最大循环轮次（1 ~ 100） |
| `AGENT_MAX_CONSECUTIVE_ERRORS` | int | `3` | 连续错误上限，超过则中止（1 ~ 20） |
| `AGENT_LOOP_TIMEOUT` | int | `300` | 总超时秒数（30 ~ 3600） |
| `AGENT_MAX_CONCURRENT` | int | `5` | 最大并发 Agent 数（1 ~ 50） |

#### 3.2.7 安全配置（`SECURITY_` 前缀）

| 环境变量 | 类型 | 默认值 | 说明 |
|---------|------|--------|------|
| `SECURITY_ENABLE_FUSE_PROTECTION` | bool | `true` | 保护芯片 fuse 区域 |
| `SECURITY_ENABLE_FLASH_LIMIT` | bool | `true` | 限制烧录频率 |
| `SECURITY_REQUIRE_CONFIRMATION` | bool | `true` | 高危操作前需用户确认 |
| `SECURITY_ENABLE_CODE_REVIEW` | bool | `true` | 启用代码安全审查 |
| `SECURITY_PROTECTED_REGIONS` | list | `["MX_", "SystemClock_Config", "Error_Handler"]` | 受保护的代码区域前缀 |
| `SECURITY_ALLOWED_ORIGINS` | list | `["http://localhost:*", "http://127.0.0.1:*", "vscode-webview://*"]` | CORS 白名单 |

#### 3.2.8 MCU 工具链（`MCU_` 前缀）——已弃用

> **注意**：此配置组已弃用，平台工具链路径已迁移到 Skill 系统。新代码请通过 `skill_manager.get_skill(platform).handler.detect_cli()` 获取工具信息。现有消费者在迁移完成前仍可使用。

| 环境变量 | 默认值 | 说明 |
|---------|--------|------|
| `MCU_STM32CUBEMX_PATH` | 无 | STM32CubeMX 路径 |
| `MCU_STM32_PROGRAMMER_PATH` | 无 | STM32CubeProgrammer CLI 路径 |
| `MCU_ARM_GCC_PATH` | 无 | ARM GCC bin 目录 |
| `MCU_ESP_IDF_PATH` | 无 | ESP-IDF 安装路径 |
| `MCU_ESPTOOL_PATH` | `esptool.py` | esptool 路径 |
| `MCU_OPENOCD_PATH` | 无 | OpenOCD 路径 |

### 3.3 完整 `.env` 示例

```dotenv
# ─── 服务核心 ───
HOST=127.0.0.1
PORT=8000
DEBUG=false
ENVIRONMENT=development
LOG_LEVEL=INFO
LOG_FORMAT=text

# ─── LLM ───
LLM_PROVIDER=qwen
DASHSCOPE_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
LLM_MODEL_NAME=qwen-plus
LLM_TEMPERATURE=0.7
LLM_MAX_TOKENS=4096
LLM_TIMEOUT=180

# ─── RAG ───
RAG_VECTOR_STORE=faiss
RAG_EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
RAG_DEFAULT_TOP_K=5

# ─── Skill ───
SKILL_ENABLE_SEMANTIC_MATCH=false

# ─── 工程 ───
PROJECT_DEFAULT_PLATFORM=stm32
PROJECT_AUTO_BUILD=false

# ─── Agent ───
AGENT_MAX_ROUNDS=20
AGENT_LOOP_TIMEOUT=300

# ─── 安全 ───
SECURITY_REQUIRE_CONFIRMATION=true
SECURITY_ENABLE_FUSE_PROTECTION=true
```

---

## 4. 启动后端服务

### 4.1 方式一：Python 直接启动

```powershell
cd backend
python run.py
```

默认在 `http://127.0.0.1:8000` 启动，终端打印 Banner：

```
===========================================================
     EMCODER - Embedded MCU Intelligent Development Sidecar v2.0.0
===========================================================
 -> Starting Emcoder Sidecar Engine...
```

#### 全部启动参数

| 参数 | 类型/可选值 | 默认值 | 说明 |
|------|-----------|--------|------|
| `--mode` | `http` / `stdio` / `pipe` | `http` | 启动模式 |
| `--host` | str | `127.0.0.1` | 监听地址 |
| `--port` | int | `8000` | 监听端口（`0` = 自动分配） |
| `--reload` | flag | `false` | 热重载（仅 http 开发模式） |
| `--workers` | int | `1` | 工作进程数（仅 http） |
| `--log-level` | `debug`/`info`/`warning`/`error` | `info` | 日志级别 |
| `--env` | str | 无 | 指定 `.env` 文件路径 |
| `--workspace` | str | 无 | 设置 VSCode 工作区路径 |

#### 常用启动示例

```powershell
# 指定端口
python run.py --port 9000

# 自动分配空闲端口
python run.py --port 0

# 开发热重载模式
python run.py --reload

# 指定日志级别
python run.py --log-level debug

# 指定 .env 文件
python run.py --env /path/to/.env

# 指定工作区
python run.py --workspace /path/to/project

# Sidecar 模式 (VSCode 扩展使用)
python run.py --mode stdio
```

#### 启动模式说明

| 模式 | 命令 | 行为 |
|------|------|------|
| **http** | `python run.py` | 标准开发模式，启动 HTTP 服务，打印 Banner，浏览器可访问 Swagger UI |
| **stdio** | `python run.py --mode stdio` | 管道模式：日志走 stderr，stdout 保留给 IPC；固定 workers=1；VSCode Sidecar 使用 |
| **pipe** | `python run.py --mode pipe` | 命名管道模式：类似 stdio；固定 workers=1 |

### 4.2 方式二：PowerShell 脚本启动

```powershell
cd backend
.\start_server.ps1
# 或指定模式和端口
.\start_server.ps1 http 9000
```

该脚本自动：
1. 检查 `DASHSCOPE_API_KEY` 环境变量，不存在则从 `.env` 加载
2. 设置 `EMCODER_SIDECAR_MODE` 和 `EMCODER_PORT` 环境变量
3. 按优先级查找 Python：`D:\Python312` → `D:\Python311` → `python` → `python3` → `py`
4. 检查 fastapi/uvicorn 是否安装，缺失则自动 `pip install -r requirements.txt`
5. 启动服务

### 4.3 验证服务状态

```powershell
# 浏览器访问 API 文档
start http://127.0.0.1:8000/docs       # Swagger UI
start http://127.0.0.1:8000/redoc      # ReDoc

# 健康检查
curl http://127.0.0.1:8000/health

# 系统状态
curl http://127.0.0.1:8000/api/v1/system/status
```

### 4.4 握手魔数（Sidecar 模式）

stdio/pipe 模式下，后端就绪后会向 stdout 输出一行握手 JSON：

```
EMCODER_READY:{"status":"ready","port":8000,"pid":1234,"mode":"stdio","version":"2.0.0","protocol":"jsonrpc-2.0"}
```

VSCode 扩展通过检测 `EMCODER_READY:` 前缀确认后端已启动。

### 4.5 生命周期管理

后端使用 `LifecycleManager` 管理进程生命周期：

| 状态 | 含义 |
|------|------|
| `created` | 初始化完成 |
| `starting` | 正在启动各服务 |
| `ready` | 全部就绪，可接受请求 |
| `stopping` | 正在关闭 |
| `stopped` | 已停止 |

启动顺序：LifecycleManager.startup() → RAG 初始化 → LLM 初始化 → CLI 初始化 → Project 初始化 → mark_ready()

关闭时：执行所有注册的 shutdown hooks（包括 RAG 索引保存）→ 终结子进程。

---

## 5. CLI 命令行工具

### 5.1 基本用法

```powershell
cd backend
python -m cli [OPTIONS] COMMAND [ARGS]
```

> 无子命令时默认启动 TUI。

### 5.2 全局选项

| 选项 | 简写 | 默认值 | 说明 |
|------|------|--------|------|
| `--backend` | `-b` | `http://127.0.0.1:8000` | 后端服务地址 |
| `--verbose` | `-v` | false | 详细输出 |
| `--help` | | | 显示帮助信息 |

### 5.3 命令树总览

```
emcoder
├── chat             AI 交互式聊天
├── tui              TUI 终端界面 (默认)
├── serial           串口操作
│   ├── list           列出可用串口
│   ├── monitor        监控串口数据
│   └── send           发送数据
├── flash            烧录操作
│   ├── write          写入固件
│   └── erase          擦除 Flash
├── debug            调试 (OpenOCD)
│   └── start          启动调试服务器
├── simulate         仿真 (QEMU)
│   └── start          启动仿真
└── status           系统状态
```

### 5.4 chat — AI 聊天

```powershell
# 交互模式 (REPL)
python -m cli chat

# 单条消息模式
python -m cli chat -m "帮我写一个 STM32F407 的 UART 初始化代码"
```

| 参数 | 说明 |
|------|------|
| `--message` / `-m` | 可选。指定消息后直接执行，不进入交互模式 |

**交互模式操作**：
- 输入文本后回车 → 与 AI 对话
- 输入 `/quit` 或 `/exit` → 退出

**SSE 事件流处理**：CLI 自动处理以下事件类型：

| 事件类型 | 显示行为 |
|---------|---------|
| `token` | 实时流式输出 AI 回复文本 |
| `thinking` | 显示思考过程 |
| `tool_call` / `tool_call_start` | 显示工具调用信息 |
| `tool_call_end` | 显示工具执行结果 |
| `confirm_required` | 交互式确认提示 |
| `error` | 显示错误信息 |
| `done` | 结束本轮对话 |

### 5.5 tui — 终端图形界面

```powershell
python -m cli tui
# 或直接运行 (无子命令默认启动 TUI)
python -m cli
```

详见 [第 6 节 TUI 终端界面](#6-tui-终端界面)。

### 5.6 serial — 串口操作

#### 列出可用串口

```powershell
python -m cli serial list
```

输出示例：
```
  COM4: USB Serial Device [USB\VID_0483&PID_5740]
  COM3: Bluetooth Serial (COM3) [BTHENUM\...]
```

#### 监控串口

```powershell
python -m cli serial monitor COM4
python -m cli serial monitor COM4 --baud 9600
python -m cli serial monitor COM4 --baud 115200 --encoding utf-8
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `PORT`（位置参数） | 必填 | 串口名（如 `COM4`、`/dev/ttyUSB0`） |
| `--baud` / `-b` | `115200` | 波特率 |
| `--encoding` / `-e` | `utf-8` | 字符编码 |

按 `Ctrl+C` 停止监控。

#### 发送数据

```powershell
python -m cli serial send COM4 "AT\r\n"
python -m cli serial send COM4 "Hello" --baud 9600
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `PORT`（位置参数） | 必填 | 串口名 |
| `DATA`（位置参数） | 必填 | 发送内容 |
| `--baud` / `-b` | `115200` | 波特率 |

### 5.7 flash — 固件烧录

#### 写入固件

```powershell
# STM32 烧录
python -m cli flash write firmware.bin
python -m cli flash write firmware.hex --platform stm32 --address 0x08000000

# ESP32 烧录
python -m cli flash write firmware.bin --platform esp32 --port COM4 --address 0x10000
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `FIRMWARE`（位置参数） | 必填 | 固件文件路径 |
| `--platform` / `-p` | `stm32` | 目标平台：`stm32` / `esp32` |
| `--port` | 无 | 串口（ESP32 必填） |
| `--address` / `-a` | 自动 | 烧录地址（STM32: `0x08000000`，ESP32: `0x10000`） |

#### 擦除 Flash

```powershell
python -m cli flash erase
python -m cli flash erase --platform esp32 --port COM4
```

### 5.8 debug — OpenOCD 调试

```powershell
python -m cli debug start
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `--interface` / `-i` | `interface/stlink.cfg` | OpenOCD interface 配置文件 |
| `--target` / `-t` | `target/stm32f4x.cfg` | OpenOCD target 配置文件 |

启动后 OpenOCD 持续运行，按 `Ctrl+C` 停止。

### 5.9 simulate — QEMU 仿真

```powershell
python -m cli simulate start firmware.elf
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `FIRMWARE`（位置参数） | 必填 | ELF 固件文件 |
| `--machine` / `-m` | `stm32f4-discovery` | QEMU 机器类型 |
| `--gdb-port` | `3333` | GDB 调试端口 |

### 5.10 status — 系统状态

```powershell
python -m cli status
```

输出示例：
```
Backend: Connected (http://127.0.0.1:8000)
Serial Ports: 2 found
  COM4: USB Serial Device
  COM3: Bluetooth Serial
```

---

## 6. TUI 终端界面

### 6.1 启动

```powershell
cd backend
python -m cli tui

# 指定后端地址
python -m cli -b http://127.0.0.1:9000 tui
```

### 6.2 界面布局

```
+---------------------------------------------+
|  Emcoder CLI               Embedded AI Asst  |
+---------------------------------------------+
|  TOOLS: [+] Backend OK                       |
+----------+----------------------------------+
| Tool     | [System] 19:20:01                |
| Status   | Welcome to Emcoder CLI           |
|          | Type a message to start chatting.|
| Serial:--| Ctrl+Q quit  |  F1 help         |
| Flash: --|                                   |
| Debug: --| [You] 19:20:15                   |
| QEMU:  --|  帮我初始化 UART                   |
|          |                                   |
| Session: | [Emcoder] 19:20:18               |
|   --     |  以下是 STM32F407 UART 初始化...    |
|          |                                   |
+----------+----------------------------------+
|  > Type a message...            [Send]       |
+---------------------------------------------+
|  Ctrl+Q Quit | Ctrl+L Clear | F1 Help        |
+---------------------------------------------+
```

**组件说明**：

| 组件 | 类名 | 说明 |
|------|------|------|
| 消息气泡 | `ChatMessageWidget` | 单条消息，按角色显示不同样式 |
| 消息列表 | `ChatView` | 滚动消息容器，自动滚动到底部 |
| 输入框 | `ChatInput` | 文本输入 + 发送按钮 |
| 工具栏 | `ToolStatusBar` | 顶部工具状态栏 |
| 风险对话框 | `RiskConfirmDialog` | 高危操作确认弹窗 |

### 6.3 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Q` | 退出应用 |
| `Ctrl+L` | 清空聊天记录 |
| `Ctrl+S` | 切换侧栏显示/隐藏 |
| `Ctrl+D` | 切换日志面板 |
| `F1` | 显示帮助信息 |
| `Enter` | 发送消息 |

### 6.4 聊天斜杠命令

在输入框输入以 `/` 开头的命令：

| 命令 | 说明 |
|------|------|
| `/help` | 显示可用命令列表 |
| `/clear` | 清空聊天记录 |
| `/status` | 显示后端连接状态和会话信息 |
| `/connect` | 重新连接后端 |
| `/quit` | 退出 |

### 6.5 消息角色与样式

| 角色标签 | 图标 | 说明 | 视觉特征 |
|---------|------|------|---------|
| `[You]` | `>` | 用户消息 | 蓝色左边框，右缩进 |
| `[Emcoder]` | `<` | AI 回复 | 灰蓝左边框，左缩进 |
| `[System]` | `[*]` | 系统消息 | 灰色左边框 |
| `[Tool]` | `/-` | 工具调用 | 橙色左边框 |

### 6.6 侧栏状态指示

侧边栏实时显示各硬件工具的连接状态：

| 状态项 | ID | 说明 |
|--------|-----|------|
| Serial | `status-serial` | 串口连接状态 |
| Flash | `status-flash` | 烧录状态 |
| Debug | `status-debug` | 调试状态 |
| QEMU | `status-qemu` | 仿真状态 |
| Session | `session-info` | 当前会话 ID |

工具状态颜色：

| 状态 | 颜色 |
|------|------|
| connected | 绿色 |
| disconnected | 红色 |
| running | 绿色 |
| stopped | 灰色 |
| error | 红色 |
| flashing | 黄色 |
| debugging | 青色 |
| simulating | 品红 |

### 6.7 风险确认对话框

当 AI Agent 执行高风险操作（如烧录固件、执行终端命令）时，TUI 弹出确认对话框。必须点击 **Confirm** 或 **Cancel** 后才能继续。

### 6.8 TUI Client 连接

TUI 使用 `AgentClient` 通过 SSE（Server-Sent Events）与后端 Agent 通信：

| 配置 | 默认值 |
|------|--------|
| 后端地址 | `http://127.0.0.1:8000` |
| 普通请求超时 | 30 秒 |
| SSE 流超时 | 600 秒 |
| API 端点 | `POST /api/v1/agent/chat/stream` |

连接状态：`disconnected` → `connecting` → `connected` / `error`

### 6.9 TUI 主题色板

| 名称 | 色值 | 用途 |
|------|------|------|
| bg_primary | `#181b20` | 主背景 |
| bg_secondary | `#1e2228` | 次背景 |
| bg_panel | `#252a31` | 面板 |
| accent | `#5b8def` | 主强调（低饱和蓝） |
| accent_dim | `#3d5a80` | 弱强调 |
| text_primary | `#d4d4d4` | 主文字 |
| text_secondary | `#8b8b8b` | 次文字 |
| success | `#4caf7c` | 柔绿 |
| warning | `#d4a054` | 柔橙 |
| error | `#cf6679` | 柔红 |
| border | `#2e333a` | 边框 |

> 设计风格：极简商务科技感，严禁 emoji，纯 ASCII 图标。

---

## 7. REST API 完整参考

所有 API 端点前缀为 `/api/v1`。交互式文档：`http://127.0.0.1:8000/docs`（Swagger）或 `/redoc`（ReDoc）。

### 7.1 系统与健康

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/health` | 全局健康检查（顶层路由） |
| GET | `/` | 根路径信息 |
| GET | `/api/v1/health` | 综合系统健康 |
| GET | `/api/v1/health/{component}` | 单组件健康检查 |
| GET | `/api/v1/system/status` | 系统引擎状态 |
| GET | `/api/v1/system/bus/status` | WebSocket 事件总线状态 |
| GET | `/api/v1/system/update/check` | 检查更新（参数：`client_version`） |
| GET | `/api/v1/metrics` | 系统度量（CPU / 内存 / 磁盘） |
| GET | `/api/v1/metrics/prometheus` | Prometheus 格式度量 |

### 7.2 Agent — AI 对话

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/agent/chat` | 非流式聊天 |
| POST | `/api/v1/agent/chat/stream` | SSE 流式聊天 |
| POST | `/api/v1/agent/chat/stream/v2` | SSE 流式聊天 (v2) |
| POST | `/api/v1/agent/confirm` | 确认 / 拒绝敏感操作 |
| GET | `/api/v1/agent/confirm/pending` | 待处理确认列表 |
| GET | `/api/v1/agent/tools` | 可用工具列表 |
| POST | `/api/v1/agent/workspace` | 设置工作区路径 |
| GET | `/api/v1/agent/cache/stats` | 知识缓存统计 |
| POST | `/api/v1/agent/cache/clear` | 清空知识缓存 |
| POST | `/api/v1/agent/fix_terminal_error` | 编译错误智能修复 |
| WS | `/api/v1/agent/code_completion` | 代码补全 WebSocket |

#### 聊天请求体

```json
{
  "message": "帮我写一个 STM32 UART 初始化",
  "session_id": "sess_xxxx",       // 可选，留空自动生成
  "workspace_path": "/path/to/dir", // 可选
  "platform": "stm32",             // 可选，留空读配置默认值
  "context": "额外上下文信息"        // 可选
}
```

#### SSE 事件流格式

```
data: {"type": "session", "session_id": "sess_xxx"}

data: {"type": "thinking", "content": "第 1 轮推理 — 分析用户意图..."}

data: {"type": "tool_call", "tool": "search_knowledge", "args": {"query": "UART init"}}

data: {"type": "tool_call_end", "tool": "search_knowledge", "result": "..."}

data: {"type": "token", "content": "以下是"}

data: {"type": "text_done", "content": "完整回复内容..."}

data: {"type": "edit", "proposal": {"proposal_id": "xxx", "edits": [...]}}

data: {"type": "confirmation_required", "message": "即将执行 flash_firmware..."}

data: {"type": "done"}
```

### 7.3 编辑协议

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/agent/edit/pending` | 查询待确认编辑 |
| GET | `/api/v1/agent/edit/{proposal_id}` | 获取编辑详情 |
| POST | `/api/v1/agent/edit/apply` | 接受编辑提议 |
| POST | `/api/v1/agent/edit/reject` | 拒绝编辑提议 |

### 7.4 会话管理

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/agent/sessions` | 列出 Agent 会话 |
| GET | `/api/v1/agent/sessions/{id}` | 获取会话历史 |
| DELETE | `/api/v1/agent/sessions/{id}` | 删除会话 |
| GET | `/api/v1/session/` | 列出所有会话 |
| POST | `/api/v1/session/` | 创建新会话 |
| GET | `/api/v1/session/{id}` | 获取会话详情 |
| DELETE | `/api/v1/session/{id}` | 删除会话 |
| POST | `/api/v1/session/{id}/restore` | 恢复已删除会话 |

### 7.5 对话（简单模式）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/chat/send` | 发送消息（非 Agent 模式） |
| GET | `/api/v1/chat/health` | 对话服务健康 |
| WS | `/api/v1/chat/ws` | 聊天 WebSocket |

### 7.6 代码生成与分析

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/code/generate` | AI 代码生成 |
| POST | `/api/v1/code/fuse` | 代码融合（保护 CubeMX 区域） |
| POST | `/api/v1/code/analyze` | 代码结构分析 |
| POST | `/api/v1/code/patch` | 生成 / 应用补丁 |
| POST | `/api/v1/code/validate` | 代码质量验证 |
| POST | `/api/v1/code/format` | 代码格式化 |
| POST | `/api/v1/completion` | GhostText 行内补全 |

### 7.7 AI 智能分析

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/fusion` | 代码融合 |
| POST | `/api/v1/constraint-check` | 硬件约束检查 |
| POST | `/api/v1/static-analyze` | C 代码静态分析 |
| POST | `/api/v1/log-analyze` | 嵌入式日志分析 |
| POST | `/api/v1/fsm-analyze` | 状态机分析 |
| POST | `/api/v1/smart-correct` | 智能纠错 |
| POST | `/api/v1/explain` | 代码解释 |
| POST | `/api/v1/agent/analyze` | AI 综合分析 |

### 7.8 工程管理

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/project/create` | 创建工程 |
| GET | `/api/v1/project/list` | 工程列表 |
| GET | `/api/v1/project/{path}/info` | 工程信息 |
| POST | `/api/v1/project/{path}/build` | 构建工程 |
| POST | `/api/v1/project/{path}/config` | 更新工程配置 |
| DELETE | `/api/v1/project/{path}` | 删除工程 |
| GET | `/api/v1/project/{path}/files` | 工程文件列表 |
| GET | `/api/v1/project/{path}/file` | 读取文件内容 |
| POST | `/api/v1/project/{path}/file` | 写入文件 |
| DELETE | `/api/v1/project/{path}/file` | 删除文件 |
| POST | `/api/v1/project/{path}/folder` | 创建文件夹 |
| POST | `/api/v1/project/build` | 统一构建端点 |
| GET | `/api/v1/project/info` | 工程信息 (GET) |
| POST | `/api/v1/project/info` | 工程信息 (POST) |
| POST | `/api/v1/project/parse` | 解析工程结构 |

### 7.9 RAG 知识库

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/rag/search` | 语义搜索 |
| POST | `/api/v1/rag/add` | 添加单个文档 |
| POST | `/api/v1/rag/add-batch` | 批量添加 |
| POST | `/api/v1/rag/upload` | 上传文档文件 |
| GET | `/api/v1/rag/stats` | 索引统计信息 |
| POST | `/api/v1/rag/save` | 保存索引到磁盘 |
| POST | `/api/v1/rag/load` | 从磁盘加载索引 |
| DELETE | `/api/v1/rag/clear` | 清空索引 |

#### 搜索请求体

```json
{
  "query": "STM32 UART DMA 发送",
  "platform": "stm32",    // 可选，按平台过滤
  "top_k": 5              // 返回条数
}
```

### 7.10 硬件

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/hardware/status` | 硬件整体状态 |
| GET | `/api/v1/hardware/toolchains` | 工具链安装状态 |
| GET | `/api/v1/hardware/detect` | 检测连接的硬件设备 |
| POST | `/api/v1/hardware/reset/{port}` | 复位指定端口设备 |
| GET | `/api/v1/hardware/info/{port}` | 设备详细信息 |
| GET | `/api/v1/hardware/chips` | 支持的芯片列表 |
| GET | `/api/v1/hardware/chip-info` | 芯片详情（参数：`chip`） |
| GET | `/api/v1/hardware/pin-info` | 引脚复用信息（参数：`chip`, `pin`） |
| GET | `/api/v1/hardware/register-info` | 外设寄存器信息 |
| GET | `/api/v1/hardware/peripheral-map` | 外设地址映射 |
| GET | `/api/v1/hardware/clock-tree` | 时钟树配置 |
| GET | `/api/v1/hardware/pinout/{chip_model}` | 引脚复用完整数据 |
| POST | `/api/v1/hardware/validate_pinout` | 引脚冲突检测 |

### 7.11 串口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/serial/ports` | 列出所有串口 |
| POST | `/api/v1/serial/connect` | 连接串口 |
| POST | `/api/v1/serial/disconnect/{session_id}` | 断开指定会话 |
| POST | `/api/v1/serial/disconnect` | 断开当前连接 |
| POST | `/api/v1/serial/send/{session_id}` | 发送数据 |
| POST | `/api/v1/serial/send` | 发送数据（默认会话） |
| GET | `/api/v1/serial/read/{session_id}` | 读取数据 |
| WS | `/api/v1/serial/tunnel/{session_id}` | WebSocket 双向透传 |
| GET | `/api/v1/serial/ws/sessions` | WS 会话列表 |

#### 连接请求体

```json
{
  "port": "COM4",
  "baudrate": 115200,
  "databits": 8,
  "stopbits": 1,
  "parity": "none"
}
```

### 7.12 烧录

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/flash/` | 烧录固件 |
| POST | `/api/v1/flash/execute` | 执行烧录（扩展接口） |
| GET | `/api/v1/flash/progress/{task_id}` | 烧录进度查询 |
| POST | `/api/v1/flash/verify` | 验证固件 |
| POST | `/api/v1/flash/erase` | 擦除 Flash |
| GET | `/api/v1/flash/detect-firmware` | 检测固件文件 (GET) |
| POST | `/api/v1/flash/detect-firmware` | 检测固件文件 (POST) |
| POST | `/api/v1/flash/safety-check` | 安全检查 |
| POST | `/api/v1/flash/reset` | 复位 MCU |

### 7.13 调试

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/debug/config` | 生成调试配置 |
| GET | `/api/v1/debug/supported_chips` | 支持的调试芯片 |
| GET | `/api/v1/debug/probe` | 检测调试探针 |
| GET | `/api/v1/debug/adapters` | 调试适配器列表 |
| GET | `/api/v1/debug/probes` | 扫描所有探针 |
| POST | `/api/v1/debug/start` | 启动调试会话 |
| POST | `/api/v1/debug/stop` | 停止调试会话 |
| POST | `/api/v1/debug/memory/read` | 读取内存 |
| POST | `/api/v1/debug/memory/write` | 写入内存 |
| POST | `/api/v1/debug/registers` | 读取寄存器 |
| POST | `/api/v1/debug/peripheral/{name}` | 读取外设寄存器 |
| POST | `/api/v1/debug/evaluate` | GDB 表达式求值 |
| POST | `/api/v1/debug/gdb` | 原始 GDB 命令 |

### 7.14 构建

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/build/run` | 执行构建 |
| GET | `/api/v1/build/status` | 构建状态 |
| GET | `/api/v1/build/memory-usage` | 固件内存用量 (GET) |
| POST | `/api/v1/build/memory-usage` | 固件内存用量 (POST) |

### 7.15 终端

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/terminal/execute` | 安全执行终端命令 |
| GET | `/api/v1/terminal/health` | 终端服务状态 |

> 命令白名单：`make`, `cmake`, `ninja`, `idf.py`, `arm-none-eabi-*`, `gcc`, `python`, `git`, `echo`, `mkdir`, `cp`, `mv`, `ls`, `cat`, `head`, `tail`, `wc`, `sort`, `diff`, `pwd`, `cd`, `openocd`, `esptool`, `st-flash`, `JLinkExe` 等 55+ 命令。

### 7.16 日志

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/logs/` | 获取日志（支持按 session / level / 分页） |
| GET | `/api/v1/logs/serial/{session_id}` | 串口会话日志 |
| GET | `/api/v1/logs/build/{project_id}` | 构建日志 |
| DELETE | `/api/v1/logs/` | 清除所有日志 |

### 7.17 遥测

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/telemetry/event` | 通用事件上报 |
| POST | `/api/v1/telemetry/build` | 构建结果上报 |
| POST | `/api/v1/telemetry/crash` | 崩溃上报 |
| GET | `/api/v1/telemetry/dashboard` | 仪表盘数据 |
| GET | `/api/v1/telemetry/builds/stats` | 构建统计 |
| GET | `/api/v1/telemetry/features/usage` | 功能使用排行 |
| GET | `/api/v1/telemetry/crashes/recent` | 最近崩溃列表 |

### 7.18 配置热更新

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/v1/config` | 获取当前运行时配置 |
| PATCH | `/api/v1/config` | 运行时修改配置 |
| GET | `/api/v1/cache/stats` | 缓存统计 |
| POST | `/api/v1/cache/clear` | 清空缓存 |

### 7.19 工作流

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/workflow/execute` | 执行工作流 |
| GET | `/api/v1/workflow/status/{id}` | 工作流状态 |
| GET | `/api/v1/workflow/templates` | 工作流模板列表 |

### 7.20 上下文同步

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/context/update` | IDE 文件变更推送 |
| POST | `/api/v1/context/query` | 上下文语义检索 |

### 7.21 扩展管理

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/v1/extensions/query` | 查询可用扩展 |
| GET | `/api/v1/extensions/allowed` | 白名单扩展 |

预置白名单：`ms-vscode.cpptools`、`ms-python.python`、`marus25.cortex-debug`、`ms-vscode.cmake-tools`。

### 7.22 兼容路由（`/api/` 无 v1）

为兼容前端不同 URL 模式，以下模块的所有端点在 `/api/`（不含 `/v1`）前缀下也可访问：

- hardware / hardware_extended / pinout
- serial / serial_ws
- flash / flash_extended
- debug_config / debug_extended / debug_session
- build_status
- completion_context

例如：`/api/hardware/status`、`/api/serial/ports`、`/api/flash/execute` 等。

---

## 8. WebSocket 端点

| 路径 | 协议 | 说明 |
|------|------|------|
| `/ws/{client_id}` | JSON-RPC | 主通道：chat / ping / 频道订阅 |
| `/ws/inline-ai` | JSON | 内联 AI 补全（GhostText / Ctrl+K） |
| `/ws/context` | JSON | IDE 上下文同步（文件变更 → RAG 增量索引） |
| `/ws/serial` | JSON + Binary | 串口 WebSocket（兼容入口） |
| `/ws/serial/{connection_id}` | Binary | 串口双向二进制透传 |
| `/ws/debug/{session_id}` | JSON | 调试事件流 |
| `/ws/dashboard` | JSON | 仪表盘遥测推送（每 2 秒） |

### 8.1 主 WebSocket (`/ws/{client_id}`)

#### 消息格式

```json
// 客户端 → 服务端
{"type": "ping"}
{"type": "chat", "messages": [{"role": "user", "content": "..."}]}

// 服务端 → 客户端
{"type": "pong"}
{"type": "chat_chunk", "content": "..."}
{"type": "chat_done", "content": "完整回复"}
{"type": "error", "message": "错误信息"}
```

#### 频道订阅

```json
// 订阅
{"method": "channel/subscribe", "params": {"channel": "agent/stream"}}

// 取消订阅
{"method": "channel/unsubscribe", "params": {"channel": "agent/stream"}}
```

可用频道：

| 频道 | 用途 |
|------|------|
| `dev/logs` | 后端日志实时推送 |
| `ide/context` | IDE 文件变更通知 |
| `agent/stream` | AI Agent 生成流 |
| `hardware/serial` | 串口数据透传 |
| `hardware/plot` | 波形 / 图表数据 |
| `debug/events` | 调试事件（断点、异常等） |
| `build/status` | 编译状态变更 |

### 8.2 内联 AI (`/ws/inline-ai`)

```json
// 请求
{"code": "void init_uart(", "cursor": 15, "intent": "complete", "file_uri": "main.c", "language": "c"}

// 响应（流式）
{"op": "ins", "text": "UART_HandleTypeDef *huart) {\n"}
{"op": "ins", "text": "  // ..."}
{"op": "done"}
// 或错误
{"op": "error", "text": "LLM timeout"}
```

### 8.3 IDE 上下文 (`/ws/context`)

支持的消息类型：

| type | 说明 |
|------|------|
| `file-changes` | 文件变更通知（新增 / 修改 / 删除） |
| `context-query` | 上下文语义查询 |
| `textDocument/didChange` | LSP 风格文件变更（触发增量 RAG） |
| `textDocument/didOpen` | 文件打开 |
| `textDocument/didClose` | 文件关闭 |
| `workspace/didChangeWorkspaceFolders` | 工作区变更 |
| `ping` | 心跳 |

### 8.4 调试 WebSocket (`/ws/debug/{session_id}`)

```json
// 客户端发送 GDB 命令
{"command": "info breakpoints"}

// 服务端推送
{"type": "console", "content": "..."}
{"type": "halted", "data": {"pc": "0x08001234", "reason": "breakpoint"}}
{"type": "running"}
{"type": "swo", "data": "SWO trace data..."}
{"type": "pong"}
{"type": "error", "message": "..."}
```

### 8.5 仪表盘 (`/ws/dashboard`)

```json
// 服务端每 2 秒推送
{"type": "telemetry", "data": {"timestamp": "...", "cpu_percent": 15.2, "memory_used_mb": 512, ...}}

// 客户端
{"type": "ping"}
{"type": "subscribe"}
```

### 8.6 心跳机制

- 服务端每 **1.5 秒** 发送 ping
- 客户端应回复 `{"method": "heartbeat/pong"}`
- 超时 **3 秒**无响应则断开连接并释放硬件资源

---

## 9. AI Agent 系统

### 9.1 Agent Loop 工作原理

Emcoder 的 AI 对话基于 **Agent Loop** 模式，类似自主决策循环：

```
用户消息
   │
   ▼
┌─────────┐
│  Think   │ LLM 分析用户意图，决定下一步
└────┬────┘
     │
     ▼
┌─────────┐
│   Act    │ 选择并调用工具 (或直接文本回答)
└────┬────┘
     │
     ▼
┌─────────┐
│ Observe  │ 获取工具执行结果
└────┬────┘
     │
     ▼
┌─────────┐
│ Repeat?  │ 是否需要继续？(最多 20 轮)
└────┬────┘
     │
     ▼
最终回答 → 用户
```

### 9.2 全部 14 个工具

| 工具名 | 类别 | 风险级别 | 说明 |
|--------|------|---------|------|
| `search_knowledge` | KNOWLEDGE | LOW | 在 RAG 知识库中检索嵌入式开发知识 |
| `generate_code` | CODE | LOW | 调用 LLM 生成嵌入式 C 代码 |
| `read_file` | FILE | LOW | 读取工作区文件（沙箱 + 5MB 上限） |
| `write_file` | FILE | MEDIUM | 创建或覆写文件（沙箱 + 10MB 上限） |
| `edit_file` | FILE | MEDIUM | 查找替换修改文件部分内容 |
| `scan_workspace` | WORKSPACE | LOW | 扫描工作区目录结构（最多 200 个文件） |
| `search_in_project` | WORKSPACE | LOW | 在工程文件中搜索文本内容 |
| `create_project` | PROJECT | MEDIUM | 创建 STM32 / ESP32 工程 |
| `build_project` | PROJECT | MEDIUM | 编译构建工程（debug / release） |
| `detect_platform` | PROJECT | LOW | 根据上下文自动检测目标平台 |
| `run_command` | TERMINAL | **CRITICAL** | 执行终端命令（需用户确认） |
| `flash_firmware` | HARDWARE | **CRITICAL** | 烧录固件到硬件（需用户确认） |
| `get_peripheral_info` | HARDWARE | LOW | 查询外设配置信息 |
| `request_confirmation` | WORKSPACE | LOW | 向用户发起确认请求 |

#### 工具参数详情

**search_knowledge**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `query` | str | 是 | — | 搜索关键词 |
| `platform` | str | 否 | 配置默认值 | 平台过滤 |
| `top_k` | int | 否 | `3` | 返回条数 |

**generate_code**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `requirement` | str | 是 | — | 需求描述 |
| `platform` | str | 否 | 配置默认值 | 目标平台 |
| `peripherals` | str | 否 | — | 外设列表 |
| `context` | str | 否 | — | 额外上下文 |

**run_command**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `command` | str | 是 | — | 要执行的命令 |
| `working_dir` | str | 否 | — | 工作目录 |
| `timeout` | int | 否 | `60` | 超时秒数（5 ~ 300） |

**flash_firmware**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `firmware_path` | str | 是 | — | 固件文件路径 |
| `target` | str | 否 | 配置默认值 | 目标平台 |
| `port` | str | 否 | — | 串口 |
| `interface` | str | 否 | `swd` | 接口类型：`swd` / `jtag` / `uart` |

**search_in_project**：
| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `query` | str | 是 | — | 搜索关键词 |
| `file_pattern` | str | 否 | `*.c,*.h` | 文件名模式 |
| `project_path` | str | 否 | — | 工程路径 |
| `max_results` | int | 否 | `20` | 最大结果数 |

### 9.3 敏感操作拦截

以下操作会触发用户确认请求：

1. **风险级别 ≥ CRITICAL** 的工具调用（`run_command`、`flash_firmware`）
2. **终端命令关键词匹配**：`rm -rf`、`flash`、`sudo`、`mkfs`、`dd`、`format`、`reboot`、`shutdown`、`kill`、`chmod 777`、`curl | sh`、`wget | sh`、`erase`
3. **所有烧录操作**

确认窗口 **300 秒**超时自动拒绝。

### 9.4 上下文管理

| 参数 | 值 |
|------|-----|
| 最大 Token 窗口 | 12,000 token |
| 历史保留 | 8,000 token |
| 自动摘要 | 超过 20 轮历史时，LLM 辅助压缩 |
| 会话 TTL | 4 小时 |
| 知识缓存 | LRU + TTL，减少重复 RAG 检索 |

### 9.5 错误恢复策略

Agent 执行工具失败时的自动恢复：

1. **重试**：指数退避重试
2. **降级**：减少参数、跳过非必要步骤
3. **LLM 重规划**：让 AI 重新决策
4. **放弃**：报告错误给用户

### 9.6 安全特性

- **速率限制**：Agent 调用 30 次/分钟，工具调用 100 次/分钟
- **并发限制**：最多 5 个并发 Agent（`asyncio.Semaphore`）
- **整体超时**：默认 300 秒
- **Schema 校验**：所有工具参数自动验证
- **敏感命令拦截**：`SensitiveGuard` 模块
- **审计日志**：环形缓冲，最大 10,000 条

### 9.7 Agent 子模块

| 模块 | 文件 | 职责 |
|------|------|------|
| 核心循环 | `agent_loop.py` | Think → Act → Observe 循环 |
| 工具注册 | `tool_registry.py` | ToolDefinition / RiskLevel / ToolCategory |
| 工具定义 | `tools_def.py` | 14 个工具的 handler 函数 + 注册 |
| 敏感守卫 | `sensitive_guard.py` | 命令拦截 + 确认生成 |
| 上下文管理 | `context_manager.py` | Token 窗口 + 自动摘要 |
| 工作区管理 | `workspace_manager.py` | 路径注入 + 沙箱 |
| 知识缓存 | `knowledge_cache.py` | LRU + TTL 缓存 |
| 输出解析 | `structured_output.py` | System Prompt + 输出解析 |
| 状态推送 | `status_reporter.py` | SSE 事件推送 |
| 错误恢复 | `error_recovery.py` | 自动重试 + 降级 |

---

## 10. Skill 插件系统

### 10.1 概述

Skill 系统是 Emcoder 的**平台扩展层**，将平台特定的能力（如 STM32 工程创建、ESP32 烧录）封装为可插拔的 Skill 插件。

**架构**：`SkillManager`（发现 + 加载） → `SkillMatcher`（匹配） → `BaseSkillHandler`（执行）

**核心设计原则**：
- 零硬编码：Agent 工具层通过 Skill 动态获取平台信息
- 懒加载：启动时只读 `meta.json`，Handler 首次使用时才动态导入
- 可扩展：新增平台只需添加目录，无需改框架代码

### 10.2 目录结构

```
app/skills/
├── __init__.py          # 导出 skill_manager, skill_matcher
├── base.py              # SkillMeta, SkillResult, CLIInfo, BaseSkillHandler, Skill
├── manager.py           # SkillManager (单例, 懒加载)
├── matcher.py           # SkillMatcher (关键词 + 语义匹配)
└── embedded/            # domain = "embedded"
    ├── stm32/           # platform = "stm32"
    │   ├── meta.json      # 元数据 (29 关键词, 4 CLI 工具)
    │   ├── skill.py       # SkillHandler 实现
    │   ├── prompt.tpl     # Jinja2 系统提示词模板
    │   └── resources/     # 芯片数据库、引脚映射等
    └── esp32/           # platform = "esp32"
        ├── meta.json      # 元数据 (31 关键词, 2 CLI 工具)
        ├── skill.py       # SkillHandler 实现
        └── prompt.tpl     # Jinja2 系统提示词模板
```

### 10.3 Skill 数据模型

#### SkillMeta（元数据）

从 `meta.json` 加载：

| 字段 | 类型 | 说明 |
|------|------|------|
| `skill_id` | str | 唯一标识（如 `"stm32"`） |
| `name` | str | 显示名称 |
| `description` | str | 描述 |
| `keywords` | list[str] | 匹配关键词 |
| `domain` | str | 领域（如 `"embedded"`） |
| `skill_type` | str | 类型（如 `"mcu"`） |
| `similarity_threshold` | float | 语义匹配阈值（默认 0.7） |
| `cli_tools` | list[dict] | 所需外部 CLI 工具 |
| `extra_parameters` | dict | 额外参数定义 |
| `default_config` | dict | 默认配置值 |

#### SkillResult（执行结果）

| 字段 | 类型 | 说明 |
|------|------|------|
| `success` | bool | 是否成功 |
| `data` | Any | 结果数据 |
| `error` | Optional[str] | 错误信息 |

#### CLIInfo（外部工具信息）

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | str | 工具名 |
| `available` | bool | 是否可用 |
| `path` | Optional[str] | 路径 |
| `version` | Optional[str] | 版本 |
| `download_url` | str | 下载地址 |
| `install_guide` | str | 安装指南 |
| `required` | bool | 是否必须 |

### 10.4 BaseSkillHandler（接口）

所有 Skill 必须实现 `BaseSkillHandler` 抽象基类：

| 方法 | 必须实现 | 返回类型 | 说明 |
|------|---------|---------|------|
| `detect_cli()` | **是** | `List[CLIInfo]` | 检测平台所需的 CLI 工具 |
| `create_project()` | 否 | `SkillResult` | 创建工程 |
| `identify_project()` | 否 | `float` | 工程识别置信度（0.0 ~ 1.0） |
| `get_project_context()` | 否 | `dict` | 获取工程上下文 |
| `build_project()` | 否 | `SkillResult` | 构建工程 |
| `deploy()` | 否 | `SkillResult` | 部署 / 烧录 |
| `get_peripheral_info()` | 否 | `Optional[dict]` | 查询外设信息 |
| `get_extra_tools()` | 否 | `list` | 注册额外的 Agent 工具 |

**配置优先级**（高 → 低）：
1. 用户配置文件（`~/.emcoder/config.json`）
2. 环境变量（`SKILL_<ID>_<KEY>`）
3. `meta.json` 中的 `default_config`

### 10.5 SkillManager

单例模式，负责 Skill 发现与加载：

```python
from app.skills import skill_manager

# 加载所有 Skill（读取 meta.json，不加载 handler）
skill_manager.load_all_skills()

# 获取指定 Skill
skill = skill_manager.get_skill("stm32")

# 获取所有可用平台
platforms = skill_manager.get_available_platforms()  # ["stm32", "esp32"]

# 按领域查询
embedded = skill_manager.get_skills_by_domain("embedded")

# 按类型查询
mcus = skill_manager.get_skills_by_type("mcu")
```

### 10.6 SkillMatcher

负责将用户输入自动匹配到正确的 Skill：

```python
from app.skills import skill_matcher

# 关键词匹配
results = skill_matcher.match("帮我配置 STM32F407 的 GPIO")
# → [MatchResult(skill=stm32_skill, score=0.85, match_type="keyword")]

# 平台检测
platform = await skill_matcher.detect_platform("这个 ESP32 项目...")
# → "esp32"

# 工程识别
skill_id = await skill_matcher.identify_project("/path/to/project")
# → "stm32" (基于目录特征)
```

**匹配优先级**：
1. `platform_hint` — 显式指定平台
2. `keyword` — 关键词命中
3. `semantic` — 语义相似度（需启用 `SKILL_ENABLE_SEMANTIC_MATCH`）
4. `project_fingerprint` — 工程文件特征

### 10.7 内置 Skill：STM32

**Skill ID**: `stm32` | **关键词**: 29 个

默认配置：
| 参数 | 值 | 说明 |
|------|-----|------|
| `default_mcu` | `STM32F103C8Tx` | 默认芯片 |
| `default_family` | `STM32F1` | 默认系列 |
| `default_core` | `cortex-m3` | 默认内核 |
| `flash_size_kb` | `64` | Flash 大小 |
| `ram_size_kb` | `20` | RAM 大小 |
| `system_clock_hz` | `72000000` | 系统时钟 |
| `hse_value_hz` | `8000000` | HSE 频率 |

所需 CLI 工具：ARM GCC（必须）、STM32CubeMX、OpenOCD、st-flash

### 10.8 内置 Skill：ESP32

**Skill ID**: `esp32` | **关键词**: 31 个

默认配置：
| 参数 | 值 | 说明 |
|------|-----|------|
| `target` | `esp32` | 目标芯片 |
| `flash_size` | `4MB` | Flash 大小 |
| `baud_rate` | `115200` | 串口波特率 |
| `led_gpio` | `2` | LED GPIO |
| `blink_period_ms` | `500` | 闪烁周期 |
| `freertos_hz` | `1000` | FreeRTOS Tick 频率 |
| `build_timeout` | `180` | 编译超时秒数 |
| `flash_timeout` | `60` | 烧录超时秒数 |

所需 CLI 工具：`idf.py`（必须）、`esptool.py`

工程识别标记：`sdkconfig` (0.90)、`sdkconfig.defaults` (0.85)、`main/CMakeLists.txt` + `idf_component_register` (0.90)

### 10.9 添加自定义 Skill

1. 在 `app/skills/` 下创建目录：`<domain>/<platform>/`
2. 创建 `meta.json`（参考 STM32/ESP32 格式）
3. 创建 `skill.py`，导出 `SkillHandler(BaseSkillHandler)` 类
4. 可选：创建 `prompt.tpl` Jinja2 模板
5. 重启后端，`SkillManager` 自动发现

或通过 `SKILL_EXTRA_SKILL_DIRS` 配置额外搜索路径。

---

## 11. RAG 知识库

### 11.1 内置知识库

位于 `data/knowledge_base/` 目录：

```
knowledge_base/
├── common/              通用嵌入式开发知识
│   └── best_practices.md
├── stm32/               STM32 平台专属
│   ├── gpio_guide.md
│   ├── timer_pwm_guide.md
│   └── uart_guide.md
└── esp32/               ESP32 平台专属 (待补充)
```

### 11.2 添加自定义知识

#### 方式一：放置文件

将 `.md` / `.txt` / `.json` 文件放入 `data/knowledge_base/` 对应子目录。重启后端后自动加载。

#### 方式二：API 上传

```powershell
# 单个文档
curl -X POST http://127.0.0.1:8000/api/v1/rag/add `
  -H "Content-Type: application/json" `
  -d '{"content": "STM32 DMA 使用指南...", "source": "custom", "platform": "stm32"}'

# 上传文件
curl -X POST http://127.0.0.1:8000/api/v1/rag/upload `
  -F "file=@my_guide.md"

# 批量添加
curl -X POST http://127.0.0.1:8000/api/v1/rag/add-batch `
  -H "Content-Type: application/json" `
  -d '{"documents": [...]}'
```

### 11.3 搜索知识

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/rag/search `
  -H "Content-Type: application/json" `
  -d '{"query": "STM32 I2C 多从机通信", "platform": "stm32", "top_k": 5}'
```

### 11.4 索引管理

```powershell
# 查看统计
curl http://127.0.0.1:8000/api/v1/rag/stats

# 保存索引到磁盘
curl -X POST http://127.0.0.1:8000/api/v1/rag/save

# 从磁盘加载索引
curl -X POST http://127.0.0.1:8000/api/v1/rag/load

# 清空索引（危险操作）
curl -X DELETE http://127.0.0.1:8000/api/v1/rag/clear
```

### 11.5 增量 RAG

后端通过 WebSocket `/ws/context` 端点接收 IDE 的文件变更事件（`textDocument/didChange`），经 **500ms 防抖**后：
1. 对变更的 C 代码文件进行 **函数/结构体/宏级别切片**
2. 增量更新 FAISS 向量索引
3. 后续 Agent 调用 `search_knowledge` 时即可命中最新代码

### 11.6 文档来源类型

| 来源 | 说明 |
|------|------|
| `datasheet` | 芯片数据手册 |
| `reference_manual` | 参考手册 |
| `application_note` | 应用笔记 |
| `example_code` | 示例代码 |
| `best_practice` | 最佳实践 |
| `faq` | 常见问答 |

---

## 12. 代码引擎

### 12.1 代码融合引擎 (Fusion)

保护 CubeMX 生成的代码区域，安全合并 AI 生成的代码。

**识别并保护的区域**：
- `/* USER CODE BEGIN xxx */` 到 `/* USER CODE END xxx */` 之间的代码
- `MX_` 前缀的初始化函数
- `SystemClock_Config`、`Error_Handler` 等关键函数

**融合策略**：

| 策略 | 说明 |
|------|------|
| `preserve_user` | 优先保留用户代码 |
| `merge_smart` | 智能合并 |
| `overwrite` | 直接覆盖 |

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/code/fuse `
  -H "Content-Type: application/json" `
  -d '{"original_code": "...", "new_code": "...", "strategy": "preserve_user"}'
```

### 12.2 静态分析引擎

**检查项**：
- 危险函数使用（`strcpy` → `strncpy`）
- 空指针解引用
- 未初始化变量
- 格式化字符串漏洞
- 整数溢出风险
- 内存泄漏检测
- 中断安全检查
- 硬件访问规范
- MISRA C 规则子集
- 圈复杂度 / 嵌套深度度量

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/static-analyze `
  -H "Content-Type: application/json" `
  -d '{"code": "void foo() { char *p = malloc(100); strcpy(p, input); }"}'
```

### 12.3 约束检查引擎

**检测内容**：
- 引脚复用冲突（同一引脚被多个外设占用）
- 电气规格违规
- 资源限制（内存 / 外设 / DMA 通道不足）
- 外设互斥检测

支持的芯片规格数据库：STM32F103C8、STM32F407、ESP32（含完整引脚复用表）。

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/constraint-check `
  -H "Content-Type: application/json" `
  -d '{"code": "...", "chip": "STM32F407"}'
```

### 12.4 日志分析引擎

**内置错误模式库**：

| 分类 | 模式 |
|------|------|
| ARM 异常 | HardFault, MemManage, BusFault, UsageFault |
| 内存问题 | Stack overflow, Heap corruption, 内存泄漏 |
| 通信错误 | UART overrun, SPI timeout, I2C NACK |
| 时序问题 | 看门狗超时, RTC 漂移 |
| 资源耗尽 | 任务栈溢出, 队列满 |
| ESP32 专用 | Guru Meditation, Brownout, Flash 加密失败 |

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/log-analyze `
  -H "Content-Type: application/json" `
  -d '{"logs": "Hard Fault at PC=0x08001234\nStack: 0x20005678..."}'
```

### 12.5 状态机分析引擎

从 C 代码中提取状态机并分析：
- 从 `enum` / `#define` 提取状态
- 从 `switch-case` / `if-else` 提取状态转换
- 死锁检测
- 不可达状态检测
- 状态覆盖分析

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/fsm-analyze `
  -H "Content-Type: application/json" `
  -d '{"code": "typedef enum { IDLE, RUNNING, ERROR } State_t; ..."}'
```

### 12.6 AI 分析引擎

通用 LLM 诊断引擎，支持多种分析类型（`AnalysisType`）：
- 错误诊断
- 性能分析
- 内存分析

### 12.7 工程解析引擎

支持的工程格式：
- **STM32CubeMX**：`.ioc` + CubeMX 生成结构
- **Keil uVision**：`.uvprojx`
- **ESP-IDF**：`CMakeLists.txt` + `sdkconfig`

自动检测工程类型并解析：芯片型号、源文件、头文件路径、宏定义、构建系统。

### 12.8 完整引擎列表

| 引擎 | 模块 | 功能 |
|------|------|------|
| `CodeFusionEngine` | `engines/fusion/` | CubeMX 安全代码融合 |
| `ConstraintEngine` | `engines/constraint/` | 硬件约束检查 |
| `StaticAnalyzerEngine` | `engines/static_analyzer/` | C 代码静态分析 |
| `LogAnalyzerEngine` | `engines/log_analyzer/` | 日志根因分析 |
| `HardwareFSMEngine` | `engines/hardware_fsm/` | 状态机分析 |
| `AnalysisEngine` | `engines/ai_analyzer/` | LLM 通用分析 |
| `ProjectParser` | `engines/project_parser/` | 工程结构解析 |
| `IncrementalRAG` | `engines/incremental_rag/` | 实时增量索引 |

> 所有引擎通过 `try/except` 动态导入，不可用时优雅降级——不会影响主服务启动。

---

## 13. 硬件功能

### 13.1 串口通信

#### 通过 CLI

```powershell
# 列出串口
python -m cli serial list

# 监控
python -m cli serial monitor COM4 --baud 115200

# 发送
python -m cli serial send COM4 "AT\r\n"
```

#### 通过 API

```powershell
# 列出串口
curl http://127.0.0.1:8000/api/v1/serial/ports

# 连接
curl -X POST http://127.0.0.1:8000/api/v1/serial/connect `
  -H "Content-Type: application/json" `
  -d '{"port": "COM4", "baudrate": 115200}'

# 发送数据
curl -X POST http://127.0.0.1:8000/api/v1/serial/send/SESSION_ID `
  -H "Content-Type: application/json" `
  -d '{"data": "AT\r\n"}'

# 读取数据
curl http://127.0.0.1:8000/api/v1/serial/read/SESSION_ID

# 断开
curl -X POST http://127.0.0.1:8000/api/v1/serial/disconnect/SESSION_ID
```

#### 通过 WebSocket

连接 `/ws/serial/{connection_id}` 或 `/api/v1/serial/tunnel/{session_id}` 获得双向串口隧道。支持二进制透传、xterm.js 终端集成。

### 13.2 固件烧录

#### STM32 烧录

前提：安装 STM32CubeProgrammer 并配置 `MCU_STM32_PROGRAMMER_PATH`（或通过 Skill 系统自动检测）。

```powershell
# CLI
python -m cli flash write firmware.bin --platform stm32

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "stm32", "address": "0x08000000"}'
```

#### ESP32 烧录

前提：安装 esptool（`pip install esptool`）。

```powershell
# CLI
python -m cli flash write firmware.bin --platform esp32 --port COM4

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "esp32", "port": "COM4"}'
```

#### 烧录安全检查

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/flash/safety-check `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "stm32"}'
```

### 13.3 OpenOCD 调试

```powershell
# CLI 启动调试服务器
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg

# API 启动
curl -X POST http://127.0.0.1:8000/api/v1/debug/start `
  -H "Content-Type: application/json" `
  -d '{"interface_cfg": "interface/stlink.cfg", "target_cfg": "target/stm32f4x.cfg"}'

# 读取寄存器
curl -X POST http://127.0.0.1:8000/api/v1/debug/registers

# 读取内存
curl -X POST http://127.0.0.1:8000/api/v1/debug/memory/read `
  -H "Content-Type: application/json" `
  -d '{"address": "0x20000000", "length": 256}'

# 执行 GDB 命令
curl -X POST http://127.0.0.1:8000/api/v1/debug/gdb `
  -H "Content-Type: application/json" `
  -d '{"command": "info breakpoints"}'

# 表达式求值
curl -X POST http://127.0.0.1:8000/api/v1/debug/evaluate `
  -H "Content-Type: application/json" `
  -d '{"expression": "*((uint32_t*)0x20000000)"}'

# 停止
curl -X POST http://127.0.0.1:8000/api/v1/debug/stop
```

### 13.4 QEMU 仿真

```powershell
# CLI
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
```

仿真时可捕获：
- UART stdout 输出
- 执行追踪 (exec)
- 内存读写追踪 (mem_read / mem_write)
- 中断追踪 (irq)

### 13.5 硬件信息查询

```powershell
# 检测连接硬件
curl http://127.0.0.1:8000/api/v1/hardware/detect

# 工具链状态
curl http://127.0.0.1:8000/api/v1/hardware/toolchains

# 芯片引脚复用
curl http://127.0.0.1:8000/api/v1/hardware/pinout/STM32F407VGT6

# 引脚信息
curl "http://127.0.0.1:8000/api/v1/hardware/pin-info?chip=STM32F407&pin=PA0"

# 芯片详情
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# 时钟树
curl http://127.0.0.1:8000/api/v1/hardware/clock-tree

# 外设地址映射
curl http://127.0.0.1:8000/api/v1/hardware/peripheral-map

# 引脚冲突检测
curl -X POST http://127.0.0.1:8000/api/v1/hardware/validate_pinout `
  -H "Content-Type: application/json" `
  -d '{"chip": "STM32F407", "pin_assignments": {"PA0": "UART4_TX", "PA1": "UART4_RX"}}'
```

---

## 14. 数据捕获与管线

### 14.1 捕获层架构

所有硬件交互数据通过统一的捕获层采集：

```
DataCapture (抽象基类)
├── SerialCapture      串口数据
├── FlashCapture       烧录输出
├── OpenOCDCapture     调试输出
└── QEMUCapture        仿真输出
```

### 14.2 数据流转

```
硬件 → DataCapture.emit() → CapturedData
  → AIDataFilter (过滤冗余)
  → SmartSampler (智能采样)
  → LLMContext (格式化为 AI Prompt)
  → Pipeline consumers (分析引擎 / 前端推送)
```

### 14.3 数据类型（26 种）

| 类型 | 来源 |
|------|------|
| `SERIAL_OUTPUT` / `SERIAL_INPUT` | 串口 |
| `GDB_OUTPUT` / `GDB_MI_OUTPUT` | GDB |
| `OPENOCD_LOG` / `OPENOCD_TELNET` | OpenOCD |
| `MEMORY_DUMP` / `REGISTER_DUMP` | 调试 |
| `TRACE_LOG` / `TRACE_INSTRUCTION` / `TRACE_MEMORY` / `TRACE_IRQ` | 追踪 |
| `PERIPHERAL_IO` / `GPIO_STATE` / `UART_OUTPUT` | 外设 |
| `QEMU_LOG` / `QEMU_MONITOR` | QEMU |
| `RENODE_LOG` / `RENODE_MONITOR` | Renode |
| `FLASH_PROGRESS` / `FLASH_RESULT` | 烧录 |
| `BUILD_LOG` / `RUNTIME_ERROR` | 构建 / 运行时 |

严重级别：`CRITICAL` > `ERROR` > `WARNING` > `INFO` > `DEBUG` > `TRACE`

### 14.4 AI 数据过滤器 (AIDataFilter)

四种过滤动作：

| 动作 | 说明 |
|------|------|
| `PASS` | 直接通过 |
| `COMPRESS` | 压缩同类数据 |
| `AGGREGATE` | 聚合统计（每 100 条或每秒） |
| `DROP` | 丢弃无用数据 |

规则：错误/异常 **100% 保留**，正常重复数据聚合/丢弃。

### 14.5 智能采样器 (SmartSampler)

| 配置 | 默认值 |
|------|--------|
| 采样窗口 | 1000 ms |
| 窗口内最大样本 | 10 |
| 总最大样本 | 1000 |
| 错误权重 | 10.0 |
| 警告权重 | 5.0 |

策略：error/critical **无条件保留**；值变化高概率保留；重复内容递减概率。

### 14.6 Pipeline 管理器

- **Pipeline**：绑定一个 DataCapture + AIDataFilter + SmartSampler
- **PipelineManager**：管线注册/注销，全局启停
- 全局缓冲池：`deque`，默认 1000 条
- 统计：`total_in` / `filtered_out` / `sampled_out` / `delivered` / `errors`

```python
# 获取最新数据
manager.get_recent(count=10)

# 获取错误数据
manager.get_errors(count=5)

# 获取统计
manager.get_all_stats()
```

---

## 15. 安全机制

### 15.1 路径沙箱 (PathSandbox)

Agent 的文件操作被限制在安全范围内：

**阻止的路径**：
- Unix：`/etc`、`/bin`、`/sbin`、`/usr/bin`、`/boot`、`/dev`、`/proc`、`/sys`、`/root`、`/lib` ...
- Windows：`C:\Windows`、`C:\Program Files`、`C:\ProgramData` ...

**阻止的文件**：`.env`、`.ssh`、`id_rsa`、`authorized_keys`、`passwd`、`shadow`、`*.pem`、`*.key`、`*.crt`、`*.pfx`

**大小限制**：读取 ≤ 5 MB，写入 ≤ 10 MB

### 15.2 终端命令安全

**白名单命令**（55+）：`make`、`cmake`、`ninja`、`idf.py`、`arm-none-eabi-*`、`gcc`、`python`、`git`、`ls`、`cat`、`openocd`、`esptool`、`st-flash`、`JLinkExe`、`mkdir`、`cp`、`mv`、`echo`、`pwd`、`cd`、`head`、`tail`、`wc`、`sort`、`diff` ...

**黑名单模式**（16 条）：`rm -rf /`、fork bomb、`dd of=/dev/sd*`、`mkfs`、`format`、`curl|bash`、`wget|bash`、`eval`、`exec`、命令替换（`$()`、反引号）、`chmod 777`、`chown root`、`sudo`、`su`、链式 rm ...

**注入检测**：拦截 `;`、`|`、`&&`、`||`、`\n`、`>`、`<`

### 15.3 速率限制 (RateLimiter)

| 限制 | 上限 |
|------|------|
| Agent 调用 | 30 次 / 60 秒 |
| 工具调用 | 100 次 / 60 秒 |

基于滑动窗口算法。

### 15.4 审计日志 (AuditLog)

- 环形缓冲，最大 **10,000** 条
- 字段：`timestamp`、`session_id`、`action`、`tool_name`、`args_summary`、`result`、`risk_level`、`detail`
- 全局单例：`audit_log`

### 15.5 敏感操作确认

所有高风险操作必须用户确认。确认窗口 300 秒超时自动拒绝。

### 15.6 CubeMX 代码保护

代码融合时自动保护受保护区域，配置项：`SECURITY_PROTECTED_REGIONS`。

### 15.7 Fuse 保护

启用 `SECURITY_ENABLE_FUSE_PROTECTION=true` 防止意外修改芯片 fuse 位。

### 15.8 CORS 配置

默认允许源：`http://localhost:*`、`http://127.0.0.1:*`、`vscode-webview://*`

> **生产环境**务必修改 `SECURITY_ALLOWED_ORIGINS`，切勿使用 `*`。

### 15.9 输入净化

所有用户输入经过 `sanitize_string()` 处理：移除空字节、限制长度（默认 10,000 字符）、去除前后空白。

---

## 16. 编辑协议

### 16.1 核心原则

**"后端提议，前端应用"** — Agent 不直接写磁盘。所有文件修改先生成 `EditProposal`，由前端（VSCode 扩展 / TUI）展示差异后，用户审批方可应用。

### 16.2 编辑动作

| 动作 | 说明 |
|------|------|
| `REPLACE` | 替换指定行范围的内容 |
| `INSERT` | 在指定行后插入 |
| `DELETE` | 删除指定行范围 |
| `CREATE_FILE` | 创建新文件 |
| `DELETE_FILE` | 删除文件 |

### 16.3 提议状态

| 状态 | 说明 |
|------|------|
| `PENDING` | 等待审批 |
| `ACCEPTED` | 已接受 |
| `REJECTED` | 已拒绝 |
| `AUTO_APPLIED` | 自动应用（低风险） |
| `EXPIRED` | 已过期（300 秒） |

### 16.4 SSE 事件类型

| 类型 | 说明 |
|------|------|
| `THINKING` | Agent 思考过程 |
| `TEXT` | 文本输出 |
| `TOOL_CALL` | 工具调用 |
| `TOOL_RESULT` | 工具执行结果 |
| `EDIT` | 编辑提议（包含 diff） |
| `FILE_CREATED` | 文件创建提议 |
| `CONFIRMATION` | 确认请求 |
| `ERROR` | 错误 |
| `DONE` | 结束 |

### 16.5 API 交互流程

```
1. Agent 执行 write_file/edit_file
   → 生成 EditProposal (status=PENDING)
   → SSE 推送 EDIT 事件到前端

2. 前端展示 diff 给用户

3. 用户决定：
   → POST /api/v1/agent/edit/apply   → 应用到磁盘
   → POST /api/v1/agent/edit/reject  → 丢弃

4. 300 秒无操作 → 自动过期
```

### 16.6 diff 计算

`compute_proposed_edits_from_content()` 使用 `difflib` 进行行级 diff，自动计算 `ProposedEdit` 列表。

---

## 17. 测试

### 17.1 运行测试

```powershell
cd backend

# 运行所有测试
python -m pytest

# 指定文件
python -m pytest tests/capture/test_serial.py

# 指定目录
python -m pytest tests/engines/

# 详细输出
python -m pytest -v

# 快速模式（遇到失败立即停止）
python -m pytest -x

# 精简输出
python -m pytest -q

# 生成覆盖率报告
python -m pytest --cov=app --cov-report=html
```

### 17.2 测试目录结构

```
tests/
├── conftest.py               全局 fixture
├── capture/                   捕获层测试
│   ├── test_base.py             基础模型
│   ├── test_serial.py           串口捕获
│   ├── test_flash.py            烧录捕获
│   ├── test_openocd_qemu.py     OpenOCD / QEMU
│   └── test_filter_sampler.py   过滤器 / 采样器
├── engines/                   引擎测试
│   ├── test_ai_analyzer.py      AI 分析器
│   ├── test_fsm.py              状态机
│   ├── test_log_analyzer.py     日志分析
│   └── test_static_analyzer.py  静态分析
├── pipeline/                  管线测试
│   └── test_pipeline.py
├── integration/               集成测试
│   └── test_integration.py
├── core/                      核心模块测试
├── security/                  安全测试
├── services/                  服务测试
├── test_cli/                  CLI 测试
└── test_tui/                  TUI 测试
```

### 17.3 测试配置

```ini
# pytest.ini
[pytest]
testpaths = tests
asyncio_mode = strict      # 异步测试需 @pytest.mark.asyncio
pythonpath = .
```

根目录 `conftest.py` 确保 `backend/` 在 `sys.path` 最前，使 `app.*`、`tui.*`、`cli.*` 均可正常解析。

### 17.4 异步测试

使用 `pytest-asyncio`，异步测试函数需要标记：

```python
import pytest

@pytest.mark.asyncio
async def test_agent_chat():
    ...
```

---

## 18. 架构参考

### 18.1 整体架构图

```
==========================================================
                    用户交互层
==========================================================
  CLI (Click)    TUI (Textual)    VSCode Extension
       |              |                   |
  AgentClient     AgentClient         REST / WS
  (aiohttp SSE)  (aiohttp SSE)          |
       |              |                   |
==========================================================
          FastAPI Sidecar Engine (v2.0)
==========================================================
  LifecycleManager (进程主控 + 信号处理 + 握手)
  WebSocketManager (事件总线 + 频道订阅 + 心跳)
  ----------------------------------------------------------
  API Routes (/api/v1/*)
    Agent | Chat | Code | Project | RAG
    Hardware | Serial | Flash | Debug
    Build | Terminal | System | Telemetry
    Session | Extensions | Workflow | Config
  ----------------------------------------------------------
  Services
    AgentLoop        — AI Agent 核心循环
      ToolRegistry   — 工具注册中心
      SensitiveGuard — 敏感操作守卫
      ContextManager — 对话上下文 (Token 窗口)
      WorkspaceManager — 工作区路径注入
      KnowledgeCache — 知识缓存 (LRU+TTL)
      StatusReporter — SSE 事件推送
      ErrorRecovery  — 错误自动恢复
    LLMService       — 多提供商 LLM 统一接口
    RAGService       — FAISS 向量检索
    ProjectService   — 工程管理
    CLIService       — 工具链调用
    FlashService     — 烧录管理
    SerialService    — 串口管理
    HardwareService  — 硬件检测
    TerminalService  — 安全命令执行
    ChatService      — 对话管理
    AICorrectionService — AI 代码修正
  ----------------------------------------------------------
  Skill 插件系统
    SkillManager     — 发现 + 懒加载
    SkillMatcher     — 匹配 (关键词 + 语义)
    STM32 Skill      — STM32 全栈能力
    ESP32 Skill      — ESP32 全栈能力
    (可扩展...)
  ----------------------------------------------------------
  Engines
    FusionEngine     — CubeMX 安全代码融合
    ConstraintEngine — 硬件约束检查
    StaticAnalyzer   — C 代码静态分析
    LogAnalyzer      — 日志根因分析
    HardwareFSM      — 状态机分析
    AIAnalyzer       — LLM 诊断引擎
    ProjectParser    — 工程结构解析
    IncrementalRAG   — 实时增量索引
  ----------------------------------------------------------
  Capture & Pipeline
    SerialCapture    — pyserial 串口
    FlashCapture     — st-flash/esptool
    OpenOCDCapture   — OpenOCD Telnet
    QEMUCapture      — QEMU 仿真
    AIDataFilter     — 数据过滤
    SmartSampler     — 智能采样
    PipelineManager  — 管线注册 + 全局缓冲
  ----------------------------------------------------------
  Core
    config.py        — Pydantic Settings 配置
    security.py      — 沙箱 + 命令过滤 + 速率限制
    bus.py           — WebSocket 频道管理
    lifecycle.py     — 状态机 + 子进程管理
    logging.py       — structlog 日志
    exceptions.py    — 统一异常体系
==========================================================
```

### 18.2 数据流

1. **AI 对话**：用户消息 → AgentLoop → LLM 决策 → ToolRegistry → handler 执行 → 观察结果 → LLM 继续 → 最终回答
2. **知识检索**：Agent `search_knowledge` → KnowledgeCache → RAGService → FAISS 搜索 → 结果缓存
3. **硬件捕获**：DataCapture → CapturedData → AIDataFilter → SmartSampler → LLMContext → 分析引擎 → 诊断结果
4. **代码编辑**：Agent `edit_file`/`write_file` → EditProposal → SSE 推送 → 前端 Accept/Reject → 磁盘写入
5. **平台匹配**：用户消息 → SkillMatcher.match() → 关键词/语义/指纹 → 返回最佳 Skill → 加载 Handler

### 18.3 错误码体系

| 码段 | 分类 | 示例 |
|------|------|------|
| 1xxx | 通用 | SUCCESS, INVALID_PARAMETER, TIMEOUT |
| 2xxx | 工程 | NOT_FOUND, BUILD_FAILED, CLI_NOT_FOUND |
| 3xxx | 代码 | GENERATION_FAILED, PARSE_ERROR, FUSION_FAILED |
| 4xxx | 硬件 | NOT_CONNECTED, FLASH_FAILED, SERIAL_TIMEOUT |
| 5xxx | AI/LLM | API_ERROR, RATE_LIMITED, RAG_INDEX_ERROR |
| 6xxx | 验证 | CONSTRAINT_VIOLATION, PIN_CONFLICT, MISRA_VIOLATION |

### 18.4 API 响应格式

所有 API 返回统一格式：

```json
{
  "code": 1000,
  "message": "success",
  "data": { ... },
  "request_id": "uuid",
  "timestamp": "2026-02-15T12:00:00Z"
}
```

### 18.5 FastAPI 应用配置

| 项目 | 值 |
|------|-----|
| title | `Emcoder Sidecar Engine` |
| version | `2.0.0` |
| Swagger UI | `/docs` |
| ReDoc | `/redoc` |
| CORS | 全方法、全头部、credentials=true |

异常处理器：`EmcoderException` → JSON 错误响应、`HTTPException` 透传、通用 Exception → 500。

---

## 19. 故障排查

### 19.1 后端无法启动

**问题**：`ModuleNotFoundError: No module named 'fastapi'`

```powershell
# 方案：安装依赖
pip install -r requirements.txt
```

**问题**：`Address already in use (端口被占用)`

```powershell
# 方案：自动分配端口
python run.py --port 0

# 或查找并终止占用进程
netstat -ano | findstr :8000
taskkill /PID <pid> /F
```

### 19.2 CLI 连接后端失败

**问题**：`Backend: Disconnected`

```
方案：
1. 确认后端已启动：curl http://127.0.0.1:8000/health
2. 使用 -b 指定正确地址：python -m cli -b http://127.0.0.1:8000 status
3. 检查防火墙是否阻止 8000 端口
4. 检查是否使用了不同端口启动后端
```

### 19.3 LLM 调用失败

**问题**：`LLM API Error` / `Rate Limited` / `Timeout`

```
方案：
1. 检查 .env 中的 API Key 是否填写正确
2. 检查网络连通性：curl https://dashscope.aliyuncs.com/compatible-mode/v1/models
3. 增加超时：LLM_TIMEOUT=300
4. 配置备选模型：LLM_FALLBACK_PROVIDER=deepseek
5. 本地部署：LLM_PROVIDER=ollama （无需 API Key）
6. 检查余额/配额是否耗尽
```

### 19.4 RAG 搜索无结果

**问题**：知识库检索返回空

```
方案：
1. 确认知识库文件存在：ls data/knowledge_base/
2. 检查索引状态：curl http://127.0.0.1:8000/api/v1/rag/stats
3. 首次使用需等待嵌入模型下载完成（~500MB）
4. 手动重载索引：curl -X POST http://127.0.0.1:8000/api/v1/rag/load
5. 查看日志判断嵌入模型是否正常加载
```

### 19.5 串口无法打开

**问题**：`Serial port permission denied` / `Port not found`

```
方案：
1. Windows：检查设备管理器中串口驱动是否正常安装
2. Linux：sudo usermod -aG dialout $USER 并重新登录
3. 确认无其他程序（如 Arduino IDE、PuTTY）占用该串口
4. 检查 USB 线缆连接
```

### 19.6 烧录失败

**问题**：`Flash failed` / `Programmer not found`

```
方案：
1. 安装对应烧录工具（STM32CubeProgrammer / esptool）
2. 在 .env 中配置工具路径（MCU_STM32_PROGRAMMER_PATH 等）
3. 检查调试器连接（ST-Link / USB）
4. 检查固件文件路径
5. 使用 Skill 检测工具链：curl http://127.0.0.1:8000/api/v1/hardware/toolchains
```

### 19.7 embedding 模型下载慢

**问题**：`sentence-transformers` 模型下载超时

```powershell
# 方案一：设置 Hugging Face 镜像
$env:HF_ENDPOINT = "https://hf-mirror.com"
python run.py

# 方案二：手动下载并放入缓存
# 下载 all-MiniLM-L6-v2 放入 ~/.cache/huggingface/

# 注意：下载失败时 RAG 会自动降级为哈希嵌入（精度降低但可用）
```

### 19.8 TUI 显示异常

**问题**：TUI 界面乱码或布局错位

```
方案：
1. 确认终端支持 UTF-8：chcp 65001
2. 使用 Windows Terminal 或其他现代终端
3. 确认 textual 版本 ≥ 0.85
4. 尝试调整终端窗口大小（建议 ≥ 120×30）
```

### 19.9 Agent 超时

**问题**：`Agent loop timeout`

```
方案：
1. 增加超时：AGENT_LOOP_TIMEOUT=600
2. 减少最大轮次：AGENT_MAX_ROUNDS=10
3. 简化请求（一次只做一件事）
4. 检查 LLM 响应速度（可能是 LLM 端慢）
```

### 19.10 工程构建失败

**问题**：`Build failed` / `Toolchain not found`

```
方案：
1. 检查工具链是否已安装：
   - STM32：arm-none-eabi-gcc --version
   - ESP32：idf.py --version
2. 检查 PATH 是否包含工具链路径
3. STM32：确认 CubeMX 已生成 Makefile
4. ESP32：确认已 source export.sh 设置 IDF 环境
5. 查看构建日志：curl http://127.0.0.1:8000/api/v1/logs/build/{project_id}
```

---

## 20. 附录

### 20.1 文件结构速查

```
EmcoderCLI/
└── backend/
    ├── run.py                  启动器
    ├── start_server.ps1        PowerShell 启动脚本
    ├── requirements.txt        Python 依赖
    ├── pytest.ini              测试配置
    ├── conftest.py             测试 fixture
    ├── .env                    环境配置（需自建）
    ├── app/
    │   ├── main.py             FastAPI 应用入口
    │   ├── core/
    │   │   ├── config.py       配置管理 (Pydantic Settings)
    │   │   ├── security.py     安全：沙箱/命令过滤/速率限制
    │   │   ├── bus.py          WebSocket 事件总线
    │   │   ├── lifecycle.py    生命周期管理
    │   │   ├── logging.py      日志
    │   │   ├── exceptions.py   异常定义
    │   │   └── utils.py        工具函数
    │   ├── api/
    │   │   ├── routes/         REST API 路由
    │   │   ├── ws_routes.py    WebSocket 路由
    │   │   └── compat.py       兼容路由 (/api/ 无 v1)
    │   ├── models/
    │   │   ├── schemas.py      API 数据模型
    │   │   └── edit_protocol.py  编辑协议模型
    │   ├── services/
    │   │   ├── agent/          Agent 系统 (10 个模块)
    │   │   ├── llm/            LLM 调用
    │   │   ├── rag/            RAG 知识库
    │   │   ├── project/        工程管理
    │   │   ├── serial/         串口通信
    │   │   ├── flash/          烧录
    │   │   ├── hardware/       硬件管理
    │   │   ├── terminal/       终端命令
    │   │   ├── chat/           聊天
    │   │   ├── cli/            CLI 工具检测
    │   │   └── ai_correction/  AI 纠错
    │   ├── engines/
    │   │   ├── fusion/         代码融合
    │   │   ├── constraint/     约束检查
    │   │   ├── static_analyzer/ 静态分析
    │   │   ├── log_analyzer/   日志分析
    │   │   ├── hardware_fsm/   状态机分析
    │   │   ├── ai_analyzer/    AI 分析
    │   │   ├── project_parser/ 工程解析
    │   │   └── incremental_rag/ 增量 RAG
    │   ├── skills/
    │   │   ├── base.py         Skill 基类和模型
    │   │   ├── manager.py      SkillManager
    │   │   ├── matcher.py      SkillMatcher
    │   │   └── embedded/       内置 Skill (stm32, esp32)
    │   ├── capture/
    │   │   ├── base.py         捕获基类和数据模型
    │   │   ├── filter.py       AI 数据过滤器
    │   │   ├── sampler.py      智能采样器
    │   │   ├── serial/         串口捕获
    │   │   ├── flash/          烧录捕获
    │   │   ├── openocd/        调试捕获
    │   │   └── qemu/           仿真捕获
    │   └── pipeline/
    │       └── manager.py      管线管理器
    ├── cli/
    │   ├── __main__.py         CLI 入口
    │   └── main.py             Click 命令定义
    ├── tui/
    │   ├── app.py              Textual 主应用
    │   ├── widgets.py          UI 组件
    │   ├── client.py           SSE Agent 客户端
    │   ├── icons.py            ASCII 图标常量
    │   └── styles.py           TCSS 样式
    ├── data/
    │   ├── knowledge_base/     RAG 知识库文档
    │   ├── rag_index/          FAISS 向量索引
    │   └── workspace/          工程工作区
    ├── config/
    │   └── allowed_extensions.json  扩展白名单
    ├── tests/                  测试套件
    └── docs/                   文档
```

### 20.2 环境变量速查表

| 前缀 | 配置组 | 示例 |
|------|--------|------|
| （无） | 服务核心 | `HOST`, `PORT`, `DEBUG`, `LOG_LEVEL` |
| `LLM_` | LLM 模型 | `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL_NAME` |
| `RAG_` | 知识库 | `RAG_VECTOR_STORE`, `RAG_DEFAULT_TOP_K` |
| `SKILL_` | Skill 系统 | `SKILL_ENABLE_SEMANTIC_MATCH` |
| `PROJECT_` | 工程管理 | `PROJECT_DEFAULT_PLATFORM`, `PROJECT_AUTO_BUILD` |
| `AGENT_` | Agent 引擎 | `AGENT_MAX_ROUNDS`, `AGENT_LOOP_TIMEOUT` |
| `SECURITY_` | 安全 | `SECURITY_REQUIRE_CONFIRMATION` |
| `MCU_` | 工具链（弃用）| `MCU_ARM_GCC_PATH` |

### 20.3 常用 API 快速参考

```powershell
# 健康检查
curl http://127.0.0.1:8000/health

# AI 聊天（非流式）
curl -X POST http://127.0.0.1:8000/api/v1/agent/chat `
  -H "Content-Type: application/json" `
  -d '{"message": "你好"}'

# 知识库搜索
curl -X POST http://127.0.0.1:8000/api/v1/rag/search `
  -H "Content-Type: application/json" `
  -d '{"query": "UART DMA", "top_k": 3}'

# 芯片信息
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# 串口列表
curl http://127.0.0.1:8000/api/v1/serial/ports

# 工具列表
curl http://127.0.0.1:8000/api/v1/agent/tools
```

### 20.4 版本历史

| 版本 | 日期 | 重大变更 |
|------|------|---------|
| v2.0.0 | 2026-02 | Skill 插件系统、编辑协议、Agent 14 工具、TUI 重构 |
| v1.0.0 | — | 初始版本 |

---

*Emcoder CLI v2.0.0 — Embedded MCU Intelligent Development Sidecar Engine*
