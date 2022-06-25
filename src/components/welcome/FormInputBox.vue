<template>
  <div class="input-group">
    <label :for="id">{{ name }}</label>
    <input :type="type" :id="id" />
  </div>
</template>

<script setup>
defineProps([
  "id",
  "name",
  "type",
  "value"
])
</script>

<style></style>