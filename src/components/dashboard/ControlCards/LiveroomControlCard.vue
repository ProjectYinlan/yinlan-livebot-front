<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><User /></el-icon>
      <div class="dash-control-card-title-content">直播间绑定列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群视图">
          <el-scrollbar v-if="liveroomList.groupView && liveroomList.groupView.length">
            <div v-for="groupItem in liveroomList.groupView" :key="groupItem.id">
              <ContactItem
                :name="groupItem.name"
                :number="groupItem.id"
                type="group"
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
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>

        <el-tab-pane label="直播间视图 (uid)">
          <el-scrollbar v-if="liveroomList.liveroomView && liveroomList.liveroomView.length">
            <div v-for="liveroomItem in liveroomList.liveroomView" :key="liveroomItem.id">
              <ContactItem
                :name="liveroomItem.name"
                :number="liveroomItem.id"
                type="bilibili"
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
          <el-empty v-else description="这里空空如也" />
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