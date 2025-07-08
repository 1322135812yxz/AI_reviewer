<template>
  <div>
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-8 px-4 md:px-8">
      <!-- 搜索区域 -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="flex flex-col items-center justify-center mb-6">
          <div class="flex items-center mb-4">
            <span class="text-2xl font-bold text-gray-700 mr-2">🧳 找到你心仪的工作 💖</span>
          </div>
          <div class="w-full max-w-2xl relative">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="搜索职位、公司或技能..." 
              class="w-full p-3 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-50"
              @keyup.enter="searchJobs"
            />
            <button 
              @click="searchJobs" 
              class="absolute right-0 top-0 h-full px-6 bg-gray-500 hover:bg-gray-600 text-white rounded-r-full transition-colors duration-300"
            >
              搜索
            </button>
            <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <img src="/src/assets/search.svg" alt="搜索" class="w-5 h-5" />
            </div>
          </div>
        </div>

        <!-- 标签筛选区域 -->

        <div class="flex flex-wrap gap-4">
          <div class="flex items-center">
            <span class="text-gray-600 mr-2">学历要求:</span>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="(edu, index) in educationLevels" 
                :key="'edu-'+index"
                @click="toggleFilter('education', edu.value)"
                :class="[activeFilters.education === edu.value ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200', 
                        'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors duration-200']"
              >
                {{ edu.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div class="mb-4">
        <span class="text-xl font-semibold text-gray-700">🔍 岗位列表</span>
      </div>

      <!-- 岗位列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div 
          v-for="job in jobs" 
          :key="job.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-200">
                {{ job.title }}
              </h3>
              <span class="text-lg font-bold text-gray-500">{{ job.salary }}</span>
            </div>
            
            <div class="text-gray-600 mb-3">{{ job.company }}</div>
            
            <div class="mb-4 text-sm text-gray-500">
              <div>{{ job.address }}</div>
              <div class="flex items-center mt-1">
                <span>学历要求: {{ job.education }}</span>
                <span class="mx-2">|</span>
                <span>招聘人: {{ job.hiringManager }}</span>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 mb-4 line-clamp-2" :title="job.description">
              {{ job.description }}
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-xs text-gray-500">最近活跃: {{ job.lastActive }}</div>
              <a 
                :href="job.link" 
                target="_blank" 
                class="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200"
              >
                查看详情
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控制 -->
      <div class="flex justify-center items-center space-x-2 py-6">
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1" 
          :class="[currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200', 
                  'px-4 py-2 rounded bg-gray-100 text-gray-700 transition-colors duration-200']"
        >
          上一页
        </button>
        
        <div class="flex space-x-1">
          <button 
            v-for="page in displayedPages" 
            :key="page" 
            @click="goToPage(page)" 
            :class="[currentPage === page ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200', 
                    'px-4 py-2 rounded transition-colors duration-200']"
          >
            {{ page }}
          </button>
        </div>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages" 
          :class="[currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200', 
                  'px-4 py-2 rounded bg-gray-100 text-gray-700 transition-colors duration-200']"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import NavBar from '../components/NavBar.vue'
import { getJobPageListAPI, getSalaryByEducationAPI } from '../api/function'

// 定义岗位信息类型
interface JobInfo {
  id: number
  company: string
  title: string
  salary: string
  education: string
  description: string
  hiringManager: string
  lastActive: string
  address: string
  link: string
}

// 响应式状态
const searchQuery = ref('')
const jobs = ref<JobInfo[]>([])
const currentPage = ref(1)
const pageSize = ref(30) // 每页显示30个岗位
const totalJobs = ref(0)
const totalPages = ref(1)
const loading = ref(false)

// 筛选条件
const activeFilters = ref({
  education: ''
})

// 学历要求选项
const educationLevels = [
  { label: '不限', value: '' },
  { label: '大专', value: '大专' },
  { label: '本科', value: '本科' },
  { label: '硕士', value: '硕士' },
  { label: '博士', value: '博士' }
]

// 计算显示哪些页码
const displayedPages = computed(() => {
  const pages = []
  const maxVisiblePages = 5
  
  if (totalPages.value <= maxVisiblePages) {
    // 如果总页数小于等于最大可见页数，显示所有页码
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // 否则，显示当前页附近的页码
    let startPage = Math.max(currentPage.value - Math.floor(maxVisiblePages / 2), 1)
    let endPage = startPage + maxVisiblePages - 1
    
    if (endPage > totalPages.value) {
      endPage = totalPages.value
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// 切换筛选条件
const toggleFilter = (type: 'education', value: string) => {
  if (activeFilters.value[type] === value) {
    // 如果点击的是当前选中的，则取消选择
    activeFilters.value[type] = ''
    // 重置到第一页并重新加载数据
    currentPage.value = 1
    fetchJobs()
  } else {
    // 否则选中点击的选项
    activeFilters.value[type] = value
    
    // 调用后端接口获取对应学历的岗位信息
    fetchJobsByEducation(value)
  }
}

// 获取岗位数据
const fetchJobs = async () => {
  loading.value = true
  try {
    const filters = {
      keyword: searchQuery.value
    }
    const response = await getJobPageListAPI(currentPage.value, pageSize.value, filters)
    
    if (response.status === 200 && response.data) {
      // 根据后端接口返回的数据结构进行处理
      // 后端返回的是记录列表，没有total字段
      jobs.value = response.data.list || []
      
      // 如果后端没有返回总数，则使用当前列表长度作为总数
      // 这可能不准确，但是临时解决方案
      if (response.data.total !== undefined) {
        totalJobs.value = response.data.total
      } else {
        // 如果是第一页且返回的数据少于每页数量，则认为这就是全部数据
        if (currentPage.value === 1 && jobs.value.length < pageSize.value) {
          totalJobs.value = jobs.value.length
        } 
        // 如果返回的数据等于每页数量，则可能还有更多数据
        else if (jobs.value.length === pageSize.value) {
          totalJobs.value = currentPage.value * pageSize.value + pageSize.value
        }
        // 如果是非第一页且返回的数据少于每页数量，则计算总数
        else {
          totalJobs.value = (currentPage.value - 1) * pageSize.value + jobs.value.length
        }
      }
      
      totalPages.value = Math.ceil(totalJobs.value / pageSize.value)
    } else {
      console.error('获取岗位数据失败:', response.message)
    }
  } catch (error) {
    console.error('获取岗位数据出错:', error)
  } finally {
    loading.value = false
  }
}

// 根据学历要求获取岗位数据
const fetchJobsByEducation = async (education: string) => {
  loading.value = true
  try {
    const response = await getSalaryByEducationAPI(education)
    
    if (response.status === 200 && response.data) {
      // 根据后端接口返回的数据结构进行处理
      jobs.value = response.data || []
      totalJobs.value = jobs.value.length
      totalPages.value = Math.ceil(totalJobs.value / pageSize.value)
      currentPage.value = 1 // 重置到第一页
    } else {
      console.error('根据学历获取岗位数据失败:', response.message)
    }
  } catch (error) {
    console.error('根据学历获取岗位数据出错:', error)
  } finally {
    loading.value = false
  }
}

// 搜索岗位
const searchJobs = () => {
  currentPage.value = 1 // 重置到第一页
  fetchJobs()
}

// 页面导航
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// 监听页码变化，重新获取数据
watch(currentPage, () => {
  fetchJobs()
})

// 组件挂载时获取数据
onMounted(() => {
  fetchJobs()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>