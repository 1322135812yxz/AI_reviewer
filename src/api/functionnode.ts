import http from './httpnode';
import type { AxiosRequestConfig } from 'axios';

/**
 * 简历实体接口，与后端实体类对应
 */
export interface Resume {
  id?: number;
  userId?: number;
  originalName?: string;
  storagePath?: string;
  uploadTime?: string;
  fileSize?: number;
  fileType?: string;
}

/**
 * 面试题实体接口，与后端实体类对应
 */
export interface Interview {
  qid: number;
  language: string;
  level: string;
  question: string;
  answer: string;
}

/**
 * 面试题实体接口，与后端实体类对应
 */
export interface Interview {
  qid: number;
  language: string;
  level: string;
  question: string;
  answer: string;
}

/**
 * 网络请求响应格式
 */
interface ResponseData<T> {
  status?: number;
  message?: string;
  data: {
    [key: string]: T;
  };
}

/**
 * 根据语言和难度级别获取面试题
 * @param language 编程语言
 * @param level 难度级别
 * @returns Promise<ResponseData<Interview[]>>
 */
export const getKeyWordAPI = (language: string, level: string): Promise<ResponseData<Interview[]>> => {
  // 配置请求到题库后端（localhost:8080）
  return http.get<ResponseData<Interview[]>>('/interview/getKeyWord', { language, level }, {
    baseURL: 'http://localhost:8080'
  });
};
