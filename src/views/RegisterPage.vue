<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="아이디" required />
      <input v-model="password" type="password" placeholder="비밀번호" required />
      <button type="submit">가입하기</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const message = ref('')

async function register() {
  try {
    const res = await axios.post('http://localhost:8080/api/users/register', {
      username: username.value,
      password: password.value,
    })

    // 서버에서 201(Created) 응답 시 → 회원가입 성공
    if (res.status === 201) {
      message.value = res.data
      alert('회원가입 완료! 로그인 페이지로 이동합니다.')
      router.push('/login')
    } else {
      // 200 등 다른 코드일 때도 메시지 표시
      message.value = res.data
    }
  } catch (err) {
    if (err.response?.status === 409) {
      // 409 Conflict → 이미 존재하는 아이디
      message.value = '이미 존재하는 아이디입니다.'
    } else {
      message.value = '회원가입 실패'
    }
  }
}
</script>

<style scoped>
/* 간단한 스타일 (원하시면 꾸며도 됨) */
form {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 300px;
}
button {
  padding: 6px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background: #369870;
}
</style>
