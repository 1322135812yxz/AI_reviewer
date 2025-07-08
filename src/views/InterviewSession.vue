<template>
  <div class="app-container">
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-6 px-4 md:px-8">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 左侧导航区域 -->
        <div class="w-full lg:w-64 bg-white rounded-xl shadow-md p-4 h-fit">
          <div class="mb-4">
            <h3 class="text-lg font-bold text-gray-800 mb-3">面试类型</h3>
            <div class="space-y-2">
              <div class="flex items-center p-2 bg-blue-50 rounded-lg text-blue-600 font-medium">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>自我介绍</span>
              </div>
              <div class="flex items-center p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                <svg class="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>项目介绍</span>
              </div>
              <div class="flex items-center p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                <svg class="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span>活跃度</span>
              </div>
              <div class="flex items-center p-2 hover:bg-gray-50 rounded-lg text-gray-700">
                <svg class="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span>综合分析</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-bold text-gray-800 mb-3">面试设置</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-700">难度级别</span>
                <div class="flex space-x-1">
                  <button class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">1</button>
                  <button class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">2</button>
                  <button class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">3</button>
                </div>
              </div>
              <!-- 面试时长选项已移除 -->
              <div>
                <span class="text-sm text-gray-700 block mb-2">面试官风格</span>
                <select class="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <option>友好型</option>
                  <option>严厉型</option>
                  <option>专业型</option>
                  <option>随机</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 中间面试对话区域 -->
        <div class="flex-grow bg-white rounded-xl shadow-md p-6 mb-6">
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <img src="../assets/ai_head.jpg" alt="AI面试官" class="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h2 class="text-lg font-bold text-gray-800">AI面试官</h2>
                <div class="flex items-center">
                  <span class="text-xs px-2 py-0.5 bg-green-50 rounded-full text-green-600 font-medium mr-2">在线</span>
                  <span class="text-xs text-gray-500">自我介绍专场</span>
                </div>
              </div>
            </div>
            <div>
              <button @click="goBack" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 对话内容区域 -->
          <div class="h-96 overflow-y-auto mb-6 p-4 border border-gray-100 rounded-xl bg-gray-50">
            <!-- AI消息 -->
            <div class="flex mb-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 mr-3">
                <img src="../assets/ai_head.jpg" alt="AI面试官" class="w-full h-full rounded-full object-cover" />
              </div>
              <div class="max-w-3/4">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <p class="text-gray-800">你好！我是你的AI面试官。今天我们将进行自我介绍专场模拟面试。请用2-3分钟时间做一个简短的自我介绍，包括你的教育背景、专业技能和项目经验等。</p>
                </div>
                <div class="text-xs text-gray-500 mt-1">10:30</div>
              </div>
            </div>
            
            <!-- 用户消息 -->
            <div class="flex justify-end mb-4">
              <div class="max-w-3/4">
                <div class="bg-blue-500 p-3 rounded-lg shadow-sm">
                  <p class="text-white">好的。我叫张三，是一名计算机科学专业的应届毕业生。我在大学期间主要学习了数据结构、算法、操作系统和软件工程等课程。我擅长Java和Python编程，有扎实的计算机基础知识。</p>
                </div>
                <div class="text-xs text-gray-500 mt-1 text-right">10:32</div>
              </div>
              <div class="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 ml-3">
                <img src="../assets/head.jpg" alt="用户头像" class="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            
            <!-- AI消息 -->
            <div class="flex mb-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 mr-3">
                <img src="../assets/ai_head.jpg" alt="AI面试官" class="w-full h-full rounded-full object-cover" />
              </div>
              <div class="max-w-3/4">
                <div class="bg-white p-3 rounded-lg shadow-sm">
                  <p class="text-gray-800">谢谢你的介绍。能否详细说说你在大学期间参与过的项目经验？特别是你认为最能体现你技术能力的项目。</p>
                </div>
                <div class="text-xs text-gray-500 mt-1">10:33</div>
              </div>
            </div>
          </div>
          
          <!-- 输入区域 -->
          <div class="relative">
            <textarea 
              class="w-full border border-gray-300 rounded-xl py-3 px-4 pr-20 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none"
              rows="3"
              placeholder="输入你的回答..."
              v-model="userMessage"
            ></textarea>
            <div class="absolute bottom-3 right-3 flex space-x-2">
              <button class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
              </button>
              <button 
                class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                @click="sendMessage"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <!-- 右侧辅助功能区域 -->
        <div class="w-full lg:w-80">
          <div class="bg-white rounded-xl shadow-md p-5 mb-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">面试提示</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-blue-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">自我介绍要点</h4>
                <p class="text-sm text-gray-600">简洁清晰地介绍自己的教育背景、专业技能和相关经验，突出与岗位相关的优势。</p>
              </div>
              <div class="border-l-4 border-green-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">回答技巧</h4>
                <p class="text-sm text-gray-600">使用STAR法则（情境、任务、行动、结果）来描述你的项目经验和成就。</p>
              </div>
              <div class="border-l-4 border-yellow-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">注意事项</h4>
                <p class="text-sm text-gray-600">保持积极的态度，避免过度谦虚或自夸，用具体的例子支持你的陈述。</p>
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()
const userMessage = ref('')

// 返回上一页
const goBack = () => {
  router.push('/mock-interview')
}

// 发送消息
const sendMessage = () => {
  if (userMessage.value.trim() === '') return
  
  // 这里可以添加发送消息的逻辑
  console.log('发送消息:', userMessage.value)
  
  // 清空输入框
  userMessage.value = ''
}
</script>

<style scoped>
/* 可以添加特定于此组件的样式 */
</style>