<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <div class="dash-control-card-title-icon"></div>
      <el-icon><Document /></el-icon>
      <div class="dash-control-card-title-content">申请列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-scrollbar v-if="auditListData.length">
        <div v-for="auditItem in auditListData" :key="auditItem.eid">
          <AuditItem
            :eventId="auditItem.eid"
            :type="auditItem.type"
            :name="auditItem.name"
            :id="auditItem.id"
            :fromName="auditItem.fromName"
            :fromId="auditItem.fromId"
            :desc="auditItem.desc"
            :ts="auditItem.ts"
            @operated="removeItem"
          />
        </div>
      </el-scrollbar>
      <el-empty v-else description="这里空空如也" />
    </div>
  </div>
</template>

<script setup>
import AuditItem from "../AuditItem.vue";

import { ref, watch } from "vue";

const props = defineProps(["auditList"]);

let auditListData = ref(props.auditList);

setInterval(async () => {refresh()}, 5000);

watch(
  () => props.auditList,
  (newItem, originItem) => {
    auditListData.value = newItem;
  }
);

async function refresh(flag) {
  let resp = await fetch("/api/dash/control/auditList");
  let data = await resp.json();

  if (data.code) return;

  auditListData.value = data.data;
}

function removeItem(eid) {
  for (let i = 0; i < auditListData.value.length; i++) {
    const e = auditListData.value[i];
    if (e.eid == eid) auditListData.value.splice(i, 1);
  }
}
</script>

<style scoped>
</style>