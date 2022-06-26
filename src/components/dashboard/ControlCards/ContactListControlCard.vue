<template>
  <div class="dash-control-card" size="lg">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><ChatDotSquare /></el-icon>
      <div class="dash-control-card-title-content">群/好友 列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群聊">
          <el-scrollbar>
            <div v-for="groupItem in contactList.group" :key="groupItem.id">
            <ContactItem
              :name="groupItem.name"
              :number="groupItem.id"
              :avatar="groupItem.avatar"
            >
              <el-button type="primary" circle
                ><el-icon><Document /></el-icon
              ></el-button>
              <el-button type="danger" circle
                ><el-icon><Delete /></el-icon
              ></el-button>
            </ContactItem>

            </div>
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="好友">
          <div v-for="friendItem in contactList.friend" :key="friendItem.id">
            <ContactItem
              :name="friendItem.name"
              :number="friendItem.id"
              :avatar="friendItem.avatar"
            >
              <el-button type="primary" circle
                ><el-icon><Document /></el-icon
              ></el-button>
              <el-button type="danger" circle
                ><el-icon><Delete /></el-icon
              ></el-button>
            </ContactItem>

            </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import ContactItem from "../ContactItem.vue";
defineProps(["contactList"]);
</script>

<style scoped>
</style>