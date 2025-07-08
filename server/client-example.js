// 客户端示例：如何调用DeepSeek API后端服务

// 使用fetch API调用非流式聊天接口示例
async function callChatAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "你好，请介绍一下自己。" }
        ],
        model: "deepseek-chat",
        // 其他可选参数
        // temperature: 0.7,
        // max_tokens: 1000,
      }),
    });

    const data = await response.json();
    console.log('API响应:', data);
    console.log('AI回复:', data.choices[0].message.content);
    return data;
  } catch (error) {
    console.error('调用API出错:', error);
  }
}

// 使用fetch API调用流式聊天接口示例
async function callStreamingChatAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "请写一首关于春天的诗。" }
        ],
        model: "deepseek-chat",
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            console.log('流式传输完成');
            break;
          }
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              result += parsed.content;
              console.log('收到内容:', parsed.content);
            }
          } catch (e) {
            console.error('解析数据出错:', e);
          }
        }
      }
    }

    console.log('完整回复:', result);
    return result;
  } catch (error) {
    console.error('调用流式API出错:', error);
  }
}

// 使用
/*
import { ref } from 'vue';

export default {
  setup() {
    const response = ref('');
    const loading = ref(false);
    
    async function sendMessage(message) {
      loading.value = true;
      try {
        const res = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: message }
            ],
            model: "deepseek-chat",
          }),
        });

        const data = await res.json();
        response.value = data.choices[0].message.content;
      } catch (error) {
        console.error('发送消息出错:', error);
      } finally {
        loading.value = false;
      }
    }
    
    return {
      response,
      loading,
      sendMessage
    };
  }
};
*/