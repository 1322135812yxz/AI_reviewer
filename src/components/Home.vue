<template>
  <div>
    <!-- 顶部导航栏组件 -->
    <NavBar />

    <!-- 主内容区域 -->
    <div class="main-container flex gap-6 min-h-screen">
      <!-- 左侧固定打卡记录 -->
      <div class="w-80 flex flex-col gap-6 fixed left-4 top-24 bottom-4 z-50 bg-white shadow-lg rounded-lg p-4">
        <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
          <h3 class="text-lg font-semibold text-[#262626] mb-4">打卡记录</h3>
          <div class="space-y-4" v-if="checkInRecords.length > 0">
            <div 
              v-for="record in checkInRecords" 
              :key="record.id" 
              class="p-3 bg-[#fafafa] rounded cursor-pointer"
              @click="viewCheckInDetails(record)"
            >
              <div class="flex justify-between items-center mb-2">
                <span class="text-[#262626] font-medium">{{ record.date }}</span>
                <span class="text-sm text-[#8c8c8c]">{{ record.time }}</span>
              </div>
              <!-- 可以添加打卡备注等信息 -->
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-4">
            暂无打卡记录
          </div>
          <!-- 新建打卡按钮 -->
          <el-button
            class="mt-4 w-full border border-[#ffa116] text-[#ffa116] py-2 rounded hover:bg-[#fff7e6] transition-colors"
            @click="showAddDialog = true">
            + 今日打卡
          </el-button>
          
          <!-- "今日打卡"对话框 -->
          <el-dialog v-model="showAddDialog" title="今日打卡" width="30%" center>
            <p class="text-center">确定要完成今日打卡吗？</p>
            <template #footer>
              <div class="dialog-footer flex justify-end space-x-2">
                <el-button @click="showAddDialog = false">取消</el-button>
                <el-button type="primary" @click="addCheckIn">
                  确认打卡
                </el-button>
              </div>
            </template>
          </el-dialog>


          <!-- 打卡详情对话框 -->
          <el-dialog v-model="showDetailsDialog" title="打卡详情" width="40%">
            <div v-if="selectedCheckIn">
              <p><strong>打卡日期:</strong> {{ selectedCheckIn.date }}</p>
              <p><strong>打卡时间:</strong> {{ selectedCheckIn.time }}</p>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="showDetailsDialog = false">关闭</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="main-content bg-white min-h-screen p-8 ml-96 flex-1">
        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- 统计卡片内容保持不变... -->
           <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <h3 class="text-lg font-semibold text-[#262626] mb-2">面试次数</h3>
            <p class="text-3xl font-bold text-[#ffa116]">2</p>
            <p class="text-sm text-[#8c8c8c]">本月新增 3 次</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <h3 class="text-lg font-semibold text-[#262626] mb-2">面试问题数</h3>
            <p class="text-3xl font-bold text-[#ffa116]">6</p>
            <p class="text-sm text-[#8c8c8c]">本月新增 6个</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <h3 class="text-lg font-semibold text-[#262626] mb-2">平均得分</h3>
            <p class="text-3xl font-bold text-[#ffa116]">80</p>
            <p class="text-sm text-[#8c8c8c]">历史最高 84 分</p>
          </div>
        </div>

        <!-- 面试记录区域 -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">近期面试记录</h2>
          <div class="flex space-x-4">
            <button class="px-4 py-2 text-sm bg-[#f8f9fa] rounded-md hover:bg-[#e5e6e8] transition-colors">
              全部状态
            </button>
            <button class="px-4 py-2 text-sm bg-[#f8f9fa] rounded-md hover:bg-[#e5e6e8] transition-colors">
              最新优先
            </button>
          </div>
        </div>

        <!-- 面试记录表格 -->
        <div class="border rounded-lg overflow-hidden p-6">
          <table class="w-full">
            <thead class="bg-[#f8f9fa]">
              <tr>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">次数</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">用时</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">时间</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">是否关联简历</th>
                <th class="text-left p-4 text-sm text-[#8c8c8c]">评分</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="record in interviewRecords" 
                :key="record.id"
                class="hover:bg-[#fafafa] transition-colors border-t"
              >
                <td class="p-4 text-[#262626] text-base">{{ record.position }}</td>
                <td class="p-4 text-[#262626] text-base">{{ record.company }}</td>
                <td class="p-4 text-[#8c8c8c] text-base">{{ record.time }}</td>
                <td class="p-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': record.status === '是',
                      'bg-red-100 text-red-800': record.status === '否',
                    }"
                    class="px-4 py-2 rounded-full text-base"
                  >
                    {{ record.status }}
                  </span>
                </td>
                <td class="p-4 text-[#ffa116] font-medium">{{record.rating }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 每日一题和推荐 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-[#262626]">每日一题</h3>
              <span class="text-sm text-[#8c8c8c]">{{ formattedDate }}</span>
            </div>
            <div class="bg-[#fafafa] p-4 rounded mb-4">
              <div class="text-[#262626] font-medium mb-2">今日题目</div>
              <div class="text-[#595959] text-sm">实现二叉树层序遍历</div>
            </div>
            <button 
              class="w-full bg-[#ffa116] hover:bg-[#ff8b00] text-white py-2 rounded transition-colors"
              @click="goToDailyQuestion"
            >
              开始挑战
            </button>
          </div>

          <div class="bg-white p-6 rounded-lg shadow border border-[#e5e6e8]">
            <h3 class="text-lg font-semibold text-[#262626] mb-4">推荐</h3>
            <div class="space-y-4">
              <!-- 推荐内容保持不变... -->
              <div class="flex items-center justify-between p-3 bg-[#fafafa] rounded">
                <span class="text-[#262626]">前端开发面试宝典</span>
                <button class="text-sm text-[#ffa116] hover:underline">查看</button>
              </div>
              <div class="flex items-center justify-between p-3 bg-[#fafafa] rounded">
                <span class="text-[#262626]">Java后端高频面试题</span>
                <button class="text-sm text-[#ffa116] hover:underline">查看</button>
              </div>
              <div class="flex items-center justify-between p-3 bg-[#fafafa] rounded">
                <span class="text-[#262626]">算法与数据结构精讲</span>
                <button class="text-sm text-[#ffa116] hover:underline">查看</button>
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
import { useRouter } from 'vue-router'
import { ElButton, ElDialog, ElMessage } from 'element-plus'
import NavBar from './NavBar.vue';

const router = useRouter()

// 定义打卡记录接口
interface CheckInRecord {
  id: number // 使用时间戳或其他唯一标识
  date: string
  time: string
  // note?: string // 可选的备注
}

interface InterviewRecord {
  id: number
  position: string
  company: string
  time: string
  status: '是' | '否'
  rating: number
}

// 状态变量
const showAddDialog = ref(false)
const showDetailsDialog = ref(false)
const selectedCheckIn = ref<CheckInRecord | null>(null) // 重命名

const checkInRecords = ref<CheckInRecord[]>([]) // 重命名，使用新接口
const loading = ref(false) // 保留加载状态

// 获取打卡记录 
const fetchCheckIns = () => {
  loading.value = true;
  const storedRecords = localStorage.getItem('checkInRecords');
  if (storedRecords) {
    checkInRecords.value = JSON.parse(storedRecords);
  } else {
    // 示例数据
    checkInRecords.value = [

    ];
  }
  loading.value = false;
};

// 组件挂载时获取记录
onMounted(() => {
  fetchCheckIns();
})

// 添加打卡记录 (本地)
const addCheckIn = () => {
  try {
    const now = new Date();
    const newRecord: CheckInRecord = {
      id: now.getTime(), // 使用时间戳作为ID
      date: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
      // note: newCheckIn.value.note
    };

    // 检查今天是否已打卡 (可选)
    const todayDate = newRecord.date;
    const hasCheckedInToday = checkInRecords.value.some(record => record.date === todayDate);
    if (hasCheckedInToday) {
      ElMessage.warning('今天已经打过卡了！');
      showAddDialog.value = false;
      return;
    }

    checkInRecords.value.unshift(newRecord); // 添加到列表开头
    localStorage.setItem('checkInRecords', JSON.stringify(checkInRecords.value)); // 保存到localStorage

    ElMessage.success('打卡成功');
    showAddDialog.value = false;
    // newCheckIn.value = {}; // 重置表单

  } catch (error) {
    console.error('打卡失败:', error);
    ElMessage.error('打卡失败');
  }
};

const viewCheckInDetails = (record: CheckInRecord) => {
  selectedCheckIn.value = record
  showDetailsDialog.value = true
}
const interviewRecords = ref<InterviewRecord[]>([
  {
    id: 1,
    position: '1',
    company: '05.34',
    time: '2025-05-21',
    status: '否',
    rating: 84
  },
  {
    id: 2,
    position: '2',
    company: '06.11',
    time: '2025-05-21',
    status: '是',
    rating: 76
  },
])

// 格式化日期 (保持不变)
const formattedDate = computed(() => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
})

// 跳转到每日一题页面 (保持不变)
const goToDailyQuestion = () => {
  router.push('/daily-question')
}

</script>

<style scoped>
.main-container {
  padding: 20px 40px;
  margin: 20px 0 0 340px; /* 调整 margin-left 以适应左侧固定宽度 */
  width: calc(100% - 380px); /* 调整宽度计算 */
  max-width: none;
}

.w-80 {
  width: 320px;
  position: fixed;
  left: 20px;
  top: 100px; /* 假设 NavBar 高度约为 80px + 20px 间距 */
  bottom: 20px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
}

.main-content {
  margin-left: 0; /* 主内容区域不再需要左边距，因为父容器已经处理了 */
  flex: 1;
  width: 100%; /* 确保主内容区填满剩余空间 */
  min-width: auto;
  padding: 20px 40px;
  box-sizing: border-box;
}

/* 其他样式保持不变... */
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
