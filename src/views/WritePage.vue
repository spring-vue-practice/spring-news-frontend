<template>
  <div>
    <h1>글쓰기</h1>
    <form @submit.prevent="writePost">
      <input v-model="title" placeholder="제목" required />
      <textarea v-model="content" placeholder="내용" required></textarea>
      <button type="submit">등록</button>
    </form>

    <p v-if="message">{{ message }}</p>

    <!-- ✅ 작성된 글 미리보기 -->
    <div v-if="newPost" class="post-preview">
      <h2>작성된 글</h2>
      <p><strong>제목:</strong> {{ newPost.title }}</p>
      <p><strong>작성자:</strong> {{ newPost.writer }}</p>
      <p><strong>내용:</strong> {{ newPost.content }}</p>
      <p><strong>작성일:</strong> {{ newPost.createdDate }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const title = ref('')
const content = ref('')
const message = ref('')
const newPost = ref(null) // ✅ 새로 작성된 글 저장용

const username = localStorage.getItem('username')
const password = localStorage.getItem('password')

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
      {
        title: title.value,
        content: content.value,
        writer: username, // ✅ 작성자도 같이 전송
      },
      { auth: { username, password } },
    )
    message.value = '글 작성 성공!'
    newPost.value = res.data // ✅ 작성된 글 데이터 저장
    console.log('작성된 글:', res.data)

    // 입력창 초기화
    title.value = ''
    content.value = ''
  } catch (err) {
    console.error('에러:', err.response?.data || err)
    message.value = `글 작성 실패: ${err.response?.data?.message || '알 수 없는 오류'}`
    newPost.value = null
  }
}
</script>
