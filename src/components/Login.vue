<template>
  <div class="relative h-screen">
    <!-- 背景图片 -->
    <div class="absolute inset-0 bg-cover bg-center z-0" style="background-image: url('/src/assets/Login.jpg');"></div>
    <div class="relative z-10 flex items-center justify-center h-full p-5">
      <div class="flip-container">
        <div :class="['flipper', { 'rotate-y-180': isRegistering }]">
          <!-- 登录表单 -->
          <div class="front bg-blue bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
            <h2 class="logo mb-8">AI面试官</h2>
            <form @submit.prevent="handleSubmit" class="space-y-4 w-full">
              <div>
                <label for="username" class="block text-white">用户名</label>
                <input type="text" id="username" v-model="username" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <div>
                <label for="password" class="block text-white">密码</label>
                <input type="password" id="password" v-model="password" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <div class="flex items-center">
                <input type="checkbox" id="remember" v-model="remember" class="mr-2" />
                <label for="remember" class="text-white">记住密码</label>
              </div>
              <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">登录</button>
            </form>
            <p class="mt-4 text-white">
              <a href="#" @click="toggleForm" class="text-blue-500 hover:underline">注册</a>
            </p>
            <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
          </div>

          <!-- 注册表单 -->
          <div class="back bg-blue bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
            <h2 class="logo mb-8">AI面试官</h2>
            <form @submit.prevent="handleRegister" class="space-y-4 w-full">
              <div>
                <label for="reg-username" class="block text-white">用户名</label>
                <input type="text" id="reg-username" v-model="regUsername" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <div>
                <label for="reg-password" class="block text-white">密码</label>
                <input type="password" id="reg-password" v-model="regPassword" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <div>
                <label for="confirm-password" class="block text-white">再次确认密码</label>
                <input type="password" id="confirm-password" v-model="confirmPassword" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <div>
                <label for="gender" class="block text-white">性别</label>
                <select id="gender" v-model="gender" class="w-full p-2 rounded bg-transparent text-black border border-white" required>
                  <option value="male">男</option>
                  <option value="female">女</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label for="birthday" class="block text-white">生日</label>
                <input type="date" id="birthday" v-model="birthday" class="w-full p-2 rounded bg-transparent text-black border border-white" required />
              </div>
              <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">注册</button>
            </form>
            <p class="mt-4 text-white">
              <a href="#" @click="toggleForm" class="text-blue-500 hover:underline">返回登录</a>
            </p>
            <p v-if="errorMessage" class="mt-4 text-red-500">{{ errorMessage }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLoginAPI, postRegisterAPI } from '../api/function'
import { useUserStore } from '../store/user'

// 定义响应式变量
const username = ref('')
const password = ref('')
const remember = ref(false)
const errorMessage = ref('')
const regUsername = ref('')
const regPassword = ref('')
const confirmPassword = ref('')
const gender = ref('')
const birthday = ref('')
const phone = ref('')
const isRegistering = ref(false)
const router = useRouter()

// 处理登录逻辑
const handleSubmit = async () => {
  try {
    const response = await getLoginAPI({
      name: username.value,
      password: password.value,
    })

    if (response.status !== 200) {
      errorMessage.value = response.message || '登录失败'
    } else {
      console.log('登录成功:', response)
      
      // 使用Pinia存储用户信息
      const userStore = useUserStore()
      if (response.data && response.data.user) {
        const userData = response.data.user
        console.log('User data:', userData)
        console.log('User:', response)
        userStore.login({
          id: userData.id,
          name: userData.name,
          phone: userData.phone || '',
          sex: userData.sex || '',
          wxcount: userData.wxcount || '',
          email: userData.email || '',
          birthday: userData.birthday || '',
          userjob: userData.userjob || ''
        })
      }
      
      router.push('/home')
    }
  } catch (error) {
    console.error('登录请求出错:', error)
    errorMessage.value = '登录请求失败，请稍后再试'
  }
}

// 处理注册逻辑
const handleRegister = async () => {
  if (regPassword.value !== confirmPassword.value) {
    errorMessage.value = '两次输入的密码不一致'
    return
  }

  try {
    const response = await postRegisterAPI({
      name: regUsername.value,
      password: regPassword.value,
      phone: phone.value || '',  // 确保即使为空也传递空字符串
      sex: gender.value,
      wxcount: 'null',
      email: 'null',
      birthday: birthday.value,
      userjob: '2',  // 默认为普通用户
    })

    if (response.status !== 200) {
      errorMessage.value = response.message || '注册失败'
    } else {
      console.log('注册成功:', response)
      
      // 如果注册成功且返回了用户数据，存储到Pinia
      if (response.data && response.data.user) {
        const userData = response.data.user
        const userStore = useUserStore()
        userStore.login({
          id: userData.id,
          name: userData.name,
          phone: userData.phone || '',
          sex: userData.sex || '',
          wxcount: userData.wxcount || '',
          email: userData.email || '',
          birthday: userData.birthday || '',
          userjob: userData.userjob || ''
        })
      }
      
      router.push('/test') 
    }
  } catch (error) {
    console.error('注册请求出错:', error)
    errorMessage.value = '注册请求失败，请稍后再试'
  }
}

// 切换表单
const toggleForm = () => {
  isRegistering.value = !isRegistering.value
}
</script>

<style scoped>
/* 设置 logo 样式 */
.logo {
  font-family: 'Arial', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.flip-container {
  perspective: 1000px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flipper {
  position: relative;
  width: 100%;
  max-width: 400px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.front,
.back {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}

.flip-container {
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}

.rotate-y-180 .back {
  transform: translateY(-100px) rotateY(180deg);
}
</style>
