<template>
  <div class="input-toggle-group">
    <label :for="id">{{ name }}</label>
    <div class="input-toggle-parent">
      <input
        type="checkbox"
        class="input-toggle"
        :id="id"
      />
      <div class="input-toggle-switch">
        <div class="input-toggle-inner">
          <div class="input-toggle-disc"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps([
  "id",
  "name"
])
</script>

<style></style>