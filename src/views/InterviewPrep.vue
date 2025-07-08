<template>
  <div class="app-container">
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-6 px-4 md:px-8">

      <!-- 主要内容区域 -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- 左侧内容区域 -->
        <div class="flex-grow bg-white rounded-xl shadow-md p-6 mb-6">
          <!-- 欢迎信息 -->
          <div class="bg-gradient-to-r from-teal-500 to-green-400 rounded-xl p-6 mb-6 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div class="flex items-center justify-between">
              <div class="z-10">
                <div class="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
                  <img src="../assets/head.jpg" alt="华为Logo" class="w-16 h-16 object-contain" />
                </div>
                <h2 class="text-2xl font-bold text-white mb-2">欢迎来到AI模拟真题面试</h2>
                <p class="text-white text-opacity-90">准备好挑战面试题了吗？点击下方按钮开始模拟面试吧！</p>
              </div>
              <div class="hidden md:block">
                <button @click="startInterview" class="bg-white text-teal-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-200">
                  开始面试
                </button>
              </div>
            </div>
            <div class="md:hidden mt-4">
              <button @click="startInterview" class="w-full bg-white text-teal-600 hover:bg-gray-100 px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-200">
                开始面试
              </button>
            </div>
          </div>

          <!-- 面试特点介绍 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">面试特点</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- 特点1：时长10-15min -->
              <div class="flex items-start p-4 bg-blue-50 rounded-xl">
                <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">时长10-15min</h4>
                  <p class="text-sm text-gray-600">模拟真实面试时长，帮助你适应面试节奏</p>
                </div>
              </div>
              
              <!-- 特点2：AI设定问答 -->
              <div class="flex items-start p-4 bg-green-50 rounded-xl">
                <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">AI设定问答</h4>
                  <p class="text-sm text-gray-600">
                    根据你的期望职业<span v-if="linkResume && expectedCareer !== '未设置期望职业'" class="font-medium text-green-600">（{{ expectedCareer }}）</span>，模拟面试问题
                  </p>
                </div>
              </div>
              
              <!-- 特点3：独创型题库 -->
              <div class="flex items-start p-4 bg-purple-50 rounded-xl">
                <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">独创型题库</h4>
                  <p class="text-sm text-gray-600">根据真实面试题目整理，提供最贴近实际的面试体验</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 个性化设置 -->
          <div class="mb-8">
            <h3 class="text-xl font-bold text-gray-800 mb-4">个性化设置</h3>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="flex-1 p-4 border border-gray-200 rounded-xl">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-700">题目</span>
                  <div class="flex space-x-1">
                    <button class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">1</button>
                    <button class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">2</button>
                    <button class="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">3</button>
                  </div>
                </div>
              </div>
              <div class="flex-1 p-4 border border-gray-200 rounded-xl">
                <div>
                  <span class="text-sm text-gray-700 block mb-2">面试官类型</span>
                  <select 
                    v-model="selectedInterviewerType"
                    class="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="hr型">HR型</option>
                    <option value="技术型">技术型</option>
                    <option value="综合型">综合型</option>
                    <option value="随机">随机</option>
                  </select>
                  <!-- 面试官类型说明 -->
                  <div class="mt-2 text-xs text-gray-500">
                    <div v-if="selectedInterviewerType === 'hr型'">
                      💼 侧重个人品格、职业素养、团队合作能力
                    </div>
                    <div v-else-if="selectedInterviewerType === '技术型'">
                      🔧 侧重技术能力、项目经验、问题解决能力
                    </div>
                    <div v-else-if="selectedInterviewerType === '综合型'">
                      ⚖️ 平衡考察技术能力和软技能
                    </div>
                    <div v-else-if="selectedInterviewerType === '随机'">
                      🎲 随机选择面试官类型，增加挑战性
                    </div>
                  </div>
                </div>
              </div>
              <!-- 个性化设置部分 -->
              <div class="flex-1 p-4 border border-gray-200 rounded-xl">
                <div class="flex items-center">
                  <span class="text-sm text-gray-700 mr-3">是否链接在线简历</span>
                  <label class="inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="linkResume" value="" class="sr-only peer" checked>
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <!-- 当勾选"链接在线简历"时显示期望岗位 -->
                <div v-if="linkResume" class="mt-3 pt-3 border-t border-gray-100">
                  <span class="text-sm text-gray-700 block mb-2">期望岗位</span>
                  <div class="px-3 py-2 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium">
                    {{ expectedCareer }}
                  </div>
                  <!-- 如果未设置期望职业，提供跳转到简历编辑的链接 -->
                  <div v-if="expectedCareer === '未设置期望职业'" class="mt-2">
                    <router-link 
                      to="/resume" 
                      class="text-xs text-blue-500 hover:text-blue-700 underline"
                    >
                      去简历中设置期望职业 →
                    </router-link>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- 面试题目预览 -->
          <div>
            <div class="mt-4 text-center">
              <button 
                @click="startInterview" 
                :disabled="isLoading"
                class="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-medium shadow-lg transition-colors duration-200 flex items-center justify-center mx-auto"
              >
                <svg 
                  v-if="isLoading" 
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? '正在生成面试题目...' : '开始模拟面试' }}
              </button>
            </div>
          </div>
        </div>
        
        <!-- 右侧排行榜区域 -->
        <div class="w-full lg:w-80">
          <div class="bg-white rounded-xl shadow-md p-5 mb-6">
            <div class="flex items-center mb-4">
              <h3 class="text-lg font-bold text-gray-800">练习时长排行榜</h3>
              <span class="ml-2 text-xs px-2 py-0.5 bg-red-50 rounded-full text-red-600 font-medium">实时</span>
            </div>
            
            <!-- 排行榜列表 -->
            <div class="space-y-4">
              <!-- 第一名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3 text-yellow-600 font-bold">1</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">73568385号</div>
                    <div class="text-xs text-gray-500">417分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第二名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600 font-bold">2</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">Callmmm</div>
                    <div class="text-xs text-gray-500">370分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第三名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3 text-orange-600 font-bold">3</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">子子</div>
                    <div class="text-xs text-gray-500">217分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第四名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600 font-bold">4</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">吉吉了呀</div>
                    <div class="text-xs text-gray-500">169分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第五名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600 font-bold">5</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">122419345号</div>
                    <div class="text-xs text-gray-500">156分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第六名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600 font-bold">6</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">一汪星上的小飞船</div>
                    <div class="text-xs text-gray-500">140分钟</div>
                  </div>
                </div>
              </div>
              
              <!-- 第七名 -->
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-gray-600 font-bold">7</div>
                <div class="flex-1 flex items-center">
                  <img src="../assets/head.jpg" alt="用户头像" class="w-8 h-8 rounded-full object-cover mr-2" />
                  <div>
                    <div class="text-sm font-medium text-gray-800">牛小妞</div>
                    <div class="text-xs text-gray-500">109分钟</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 面试技巧提示 -->
          <div class="bg-white rounded-xl shadow-md p-5">
            <h3 class="text-lg font-bold text-gray-800 mb-4">面试技巧</h3>
            <div class="space-y-4">
              <div class="border-l-4 border-blue-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">准备充分</h4>
                <p class="text-sm text-gray-600">
                  提前了解企业文化和
                  <span v-if="linkResume && expectedCareer !== '未设置期望职业'" class="font-medium">{{ expectedCareer }}</span>
                  <span v-else>目标岗位</span>
                  的具体要求，有针对性地准备。
                </p>
              </div>
              <div class="border-l-4 border-green-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">结构化回答</h4>
                <p class="text-sm text-gray-600">
                  使用STAR法则（情境、任务、行动、结果）来描述你的项目经验和成就。
                </p>
              </div>
              <div class="border-l-4 border-yellow-500 pl-3 py-1">
                <h4 class="font-medium text-gray-800 mb-1">技术展示</h4>
                <p class="text-sm text-gray-600">
                  准备一些与
                  <span v-if="linkResume && expectedCareer !== '未设置期望职业'" class="font-medium">{{ expectedCareer }}</span>
                  <span v-else>目标岗位</span>
                  相关的案例，展示你的技术能力和解决问题的思路。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import { ref, computed } from 'vue'
import { useResumeStore } from '../store/resume'
import { deepseekService } from '../api/deepseekService'
import toast from 'react-hot-toast'

const router = useRouter()
const resumeStore = useResumeStore()
const linkResume = ref(true)  // 默认勾选"链接在线简历"
const selectedInterviewerType = ref('综合型')  // 新增：面试官类型选择
const isLoading = ref(false)  // 新增：加载状态

// 计算属性：获取期望职业
const expectedCareer = computed(() => {
  return resumeStore.basic.identity !== '请输入期望职业' 
    ? resumeStore.basic.identity 
    : '未设置期望职业'
})

// 开始面试函数
const startInterview = async () => {
  if (isLoading.value) return  // 防止重复点击
  
  isLoading.value = true  // 开始加载
  
  try {
    // 如果链接了简历且设置了期望职业，生成定制化问题
    if (linkResume.value && expectedCareer.value !== '未设置期望职业') {
      console.log('正在生成定制化面试问题...', {
        career: expectedCareer.value,
        interviewerType: selectedInterviewerType.value
      })
      
      try {
        // 调用Deepseek生成面试问题
        const questions = await deepseekService.generateInterviewQuestions(
          expectedCareer.value, 
          selectedInterviewerType.value
        )
        
        // 将生成的问题和面试官类型存储到localStorage
        localStorage.setItem('aiGeneratedQuestions', JSON.stringify(questions))
        localStorage.setItem('questionsGeneratedFor', expectedCareer.value)
        localStorage.setItem('interviewerType', selectedInterviewerType.value)
        localStorage.setItem('questionsGeneratedTime', new Date().toISOString())
        
        toast.success(`已为${selectedInterviewerType.value}面试官生成${questions.length}个问题！`)
        console.log('生成的面试问题:', questions)
      } catch (error) {
        console.error('生成面试问题失败:', error)
        toast.error('生成面试问题失败，将使用默认问题')
      }
    }
    
    // 存储链接简历状态和面试官类型
    localStorage.setItem('linkResume', linkResume.value.toString())
    localStorage.setItem('selectedInterviewerType', selectedInterviewerType.value)
    
    // 跳转到设备检查页面
    router.push('/device-check')
  } catch (error) {
    console.error('开始面试失败:', error)
    toast.error('开始面试失败，请重试')
  } finally {
    isLoading.value = false  // 结束加载
  }
}
</script>

<style scoped>
/* 可以添加特定于此组件的样式 */
</style>