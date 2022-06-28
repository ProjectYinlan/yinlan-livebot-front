<template>
  <div class="dash-control-card" size="lg">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><ChatDotSquare /></el-icon>
      <div class="dash-control-card-title-content">群/好友 列表</div>
      <div class="dash-control-card-title-btn">
        <el-button circle @click="refresh()"
          ><el-icon><Refresh /></el-icon
        ></el-button>
      </div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群聊">
          <el-scrollbar
            v-if="contactListData.group && contactListData.group.length"
          >
            <div v-for="groupItem in contactListData.group" :key="groupItem.id">
              <ContactListItem
                type="group"
                :id="groupItem.id"
                :name="groupItem.name"
                :permission="groupItem.permission"
                @removed="removeItem"
              />
            </div>
          </el-scrollbar>
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>

        <el-tab-pane label="好友">
          <el-scrollbar
            v-if="contactListData.friend && contactListData.friend.length"
          >
            <div
              v-for="friendItem in contactListData.friend"
              :key="friendItem.id"
            >
              <ContactListItem
                type="friend"
                :id="friendItem.id"
                :name="friendItem.name"
                @removed="removeItem"
              />
            </div>
          </el-scrollbar>
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElNotification } from "element-plus";
import ContactListItem from "../ContactListItem.vue";
const props = defineProps(["contactList"]);

let contactListData = ref(props.contactList);

watch(
  () => props.contactList,
  (newItem, originItem) => {
    contactListData.value = newItem;
  }
);

function removeItem(data) {
  const { id, type } = data;

  for (let i = 0; i < contactListData.value[type].length; i++) {
    const e = contactListData.value[type][i];
    if (e.id == id) {
      contactListData.value[type].splice(i, 1);
      return;
    }
  }
}

async function refresh() {
  let resp = await fetch("/api/dash/control/contactList");
  let data = await resp.json();

  if (data.code) {
    ElNotification({
      title: "刷新失败",
      message: `${data.code}：${data.msg}`,
      type: "error",
      position: "bottom-right",
    });
  } else {
    ElNotification({
      title: "刷新成功",
      type: "success",
      position: "bottom-right",
    });
    contactListData.value = data.data;
  }
}
</script>

<style scoped>
</style>