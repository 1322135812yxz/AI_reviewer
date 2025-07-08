<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- 背景遮罩 -->
      <div class="fixed inset-0 transition-opacity" @click="closeDialog">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <!-- 对话框内容 -->
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">发布面试经验</h3>
              
              <!-- 表单内容 -->
              <div class="mt-2 space-y-4">
                <!-- 标题 -->
                <div>
                  <label for="title" class="block text-sm font-medium text-gray-700 mb-1">标题</label>
                  <input 
                    type="text" 
                    id="title" 
                    v-model="formData.title" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="请输入经验标题"
                  />
                </div>
                
                <!-- 公司名称 -->
                <div>
                  <label for="company" class="block text-sm font-medium text-gray-700 mb-1">公司名称</label>
                  <input 
                    type="text" 
                    id="company" 
                    v-model="formData.company" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="请输入公司名称"
                  />
                </div>
                
                <!-- 职位类型 -->
                <div>
                  <label for="position" class="block text-sm font-medium text-gray-700 mb-1">职位类型</label>
                  <select 
                    id="position" 
                    v-model="formData.position" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">请选择职位类型</option>
                    <option value="前端开发">前端开发</option>
                    <option value="后端开发">后端开发</option>
                    <option value="算法工程师">算法工程师</option>
                    <option value="产品经理">产品经理</option>
                    <option value="UI设计师">UI设计师</option>
                  </select>
                </div>
                
                <!-- 面试经验内容 -->
                <div>
                  <label for="content" class="block text-sm font-medium text-gray-700 mb-1">面试经验内容</label>
                  <textarea 
                    id="content" 
                    v-model="formData.content" 
                    rows="6" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="请详细描述您的面试经验，包括面试流程、问题、技巧等"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 按钮区域 -->
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button 
            type="button" 
            @click="submitForm" 
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            发布
          </button>
          <button 
            type="button" 
            @click="closeDialog" 
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'submit'])

// 表单数据
const formData = ref({
  title: '',
  company: '',
  position: '',
  content: ''
})

// 关闭对话框
const closeDialog = () => {
  emit('close')
  // 重置表单
  resetForm()
}

// 提交表单
const submitForm = () => {
  // 表单验证
  if (!formData.value.title) {
    alert('请输入标题')
    return
  }
  if (!formData.value.company) {
    alert('请输入公司名称')
    return
  }
  if (!formData.value.position) {
    alert('请选择职位类型')
    return
  }
  if (!formData.value.content) {
    alert('请输入面试经验内容')
    return
  }

  // 提交数据
  emit('submit', { ...formData.value })
  
  // 关闭对话框并重置表单
  closeDialog()
}

// 重置表单
const resetForm = () => {
  formData.value = {
    title: '',
    company: '',
    position: '',
    content: ''
  }
}
</script>