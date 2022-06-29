<template>
  <a :href="href" class="next-btn">
    <el-icon color="white" size="24px"><ArrowRightBold /></el-icon>
  </a>
</template>

<script setup>
defineProps([
  "href"
])
</script>

<style></style>