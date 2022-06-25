<template>
  <StatsCard type="yinlan" title="洇岚信息">
    <StatsCardContent name="当前版本" :value="version">
      <el-icon><Setting /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="发布日期" :value="updateDate">
      <el-icon><Calendar /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="运行时长" :value="runningTime">
      <el-icon><Clock /></el-icon>
    </StatsCardContent>
  </StatsCard>
</template>

<script setup>
import StatsCard from "../StatsCard.vue";
import StatsCardContent from "../StatsCardContent.vue";
defineProps(["version", "updateDate", "runningTime"]);
</script>

<style scoped>
</style>