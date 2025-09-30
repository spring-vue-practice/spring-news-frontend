<template>
  <main style="max-width: 900px; margin: 40px auto; padding: 0 16px">
    <h2>게시판</h2>

    <!-- 등록 폼 -->
    <form @submit.prevent="onSubmit" style="margin: 16px 0; display: grid; gap: 8px">
      <input v-model="form.title" placeholder="제목" required />
      <input v-model="form.writer" placeholder="작성자" required />
      <textarea v-model="form.content" placeholder="내용" rows="4" required></textarea>
      <button type="submit">{{ form.id ? '수정' : '등록' }}</button>
      <button type="button" v-if="form.id" @click="reset">취소</button>
    </form>

    <!-- 목록 -->
    <table border="1" cellspacing="0" cellpadding="8" width="100%">
      <thead>
        <tr>
          <th width="60">ID</th>
          <th>제목</th>
          <th width="120">작성자</th>
          <th width="140">작성일</th>
          <th width="140">액션</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in items" :key="b.id">
          <td>{{ b.id }}</td>
          <td>{{ b.title }}</td>
          <td>{{ b.writer }}</td>
          <td>{{ b.createdDate }}</td>
          <td>
            <button @click="edit(b)">수정</button>
            <button @click="remove(b)">삭제</button>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="5" align="center">데이터가 없습니다.</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const base = 'http://localhost:8080/api/boards'

const items = ref([])
const form = ref({ id: null, title: '', content: '', writer: '', createdDate: today() })

function today() {
  return new Date().toISOString().split('T')[0]
}

async function fetchList() {
  const { data } = await axios.get(base)
  items.value = data
}

async function onSubmit() {
  const payload = {
    title: form.value.title.trim(),
    content: form.value.content.trim(),
    writer: form.value.writer.trim(),
    createdDate: form.value.createdDate || today(),
  }
  if (form.value.id) {
    await axios.put(`${base}/${form.value.id}`, payload)
  } else {
    await axios.post(base, payload)
  }
  reset()
  fetchList()
}

function edit(b) {
  form.value = { ...b }
}

async function remove(b) {
  if (!confirm(`#${b.id} 삭제할까요?`)) return
  await axios.delete(`${base}/${b.id}`)
  fetchList()
}

function reset() {
  form.value = { id: null, title: '', content: '', writer: '', createdDate: today() }
}

onMounted(fetchList)
</script>
