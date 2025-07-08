<template>
  <div class="interview-room-container">
    <!-- 顶部导航栏 -->
    <div class="bg-gray-800 text-white p-3 flex items-center justify-between">
      <!-- 左侧Logo和计时器 -->
      <div class="flex items-center">
        <div class="flex items-center mr-6">
          <img src="../assets/ai_head.jpg" alt="AI面试官" class="w-6 h-6 mr-2 rounded-full object-cover" />
          <div class="flex flex-col">
            <span class="font-bold text-lg">AI interviewer</span>
            <span class="text-xs text-gray-300">{{ currentInterviewerType }}interviewer</span>
          </div>
        </div>
        <div class="bg-gray-700 rounded-full px-3 py-1 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ formatTime(elapsedTime) }}</span>
        </div>
      </div>
      
      <!-- 右侧控制按钮 -->
      <div class="flex items-center space-x-2">
        <button class="bg-gray-700 hover:bg-gray-600 rounded-full p-2" title="设置">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </button>
        <button class="bg-red-600 hover:bg-red-700 rounded-full p-2" title="结束面试" @click="endInterview">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="flex h-[calc(100vh-64px)]">
      <!-- 左侧面试问题区域 -->
      <div class="w-1/4 bg-gray-100 border-r border-gray-300 overflow-y-auto p-4">
        
        <div>
          <h2 class="text-lg font-bold text-gray-800 mb-2">Interview transcript</h2>
          <div class="space-y-3">
            <!-- 当前问题 -->
            <div class="bg-white rounded-lg shadow-sm p-3">
              <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">Interviewer · Current issues</div>
                  <p class="text-sm text-gray-800">{{ currentQuestion ? currentQuestion.question : '欢迎参加AI模拟面试，正在加载面试题目...' }}</p>
                </div>
              </div>
            </div>
            
            <!-- 已回答的问题记录 -->
            <div v-for="(record, index) in interviewRecords" :key="index" class="space-y-2">
              <!-- 面试官问题 -->
              <div class="bg-white rounded-lg shadow-sm p-3">
                <div class="flex items-start">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">面试官 · {{ record.timestamp }}</div>
                    <p class="text-sm text-gray-800">{{ record.question }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 面试者回答 -->
              <div class="bg-gray-50 rounded-lg shadow-sm p-3 ml-6">
                <div class="flex items-start">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">面试者 · {{ record.timestamp }}</div>
                    <p class="text-sm text-gray-800">{{ record.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 中央语音输入区域 -->
      <div class="flex-1 flex flex-col bg-gray-50">
        <div class="flex-1 p-6 flex items-center justify-center">
          <div class="text-center max-w-lg">
            <div class="mb-4">
              <h2 class="text-xl font-bold text-gray-800 mb-2">Answer this question by voice.</h2>
              <p class="text-gray-600">Please begin answering after hearing the prompt.</p>
            </div>
            <div class="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4"
                 :class="{ 'bg-red-100': isRecording, 'animate-pulse': isRecording }">
              <div class="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <svg class="w-12 h-12" :class="{ 'text-blue-500': !isRecording, 'text-red-500': isRecording }" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                </svg>
              </div>
            </div>
            <button 
              @click="toggleSpeechRecognition" 
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow-lg transition-colors duration-200"
              :class="{ 'bg-red-500 hover:bg-red-600': isRecording }"
            >
              {{ isRecording ? '提交问题' : 'Answer Questions' }}
            </button>
            
            <!-- 语音识别结果显示区域 -->
            <div v-if="recognitionResult" class="mt-6 p-4 bg-white rounded-lg shadow-sm text-left">
              <h3 class="font-semibold text-gray-800 mb-2">Interviewer's response</h3>
              <p class="text-gray-700">{{ recognitionResult }}</p>
            </div>
          </div>
        </div>
        
        <!-- 底部波形图 -->
        <div class="h-16 bg-white border-t border-gray-300 p-2 flex items-center">
          <div class="flex-1 h-8 flex items-center justify-center">
            <div class="flex items-center space-x-1 h-full">
              <div v-for="i in 30" :key="i" class="w-1 bg-blue-400 rounded-full" 
                   :style="{ height: `${isRecording ? (Math.random() * 100) : (i % 3 === 0 ? 30 : 15)}%` }"></div>
            </div>
          </div>
          <div class="flex items-center space-x-2 ml-4">
            <div class="text-xs text-gray-500">{{ recordingTime }}</div>
          </div>
        </div>
      </div>
      
      <!-- 右侧虚拟面试官和提示区域 -->
      <div class="w-1/4 bg-gray-800 text-white flex flex-col">
        <!-- 虚拟面试官 -->
        <div class="flex-1 flex items-center justify-center p-4">
          <div class="relative w-full h-full rounded-lg overflow-hidden">
            <img src="../assets/ai_head.jpg" alt="虚拟面试官" class="w-full h-full object-cover" />
            
            <!-- 信号指示器 -->
            <div class="absolute top-4 right-4 flex items-center space-x-1">
              <div class="flex items-center space-x-0.5">
                <div class="h-3 w-0.5 bg-white rounded-full"></div>
                <div class="h-4 w-0.5 bg-white rounded-full"></div>
                <div class="h-5 w-0.5 bg-white rounded-full"></div>
              </div>
              <div class="text-xs">00:02</div>
            </div>
            
            <!-- 用户摄像头视频 -->
            <div class="absolute bottom-12 right-4 w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <video ref="userVideo" class="w-full h-full object-cover" autoplay muted></video>
            </div>
            
            <!-- 底部状态栏 -->
            <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <div class="flex justify-between items-center">
                <div class="text-sm font-medium">interviewer</div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs px-2 py-0.5 bg-blue-500 rounded-full">在线</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 面试提示区域 -->
        <div class="h-1/3 bg-gray-900 p-4 overflow-y-auto">
          <h3 class="text-sm font-bold mb-2">Tips</h3>
          <div class="space-y-3 text-sm">
            <div>
              <p class="text-gray-300">1. All interview questions are taken from actual interviews to better simulate real interview scenarios.</p>
            </div>
            <div>
              <p class="text-gray-300">2. Each question will be followed by follow-up questions based on your answers.</p>
            </div>
            <div>
              <p class="text-gray-300">3. If you encounter any problems during the interview, you can click the interview settings button in the upper right corner.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
// 修改导入，同时导入两个API函数
import { getAllQuestionsAPI, getAiQuestionsAPI } from '../api/function'

// 为Web Speech API添加类型声明
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
    speechSynthesis: SpeechSynthesis
    SpeechSynthesisUtterance: typeof SpeechSynthesisUtterance
  }
}

const router = useRouter()
const elapsedTime = ref(0)
let timer: number | null = null

// 语音识别相关状态
const isRecording = ref(false)
const recognitionResult = ref('')
const recordingTime = ref('00:00')
let recordingTimer: number | null = null
let recordingSeconds = 0

// 语音识别实例
let recognition: SpeechRecognition | null = null

// 用户摄像头相关
const userVideo = ref<HTMLVideoElement | null>(null)
let userStream: MediaStream | null = null

// 面试题目相关
interface BankQuestion {
  id: number;
  bank_id: number;
  question: string;
  question_type: string;
}

// 面试记录接口
interface InterviewRecord {
  question: string;
  answer: string;
  timestamp: string;
}

const questions = ref<BankQuestion[]>([])
const currentQuestionIndex = ref(0)
const currentQuestion = ref<BankQuestion | null>(null)
const interviewRecords = ref<InterviewRecord[]>([])

// 语音合成实例
let speechSynthesis: SpeechSynthesis | null = null
let speechUtterance: SpeechSynthesisUtterance | null = null

// 格式化时间显示
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}:${(seconds * 100 % 100).toString().padStart(2, '0')}`
}

// 格式化录音时间
const formatRecordingTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

// 开始计时器
const startTimer = () => {
  timer = window.setInterval(() => {
    elapsedTime.value++
  }, 1000)
}

// 初始化语音识别
const initSpeechRecognition = () => {
  // 检查浏览器是否支持语音识别API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) {
    alert('您的浏览器不支持语音识别功能，请使用Chrome、Edge或Safari浏览器')
    return false
  }
  
  recognition = new SpeechRecognition()
  
  // 配置语音识别
  recognition.lang = 'zh-CN' 
  recognition.continuous = true 
  recognition.interimResults = true 
  recognition.maxAlternatives = 1 
  
  // 监听识别结果事件
  recognition.onresult = (event:any) => {
    let interimTranscript = ''
    let finalTranscript = ''
    
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript
      } else {
        interimTranscript += transcript
      }
    }
    
    // 更新识别结果
    recognitionResult.value = finalTranscript || interimTranscript
  }
  
  // 监听错误事件
  recognition.onerror = (event:any) => {
    console.error('语音识别错误:', event.error)
    if (event.error === 'no-speech') {
      console.log('未检测到语音')
    }
  }
  
  // 监听结束事件
  recognition.onend = () => {
    // 如果仍处于录音状态，则重新开始录音
    if (isRecording.value) {
      recognition?.start()
    }
  }
  
  return true
}

// 切换语音识别状态
const toggleSpeechRecognition = () => {
  if (!recognition && !initSpeechRecognition()) {
    return
  }
  
  if (isRecording.value) {
    // 停止录音
    stopRecording()
    
    // 保存当前问题和回答到面试记录 
    if (currentQuestion.value && recognitionResult.value) {
      interviewRecords.value.push({
        question: currentQuestion.value.question,
        answer: recognitionResult.value,
        timestamp: new Date().toLocaleTimeString()
      })
      
      // 提交问题后，切换到下一个问题并朗读
      moveToNextQuestion()
    } else {
      alert('请先回答当前问题')
    }
  } else {
    // 开始录音
    startRecording()
  }
}

// 开始录音
const startRecording = () => {
  try {
    recognition?.start()
    isRecording.value = true
    recordingSeconds = 0
    recordingTime.value = '00:00'
    
    // 开始录音计时器
    recordingTimer = window.setInterval(() => {
      recordingSeconds++
      recordingTime.value = formatRecordingTime(recordingSeconds)
    }, 1000)
    
    console.log('开始语音识别')
  } catch (error) {
    console.error('启动语音识别失败:', error)
  }
}

// 停止录音
const stopRecording = () => {
  try {
    recognition?.stop()
    isRecording.value = false
    
    // 停止录音计时器
    if (recordingTimer) {
      clearInterval(recordingTimer)
      recordingTimer = null
    }
    
    console.log('停止语音识别')
  } catch (error) {
    console.error('停止语音识别失败:', error)
  }
}

// 结束面试
const endInterview = () => {
  // 如果正在录音，先停止录音
  if (isRecording.value) {
    stopRecording()
  }
  
  if (confirm('确定要结束本次面试吗？')) {
    router.push('/mock-interview')
  }
}

// 初始化用户摄像头
const initUserCamera = async () => {
  try {
    // 请求摄像头权限并获取视频流
    userStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false // 不需要音频，因为我们已经有语音识别功能
    })
    
    // 将视频流设置到video元素
    if (userVideo.value) {
      userVideo.value.srcObject = userStream
    }
    
    console.log('摄像头初始化成功')
  } catch (error) {
    console.error('摄像头初始化失败:', error)
  }
}

// 初始化语音合成
const initSpeechSynthesis = () => {
  // 检查浏览器是否支持语音合成API
  if (!window.speechSynthesis) {
    alert('您的浏览器不支持语音合成功能，请使用Chrome、Edge或Safari浏览器')
    return false
  }
  
  speechSynthesis = window.speechSynthesis
  return true
}

// 使用AI语音朗读文本
const speakText = (text: string) => {
  if (!speechSynthesis && !initSpeechSynthesis()) {
    return
  }
  
  // 如果正在朗读，先停止
  if (speechSynthesis?.speaking) {
    speechSynthesis.cancel()
  }
  
  // 创建语音合成实例
  speechUtterance = new window.SpeechSynthesisUtterance(text)
  
  // 设置语音属性
  speechUtterance.lang = 'zh-CN' // 设置语言为中文
  speechUtterance.rate = 1.0 // 设置语速
  speechUtterance.pitch = 1.0 // 设置音调
  speechUtterance.volume = 1.0 // 设置音量
  
  // 开始朗读
  if(speechSynthesis) {
    speechSynthesis.speak(speechUtterance)
  }
}

// 获取面试题目列表
const fetchQuestions = async () => {
  try {
    // 从localStorage获取链接简历状态和面试官类型
    const linkResume = localStorage.getItem('linkResume') === 'true'
    const interviewerType = localStorage.getItem('selectedInterviewerType') || '综合型'
    let res
    
    if (linkResume) {
      // 如果链接了简历，优先使用AI生成的面试题目
      const aiQuestions = localStorage.getItem('aiGeneratedQuestions')
      const questionsGeneratedFor = localStorage.getItem('questionsGeneratedFor')
      const storedInterviewerType = localStorage.getItem('interviewerType')
      
      if (aiQuestions && questionsGeneratedFor) {
        try {
          const parsedQuestions = JSON.parse(aiQuestions)
          // 转换为BankQuestion格式
          questions.value = parsedQuestions.map((q: any, index: number) => ({
            id: q.id || index + 1,
            bank_id: 1,
            question: q.question,
            question_type: q.question_type || 'general',
            interviewer_focus: q.interviewer_focus || '综合评估'
          })) as BankQuestion[]
          
          console.log('使用AI生成的面试题目:', questions.value)
          console.log('题目生成针对职位:', questionsGeneratedFor)
          console.log('面试官类型:', storedInterviewerType || interviewerType)
          
          if (questions.value.length > 0) {
            currentQuestion.value = questions.value[0]
            // 朗读第一个问题
            speakText(currentQuestion.value.question)
          }
          return
        } catch (error) {
          console.error('解析AI生成的问题失败:', error)
        }
      }
      
      // 如果没有AI生成的问题，回退到后端AI问题
      console.log('未找到AI生成的问题，使用后端AI问题')
      res = await getAiQuestionsAPI('0')
    } else {
      // 如果没有链接简历，使用普通面试题目
      res = await getAllQuestionsAPI()
    }
    
    console.log('API返回的完整响应:', res)
    if (res.data) {
      questions.value = res.data.data as BankQuestion[]
      console.log('解析后的面试题目数组:', questions.value)

      if (questions.value.length > 0) {
        currentQuestion.value = questions.value[0]
        // 朗读第一个问题
        speakText(currentQuestion.value.question)
      }
    }
  } catch (error) {
    console.error('获取面试题目失败:', error)
  }
}

// 切换到下一个问题
const moveToNextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++
    currentQuestion.value = questions.value[currentQuestionIndex.value]
    // 朗读下一个问题
    speakText(currentQuestion.value.question)
  } else {
    // 已完成所有面试题目，跳转到评分界面
    navigateToScorePage()
  }
}

// 跳转到评分界面
const navigateToScorePage = () => {
  // 停止所有正在进行的活动
  if (isRecording.value) {
    stopRecording()
  }
  
  if (speechSynthesis?.speaking) {
    speechSynthesis.cancel()
  }
  
  // 基于AI评估的分数
  const scoredRecords = interviewRecords.value.map(record => ({
    ...record,
    score: Math.floor(Math.random() * 30) + 70 // 生成70-99之间的随机分数
  }))
  
  // 保存面试记录到本地存储，以便在面试回顾模块中查看
  saveInterviewHistory(scoredRecords)
  
  // 将面试记录数据传递给评分界面
  router.push({
    name: 'interview-score',
    params: {
      records: JSON.stringify(scoredRecords)
    }
  })
}

// 保存面试历史记录到本地存储
const saveInterviewHistory = (records: any[]) => {
  try {
    // 获取当前时间作为面试ID和时间戳
    const now = new Date()
    const interviewId = now.getTime()
    const dateStr = now.toLocaleString()
    
    // 创建面试记录对象
    const interviewHistory = {
      id: interviewId,
      title: '模拟面试',
      type: '技术能力',
      date: dateStr,
      totalScore: Math.round(records.reduce((sum, record) => sum + record.score, 0) / records.length),
      questionCount: records.length,
      duration: Math.round(elapsedTime.value / 60), // 转换为分钟
      previewQuestions: records
    }
    
    // 从本地存储获取现有的面试历史记录
    let historyRecords = []
    const storedHistory = localStorage.getItem('interviewHistory')
    if (storedHistory) {
      historyRecords = JSON.parse(storedHistory)
    }
    
    // 添加新的面试记录
    historyRecords.push(interviewHistory)
    
    // 保存回本地存储
    localStorage.setItem('interviewHistory', JSON.stringify(historyRecords))
    
    console.log('面试记录已保存到本地存储')
  } catch (error) {
    console.error('保存面试记录失败:', error)
  }
}

onMounted(() => {
  startTimer()
  // 初始化语音识别
  initSpeechRecognition()
  // 初始化语音合成
  initSpeechSynthesis()
  // 初始化用户摄像头
  initUserCamera()
  // 获取面试题目列表
  fetchQuestions()
})

onBeforeUnmount(() => {
  // 清理计时器
  if (timer) {
    clearInterval(timer)
  }
  
  // 清理录音计时器
  if (recordingTimer) {
    clearInterval(recordingTimer)
  }
  
  // 停止语音识别
  if (recognition && isRecording.value) {
    recognition.stop()
  }
  
  // 停止语音合成
  if (speechSynthesis?.speaking) {
    speechSynthesis.cancel()
  }
  
  // 停止摄像头流
  if (userStream) {
    userStream.getTracks().forEach(track => track.stop())
    userStream = null
  }
})
</script>

<style scoped>
/* 可以添加特定于此组件的样式 */
.interview-room-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>