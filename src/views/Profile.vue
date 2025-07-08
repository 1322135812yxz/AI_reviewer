<template>
  <div class="profile-page">
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <div class="main-container flex min-h-screen bg-gray-50 pt-24 px-4">
      <div class="profile-content max-w-4xl mx-auto w-full bg-white rounded-lg shadow-md overflow-hidden">
        <!-- 个人资料头部 -->
        <div class="profile-header bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white relative">
          <div class="flex items-center">
            <div class="avatar-container mr-6">
              <img 
                :src="userStore.avatar" 
                alt="用户头像" 
                class="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div class="user-info">
              <h1 class="text-2xl font-bold mb-2">{{ userStore.username }}</h1>
              <p class="text-blue-100">{{ userJobDisplay }}</p>
            </div>
          </div>
        </div>

        <!-- 个人资料详情 -->
        <div class="profile-details p-8">
          <h2 class="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">个人资料</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- 基本信息 -->
            <div class="info-section">
              <h3 class="text-lg font-medium mb-4 text-gray-700">基本信息</h3>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">用户名</div>
                <div class="info-value text-gray-800">{{ userStore.username }}</div>
              </div>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">性别</div>
                <div class="info-value text-gray-800">{{ userStore.sex || '未设置' }}</div>
              </div>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">生日</div>
                <div class="info-value text-gray-800">{{ formatDate(userStore.birthday) }}</div>
              </div>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">职业</div>
                <div class="info-value text-gray-800">{{ userJobDisplay }}</div>
              </div>
            </div>
            
            <!-- 联系方式 -->
            <div class="info-section">
              <h3 class="text-lg font-medium mb-4 text-gray-700">联系方式</h3>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">手机</div>
                <div class="info-value text-gray-800">{{ userStore.phone || '未设置' }}</div>
              </div>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">微信</div>
                <div class="info-value text-gray-800">{{ userStore.wxcount || '未设置' }}</div>
              </div>
              
              <div class="info-item flex mb-4">
                <div class="info-label w-24 text-gray-500">邮箱</div>
                <div class="info-value text-gray-800">{{ userStore.email || '未设置' }}</div>
              </div>
            </div>
          </div>
          
          <!-- 编辑按钮 -->
          <div class="mt-8 flex justify-end">
            <button 
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors duration-300 flex items-center"
              @click="openEditModal"
            >
              <span class="mr-2">✏️</span> 编辑资料
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑资料模态框 -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">编辑个人资料</h3>
        
        <form @submit.prevent="handleUpdateProfile" class="space-y-4">
          <!-- 用户名 -->
          <div class="form-group">
            <label for="edit-username" class="block text-gray-700 mb-1">用户名</label>
            <input 
              type="text" 
              id="edit-username" 
              v-model="editForm.username" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <p class="text-xs text-gray-500 mt-1">用户名不可修改</p>
          </div>
          
          <!-- 性别 -->
          <div class="form-group">
            <label for="edit-gender" class="block text-gray-700 mb-1">性别</label>
            <select 
              id="edit-gender" 
              v-model="editForm.sex" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>
          
          <!-- 生日 -->
          <div class="form-group">
            <label for="edit-birthday" class="block text-gray-700 mb-1">生日</label>
            <input 
              type="date" 
              id="edit-birthday" 
              v-model="editForm.birthday" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <!-- 手机 -->
          <div class="form-group">
            <label for="edit-phone" class="block text-gray-700 mb-1">手机</label>
            <input 
              type="tel" 
              id="edit-phone" 
              v-model="editForm.phone" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <!-- 微信 -->
          <div class="form-group">
            <label for="edit-wxcount" class="block text-gray-700 mb-1">微信</label>
            <input 
              type="text" 
              id="edit-wxcount" 
              v-model="editForm.wxcount" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <!-- 邮箱 -->
          <div class="form-group">
            <label for="edit-email" class="block text-gray-700 mb-1">邮箱</label>
            <input 
              type="email" 
              id="edit-email" 
              v-model="editForm.email" 
              class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <!-- 按钮组 -->
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors duration-300"
              @click="showEditModal = false"
            >
              取消
            </button>
            <button 
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '保存中...' : '保存' }}
            </button>
          </div>
          
          <!-- 错误信息 -->
          <p v-if="updateError" class="text-red-500 text-sm mt-2">{{ updateError }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import NavBar from '../components/NavBar.vue'
import { useUserStore } from '../store/user'
import { getUserInfoAPI, getUserByIdAPI } from '../api/function'
import axios from 'axios'

const userStore = useUserStore()
const showEditModal = ref(false)
const isSubmitting = ref(false)
const updateError = ref('')

// 编辑表单数据
const editForm = reactive({
  username: '',
  sex: '',
  birthday: '',
  phone: '',
  wxcount: '',
  email: ''
})

// 职业映射
const userJobMap: Record<string, string> = {
  '1': '管理员',
  '2': '普通用户', 
  '3': '审计员'
}

// 计算属性：用户职业显示
const userJobDisplay = computed(() => 
  userJobMap[userStore.userjob?.toString()] || userStore.userjob || '未设置'
)

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return '未设置'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (e) {
    return dateString || '未设置'
  }
}

// 初始化编辑表单数据
const initEditForm = () => {
  editForm.username = userStore.username
  editForm.sex = userStore.sex
  editForm.birthday = userStore.birthday
  editForm.phone = userStore.phone
  editForm.wxcount = userStore.wxcount
  editForm.email = userStore.email
}

// 打开编辑模态框
const openEditModal = () => {
  initEditForm()
  showEditModal.value = true
  updateError.value = ''
}

// 处理更新个人资料
const handleUpdateProfile = async () => {
  try {
    isSubmitting.value = true
    updateError.value = ''
    
    // 构建更新数据
    const updateData = {
      id: userStore.id,
      name: editForm.username,
      sex: editForm.sex,
      birthday: editForm.birthday,
      phone: editForm.phone,
      wxcount: editForm.wxcount || 'null',
      email: editForm.email || 'null',
      userjob: userStore.userjob
    }
    
    // 调用更新接口
    const response = await axios.get('/user/updata', { params: updateData })
    
    if (response.data && response.data.status === 200) {
      // 更新成功，刷新用户信息
      const userResponse = await getUserByIdAPI(userStore.id || 0)
      if (userResponse && userResponse.data && userResponse.data.user) {
        userStore.login(userResponse.user)
      }
      
      showEditModal.value = false
    } else {
      updateError.value = response.data?.message || '更新失败，请稍后再试'
    }
  } catch (error) {
    console.error('更新个人资料失败:', error)
    updateError.value = '更新请求失败，请稍后再试'
  } finally {
    isSubmitting.value = false
  }
}

// 页面加载时获取最新的用户信息
onMounted(async () => {
  try {
    // 只有当用户已登录时才获取用户信息
    if (userStore.isLoggedIn) {
      const response = await getUserInfoAPI()
      if (response && response.data && response.data.user) {
        // 更新用户信息
        userStore.login(response.user)
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
})
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

.avatar-container img {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-item:hover {
  background-color: #f9fafb;
  border-radius: 4px;
  padding: 4px;
  margin-left: -4px;
}

/* 模态框动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>