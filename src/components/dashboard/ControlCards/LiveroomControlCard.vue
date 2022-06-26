<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><User /></el-icon>
      <div class="dash-control-card-title-content">直播间绑定列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群视图">
          <el-scrollbar>
            <div v-for="groupItem in liveroomList.groupView" :key="groupItem.id">
              <ContactItem
                :name="groupItem.name"
                :number="groupItem.id"
                :avatar="groupItem.avatar"
              >
                <el-button
                  type="primary"
                  circle
                  class="dash-control-card-contact-item-btn"
                  >{{ groupItem.count }}</el-button
                >
              </ContactItem>
            </div>
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="直播间视图 (uid)">
          <el-scrollbar>
            <div v-for="liveroomItem in liveroomList.liveroomView" :key="liveroomItem.id">
              <ContactItem
                :name="liveroomItem.name"
                :number="liveroomItem.id"
                :avatar="liveroomItem.avatar"
              >
                <el-button
                  type="primary"
                  circle
                  class="dash-control-card-contact-item-btn"
                  >{{ liveroomItem.count }}</el-button
                >
              </ContactItem>
            </div>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import ContactItem from "../ContactItem.vue";
defineProps(["liveroomList"]);
</script>

<style scoped>
</style>