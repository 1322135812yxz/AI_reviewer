import { pa } from 'element-plus/es/locales.mjs';
import http from './http.ts';
import axios from 'axios';
// 假设这些类型在 '@/types/user' 文件中定义

// 定义登录参数类型
interface loginDataType{
    name:string
    password:string
}

// 定义注册参数类型
interface registerDataType{
    name:string
    password:string
    phone:string
    sex:string
    wxcount:string
    email:string
    birthday:string
    userjob:string
}

interface userInfoType {
  user:{
    id: number
    name: string
    password: string
    phone: string
    sex: string
    wxcount: string | null
    birthday: string
    email: string | null
    userjob: string
  }
}

interface interviewType{
    qid:number
    language:string
    level:string
    question:string
    answer:string
}

// 定义岗位信息类型
interface JobInfoType {
  id: number
  company: string
  title: string
  salary: string
  education: string
  description: string
  hiringManager: string
  lastActive: string
  address: string
  link: string
}

// 定义岗位信息类型
interface JobInfoType {
  id: number
  company: string
  title: string
  salary: string
  education: string
  description: string
  hiringManager: string
  lastActive: string
  address: string
  link: string
}

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
 * @description: 用户登录
 * @param {loginDataType} data 登录参数
 * @return 返回请求登录接口的结果
 */
export function getLoginAPI(data: loginDataType) {
  return http.get<userInfoType>('/user/login', data);
}

/**
 * @description: 用户注册
 * @param {registerDataType} data 注册参数
 * @return 注册结果
 */
export function postRegisterAPI(data: registerDataType) {
  return http.post<userInfoType>('/user/register', data);
}

/**
 * @description: 获取用户信息
 * @return 用户信息
 */
export function getUserInfoAPI() {
  return http.get<userInfoType>('/user/get_userinfo');
}

/**
 * @description: 获取面试题库
 * @returns 
 */
export function getInterviewAPI() {
  return http.get<interviewType[]>('/interview/list');
}

export function getInterviewByCriteriaAPI(language: string, level: string) {
  return http.get<interviewType[]>('/interview/getKeyWord', { language, level });
}


/**
 * @description: 根据用户ID查询用户信息
 * @param {number} id 用户ID
 * @return 用户详细信息
 */
export function getUserByIdAPI(id: number) {
  return http.get<userInfoType>(`/user/${id}`);
}

/**
 * @description: 退出登录
 * @return 退出登录结果
 */
export function loginOUtAPI() {
  return http.get<null>('/user/loginOut'); 
}

/**
 * @description: 更新用户信息
 * @param {object} data 用户信息
 * @return 更新结果
 */
export function updateUserInfoAPI(data: any) {
  return http.get<userInfoType>('/user/updata', data);
} 


/**
 * @description: 修改用户信息
 * @param {userInfoType} user 用户信息
 * @return 修改结果
 */
export function updateUserAPI(user: Partial<userInfoType>) {
  return http.get<null>('/user/updata', user);
}

/**
 * @description: 获取岗位分页列表
 * @param {number} pages 当前页码
 * @param {number} limit 每页条数
 * @param {object} filters 筛选条件
 * @return 岗位列表和总数
 */
export function getJobPageListAPI(pages: number, limit: number, filters?: object) {
  return http.get<{ list: JobInfoType[], total: number }>('/changsha-job-info/pageList', {
    pages,
    limit,
    ...filters
  });
}

/**
 * @description: 获取所有岗位信息
 * @param {object} params 查询参数
 * @return 岗位列表
 */
export function getAllJobsAPI(params?: object) {
  return http.get<JobInfoType[]>('/changsha-job-info/list', params);
}

/**
 * @description: 根据学历要求获取薪资信息
 * @param {string} education 学历要求
 * @return 岗位列表
 */
export function getSalaryByEducationAPI(education: string) {
  return http.get<JobInfoType[]>('/getSalary', { education });
}

// 定义问题类型接口
interface Question {
  id: number
  type: number // 0-单选，1-多选，2-填空
  questions: string
  answerOne: string
  answerTwo: string
  answerThree: string
  answerFour: string
}

// 定义用户问题提交类型
interface UserQuestion {
  userId: number
  questionId: number
  answer: string
}

/**
 * @description: 获取随机问题列表
 * @return 问题列表
 */
export function getRandomQuestionsAPI() {
  return http.get<Question[]>('/question/randomList');
}

/**
 * @description: 提交用户问卷答案
 * @param {UserQuestion} data 用户问题答案
 * @return 提交结果
 */
export function addUserQuestionAPI(data: UserQuestion) {
  // 确保所有必要字段都存在且类型正确
  const validatedData = {
    userId: Number(data.userId),
    questionId: Number(data.questionId),
    answer: data.answer || ''
  };
  console.log('发送到后端的数据:', validatedData);
  // 添加Content-Type头部，确保数据以JSON格式发送
  return http.post<any>('/user-question/add', validatedData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * 上传简历
 * @param file 文件对象
 * @param userId 用户ID
 * @returns Promise
 */
// 定义简历类型
export interface Resume {
  id?: number;
  userId?: number;
  originalName?: string;
  storagePath?: string;
  uploadTime?: string;
  fileSize?: number;
  fileType?: string;
}

// 定义在线简历类型
export interface Cv {
  id?: number;
  user_id?: number;
  title?: number;
  total?: string;
}

/**
 * 上传简历文件
 * @param file 简历文件
 * @param userId 用户ID
 * @returns Promise
 */
export const uploadResumeAPI = (file: File, userId: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('userId', userId.toString());
  
  return http.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

/**
 * 获取用户的简历列表
 * @param userId 用户ID
 * @returns Promise
 */
export const getResumeListAPI = (userId: number) => {
  return http.get(`/resume/list/${userId}`);
};

/**
 * 获取简历详情
 * @param id 简历ID
 * @returns Promise
 */
export const getResumeInfoAPI = (id: number) => {
  return http.get(`/resume/${id}`);
};

/**
 * 获取简历预览URL
 * @param id 简历ID
 * @returns 预览URL
 */
export const getResumeViewURL = (id: number) => {
  return `/resume/view/${id}`;
};

/**
 * 删除简历
 * @param id 简历ID
 * @returns Promise
 */
export const deleteResumeAPI = (id: number) => {
  return http.post(`/resume/${id}`);
};

/**
 * 获取在线简历内容
 * @param title 简历标题
 * @param userId 用户ID
 * @returns Promise
 */
export const getCvByTitleAPI = (title: string, userId: number) => {
  // 拼接路径参数，不要再传 params
  return http.get(`/cv/list/${title}/${userId}`);
};

/**
 * 添加在线简历
 * @param cv 简历对象
 * @returns Promise
 */
export const addCvAPI = (cv: Cv) => {
  return http.post('/cv/add', cv);
};

/**
 * 更新在线简历
 * @param cv 简历对象
 * @returns Promise
 */
export const updateCvAPI = (cv: Cv) => {
  return http.post('/cv/update', cv);
};



/**
 * 学习计划实体接口，与后端实体类对应
 */
export interface Plan {
  id?: number;
  userId?: number; // 后端是 Long，前端用 number
  name: string;
  planDay: number;
  planDescribe?: string; // 假设后端有这个字段，根据需要调整
  // 注意：前端的 progress 字段在后端没有，需要在前端处理或调整后端
}

/**
 * @description: 获取所有学习计划
 * @return 学习计划列表
 */
export function getAllPlansAPI() {
  return http.get<Plan[]>('/plan/list');
}

/**
 * @description: 添加学习计划
 * @param {Plan} plan 学习计划数据
 * @return 添加结果
 */
export function addPlanAPI(plan: Omit<Plan, 'id'>) {
  // 后端接口接收 Plan 对象，确保传递的字段匹配
  // 后端 @PostMapping("/add") Plan plan 接收的是表单数据或JSON，这里假设是JSON
  return http.post<Plan>('/plan/add', plan, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * @description: 根据ID获取单个学习计划
 * @param {number} id 计划ID
 * @return 单个学习计划信息
 */
export function getPlanByIdAPI(id: number) {
  return http.get<Plan>(`/plan/${id}`);
}

/**
 * @description: 获取指定用户的学习计划
 * @param {number} userId 用户ID
 * @return 用户学习计划列表
 */
export function getUserPlansAPI(userId: number) {
  // 后端 @GetMapping("/getUserPlan") Long userId 接收的是查询参数
  return http.get<Plan[]>('/plan/getUserPlan', { userId });
}

/**
 * @description: 更新学习计划
 * @param {Plan} plan 学习计划数据
 * @return 更新结果
 */
export function updatePlanAPI(plan: Plan) {
  // 后端 @PostMapping("/update") Plan plan 接收的是表单数据或JSON，这里假设是JSON
  return http.post<Plan>('/plan/update', plan, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

/**
 * @description: 删除学习计划
 * @param {number} id 计划ID
 * @return 删除结果
 */
export function deletePlanAPI(id: number) {
  // 后端 @PostMapping("/delete") Integer id 接收的是表单数据或查询参数，这里假设是表单数据
  // 通常删除操作使用 DELETE 方法，但后端是 POST，需要确认参数传递方式
  // 如果是表单数据，需要调整 http.post 的参数格式
  const formData = new FormData();
  formData.append('id', id.toString());
  return http.post<boolean>('/plan/delete', formData); // 假设后端返回 boolean 表示成功与否
  // 或者如果是查询参数: return http.post<R<boolean>>(`/plan/delete?id=${id}`);
  // 或者如果是 JSON body: return http.post<R<boolean>>('/plan/delete', { id });
  // 需要根据后端实际接收方式调整
}

export const evaluateInterviewAPI = (userId: number, interviewContent: string, audioData?: string) => {
  const formData = new FormData()
  formData.append('userId', userId.toString())
  formData.append('interviewContent', interviewContent)
  
  if (audioData) {
    formData.append('audioData', audioData)
  }
  
  return http.post('/interview-record/evaluate', formData)
}

// 获取用户面试记录列表
export const getUserInterviewRecordsAPI = (userId: number) => {
  return http.get(`/interview-record/list/${userId}`)
}

// 获取面试记录详情
export const getInterviewRecordDetailAPI = (recordId: number) => {
  return http.get(`/interview-record/detail/${recordId}`)
}

/**
 * 简历标题实体接口，与后端实体类对应
 */
export interface CvTitle {
  id?: number;
  titleOne?: string;
  titleTwo?: string;
  titleTree?: string;
  titleFour?: string;
  titleThree?: string;
  titleFive?: string;
}

/**
 * 获取简历菜单栏标题
 * @returns Promise
 */
export const getCvTitleAPI = () => {
  return http.get('/cv-title/list');
};

/**
 * @description: 获取AI面试题目（基于简历分析）
 * @param {string} questionType 问题类型
 * @return AI生成的面试题目
 */
export function getAiQuestionsAPI(questionType: string) {
  return http.get(`/bank-question/getAi/${questionType}`);
}

/**
 * @description: 获取所有面试题目（不基于简历）
 * @return 所有面试题目
 */
export function getAllQuestionsAPI() {
  return http.get('/bank-question/getAllQuestion');
}


