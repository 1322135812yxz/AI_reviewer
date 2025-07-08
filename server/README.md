# DeepSeek API 后端服务

这是一个专门用于调用DeepSeek大模型API的Node.js后端服务。服务运行在3000端口，提供了简单的API接口来转发请求到DeepSeek的大语言模型。

## 功能特点

- 支持DeepSeek-Chat (DeepSeek-V3)模型调用
- 支持DeepSeek-Reasoner (DeepSeek-R1)模型调用
- 支持流式和非流式输出
- 完整的错误处理和日志记录
- 跨域资源共享(CORS)支持

## 安装和启动

### 安装依赖

```bash
npm install
```

### 启动服务

```bash
npm start
```

或者使用开发模式（自动重启）：

```bash
npm run dev
```

## API接口

### 1. 聊天完成 API

**端点**: `POST /api/chat`

**请求体**:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "你好，请介绍一下自己。" }
  ],
  "model": "deepseek-chat",
  "stream": false,
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**参数说明**:
- `messages`: 消息数组，包含角色和内容
- `model`: 模型名称，默认为 "deepseek-chat"
- `stream`: 是否使用流式输出，默认为 false
- 其他参数: 可以传递其他OpenAI兼容的参数

### 2. 推理模型 API

**端点**: `POST /api/reasoner`

**请求体**:

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "解决这个数学问题: 3x + 5 = 14, x = ?" }
  ],
  "stream": false,
  "temperature": 0.2
}
```

**参数说明**:
- `messages`: 消息数组，包含角色和内容
- `stream`: 是否使用流式输出，默认为 false
- 其他参数: 可以传递其他OpenAI兼容的参数

## 客户端示例

查看 `client-example.js` 文件获取如何从客户端调用这些API的示例代码。

## 注意事项

- API密钥已经配置在服务器中，客户端不需要提供
- 默认情况下，服务器监听在 http://localhost:3000
- 在生产环境中，建议添加适当的安全措施，如API密钥验证、请求限制等