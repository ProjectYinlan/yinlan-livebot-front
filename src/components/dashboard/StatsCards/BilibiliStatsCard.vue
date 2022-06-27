<template>
  <StatsCard type="bilibili" title="B站账号信息">
    <StatsCardContent name="工作模式" :value="mode == 'auth' ? '登陆账号' : (mode == 'anonymous' ? '匿名' : '未知')">
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
const props = defineProps({
  mode: {
    default: 'unknown',
    type: String
  },
  accountName: {
    default: "未知",
    type: String
  },
  followUserCount: {
    default: 0,
    type: Number
  }
});
// const props = defineProps(["data"]);
// let { mode, accountName, followUserCount } = props.data;
</script>

<style scoped>
</style>