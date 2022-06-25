<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><User /></el-icon>
      <div class="dash-control-card-title-content">直播间绑定列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs stretch="true">
        <el-tab-pane label="群视图">
          <el-scrollbar>
            <ContactItem
              name="洇岚窝"
              number="259565487"
              avatar="/assets/imgs/yinlanwo.jpg"
              count="3"
            />
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="直播间视图">
          <el-scrollbar>
            <ContactItem
              name="路过的玖叁"
              number="uid: 12583120"
              avatar="assets/imgs/colour93.jpg"
              count="1"
            />
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import ContactItem from "../ContactItem.vue";
</script>

<style scoped>
</style>