<template>
  <div class="resume-container bg-gray-50 min-h-screen">
    <NavBar/>
    <div class="max-w-7xl mx-auto px-4 py-6">
      
      <div class="flex flex-col md:flex-row gap-6">
        <!-- 左侧导航栏 -->
        <div class="w-full md:w-64 bg-white rounded-lg shadow-sm">
          <div class="p-4 border-b border-gray-100">
            <h2 class="text-lg font-medium text-gray-800">AI面试官简历</h2>
            <p class="text-xs text-gray-500">专业的在线简历编辑器</p>
          </div>
          
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-700 mb-2">我的简历</h3>
            <div class="flex items-center p-2 bg-gray-50 rounded-md mb-4">
              <div class="w-6 h-6 flex-shrink-0 mr-2">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-md bg-orange-100 text-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
              </div>
              <span class="text-sm text-gray-700">未命名简历</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          <div class="px-2">
            <div class="resume-nav">
              <div 
                v-for="(item, index) in navItems" 
                :key="index"
                :class="['nav-item', { 'active': activeSection === item.id }]"
                @click="activeSection = item.id"
              >
                <span class="text-sm">{{ item.label }}</span>
              </div>
              <div class="mt-4 px-2">
                <button class="w-full py-2 px-3 bg-green-50 text-green-600 rounded-md text-sm flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  添加模块
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧内容区 -->
        <div class="flex-1">
          <!-- 简历评分和操作区 -->
          <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
            <div class="flex items-center">
              <div class="flex-1">
                <div class="flex items-center">
                  <img src="../assets/ai_head.jpg" alt="AI" class="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p class="text-xs text-gray-500">简历在线编辑 [全面诊断] [助力求职]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 简历内容区 -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            
            <!-- 基本信息 -->
            <div v-if="activeSection === 'basic'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">基本信息</h2>
                <button
                  v-if="!isEditingBasic"
                  class="text-green-500 hover:text-green-600 transition-colors text-sm"
                  @click="editBasicInfo"
                >编辑</button>
                <button
                  v-else
                  class="text-green-500 hover:text-green-600 transition-colors text-sm"
                  @click="saveBasicInfo"
                >保存</button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex">
                  <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <div class="mb-4">
                      <div class="text-sm text-gray-500">姓名</div>
                      <div class="text-base">
                        <template v-if="isEditingBasic">
                          <input v-model="tempBasic.name" class="border rounded px-2 py-1 w-full" />
                        </template>
                        <template v-else>
                          {{ resumeStore.basic.name }}
                        </template>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">期望职业</div>
                      <div class="text-base">
                        <template v-if="isEditingBasic">
                          <input v-model="tempBasic.identity" class="border rounded px-2 py-1 w-full" />
                        </template>
                        <template v-else>
                          {{ resumeStore.basic.identity }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="mb-4">
                      <div class="text-sm text-gray-500">性别</div>
                      <div class="text-base">
                        <template v-if="isEditingBasic">
                          <select v-model="tempBasic.gender" class="border rounded px-2 py-1 w-full">
                            <option value="男">男</option>
                            <option value="女">女</option>
                          </select>
                        </template>
                        <template v-else>
                          {{ resumeStore.basic.gender }}
                        </template>
                      </div>
                    </div>
                    <div class="mb-4">
                      <div class="text-sm text-gray-500">手机号码</div>
                      <div class="text-base">
                        <template v-if="isEditingBasic">
                          <input v-model="tempBasic.phone" class="border rounded px-2 py-1 w-full" />
                        </template>
                        <template v-else>
                          {{ resumeStore.basic.phone }}
                        </template>
                      </div>
                    </div>
                    <div>
                      <div class="text-sm text-gray-500">邮箱</div>
                      <div class="text-base">
                        <template v-if="isEditingBasic">
                          <input v-model="tempBasic.email" class="border rounded px-2 py-1 w-full" />
                        </template>
                        <template v-else>
                          {{ resumeStore.basic.email }}
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <!-- 教育背景 -->
            <div v-if="activeSection === 'education'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">教育背景</h2>
                <div class="flex items-center">
                  <button class="text-green-500 hover:text-green-600 transition-colors text-sm mr-2">
                    编辑
                  </button>
                  <button class="text-green-500 hover:text-green-600 transition-colors text-sm">
                    添加
                  </button>
                </div>
              </div>
              
              <div class="border border-gray-100 rounded-lg p-4">
                <div class="flex justify-between">
                  <div>
                    <h3 class="text-base font-medium">名牌大学</h3>
                    <p class="text-sm text-gray-600">计算机软件专业 | 本科</p>
                  </div>
                  <div class="text-sm text-gray-500">
                    2025-04 至今
                  </div>
                </div>
              </div>
            </div>
              <!-- 在校经历 -->
            <div v-if="activeSection === 'experience'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">在校经历</h2>
                <div class="flex items-center">
                  <button class="text-green-500 hover:text-green-600 transition-colors text-sm mr-2">
                    编辑
                  </button>
                  <button class="text-green-500 hover:text-green-600 transition-colors text-sm">
                    添加
                  </button>
                </div>
              </div>
              
              <div class="border border-gray-100 rounded-lg p-4">
                <div class="flex justify-between">
                  <div>
                    <h3 class="text-base font-medium text-blue-500 cursor-pointer">社团组织</h3>
                  </div>
                  <div class="text-sm text-gray-500">
                    2025-04 至今
                  </div>
                </div>
              </div>
            </div>
            
              <!-- 工作经历 -->
            <div v-if="activeSection === 'work'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">工作经历</h2>
                <button class="text-green-500 hover:text-green-600 transition-colors text-sm">
                  添加
                </button>
              </div>
              
              <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p class="text-sm">暂无工作经历</p>
              </div>
            </div>
            
              <!-- 项目经历 -->
            <div v-if="activeSection === 'project'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">项目经历</h2>
                <button class="text-green-500 hover:text-green-600 transition-colors text-sm">
                  添加
                </button>
              </div>
              
              <div class="flex flex-col items-center justify-center py-8 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-sm">暂无项目经历</p>
              </div>
            </div>
         
            <!-- 兴趣爱好 -->
            <div v-if="activeSection === 'interests'" class="resume-section">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-medium text-gray-800">兴趣爱好</h2>
                <button 
                  @click="toggleInterestsEditMode" 
                  class="text-green-500 hover:text-green-600 transition-colors text-sm"
                >
                  {{ isEditingInterests ? '保存' : '编辑' }}
                </button>
              </div>
              
              <!-- 编辑模式 -->
              <div v-if="isEditingInterests" class="border border-gray-100 rounded-lg p-4">
                <div class="mb-4">
                  <div class="flex items-center">
                    <input 
                      v-model="newInterest" 
                      type="text" 
                      placeholder="添加新的兴趣爱好" 
                      class="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      @keyup.enter="addInterest"
                    />
                    <button 
                      @click="addInterest" 
                      class="ml-2 bg-green-500 text-white rounded-md px-3 py-2 text-sm hover:bg-green-600 transition-colors"
                    >
                      添加
                    </button>
                  </div>
                </div>
                
                <!-- 兴趣爱好标签列表 -->
                <div class="flex flex-wrap gap-2">
                  <div 
                    v-for="(interest, index) in interests" 
                    :key="index" 
                    class="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700 flex items-center"
                  >
                    {{ interest }}
                    <button 
                      @click="removeInterest(index)" 
                      class="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 展示模式 -->
              <div v-else>
                <!-- 有兴趣爱好时显示 -->
                <div v-if="interests.length > 0" class="border border-gray-100 rounded-lg p-4">
                  <div class="flex flex-wrap gap-2">
                    <div 
                      v-for="(interest, index) in interests" 
                      :key="index" 
                      class="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700"
                    >
                      {{ interest }}
                    </div>
                  </div>
                </div>
                
                <!-- 无兴趣爱好时显示 -->
                <div v-else class="flex flex-col items-center justify-center py-8 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p class="text-sm">暂无兴趣爱好</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 附件简历管理 -->
          <div class="bg-white rounded-lg shadow-sm p-6 mt-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium text-gray-800">附件简历管理</h2>
              <label class="text-green-500 hover:text-green-600 transition-colors text-sm flex items-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                上传
                <input type="file" class="hidden" accept=".pdf,.doc,.docx" @change="uploadResume" />
              </label>
            </div>
           

            <!-- 简历列表 -->
            <div v-if="resumeList.length > 0" class="space-y-3">
              <div v-for="resume in resumeList" :key="resume.id" class="border border-gray-100 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-700 font-medium truncate" :title="resume.originalName">{{ resume.originalName }}</span>
                  <div class="flex space-x-2">
                    <!-- 新增预览按钮 -->
                    <button 
                      @click="previewResume(resume)" 
                      class="text-gray-400 hover:text-blue-600 transition-colors" 
                      title="预览简历"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <!-- 其他按钮 -->
                  </div>
                </div>
              </div>
              <div v-if="pdfUrl" style="height:600px;">
                <iframe :src="pdfUrl" width="100%" height="100%" style="border:none;"></iframe>
              </div>
            </div>

            <!-- 无简历状态 -->
            <div v-else class="flex flex-col items-center justify-center py-8 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-sm">暂无简历，请上传</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue';
import NavBar from '../components/NavBar.vue';
import { 
  uploadResumeAPI, 
  getResumeListAPI, 
  deleteResumeAPI, 
  getCvByTitleAPI,
  addCvAPI,
  updateCvAPI,
  getCvTitleAPI, // 导入获取菜单标题的API
  type Resume,
  type Cv
} from '../api/function';
import toast from 'react-hot-toast';
import { useResumeStore } from '../store/resume';
import { deepseekService } from '../api/deepseekService';

const resumeStore = useResumeStore();
const isEditingBasic = ref(false);
const tempBasic = reactive({ ...resumeStore.basic });

const editBasicInfo = () => {
  isEditingBasic.value = true;
  Object.assign(tempBasic, resumeStore.basic); // 赋值到 reactive 对象
};
const saveBasicInfo = async () => {
  try {
    // 保存基本信息到store
    resumeStore.setBasic({ ...tempBasic });
    
    // 如果期望职业发生了变化，生成新的面试问题
    if (tempBasic.identity && tempBasic.identity !== '请输入期望职业' && tempBasic.identity.trim() !== '') {
      console.log('正在为期望职业生成面试问题:', tempBasic.identity);
      
      // 显示加载提示
      const loadingToast = toast.loading('正在生成面试问题...');
      
      try {
        // 调用Deepseek生成面试问题
        const questions = await deepseekService.generateInterviewQuestions(tempBasic.identity);
        
        // 将生成的问题存储到localStorage
        localStorage.setItem('aiGeneratedQuestions', JSON.stringify(questions));
        localStorage.setItem('questionsGeneratedFor', tempBasic.identity);
        localStorage.setItem('questionsGeneratedTime', new Date().toISOString());
        
        toast.success('面试问题生成成功！', { id: loadingToast });
        console.log('生成的面试问题:', questions);
      } catch (error) {
        console.error('生成面试问题失败:', error);
        toast.error('生成面试问题失败，将使用默认问题', { id: loadingToast });
      }
    }
    
    isEditingBasic.value = false;
    toast.success('基本信息保存成功！');
  } catch (error) {
    console.error('保存基本信息失败:', error);
    toast.error('保存失败，请重试');
  }
};
// 左侧导航栏当前选中的部分
const activeSection = ref('basic');

// 左侧导航栏项目 - 改为从后端获取，不再使用硬编码数据
const navItems = ref<{id: string, label: string}[]>([]);

//pdf展示
const pdfUrl = ref('');
// 获取用户ID
const userId = computed(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      const userObj = JSON.parse(user);
      return userObj.id || 1;
    } catch (e) {
      console.error('解析用户信息失败:', e);
      return 1; // 默认用户ID
    }
  }
  return 1; // 默认用户ID
});


// 简历列表
const resumeList = ref<Resume[]>([]);
// 选中的简历ID
const selectedResumeId = ref<number | null>(null);

// 加载状态
const loading = ref(false);
// 上传错误信息
const uploadError = ref('');

// 兴趣爱好相关状态和方法
const isEditingInterests = ref(false);
const interests = ref<string[]>([]);
const newInterest = ref('');

// 在线简历数据
const cvData = ref<Cv | null>(null);

// 切换兴趣爱好编辑模式
const toggleInterestsEditMode = () => {
  isEditingInterests.value = !isEditingInterests.value;
  // 如果退出编辑模式，清空输入框
  if (!isEditingInterests.value) {
    newInterest.value = '';
    // 保存兴趣爱好到在线简历
    if (cvData.value) {
      try {
        const content = JSON.parse(cvData.value.content || '{}');
        content.interests = interests.value;
        cvData.value.content = JSON.stringify(content);
        updateCvAPI(cvData.value);
      } catch (e) {
        console.error('保存兴趣爱好失败:', e);
      }
    }
  }
};

// 添加兴趣爱好
const addInterest = () => {
  if (newInterest.value.trim()) {
    // 避免添加重复的兴趣爱好
    if (!interests.value.includes(newInterest.value.trim())) {
      interests.value.push(newInterest.value.trim());
    }
    newInterest.value = '';
  }
};

// 删除兴趣爱好
const removeInterest = (index: number) => {
  interests.value.splice(index, 1);
};

// 获取简历列表
const fetchResumeList = async () => {
  try {
    loading.value = true;
    const response = await getResumeListAPI(userId.value);
    console.log('获取简历列表响应:', response);

    // 正确解析后端返回结构
    if (response.status === 200 && response.data && Array.isArray(response.data.resumes)) {
      resumeList.value = response.data.resumes;
    } else {
      resumeList.value = [];
      console.error('获取简历列表失败:', response.message || response.msg);
    }
  } catch (error) {
    console.error('获取简历列表失败:', error);
    toast.error('获取简历列表失败');
    resumeList.value = [];
  } finally {
    loading.value = false;
  }
};

// 获取在线简历数据
const fetchCvData = async () => {
  try {
    loading.value = true;
    const response = await getCvByTitleAPI('default', userId.value);
    console.log('获取在线简历响应:', response);
    
  } catch (error) {
    console.error('获取在线简历失败:', error);
    // 创建默认简历
    createDefaultCv();
  } finally {
    loading.value = false;
  }
};

// 创建默认在线简历
const createDefaultCv = async () => {
  try {
    const defaultContent = {
      basic: {
        name: '',
        gender: '',
        phone: '',
        email: '',
        identity: ''
      },
      education: [
        {
          school: '名牌大学',
          major: '计算机软件专业',
          degree: '本科',
          startDate: '2025-04',
          endDate: '至今'
        }
      ],
      experience: [
        {
          organization: '社团组织',
          startDate: '2025-04',
          endDate: '至今'
        }
      ],
      work: [],
      project: [],
      skills: [],
      interests: ['编程', '阅读', '旅行']
    };
    
    const newCv: Cv = {
      user_id: userId.value,
      title: 1, // 默认标题
      content: JSON.stringify(defaultContent)
    };
    
    const response = await addCvAPI(newCv);
    console.log('创建默认简历响应:', response);
    
    if (response.status === 200 && response.data) {
      cvData.value = response.data;
      interests.value = defaultContent.interests;
    }
  } catch (error) {
    console.error('创建默认简历失败:', error);
    toast.error('创建默认简历失败');
  }
};

// 上传简历
const uploadResume = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;
  
  const file = input.files[0];
  try {
    loading.value = true;
    uploadError.value = '';
    
    const response = await uploadResumeAPI(file, userId.value);
    console.log('简历上传响应:', response);
    
    if (response.status === 200) {
      toast.success('简历上传成功');
      // 刷新简历列表
      await fetchResumeList();
    } else {
      uploadError.value = response.msg || '简历上传失败';
      toast.error(uploadError.value);
    }
  } catch (error) {
    console.error('简历上传失败:', error);
    uploadError.value = '简历上传失败，请稍后再试';
    toast.error(uploadError.value);
  } finally {
    loading.value = false;
    // 清空文件输入框，允许重复上传同一文件
    if (input) {
      input.value = '';
    }
  }
};

// 预览简历（点击简历列表的“预览”按钮时调用）
const previewResume = (resume: Resume) => {
  selectedResumeId.value = resume.id!;
  // 直接用id拼接后端下载接口：
  pdfUrl.value = `/api/resume/download/${resume.id}`;
};

// 预览简历
// const previewResume = (id: number) => {
//   if (selectedResumeId.value === id) {
//     selectedResumeId.value = null;
//   } else {
//     selectedResumeId.value = id;
//     // 在新窗口中打开简历预览
//     window.open(getResumeViewURL(id), '_blank');
//   }
// };

// 删除简历
const deleteResume = async (id: number) => {
  if (!confirm('确定要删除这份简历吗？')) {
    return;
  }
  
  try {
    loading.value = true;
    const response = await deleteResumeAPI(id);
    console.log('删除简历响应:', response);
    
    if (response.status === 200) {
      toast.success('简历删除成功');
      // 刷新简历列表
      await fetchResumeList();
      // 如果当前选中的是被删除的简历，清除选中状态
      if (selectedResumeId.value === id) {
        selectedResumeId.value = null;
      }
    } else {
      toast.error(response.msg || '简历删除失败');
    }
  } catch (error) {
    console.error('简历删除失败:', error);
    toast.error('简历删除失败，请稍后再试');
  } finally {
    loading.value = false;
  }
};

// 格式化文件大小
const formatFileSize = (size: number | undefined): string => {
  if (!size) return '0 B';
  
  const units = ['B', 'KB', 'MB', 'GB'];
  let formattedSize = size;
  let unitIndex = 0;
  
  while (formattedSize >= 1024 && unitIndex < units.length - 1) {
    formattedSize /= 1024;
    unitIndex++;
  }
  
  return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
};

// 组件挂载时获取简历列表和在线简历数据
onMounted(() => {
  fetchResumeList();
  fetchCvData();
});

// 获取简历菜单栏标题
const fetchCvTitle = async () => {
  try {
    const response = await getCvTitleAPI();
    console.log('获取简历菜单标题响应:', response);
    
    if (response.status === 200 && response.data && response.data.list && response.data.list.length > 0) {
      const titleData = response.data.list[0];
      
      // 更新菜单项
      const newNavItems = [];
      
      if (titleData.titleOne) {
        newNavItems.push({ id: 'basic', label: titleData.titleOne });
      } else {
        newNavItems.push({ id: 'basic', label: '基本信息' }); // 默认值
      }
      
      if (titleData.titleTwo) {
        newNavItems.push({ id: 'education', label: titleData.titleTwo });
      } else {
        newNavItems.push({ id: 'education', label: '教育背景' }); // 默认值
      }
      
      if (titleData.titleThree) {
        newNavItems.push({ id: 'experience', label: titleData.titleThree });
      } else {
        newNavItems.push({ id: 'experience', label: '在校经历' }); // 默认值
      }
      
      if (titleData.titleFour) {
        newNavItems.push({ id: 'work', label: titleData.titleFour });
      } else {
        newNavItems.push({ id: 'work', label: '工作经历' }); // 默认值
      }
      
      if (titleData.titleFive) {
        newNavItems.push({ id: 'project', label: titleData.titleFive });
      } else {
        newNavItems.push({ id: 'project', label: '项目经历' }); // 默认值
      }
      
      // 添加固定的"兴趣爱好"选项
      newNavItems.push({ id: 'interests', label: '兴趣爱好' });
      
      // 更新导航项
      navItems.value = newNavItems;
    } else {
      // 如果后端没有返回数据，使用默认菜单项
      setDefaultNavItems();
    }
  } catch (error) {
    console.error('获取简历菜单标题失败:', error);
    // 保留默认菜单项
    setDefaultNavItems();
  }
};

// 设置默认菜单项
const setDefaultNavItems = () => {
  navItems.value = [
    { id: 'basic', label: '基本信息' },
    { id: 'education', label: '教育背景' },
    { id: 'experience', label: '在校经历' },
    { id: 'work', label: '工作经历' },
    { id: 'project', label: '项目经历' },
    { id: 'interests', label: '兴趣爱好' },
  ];
};

// 组件挂载时获取简历列表、在线简历数据和菜单标题
onMounted(() => {
  fetchResumeList();
  fetchCvData();
  fetchCvTitle(); // 获取菜单标题
});
</script>

<style scoped>
.resume-nav .nav-item {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.resume-nav .nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.resume-nav .nav-item.active {
  background-color: rgba(16, 185, 129, 0.1);
  color: rgb(16, 185, 129);
}
.resume-container {
  color: #333;
}

/* 左侧导航栏样式 */
.resume-nav .nav-item {
  padding: 10px 16px;
  margin-bottom: 4px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.resume-nav .nav-item:hover {
  background-color: #f3f4f6;
}

.resume-nav .nav-item.active {
  background-color: #f0f9ff;
  color: #0284c7;
  font-weight: 500;
}

.resume-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>