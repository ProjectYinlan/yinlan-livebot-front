<template>
  <StatsCard type="bilibili" title="B站账号信息">
    <StatsCardContent name="工作模式" :value="mode">
      <el-icon><Monitor /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="当前帐号" :value="accountName">
      <el-icon><User /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="关注用户" :value="followUserCount">
      <el-icon><Bell /></el-icon>
    </StatsCardContent>
  </StatsCard>
</template>

<script setup>
import StatsCard from "../StatsCard.vue";
import StatsCardContent from "../StatsCardContent.vue";
defineProps(["mode", "accountName", "followUserCount"]);
</script>

<style scoped>
</style>