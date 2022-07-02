<template>
  <div class="dash-control-card" size="md">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><User /></el-icon>
      <div class="dash-control-card-title-content">直播间绑定列表</div>
      <div class="dash-control-card-title-btn">
        <el-button @click="addLiveroomDialogVisible = true" circle
          ><el-icon><Plus /></el-icon
        ></el-button>
      </div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs :stretch="true">
        <el-tab-pane label="群视图">
          <el-scrollbar
            v-if="
              liveroomListData.groupView && liveroomListData.groupView.length
            "
          >
            <div
              v-for="groupItem in liveroomListData.groupView"
              :key="groupItem.id"
            >
              <LiveroomListItem @change="refresh" type="group" :id="groupItem.id" :name="groupItem.name" :count="groupItem.count" />
            </div>
          </el-scrollbar>
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>

        <el-tab-pane label="直播间视图 (uid)">
          <el-scrollbar
            v-if="
              liveroomListData.liveroomView &&
              liveroomListData.liveroomView.length
            "
          >
            <div
              v-for="liveroomItem in liveroomListData.liveroomView"
              :key="liveroomItem.id"
            >
              <LiveroomListItem @change="refresh" type="liveroom" :id="liveroomItem.id" :name="liveroomItem.name" :count="liveroomItem.count" />
            </div>
          </el-scrollbar>
          <el-empty v-else description="这里空空如也" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <AddLiveroomDialog v-model="addLiveroomDialogVisible" @bound="refresh" />
  </div>
</template>

<script setup>
import { ElNotification } from "element-plus";
import { ref, watch } from "vue";
import LiveroomListItem from "../LiveroomListItem.vue";
import AddLiveroomDialog from "../Dialogs/AddLiveroomDialog.vue";
const props = defineProps(["liveroomList"]);

let liveroomListData = ref(props.liveroomList);
watch(
  () => props.liveroomList,
  (newItem, originItem) => {
    liveroomListData.value = newItem;
  }
);

let addLiveroomDialogVisible = ref(false);

async function refresh() {
  let resp = await fetch("/api/dash/control/liveroomList");
  let data = await resp.json();

  if (data.code) {
    ElNotification({
      title: "获取直播间绑定列表失败",
      message: `${data.code}：${data.msg || data.message}`,
      type: "error",
      position: "bottom-right",
    });
    return;
  }

  liveroomListData.value = data.data;
}


</script>

<style scoped>
</style>