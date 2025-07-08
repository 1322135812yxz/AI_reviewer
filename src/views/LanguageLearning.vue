<template>
  <div>
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-8 px-4 md:px-8">
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <!-- 返回按钮 -->
        <div class="mb-4">
          <button @click="goBack" class="flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            返回学习中心
          </button>
        </div>

        <!-- 语言标题和信息 -->
        <div class="flex items-center mb-6">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-3xl">
            {{ getLanguageIcon(language) }}
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-800">{{ language }} 学习</h1>
            <p class="text-gray-600">{{ getLanguageDescription(language) }}</p>
          </div>
        </div>

        <!-- 学习进度 -->
        <div class="mb-8 bg-gray-50 rounded-lg p-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-medium text-gray-700">学习进度</h3>
            <span class="text-sm text-blue-600">{{ progressPercentage }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- 课程模块 -->
        <div class="mb-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">课程模块</h2>
          <div class="space-y-4">
            <div v-for="(module, index) in getLanguageModules(language)" :key="index" 
                 class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div class="flex items-start">
                <div class="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                  {{ index + 1 }}
                </div>
                <div class="flex-grow">
                  <h3 class="font-medium text-gray-800 mb-1">{{ module.title }}</h3>
                  <p class="text-sm text-gray-600 mb-3">{{ module.description }}</p>
                  <div class="flex justify-between items-center">
                    <div class="flex items-center text-xs text-gray-500">
                      <span>{{ module.duration }}</span>
                      <span class="mx-2">|</span>
                      <span>{{ module.lessons }}课时</span>
                    </div>
                    <button class="text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded transition-colors duration-200">
                      开始学习
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 推荐资源 -->
        <div>
          <h2 class="text-xl font-semibold text-gray-800 mb-4">推荐资源</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(resource, index) in getLanguageResources(language)" :key="index" 
                 class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
              <div class="flex items-center mb-2">
                <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mr-3">
                  <span class="text-xl">{{ resource.icon }}</span>
                </div>
                <h3 class="font-medium text-gray-800">{{ resource.title }}</h3>
              </div>
              <p class="text-sm text-gray-600 mb-2">{{ resource.description }}</p>
              <a :href="resource.link" target="_blank" class="text-sm text-blue-600 hover:underline flex items-center">
                访问资源
                <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()

// 获取路由参数中的语言名称
const language = computed(() => route.params.language as string || '未知语言')

// 模拟学习进度
const progressPercentage = ref(25)

// 返回上一页
const goBack = () => {
  router.push('/learning')
}

// 获取语言图标
const getLanguageIcon = (lang: string) => {
  const icons: Record<string, string> = {
    'JavaScript': '🟨',
    'Python': '🐍',
    'Java': '☕',
    'C++': '⚙️',
    'Go': '🔵'
  }
  return icons[lang] || '📚'
}

// 获取语言描述
const getLanguageDescription = (lang: string) => {
  const descriptions: Record<string, string> = {
    'JavaScript': '前端开发的核心语言，用于构建交互式网页和Web应用程序',
    'Python': '简洁易学的通用编程语言，广泛应用于数据科学、人工智能和Web开发',
    'Java': '强类型、面向对象的编程语言，适用于企业级应用和Android开发',
    'C++': '高性能编程语言，常用于系统软件、游戏开发和资源密集型应用',
    'Go': 'Google开发的高效并发编程语言，适用于云服务和分布式系统'
  }
  return descriptions[lang] || '学习编程的基础知识和实践技能'
}

// 获取语言模块
const getLanguageModules = (lang: string) => {
  const commonModules = [
    {
      title: '环境搭建与基础语法',
      description: '学习开发环境配置和基本语法结构',
      duration: '2小时',
      lessons: 5
    },
    {
      title: '数据类型与变量',
      description: '掌握数据类型、变量声明和基本操作',
      duration: '3小时',
      lessons: 7
    },
    {
      title: '控制流程',
      description: '条件语句、循环和异常处理',
      duration: '2.5小时',
      lessons: 6
    },
    {
      title: '函数与模块化',
      description: '函数定义、参数传递和模块化编程',
      duration: '4小时',
      lessons: 8
    }
  ]

  const specificModules: Record<string, any[]> = {
    'JavaScript': [
      {
        title: 'DOM操作与事件处理',
        description: '学习操作网页元素和响应用户交互',
        duration: '3.5小时',
        lessons: 7
      },
      {
        title: '异步编程与Promise',
        description: '掌握JavaScript的异步编程模型',
        duration: '4小时',
        lessons: 8
      }
    ],
    'Python': [
      {
        title: '数据分析与Pandas',
        description: '使用Pandas进行数据处理和分析',
        duration: '5小时',
        lessons: 10
      },
      {
        title: 'Web开发与Flask',
        description: '使用Flask框架构建Web应用',
        duration: '6小时',
        lessons: 12
      }
    ],
    'Java': [
      {
        title: '面向对象编程',
        description: '深入学习Java的类、继承和多态',
        duration: '5小时',
        lessons: 10
      },
      {
        title: '集合框架与泛型',
        description: '掌握Java集合API和泛型编程',
        duration: '4小时',
        lessons: 8
      }
    ],
    'C++': [
      {
        title: '内存管理',
        description: '学习C++的内存分配和管理',
        duration: '4小时',
        lessons: 8
      },
      {
        title: '模板与STL',
        description: '掌握C++模板和标准模板库',
        duration: '5小时',
        lessons: 10
      }
    ],
    'Go': [
      {
        title: '并发编程',
        description: '学习Go的goroutine和channel',
        duration: '4小时',
        lessons: 8
      },
      {
        title: '网络编程',
        description: '使用Go构建网络应用和服务',
        duration: '5小时',
        lessons: 10
      }
    ]
  }

  return [...commonModules, ...(specificModules[lang] || [])]
}

// 获取语言资源
const getLanguageResources = (lang: string) => {
  const commonResources = [
    {
      icon: '📖',
      title: '官方文档',
      description: '最权威的学习资源和API参考',
      link: '#'
    },
    {
      icon: '🎓',
      title: '在线课程',
      description: '系统学习的视频教程和互动练习',
      link: '#'
    }
  ]

  const specificResources: Record<string, any[]> = {
    'JavaScript': [
      {
        icon: '🛠️',
        title: 'MDN Web Docs',
        description: '最全面的JavaScript参考资料',
        link: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript'
      }
    ],
    'Python': [
      {
        icon: '🐍',
        title: 'Python官方教程',
        description: 'Python语言的官方指南和教程',
        link: 'https://docs.python.org/zh-cn/3/tutorial/'
      }
    ],
    'Java': [
      {
        icon: '☕',
        title: 'Java SE文档',
        description: 'Java标准版的官方文档和教程',
        link: 'https://docs.oracle.com/javase/tutorial/'
      }
    ],
    'C++': [
      {
        icon: '⚙️',
        title: 'C++ Reference',
        description: 'C++语言和标准库的参考资料',
        link: 'https://en.cppreference.com/w/'
      }
    ],
    'Go': [
      {
        icon: '🔵',
        title: 'Go by Example',
        description: '通过示例学习Go编程',
        link: 'https://gobyexample.com/'
      }
    ]
  }

  return [...commonResources, ...(specificResources[lang] || [])]
}
</script>

<style scoped>
/* 可以添加特定的样式 */
</style>