<template>
  <div class="question-bank">
    <NavBar title="面试题库" />
    
    <!-- 筛选条件 -->
    <div class="filter-container">
      <div class="filter-item">
        <label>语言类型：</label>
        <select v-model="selectedLanguage" @change="handleFilterChange">
          <option value="">全部</option>
          <option value="Java">Java</option>
          <option value="PHP">PHP</option>
          <option value="Magento">Magento</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div class="filter-item">
        <label>难度级别：</label>
        <select v-model="selectedLevel" @change="handleFilterChange">
          <option value="">全部</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <div v-else-if="questions.length" class="question-container">
      <div class="question-card">
        <!-- 难度颜色指示 -->
        <div class="difficulty-tag" :class="currentQuestion.difficulty">
          {{ currentQuestion.level }}
        </div>

        <!-- 题目展示 -->
        <h2 class="question-title">{{ currentQuestion.question }}</h2>

        <!-- 答案输入区域 -->
        <textarea
          v-model="userAnswers[currentIndex]"
          placeholder="请输入您的答案..."
          class="answer-input"
          :disabled="showReferenceAnswer"
        ></textarea>

        <!-- 操作按钮 -->
        <div class="button-group">
          <button
            v-if="!showReferenceAnswer"
            @click="handleSubmitAnswer"
            class="submit-btn"
          >
            提交答案
          </button>
          <button
            @click="toggleReferenceAnswer"
            class="reference-btn"
            :class="{ active: showReferenceAnswer }"
          >
            {{ showReferenceAnswer ? '隐藏参考答案' : '查看参考答案' }}
          </button>
        </div>

        <!-- 参考答案 -->
        <div v-show="showReferenceAnswer" class="reference-answer">
          <h3>参考答案：</h3>
          <p>{{ currentQuestion.answer }}</p>
        </div>
      </div>
    </div>

    <div v-else class="loadiing">
      题库加载中...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted} from 'vue';
import NavBar from '../components/NavBar.vue';
import { getInterviewAPI} from '../api/function';
import { getKeyWordAPI } from '../api/functionnode';

interface Question {
  qid: number;
  language: string;
  level: string;
  question: string;
  answer: string;
}

const questions = ref<Question[]>([]);
const currentIndex = ref(0);
const userAnswers = ref<string[]>([]);
const showReferenceAnswer = ref(false);
const selectedLanguage = ref('');
const selectedLevel = ref('');

const currentQuestion = computed(() => ({
  ...questions.value[currentIndex.value],
  difficulty: questions.value[currentIndex.value]?.level.toLowerCase()
}));

const isLoading = ref(true);
const errorMessage = ref('');

// 处理筛选条件变化
const handleFilterChange = async () => {
  isLoading.value = true;
  try {
    // 如果没有选择任何筛选条件，则获取所有题目
    if (!selectedLanguage.value && !selectedLevel.value) {
      const res = await getInterviewAPI();
      questions.value = res.data.list.map(q => ({
        ...q,
        difficulty: q.level.toLowerCase()
      }));
    } else {
      // 使用筛选条件获取题目
      const res = await getKeyWordAPI(selectedLanguage.value || '', selectedLevel.value || '');
      if (res.data && res.data.keyWord) {
        questions.value = res.data.keyWord.map(q => ({
          ...q,
          difficulty: q.level.toLowerCase()
        }));
      } else {
        questions.value = [];
      }
    }
    
    // 重置当前索引和用户答案
    currentIndex.value = 0;
    userAnswers.value = new Array(questions.value.length).fill('');
    errorMessage.value = '';
  } catch (error) {
    console.error('题库筛选失败:', error);
    errorMessage.value = '题库筛选失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await getInterviewAPI();
    console.log('完整接口响应：', JSON.stringify(res.data, null, 2));
    questions.value = res.data.list.map(q => ({
      ...q,
      difficulty: q.level.toLowerCase()
    }));
    userAnswers.value = new Array(questions.value.length).fill('');
    errorMessage.value = '';
  } catch (error) {
    console.error('题库加载失败:', error);
    errorMessage.value = '题库加载失败，请稍后重试';
  } finally {
    isLoading.value = false;
  }
});

const handleSubmitAnswer = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    showReferenceAnswer.value = false;
  }
};

const toggleReferenceAnswer = () => {
  showReferenceAnswer.value = !showReferenceAnswer.value;
};
</script>

<style scoped>
.filter-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-item select {
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  min-width: 120px;
  cursor: pointer;
}

.filter-item label {
  font-weight: 500;
  color: #606266;
}

.error-message {
  text-align: center;
  color: #f56c6c;
  margin: 20px 0;
  padding: 10px;
  background-color: #fef0f0;
  border-radius: 4px;
}

.difficulty-tag {
  position: absolute;
  right: 20px;
  top: 20px;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
}

.difficulty-tag.easy {
  background-color: #f0f9eb;
  color: #67c23a;
}

.difficulty-tag.medium {
  background-color: #ecf5ff;
  color: #409eff;
}

.difficulty-tag.hard {
  background-color: #fef0f0;
  color: #f56c6c;
}

.question-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  position: relative;
}

.answer-input {
  width: 100%;
  height: 120px;
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  resize: vertical;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.submit-btn {
  background-color: #409eff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.reference-btn {
  background-color: #f4f4f5;
  color: #909399;
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.reference-btn.active {
  background-color: #409eff;
  color: white;
}

.loading {
  text-align: center;
  padding: 50px;
  color: #909399;
}
</style>