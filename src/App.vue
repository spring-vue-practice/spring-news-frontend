<template>
  <div id="app">
    <router-view />
    <!-- 라우터에서 현재 경로에 맞는 페이지가 표시됨 -->
  </div>
</template>

<script setup>
// 특별한 로직이 없다면 script는 비워둬도 됨
</script>

<style scoped>
/* 전체 레이아웃에 필요한 기본 스타일만 여기서 관리 */
#app {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
