<template>
    <div class="dash-stats-card" :type="type">
        <div class="dash-stats-card-title">{{ title }}</div>

        <div class="dash-stats-card-stats">
          
          <slot />

        </div>
      </div>
</template>

<script setup>
defineProps([
    "title",
    "type"
])
</script>

<style scoped>

</style>