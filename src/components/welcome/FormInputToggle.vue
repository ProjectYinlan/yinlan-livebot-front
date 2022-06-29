<template>
  <div class="input-toggle-group">
    <label :for="id">{{ name }}</label>
    <div class="input-toggle-parent">
      <input
        type="checkbox"
        class="input-toggle"
        :id="id"
        :checked="toggleValue"
        @change="changeHandle"
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

import { ref } from "vue";
const emit = defineEmits(['update:modelValue']);
const props = defineProps([
  "id",
  "name",
  "value"
])

let toggleValue = ref(props.value);
function changeHandle (e) {
  toggleValue.value = e.target.checked;
  emit('update:modelValue', toggleValue.value);
}

</script>

<style></style>