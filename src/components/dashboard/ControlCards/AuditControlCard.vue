<template>
  <div class="dash-control-card" size="md">
        <div class="dash-control-card-title">
          <div class="dash-control-card-title-icon"></div>
          <el-icon><Document /></el-icon>
          <div class="dash-control-card-title-content">申请列表</div>
        </div>

        <div class="dash-control-card-content">
          <el-scrollbar>

            <AuditItem type="friend" name="洇岚" number="2811520355" desc="uwu" />

            <AuditItem type="group" name="福瑞之家" number="275720357" desc="uwu" avatar="/assets/imgs/furryhome.jpg" />

          </el-scrollbar>
        </div>
      </div>
</template>

<script setup>
import AuditItem from "../AuditItem.vue";
</script>

<style scoped>
</style>