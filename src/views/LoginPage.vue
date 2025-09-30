<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="아이디" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">로그인</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

async function login() {
  try {
    await axios.get('http://localhost:8080/api/boards', {
      auth: { username: username.value, password: password.value },
    })
    localStorage.setItem('username', username.value)
    localStorage.setItem('password', password.value)
    router.push('/write') // 성공 → 글쓰기 페이지로 이동
  } catch (err) {
    console.error(err)
    error.value = '로그인 실패'
  }
}
</script>
