<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <div class="dash-control-card-title-icon"></div>
      <el-icon><Document /></el-icon>
      <div class="dash-control-card-title-content">申请列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-scrollbar>
        <div v-for="auditItem in auditList" :key="auditItem.eid">
          <AuditItem
            :type="auditItem.type"
            :name="auditItem.name"
            :number="auditItem.id"
            :desc="auditItem.desc"
            :avatar="auditItem.avatar"
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import AuditItem from "../AuditItem.vue";
defineProps(["auditList"]);
</script>

<style scoped>
</style>