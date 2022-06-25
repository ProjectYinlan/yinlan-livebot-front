<template>
  <div class="dash-control-card" :size="size">
    <div class="dash-control-card-title">
      <el-icon><Document /></el-icon>
      <div class="dash-control-card-title-content">{{ title }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps(["size", "title"]);
</script>

<style scoped>
</style>