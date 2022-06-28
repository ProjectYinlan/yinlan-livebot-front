<template>
  <div class="dash-control-card" size="sm" with-btn>
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><Setting /></el-icon>
      <div class="dash-control-card-title-content">直播检测选项</div>
    </div>

    <div class="dash-control-card-content">
      <div class="row-center">
        <div class="row-center-title">工作模式</div>
        <span>不登陆账号</span>
        <el-switch
          v-model="auth"
          class="ml-2"
          style="
            --el-switch-on-color: var(--color-bilibot-auth);
            --el-switch-off-color: var(--color-bilibot-unauth);
          "
        />
        <span>登陆账号</span>
      </div>

      <div class="row-center">
        <div class="row-center-title">检测间隔</div>
        <el-input-number
          v-model="interval"
          :min="auth ? 10 : 60"
          :max="90"
          size="small"
        />
        秒
      </div>
    </div>
    <div class="dash-control-card-apply">
      <el-button type="primary">应用</el-button>

      <el-button
        type="primary"
        plain
        :disabled="!auth"
        >{{ accountStatus ? "登出" : "登入" }}</el-button
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  auth: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 60,
  },
  accountStatus: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
</style>