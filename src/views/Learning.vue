<template>
  <div>
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-8 px-4 md:px-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-700 mb-6">学习中心</h1>
        
        <!-- 学习资源分类 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- 编程语言 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">编程语言</h2>
            <ul class="space-y-2">
              <li v-for="(item, index) in programmingLanguages" :key="'lang-'+index" class="text-gray-600 hover:text-gray-800 cursor-pointer">
                <div @click="goToLanguageLearning(item.name)" class="flex items-center">
                  <span class="mr-2">📚</span>
                  {{ item.name }}
                  <span class="ml-auto text-xs text-gray-500">{{ item.courses }}课程</span>
                </div>
              </li>
            </ul>
          </div>
          
          <!-- 框架与库 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">框架与库</h2>
            <ul class="space-y-2">
              <li v-for="(item, index) in frameworks" :key="'frame-'+index" class="text-gray-600 hover:text-gray-800">
                <a href="#" class="flex items-center">
                  <span class="mr-2">🔧</span>
                  {{ item.name }}
                  <span class="ml-auto text-xs text-gray-500">{{ item.courses }}课程</span>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- 计算机基础 -->
          <div class="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
            <h2 class="text-xl font-semibold text-gray-700 mb-4">计算机基础</h2>
            <ul class="space-y-2">
              <li v-for="(item, index) in computerBasics" :key="'basic-'+index" class="text-gray-600 hover:text-gray-800">
                <a href="#" class="flex items-center">
                  <span class="mr-2">💻</span>
                  {{ item.name }}
                  <span class="ml-auto text-xs text-gray-500">{{ item.courses }}课程</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 推荐学习路径 -->
        <h2 class="text-xl font-semibold text-gray-700 mb-4">推荐学习路径</h2>
        <div class="space-y-4 mb-8">
          <div v-for="(path, index) in learningPaths" :key="'path-'+index" class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-300">
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-gray-800">{{ path.title }}</h3>
              <span class="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{{ path.level }}</span>
            </div>
            <p class="text-gray-600 text-sm mb-3">{{ path.description }}</p>
            <div class="flex justify-between items-center">
              <div class="flex items-center text-xs text-gray-500">
                <span>{{ path.duration }}</span>
                <span class="mx-2">|</span>
                <span>{{ path.modules }}个模块</span>
              </div>
              <button class="text-sm text-white bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded transition-colors duration-200">开始学习</button>
            </div>
          </div>
        </div>
        
        <!-- 最近更新课程 -->
        <h2 class="text-xl font-semibold text-gray-700 mb-4">最近更新课程</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(course, index) in recentCourses" :key="'course-'+index" class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div class="h-40 bg-gray-200 flex items-center justify-center">
              <span class="text-4xl">{{ course.icon }}</span>
            </div>
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-800 mb-2">{{ course.title }}</h3>
              <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ course.description }}</p>
              <div class="flex justify-between items-center">
                <div class="text-xs text-gray-500">{{ course.updateDate }}</div>
                <button class="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200">查看详情</button>
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

// 编程语言数据
const programmingLanguages = ref([
  { name: 'JavaScript', courses: 12 },
  { name: 'Python', courses: 15 },
  { name: 'Java', courses: 10 },
  { name: 'C++', courses: 8 },
  { name: 'Go', courses: 6 }
])

// 框架与库数据
const frameworks = ref([
  { name: 'React', courses: 8 },
  { name: 'Vue', courses: 7 },
  { name: 'Angular', courses: 5 },
  { name: 'Spring Boot', courses: 6 },
  { name: 'Django', courses: 4 }
])

// 计算机基础数据
const computerBasics = ref([
  { name: '数据结构与算法', courses: 10 },
  { name: '操作系统', courses: 6 },
  { name: '计算机网络', courses: 5 },
  { name: '数据库系统', courses: 7 },
  { name: '软件工程', courses: 4 }
])

// 学习路径数据
const learningPaths = ref([
  {
    title: '前端开发工程师',
    level: '入门到进阶',
    description: '从HTML/CSS基础到现代前端框架，全面掌握前端开发技能',
    duration: '3个月',
    modules: 12
  },
  {
    title: '后端Java工程师',
    level: '中级',
    description: '深入学习Java核心技术、Spring框架和微服务架构',
    duration: '4个月',
    modules: 15
  },
  {
    title: '全栈Python开发',
    level: '入门',
    description: '使用Python进行全栈开发，包括Django、Flask和数据分析',
    duration: '2.5个月',
    modules: 10
  }
])

// 跳转到语言学习页面
const goToLanguageLearning = (language: string) => {
  router.push({
    path: `/language-learning/${language}`
  })
}

// 最近更新课程
const recentCourses = ref([
  {
    icon: '🚀',
    title: 'Vue3 + TypeScript实战',
    description: '使用Vue3和TypeScript开发现代化前端应用，包含Composition API和状态管理',
    updateDate: '2023-05-15'
  },
  {
    icon: '🔍',
    title: '算法与数据结构精讲',
    description: '深入浅出讲解常见算法与数据结构，配合LeetCode真题训练',
    updateDate: '2023-05-10'
  },
  {
    icon: '🌐',
    title: 'Spring Cloud微服务架构',
    description: '基于Spring Cloud构建可扩展的微服务系统，包含服务注册、配置中心、网关等组件',
    updateDate: '2023-05-05'
  },
  {
    icon: '📊',
    title: 'Python数据分析与可视化',
    description: '使用Pandas、NumPy和Matplotlib进行数据处理和可视化',
    updateDate: '2023-04-28'
  },
  {
    icon: '📱',
    title: 'React Native移动应用开发',
    description: '使用React Native开发跨平台移动应用，一次编写，随处运行',
    updateDate: '2023-04-20'
  },
  {
    icon: '🔐',
    title: 'Web安全与渗透测试',
    description: '学习常见Web安全漏洞原理和防护措施，掌握基本渗透测试技能',
    updateDate: '2023-04-15'
  }
])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>