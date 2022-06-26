<template>
  <StatsCard type="overview" title="统计数据">
    <StatsCardContent name="服务群聊" :value="groupCount">
      <el-icon><Document /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="订阅直播" :value="followCount">
      <el-icon><User /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="推送次数" :value="pushCount">
      <el-icon><Bell /></el-icon>
    </StatsCardContent>
  </StatsCard>
</template>

<script setup>
import StatsCard from "../StatsCard.vue";
import StatsCardContent from "../StatsCardContent.vue";
// defineProps(["groupCount", "followCount", "pushCount"]);
const props = defineProps(["data"]);
console.log(props)
let { groupCount, followCount, pushCount } = props.data;
</script>

<style scoped>
</style>