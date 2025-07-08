import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'

const routes = [
  { 
    path: '/',
    component: Login 
  },
  { 
    path: '/home',
    component: () => import('../components/Home.vue') 
  },
  {
    path: '/interview-score',
    name: 'interview-score',
    component: () => import('../views/InterviewScore.vue'),
    props: true
  },
  { 
    path: '/test',
    component: () => import('../components/Test.vue') 
  },
  { 
    path: '/questions',
    component: () => import('../views/QuestionBank.vue') 
  },
  { 
    path: '/hello',
    component: () => import('../components/HelloWorld.vue') 
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/jobs',
    component: () => import('../views/JobSearch.vue')
  },
  {
    path: '/mock-interview',
    component: () => import('../views/MockInterview.vue')
  },
  {
    path: '/interview-session',
    component: () => import('../views/InterviewSession.vue')
  },
  {
    path: '/interview-prep',
    component: () => import('../views/InterviewPrep.vue')
  },
  {
    path: '/device-check',
    component: () => import('../components/DeviceCheck.vue')
  },
  {
    path: '/learning',
    component: () => import('../views/Learning.vue')
  },
  {
    path: '/interview-room',
    component: () => import('../views/InterviewRoom.vue')
  },
  {
    path: '/resume',
    component: () => import('../views/Resume.vue')
  },
  {
    path: '/interview-history',
    name: 'interview-history',
    component: () => import('../views/InterviewHistory.vue')
  },
  {
    path: '/review',
    name: 'review',
    component: () => import('../views/InterviewHistory.vue')
  },
  {
    path: '/daily-question',
    name: 'daily-question',
    component: () => import('../views/DailyQuestion.vue')
  },
  {
    path: '/language-learning/:language',
    name: 'language-learning',
    component: () => import('../views/LanguageLearning.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
