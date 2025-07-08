<template>
  <div class="p-8 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">就业找工作调查问卷</h1>
    
    <div v-if="loading" class="text-center py-8">
      <p class="text-lg">问卷加载中，请稍候...</p>
    </div>
    
    <div v-else-if="error" class="text-center py-8 text-red-500">
      <p class="text-lg">{{ error }}</p>
      <button @click="fetchQuestions" class="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
        重试
      </button>
    </div>
    
    <form v-else @submit.prevent="handleSubmit">
      <!-- 动态渲染问题 -->
      <div v-for="(question, index) in questions" :key="question.id" class="mb-6 p-4 bg-gray-50 rounded-lg">
        <label class="block text-lg font-medium mb-2">{{ index + 1 }}. {{ question.questions }}</label>
        
        <!-- 单选题 -->
        <div v-if="question.type === 0">
          <label v-if="question.answerOne" class="block mb-2">
            <input 
              type="radio" 
              :name="`question-${question.id}`" 
              v-model="answers[question.id]" 
              value="A" 
            /> {{ question.answerOne }}
          </label>
          <label v-if="question.answerTwo" class="block mb-2">
            <input 
              type="radio" 
              :name="`question-${question.id}`" 
              v-model="answers[question.id]" 
              value="B" 
            /> {{ question.answerTwo }}
          </label>
          <label v-if="question.answerThree" class="block mb-2">
            <input 
              type="radio" 
              :name="`question-${question.id}`" 
              v-model="answers[question.id]" 
              value="C" 
            /> {{ question.answerThree }}
          </label>
          <label v-if="question.answerFour" class="block mb-2">
            <input 
              type="radio" 
              :name="`question-${question.id}`" 
              v-model="answers[question.id]" 
              value="D" 
            /> {{ question.answerFour }}
          </label>
        </div>
        
        <!-- 多选题 -->
        <div v-else-if="question.type === 1">
          <label v-if="question.answerOne" class="block mb-2">
            <input 
              type="checkbox" 
              v-model="multiAnswers[question.id]" 
              value="A" 
            /> {{ question.answerOne }}
          </label>
          <label v-if="question.answerTwo" class="block mb-2">
            <input 
              type="checkbox" 
              v-model="multiAnswers[question.id]" 
              value="B" 
            /> {{ question.answerTwo }}
          </label>
          <label v-if="question.answerThree" class="block mb-2">
            <input 
              type="checkbox" 
              v-model="multiAnswers[question.id]" 
              value="C" 
            /> {{ question.answerThree }}
          </label>
          <label v-if="question.answerFour" class="block mb-2">
            <input 
              type="checkbox" 
              v-model="multiAnswers[question.id]" 
              value="D" 
            /> {{ question.answerFour }}
          </label>
        </div>
        
        <!-- 填空题 -->
        <div v-else-if="question.type === 2">
          <textarea 
            v-model="answers[question.id]" 
            class="w-full p-2 border border-gray-300 rounded" 
            rows="3"
            placeholder="请输入您的回答..."
          ></textarea>
        </div>
      </div>

      <div class="mt-6 flex justify-between">
        <button 
          type="button" 
          @click="resetForm" 
          class="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 transition duration-300"
        >
          重置
        </button>
        <button 
          type="submit" 
          class="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
          :disabled="submitting"
        >
          {{ submitting ? '提交中...' : '提交' }}
        </button>
      </div>
    </form>
    
    <!-- 提交成功提示 -->
    <div v-if="submitted" class="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
      <p class="text-lg font-medium">问卷提交成功！感谢您的参与。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getRandomQuestionsAPI, addUserQuestionAPI } from '../api/function'
import { useUserStore } from '../store/user'

// 初始化路由
const router = useRouter()

// 定义问题类型接口
interface Question {
  id: number
  type: number // 0-单选，1-多选，2-填空
  questions: string
  answerOne: string
  answerTwo: string
  answerThree: string
  answerFour: string
}

// 获取用户信息
const userStore = useUserStore()

// 状态管理
const questions = ref<Question[]>([])
const loading = ref(true)
const error = ref('')
const submitting = ref(false)
const submitted = ref(false)

// 答案管理
const answers = reactive<Record<number, string>>({}) // 单选和填空题
const multiAnswers = reactive<Record<number, string[]>>({}) // 多选题

// 获取问题列表
const fetchQuestions = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await getRandomQuestionsAPI()
    console.log('API返回数据:', response) // 添加日志，查看返回的数据结构
    
    // 检查response的结构，确保能够正确获取问题数组
    if (Array.isArray(response)) {
      // 直接是数组
      questions.value = response
    } else if (response && typeof response === 'object') {
      // 根据后端返回的实际数据结构处理
      if (response.data && Array.isArray(response.data.randomQuestion)) {
        // 从data.randomQuestion获取问题数组
        questions.value = response.data.randomQuestion
      } else if (Array.isArray(response.data)) {
        // data字段直接是数组
        questions.value = response.data
      } else if (response.data && typeof response.data === 'object') {
        // data字段是对象
        if (Array.isArray(response.data.list)) {
          // data.list是数组
          questions.value = response.data.list
        } else if (Array.isArray(response.data.data)) {
          // data.data是数组（有些API会这样嵌套）
          questions.value = response.data.data
        } else {
          // 尝试查找response中的任何数组类型字段
          const arrayField = Object.keys(response).find(key => Array.isArray(response[key]))
          if (arrayField) {
            questions.value = response[arrayField]
          } else {
            throw new Error('无法获取问题列表：数据格式不正确')
          }
        }
      } else {
        throw new Error('无法获取问题列表：数据格式不正确')
      }
    } else {
      throw new Error('无法获取问题列表：返回数据无效')
    }
    
    // 初始化答案对象
    if (Array.isArray(questions.value)) {
      questions.value.forEach(q => {
        if (q.type === 1) { // 多选题
          multiAnswers[q.id] = []
        } else { // 单选题或填空题
          answers[q.id] = ''
        }
      })
    } else {
      throw new Error('问题列表不是数组')
    }
    
  } catch (err) {
    console.error('获取问题失败:', err)
    error.value = '获取问题失败，请稍后重试'
  } finally {
    loading.value = false
  }
}

// 提交问卷
const handleSubmit = async () => {
  if (submitting.value) return
  
  submitting.value = true
  
  try {
    // 检查是否所有问题都已回答
    const unansweredQuestions = questions.value.filter(q => {
      if (q.type === 1) { // 多选题
        return !multiAnswers[q.id] || multiAnswers[q.id].length === 0
      } else { // 单选题或填空题
        return !answers[q.id]
      }
    })
    
    if (unansweredQuestions.length > 0) {
      alert(`请回答所有问题后再提交！还有 ${unansweredQuestions.length} 个问题未回答。`)
      submitting.value = false
      return
    }
    
    // 检查用户ID是否存在
    if (!userStore.id) {
      alert('用户未登录或ID无效，请重新登录后再提交问卷。')
      submitting.value = false
      return
    }
    
    // 准备提交数据
    const submissions = questions.value.map(question => {
      // 确保数据类型符合后端实体类要求
      const userQuestion = {
        userId: Number(userStore.id), // 确保userId为数字类型
        questionId: Number(question.id), // 确保questionId为数字类型
        answer: ''
      }
      
      // 根据问题类型处理答案
      if (question.type === 1) { // 多选题
        userQuestion.answer = multiAnswers[question.id].join(',')
      } else { // 单选题或填空题
        userQuestion.answer = answers[question.id]
      }
      
      // 确保所有字段都有值
      if (!userQuestion.userId || isNaN(userQuestion.userId)) {
        throw new Error('用户ID无效')
      }
      if (!userQuestion.questionId || isNaN(userQuestion.questionId)) {
        throw new Error(`问题ID无效: ${question.id}`)
      }
      if (userQuestion.answer === undefined || userQuestion.answer === null) {
        userQuestion.answer = '' // 确保answer字段至少是空字符串而不是undefined
      }
      
      return userQuestion
    })
    
    // 打印提交数据，便于调试
    console.log('提交的数据:', submissions)
    
    // 提交每个问题的答案
    for (const submission of submissions) {
      // 确保所有字段都有值且类型正确
      if (!submission.userId || !submission.questionId || submission.answer === undefined) {
        throw new Error('提交数据不完整: ' + JSON.stringify(submission))
      }
      await addUserQuestionAPI(submission)
    }
    
    submitted.value = true
    
    // 提交成功后延迟1秒跳转到首页
    setTimeout(() => {
      router.push('/home')
    }, 1000)
    
  } catch (err) {
    console.error('提交问卷失败:', err)
    alert('提交问卷失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  questions.value.forEach(q => {
    if (q.type === 1) { // 多选题
      multiAnswers[q.id] = []
    } else { // 单选题或填空题
      answers[q.id] = ''
    }
  })
  submitted.value = false
}

// 组件挂载时获取问题
onMounted(() => {
  fetchQuestions()
})
</script>

<style scoped>
/* 基础样式已通过Tailwind类应用 */
</style>