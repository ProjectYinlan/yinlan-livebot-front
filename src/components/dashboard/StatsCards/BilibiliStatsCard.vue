<template>
  <StatsCard type="bilibili" title="B站账号信息">
    <StatsCardContent name="工作模式" :value="modeText">
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
// const props = defineProps(["mode", "accountName", "followUserCount"]);
const props = defineProps(["data"]);
let { mode, accountName, followUserCount } = props.data;
let modeText = "未知";
switch (mode) {

  case 'auth':
    modeText = "登陆账号";
    break;

  case 'anonymous':
    modeText = "匿名";
    break;

  default:
    break;
}
</script>

<style scoped>
</style>