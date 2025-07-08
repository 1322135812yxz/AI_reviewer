<template>
  <div class="ai-interview-chat">
    <div class="chat-container bg-white rounded-xl shadow-md p-4 mb-4">
      <!-- 聊天历史记录 -->
      <div class="chat-history mb-4 max-h-96 overflow-y-auto" ref="chatHistoryRef">
        <div v-for="(message, index) in chatHistory" :key="index" class="mb-4">
          <!-- AI消息 -->
          <div v-if="message.role === 'assistant'" class="flex">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2">
              <img src="../assets/ai_head.jpg" alt="AI" class="w-8 h-8 rounded-full object-cover" />
            </div>
            <div class="bg-blue-50 rounded-lg p-3 max-w-[80%]">
              <div class="text-xs text-gray-500 mb-1">AI interviewer</div>
              <p class="text-sm text-gray-800 whitespace-pre-wrap">{{ message.content }}</p>
            </div>
          </div>
          
          <!-- 用户消息 -->
          <div v-else class="flex justify-end">
            <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
              <div class="text-xs text-gray-500 mb-1">Me</div>
              <p class="text-sm text-gray-800 whitespace-pre-wrap">{{ message.content }}</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center ml-2">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 加载指示器 -->
        <div v-if="isLoading" class="flex mt-2">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center mr-2">
            <img src="../assets/ai_head.jpg" alt="AI" class="w-8 h-8 rounded-full object-cover" />
          </div>
          <div class="bg-blue-50 rounded-lg p-3">
            <div class="flex space-x-1">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 输入区域 -->
      <div class="chat-input">
        <div class="flex flex-col">
          <!-------------------------------------------- 以下为新增 ---------------------------------->
          <!-- 语音控制按钮 -->
          <div class="flex justify-between mb-2">
            <button 
              @click="toggleSpeakMessages" 
              class="text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
              :class="speakMessages ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.072m-2.829 9.9a9 9 0 010-12.728"></path>
                </svg>
                {{ speakMessages ? '关闭语音播报' : 'Turn on voice broadcast' }}
              </div>
            </button>
            
            <button 
              @click="startVoiceInput" 
              :disabled="isListening || isLoading"
              class="text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
              :class="isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            >
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
                {{ isListening ? '正在录音...' : 'voice input' }}
              </div>
            </button>
          </div>
          <!-------------------------------------------- 以下为新增 ---------------------------------->
          <div class="flex">
            <input 
              v-model="userInput" 
              type="text" 
              class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your question..."
              @keyup.enter="sendMessage"
            />
            <button 
              @click="sendMessage" 
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
              :disabled="isLoading || !userInput.trim()"
            >
              <svg v-if="!isLoading" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
              <svg v-else class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </button>
          </div>
          
          <!-- 语音识别状态指示器 -->
          <div v-if="isListening" class="mt-2 text-center">
            <div class="inline-flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs">
              <div class="flex space-x-1 mr-2">
                <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-red-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
              正在听你说...
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 操作按钮 -->
    <div class="flex justify-between">
      <button 
        @click="resetChat" 
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
      >
        重新开始
      </button>
      <button 
        @click="generateFeedback" 
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
        :disabled="chatHistory.length < 4 || isLoading"
      >
        生成反馈
      </button>
    </div>
    
    <!-- 反馈区域 -->
    <div v-if="feedback" class="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
      <h3 class="font-semibold text-gray-800 mb-2">面试反馈</h3>
      <div class="text-sm text-gray-700 whitespace-pre-wrap">{{ feedback }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, onBeforeUnmount } from 'vue';
import { deepseekService } from '../api/deepseekService';

// 定义组件属性
const props = defineProps({
  topic: {
    type: String,
    default: '自我介绍'
  },
  difficulty: {
    type: String,
    default: '中等' // 简单、中等、困难
  }
});

// 聊天状态
const userInput = ref('');
const chatHistory = ref<Array<{ role: string; content: string }>>([]);
const isLoading = ref(false);
const feedback = ref('');
const chatHistoryRef = ref<HTMLElement | null>(null);

//以下为新增
// 语音功能状态
const speakMessages = ref(false);
const isListening = ref(false);
const speechSynthesis = window.speechSynthesis;
let recognition: any = null;

// 初始化语音识别
const initSpeechRecognition = () => {
  try {
    // @ts-ignore - SpeechRecognition 可能在 TypeScript 中未定义
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN'; // 设置语言为中文
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        userInput.value = transcript;
      };
      
      recognition.onend = () => {
        isListening.value = false;
        if (userInput.value.trim()) {
          sendMessage();
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('语音识别错误:', event.error);
        isListening.value = false;
      };
    } else {
      console.warn('浏览器不支持语音识别');
    }
  } catch (error) {
    console.error('初始化语音识别失败:', error);
  }
};

// 开始语音输入
const startVoiceInput = () => {
  if (!recognition) {
    initSpeechRecognition();
  }
  
  if (recognition && !isListening.value && !isLoading.value) {
    userInput.value = '';
    isListening.value = true;
    try {
      recognition.start();
    } catch (error) {
      console.error('启动语音识别失败:', error);
      isListening.value = false;
    }
  }
};

// 停止语音输入
const stopVoiceInput = () => {
  if (recognition && isListening.value) {
    try {
      recognition.stop();
      isListening.value = false;
    } catch (error) {
      console.error('停止语音识别失败:', error);
    }
  }
};

// 切换语音播报
const toggleSpeakMessages = () => {
  speakMessages.value = !speakMessages.value;
  
  // 如果开启语音播报，朗读最后一条AI消息
  if (speakMessages.value) {
    const lastAIMessage = [...chatHistory.value].reverse().find(msg => msg.role === 'assistant');
    if (lastAIMessage) {
      speakText(lastAIMessage.content);
    }
  } else {
    // 关闭语音播报时，停止当前朗读
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }
};

// 文本转语音
const speakText = (text: string) => {
  if (!speakMessages.value || !text) return;
  
  // 停止当前朗读
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 1.0; // 语速
  utterance.pitch = 1.0; // 音调
  
  // 获取可用的语音
  const voices = speechSynthesis.getVoices();
  // 尝试找到中文女声
  const chineseVoice = voices.find(voice => 
    voice.lang.includes('zh') && voice.name.includes('Female')
  );
  
  if (chineseVoice) {
    utterance.voice = chineseVoice;
  }
  
  speechSynthesis.speak(utterance);
};

// 系统提示词，根据不同的面试主题和难度定制
const getSystemPrompt = () => {
  let prompt = `你是一位专业的面试官，正在进行一场关于"${props.topic}"的模拟面试。
难度级别：${props.difficulty}。
请遵循以下规则：
1. 提问要专业、简洁，符合真实面试场景
2. 根据面试者的回答进行追问，深入考察其专业能力
3. 不要一次性提出多个问题，保持对话的自然流畅
4. 如果面试者的回答不够详细或不够专业，要引导其深入思考
5. 使用礼貌、专业的语气，但要有一定的挑战性
6. 回答控制在200字以内，保持对话节奏
7.面试采用英文的方式交流
`;
  
  // 根据不同主题添加特定提示
  switch (props.topic) {
    case '自我介绍':
      prompt += '请先要求面试者进行自我介绍，然后根据其介绍内容进行有针对性的追问。';
      break;
    case '项目介绍':
      prompt += '请询问面试者的项目经验，关注项目中的技术选型、难点解决和个人贡献等方面。';
      break;
    case '技术能力':
      prompt += '请围绕相关技术领域的核心概念、实践经验和解决问题的能力进行提问。';
      break;
    default:
      prompt += '请根据面试主题设计合适的问题，考察面试者的专业能力和思维方式。';
  }
  
 
  
  return prompt;
};

// 新增初始化聊天
onMounted(() => {
  startInterview();
  
  // 初始化语音识别
  initSpeechRecognition();
  
  // 确保语音合成已加载声音
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = initSpeechRecognition;
  }
});

// 组件销毁前清理
onBeforeUnmount(() => {
  // 停止语音识别
  stopVoiceInput();
  
  // 停止语音合成
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
});

// 开始面试
const startInterview = async () => {
  chatHistory.value = [];
  feedback.value = '';
  isLoading.value = true;
  
  try {
    // 添加系统消息（不显示在UI上）
    const systemMessage = { role: 'system', content: getSystemPrompt() };
    
    // 获取AI的第一个问题
    const response = await deepseekService.chat({
      messages: [systemMessage],
      temperature: 0.7,
      max_tokens: 500
    });
    
    // 添加AI的第一个问题到聊天历史
    const aiMessage = response.choices[0].message.content;
    chatHistory.value.push({ role: 'assistant', content: aiMessage });
    
    // 如果开启了语音播报，朗读AI消息
    if (speakMessages.value) {
      speakText(aiMessage);
    }
  } catch (error) {
    console.error('启动面试失败:', error);
    chatHistory.value.push({ 
      role: 'assistant', 
      content: '抱歉，面试系统出现了问题，请稍后再试。' 
    });
  } finally {
    isLoading.value = false;
  }
};

// 发送用户消息
const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;
  
  // 如果正在语音输入，先停止
  if (isListening.value) {
    stopVoiceInput();
  }
  
  // 添加用户消息到聊天历史
  const userMessage = userInput.value.trim();
  chatHistory.value.push({ role: 'user', content: userMessage });
  userInput.value = '';
  
  // 滚动到底部
  await nextTick();
  scrollToBottom();
  
  // 获取AI回复
  isLoading.value = true;
  
  try {
    // 构建完整的消息历史，包括系统提示
    const messages = [
      { role: 'system', content: getSystemPrompt() },
      ...chatHistory.value
    ];
    
    // 调用AI面试官专项训练API获取回复
    const response = await deepseekService.chat({
      messages,
      temperature: 0.7,
      max_tokens: 500
    });
    
    // 添加AI回复到聊天历史
    const aiMessage = response.choices[0].message.content;
    chatHistory.value.push({ role: 'assistant', content: aiMessage });
    
    // 如果开启了语音播报，朗读AI消息
    if (speakMessages.value) {
      speakText(aiMessage);
    }
  } catch (error) {
    console.error('获取AI回复失败:', error);
    chatHistory.value.push({ 
      role: 'assistant', 
      content: '抱歉，我遇到了一些问题，无法回复你的消息。请稍后再试。' 
    });
  } finally {
    isLoading.value = false;
    
    // 滚动到底部
    await nextTick();
    scrollToBottom();
  }
};

// 生成面试反馈
const generateFeedback = async () => {
  if (isLoading.value || chatHistory.value.length < 4) return;
  
  isLoading.value = true;
  feedback.value = '';
  
  try {
    // 构建反馈请求
    const feedbackPrompt = `
你是一位专业的面试评估专家，请根据以下面试对话，对面试者的表现进行评估和反馈。
评估维度包括：
1. 专业能力和知识深度
2. 表达能力和逻辑性
3. 问题解决能力
4. 优势和不足

请给出具体的改进建议，帮助面试者提升。格式要求：分点评估，简明扼要，总字数控制在300字以内。

面试对话内容：
${chatHistory.value.map(msg => `${msg.role === 'assistant' ? '面试官' : '面试者'}：${msg.content}`).join('\n')}
`;

    const response = await deepseekService.reason({
      messages: [
        { role: 'system', content: '你是一位专业的面试评估专家，擅长分析面试表现并给出建设性反馈。' },
        { role: 'user', content: feedbackPrompt }
      ],
      temperature: 0.3
    });
    
    feedback.value = response.choices[0].message.content;
  } catch (error) {
    console.error('生成反馈失败:', error);
    feedback.value = '抱歉，生成反馈时出现了问题，请稍后再试。';
  } finally {
    isLoading.value = false;
    
    // 滚动到底部
    await nextTick();
    scrollToBottom();
  }
};

// 重置聊天
const resetChat = () => {
  // 停止当前语音
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }
  
  startInterview();
};

// 滚动到底部
const scrollToBottom = () => {
  if (chatHistoryRef.value) {
    chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight;
  }
};

// 监听聊天历史变化，自动滚动到底部
watch(
  () => chatHistory.value.length,
  () => nextTick(() => scrollToBottom())
);

// 监听AI消息，自动朗读
watch(
  () => chatHistory.value,
  (newHistory, oldHistory) => {
    if (speakMessages.value && newHistory.length > oldHistory.length) {
      const lastMessage = newHistory[newHistory.length - 1];
      if (lastMessage.role === 'assistant') {
        speakText(lastMessage.content);
      }
    }
  },
  { deep: true }
);
</script>

<style scoped>
.chat-history {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: transparent;
}

.chat-history::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
</style>