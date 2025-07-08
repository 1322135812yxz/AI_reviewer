<template>
  <div class="sticky top-0 z-50 h-1/10 bg-gray-800 text-white p-5 flex items-center w-full">
    <h2 class="logo flex-none mr-8">AI interviewer</h2>
    
    <!-- 搜索框居中 -->
    <div class="flex-grow flex justify-center">
      <div class="flex items-center bg-white rounded p-2 w-75">
        <img src="/src/assets/search.svg" alt="搜索" class="w-6 h-6 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          class="bg-transparent focus:outline-none text-black w-full" 
          v-model="searchQuery"
        />
      </div>
    </div>
    
    <!-- 导航项和用户信息右对齐 -->
    <div class="flex items-center space-x-6">
      <nav class="navigation flex space-x-4">
        <a 
          v-for="(item, index) in navItems" 
          :key="index"
          href="#" 
          class="hover:bg-gray-700 hover:scale-110 transition-transform duration-300 p-2 rounded"
          @click.prevent="handleNavClick(item)"
        >
          {{ item.label }}
        </a>
      </nav>
      
      <div class="flex items-center space-x-4">
        <!-- 功能按钮区域 -->
        <div class="flex items-center mr-2">
          <!-- 信件按钮 -->
          <button class="text-white hover:text-gray-300 transition-colors duration-200 mx-2">
            <img src="/src/assets/mail.svg" alt="信件" class="w-6 h-6" />
          </button>
          
          <!-- 发布按钮 -->
          <button class="text-white hover:text-gray-300 transition-colors duration-200 mx-2">
            <img src="/src/assets/publish.svg" alt="发布" class="w-6 h-6" />
          </button>
        </div>
        
        <!-- 用户头像容器 -->
        <div class="relative user-avatar-container" @mouseenter="showUserMenu = true" @mouseleave="showUserMenu = false">
          <img 
            src="/src/assets/head.jpg"
            class="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 ring-blue-500 transition-all"
          />
          <transition name="menu-fade">
            <div v-if="showUserMenu" class="absolute top-10 right-0 w-56 bg-white rounded-lg shadow-lg py-2 z-50 user-menu">
              <div class="user-info px-4 py-2 border-b">
                <p class="text-gray-800 font-medium">{{ userStore.username }}</p>
                <div class="user-stats flex justify-between text-xs text-gray-500 mt-1">
                  <div class="stat-item text-center">
                    <div>{{ userStore.phone || '未设置' }}</div>
                    <div>手机</div>
                  </div>
                  <div class="stat-item text-center">
                    <div>{{ userStore.wxcount || '未设置' }}</div>
                    <div>微信</div>
                  </div>
                  <div class="stat-item text-center">
                    <div>{{ userJobDisplay }}</div>
                    <div>角色</div>
                  </div>
                </div>
              </div>
              <div class="menu-items">
                <div @click="router.push('/profile')" class="menu-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                  <span class="icon mr-2">👤</span>个人中心
                </div>
                <div class="menu-item flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="logout">
                  <span class="icon mr-2">🚪</span>退出登录
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter} from 'vue-router'
import { useUserStore } from '../store/user'

// 修改这里，直接使用 defineProps 而不赋值给变量
defineProps({
  navItems: {
    type: Array as () => Array<{ label: string; route?: string }>,
    default: () => [
      { label: 'Home', route: '/home' },
      { label: 'Resume', route: '/resume' },
      { label: 'Jobs', route: '/jobs' },
      { label: 'Mock', route: '/mock-interview' },
      { label: 'CV', route: '/review' },
      { label: 'Study', route: '/learning' },
      { label: 'Question', route: '/questions' }
    ]
  }
})


const userJobMap: Record<string, string> = {
  '1': '管理员',
  '2': '普通用户', 
  '3': '审计员'
}

const showUserMenu = ref(false)
const userStore = useUserStore()
const router = useRouter()
const searchQuery = ref('')

// 不再需要点击外部关闭菜单的指令，因为现在使用鼠标悬停
const userJobDisplay = computed(() => 
  userJobMap[userStore.userjob?.toString()] || userStore.userjob
)

const logout = () => {
  userStore.logout()
  router.push('/')
}

const handleNavClick = (item: { route?: string }) => {
  if (item.route) {
    router.push(item.route)
  }
}
</script>

<script lang="ts">
// 为了提供默认导出
export default {
  name: 'NavBar'
}
</script>

<style scoped>
.logo {
  font-size: 1.5rem;
  font-weight: 700;
}

.navigation a {
  padding: 0.5rem 1rem;
}

/* 简历页面顶部横条菜单栏样式 */
.resume-tabs {
  display: flex;
  overflow-x: auto;
  padding-bottom: 2px;
}

.resume-tabs .tab-item {
  padding: 12px 24px;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: all 0.2s;
  color: #6b7280;
}

.resume-tabs .tab-item:hover {
  color: #0284c7;
}

.resume-tabs .tab-item.active {
  color: #0284c7;
  font-weight: 500;
}

.resume-tabs .tab-item.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0284c7;
  border-radius: 2px 2px 0 0;
}

/* 用户头像容器样式 */
.user-avatar-container {
  position: relative;
}

/* 用户菜单样式 */
.user-menu {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  border: 1px solid #eaeaea;
}

.user-menu::before {
  content: '';
  position: absolute;
  top: -6px;
  right: 10px;
  width: 12px;
  height: 12px;
  background-color: white;
  transform: rotate(45deg);
  border-left: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
}

.user-info {
  border-bottom: 1px solid #f0f0f0;
}

.user-stats {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}

.stat-item {
  text-align: center;
  flex: 1;
}

.menu-item {
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

/* 菜单动画效果 */
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
  transform-origin: top right;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 确保菜单在悬停时保持显示 */
.user-avatar-container:hover .user-menu {
  display: block;
}
</style>
