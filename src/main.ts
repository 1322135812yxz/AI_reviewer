import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import './style.css'

// 导入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入 axios 并配置
import axios from 'axios'
import { useUserStore } from './store/user'

// 创建 pinia 实例并配置持久化
const pinia = createPinia()
pinia.use(createPersistedState())

// 创建应用实例
const app = createApp(App)

// 配置 axios
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL
axios.interceptors.request.use(config => {
  const userStore = useUserStore()
  return config
})

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      router.push('/')
    }
    return Promise.reject(error)
  }
)

// 注册插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  size:'default'
})

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('全局错误:', err)
  console.error('错误信息:', info)
}

// 全局属性
app.config.globalProperties.$axios = axios
app.config.globalProperties.$baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL

// 挂载应用
app.mount('#app')
  
