<template>
  <div class="dash-control-card-contact-item">
    <img
      :src="avatar"
      alt=""
      class="dash-control-card-contact-item-avatar"
    />
    <div class="dash-control-card-contact-item-content">
      <div class="dash-control-card-contact-item-content-name">{{ name }}</div>
      <div class="dash-control-card-contact-item-content-number">{{ number }}</div>
    </div>
    <div class="dash-control-card-contact-item-btn-group">
      <el-button
        type="primary"
        circle
        class="dash-control-card-contact-item-btn"
        >{{ count }}</el-button
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    default: "NAME",
    type: String,
  },
  number: {
    default: "NUMBER",
    type: String,
  },
  count: {
    default: "0",
    type: String,
  },
  avatar: {
    default: "/assets/imgs/yinlan.jpg",
    type: String,
  }
});
</script>

<style scoped>
</style>