<template>
  <div class="dash-stats-card-stat">
    <div class="dash-stats-card-icon">
      
      <!-- <el-icon><Document /></el-icon> -->
      <slot />

    </div>

    <div class="dash-stats-card-name">{{ name }}</div>

    <div class="dash-stats-card-value">{{ value }}</div>
  </div>
</template>

<script setup>
defineProps(["name", "value", "icon"]);
</script>

<style scoped>
</style>