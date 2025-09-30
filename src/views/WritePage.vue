<template>
  <div>
    <h1>글쓰기</h1>
    <form @submit.prevent="writePost">
      <input v-model="title" placeholder="제목" required />
      <textarea v-model="content" placeholder="내용" required></textarea>
      <button type="submit">등록</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const title = ref('')
const content = ref('')
const message = ref('')

const username = localStorage.getItem('username')
const password = localStorage.getItem('password')

// 로그인 안 했으면 로그인 페이지로 돌려보냄
onMounted(() => {
  if (!username || !password) {
    alert('로그인 후 이용해주세요')
    window.location.href = '/login'
  }
})

async function writePost() {
  try {
    const res = await axios.post(
      'http://localhost:8080/api/boards',
      { title: title.value, content: content.value },
      { auth: { username, password } },
    )
    message.value = '글 작성 성공!'
    console.log('작성된 글:', res.data)
  } catch (err) {
    console.error(err)
    message.value = '글 작성 실패'
  }
}
</script>
