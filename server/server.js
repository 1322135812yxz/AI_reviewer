import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import OpenAI from 'openai';

const app = express();
const PORT = 3000;

// 中间件配置
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // 日志记录

// 配置AI面试官专项训练 API客户端
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: '' //改为你自己的API KEY
});

// 健康检查路由
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AI面试官专项训练服务运行中' });
});

// AI面试官专项训练聊天完成API路由
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, model = 'deepseek-chat', stream = false, ...otherParams } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '请提供有效的消息数组' });
    }

    if (stream) {
      // 流式响应
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await openai.chat.completions.create({
        model,
        messages,
        stream: true,
        ...otherParams
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}

`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // 非流式响应
      const completion = await openai.chat.completions.create({
        model,
        messages,
        ...otherParams
      });

      res.json(completion);
    }
  } catch (error) {
    console.error('AI面试官专项训练API调用错误:', error);
    res.status(500).json({
      error: '调用AI面试官专项训练API时出错',
      message: error.message,
      details: error.response?.data || {}
    });
  }
});

// 推理模型API路由
app.post('/api/reasoner', async (req, res) => {
  try {
    const { messages, stream = false, ...otherParams } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: '请提供有效的消息数组' });
    }

    // 使用推理模型
    const model = 'deepseek-reasoner';

    if (stream) {
      // 流式响应
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await openai.chat.completions.create({
        model,
        messages,
        stream: true,
        ...otherParams
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}

`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // 非流式响应
      const completion = await openai.chat.completions.create({
        model,
        messages,
        ...otherParams
      });

      res.json(completion);
    }
  } catch (error) {
    console.error('AI面试官专项训练推理API调用错误:', error);
    res.status(500).json({
      error: '调用AI面试官专项训练推理API时出错',
      message: error.message,
      details: error.response?.data || {}
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`AI面试官专项训练服务器运行在 http://localhost:${PORT}`);
});
