<template>
  <div class="dash-control-card" size="lg">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><ChatDotSquare /></el-icon>
      <div class="dash-control-card-title-content">群/好友 列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群聊">
          <el-scrollbar v-if="contactList.group && contactList.group.length">
            <div v-for="groupItem in contactList.group" :key="groupItem.id">
              <ContactItem
                :name="groupItem.name"
                :number="groupItem.id"
                type="group"
              >
                <el-tag
                  class="tag"
                  v-if="groupItem.permission == 'OWNER'"
                  type="warning"
                  >群主</el-tag
                >
                <el-tag
                  class="tag"
                  v-if="groupItem.permission == 'ADMINISTRATOR'"
                  type="success"
                  >管理</el-tag
                >
                <el-tag
                  class="tag"
                  v-if="groupItem.permission == 'MEMBER'"
                  type=""
                  >成员</el-tag
                >
                <el-button type="danger" circle
                  ><el-icon><Delete /></el-icon
                ></el-button>
              </ContactItem>
            </div>
          </el-scrollbar>
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>

        <el-tab-pane label="好友">
          <el-scrollbar v-if="contactList.friend && contactList.friend.length">
            <div v-for="friendItem in contactList.friend" :key="friendItem.id">
              <ContactItem
                :name="friendItem.name"
                :number="friendItem.id"
                type="friend"
              >
                <el-button type="danger" circle
                  ><el-icon><Delete /></el-icon
                ></el-button>
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
defineProps(["contactList"]);
</script>

<style scoped>
</style>