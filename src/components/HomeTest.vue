<template>
  <div>
    <!-- 顶部导航栏 -->
    <div class="h-1/10 bg-blue-500 text-white p-5 flex items-center justify-between">
      <h2 class="logo">AI面试官</h2>
      <div class="flex items-center space-x-2">
        <div class="flex items-center bg-white rounded p-2 w-75">
          <img src="/src/assets/search.svg" alt="搜索" class="w-6 h-6 mr-2" />
          <input type="text" placeholder="搜索..." class="bg-transparent focus:outline-none text-black w-full" />
        </div>
      </div>
      <nav class="navigation flex space-x-4">
        <a href="#" class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">首页</a>
        <a href="#" class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">简历</a>
        <a href="#" class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">模拟面试</a>
        <a href="#" class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">面试回顾</a>
        <a href="#" class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">题库</a>
        <button class="hover:bg-blue-700 hover:scale-110 transition-transform duration-300 p-2 rounded">登录</button>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="main-container flex gap-6 min-h-screen">
      <!-- 左侧固定学习计划 -->
      <div class="w-80 flex flex-col gap-6 fixed left-4 top-24 bottom-4 z-50 bg-white shadow-lg rounded-lg p-4">
        <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
          <h3 class="text-lg font-semibold text-[#262626] mb-4">学习计划</h3>
          <div class="space-y-4">
            <div v-for="plan in studyPlans" :key="plan.id" class="p-3 bg-[#fafafa] rounded">
              <div class="flex justify-between items-center mb-2">
                <span class="text-[#262626] font-medium">{{ plan.title }}</span>
                <span class="text-sm text-[#8c8c8c]">{{ plan.days }}天计划</span>
              </div>
              <div class="h-2 bg-[#e5e6e8] rounded-full">
                <div 
                  class="h-full bg-[#ffa116] rounded-full transition-all" 
                  :style="{ width: plan.progress + '%' }"
                ></div>
              </div>
            </div>
          </div>
          <button class="mt-4 w-full border border-[#ffa116] text-[#ffa116] py-2 rounded hover:bg-[#fff7e6] transition-colors">
            + 新建计划
          </button>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content bg-white min-h-screen p-8 ml-96 flex-1">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- 统计卡片内容保持不变... -->
        </div>

        <!-- 面试记录区域 -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">近期面试记录</h2>
          <div class="flex space-x-4">
            <button class="px-4 py-2 text-sm bg-[#f8f9fa] rounded-md hover:bg-[#e5e6e8] transition-colors">
              全部状态
            </button>
            <button class="px-4 py-2 text-sm bg-[#f8f9fa] rounded-md hover:bg-[#e5e6e8] transition-colors">
              最新优先
            </button>
          </div>
        </div>

        <!-- 面试记录表格 -->
        <div class="border rounded-lg overflow-hidden p-6">
          <table class="w-full">
            <thead class="bg-[#f8f9fa]">
              <tr>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">职位</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">公司</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">时间</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">状态</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">评分</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="record in interviewRecords" 
                :key="record.id"
                class="hover:bg-[#fafafa] transition-colors border-t"
              >
                <td class="p-4 text-[#262626] text-base">{{ record.position }}</td>
                <td class="p-4 text-[#262626] text-base">{{ record.company }}</td>
                <td class="p-4 text-[#8c8c8c] text-base">{{ record.time }}</td>
                <td class="p-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': record.status === '通过',
                      'bg-red-100 text-red-800': record.status === '未通过',
                      'bg-gray-100 text-gray-800': record.status === '待处理'
                    }"
                    class="px-4 py-2 rounded-full text-base"
                  >
                    {{ record.status }}
                  </span>
                </td>
                <td class="p-4 text-[#ffa116] font-medium">{{ '★'.repeat(record.rating) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 每日一题和推荐 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-[#262626]">每日一面试</h3>
              <span class="text-sm text-[#8c8c8c]">{{ formattedDate }}</span>
            </div>
            <div class="bg-[#fafafa] p-4 rounded mb-4">
              <div class="text-[#262626] font-medium mb-2">今日题目</div>
              <div class="text-[#595959] text-sm">实现二叉树层序遍历</div>
            </div>
            <button class="w-full bg-[#ffa116] hover:bg-[#ff8b00] text-white py-2 rounded transition-colors">
              开始挑战
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <h3 class="text-lg font-semibold text-[#262626] mb-4">推荐</h3>
            <div class="space-y-4">
              <!-- 推荐内容保持不变... -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface StudyPlan {
  id: number
  title: string
  days: number
  progress: number
}

interface InterviewRecord {
  id: number
  position: string
  company: string
  time: string
  status: '通过' | '未通过' | '待处理'
  rating: number
}

const studyPlans = ref<StudyPlan[]>([
  { id: 1, title: '前端基础强化', days: 7, progress: 30 },
  { id: 2, title: '算法专项突破', days: 14, progress: 65 },
  { id: 3, title: '项目经验整理', days: 3, progress: 15 }
])

const interviewRecords = ref<InterviewRecord[]>([
  { id: 1, position: '前端开发工程师', company: '字节跳动', time: '2025-03-20', status: '通过', rating: 4 },
  { id: 2, position: '全栈工程师', company: '阿里巴巴', time: '2025-03-18', status: '待处理', rating: 0 },
  { id: 3, position: 'Vue开发工程师', company: '腾讯', time: '2025-03-15', status: '未通过', rating: 3 },
  { id: 4, position: '前端架构师', company: '华为', time: '2025-03-12', status: '通过', rating: 5 }
])

const formattedDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
})
</script>

<style scoped>
.main-container {
  padding: 20px 40px;
  margin-left: 340px;
  width: calc(100% - 380px);
  max-width: none;
}

.w-80 {
  width: 320px;
  position: fixed;
  left: 20px;
  top: 100px;
  bottom: 20px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
}

.main-content {
  margin-left: 0;
  flex: 1;
  width: 100%;
  min-width: auto;
  padding: 20px 40px;
  box-sizing: border-box;
}

/* 其他样式保持不变... */
</style>
