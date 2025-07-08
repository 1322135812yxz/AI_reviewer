import http from './http.ts';

// 定义面试题目类型
interface BankQuestion {
  id: number;
  bank_id: number;
  question: string;
  question_type: string;
}

// 定义后端统一响应格式R
interface R<T = any> {
  status: number;
  message: string;
  data: {
    data: T;
  };
  success: boolean;
}

/**
 * @description: 获取所有面试题目
 * @return 面试题目列表
 */
export function getAllQuestionsAPI() {
  return http.get<R<BankQuestion[]>>('/bank-question/getAllQuestion');
}