<template>
  <div id="app">
    <!-- 네비게이션 바 / 헤더 넣고 싶으면 여기에 -->
    <router-view /> <!-- 라우팅된 화면이 표시되는 자리 -->
  </div>
</template>

<script setup>
// 여기서는 별도 import 필요 없음
</script>

<style>
/* 프로젝트 전체에 공통으로 적용할 스타일 있으면 여기에 */
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
