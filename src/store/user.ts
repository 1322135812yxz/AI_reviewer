interface UserState {
  isLoggedIn: boolean
  id: number | null
  username: string
  phone: string
  sex: string
  wxcount: string
  email: string
  birthday: string
  userjob: string
  avatar: string
}

import { defineStore } from 'pinia'
import 'pinia-plugin-persistedstate'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
    id: null,
    username: '',
    phone: '',
    sex: '',
    wxcount: '',  // 添加缺失的字段
    email: '',    // 添加缺失的字段
    birthday: '',
    userjob: '',
    avatar: '/src/assets/head.jpg'
  }),
  actions: {
    login(userData: {
      id?: number
      name: string
      phone: string
      sex: string
      wxcount: string
      email: string
      birthday: string
      userjob: string
    }) {
      this.isLoggedIn = true
      this.id = userData.id || null
      this.username = userData.name
      this.phone = userData.phone
      this.sex = userData.sex
      this.wxcount = userData.wxcount
      this.email = userData.email
      this.birthday = userData.birthday
      this.userjob = userData.userjob
      this.avatar = '/src/assets/head.jpg'
    },
    logout() {
      this.isLoggedIn = false
      this.id = null
      this.username = ''
      this.phone = ''
      this.sex = ''
      this.birthday = ''
      this.userjob = ''
      this.avatar = '/src/assets/head.jpg'
    }
  },
  persist: [
    {
      key: 'user',
      storage: localStorage
    }
  ]
})
