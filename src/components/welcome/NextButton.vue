<template>
  <router-link :to="href" class="next-btn">
    <el-icon color="white" size="24px"><ArrowRightBold /></el-icon>
  </router-link>
</template>

<script setup>
defineProps({
  href: {
    default: '',
    type: String
  }
})
</script>

<style></style>