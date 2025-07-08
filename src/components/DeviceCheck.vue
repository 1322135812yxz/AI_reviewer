<template>
  <div class="device-check-container">
    <!-- 顶部导航栏 -->
    <NavBar />
    
    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-6 px-4 md:px-8">
      <!-- 进度指示器 -->
      <div class="max-w-4xl mx-auto mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">1</div>
            <div class="ml-2 text-green-500 font-medium">设备检测</div>
            <div class="h-1 w-16 bg-gray-300 mx-2"></div>
          </div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">2</div>
            <div class="ml-2 text-gray-600 font-medium">进入面试间</div>
          </div>
        </div>
      </div>
      
      <!-- 设备检测卡片 -->
      <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">通话设备检测</h2>
            <p class="text-sm text-gray-600">请确认您的摄像头和麦克风可以正常工作</p>
          </div>
          <div class="text-sm text-gray-600">
            面试号：{{ roomId }}
          </div>
        </div>
        
        <div class="flex flex-col md:flex-row gap-6">
          <!-- 左侧摄像头预览 -->
          <div class="flex-1">
            <div class="relative w-full h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <video
                ref="localVideo"
                class="w-full h-full object-cover"
                autoplay
                muted
                playsinline
              ></video>
              <div v-if="!cameraReady" class="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 text-white">
                <div class="text-center">
                  <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <p>摄像头未连接</p>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">切换摄像头：</label>
              <select 
                v-model="selectedCamera" 
                @change="switchCamera"
                class="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
                  {{ camera.label || `摄像头 ${cameras.indexOf(camera) + 1}` }}
                </option>
              </select>
            </div>
          </div>
          
          <!-- 右侧麦克风检测 -->
          <div class="flex-1">
            <div class="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 class="text-lg font-medium text-gray-800 mb-3">麦克风检测</h3>
              <p class="text-sm text-gray-600 mb-4">请说话测试麦克风，清晰说出您的姓名和4位数字</p>
              
              <!-- 麦克风音量可视化 -->
              <div class="mb-4">
                <div class="flex items-center mb-2">
                  <span class="text-sm text-gray-600 mr-2">麦克风音量：</span>
                  <div class="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div 
                      class="bg-blue-500 h-2.5 rounded-full transition-all duration-100"
                      :style="{ width: `${audioLevel}%` }"
                    ></div>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-xs text-gray-500">静音</span>
                  <span class="text-xs text-gray-500">适中</span>
                  <span class="text-xs text-gray-500">响亮</span>
                </div>
              </div>
              
              <!-- 麦克风验证状态 -->
              <div class="flex items-center p-3 rounded-lg" :class="micVerified ? 'bg-green-50' : 'bg-yellow-50'">
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="micVerified ? 'bg-green-100 text-green-500' : 'bg-yellow-100 text-yellow-500'">
                  <svg v-if="micVerified" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium" :class="micVerified ? 'text-green-700' : 'text-yellow-700'">
                    {{ micVerified ? '麦克风工作正常' : '请对着麦克风说话' }}
                  </p>
                  <p class="text-xs" :class="micVerified ? 'text-green-600' : 'text-yellow-600'">
                    {{ micVerified ? '已检测到您的声音' : '我们需要验证您的麦克风是否工作正常' }}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">切换麦克风：</label>
              <select 
                v-model="selectedMicrophone" 
                @change="switchMicrophone"
                class="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option v-for="mic in microphones" :key="mic.deviceId" :value="mic.deviceId">
                  {{ mic.label || `麦克风 ${microphones.indexOf(mic) + 1}` }}
                </option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- 底部按钮 -->
        <div class="mt-8 flex justify-between">
          <button 
            @click="goBack" 
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            返回
          </button>
          <button 
            @click="startInterview" 
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            :disabled="!deviceReady"
            :class="{'opacity-50 cursor-not-allowed': !deviceReady}"
          >
            开始面试
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './NavBar.vue'

const router = useRouter()
const roomId = ref('787288') 

// 设备状态
const cameraReady = ref(false)
const micReady = ref(false)
const micVerified = ref(false)
const audioLevel = ref(0)

// 设备列表
const cameras = ref<MediaDeviceInfo[]>([])
const microphones = ref<MediaDeviceInfo[]>([])
const selectedCamera = ref('')
const selectedMicrophone = ref('')

// 视频和音频流
const localVideo = ref<HTMLVideoElement | null>(null)
const localStream = ref<MediaStream | null>(null)
const audioContext = ref<AudioContext | null>(null)
const audioAnalyser = ref<AnalyserNode | null>(null)

// 计算设备是否都准备好
const deviceReady = computed(() => {
  return cameraReady.value && micReady.value
})

// 获取设备列表
const getDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    
    cameras.value = devices.filter(device => device.kind === 'videoinput')
    microphones.value = devices.filter(device => device.kind === 'audioinput')
    
    if (cameras.value.length > 0) {
      selectedCamera.value = cameras.value[0].deviceId
    }
    
    if (microphones.value.length > 0) {
      selectedMicrophone.value = microphones.value[0].deviceId
    }
    
    // 初始化设备
    await initializeDevices()
  } catch (error) {
    console.error('获取设备列表失败:', error)
  }
}

// 初始化设备
const initializeDevices = async () => {
  try {
    // 停止之前的流
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => track.stop())
    }
    
    // 获取新的媒体流
    const constraints = {
      audio: selectedMicrophone.value ? { deviceId: { exact: selectedMicrophone.value } } : true,
      video: selectedCamera.value ? { deviceId: { exact: selectedCamera.value } } : true
    }
    
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    localStream.value = stream
    
    // 设置视频预览
    if (localVideo.value) {
      localVideo.value.srcObject = stream
      cameraReady.value = true
    }
    
    // 设置音频分析
    setupAudioAnalysis(stream)
    micReady.value = true
  } catch (error) {
    console.error('初始化设备失败:', error)
    cameraReady.value = false
    micReady.value = false
  }
}

// 设置音频分析
const setupAudioAnalysis = (stream: MediaStream) => {
  try {
    // 创建音频上下文
    audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
    audioAnalyser.value = audioContext.value.createAnalyser()
    
    // 连接音频源
    const source = audioContext.value.createMediaStreamSource(stream)
    source.connect(audioAnalyser.value)
    
    // 设置分析器参数
    audioAnalyser.value.fftSize = 256
    const bufferLength = audioAnalyser.value.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)
    
    // 定期分析音频
    const analyzeAudio = () => {
      if (!audioAnalyser.value) return
      
      audioAnalyser.value.getByteFrequencyData(dataArray)
      
      // 计算音量级别 (0-100)
      let sum = 0
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i]
      }
      const average = sum / bufferLength
      audioLevel.value = Math.min(100, Math.round((average / 256) * 100) * 2)
      
      // 如果检测到声音，标记麦克风已验证
      if (audioLevel.value > 10) {
        micVerified.value = true
      }
      
      requestAnimationFrame(analyzeAudio)
    }
    
    analyzeAudio()
  } catch (error) {
    console.error('设置音频分析失败:', error)
  }
}

// 切换摄像头
const switchCamera = async () => {
  await initializeDevices()
}

// 切换麦克风
const switchMicrophone = async () => {
  await initializeDevices()
}

// 返回上一页
const goBack = () => {
  // 停止所有媒体流
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop())
  }
  
  router.push('/interview-prep')
}

// 开始面试
const startInterview = () => {
  // 停止所有媒体流
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop())
  }
  
  router.push('/interview-room')
  console.log('开始面试')
}

// 组件挂载时初始化
onMounted(() => {
  getDevices()
})
</script>

<style scoped>
/* 可以添加特定于此组件的样式 */
</style>