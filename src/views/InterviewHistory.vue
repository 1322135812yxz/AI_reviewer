<template>
  <div class="history-container bg-gray-100 min-h-screen">
    <!-- 使用NavBar组件替换原有导航栏 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="container mx-auto py-6 px-4">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">面试回顾</h1>
      
      <!-- 筛选和排序工具栏 -->
      <div class="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <!-- 左侧筛选选项 -->
        <div class="flex flex-wrap items-center gap-4">
          <!-- 日期范围选择 -->
          <div class="relative">
            <select v-model="dateFilter" class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="all">全部时间</option>
              <option value="today">今天</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          
          <!-- 面试类型筛选 -->
          <div class="relative">
            <select v-model="typeFilter" class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="all">全部类型</option>
              <option value="self-intro">自我介绍</option>
              <option value="project">项目经验</option>
              <option value="tech">技术能力</option>
              <option value="behavior">行为面试</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
          
          <!-- 分数范围筛选 -->
          <div class="relative">
            <select v-model="scoreFilter" class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="all">全部分数</option>
              <option value="90-100">优秀 (90-100)</option>
              <option value="80-89">良好 (80-89)</option>
              <option value="70-79">一般 (70-79)</option>
              <option value="0-69">需改进 (0-69)</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
        
        <!-- 右侧搜索和排序 -->
        <div class="flex items-center gap-4">
          <!-- 搜索框 -->
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="搜索面试问题" 
              class="w-64 border border-gray-300 rounded-lg py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <!-- 排序选项 -->
          <div class="relative">
            <select v-model="sortOption" class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="date-desc">最新面试</option>
              <option value="date-asc">最早面试</option>
              <option value="score-desc">分数从高到低</option>
              <option value="score-asc">分数从低到高</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 面试记录列表 -->
      <div class="space-y-6">
        <div v-if="filteredInterviewHistory.length === 0" class="bg-white rounded-xl shadow-md p-8 text-center">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-gray-500 text-lg">暂无面试记录</p>
          <button @click="startNewInterview" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm">
            开始一场新的面试
          </button>
        </div>
        
        <div v-for="(interview, index) in filteredInterviewHistory" :key="index" class="bg-white rounded-xl shadow-md overflow-hidden">
          <!-- 面试记录头部 -->
          <div class="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <div class="flex items-center">
                <span class="text-lg font-bold text-gray-800">{{ interview.title }}</span>
                <span :class="getScoreBadgeClass(interview.totalScore)" class="ml-3 px-2 py-0.5 rounded-full text-xs font-medium">
                  {{ interview.totalScore }}分
                </span>
                <span class="ml-2 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                  {{ interview.type }}
                </span>
              </div>
              <div class="text-sm text-gray-500 mt-1">
                {{ interview.date }} · {{ interview.questionCount }}个问题 · {{ interview.duration }}分钟
              </div>
            </div>
            <div class="flex space-x-2">
              <button @click="viewInterviewDetail(interview.id)" class="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                查看详情
              </button>
              <button @click="deleteInterview(interview.id)" class="bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm font-medium transition-colors duration-200">
                删除
              </button>
            </div>
          </div>
          
          <!-- 面试问题预览 -->
          <div class="p-4">
            <div class="space-y-4">
              <div v-for="(question, qIndex) in interview.previewQuestions" :key="qIndex" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div class="flex items-start">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="flex justify-between items-start">
                      <p class="text-gray-800 font-medium">{{ question.question }}</p>
                      <span :class="getScoreBadgeClass(question.score)" class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                        {{ question.score }}分
                      </span>
                    </div>
                    <p class="text-gray-600 text-sm mt-1 line-clamp-2">{{ question.answer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const router = useRouter()

// 筛选和排序状态
const dateFilter = ref('all')
const typeFilter = ref('all')
const scoreFilter = ref('all')
const searchQuery = ref('')
const sortOption = ref('date-desc')

// 面试问题接口
interface InterviewQuestion {
  question: string
  answer: string
  score: number
}

// 面试记录接口
interface InterviewHistory {
  id: number
  title: string
  type: string
  date: string
  totalScore: number
  questionCount: number
  duration: number
  previewQuestions: InterviewQuestion[]
  allQuestions?: InterviewQuestion[]
}

// 从本地存储获取面试历史数据
const interviewHistory = ref<InterviewHistory[]>([])

// 加载面试历史记录
const loadInterviewHistory = () => {
  try {
    const storedHistory = localStorage.getItem('interviewHistory')
    if (storedHistory) {
      interviewHistory.value = JSON.parse(storedHistory)
    }
    
    // 如果没有历史记录，使用一些示例数据
    if (interviewHistory.value.length === 0) {
      interviewHistory.value = [
        {
          id: 1,
          title: '前端开发工程师模拟面试',
          type: '技术能力',
          date: '2023-05-15 14:30',
          totalScore: 92,
          questionCount: 8,
          duration: 45,
          previewQuestions: [
            {
              question: '请详细描述一下React的生命周期及其在项目中的应用',
              answer: 'React的生命周期主要分为挂载、更新和卸载三个阶段。在挂载阶段，组件实例被创建并插入DOM中，依次调用constructor、getDerivedStateFromProps、render和componentDidMount方法。在更新阶段，当组件的props或state发生变化时，依次调用getDerivedStateFromProps、shouldComponentUpdate、render、getSnapshotBeforeUpdate和componentDidUpdate方法。在卸载阶段，组件从DOM中移除时调用componentWillUnmount方法。在我的项目中，我主要在componentDidMount中进行数据获取和事件监听的设置，在componentDidUpdate中根据props或state的变化执行副作用，在componentWillUnmount中清理定时器和事件监听器。',
              score: 95
            },
            {
              question: '谈谈你对虚拟DOM的理解及其优缺点',
              answer: '虚拟DOM是React等现代前端框架中的一个核心概念，它是对真实DOM的一种抽象表示，以JavaScript对象的形式存在。当应用状态变化时，首先更新虚拟DOM，然后通过diff算法比较新旧虚拟DOM的差异，最后只将差异部分应用到真实DOM上。这种方式的优点是减少了直接操作DOM的次数，提高了性能；使开发者可以以声明式的方式编写UI；支持跨平台渲染。缺点是在一些简单场景下可能引入额外的内存消耗；首次渲染可能比直接操作DOM慢；对于一些高频率更新的场景（如动画）可能不是最优选择。',
              score: 90
            }
          ]
        }
      ]
    }
  } catch (error) {
    console.error('加载面试历史记录失败:', error)
    // 如果加载失败，使用空数组
    interviewHistory.value = []
  }
}

// 根据筛选条件过滤面试记录
const filteredInterviewHistory = computed(() => {
  return interviewHistory.value.filter(interview => {
    // 日期筛选
    if (dateFilter.value !== 'all') {
      const interviewDate = new Date(interview.date)
      const today = new Date()
      const isToday = interviewDate.toDateString() === today.toDateString()
      
      if (dateFilter.value === 'today' && !isToday) return false
      
      if (dateFilter.value === 'week') {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(today.getDate() - 7)
        if (interviewDate < oneWeekAgo) return false
      }
      
      if (dateFilter.value === 'month') {
        const oneMonthAgo = new Date()
        oneMonthAgo.setMonth(today.getMonth() - 1)
        if (interviewDate < oneMonthAgo) return false
      }
    }
    
    // 类型筛选
    if (typeFilter.value !== 'all' && interview.type !== typeFilter.value) return false
    
    // 分数筛选
    if (scoreFilter.value !== 'all') {
      const [min, max] = scoreFilter.value.split('-').map(Number)
      if (interview.totalScore < min || interview.totalScore > max) return false
    }
    
    // 搜索查询
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const titleMatch = interview.title.toLowerCase().includes(query)
      const questionMatch = interview.previewQuestions.some(q => 
        q.question.toLowerCase().includes(query) || 
        q.answer.toLowerCase().includes(query)
      )
      if (!titleMatch && !questionMatch) return false
    }
    
    return true
  }).sort((a, b) => {
    // 排序
    switch (sortOption.value) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'score-desc':
        return b.totalScore - a.totalScore
      case 'score-asc':
        return a.totalScore - b.totalScore
      default:
        return 0
    }
  })
})

// 根据分数获取对应的样式类
const getScoreBadgeClass = (score: number) => {
  if (score >= 90) return 'bg-green-100 text-green-800'
  if (score >= 80) return 'bg-blue-100 text-blue-800'
  if (score >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

// 查看面试详情
const viewInterviewDetail = (id: number) => {
  // 在实际应用中，这里应该跳转到面试详情页面
  // 这里模拟跳转到InterviewScore组件
  const interview = interviewHistory.value.find(item => item.id === id)
  if (interview) {
    router.push({
      name: 'interview-score',
      params: {
        records: JSON.stringify(interview.previewQuestions)
      }
    })
  }
}

// 删除面试记录
const deleteInterview = (id: number) => {
  if (confirm('确定要删除这条面试记录吗？')) {
    // 从内存中删除
    interviewHistory.value = interviewHistory.value.filter(item => item.id !== id)
    
    // 更新本地存储
    try {
      localStorage.setItem('interviewHistory', JSON.stringify(interviewHistory.value))
      console.log('面试记录已从本地存储中删除')
    } catch (error) {
      console.error('删除面试记录失败:', error)
    }
  }
}

// 开始新的面试
const startNewInterview = () => {
  router.push('/mock-interview')
}


// 在组件挂载时加载面试历史记录
onMounted(() => {
  // 加载面试历史记录
  loadInterviewHistory()
  console.log('面试历史组件已加载')
})
</script>

<style scoped>
.history-container {
  min-height: 100vh;
}

/* 限制文本行数 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>