<template>
  <div class="dash-control-card" size="sm">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><CopyDocument /></el-icon>
      <div class="dash-control-card-title-content">广播</div>
    </div>

    <div class="dash-control-card-content">
      <el-radio-group
        v-model="radio"
        class="dash-control-card-broadcast-content-item"
      >
        <el-radio-button label="群聊" />
        <el-radio-button label="好友" />
      </el-radio-group>
      <el-input
        class="dash-control-card-broadcast-content-item"
        v-model="input"
        :autosize="{ minRows: 4, maxRows: 4 }"
        type="textarea"
        placeholder="在这里输入需要广播的内容嗷"
      />
      <el-button
        type="primary"
        class="
          dash-control-card-broadcast-content-item dash-control-card-apply-btn
        "
        >发送</el-button
      >
    </div>
  </div>
</template>

<script setup>
defineProps({
  radio: {
    type: String,
    default: "群聊"
  },
  input: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
</style>