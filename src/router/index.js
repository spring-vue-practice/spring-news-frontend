import { createRouter, createWebHistory } from 'vue-router'

import RegisterPage from '@/views/RegisterPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import WritePage from '@/views/WritePage.vue'

const routes = [
  { path: '/', redirect: '/register' },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/write', component: WritePage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
