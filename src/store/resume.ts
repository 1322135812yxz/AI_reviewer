import { defineStore } from 'pinia';

export const useResumeStore = defineStore('resume', {
  state: () => ({
    basic: {
      name: '请输入姓名',
      gender: '请输入性别',
      phone: '请输入手机号',
      email: '请输入邮箱',
      identity: '请输入期望职业'
    }
  }),
  actions: {
    setBasic(newBasic:any) {
      this.basic = { ...this.basic, ...newBasic };
    }
  },
  persist: true // 开启持久化
});