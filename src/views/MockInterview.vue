<template>
  <div class="app-container">
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container min-h-screen bg-gray-100 pt-6 px-4 md:px-8">
      <!-- 二级导航栏 -->
      <div class="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
        <div class="flex border-b border-gray-200">
          <button 
            @click="switchTab('interview')" 
            class="px-6 py-3 text-sm font-medium transition-colors duration-200 relative"
            :class="activeTab === 'interview' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
          >
          AI mock interview
            <div v-if="activeTab === 'interview'" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          </button>
          <button 
            @click="switchTab('experience')" 
            class="px-6 py-3 text-sm font-medium transition-colors duration-200 relative"
            :class="activeTab === 'experience' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'"
          >
          Interview experience
            <div v-if="activeTab === 'experience'" class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
          </button>
        </div>
      </div>
      
      <!-- AI模拟面试内容 -->
      <div v-if="activeTab === 'interview'" class="flex flex-col lg:flex-row gap-6">
        <!-- 左侧内容区域 -->
        <div class="flex-grow bg-white rounded-xl shadow-md p-6 mb-6">
          <!-- 专项练习区域 -->
          <div class="mb-8">
            <h2 class="text-xl font-bold text-gray-800 mb-4">specialized practice</h2>
            
            <!-- AI面试官区域 -->
            <div v-if="!showAIChat" class="flex mb-6">
              <div class="w-full bg-blue-50 rounded-xl p-4 relative overflow-hidden">
                <div class="flex">
                  <div class="w-2/3 pr-4">
                    <div class="text-blue-600 font-bold mb-1">你好～</div>
                    <div class="text-sm text-gray-700 mb-2">在这里你可以随意发挥，我会根据你的回答进行追问，一个专业的面试官会怎么做，我就会怎么做～</div>
                    <div class="text-sm text-gray-700">开始～</div>
                    
                    <button 
                      @click="startPractice" 
                      class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
                    >
                      开始练习
                    </button>
                  </div>
                  <div class="w-1/3 flex justify-end">
                    <img src="../assets/ai_head.jpg" alt="AI面试官" class="h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
            
            <!-- AI面试官专项训练对话区域 -->
            <div v-if="showAIChat" class="mb-6">
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-lg font-semibold text-gray-800">Specialized training for AI interviewers - {{ selectedTopic }}</h3>
                <button 
                  @click="closeAIChat" 
                  class="text-gray-500 hover:text-gray-700"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <!-- 难度选择 -->
              <div class="flex mb-4 space-x-2">
                <span class="text-sm text-gray-700 mr-2">Difficulty level:</span>
                <button 
                  @click="changeDifficulty('Easy')" 
                  class="px-3 py-1 text-xs rounded-full transition-colors duration-200"
                  :class="selectedDifficulty === 'Easy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                >
                  Easy
                </button>
                <button 
                  @click="changeDifficulty('Medium')" 
                  class="px-3 py-1 text-xs rounded-full transition-colors duration-200"
                  :class="selectedDifficulty === 'Medium' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                >
                Medium
                </button>
                <button 
                  @click="changeDifficulty('Difficulty')" 
                  class="px-3 py-1 text-xs rounded-full transition-colors duration-200"
                  :class="selectedDifficulty === 'Difficulty' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
                >
                Difficulty
                </button>
              </div>
              
              <!-- AI对话组件 -->
              <AIInterviewChat :topic="selectedTopic" :difficulty="selectedDifficulty" />
            </div>
            
            <!-- 面试类型卡片网格 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- 面试主题卡片 -->
              <div v-for="topic in interviewTopics" :key="topic.id" 
                   class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer"
                   @click="startAITraining(topic.name)">
                <div class="flex items-center mb-3">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <!-- 根据主题显示不同图标 -->
                    <svg v-if="topic.icon === 'user'" class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <svg v-else-if="topic.icon === 'document'" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <svg v-else-if="topic.icon === 'lightning'" class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    <svg v-else-if="topic.icon === 'chart'" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    <svg v-else-if="topic.icon === 'video'" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <svg v-else-if="topic.icon === 'id-card'" class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ topic.name }}</h3>
                    <div class="flex mt-1">
                      <span class="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-600 font-medium">
                        {{ topic.id === 'self-intro' || topic.id === 'project' ? '大厂' : 
                           topic.id === 'tech' ? '热门' : 
                           topic.id === 'chart' ? '必问' : 
                           topic.id === 'video' ? '新人必看' : '简历必备' }}
                      </span>
                    </div>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-2">
                  {{ topic.id === 'self-intro' ? '帮你回答各种形式的自我介绍' : 
                     topic.id === 'project' ? '帮你有条理地回答项目介绍及追问' : 
                     topic.id === 'tech' ? '面试官，我的技术能力如何展示？' : 
                     topic.id === 'chart' ? '帮你分析项目中的优势和不足' : 
                     topic.id === 'video' ? '职业规划和面试技巧公开课' : 
                     '教你如何展示个人信息与经历' }}
                </p>
                <div class="flex justify-end">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 模拟真题区域 -->
          <div>
            <h2 class="text-xl font-bold text-gray-800 mb-4">模拟真题</h2>
            
            <!-- 职位筛选 -->
            <div class="flex justify-between items-center mb-6">
              <div class="relative w-64">
                <select class="w-full appearance-none bg-white border border-gray-300 rounded-lg py-2.5 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <option>全部岗位</option>
                  <option>前端开发</option>
                  <option>后端开发</option>
                  <option>产品经理</option>
                  <option>UI设计师</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div class="relative w-72">
                <input type="text" placeholder="输入公司、职位搜索" class="w-full border border-gray-300 rounded-lg py-2.5 px-4 pl-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 面试题目列表 -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <!-- 算法工程师面试题 -->
              <div @click="goToInterviewPrep('算法工程师')" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <span class="text-blue-600 font-bold">算</span>
                    </div>
                    <h3 class="font-semibold text-gray-800">AI mock interview</h3>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mb-2">题目数: <span class="font-semibold text-blue-600">3</span></p>
              </div>
              
              <!-- 字节跳动面试题 -->
              <div @click="goToInterviewPrep('字节跳动')" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center mr-3">
                      <span class="text-teal-600 font-bold">字</span>
                    </div>
                    <h3 class="font-semibold text-gray-800">字节跳动AI模拟面试</h3>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mb-2">题目数: <span class="font-semibold text-blue-600">16</span></p>
              </div>
              
              <!-- 腾讯面试题 -->
              <div @click="goToInterviewPrep('腾讯')" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                      <span class="text-purple-600 font-bold">腾</span>
                    </div>
                    <h3 class="font-semibold text-gray-800">腾讯算法工程师AI模拟面试</h3>
                  </div>
                </div>
                <p class="text-sm text-gray-500 mb-2">题目数: <span class="font-semibold text-blue-600">49</span></p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧面试经验区域 -->
        <div class="w-full lg:w-80">
          <div class="bg-white rounded-xl shadow-md p-5 mb-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-bold text-gray-800">Interview experience</h3>
              <div class="flex space-x-2">
                <button class="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium">New</button>
                <button class="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">Comprehensive</button>
              </div>
            </div>
            
            <!-- 面试经验列表 -->
            <div class="space-y-4">
              <!-- 面试经验项 1 -->
              <div class="border-b border-gray-100 pb-4">
                <div class="text-sm font-medium text-gray-800 mb-1">My Front-End Interview Experience Sharing</div>
                <div class="text-xs text-gray-500 mb-1">04-10 14:30</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 面试经验内容 -->
      <div v-if="activeTab === 'experience'" class="flex flex-col gap-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">面试经验分享</h2>
            <div class="flex space-x-3">
              <button 
                @click="openExperienceDialog" 
                class="text-xs px-4 py-1.5 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors duration-200"
              >
                发布经验
              </button>
              <div class="relative">
                <select v-model="experienceFilter" class="appearance-none bg-white border border-gray-300 rounded-lg py-1.5 px-4 pr-8 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                  <option>软件开发 / 人工智能岗位</option>
                  <option>产品 / 设计岗位</option>
                  <option>市场 / 运营岗位</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 面试经验筛选 -->
          <div class="flex justify-between items-center mb-6">
            <div class="flex space-x-2">
              <button 
                @click="switchExperienceSort('latest')" 
                class="text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
                :class="experienceSort === 'latest' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              >
                最新
              </button>
              <button 
                @click="switchExperienceSort('comprehensive')" 
                class="text-xs px-3 py-1 rounded-full font-medium transition-colors duration-200"
                :class="experienceSort === 'comprehensive' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              >
                综合
              </button>
            </div>
            <div class="relative w-72">
              <input 
                v-model="companySearch" 
                type="text" 
                placeholder="输入公司名称搜索" 
                class="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 text-sm text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm" 
              />
              <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          
          <!-- 面试经验列表 -->
          <div class="space-y-4">
            <div v-for="(experience, index) in interviewExperiences" :key="index" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              <div class="flex items-start mb-3">
                <img :src="experience.avatar" alt="用户头像" class="w-10 h-10 rounded-full object-cover mr-3" />
                <div>
                  <div class="flex items-center">
                    <h3 class="font-semibold text-gray-800 mr-2">{{ experience.author }}</h3>
                    <span v-if="experience.isCreator" class="text-xs px-2 py-0.5 bg-blue-50 rounded-full text-blue-600 font-medium">作者</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-500 mt-1">
                    <span class="mr-2">{{ experience.position }} · {{ experience.salary }}</span>
                    <span>{{ experience.school }} · {{ experience.job }}</span>
                  </div>
                </div>
              </div>
              <div v-if="experience.title" class="font-medium text-gray-800 mb-2">{{ experience.title }}</div>
              <div v-if="experience.company" class="text-sm text-blue-600 mb-2">{{ experience.company }}</div>
              <p class="text-sm text-gray-700 mb-3">
                {{ experience.content }}
              </p>
              <div class="flex justify-between items-center">
                <div class="flex items-center text-xs text-gray-500">
                  <span>{{   '04-10 14:30' }}</span>
                  <span class="mx-2">·</span>
                  <span>阅读 {{ experience.readCount || 0 }}</span>
                </div>
                <div class="flex items-center space-x-4">
                  <button 
                    class="flex items-center hover:text-blue-600 transition-colors duration-200"
                    :class="experience.liked ? 'text-red-500' : 'text-gray-500'"
                    @click="toggleLike(index)"
                  >
                    <svg class="w-4 h-4 mr-1" :fill="experience.liked ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span class="text-xs">{{ experience.likeCount || 0 }}</span>
                  </button>
                  <button 
                    class="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
                    @click="toggleComments(index)"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <span class="text-xs">{{ experience.commentCount || 0 }}</span>
                  </button>
                </div>
              </div>
              
              <!-- 评论区域 -->
              <div v-if="experience.showComments" class="mt-4 pt-3 border-t border-gray-100">
                <h4 class="text-sm font-medium text-gray-700 mb-2">评论 ({{ experience.commentCount || 0 }})</h4>
                
                <!-- 评论列表 -->
                <div v-if="experience.comments && experience.comments.length > 0" class="space-y-3 mb-3">
                  <div v-for="(comment, commentIndex) in experience.comments" :key="commentIndex" class="text-sm">
                    <div class="flex items-start">
                      <div class="flex-grow">
                        <div class="font-medium text-gray-800">{{ comment.author }}</div>
                        <div class="text-gray-600 mt-1">{{ comment.content }}</div>
                        <div class="text-xs text-gray-500 mt-1">{{ comment.time }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- 评论输入框 -->
                <div class="flex mt-2">
                  <input 
                    v-model="experience.newComment" 
                    type="text" 
                    placeholder="添加评论..." 
                    class="flex-grow border border-gray-300 rounded-l-lg py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                  />
                  <button 
                    @click="addComment(index)" 
                    class="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 text-sm font-medium transition-colors duration-200"
                  >
                    发送
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 发布经验对话框 -->
      <ExperienceDialog 
        :show="showExperienceDialog" 
        @close="closeExperienceDialog" 
        @submit="submitExperience"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '../components/NavBar.vue'
import AIInterviewChat from '../components/AIInterviewChat.vue'
import ExperienceDialog from '../components/ExperienceDialog.vue'

const router = useRouter()

// 当前激活的标签页
const activeTab = ref('interview') // 默认显示面试页面
const showAIChat = ref(false)
const selectedTopic = ref('self-intro')
const selectedDifficulty = ref('Medium')

// 面试主题列表
const interviewTopics = [
  { id: 'self-intro', name: '自我介绍', icon: 'user' },
  { id: 'project', name: '项目介绍', icon: 'document' },
  { id: 'tech', name: '技术能力', icon: 'lightning' },
  { id: 'analysis', name: '综合分析', icon: 'chart' },
  { id: 'career', name: '职业规划', icon: 'video' },
  { id: 'personal', name: '个人信息', icon: 'id-card' }
]

// 切换标签页
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// 开始练习，跳转到面试会话页面
const startPractice = () => {
  // 可以选择跳转到面试室或者启动AI对话
  // 这里选择启动AI面试官专项训练对话
  startAITraining('self-introduction')
  // 如果需要跳转到面试室，可以使用下面的代码
  // router.push('/interview-session')
}

// 开始AI面试官专项训练
const startAITraining = (topic: string) => {
  selectedTopic.value = topic
  showAIChat.value = true
  // 滚动到AI对话区域
  setTimeout(() => {
    const aiChatElement = document.querySelector('.ai-interview-chat')
    if (aiChatElement) {
      aiChatElement.scrollIntoView({ behavior: 'smooth' })
    }
  }, 100)
}

// 关闭AI对话
const closeAIChat = () => {
  showAIChat.value = false
}

// 切换难度级别
const changeDifficulty = (difficulty: string) => {
  selectedDifficulty.value = difficulty
}

// 面试经验筛选
const experienceFilter = ref('软件开发 / 人工智能岗位')
const companySearch = ref('')
const experienceSort = ref('latest') // 'latest' 或 'comprehensive'

// 发布经验对话框控制
const showExperienceDialog = ref(false)

// 面试经验数据
const interviewExperiences = ref([
  {
    author: 'ye22',
    isCreator: true,
    avatar: '/src/assets/head.jpg',
    position: '',
    salary: '',
    school: '一个业余爱好者',
    job: '嵌入式软件开发',
    title: '我的前端面试经验分享', // 添加title属性
    company: '某科技公司', // 如果需要company属性也可以添加
    content: '面试经验内容...',
    readCount: 128,
    likeCount: 32,
    commentCount: 2,
    liked: false,
    comments: [
      { author: '张三', content: '非常有用的经验分享！', time: '04-08 15:30' },
      { author: '李四', content: '请问面试官主要问了哪些问题？', time: '04-08 16:45' }
    ]
  }
])



// 跳转到模拟准备页面
const goToInterviewPrep = (company: string) => {
  console.log('跳转到模拟准备页面:', company)
  router.push('/interview-prep')
}

// 切换面试经验排序
const switchExperienceSort = (sort: string) => {
  experienceSort.value = sort
}

// 打开发布经验对话框
const openExperienceDialog = () => {
  showExperienceDialog.value = true
}

// 关闭发布经验对话框
const closeExperienceDialog = () => {
  showExperienceDialog.value = false
}

// 提交面试经验
const submitExperience = (data: any) => {
  console.log('提交的面试经验数据:', data)
  interviewExperiences.value.unshift({
    author: 'Dinus', // 假设当前用户名
    isCreator: true,
    avatar: '/src/assets/head.jpg',
    position: data.position,
    salary: '16/M', // 假设薪资
    school: '业余爱好者', // 假设学校
    job: data.position,
    content: data.content,
    title: data.title,
    company: data.company,
    readCount: 0, // 新发布的经验阅读量为0
    likeCount: 0, // 新发布的经验点赞数为0
    commentCount: 0, // 新发布的经验评论数为0
    liked: false, // 默认未点赞
    comments: [], // 空评论列表
  })
}

// 切换点赞状态
const toggleLike = (index: number) => {
  const experience = interviewExperiences.value[index]
  if (experience.liked) {
    experience.likeCount--
  } else {
    experience.likeCount++
  }
  experience.liked = !experience.liked
}

// 切换评论区显示状态
const toggleComments = (index: number) => {
  const experience = interviewExperiences.value[index]
  experience.showComments = !experience.showComments
}

// 添加评论
const addComment = (index: number) => {
  const experience = interviewExperiences.value[index]
  if (!experience.newComment || experience.newComment.trim() === '') return
  
  // 创建新评论
  const newComment = {
    author: 'ye22', // 假设当前用户名
    content: experience.newComment,
    time: new Date().toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-')
  }
  
  // 添加到评论列表
  if (!experience.comments) experience.comments = []
  experience.comments.push(newComment)
  
  // 更新评论数
  experience.commentCount = (experience.commentCount || 0) + 1
  
  // 清空输入框
  experience.newComment = ''
}
</script>

<style scoped>
/* 可以添加特定于此组件的样式 */
</style>