<template>
  <StatsCard type="yinlan" title="洇岚信息">
    <StatsCardContent name="当前版本" :value="version">
      <el-icon><Setting /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="发布日期" :value="publish">
      <el-icon><Calendar /></el-icon>
    </StatsCardContent>

    <StatsCardContent name="运行时长" :value="runningTimeString">
      <el-icon><Clock /></el-icon>
    </StatsCardContent>
  </StatsCard>
</template>

<script setup>
import { watch, ref } from "@vue/runtime-core";
import StatsCard from "../StatsCard.vue";
import StatsCardContent from "../StatsCardContent.vue";
const props = defineProps({
  version: {
    default: '0.0.0',
    type: String
  },
  publish: {
    default: '2021.5.1',
    type: String
  },
  runningTime: {
    default: 0,
    type: Number
  }
});
let runningTimeString = ref(getTimeStr(props.runningTime));

watch(
  () => props.runningTime,
  (count) => {
    runningTimeString.value = getTimeStr(count);
  }
);

function getTimeStr(time) {
  // 转换为式分秒
  let h = parseInt((time / 60 / 60) % 24);
  h = h < 10 ? "0" + h : h;
  let m = parseInt((time / 60) % 60);
  m = m < 10 ? "0" + m : m;
  let s = parseInt(time % 60);
  s = s < 10 ? "0" + s : s;
  // 作为返回值返回
  return `${h}:${m}:${s}`;
}
</script>

<style scoped>
</style>