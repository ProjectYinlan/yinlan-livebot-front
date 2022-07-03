<template>
  <div class="input-group">
    <label :for="id">{{ name }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      :value="inputValue"
      @input="inputHandle"
    />
  </div>
</template>

<script setup>

import { ref, watch } from "vue";
const emits = defineEmits(['update:modelValue']);
const props = defineProps(["id", "name", "modelValue", "type", "placeholder"]);

let inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newItem, originItem) => {
    inputValue.value = newItem;
  }
)

function inputHandle (e) {
  inputValue.value = e.target.value;
  let emitValue = inputValue.value;
  if (props.type == 'number') {
    emitValue = parseInt(emitValue);
  }
  emits('update:modelValue', emitValue);
}

</script>

<style></style>