import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

// 假设 useSettingStore 是一个自定义的状态管理 store，这里我们假设它是一个简单的对象

// 创建新的 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_NODE_URL || '/', // 设置基础 URL
  timeout: 5000, // 设置超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // 显示加载提示并保存 toastId
    const loadingToastId = toast.loading('加载中...');
    config.headers.toastId = loadingToastId; // 将 toastId 存入请求头
    return config;
  },
  (error) => {
    toast.dismiss();
    toast.error('请求错误，请稍后再试');
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 使用请求头中的 toastId 关闭对应提示
    const toastId = response.config.headers.toastId;
    toast.dismiss(toastId);
    
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      if (data.status === 200) {
        toast.success(data.message || '操作成功');
        return data;
      } else {
        toast.error(data.message || '未知错误');
        return Promise.reject(data);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    const toastId = error.config?.headers.toastId;
    toast.dismiss(toastId);

    if (error.message.includes('Network Error')) {
      toast.error('网络超时');
    }

    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          toast.error('请求参数错误');
          break;
        case 401:
          toast.error('未授权，请重新登录');
          break;
        default:
          toast.error('请求失败，请稍后再试');
      }
    }
    return Promise.reject(error);
  }
);

// // 在应用根组件添加 <Toaster /> 组件
// export const ToasterContainer = () => (
//   <toast.Toaster
//     position="top-center"
//     gutter={8}
//     containerStyle={{
//       marginTop: '40px'
//     }}
//     toastOptions={{
//       duration: 4000,
//       success: {
//         iconTheme: {
//           primary: '#667eea',
//           secondary: '#fff'
//         }
//       }
//     }}
//   />
// );

export default service;