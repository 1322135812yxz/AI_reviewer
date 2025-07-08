<template>
  <div class="daily-question">
    <NavBar />
    
    <div class="question-container">
      <div v-if="isLoading" class="loading">
        题目加载中...
      </div>
      
      <div v-else-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-else class="question-card">
        <!-- 难度颜色指示 -->
        <div class="difficulty-tag" :class="question.difficulty">
          {{ question.level }}
        </div>

        <!-- 题目展示 -->
        <h2 class="question-title">{{ question.question }}</h2>

        <!-- 答案输入区域 -->
        <textarea
          v-model="userAnswer"
          placeholder="请输入您的答案..."
          class="answer-input"
          :disabled="showReferenceAnswer"
        ></textarea>

        <!-- 验证消息 -->
        <div v-if="validationMessage" class="validation-message">
          {{ validationMessage }}
        </div>
        
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
          <p>{{ question.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NavBar from '../components/NavBar.vue';

interface Question {
  qid: number;
  language: string;
  level: string;
  question: string;
  answer: string;
  difficulty?: string;
}

const isLoading = ref(true);
const errorMessage = ref('');
const showReferenceAnswer = ref(false);
const userAnswer = ref('');
const validationMessage = ref('');

// 模拟每日一题数据
// 实际项目中，这里应该从API获取数据
const question = ref<Question>({
  qid: 1,
  language: 'JavaScript',
  level: 'Medium',
  question: '实现二叉树层序遍历',
  answer: '二叉树层序遍历是指按照从根节点到叶节点的层次关系，一层一层地遍历二叉树中的所有节点。\n\n```javascript\nfunction levelOrder(root) {\n  if (!root) return [];\n  \n  const result = [];\n  const queue = [root];\n  \n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const currentLevel = [];\n    \n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      \n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    \n    result.push(currentLevel);\n  }\n  \n  return result;\n}\n```',
  difficulty: 'medium'
});

onMounted(() => {
  // 模拟API请求
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
});

const handleSubmitAnswer = () => {
  // 验证用户答案是否完整
  if (!userAnswer.value || userAnswer.value.trim().length < 10) {
    validationMessage.value = '您的答案不完整，请详细描述您的解题思路和代码实现。';
    return;
  }
  
  // 清除验证消息
  validationMessage.value = '';
  // 显示参考答案
  showReferenceAnswer.value = true;
};

const toggleReferenceAnswer = () => {
  showReferenceAnswer.value = !showReferenceAnswer.value;
};
</script>

<style scoped>
.daily-question {
  min-height: 100vh;
  background-color: #f5f7fa;
}

.question-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
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

.question-title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-right: 80px; /* 为难度标签留出空间 */
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

.reference-answer {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

.reference-answer h3 {
  margin-bottom: 10px;
  color: #303133;
}

.reference-answer p {
  white-space: pre-wrap;
  line-height: 1.6;
}

.validation-message {
  margin: 10px 0;
  padding: 10px;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  font-size: 14px;
  border-left: 4px solid #f56c6c;
}
</style>