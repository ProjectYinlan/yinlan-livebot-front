<template v-if="status == 'active'"></template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

let status = ref();

async function loadData() {
  let resp = await fetch("/api");
  let data = await resp.json();
  status.value = data.status;
}

onMounted(async () => {
  await loadData();
});

watch(
    status,
    (newItem, originItem) => {
        if (newItem == 'uninitialized') {
          router.push('/welcome')
        }
    }
)
</script>

<style scoped>
</style>