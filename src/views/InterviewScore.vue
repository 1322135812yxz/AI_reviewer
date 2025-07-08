<template>
  <div class="score-container bg-gray-100 min-h-screen">
    <!-- 顶部导航栏 -->
    <div class="bg-gray-800 text-white p-3 flex items-center justify-between">
      <!-- 左侧Logo -->
      <div class="flex items-center">
        <div class="flex items-center mr-6">
          <img src="../assets/ai_head.jpg" alt="AI面试官" class="w-6 h-6 mr-2 rounded-full object-cover" />
          <span class="font-bold text-lg">AI面试官</span>
        </div>
      </div>
      
      <!-- 右侧按钮 -->
      <div class="flex items-center space-x-2">
        <button class="bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-1 text-sm" @click="backToHome">
          返回首页
        </button>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="container mx-auto py-6 px-4">
      <!-- 标签切换 -->
      <div class="flex justify-center mb-6">
        <div class="bg-white rounded-full shadow-md inline-flex p-1">
          <button 
            class="px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="activeTab === 'record' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'record'"
          >
            面试记录
          </button>
          <button 
            class="px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            :class="activeTab === 'report' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'"
            @click="activeTab = 'report'"
          >
            评估报告
          </button>
        </div>
      </div>

      <!-- 面试记录内容 -->
      <div v-if="activeTab === 'record'" class="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
        <div class="space-y-6">
          <div v-for="(record, index) in interviewRecords" :key="index" class="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
            <div class="flex items-start mb-4">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                </svg>
              </div>
              <div>
                <div class="text-xs text-gray-500 mb-1">问题 {{ index + 1 }}</div>
                <p class="text-gray-800 font-medium">{{ record.question }}</p>
              </div>
            </div>
            <div class="ml-11">
              <div class="flex items-start">
                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                  <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-xs text-gray-500 mb-1">我的回答</div>
                  <p class="text-gray-700">{{ record.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评估报告内容 -->
      <div v-if="activeTab === 'report'" class="max-w-4xl mx-auto">
        <!-- 总分数卡片 -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <div class="inline-block bg-blue-50 rounded-full p-6 mb-4">
            <div class="relative">
              <svg class="w-32 h-32" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" stroke-width="10" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#3b82f6" stroke-width="10"
                  stroke-dasharray="283" :stroke-dashoffset="283 - (283 * totalScore / 100)" 
                  transform="rotate(-90 50 50)" />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center flex-col">
                <span class="text-4xl font-bold text-blue-600">{{ totalScore }}</span>
                <span class="text-sm text-gray-500">分</span>
              </div>
            </div>
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-2">非常棒</h2>
          <p class="text-gray-600">您的面试表现优秀，展现了良好的专业素养和沟通能力</p>
        </div>

        <!-- 问题评分卡片 -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">问题回答评分</h3>
          <div class="space-y-4">
            <div v-for="(record, index) in interviewRecords" :key="index" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium text-gray-800">问题 {{ index + 1 }}</h4>
                <div class="flex items-center">
                  <div class="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                    <span class="font-bold">{{ record.score }}</span>
                  </div>
                  <span class="text-sm text-gray-500">分</span>
                </div>
              </div>
              <p class="text-sm text-gray-700 mb-2 line-clamp-1">{{ record.question }}</p>
            </div>
          </div>
        </div>

        <!-- 优缺点分析卡片 -->
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">面试表现分析</h3>
          
          <!-- 优点 -->
          <div class="mb-6">
            <h4 class="font-medium text-gray-800 mb-3 flex items-center">
              <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              优点
            </h4>
            <div class="ml-4 space-y-2">
              <div v-for="(strength, index) in strengths" :key="'s'+index" class="flex items-start">
                <span class="text-green-500 mr-2">•</span>
                <p class="text-sm text-gray-700">{{ strength }}</p>
              </div>
            </div>
          </div>
          
          <!-- 缺点 -->
          <div>
            <h4 class="font-medium text-gray-800 mb-3 flex items-center">
              <span class="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              需要改进
            </h4>
            <div class="ml-4 space-y-2">
              <div v-for="(weakness, index) in weaknesses" :key="'w'+index" class="flex items-start">
                <span class="text-red-500 mr-2">•</span>
                <p class="text-sm text-gray-700">{{ weakness }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 能力地图卡片 -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Interview Ability Map</h3>
          
          <div class="flex flex-col md:flex-row items-center">
            <!-- 雷达图 -->
            <div class="relative w-full md:w-1/2 h-64 flex items-center justify-center">
              <svg width="200" height="200" viewBox="0 0 200 200" class="radar-chart">
                <!-- 雷达图网格 -->
                <g class="radar-grid">
                  <path v-for="(path, index) in radarGridPaths" :key="'grid-'+index" 
                        :d="path" stroke="#e5e7eb" stroke-width="1" fill="none" />
                </g>
                
                <!-- 雷达图数据区域 -->
                <path :d="radarPolygonPath" fill="rgba(59, 130, 246, 0.2)" 
                      stroke="#3b82f6" stroke-width="2" stroke-linejoin="round" />
                
                <!-- 雷达图顶点 -->
                <g>
                  <circle v-for="(point, index) in getRadarPoints" :key="'point-'+index"
                          :cx="point.x" :cy="point.y" r="4" fill="#3b82f6" />
                </g>
                
                <!-- 雷达图标签 -->
                <g>
                  <text 
                    v-for="(dimension, index) in abilityDimensions"
                    :key="'label-'+index"
                    :x="100 + 95 * Math.cos((Math.PI * 2 * index) / abilityDimensions.length - Math.PI / 2)" 
                    :y="90 + 120 * Math.sin((Math.PI * 2 * index) / abilityDimensions.length - Math.PI / 2)" 
                    text-anchor="middle" 
                    dominant-baseline="middle" 
                    class="text-xs font-medium" 
                    fill="#4b5563"
                  >
                    {{ dimension.name }}
                  </text>
                </g>
              </svg>
            </div>
            
            <!-- 能力维度列表 -->
            <div class="w-full md:w-1/2 mt-6 md:mt-0">
              <div class="space-y-4">
                <div v-for="(dimension, index) in abilityDimensions" :key="'dim-'+index" class="flex items-center">
                  <div class="w-24 text-sm text-gray-700">{{ dimension.name }}</div>
                  <div class="flex-1 mx-2">
                    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div class="h-full bg-blue-500 rounded-full" :style="{ width: (dimension.score / dimension.max * 100) + '%' }"></div>
                    </div>
                  </div>
                  <div class="w-10 text-sm font-medium text-gray-700 text-right">{{ dimension.score }}</div>
                </div>
              </div>
              <div class="mt-4 text-sm text-gray-500 text-center">
                能力分数是根据您的面试表现自动生成的，反映了您在每个维度上的相对表现。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { deepseekService } from '../api/deepseekService'

const router = useRouter()
const route = useRoute()

// 当前激活的标签
const activeTab = ref('report')

// 面试记录数据
interface InterviewRecord {
  question: string;
  answer: string;
  timestamp: string;
  score: number; // 每个问题的得分
}

// 能力维度数据结构
interface AbilityDimension {
  name: string;  // 能力名称
  score: number; // 能力得分
  max: number;   // 最大分值
}

// 从路由参数获取面试记录
const interviewRecords = ref<InterviewRecord[]>([])

// 总分数
const totalScore = computed(() => {
  if (interviewRecords.value.length === 0) return 0
  const sum = interviewRecords.value.reduce((acc, record) => acc + record.score, 0)
  return Math.round(sum / interviewRecords.value.length)
})

// 能力维度数据
const abilityDimensions = ref<AbilityDimension[]>([
  { name: '技术能力', score: 76, max: 100 },
  { name: '沟通能力', score: 90, max: 100 },
  { name: '逻辑思维', score: 77, max: 100 },
  { name: '问题解决', score: 91, max: 100 },
  { name: '专业知识', score: 70, max: 100 }
])

// 计算雷达图的坐标点
const getRadarPoints = computed(() => {
  const dimensions = abilityDimensions.value
  const centerX = 100
  const centerY = 100
  const radius = 80
  const points = []
  
  for (let i = 0; i < dimensions.length; i++) {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    const ratio = dimensions[i].score / dimensions[i].max
    const x = centerX + radius * ratio * Math.cos(angle)
    const y = centerY + radius * ratio * Math.sin(angle)
    points.push({ x, y })
  }
  
  return points
})

// 生成雷达图的多边形路径
const radarPolygonPath = computed(() => {
  const points = getRadarPoints.value
  if (points.length === 0) return ''
  
  return points.map((point, index) => {
    return (index === 0 ? 'M' : 'L') + point.x + ',' + point.y
  }).join(' ') + ' Z'
})

// 生成雷达图的网格线路径
const radarGridPaths = computed(() => {
  const dimensions = abilityDimensions.value
  const centerX = 100
  const centerY = 100
  const radius = 80
  const paths = []
  
  // 径向线
  for (let i = 0; i < dimensions.length; i++) {
    const angle = (Math.PI * 2 * i) / dimensions.length - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    paths.push(`M${centerX},${centerY} L${x},${y}`)
  }
  
  // 同心圆
  for (let r = 0.2; r <= 1; r += 0.2) {
    let circlePath = ''
    for (let i = 0; i < 36; i++) {
      const angle = (Math.PI * 2 * i) / 36
      const x = centerX + radius * r * Math.cos(angle)
      const y = centerY + radius * r * Math.sin(angle)
      circlePath += (i === 0 ? 'M' : 'L') + x + ',' + y
    }
    circlePath += ' Z'
    paths.push(circlePath)
  }
  
  return paths
})

// 返回首页
const backToHome = () => {
  router.push('/mock-interview')
}
// 优点列表
const strengths = ref([
  '回答流畅不卡顿',
  '有明确的结题思路和方案，展示了实际解决问题的能力',
  '提供了明确的性能提升数据，表明了结果导向的工作方式'
])

// 缺点列表
const weaknesses = ref([
  '对专业知识的理解还不到位',
  '表达略微笼统，没有深入介绍该专业知识'
])

// 生成面试评分分析
async function generateInterviewAnalysis() {
  try {
    // 显示加载状态
    const loadingStrength = '分析中...';
    const loadingWeakness = '分析中...';
    
    strengths.value = [loadingStrength];
    weaknesses.value = [loadingWeakness];
    
    // 对每个面试问题进行分析并合并结果
    const allStrengths = new Set<string>();
    const allWeaknesses = new Set<string>();
    
    // 限制只分析前3个问题，避免请求过多
    const recordsToAnalyze = interviewRecords.value.slice(0, 3);
    
    for (const record of recordsToAnalyze) {
      const analysis = await deepseekService.generateInterviewAnalysis(
        record.question,
        record.answer
      );

      // 合并分析结果
      if (analysis.strengths && Array.isArray(analysis.strengths)) {
        analysis.strengths.forEach(item  => allStrengths.add(item));
      }
      
      if (analysis.weaknesses && Array.isArray(analysis.weaknesses)) {
        analysis.weaknesses.forEach(item => allWeaknesses.add(item));
      }
    }
    
    // 更新优缺点列表
    strengths.value = Array.from(allStrengths);
    weaknesses.value = Array.from(allWeaknesses);
    
  } catch (error) {
    console.error('生成面试评分分析失败:', error);
    // 设置默认值
    strengths.value = [
      '回答流畅不卡顿',
      '有明确的结题思路和方案，展示了实际解决问题的能力',
      '提供了明确的性能提升数据，表明了结果导向的工作方式'
    ];
    
    weaknesses.value = [
      '对专业知识的理解还不到位',
      '表达略微笼统，没有深入介绍该专业知识'
    ];
  }
}

onMounted(() => {
  // 从路由状态获取面试记录
  if (route.params.records) {
    try {
      interviewRecords.value = JSON.parse(route.params.records as string)
    } catch (e) {
      console.error('解析面试记录失败:', e)
      // 模拟数据
      interviewRecords.value = [
        {
          question: '你在某科技公司负责高性能分布式系统的架构设计，能否详细谈一下你在架构中的具体贡献？你是如何提升系统性能的？',
          answer: '在某科技公司，我主要负责了系统的核心模块设计和优化。首先，我分析了系统的瓶颈，发现主要在于数据处理的并发性和网络传输效率低下。于是，我引入了多线程和异步IO机制，优化了测量策略，减少了线程间的调度开销。同时，我重新设计了数据分片策略，强化了每个节点的负载均衡。通过这些优化，系统的吞吐量提升了30%。',
          timestamp: '10:15:30',
          score: 95
        },
        {
          question: '你是如何处理分布式系统中的一致性问题的？',
          answer: '对于分布式系统中的一致性问题，我采用了多种策略。首先，我们使用了Paxos算法来保证数据的强一致性，特别是对于关键业务数据。对于一些对实时性要求不高的场景，我们采用了最终一致性模型，通过消息队列和异步复制来提高系统的可用性和性能。此外，我们还实现了一套完整的监控和回滚机制，确保在出现不一致时能够快速发现并修复。',
          timestamp: '10:20:45',
          score: 88
        }
      ]
    }
  } else {
    // 如果没有传递面试记录，使用模拟数据
    interviewRecords.value = [
      {
        question: '你在某科技公司负责高性能分布式系统的架构设计，能否详细谈一下你在架构中的具体贡献？你是如何提升系统性能的？',
        answer: '在某科技公司，我主要负责了系统的核心模块设计和优化。首先，我分析了系统的瓶颈，发现主要在于数据处理的并发性和网络传输效率低下。于是，我引入了多线程和异步IO机制，优化了测量策略，减少了线程间的调度开销。同时，我重新设计了数据分片策略，强化了每个节点的负载均衡。通过这些优化，系统的吞吐量提升了30%。',
        timestamp: '10:15:30',
        score: 95
      },
      {
        question: '你是如何处理分布式系统中的一致性问题的？',
        answer: '对于分布式系统中的一致性问题，我采用了多种策略。首先，我们使用了Paxos算法来保证数据的强一致性，特别是对于关键业务数据。对于一些对实时性要求不高的场景，我们采用了最终一致性模型，通过消息队列和异步复制来提高系统的可用性和性能。此外，我们还实现了一套完整的监控和回滚机制，确保在出现不一致时能够快速发现并修复。',
        timestamp: '10:20:45',
        score: 88
      }
    ]
  }
  
  // 生成面试评分分析
  generateInterviewAnalysis();
})
</script>

<style scoped>
.score-container {
  min-height: 100vh;
}

.radar-chart {
  overflow: visible;
}

@media (max-width: 768px) {
  .radar-chart {
    transform: scale(0.8);
    margin: -20px;
  }
}
</style>