# Emcoder CLI v2.1 — User Manual (Step-by-Step Guide)

Embedded MCU Intelligent Development AI Agent System. Integrates AI Chat, Code Generation, Knowledge Retrieval, Serial Communication, Firmware Flashing, Hardware Debugging, and QEMU Simulation. Provides **CLI / TUI / REST API / WebSocket** four interaction modes.

> Last Updated: 2026-02-20

---

## Table of Contents

- [1. System Overview](#1-system-overview)
- [2. Installation and Environment Preparation](#2-installation-and-environment-preparation)
- [3. Configuration (Full Reference)](#3-configuration-full-reference)
- [4. Starting Backend Service](#4-starting-backend-service)
- [5. CLI Command Line Tool](#5-cli-command-line-tool)
- [6. TUI Terminal Interface](#6-tui-terminal-interface)
- [7. REST API Full Reference](#7-rest-api-full-reference)
- [8. WebSocket Endpoints](#8-websocket-endpoints)
- [9. AI Agent System](#9-ai-agent-system)
- [10. Skill Plugin System](#10-skill-plugin-system)
- [11. RAG Knowledge Base](#11-rag-knowledge-base)
- [12. Code Engine](#12-code-engine)
- [13. Hardware Functions](#13-hardware-functions)
- [14. Data Capture and Pipeline](#14-data-capture-and-pipeline)
- [15. Security Mechanisms](#15-security-mechanisms)
- [16. Edit Protocol](#16-edit-protocol)
- [17. Testing](#17-testing)
- [18. Architecture Reference](#18-architecture-reference)
- [19. Troubleshooting](#19-troubleshooting)
- [20. Appendix](#20-appendix)

---

## 1. System Overview

### 1.1 Positioning

Emcoder is an **AI Sidecar Service** for embedded MCU development. It runs as a backend engine and can be called by CLI, TUI, VSCode extensions, or any HTTP/WebSocket client.

### 1.2 Core Capabilities at a Glance

| Capability | Description |
|---|---|
| AI Chat | Multi-turn reasoning based on Agent Loop (Think → Act → Observe → Repeat), supporting 27 tool calls (19 built-in + 8 LLM providers) |
| Code Generation | Generate embedded C code complying with HAL/LL/ESP-IDF specifications |
| Knowledge Retrieval (RAG) | FAISS vector index + Incremental RAG, built-in STM32/ESP32 knowledge base |
| Skill Plugins | Extensible platform skill system, auto-discovery, lazy loading, keyword + semantic matching |
| Project Management | Create / Build / Parse CubeMX / ESP-IDF / Keil projects |
| Serial Communication | Port enumeration, monitoring, data sending/receiving, WebSocket passthrough |
| Firmware Flashing | Support STM32 (st-flash / STM32CubeProgrammer) and ESP32 (esptool) |
| Hardware Debugging | OpenOCD debug session, memory/register read/write, GDB commands |
| QEMU Simulation | Run firmware simulation without hardware, support execution/memory/interruption tracing |
| Static Analysis | MISRA C subset check, security audit, cyclomatic complexity measurement |
| Constraint Check | Pin conflict detection, electrical specification verification, resource limit check |
| Log Analysis | Embedded error pattern library + error chain tracing + root cause analysis |
| State Machine Analysis | Extract FSM from C code, detect deadlocks and unreachable states |
| Edit Protocol | Agent does not write directly to disk, generates EditProposal for frontend approval |
| Data Capture | Unified hardware data acquisition pipeline (filter + sample + AI context formatting) |
| Telemetry Monitoring | CPU/memory/build/crash reporting, WebSocket dashboard |

### 1.3 Supported MCU Platforms

| Platform | Chip Series | Skill ID |
|---|---|---|
| STM32 | F1, F4, F7, H7, L0, L4, G0, G4, U5 | `stm32` |
| ESP32 | ESP32, ESP32-S2, ESP32-S3, ESP32-C3, ESP32-C6, ESP32-H2 | `esp32` |

> The Skill system is extensible—adding a new platform only requires creating a new directory under `app/skills/embedded/`, no changes to the main framework needed.

### 1.4 Supported LLM Providers

| Provider | Default Model | API Compatible Protocol | Default Endpoint |
|---|---|---|---|
| Qwen (Tongyi Qianwen) | qwen-max | OpenAI Compatible | `dashscope.aliyuncs.com/compatible-mode/v1` |
| DeepSeek | deepseek-coder | OpenAI Compatible | `api.deepseek.com/v1` |
| OpenAI | gpt-4-turbo-preview | Native | `api.openai.com/v1` |
| Groq | llama2-70b-4096 | OpenAI Compatible | `api.groq.com/openai/v1` |
| Ollama (Local) | codellama | OpenAI Compatible | `localhost:11434/v1` |
| Anthropic | claude-3 | Native | — |

### 1.5 Three Interaction Modes

| Mode | Scenario | Start Command |
|---|---|---|
| CLI (Click) | Scripting, CI/CD, quick commands | `python -m cli <command>` |
| TUI (Textual) | Terminal interaction, headless environment | `python -m cli tui` |
| REST API + WebSocket | VSCode extension, Web frontend, third-party integration | `python run.py` |

---

## 2. Installation and Environment Preparation

### 2.1 System Requirements

| Item | Requirement |
|---|---|
| Python | 3.10 or higher |
| Operating System | Windows / macOS / Linux |
| Memory | Recommended 8 GB+ (RAG embedding model requires ~500 MB) |
| Disk | ~2 GB (including Python packages + model cache) |

### 2.2 Installation Steps

```powershell
# 1. Clone repository
git clone <repo-url>
cd EmcoderCLI

# 2. Create virtual environment
python -m venv .venv

# Windows activate
.venv\Scripts\Activate.ps1

# Linux/macOS activate
# source .venv/bin/activate

# 3. Install dependencies
cd backend
pip install -r requirements.txt
```

> **Tip**: On first run, the sentence-transformers embedding model (~500 MB) will download automatically.
> If download is slow, set Hugging Face mirror: `$env:HF_ENDPOINT = "https://hf-mirror.com"`

### 2.3 Core Dependencies at a Glance

| Category | Package |
|---|---|
| Web Framework | fastapi ≥0.104, uvicorn[standard] ≥0.24, pydantic ≥2.5, pydantic-settings ≥2.1, python-multipart, python-dotenv |
| LLM/AI | langchain ≥0.1, langchain-community, openai ≥1.3, httpx ≥0.25, tiktoken ≥0.5 |
| RAG Vector Retrieval | faiss-cpu ≥1.7.4, sentence-transformers ≥2.2.2, numpy ≥1.24 |
| C Code Parsing | pycparser ≥2.21 |
| Logging & Formatting | structlog ≥23.2, rich ≥13.7 |
| Async | aiofiles ≥23.2, anyio ≥4.0 |
| Utilities | tenacity ≥8.2, orjson ≥3.9, PyYAML ≥6.0.1, packaging ≥23.0 |
| Serial | pyserial ≥3.5 |
| CLI/TUI | click ≥8.1, textual ≥0.85, aiohttp ≥3.9 |
| System Monitoring | psutil ≥5.9 |
| Testing | pytest ≥7.4, pytest-asyncio ≥0.23, pytest-cov, black, ruff, mypy |

### 2.4 MCU Toolchain (Optional, install as needed)

Install external tools according to the target platform:

| Tool | Purpose | Download URL | Environment Variable |
|---|---|---|---|
| ARM GCC | STM32 Cross Compilation | developer.arm.com | `MCU_ARM_GCC_PATH` |
| STM32CubeMX | Project Generation | st.com | `MCU_STM32CUBEMX_PATH` |
| STM32CubeProgrammer | STM32 Flashing | st.com | `MCU_STM32_PROGRAMMER_PATH` |
| ESP-IDF | ESP32 Development Framework | docs.espressif.com | `MCU_ESP_IDF_PATH` |
| esptool | ESP32 Flashing | `pip install esptool` | `MCU_ESPTOOL_PATH` |
| OpenOCD | Debug Server | openocd.org | `MCU_OPENOCD_PATH` |
| QEMU (ARM) | Simulation | qemu.org | — |

> **Tip**: All tools are optional. Related functions will degrade gracefully if not installed. `detect_cli()` of the Skill system can automatically detect and report installation status.

---

## 3. Configuration (Full Reference)

### 3.1 Configuration File

Copy `.env.example` (if available) to `.env` and edit:

```powershell
cd backend
copy .env.example .env   # or cp .env.example .env
```

Configuration system is based on **Pydantic Settings**, supporting:
- Automatic loading of `.env` file
- Environment variable override (higher priority than `.env`)
- Nested separator `__` (e.g., `LLM__TEMPERATURE=0.5`)
- Automatic type validation

### 3.2 Full Configuration Items

#### 3.2.1 Service Core (Top-level Settings)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `APP_NAME` | str | `Emcoder` | Application name |
| `VERSION` | str | `0.1.0` | Version number |
| `DEBUG` | bool | `false` | Debug mode |
| `ENVIRONMENT` | str | `development` | Running environment: `development` / `testing` / `production` |
| `HOST` | str | `127.0.0.1` | Listen address |
| `PORT` | int | `8002` | Listen port (range 1024-65535) |
| `LOG_LEVEL` | str | `INFO` | Log level: `DEBUG` / `INFO` / `WARNING` / `ERROR` / `CRITICAL` |
| `LOG_FORMAT` | str | `text` | Log format: `text` / `json` |
| `LOG_FILE` | str | None | Log file path (leave empty for console output only) |
| `DATA_DIR` | str | `data` | Data storage root directory |

#### 3.2.2 LLM Configuration (`LLM_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `LLM_PROVIDER` | str | `qwen` | Provider: `openai` / `qwen` / `deepseek` / `anthropic` / `groq` / `ollama` |
| `LLM_API_KEY` | str | None | API Key |
| `LLM_API_BASE` | str | Auto (per provider) | Custom API endpoint |
| `LLM_MODEL_NAME` | str | `qwen-max` | Main model |
| `LLM_CODE_MODEL_NAME` | str | Same as main model | Code generation specialized model |
| `LLM_TEMPERATURE` | float | `0.7` | Generation temperature (0.0 ~ 2.0) |
| `LLM_MAX_TOKENS` | int | `4096` | Max output tokens (100 ~ 32000) |
| `LLM_TIMEOUT` | int | `180` | Request timeout (seconds) |
| `LLM_MAX_RETRIES` | int | `3` | Failure retry count |
| `LLM_FALLBACK_PROVIDER` | str | None | Fallback provider |
| `LLM_FALLBACK_MODEL` | str | None | Fallback model |

**API Key Resolution Priority**:

```
LLM_API_KEY > DASHSCOPE_API_KEY > OPENAI_API_KEY > DEEPSEEK_API_KEY
```

**Provider Specific Configuration Examples**:

```dotenv
# ── Qwen (Tongyi Qianwen) ──
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

# ── Ollama (Local, no API Key needed) ──
LLM_PROVIDER=ollama
LLM_MODEL_NAME=codellama
LLM_API_BASE=http://localhost:11434/v1

# ── Anthropic ──
LLM_API_KEY=sk-ant-xxx
LLM_PROVIDER=anthropic
LLM_MODEL_NAME=claude-3
```

#### 3.2.3 RAG Knowledge Base (`RAG_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `RAG_VECTOR_STORE` | str | `faiss` | Vector storage engine: `faiss` / `chroma` |
| `RAG_INDEX_PATH` | str | `data/rag_index` | Index file path |
| `RAG_EMBEDDING_MODEL` | str | `sentence-transformers/all-MiniLM-L6-v2` | Embedding model |
| `RAG_EMBEDDING_DIMENSION` | int | `384` | Embedding vector dimension |
| `RAG_DEFAULT_TOP_K` | int | `5` | Default retrieval count |
| `RAG_SIMILARITY_THRESHOLD` | float | `0.5` | Similarity threshold (0.0 ~ 1.0) |
| `RAG_KNOWLEDGE_BASE_PATH` | str | `data/knowledge_base` | Knowledge base document directory |

#### 3.2.4 Skill System (`SKILL_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `SKILL_EXTRA_SKILL_DIRS` | list | `[]` | Extra Skill directories (JSON array format) |
| `SKILL_USER_CONFIG_PATH` | str | `~/.emcoder/config.json` | User Skill configuration override file |
| `SKILL_ENABLE_SEMANTIC_MATCH` | bool | `false` | Enable semantic matching (requires sentence-transformers) |

#### 3.2.5 Project Management (`PROJECT_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `PROJECT_WORKSPACE_PATH` | str | `workspace` | Project workspace root directory |
| `PROJECT_TEMPLATE_PATH` | str | `data/templates` | Project template directory |
| `PROJECT_DEFAULT_PLATFORM` | str | `stm32` | Default target platform |
| `PROJECT_AUTO_BUILD` | bool | `false` | Auto build after code generation |

#### 3.2.6 Agent Engine (`AGENT_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `AGENT_MAX_ROUNDS` | int | `20` | Max single chat loop rounds (1 ~ 100) |
| `AGENT_MAX_CONSECUTIVE_ERRORS` | int | `3` | Max consecutive errors before aborting (1 ~ 20) |
| `AGENT_LOOP_TIMEOUT` | int | `300` | Total timeout seconds (30 ~ 3600) |
| `AGENT_MAX_CONCURRENT` | int | `5` | Max concurrent Agents (1 ~ 50) |

#### 3.2.7 Security Configuration (`SECURITY_` prefix)

| Environment Variable | Type | Default Value | Description |
|---|---|---|---|
| `SECURITY_ENABLE_FUSE_PROTECTION` | bool | `true` | Protect chip fuse area |
| `SECURITY_ENABLE_FLASH_LIMIT` | bool | `true` | Limit flashing frequency |
| `SECURITY_REQUIRE_CONFIRMATION` | bool | `true` | Require user confirmation for high-risk operations |
| `SECURITY_ENABLE_CODE_REVIEW` | bool | `true` | Enable code security review |
| `SECURITY_PROTECTED_REGIONS` | list | `["MX_", "SystemClock_Config", "Error_Handler"]` | Protected code region prefixes |
| `SECURITY_ALLOWED_ORIGINS` | list | `["http://localhost:*", "http://127.0.0.1:*", "vscode-webview://*"]` | CORS whitelist |

#### 3.2.8 MCU Toolchain (`MCU_` prefix) — Deprecated

> **Note**: This configuration group is deprecated, platform toolchain paths have migrated to the Skill system. New code should use `skill_manager.get_skill(platform).handler.detect_cli()` to get tool information. Existing consumers can still use it until migration is complete.

| Environment Variable | Default Value | Description |
|---|---|---|
| `MCU_STM32CUBEMX_PATH` | None | STM32CubeMX path |
| `MCU_STM32_PROGRAMMER_PATH` | None | STM32CubeProgrammer CLI path |
| `MCU_ARM_GCC_PATH` | None | ARM GCC bin directory |
| `MCU_ESP_IDF_PATH` | None | ESP-IDF installation path |
| `MCU_ESPTOOL_PATH` | `esptool.py` | esptool path |
| `MCU_OPENOCD_PATH` | None | OpenOCD path |

### 3.3 Full `.env` Example

```dotenv
# ─── Service Core ───
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

# ─── Project ───
PROJECT_DEFAULT_PLATFORM=stm32
PROJECT_AUTO_BUILD=false

# ─── Agent ───
AGENT_MAX_ROUNDS=20
AGENT_LOOP_TIMEOUT=300

# ─── Security ───
SECURITY_REQUIRE_CONFIRMATION=true
SECURITY_ENABLE_FUSE_PROTECTION=true
```

---

## 4. Starting Backend Service

### 4.1 Method 1: Python Direct Start

```powershell
cd backend
python run.py
```

Defaults to `http://127.0.0.1:8000`. Terminal prints Banner:

```
===========================================================
     EMCODER - Embedded MCU Intelligent Development Sidecar v2.0.0
===========================================================
 -> Starting Emcoder Sidecar Engine...
```

#### All Startup Parameters

| Parameter | Type/Values | Default | Description |
|---|---|---|---|
| `--mode` | `http` / `stdio` / `pipe` | `http` | Startup mode |
| `--host` | str | `127.0.0.1` | Listen address |
| `--port` | int | `8000` | Listen port (`0` = auto assign) |
| `--reload` | flag | `false` | Hot reload (http dev mode only) |
| `--workers` | int | `1` | Worker processes (http only) |
| `--log-level` | `debug`/`info`/`warning`/`error` | `info` | Log level |
| `--env` | str | None | Specify `.env` file path |
| `--workspace` | str | None | Set VSCode workspace path |

#### Common Start Examples

```powershell
# Specify port
python run.py --port 9000

# Auto assign free port
python run.py --port 0

# Dev hot reload mode
python run.py --reload

# Specify log level
python run.py --log-level debug

# Specify .env file
python run.py --env /path/to/.env

# Specify workspace
python run.py --workspace /path/to/project

# Sidecar mode (for VSCode extension)
python run.py --mode stdio
```

#### Startup Mode Description

| Mode | Command | Behavior |
|---|---|---|
| **http** | `python run.py` | Standard dev mode, starts HTTP service, prints Banner, Swagger UI accessible via browser |
| **stdio** | `python run.py --mode stdio` | Pipe mode: logs to stderr, stdout reserved for IPC; fixed workers=1; used by VSCode Sidecar |
| **pipe** | `python run.py --mode pipe` | Named pipe mode: similar to stdio; fixed workers=1 |

### 4.2 Method 2: PowerShell Script Start

```powershell
cd backend
.\start_server.ps1
# Or specify mode and port
.\start_server.ps1 http 9000
```

The script automatically:
1. Checks `DASHSCOPE_API_KEY` env var, loads from `.env` if missing
2. Sets `EMCODER_SIDECAR_MODE` and `EMCODER_PORT` env vars
3. Finds Python by priority: `D:\Python312` → `D:\Python311` → `python` → `python3` → `py`
4. Checks if fastapi/uvicorn are installed, auto `pip install -r requirements.txt` if missing
5. Starts service

### 4.3 Verify Service Status

```powershell
# Browser access API docs
start http://127.0.0.1:8000/docs       # Swagger UI
start http://127.0.0.1:8000/redoc      # ReDoc

# Health check
curl http://127.0.0.1:8000/health

# System status
curl http://127.0.0.1:8000/api/v1/system/status
```

### 4.4 Handshake Magic Number (Sidecar Mode)

In stdio/pipe mode, backend prints a handshake JSON line to stdout upon readiness:

```
EMCODER_READY:{"status":"ready","port":8000,"pid":1234,"mode":"stdio","version":"2.0.0","protocol":"jsonrpc-2.0"}
```

VSCode extension confirms backend start by detecting `EMCODER_READY:` prefix.

### 4.5 Lifecycle Management

Backend uses `LifecycleManager` to manage process lifecycle:

| State | Meaning |
|---|---|
| `created` | Initialization complete |
| `starting` | Starting services |
| `ready` | All ready, accepting requests |
| `stopping` | Shutting down |
| `stopped` | Stopped |

Startup sequence: LifecycleManager.startup() → RAG Init → LLM Init → CLI Init → Project Init → mark_ready()

Shutdown: Execute all registered shutdown hooks (including RAG index saving) → Terminate child processes.

---

## 5. CLI Command Line Tool

### 5.1 Basic Usage

```powershell
cd backend
python -m cli [OPTIONS] COMMAND [ARGS]
```

> Defaults to launching TUI if no subcommand.

### 5.2 Global Options

| Option | Short | Default | Description |
|---|---|---|---|
| `--backend` | `-b` | `http://127.0.0.1:8000` | Backend service address |
| `--verbose` | `-v` | false | Verbose output |
| `--help` | | | Show help message |

### 5.3 Command Tree Overview

```
emcoder
├── chat             AI Interactive Chat
├── tui              TUI Terminal Interface (Default)
├── serial           Serial Operations
│   ├── list           List available ports
│   ├── monitor        Monitor serial data
│   └── send           Send data
├── flash            Flashing Operations
│   ├── write          Write firmware
│   └── erase          Erase Flash
├── debug            Debug (OpenOCD)
│   └── start          Start debug server
├── simulate         Simulation (QEMU)
│   └── start          Start simulation
└── status           System Status
```

### 5.4 chat — AI Chat

```powershell
# Interactive mode (REPL)
python -m cli chat

# Single message mode
python -m cli chat -m "Help me write STM32F407 UART initialization code"
```

| Parameter | Description |
|---|---|
| `--message` / `-m` | Optional. Execute directly with message, no interactive mode |

**Interactive Mode Operations**:
- Enter text then Enter → Chat with AI
- Enter `/quit` or `/exit` → Exit

**SSE Event Stream Handling**: CLI automatically handles these event types:

| Event Type | Display Behavior |
|---|---|
| `token` | Real-time stream output of AI response |
| `thinking` | Show thinking process |
| `tool_call` / `tool_call_start` | Show tool call info |
| `tool_call_end` | Show tool execution result |
| `confirm_required` | Interactive confirmation prompt |
| `error` | Show error message |
| `done` | End current turn |

### 5.5 tui — Terminal GUI

```powershell
python -m cli tui
# Or run directly (defaults to TUI without subcommand)
python -m cli
```

See [Section 6 TUI Terminal Interface](#6-tui-terminal-interface).

### 5.6 serial — Serial Operations

#### List Available Ports

```powershell
python -m cli serial list
```

Output Example:
```
  COM4: USB Serial Device [USB\VID_0483&PID_5740]
  COM3: Bluetooth Serial (COM3) [BTHENUM\...]
```

#### Monitor Serial

```powershell
python -m cli serial monitor COM4
python -m cli serial monitor COM4 --baud 9600
python -m cli serial monitor COM4 --baud 115200 --encoding utf-8
```

| Parameter | Default | Description |
|---|---|---|
| `PORT` (Positional) | Required | Serial port name (e.g. `COM4`, `/dev/ttyUSB0`) |
| `--baud` / `-b` | `115200` | Baud rate |
| `--encoding` / `-e` | `utf-8` | Character encoding |

Press `Ctrl+C` to stop monitoring.

#### Send Data

```powershell
python -m cli serial send COM4 "AT\r\n"
python -m cli serial send COM4 "Hello" --baud 9600
```

| Parameter | Default | Description |
|---|---|---|
| `PORT` (Positional) | Required | Serial port name |
| `DATA` (Positional) | Required | Content to send |
| `--baud` / `-b` | `115200` | Baud rate |

### 5.7 flash — Firmware Flashing

#### Write Firmware

```powershell
# STM32 Flashing
python -m cli flash write firmware.bin
python -m cli flash write firmware.hex --platform stm32 --address 0x08000000

# ESP32 Flashing
python -m cli flash write firmware.bin --platform esp32 --port COM4 --address 0x10000
```

| Parameter | Default | Description |
|---|---|---|
| `FIRMWARE` (Positional) | Required | Firmware file path |
| `--platform` / `-p` | `stm32` | Target platform: `stm32` / `esp32` |
| `--port` | None | Serial port (Required for ESP32) |
| `--address` / `-a` | Auto | Flashing address (STM32: `0x08000000`, ESP32: `0x10000`) |

#### Erase Flash

```powershell
python -m cli flash erase
python -m cli flash erase --platform esp32 --port COM4
```

### 5.8 debug — OpenOCD Debugging

```powershell
python -m cli debug start
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg
```

| Parameter | Default | Description |
|---|---|---|
| `--interface` / `-i` | `interface/stlink.cfg` | OpenOCD interface config file |
| `--target` / `-t` | `target/stm32f4x.cfg` | OpenOCD target config file |

OpenOCD runs continuously after start, press `Ctrl+C` to stop.

### 5.9 simulate — QEMU Simulation

```powershell
python -m cli simulate start firmware.elf
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
```

| Parameter | Default | Description |
|---|---|---|
| `FIRMWARE` (Positional) | Required | ELF firmware file |
| `--machine` / `-m` | `stm32f4-discovery` | QEMU machine type |
| `--gdb-port` | `3333` | GDB debug port |

### 5.10 status — System Status

```powershell
python -m cli status
```

Output Example:
```
Backend: Connected (http://127.0.0.1:8000)
Serial Ports: 2 found
  COM4: USB Serial Device
  COM3: Bluetooth Serial
```

---

## 6. TUI Terminal Interface

### 6.1 Launch

```powershell
cd backend
python -m cli tui

# Specify backend address
python -m cli -b http://127.0.0.1:9000 tui
```

### 6.2 Interface Layout

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
| QEMU:  --|  Help me init UART               |
|          |                                   |
| Session: | [Emcoder] 19:20:18               |
|   --     |  Here is STM32F407 UART init...   |
|          |                                   |
+----------+----------------------------------+
|  > Type a message...            [Send]       |
+---------------------------------------------+
|  Ctrl+Q Quit | Ctrl+L Clear | F1 Help        |
+---------------------------------------------+
```

**Components Description**:

| Component | Class Name | Description |
|---|---|---|
| Message Bubble | `ChatMessageWidget` | Single message, style by role |
| Message List | `ChatView` | Scrolling message container, auto-scroll to bottom |
| Input Box | `ChatInput` | Text input + Send button |
| Tool Bar | `ToolStatusBar` | Top tool status bar |
| Risk Dialog | `RiskConfirmDialog` | High-risk operation confirmation popup |

### 6.3 Shortcuts

| Shortcut | Function |
|---|---|
| `Ctrl+Q` | Quit application |
| `Ctrl+L` | Clear chat history |
| `Ctrl+S` | Toggle sidebar visibility |
| `Ctrl+D` | Toggle logs panel |
| `F1` | Show help info |
| `Enter` | Send message |

### 6.4 Chat Slash Commands

Enter commands starting with `/` in the input box:

| Command | Description |
|---|---|
| `/help` | Show available commands |
| `/clear` | Clear chat history |
| `/status` | Show backend connection status and session info |
| `/connect` | Reconnect to backend |
| `/quit` | Quit |

### 6.5 Message Roles and Styles

| Role Label | Icon | Description | Visual Feature |
|---|---|---|---|
| `[You]` | `>` | User message | Blue left border, right indent |
| `[Emcoder]` | `<` | AI response | Gray-blue left border, left indent |
| `[System]` | `[*]` | System message | Gray left border |
| `[Tool]` | `/-` | Tool call | Orange left border |

### 6.6 Sidebar Status Indicators

Sidebar displays real-time connection status of hardware tools:

| Status Item | ID | Description |
|---|---|---|
| Serial | `status-serial` | Serial connection status |
| Flash | `status-flash` | Flashing status |
| Debug | `status-debug` | Debugging status |
| QEMU | `status-qemu` | Simulation status |
| Session | `session-info` | Current session ID |

Tool Status Colors:

| Status | Color |
|---|---|
| connected | Green |
| disconnected | Red |
| running | Green |
| stopped | Gray |
| error | Red |
| flashing | Yellow |
| debugging | Cyan |
| simulating | Magenta |

### 6.7 Risk Confirmation Dialog

When AI Agent performs high-risk operations (e.g., flashing firmware, executing terminal commands), TUI pops up a confirmation dialog. Must click **Confirm** or **Cancel** to proceed.

### 6.8 TUI Client Connection

TUI uses `AgentClient` to communicate with backend Agent via SSE (Server-Sent Events):

| Configuration | Default Value |
|---|---|
| Backend Address | `http://127.0.0.1:8000` |
| Normal Request Timeout | 30 seconds |
| SSE Stream Timeout | 600 seconds |
| API Endpoint | `POST /api/v1/agent/chat/stream` |

Connection State: `disconnected` → `connecting` → `connected` / `error`

### 6.9 TUI Theme Palette

| Name | Hex Value | Purpose |
|---|---|---|
| bg_primary | `#181b20` | Main background |
| bg_secondary | `#1e2228` | Secondary background |
| bg_panel | `#252a31` | Panel |
| accent | `#5b8def` | Main accent (desaturated blue) |
| accent_dim | `#3d5a80` | Dim accent |
| text_primary | `#d4d4d4` | Primary text |
| text_secondary | `#8b8b8b` | Secondary text |
| success | `#4caf7c` | Soft green |
| warning | `#d4a054` | Soft orange |
| error | `#cf6679` | Soft red |
| border | `#2e333a` | Border |

> Design Style: Minimalist Business Tech, strictly NO emoji, pure ASCII icons.

---

## 7. REST API Full Reference

All API endpoints prefixed with `/api/v1`. Interactive docs: `http://127.0.0.1:8000/docs` (Swagger) or `/redoc` (ReDoc).

### 7.1 System and Health

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Global health check (Top level) |
| GET | `/` | Root path info |
| GET | `/api/v1/health` | Comprehensive system health |
| GET | `/api/v1/health/{component}` | Single component health check |
| GET | `/api/v1/system/status` | System engine status |
| GET | `/api/v1/system/bus/status` | WebSocket event bus status |
| GET | `/api/v1/system/update/check` | Check for updates (Param: `client_version`) |
| GET | `/api/v1/metrics` | System metrics (CPU / Memory / Disk) |
| GET | `/api/v1/metrics/prometheus` | Prometheus format metrics |

### 7.2 Agent — AI Chat

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/agent/chat` | Non-streaming chat |
| POST | `/api/v1/agent/chat/stream` | SSE Streaming chat |
| POST | `/api/v1/agent/chat/stream/v2` | SSE Streaming chat (v2) |
| POST | `/api/v1/agent/confirm` | Confirm / Reject sensitive operation |
| GET | `/api/v1/agent/confirm/pending` | List pending confirmations |
| GET | `/api/v1/agent/tools` | List available tools |
| POST | `/api/v1/agent/workspace` | Set workspace path |
| GET | `/api/v1/agent/cache/stats` | Knowledge cache stats |
| POST | `/api/v1/agent/cache/clear` | Clear knowledge cache |
| POST | `/api/v1/agent/fix_terminal_error` | Smart compilation error fix |
| WS | `/api/v1/agent/code_completion` | Code completion WebSocket |

#### Chat Request Body

```json
{
  "message": "Help me write STM32 UART init",
  "session_id": "sess_xxxx",       // Optional, auto-generated if empty
  "workspace_path": "/path/to/dir", // Optional
  "platform": "stm32",             // Optional, read config default if empty
  "context": "Extra context info"   // Optional
}
```

#### SSE Event Stream Format

```
data: {"type": "session", "session_id": "sess_xxx"}

data: {"type": "thinking", "content": "Round 1 Reasoning — Analyzing user intent..."}

data: {"type": "tool_call", "tool": "search_knowledge", "args": {"query": "UART init"}}

data: {"type": "tool_call_end", "tool": "search_knowledge", "result": "..."}

data: {"type": "token", "content": "Here is"}

data: {"type": "text_done", "content": "Full response content..."}

data: {"type": "edit", "proposal": {"proposal_id": "xxx", "edits": [...]}}

data: {"type": "confirmation_required", "message": "About to execute flash_firmware..."}

data: {"type": "done"}
```

### 7.3 Edit Protocol

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/agent/edit/pending` | Query pending edits |
| GET | `/api/v1/agent/edit/{proposal_id}` | Get edit details |
| POST | `/api/v1/agent/edit/apply` | Accept edit proposal |
| POST | `/api/v1/agent/edit/reject` | Reject edit proposal |

### 7.4 Session Management

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/agent/sessions` | List Agent sessions |
| GET | `/api/v1/agent/sessions/{id}` | Get session history |
| DELETE | `/api/v1/agent/sessions/{id}` | Delete session |
| GET | `/api/v1/session/` | List all sessions |
| POST | `/api/v1/session/` | Create new session |
| GET | `/api/v1/session/{id}` | Get session details |
| DELETE | `/api/v1/session/{id}` | Delete session |
| POST | `/api/v1/session/{id}/restore` | Restore deleted session |

### 7.5 Chat (Simple Mode)

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/chat/send` | Send message (Non-Agent mode) |
| GET | `/api/v1/chat/health` | Chat service health |
| WS | `/api/v1/chat/ws` | Chat WebSocket |

### 7.6 Code Generation and Analysis

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/code/generate` | AI Code Generation |
| POST | `/api/v1/code/fuse` | Code Fusion (Protect CubeMX areas) |
| POST | `/api/v1/code/analyze` | Code Structure Analysis |
| POST | `/api/v1/code/patch` | Generate / Apply Patches |
| POST | `/api/v1/code/validate` | Code Quality Validation |
| POST | `/api/v1/code/format` | Code Formatting |
| POST | `/api/v1/completion` | GhostText Inline Completion |

### 7.7 AI Intelligent Analysis

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/fusion` | Code Fusion |
| POST | `/api/v1/constraint-check` | Hardware Constraint Check |
| POST | `/api/v1/static-analyze` | C Code Static Analysis |
| POST | `/api/v1/log-analyze` | Embedded Log Analysis |
| POST | `/api/v1/fsm-analyze` | State Machine Analysis |
| POST | `/api/v1/smart-correct` | Smart Correction |
| POST | `/api/v1/explain` | Code Explanation |
| POST | `/api/v1/agent/analyze` | AI Comprehensive Analysis |

### 7.8 Project Management

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/project/create` | Create Project |
| GET | `/api/v1/project/list` | Project List |
| GET | `/api/v1/project/{path}/info` | Project Info |
| POST | `/api/v1/project/{path}/build` | Build Project |
| POST | `/api/v1/project/{path}/config` | Update Project Config |
| DELETE | `/api/v1/project/{path}` | Delete Project |
| GET | `/api/v1/project/{path}/files` | Project File List |
| GET | `/api/v1/project/{path}/file` | Read File Content |
| POST | `/api/v1/project/{path}/file` | Write File |
| DELETE | `/api/v1/project/{path}/file` | Delete File |
| POST | `/api/v1/project/{path}/folder` | Create Folder |
| POST | `/api/v1/project/build` | Unified Build Endpoint |
| GET | `/api/v1/project/info` | Project Info (GET) |
| POST | `/api/v1/project/info` | Project Info (POST) |
| POST | `/api/v1/project/parse` | Parse Project Structure |

### 7.9 RAG Knowledge Base

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/rag/search` | Semantic Search |
| POST | `/api/v1/rag/add` | Add Single Document |
| POST | `/api/v1/rag/add-batch` | Batch Add |
| POST | `/api/v1/rag/upload` | Upload Document File |
| GET | `/api/v1/rag/stats` | Index Stats |
| POST | `/api/v1/rag/save` | Save Index to Disk |
| POST | `/api/v1/rag/load` | Load Index from Disk |
| DELETE | `/api/v1/rag/clear` | Clear Index |

#### Search Request Body

```json
{
  "query": "STM32 UART DMA Send",
  "platform": "stm32",    // Optional, filter by platform
  "top_k": 5              // Return count
}
```

### 7.10 Hardware

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/hardware/status` | Overall Hardware Status |
| GET | `/api/v1/hardware/toolchains` | Toolchain Installation Status |
| GET | `/api/v1/hardware/detect` | Detect Connected Hardware Devices |
| POST | `/api/v1/hardware/reset/{port}` | Reset Specified Port Device |
| GET | `/api/v1/hardware/info/{port}` | Device Detail Info |
| GET | `/api/v1/hardware/chips` | Supported Chips List |
| GET | `/api/v1/hardware/chip-info` | Chip Details (Param: `chip`) |
| GET | `/api/v1/hardware/pin-info` | Pin Mux Info (Param: `chip`, `pin`) |
| GET | `/api/v1/hardware/register-info` | Peripheral Register Info |
| GET | `/api/v1/hardware/peripheral-map` | Peripheral Address Map |
| GET | `/api/v1/hardware/clock-tree` | Clock Tree Config |
| GET | `/api/v1/hardware/pinout/{chip_model}` | Full Pin Mux Data |
| POST | `/api/v1/hardware/validate_pinout` | Pin Conflict Detection |

### 7.11 Serial

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/serial/ports` | List All Ports |
| POST | `/api/v1/serial/connect` | Connect Port |
| POST | `/api/v1/serial/disconnect/{session_id}` | Disconnect Session |
| POST | `/api/v1/serial/disconnect` | Disconnect Current |
| POST | `/api/v1/serial/send/{session_id}` | Send Data |
| POST | `/api/v1/serial/send` | Send Data (Default Session) |
| GET | `/api/v1/serial/read/{session_id}` | Read Data |
| WS | `/api/v1/serial/tunnel/{session_id}` | WebSocket Bidirectional Passthrough |
| GET | `/api/v1/serial/ws/sessions` | WS Session List |

#### Connection Request Body

```json
{
  "port": "COM4",
  "baudrate": 115200,
  "databits": 8,
  "stopbits": 1,
  "parity": "none"
}
```

### 7.12 Flashing

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/flash/` | Flash Firmware |
| POST | `/api/v1/flash/execute` | Execute Flashing (Extended Interface) |
| GET | `/api/v1/flash/progress/{task_id}` | Flashing Progress Check |
| POST | `/api/v1/flash/verify` | Verify Firmware |
| POST | `/api/v1/flash/erase` | Erase Flash |
| GET | `/api/v1/flash/detect-firmware` | Detect Firmware File (GET) |
| POST | `/api/v1/flash/detect-firmware` | Detect Firmware File (POST) |
| POST | `/api/v1/flash/safety-check` | Safety Check |
| POST | `/api/v1/flash/reset` | Reset MCU |

### 7.13 Debugging

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/debug/config` | Generate Debug Config |
| GET | `/api/v1/debug/supported_chips` | Supported Debug Chips |
| GET | `/api/v1/debug/probe` | Detect Debug Probe |
| GET | `/api/v1/debug/adapters` | Debug Adapter List |
| GET | `/api/v1/debug/probes` | Scan All Probes |
| POST | `/api/v1/debug/start` | Start Debug Session |
| POST | `/api/v1/debug/stop` | Stop Debug Session |
| POST | `/api/v1/debug/memory/read` | Read Memory |
| POST | `/api/v1/debug/memory/write` | Write Memory |
| POST | `/api/v1/debug/registers` | Read Registers |
| POST | `/api/v1/debug/peripheral/{name}` | Read Peripheral Registers |
| POST | `/api/v1/debug/evaluate` | Evaluate GDB Expression |
| POST | `/api/v1/debug/gdb` | Raw GDB Command |

### 7.14 Build

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/build/run` | Execute Build |
| GET | `/api/v1/build/status` | Build Status |
| GET | `/api/v1/build/memory-usage` | Firmware Memory Usage (GET) |
| POST | `/api/v1/build/memory-usage` | Firmware Memory Usage (POST) |

### 7.15 Terminal

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/terminal/execute` | Execute Safe Terminal Command |
| GET | `/api/v1/terminal/health` | Terminal Service Status |

> Whitelisted Commands: `make`, `cmake`, `ninja`, `idf.py`, `arm-none-eabi-*`, `gcc`, `python`, `git`, `echo`, `mkdir`, `cp`, `mv`, `ls`, `cat`, `head`, `tail`, `wc`, `sort`, `diff`, `pwd`, `cd`, `openocd`, `esptool`, `st-flash`, `JLinkExe`, 55+ commands total.

### 7.16 Logging

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/logs/` | Get Logs (support by session / level / pagination) |
| GET | `/api/v1/logs/serial/{session_id}` | Serial Session Logs |
| GET | `/api/v1/logs/build/{project_id}` | Build Logs |
| DELETE | `/api/v1/logs/` | Clear All Logs |

### 7.17 Telemetry

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/telemetry/event` | General Event Report |
| POST | `/api/v1/telemetry/build` | Build Result Report |
| POST | `/api/v1/telemetry/crash` | Crash Report |
| GET | `/api/v1/telemetry/dashboard` | Dashboard Data |
| GET | `/api/v1/telemetry/builds/stats` | Build Stats |
| GET | `/api/v1/telemetry/features/usage` | Feature Usage Ranking |
| GET | `/api/v1/telemetry/crashes/recent` | Recent Crashes List |

### 7.18 Config Hot Update

| Method | Path | Description |
|---|---|---|
| GET | `/api/v1/config` | Get Runtime Config |
| PATCH | `/api/v1/config` | Update Config at Runtime |
| GET | `/api/v1/cache/stats` | Cache Stats |
| POST | `/api/v1/cache/clear` | Clear Cache |

### 7.19 Workflow

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/workflow/execute` | Execute Workflow |
| GET | `/api/v1/workflow/status/{id}` | Workflow Status |
| GET | `/api/v1/workflow/templates` | Workflow Template List |

### 7.20 Context Sync

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/context/update` | Push IDE File Changes |
| POST | `/api/v1/context/query` | Context Semantic Search |

### 7.21 Extension Management

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/extensions/query` | Query Available Extensions |
| GET | `/api/v1/extensions/allowed` | Whitelisted Extensions |

Preset Whitelist: `ms-vscode.cpptools`, `ms-python.python`, `marus25.cortex-debug`, `ms-vscode.cmake-tools`.

### 7.22 Compatible Routes (`/api/` without v1)

For compatibility with frontend URL patterns, endpoints in following modules are also accessible under `/api/` (without `/v1`):

- hardware / hardware_extended / pinout
- serial / serial_ws
- flash / flash_extended
- debug_config / debug_extended / debug_session
- build_status
- completion_context

E.g.: `/api/hardware/status`, `/api/serial/ports`, `/api/flash/execute`, etc.

---

## 8. WebSocket Endpoints

| Path | Protocol | Description |
|---|---|---|
| `/ws/{client_id}` | JSON-RPC | Main Channel: chat / ping / channel subscription |
| `/ws/inline-ai` | JSON | Inline AI Completion (GhostText / Ctrl+K) |
| `/ws/context` | JSON | IDE Context Sync (File Change → Incremental RAG) |
| `/ws/serial` | JSON + Binary | Serial WebSocket (Compatible Entry) |
| `/ws/serial/{connection_id}` | Binary | Serial Bidirectional Binary Passthrough |
| `/ws/debug/{session_id}` | JSON | Debug Event Stream |
| `/ws/dashboard` | JSON | Dashboard Telemetry Push (Every 2s) |

### 8.1 Main WebSocket (`/ws/{client_id}`)

#### Message Format

```json
// Client → Server
{"type": "ping"}
{"type": "chat", "messages": [{"role": "user", "content": "..."}]}

// Server → Client
{"type": "pong"}
{"type": "chat_chunk", "content": "..."}
{"type": "chat_done", "content": "Full Response"}
{"type": "error", "message": "Error Message"}
```

#### Channel Subscription

```json
// Subscribe
{"method": "channel/subscribe", "params": {"channel": "agent/stream"}}

// Unsubscribe
{"method": "channel/unsubscribe", "params": {"channel": "agent/stream"}}
```

Available Channels:

| Channel | Purpose |
|---|---|
| `dev/logs` | Real-time Backend Logs |
| `ide/context` | IDE File Change Notification |
| `agent/stream` | AI Agent Generation Stream |
| `hardware/serial` | Serial Data Passthrough |
| `hardware/plot` | Waveform / Chart Data |
| `debug/events` | Debug Events (Breakpoint, Exception, etc.) |
| `build/status` | compilation Status Change |

### 8.2 Inline AI (`/ws/inline-ai`)

```json
// Request
{"code": "void init_uart(", "cursor": 15, "intent": "complete", "file_uri": "main.c", "language": "c"}

// Response (Streaming)
{"op": "ins", "text": "UART_HandleTypeDef *huart) {\n"}
{"op": "ins", "text": "  // ..."}
{"op": "done"}
// Or error
{"op": "error", "text": "LLM timeout"}
```

### 8.3 IDE Context (`/ws/context`)

Supported Message Types:

| type | Description |
|---|---|
| `file-changes` | File Change Notification (Add / Modify / Delete) |
| `context-query` | Context Semantic Query |
| `textDocument/didChange` | LSP Style File Change (Triggers Incremental RAG) |
| `textDocument/didOpen` | File Open |
| `textDocument/didClose` | File Close |
| `workspace/didChangeWorkspaceFolders` | Workspace Change |
| `ping` | Heartbeat |

### 8.4 Debug WebSocket (`/ws/debug/{session_id}`)

```json
// Client sends GDB command
{"command": "info breakpoints"}

// Server pushes
{"type": "console", "content": "..."}
{"type": "halted", "data": {"pc": "0x08001234", "reason": "breakpoint"}}
{"type": "running"}
{"type": "swo", "data": "SWO trace data..."}
{"type": "pong"}
{"type": "error", "message": "..."}
```

### 8.5 Dashboard (`/ws/dashboard`)

```json
// Server pushes every 2 seconds
{"type": "telemetry", "data": {"timestamp": "...", "cpu_percent": 15.2, "memory_used_mb": 512, ...}}

// Client
{"type": "ping"}
{"type": "subscribe"}
```

### 8.6 Heartbeat Mechanism

- Server sends ping every **1.5 seconds**
- Client should reply `{"method": "heartbeat/pong"}`
- Connection closes and hardware resources released if no response for **3 seconds**

---

## 9. AI Agent System

### 9.1 Agent Loop Workflow

Emcoder's AI Chat is based on **Agent Loop** pattern, similar to autonomous decision cycle:

```
User Message
   │
   ▼
┌─────────┐
│  Think   │ LLM analyzes intent, decides next step
└────┬────┘
     │
     ▼
┌─────────┐
│   Act    │ Choose and call tool (or answer directly)
└────┬────┘
     │
     ▼
┌─────────┐
│ Observe  │ Get tool execution result
└────┬────┘
     │
     ▼
┌─────────┐
│ Repeat?  │ Continue? (Max 20 rounds)
└────┬────┘
     │
     ▼
Final Answer → User
```

### 9.2 Tool System Architecture

Tools are categorized by **source** into two major types, distinguished by `ToolSource` enum:

| Source | Description | Count |
|---|---|---|
| `BUILTIN` | Built-in tools — Execute locally, direct file/hardware/project operations | 19 |
| `LLM` | LLM Provider tools — Delegate to remote LLM execution (search, code execution, etc.) | 8 |

Tool definitions located in `app/services/agent/tools/` package, organized by function modules:

```
tools/
├── base.py              Type definitions (ToolDefinition, ToolParam, RiskLevel, ToolCategory, ToolSource)
├── registry.py          ToolRegistry class + tool_registry singleton
├── _helpers.py          Shared tool functions
├── __init__.py          Unified entry + register_all_tools()
├── builtin/             Built-in tools (10 modules, 19 tools)
│   ├── knowledge.py       Knowledge retrieval & code generation
│   ├── file_ops.py        File read/write/edit
│   ├── workspace.py       Workspace scan & search
│   ├── project.py         Project create/build/detect
│   ├── terminal.py        Terminal commands
│   ├── hardware.py        Flash & peripherals
│   ├── serial.py          Serial monitor & logs
│   ├── debug.py           Hardware detect & debug control
│   ├── emulation.py       QEMU simulation control
│   └── interaction.py     User confirmation
└── llm/                 LLM Provider tools (4 modules, 8 tools)
    ├── openai.py          Search / File Search / Code Exec / Image Gen
    ├── qwen.py            Knowledge retrieve / Web search
    ├── deepseek.py        Web search
    └── anthropic.py       Computer use
```

### 9.3 Built-in Tools (19)

| Tool Name | Module | Category | Risk Level | Description |
|---|---|---|---|---|
| `search_knowledge` | knowledge | KNOWLEDGE | LOW | Search embedded dev knowledge in RAG base |
| `generate_code` | knowledge | CODE | LOW | Call LLM to generate embedded C code |
| `read_file` | file_ops | FILE | LOW | Read workspace file (Sandbox + 5MB limit) |
| `write_file` | file_ops | FILE | MEDIUM | Create or overwrite file (Sandbox + 10MB limit) |
| `edit_file` | file_ops | FILE | MEDIUM | Find and replace/modify partial file content |
| `scan_workspace` | workspace | WORKSPACE | LOW | Scan workspace directory structure (Max 200 files) |
| `search_in_project` | workspace | WORKSPACE | LOW | Search text content in project files |
| `create_project` | project | PROJECT | MEDIUM | Create STM32 / ESP32 project |
| `build_project` | project | PROJECT | MEDIUM | Build project (debug / release) |
| `detect_platform` | project | PROJECT | LOW | Auto detect target platform from context |
| `run_command` | terminal | TERMINAL | **CRITICAL** | Execute terminal command (Confirm required) |
| `flash_firmware` | hardware | HARDWARE | **CRITICAL** | Flash firmware to hardware (Confirm required) |
| `get_peripheral_info` | hardware | HARDWARE | LOW | Query peripheral configuration info |
| `serial_monitor` | serial | HARDWARE | MEDIUM | Serial monitor — connect / stop / view status |
| `get_serial_log` | serial | HARDWARE | LOW | Get serial logs processed by Filter+Sampler |
| `detect_hardware` | debug | HARDWARE | LOW | Auto detect serial ports, debug probes, board types |
| `debug_control` | debug | HARDWARE | **CRITICAL** | OpenOCD debug — start/stop/halt/step/read registers/breakpoints |
| `emulation_control` | emulation | HARDWARE | MEDIUM | QEMU simulation — start/stop/get output |
| `request_confirmation` | interaction | WORKSPACE | LOW | Initiate confirmation request to user |

### 9.4 LLM Provider Tools (8)

LLM tool names are prefixed with **provider prefix** (e.g., `openai_`, `qwen_`) to avoid cross-provider naming conflicts. These tools are delegated to the corresponding provider's API via `LLMService.call_llm_tool()`.

| Tool Name | Provider | Category | Risk Level | Description |
|---|---|---|---|---|
| `openai_web_search` | OpenAI | KNOWLEDGE | LOW | Web search using OpenAI Responses API |
| `openai_file_search` | OpenAI | KNOWLEDGE | LOW | Search file content in OpenAI vector store |
| `openai_code_interpreter` | OpenAI | CODE | MEDIUM | Execute Python code in OpenAI isolated sandbox |
| `openai_image_generation` | OpenAI | CODE | LOW | Generate images using DALL-E |
| `qwen_knowledge_retrieve` | Qwen | KNOWLEDGE | LOW | Retrieve info from Bailian knowledge base |
| `qwen_enable_search` | Qwen | KNOWLEDGE | LOW | Enable Qwen web search |
| `deepseek_enable_search` | DeepSeek | KNOWLEDGE | LOW | Enable DeepSeek model web search |
| `anthropic_computer_use` | Anthropic | TERMINAL | **CRITICAL** | Use Claude to control mouse/keyboard for screen interaction |

#### Key Built-in Tool Parameter Details

**search_knowledge**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `query` | str | Yes | — | Search keyword |
| `platform` | str | No | Config default | Platform filter |
| `top_k` | int | No | `3` | Return count |

**generate_code**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `requirement` | str | Yes | — | Requirement description |
| `platform` | str | No | Config default | Target platform |
| `peripherals` | str | No | — | Peripheral list |
| `context` | str | No | — | Extra context |

**run_command**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `command` | str | Yes | — | Command to execute |
| `working_dir` | str | No | — | Working directory |
| `timeout` | int | No | `60` | Timeout seconds (5 ~ 300) |

**flash_firmware**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `firmware_path` | str | Yes | — | Firmware file path |
| `target` | str | No | Config default | Target platform |
| `port` | str | No | — | Serial port |
| `interface` | str | No | `swd` | Interface type: `swd` / `jtag` / `uart` |

**serial_monitor**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `action` | str | Yes | — | Action type: `start` / `stop` / `status` |
| `port` | str | No | — | Serial port (required for start) |
| `baudrate` | int | No | `115200` | Baud rate |
| `session_id` | str | No | — | Session ID (required for stop) |

**get_serial_log**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `count` | int | No | `30` | Log entry count (1 ~ 200) |
| `errors_only` | bool | No | `false` | Return only error/critical level |

**debug_control**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `action` | str | Yes | — | Action: `start` / `stop` / `halt` / `resume` / `step` / `reset` / `read_registers` / `read_memory` / `set_breakpoint` / `remove_breakpoint` / `list_sessions` / `history` |
| `session_id` | str | No | — | Debug session ID |
| `interface_cfg` | str | No | `interface/stlink.cfg` | OpenOCD interface config file |
| `target_cfg` | str | No | `target/stm32f1x.cfg` | OpenOCD target chip config |
| `address` | str | No | — | Memory/breakpoint address (0x...) |
| `size` | int | No | `256` | Memory read bytes |

**emulation_control**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `action` | str | Yes | — | Action: `start` / `stop` / `output` / `list_sessions` |
| `session_id` | str | No | — | Simulation session ID |
| `firmware` | str | No | — | Firmware ELF file path (required for start) |
| `machine` | str | No | `stm32f4-discovery` | QEMU machine type |

**search_in_project**:
| Parameter | Type | Required | Default | Description |
|---|---|---|---|---|
| `query` | str | Yes | — | Search keyword |
| `file_pattern` | str | No | `*.c,*.h` | File name pattern |
| `project_path` | str | No | — | Project path |
| `max_results` | int | No | `20` | Max results |

### 9.5 Sensitive Operation Interception

The following operations trigger user confirmation requests:

1. Tool calls with **Risk Level ≥ CRITICAL** (`run_command`, `flash_firmware`, `debug_control`, `anthropic_computer_use`)
2. **Terminal Command Keyword Matching**: `rm -rf`, `flash`, `sudo`, `mkfs`, `dd`, `format`, `reboot`, `shutdown`, `kill`, `chmod 777`, `curl | sh`, `wget | sh`, `erase`
3. **All Flashing Operations**

Confirmation window auto-rejects after **300 seconds** timeout.

### 9.6 Context Management

| Parameter | Value |
|---|---|
| Max Token Window | 12,000 tokens |
| History Retention | 8,000 tokens |
| Auto Summary | LLM assisted compression when history > 20 rounds |
| Session TTL | 4 Hours |
| Knowledge Cache | LRU + TTL, reduce repetitive RAG retrieval |

### 9.7 Error Recovery Strategy

Auto recovery when Agent tool execution fails:

1. **Retry**: Exponential backoff retry
2. **Degrade**: Reduce parameters, skip non-essential steps
3. **LLM Re-plan**: Let AI decide again
4. **Give Up**: Report error to user

### 9.8 Security Features

- **Rate Limit**: Agent call 30/min, Tool call 100/min
- **Concurrency Limit**: Max 5 concurrent Agents (`asyncio.Semaphore`)
- **Overall Timeout**: Default 300 seconds
- **Schema Validation**: Auto validation of all tool parameters
- **Sensitive Command Interception**: `SensitiveGuard` module
- **Audit Log**: Ring buffer, max 10,000 entries

### 9.9 Agent Sub-modules

| Module | File | Responsibility |
|---|---|---|
| Core Loop | `agent_loop.py` | Think → Act → Observe Loop |
| Tool System | `tools/` | Modular toolkit — types, registry, 19 built-in + 8 LLM tools |
| Sensitive Guard | `sensitive_guard.py` | Command Interception + Confirmation Generation |
| Context Manager | `context_manager.py` | Token Window + Auto Summary |
| Workspace Manager | `workspace_manager.py` | Path Injection + Sandbox |
| Knowledge Cache | `knowledge_cache.py` | LRU + TTL Cache |
| Output Parsing | `structured_output.py` | System Prompt + Output Parsing |
| Status Reporter | `status_reporter.py` | SSE Event Push |
| Error Recovery | `error_recovery.py` | Auto Retry + Degrade |

---

## 10. Skill Plugin System

### 10.1 Overview

Skill System is Emcoder's **Platform Extension Layer**, encapsulating platform-specific capabilities (e.g., STM32 project creation, ESP32 flashing) as pluggable Skill plugins.

**Architecture**: `SkillManager` (Discovery + Loading) → `SkillMatcher` (Matching) → `BaseSkillHandler` (Execution)

**Core Design Principles**:
- Zero Hardcoding: Agent tool layer gets platform info dynamically via Skill
- Lazy Loading: Only reads `meta.json` at startup, dynamically imports Handler on first use
- Extensible: Adding new platform only requires adding a directory, no framework code change

### 10.2 Directory Structure

```
app/skills/
├── __init__.py          # Exports skill_manager, skill_matcher
├── base.py              # SkillMeta, SkillResult, CLIInfo, BaseSkillHandler, Skill
├── manager.py           # SkillManager (Singleton, Lazy Load)
├── matcher.py           # SkillMatcher (Keyword + Semantic Match)
└── embedded/            # domain = "embedded"
    ├── stm32/           # platform = "stm32"
    │   ├── meta.json      # Metadata (29 Keywords, 4 CLI Tools)
    │   ├── skill.py       # SkillHandler Implementation
    │   ├── prompt.tpl     # Jinja2 System Prompt Template
    │   └── resources/     # Chip DB, Pin Mappings, etc.
    └── esp32/           # platform = "esp32"
        ├── meta.json      # Metadata (31 Keywords, 2 CLI Tools)
        ├── skill.py       # SkillHandler Implementation
        └── prompt.tpl     # Jinja2 System Prompt Template
```

### 10.3 Skill Data Model

#### SkillMeta (Metadata)

Loaded from `meta.json`:

| Field | Type | Description |
|---|---|---|
| `skill_id` | str | Unique ID (e.g. `"stm32"`) |
| `name` | str | Display Name |
| `description` | str | Description |
| `keywords` | list[str] | Matching Keywords |
| `domain` | str | Domain (e.g. `"embedded"`) |
| `skill_type` | str | Type (e.g. `"mcu"`) |
| `similarity_threshold` | float | Semantic match threshold (default 0.7) |
| `cli_tools` | list[dict] | Required external CLI tools |
| `extra_parameters` | dict | Extra parameters definition |
| `default_config` | dict | Default configuration values |

#### SkillResult (Execution Result)

| Field | Type | Description |
|---|---|---|
| `success` | bool | Success or not |
| `data` | Any | Result Data |
| `error` | Optional[str] | Error Message |

#### CLIInfo (External Tool Info)

| Field | Type | Description |
|---|---|---|
| `name` | str | Tool Name |
| `available` | bool | Available or not |
| `path` | Optional[str] | Path |
| `version` | Optional[str] | Version |
| `download_url` | str | Download URL |
| `install_guide` | str | Installation Guide |
| `required` | bool | Required or not |

### 10.4 BaseSkillHandler (Interface)

All Skills must implement `BaseSkillHandler` abstract base class:

| Method | Must Implement | Return Type | Description |
|---|---|---|---|
| `detect_cli()` | **Yes** | `List[CLIInfo]` | Detect required CLI tools for platform |
| `create_project()` | No | `SkillResult` | Create Project |
| `identify_project()` | No | `float` | Project ID confidence (0.0 ~ 1.0) |
| `get_project_context()` | No | `dict` | Get Project Context |
| `build_project()` | No | `SkillResult` | Build Project |
| `deploy()` | No | `SkillResult` | Deploy / Flash |
| `get_peripheral_info()` | No | `Optional[dict]` | Query Peripheral Info |
| `get_extra_tools()` | No | `list` | Register extra Agent tools |

**Configuration Priority** (High → Low):
1. User Config File (`~/.emcoder/config.json`)
2. Environment Variables (`SKILL_<ID>_<KEY>`)
3. `default_config` in `meta.json`

### 10.5 SkillManager

Singleton, responsible for Skill discovery and loading:

```python
from app.skills import skill_manager

# Load all Skills (Reads meta.json, does not load handler)
skill_manager.load_all_skills()

# Get specific Skill
skill = skill_manager.get_skill("stm32")

# Get all available platforms
platforms = skill_manager.get_available_platforms()  # ["stm32", "esp32"]

# Query by domain
embedded = skill_manager.get_skills_by_domain("embedded")

# Query by type
mcus = skill_manager.get_skills_by_type("mcu")
```

### 10.6 SkillMatcher

Responsible for automatically matching user input to the correct Skill:

```python
from app.skills import skill_matcher

# Keyword Match
results = skill_matcher.match("Help me config STM32F407 GPIO")
# → [MatchResult(skill=stm32_skill, score=0.85, match_type="keyword")]

# Platform Detection
platform = await skill_matcher.detect_platform("This ESP32 project...")
# → "esp32"

# Project Identification
skill_id = await skill_matcher.identify_project("/path/to/project")
# → "stm32" (Based on dir features)
```

**Match Priority**:
1. `platform_hint` — Explicitly specified platform
2. `keyword` — Keyword hit
3. `semantic` — Semantic similarity (Requires `SKILL_ENABLE_SEMANTIC_MATCH`)
4. `project_fingerprint` — Project file characteristics

### 10.7 Built-in Skill: STM32

**Skill ID**: `stm32` | **Keywords**: 29

Default Config:
| Parameter | Value | Description |
|---|---|---|
| `default_mcu` | `STM32F103C8Tx` | Default Chip |
| `default_family` | `STM32F1` | Default Family |
| `default_core` | `cortex-m3` | Default Core |
| `flash_size_kb` | `64` | Flash Size |
| `ram_size_kb` | `20` | RAM Size |
| `system_clock_hz` | `72000000` | System Clock |
| `hse_value_hz` | `8000000` | HSE Frequency |

Required CLI Tools: ARM GCC (Required), STM32CubeMX, OpenOCD, st-flash

### 10.8 Built-in Skill: ESP32

**Skill ID**: `esp32` | **Keywords**: 31

Default Config:
| Parameter | Value | Description |
|---|---|---|
| `target` | `esp32` | Target Chip |
| `flash_size` | `4MB` | Flash Size |
| `baud_rate` | `115200` | Serial Baud Rate |
| `led_gpio` | `2` | LED GPIO |
| `blink_period_ms` | `500` | Blink Period |
| `freertos_hz` | `1000` | FreeRTOS Tick Frequency |
| `build_timeout` | `180` | Build Timeout Seconds |
| `flash_timeout` | `60` | Flash Timeout Seconds |

Required CLI Tools: `idf.py` (Required), `esptool.py`

Project ID Markers: `sdkconfig` (0.90), `sdkconfig.defaults` (0.85), `main/CMakeLists.txt` + `idf_component_register` (0.90)

### 10.9 Adding Custom Skill

1. Create directory under `app/skills/`: `<domain>/<platform>/`
2. Create `meta.json` (Refer to STM32/ESP32 format)
3. Create `skill.py`, export `SkillHandler(BaseSkillHandler)` class
4. Optional: Create `prompt.tpl` Jinja2 template
5. Restart backend, `SkillManager` auto-discovers

Or configure extra search path via `SKILL_EXTRA_SKILL_DIRS`.

---

## 11. RAG Knowledge Base

### 11.1 Built-in Knowledge Base

Located in `data/knowledge_base/`:

```
knowledge_base/
├── common/              General Embedded Dev Knowledge
│   └── best_practices.md
├── stm32/               STM32 Platform Specific
│   ├── gpio_guide.md
│   ├── timer_pwm_guide.md
│   └── uart_guide.md
└── esp32/               ESP32 Platform Specific (TBD)
```

### 11.2 Adding Custom Knowledge

#### Method 1: Place Files

Put `.md` / `.txt` / `.json` files into `data/knowledge_base/` subdirectories. Auto-loads after backend restart.

#### Method 2: API Upload

```powershell
# Single document
curl -X POST http://127.0.0.1:8000/api/v1/rag/add `
  -H "Content-Type: application/json" `
  -d '{"content": "STM32 DMA Guide...", "source": "custom", "platform": "stm32"}'

# Upload file
curl -X POST http://127.0.0.1:8000/api/v1/rag/upload `
  -F "file=@my_guide.md"

# Batch add
curl -X POST http://127.0.0.1:8000/api/v1/rag/add-batch `
  -H "Content-Type: application/json" `
  -d '{"documents": [...]}'
```

### 11.3 Search Knowledge

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/rag/search `
  -H "Content-Type: application/json" `
  -d '{"query": "STM32 I2C Multi-slave Comm", "platform": "stm32", "top_k": 5}'
```

### 11.4 Index Management

```powershell
# View Stats
curl http://127.0.0.1:8000/api/v1/rag/stats

# Save Index to Disk
curl -X POST http://127.0.0.1:8000/api/v1/rag/save

# Load Index from Disk
curl -X POST http://127.0.0.1:8000/api/v1/rag/load

# Clear Index (Danger)
curl -X DELETE http://127.0.0.1:8000/api/v1/rag/clear
```

### 11.5 Incremental RAG

Backend receives IDE file change events (`textDocument/didChange`) via WebSocket `/ws/context`. After **500ms debounce**:
1. Slice changed C code files by **Function/Struct/Macro level**
2. Incrementally update FAISS vector index
3. Subsequent Agent calls to `search_knowledge` can hit latest code

### 11.6 Document Source Types

| Source | Description |
|---|---|
| `datasheet` | Chip Datasheet |
| `reference_manual` | Reference Manual |
| `application_note` | Application Note |
| `example_code` | Example Code |
| `best_practice` | Best Practice |
| `faq` | Frequently Asked Questions |

---

## 12. Code Engine

### 12.1 Code Fusion Engine (Fusion)

Protects CubeMX generated code areas, safely merges AI generated code.

**Identified and Protected Regions**:
- Code between `/* USER CODE BEGIN xxx */` and `/* USER CODE END xxx */`
- Initialization functions with `MX_` prefix
- Key functions like `SystemClock_Config`, `Error_Handler`

**Fusion Strategy**:

| Strategy | Description |
|---|---|
| `preserve_user` | Prefer preserving user code |
| `merge_smart` | Smart merge |
| `overwrite` | Direct overwrite |

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/code/fuse `
  -H "Content-Type: application/json" `
  -d '{"original_code": "...", "new_code": "...", "strategy": "preserve_user"}'
```

### 12.2 Static Analysis Engine

**Checks**:
- Dangerous function usage (`strcpy` → `strncpy`)
- Null pointer dereference
- Uninitialized variables
- Format string vulnerabilities
- Integer overflow risks
- Memory leak detection
- Interrupt safety check
- Hardware access spec
- MISRA C rule subset
- Cyclomatic complexity / Nesting depth measurement

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/static-analyze `
  -H "Content-Type: application/json" `
  -d '{"code": "void foo() { char *p = malloc(100); strcpy(p, input); }"}'
```

### 12.3 Constraint Check Engine

**Detection Content**:
- Pin mux conflict (Same pin used by multiple peripherals)
- Electrical spec violation
- Resource limits (Memory / Peripheral / DMA channels insufficient)
- Peripheral mutex detection

Supported Chip Spec DB: STM32F103C8, STM32F407, ESP32 (Full pin mux table).

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/constraint-check `
  -H "Content-Type: application/json" `
  -d '{"code": "...", "chip": "STM32F407"}'
```

### 12.4 Log Analysis Engine

**Built-in Error Pattern Library**:

| Category | Pattern |
|---|---|
| ARM Exceptions | HardFault, MemManage, BusFault, UsageFault |
| Memory Issues | Stack overflow, Heap corruption, Memory leak |
| Comm Errors | UART overrun, SPI timeout, I2C NACK |
| Timing Issues | Watchdog timeout, RTC drift |
| Resource Exhaustion | Task stack overflow, Queue full |
| ESP32 Specific | Guru Meditation, Brownout, Flash Encryption Fail |

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/log-analyze `
  -H "Content-Type: application/json" `
  -d '{"logs": "Hard Fault at PC=0x08001234\nStack: 0x20005678..."}'
```

### 12.5 State Machine Analysis Engine

Extract state machine from C code and analyze:
- Extract states from `enum` / `#define`
- Extract transitions from `switch-case` / `if-else`
- Deadlock detection
- Unreachable state detection
- State coverage analysis

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/fsm-analyze `
  -H "Content-Type: application/json" `
  -d '{"code": "typedef enum { IDLE, RUNNING, ERROR } State_t; ..."}'
```

### 12.6 AI Analysis Engine

General LLM Diagnostic Engine, supports multiple analysis types (`AnalysisType`):
- Error Diagnosis
- Performance Analysis
- Memory Analysis

### 12.7 Project Parsing Engine

Supported Project Formats:
- **STM32CubeMX**: `.ioc` + CubeMX structure
- **Keil uVision**: `.uvprojx`
- **ESP-IDF**: `CMakeLists.txt` + `sdkconfig`

Auto detects project type and parses: Chip model, source files, header paths, macros, build system.

### 12.8 Complete Engine List

| Engine | Module | Function |
|---|---|---|
| `CodeFusionEngine` | `engines/fusion/` | CubeMX Safe Code Fusion |
| `ConstraintEngine` | `engines/constraint/` | Hardware Constraint Check |
| `StaticAnalyzerEngine` | `engines/static_analyzer/` | C Code Static Analysis |
| `LogAnalyzerEngine` | `engines/log_analyzer/` | Log Root Cause Analysis |
| `HardwareFSMEngine` | `engines/hardware_fsm/` | State Machine Analysis |
| `AnalysisEngine` | `engines/ai_analyzer/` | LLM General Analysis |
| `ProjectParser` | `engines/project_parser/` | Project Structure Parsing |
| `IncrementalRAG` | `engines/incremental_rag/` | Real-time Incremental Index |

> All engines use `try/except` dynamic import, degrade gracefully if unavailable—will not block main service start.

---

## 13. Hardware Functions

### 13.1 Serial Communication

#### Via CLI

```powershell
# List ports
python -m cli serial list

# Monitor
python -m cli serial monitor COM4 --baud 115200

# Send
python -m cli serial send COM4 "AT\r\n"
```

#### Via API

```powershell
# List ports
curl http://127.0.0.1:8000/api/v1/serial/ports

# Connect
curl -X POST http://127.0.0.1:8000/api/v1/serial/connect `
  -H "Content-Type: application/json" `
  -d '{"port": "COM4", "baudrate": 115200}'

# Send Data
curl -X POST http://127.0.0.1:8000/api/v1/serial/send/SESSION_ID `
  -H "Content-Type: application/json" `
  -d '{"data": "AT\r\n"}'

# Read Data
curl http://127.0.0.1:8000/api/v1/serial/read/SESSION_ID

# Disconnect
curl -X POST http://127.0.0.1:8000/api/v1/serial/disconnect/SESSION_ID
```

#### Via WebSocket

Connect `/ws/serial/{connection_id}` or `/api/v1/serial/tunnel/{session_id}` for bidirectional serial tunnel. Supports binary passthrough, xterm.js integration.

### 13.2 Firmware Flashing

#### STM32 Flashing

Prerequisite: Install STM32CubeProgrammer and configure `MCU_STM32_PROGRAMMER_PATH` (or auto-detect via Skill).

```powershell
# CLI
python -m cli flash write firmware.bin --platform stm32

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "stm32", "address": "0x08000000"}'
```

#### ESP32 Flashing

Prerequisite: Install esptool (`pip install esptool`).

```powershell
# CLI
python -m cli flash write firmware.bin --platform esp32 --port COM4

# API
curl -X POST http://127.0.0.1:8000/api/v1/flash/execute `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "esp32", "port": "COM4"}'
```

#### Flash Safety Check

```powershell
curl -X POST http://127.0.0.1:8000/api/v1/flash/safety-check `
  -H "Content-Type: application/json" `
  -d '{"firmware_path": "firmware.bin", "platform": "stm32"}'
```

### 13.3 OpenOCD Debugging

```powershell
# CLI Start Debug Server
python -m cli debug start --interface interface/stlink.cfg --target target/stm32f4x.cfg

# API Start
curl -X POST http://127.0.0.1:8000/api/v1/debug/start `
  -H "Content-Type: application/json" `
  -d '{"interface_cfg": "interface/stlink.cfg", "target_cfg": "target/stm32f4x.cfg"}'

# Read Registers
curl -X POST http://127.0.0.1:8000/api/v1/debug/registers

# Read Memory
curl -X POST http://127.0.0.1:8000/api/v1/debug/memory/read `
  -H "Content-Type: application/json" `
  -d '{"address": "0x20000000", "length": 256}'

# Execute GDB Command
curl -X POST http://127.0.0.1:8000/api/v1/debug/gdb `
  -H "Content-Type: application/json" `
  -d '{"command": "info breakpoints"}'

# Evaluate Expression
curl -X POST http://127.0.0.1:8000/api/v1/debug/evaluate `
  -H "Content-Type: application/json" `
  -d '{"expression": "*((uint32_t*)0x20000000)"}'

# Stop
curl -X POST http://127.0.0.1:8000/api/v1/debug/stop
```

### 13.4 QEMU Simulation

```powershell
# CLI
python -m cli simulate start firmware.elf --machine stm32f4-discovery --gdb-port 3333
```

Simulation Capture:
- UART stdout
- Execution trace (exec)
- Memory R/W trace (mem_read / mem_write)
- Interrupt trace (irq)

### 13.5 Hardware Info Query

```powershell
# Detect Connected Hardware
curl http://127.0.0.1:8000/api/v1/hardware/detect

# Toolchain Status
curl http://127.0.0.1:8000/api/v1/hardware/toolchains

# Chip Pin Mux
curl http://127.0.0.1:8000/api/v1/hardware/pinout/STM32F407VGT6

# Pin Info
curl "http://127.0.0.1:8000/api/v1/hardware/pin-info?chip=STM32F407&pin=PA0"

# Chip Details
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# Clock Tree
curl http://127.0.0.1:8000/api/v1/hardware/clock-tree

# Peripheral Map
curl http://127.0.0.1:8000/api/v1/hardware/peripheral-map

# Pin Conflict Detection
curl -X POST http://127.0.0.1:8000/api/v1/hardware/validate_pinout `
  -H "Content-Type: application/json" `
  -d '{"chip": "STM32F407", "pin_assignments": {"PA0": "UART4_TX", "PA1": "UART4_RX"}}'
```

---

## 14. Data Capture and Pipeline

### 14.1 Capture Layer Architecture

All hardware interaction data collected via unified capture layer:

```
DataCapture (Abstract Base Class)
├── SerialCapture      Serial Data
├── FlashCapture       Flash Output
├── OpenOCDCapture     Debug Output
└── QEMUCapture        Simulation Output
```

### 14.2 Data Flow

```
Hardware → DataCapture.emit() → CapturedData
  → AIDataFilter (Filter Redundancy)
  → SmartSampler (Smart Sampling)
  → LLMContext (Format as AI Prompt)
  → Pipeline consumers (Analysis Engine / Frontend Push)
```

### 14.3 Data Types (26 Types)

| Type | Source |
|---|---|
| `SERIAL_OUTPUT` / `SERIAL_INPUT` | Serial |
| `GDB_OUTPUT` / `GDB_MI_OUTPUT` | GDB |
| `OPENOCD_LOG` / `OPENOCD_TELNET` | OpenOCD |
| `MEMORY_DUMP` / `REGISTER_DUMP` | Debug |
| `TRACE_LOG` / `TRACE_INSTRUCTION` / `TRACE_MEMORY` / `TRACE_IRQ` | Trace |
| `PERIPHERAL_IO` / `GPIO_STATE` / `UART_OUTPUT` | Peripheral |
| `QEMU_LOG` / `QEMU_MONITOR` | QEMU |
| `RENODE_LOG` / `RENODE_MONITOR` | Renode |
| `FLASH_PROGRESS` / `FLASH_RESULT` | Flash |
| `BUILD_LOG` / `RUNTIME_ERROR` | Build / Runtime |

Severity: `CRITICAL` > `ERROR` > `WARNING` > `INFO` > `DEBUG` > `TRACE`

### 14.4 AI Data Filter (AIDataFilter)

Four Filter Actions:

| Action | Description |
|---|---|
| `PASS` | Pass directly |
| `COMPRESS` | Compress similar data |
| `AGGREGATE` | Aggregate statistics (every 100 items or 1s) |
| `DROP` | Drop useless data |

Rule: Error/Exception **100% kept**, normal repetitive data aggregated/dropped.

### 14.5 Smart Sampler (SmartSampler)

| Config | Default |
|---|---|
| Sampling Window | 1000 ms |
| Max Samples per Window | 10 |
| Total Max Samples | 1000 |
| Error Weight | 10.0 |
| Warning Weight | 5.0 |

Strategy: error/critical **unconditionally kept**; value change high probability keep; repetition decreases probability.

### 14.6 Pipeline Manager

- **Pipeline**: Bind DataCapture + AIDataFilter + SmartSampler
- **PipelineManager**: Pipeline register/unregister, global start/stop
- Global buffer pool: `deque`, default 1000 items
- Stats: `total_in` / `filtered_out` / `sampled_out` / `delivered` / `errors`

```python
# Get recent data
manager.get_recent(count=10)

# Get error data
manager.get_errors(count=5)

# Get stats
manager.get_all_stats()
```

---

## 15. Security Mechanisms

### 15.1 Path Sandbox (PathSandbox)

Agent file operations restricted to safe scope:

**Blocked Paths**:
- Unix: `/etc`, `/bin`, `/sbin`, `/usr/bin`, `/boot`, `/dev`, `/proc`, `/sys`, `/root`, `/lib` ...
- Windows: `C:\Windows`, `C:\Program Files`, `C:\ProgramData` ...

**Blocked Files**: `.env`, `.ssh`, `id_rsa`, `authorized_keys`, `passwd`, `shadow`, `*.pem`, `*.key`, `*.crt`, `*.pfx`

**Size Limit**: Read ≤ 5 MB, Write ≤ 10 MB

### 15.2 Terminal Command Security

**Whitelist Commands** (55+): `make`, `cmake`, `ninja`, `idf.py`, `arm-none-eabi-*`, `gcc`, `python`, `git`, `ls`, `cat`, `openocd`, `esptool`, `st-flash`, `JLinkExe`, `mkdir`, `cp`, `mv`, `echo`, `pwd`, `cd`, `head`, `tail`, `wc`, `sort`, `diff` ...

**Blacklist Patterns** (16 entries): `rm -rf /`, fork bomb, `dd of=/dev/sd*`, `mkfs`, `format`, `curl|bash`, `wget|bash`, `eval`, `exec`, command sub (`$()`, backticks), `chmod 777`, `chown root`, `sudo`, `su`, chained rm ...

**Injection Detection**: Intercept `;`, `|`, `&&`, `||`, `\n`, `>`, `<`

### 15.3 Rate Limiter (RateLimiter)

| Limit | Ceiling |
|---|---|
| Agent Call | 30 / 60s |
| Tool Call | 100 / 60s |

Based on sliding window algorithm.

### 15.4 Audit Log (AuditLog)

- Ring buffer, max **10,000** entries
- Fields: `timestamp`, `session_id`, `action`, `tool_name`, `args_summary`, `result`, `risk_level`, `detail`
- Global Singleton: `audit_log`

### 15.5 Sensitive Operation Confirmation

All high-risk operations require user confirmation. Window times out in 300s.

### 15.6 CubeMX Code Protection

Auto protect regions during code fusion. Param: `SECURITY_PROTECTED_REGIONS`.

### 15.7 Fuse Protection

Enable `SECURITY_ENABLE_FUSE_PROTECTION=true` to prevent accidental chip fuse modification.

### 15.8 CORS Configuration

Default permitted origins: `http://localhost:*`, `http://127.0.0.1:*`, `vscode-webview://*`

> **Production**: Must modify `SECURITY_ALLOWED_ORIGINS`, do NOT use `*`.

### 15.9 Input Sanitization

All user input processed via `sanitize_string()`: remove null bytes, limit length (default 10,000 chars), trim whitespace.

---

## 16. Edit Protocol

### 16.1 Core Principle

**"Backend Proposes, Frontend Applies"** — Agent does not direct write to disk. All file mods generate `EditProposal`, accepted only after user approval via Frontend (VSCode Extension / TUI).

### 16.2 Edit Actions

| Action | Description |
|---|---|
| `REPLACE` | Replace content in line range |
| `INSERT` | Insert after line |
| `DELETE` | Delete line range |
| `CREATE_FILE` | Create new file |
| `DELETE_FILE` | Delete file |

### 16.3 Proposal Status

| Status | Description |
|---|---|
| `PENDING` | Pending Approval |
| `ACCEPTED` | Accepted |
| `REJECTED` | Rejected |
| `AUTO_APPLIED` | Auto Applied (Low risk) |
| `EXPIRED` | Expired (300s) |

### 16.4 SSE Event Types

| Type | Description |
|---|---|
| `THINKING` | Agent Thinking Process |
| `TEXT` | Text Output |
| `TOOL_CALL` | Tool Call |
| `TOOL_RESULT` | Tool Result |
| `EDIT` | Edit Proposal (contains diff) |
| `FILE_CREATED` | File Creation Proposal |
| `CONFIRMATION` | Confirmation Request |
| `ERROR` | Error |
| `DONE` | Done |

### 16.5 API Interaction Flow

```
1. Agent executes write_file/edit_file
   → Generate EditProposal (status=PENDING)
   → SSE Push EDIT event to frontend

2. Frontend displays diff to user

3. User decision:
   → POST /api/v1/agent/edit/apply   → Apply to disk
   → POST /api/v1/agent/edit/reject  → Discard

4. 300s no action → Auto expire
```

### 16.6 Diff Calculation

`compute_proposed_edits_from_content()` uses `difflib` for line-level diff, auto computes `ProposedEdit` list.

---

## 17. Testing

### 17.1 Running Tests

```powershell
cd backend

# Run all tests
python -m pytest

# Specify file
python -m pytest tests/capture/test_serial.py

# Specify directory
python -m pytest tests/engines/

# Verbose
python -m pytest -v

# Fail fast
python -m pytest -x

# Quiet
python -m pytest -q

# Coverage report
python -m pytest --cov=app --cov-report=html
```

### 17.2 Test Directory Structure

```
tests/
├── conftest.py               Global fixture
├── capture/                   Capture layer tests
│   ├── test_base.py             Base model
│   ├── test_serial.py           Serial capture
│   ├── test_flash.py            Flash capture
│   ├── test_openocd_qemu.py     OpenOCD / QEMU
│   └── test_filter_sampler.py   Filter / Sampler
├── engines/                   Engine tests
│   ├── test_ai_analyzer.py      AI analyzer
│   ├── test_fsm.py              State Machine
│   ├── test_log_analyzer.py     Log analyzer
│   └── test_static_analyzer.py  Static analyzer
├── pipeline/                  Pipeline tests
│   └── test_pipeline.py
├── integration/               Integration tests
│   └── test_integration.py
├── core/                      Core module tests
├── security/                  Security tests
├── services/                  Service tests
├── test_cli/                  CLI tests
└── test_tui/                  TUI tests
```

### 17.3 Test Configuration

```ini
# pytest.ini
[pytest]
testpaths = tests
asyncio_mode = strict      # Async tests need @pytest.mark.asyncio
pythonpath = .
```

Root `conftest.py` ensures `backend/` is first in `sys.path`, so `app.*`, `tui.*`, `cli.*` resolve correctly.

### 17.4 Async Tests

Use `pytest-asyncio`, mark async test functions:

```python
import pytest

@pytest.mark.asyncio
async def test_agent_chat():
    ...
```

---

## 18. Architecture Reference

### 18.1 Overall Architecture

```
==========================================================
                    User Interaction Layer
==========================================================
  CLI (Click)    TUI (Textual)    VSCode Extension
       |              |                   |
  AgentClient     AgentClient         REST / WS
  (aiohttp SSE)  (aiohttp SSE)          |
       |              |                   |
==========================================================
          FastAPI Sidecar Engine (v2.1)
==========================================================
  LifecycleManager (Process Control + Signals + Handshake)
  WebSocketManager (Event Bus + Subscriptions + Heartbeat)
  ----------------------------------------------------------
  API Routes (/api/v1/*)
    Agent | Chat | Code | Project | RAG
    Hardware | Serial | Flash | Debug
    Build | Terminal | System | Telemetry
    Session | Extensions | Workflow | Config
  ----------------------------------------------------------
  Services
    AgentLoop        — AI Agent Core Loop
      tools/         — Modular toolkit
        base.py      — Type definitions (ToolDefinition, RiskLevel, ToolCategory, ToolSource)
        registry.py  — ToolRegistry tool registry center
        _helpers.py  — Shared tool functions
        builtin/     — 19 built-in tools (10 modules)
        llm/         — 8 LLM provider tools (4 modules)
      SensitiveGuard — Sensitive Operation Guard
      ContextManager — Chat Context (Token Window)
      WorkspaceManager — Workspace Path Injection
      KnowledgeCache — Knowledge Cache (LRU+TTL)
      StatusReporter — SSE Event Push
      ErrorRecovery  — Error Auto Recovery
    LLMService       — Multi-provider LLM Unified Interface
    RAGService       — FAISS Vector Retrieval
    ProjectService   — Project Management
    CLIService       — Toolchain Call
    FlashService     — Flashing Management
    SerialService    — Serial Management
    HardwareService  — Hardware Detection
    TerminalService  — Safe Command Execution
    ChatService      — Chat Management
    AICorrectionService — AI Code Correction
  ----------------------------------------------------------
  Skill Plugin System
    SkillManager     — Discovery + Lazy Loading
    SkillMatcher     — Matching (Keyword + Semantic)
    STM32 Skill      — STM32 Full Stack
    ESP32 Skill      — ESP32 Full Stack
    (Extensible...)
  ----------------------------------------------------------
  Engines
    FusionEngine     — CubeMX Safe Code Fusion
    ConstraintEngine — Hardware Constraint Check
    StaticAnalyzer   — C Code Static Analysis
    LogAnalyzer      — Log Root Cause Analysis
    HardwareFSM      — State Machine Analysis
    AIAnalyzer       — LLM Diagnostic Engine
    ProjectParser    — Project Structure Parsing
    IncrementalRAG   — Real-time Incremental Index
  ----------------------------------------------------------
  Capture & Pipeline
    SerialCapture    — pyserial Serial
    FlashCapture     — st-flash/esptool
    OpenOCDCapture   — OpenOCD Telnet
    QEMUCapture      — QEMU Simulation
    AIDataFilter     — Data Filtering
    SmartSampler     — Smart Sampling
    PipelineManager  — Pipeline Register + Global Buffer
  ----------------------------------------------------------
  Core
    config.py        — Pydantic Settings Config
    security.py      — Sandbox + Command Filter + Rate Limit
    bus.py           — WebSocket Channel Management
    lifecycle.py     — State Machine + Subprocess Management
    logging.py       — structlog Logging
    exceptions.py    — Unified Exception System
==========================================================
```

### 18.2 Data Flow

1. **AI Chat**: User Message → AgentLoop → LLM Decision → ToolRegistry → Handler Execute → Observe Result → LLM Continue → Final Answer
2. **Knowledge Retrieval**: Agent `search_knowledge` → KnowledgeCache → RAGService → FAISS Search → Result Cache
3. **Hardware Capture**: DataCapture → CapturedData → AIDataFilter → SmartSampler → LLMContext → Analysis Engine → Diagnostic Result
4. **Code Edit**: Agent `edit_file`/`write_file` → EditProposal → SSE Push → Frontend Accept/Reject → Disk Write
5. **Platform Match**: User Message → SkillMatcher.match() → Keyword/Semantic/Fingerprint → Return Best Skill → Load Handler

### 18.3 Error Code System

| Series | Category | Example |
|---|---|---|
| 1xxx | General | SUCCESS, INVALID_PARAMETER, TIMEOUT |
| 2xxx | Project | NOT_FOUND, BUILD_FAILED, CLI_NOT_FOUND |
| 3xxx | Code | GENERATION_FAILED, PARSE_ERROR, FUSION_FAILED |
| 4xxx | Hardware | NOT_CONNECTED, FLASH_FAILED, SERIAL_TIMEOUT |
| 5xxx | AI/LLM | API_ERROR, RATE_LIMITED, RAG_INDEX_ERROR |
| 6xxx | Validation | CONSTRAINT_VIOLATION, PIN_CONFLICT, MISRA_VIOLATION |

### 18.4 API Response Format

Unified format for all API returns:

```json
{
  "code": 1000,
  "message": "success",
  "data": { ... },
  "request_id": "uuid",
  "timestamp": "2026-02-15T12:00:00Z"
}
```

### 18.5 FastAPI Application Configuration

| Item | Value |
|---|---|
| title | `Emcoder Sidecar Engine` |
| version | `2.1.0` |
| Swagger UI | `/docs` |
| ReDoc | `/redoc` |
| CORS | All methods, All headers, credentials=true |

Exception Handlers: `EmcoderException` → JSON error response, `HTTPException` passthrough, Generic Exception → 500.

---

## 19. Troubleshooting

### 19.1 Backend Startup Failure

**Issue**: `ModuleNotFoundError: No module named 'fastapi'`

```powershell
# Solution: Install dependencies
pip install -r requirements.txt
```

**Issue**: `Address already in use`

```powershell
# Solution: Auto assign port
python run.py --port 0

# Or find and kill blocking process
netstat -ano | findstr :8000
taskkill /PID <pid> /F
```

### 19.2 CLI Connection Failure

**Issue**: `Backend: Disconnected`

```
Solution:
1. Confirm backend started: curl http://127.0.0.1:8000/health
2. Use -b to specify address: python -m cli -b http://127.0.0.1:8000 status
3. Check firewall blocking port 8000
4. Check if backend started on different port
```

### 19.3 LLM Call Failure

**Issue**: `LLM API Error` / `Rate Limited` / `Timeout`

```
Solution:
1. Check API Key in .env
2. Check network: curl https://dashscope.aliyuncs.com/compatible-mode/v1/models
3. Increase timeout: LLM_TIMEOUT=300
4. Configure fallback: LLM_FALLBACK_PROVIDER=deepseek
5. Local deployment: LLM_PROVIDER=ollama (No Key needed)
6. Check balance/quota
```

### 19.4 RAG Search No Results

**Issue**: Knowledge retrieval returns empty

```
Solution:
1. Confirm KB files exist: ls data/knowledge_base/
2. Check index status: curl http://127.0.0.1:8000/api/v1/rag/stats
3. Wait for embedding model download (~500MB) on first run
4. Manually reload index: curl -X POST http://127.0.0.1:8000/api/v1/rag/load
5. Check logs for embedding model loading errors
```

### 19.5 Serial Open Failure

**Issue**: `Serial port permission denied` / `Port not found`

```
Solution:
1. Windows: Check driver in Device Manager
2. Linux: sudo usermod -aG dialout $USER and re-login
3. Confirm port not used by other programs (Arduino IDE, PuTTY)
4. Check USB cable connection
```

### 19.6 Flashing Failure

**Issue**: `Flash failed` / `Programmer not found`

```
Solution:
1. Install flasher tool (STM32CubeProgrammer / esptool)
2. Config tool path in .env (MCU_STM32_PROGRAMMER_PATH etc.)
3. Check debugger connection (ST-Link / USB)
4. Check firmware path
5. Detect toolchain via Skill: curl http://127.0.0.1:8000/api/v1/hardware/toolchains
```

### 19.7 Slow Embedding Model Download

**Issue**: `sentence-transformers` download timeout

```powershell
# Solution 1: Set Hugging Face mirror
$env:HF_ENDPOINT = "https://hf-mirror.com"
python run.py

# Solution 2: Manual download to cache
# Download all-MiniLM-L6-v2 to ~/.cache/huggingface/

# Note: RAG auto degrades to Hash embedding if download fails (Lower accuracy but usable)
```

### 19.8 TUI Display Glitch

**Issue**: Garbled text or misalignment

```
Solution:
1. Ensure terminal supports UTF-8: chcp 65001
2. Use Windows Terminal or modern terminals
3. Ensure textual version ≥ 0.85
4. Adjust window size (Recommended ≥ 120×30)
```

### 19.9 Agent Timeout

**Issue**: `Agent loop timeout`

```
Solution:
1. Increase timeout: AGENT_LOOP_TIMEOUT=600
2. Reduce max rounds: AGENT_MAX_ROUNDS=10
3. Simplify request (One thing at a time)
4. Check LLM response speed
```

### 19.10 Project Build Failure

**Issue**: `Build failed` / `Toolchain not found`

```
Solution:
1. Check toolchain installation:
   - STM32: arm-none-eabi-gcc --version
   - ESP32: idf.py --version
2. Check if PATH includes toolchain bin
3. STM32: Confirm CubeMX generated Makefile
4. ESP32: Confirm source export.sh sets IDF environment
5. Check build log: curl http://127.0.0.1:8000/api/v1/logs/build/{project_id}
```

---

## 20. Appendix

### 20.1 File Structure Quick Ref

```
EmcoderCLI/
└── backend/
    ├── run.py                  Launcher
    ├── start_server.ps1        PowerShell Start Script
    ├── requirements.txt        Python Deps
    ├── pytest.ini              Test Config
    ├── conftest.py             Test Fixture
    ├── .env                    Env Config (User Created)
    ├── app/
    │   ├── main.py             FastAPI App Entry
    │   ├── core/
    │   │   ├── config.py       Config Mgmt (Pydantic Settings)
    │   │   ├── security.py     Security: Sandbox/Filter/RateLimit
    │   │   ├── bus.py          WebSocket Event Bus
    │   │   ├── lifecycle.py    Lifecycle Mgmt
    │   │   ├── logging.py      Logging
    │   │   ├── exceptions.py   Exceptions
    │   │   └── utils.py        Utils
    │   ├── api/
    │   │   ├── routes/         REST API Routes
    │   │   ├── ws_routes.py    WebSocket Routes
    │   │   └── compat.py       Compat Routes (/api/ no v1)
    │   ├── models/
    │   │   ├── schemas.py      API Data Models
    │   │   └── edit_protocol.py  Edit Protocol Models
    │   ├── services/
    │   │   ├── agent/          Agent System
    │   │   │   ├── agent_loop.py       Core Loop
    │   │   │   ├── sensitive_guard.py   Sensitive Operation Guard
    │   │   │   ├── context_manager.py   Context Management
    │   │   │   ├── workspace_manager.py Workspace Management
    │   │   │   ├── knowledge_cache.py   Knowledge Cache
    │   │   │   ├── structured_output.py Output Parsing
    │   │   │   ├── status_reporter.py   SSE Push
    │   │   │   ├── error_recovery.py    Error Recovery
    │   │   │   └── tools/              Tool System Package
    │   │   │       ├── base.py           Type definitions (ToolDefinition, RiskLevel...)
    │   │   │       ├── registry.py       ToolRegistry + singleton
    │   │   │       ├── _helpers.py       Shared tool functions
    │   │   │       ├── builtin/          Built-in tools (10 modules, 19 tools)
    │   │   │       │   ├── knowledge.py    Knowledge retrieval & code generation
    │   │   │       │   ├── file_ops.py     Read/Write/Edit files
    │   │   │       │   ├── workspace.py    Scan & Search
    │   │   │       │   ├── project.py      Create/Build/Detect
    │   │   │       │   ├── terminal.py     Terminal commands
    │   │   │       │   ├── hardware.py     Flash & Peripherals
    │   │   │       │   ├── serial.py       Serial monitor & logs
    │   │   │       │   ├── debug.py        Hardware detect & debug
    │   │   │       │   ├── emulation.py    QEMU simulation
    │   │   │       │   └── interaction.py  User confirmation
    │   │   │       └── llm/              LLM Provider tools (4 modules, 8 tools)
    │   │   │           ├── openai.py       Search/File/Code/Image
    │   │   │           ├── qwen.py         Knowledge base/Search
    │   │   │           ├── deepseek.py     Search
    │   │   │           └── anthropic.py    Computer use
    │   │   ├── llm/            LLM Call
    │   │   ├── rag/            RAG KB
    │   │   ├── project/        Project Mgmt
    │   │   ├── serial/         Serial Comm
    │   │   ├── flash/          Flashing
    │   │   ├── hardware/       Hardware Mgmt
    │   │   ├── terminal/       Terminal Cmd
    │   │   ├── chat/           Chat
    │   │   ├── cli/            CLI Tool Detection
    │   │   └── ai_correction/  AI Correction
    │   ├── engines/
    │   │   ├── fusion/         Code Fusion
    │   │   ├── constraint/     Constraint Check
    │   │   ├── static_analyzer/ Static Analysis
    │   │   ├── log_analyzer/   Log Analysis
    │   │   ├── hardware_fsm/   FSM Analysis
    │   │   ├── ai_analyzer/    AI Analysis
    │   │   ├── project_parser/ Project Parsing
    │   │   └── incremental_rag/ Incremental RAG
    │   ├── skills/
    │   │   ├── base.py         Skill Base & Models
    │   │   ├── manager.py      SkillManager
    │   │   ├── matcher.py      SkillMatcher
    │   │   └── embedded/       Built-in Skills (stm32, esp32)
    │   ├── capture/
    │   │   ├── base.py         Capture Base & Models
    │   │   ├── filter.py       AI Data Filter
    │   │   ├── sampler.py      Smart Sampler
    │   │   ├── serial/         Serial Capture
    │   │   ├── flash/          Flash Capture
    │   │   ├── openocd/        Debug Capture
    │   │   └── qemu/           Sim Capture
    │   └── pipeline/
    │       └── manager.py      Pipeline Manager
    ├── cli/
    │   ├── __main__.py         CLI Entry
    │   └── main.py             Click Commands
    ├── tui/
    │   ├── app.py              Textual Main App
    │   ├── widgets.py          UI Components
    │   ├── client.py           SSE Agent Client
    │   ├── icons.py            ASCII Icons
    │   └── styles.py           TCSS Styles
    ├── data/
    │   ├── knowledge_base/     RAG Documents
    │   ├── rag_index/          FAISS Index
    │   └── workspace/          Project Workspace
    ├── config/
    │   └── allowed_extensions.json  Extension Whitelist
    ├── tests/                  Test Suite
    └── docs/                   Documentation
```

### 20.2 Environment Variable Quick Ref

| Prefix | Config Group | Example |
|---|---|---|
| (None) | Service Core | `HOST`, `PORT`, `DEBUG`, `LOG_LEVEL` |
| `LLM_` | LLM Model | `LLM_PROVIDER`, `LLM_API_KEY`, `LLM_MODEL_NAME` |
| `RAG_` | Knowledge Base | `RAG_VECTOR_STORE`, `RAG_DEFAULT_TOP_K` |
| `SKILL_` | Skill System | `SKILL_ENABLE_SEMANTIC_MATCH` |
| `PROJECT_` | Project Mgmt | `PROJECT_DEFAULT_PLATFORM`, `PROJECT_AUTO_BUILD` |
| `AGENT_` | Agent Engine | `AGENT_MAX_ROUNDS`, `AGENT_LOOP_TIMEOUT` |
| `SECURITY_` | Security | `SECURITY_REQUIRE_CONFIRMATION` |
| `MCU_` | Toolchain (Deprecated) | `MCU_ARM_GCC_PATH` |

### 20.3 Common API Quick Ref

```powershell
# Health Check
curl http://127.0.0.1:8000/health

# AI Chat (Non-streaming)
curl -X POST http://127.0.0.1:8000/api/v1/agent/chat `
  -H "Content-Type: application/json" `
  -d '{"message": "Hello"}'

# KB Search
curl -X POST http://127.0.0.1:8000/api/v1/rag/search `
  -H "Content-Type: application/json" `
  -d '{"query": "UART DMA", "top_k": 3}'

# Chip Info
curl "http://127.0.0.1:8000/api/v1/hardware/chip-info?chip=STM32F407"

# Serial Ports
curl http://127.0.0.1:8000/api/v1/serial/ports

# Tool List
curl http://127.0.0.1:8000/api/v1/agent/tools
```

### 20.4 Version History

| Version | Date | Major Changes |
|---|---|---|
| v2.1.0 | 2026-02-20 | Tool system modular refactoring: split into `tools/` package (20 files), added ToolSource enum, LLM provider tools (8), `_helpers.py` shared functions, total tools 19→27 |
| v2.0.0 | 2026-02 | Skill Plugin System, Edit Protocol, Agent Tool System, TUI Refactor |
| v1.0.0 | — | Initial Release |

---

*Emcoder CLI v2.1.0 — Embedded MCU Intelligent Development Sidecar Engine*
