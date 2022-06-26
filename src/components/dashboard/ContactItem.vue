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
      <slot />
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
    default: 123456,
    type: Number,
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