<template>
  <ContactItem :name="name" :number="id" :type="type" v-loading="">
    <el-button
      type="primary"
      circle
      class="dash-control-card-contact-item-btn"
      @click="showDetailDialog"
      >{{ count }}</el-button
    >
    <el-popconfirm
      :title="type == 'group' ? '确认清空？' : '确认删除？'"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="remove"
    >
      <template #reference>
        <el-button type="danger" circle
          ><el-icon><Delete /></el-icon
        ></el-button>
      </template>
    </el-popconfirm>
    <LiveroomItemDetailDialog
      v-model="detailDialogVisible"
      :type="detailDialogType"
      :targetId="detailDialogId"
      :title="detailDialogTitle"
      @change="change"
    />
  </ContactItem>
</template>

<script setup>
import { ref } from "vue";
import { ElNotification  } from "element-plus";
import ContactItem from "./ContactItem.vue";
import LiveroomItemDetailDialog from "./Dialogs/LiveroomItemDetailDialog.vue";

const props = defineProps({
  type: {
    default: null,
    type: String,
  },
  name: {
    default: "NAME",
    type: String,
  },
  id: {
    default: null,
    type: Number,
  },
  count: {
    default: 0,
    type: Number,
  },
});
const emits = defineEmits(["change"]);

let addLiveroomDialogVisible = ref(false);

let detailDialogVisible = ref(false);
let detailDialogType = ref("group");
let detailDialogId = ref(0);
let detailDialogTitle = ref("详情页");

let itemLoading = ref(false);

async function showDetailDialog() {
  detailDialogType.value = props.type;
  detailDialogId.value = props.id;
  detailDialogTitle.value = `${props.name} 的详情`;
  detailDialogVisible.value = true;
}

async function remove() {
  itemLoading.value = true;

  let url, data;

  switch (props.type) {
    case "group":
      url = "/api/dash/control/liveroomList/clearGroup";
      data = { groupId: props.id };
      break;

    case "liveroom":
      url = "/api/dash/control/liveroomList/removeLiveroom";
      data = { uid: props.id };
      break;

    default:
      return;
  }

  let resp = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  data = await resp.json();

  itemLoading.value = false;

  if (data.code) {
    ElNotification({
      title: "操作失败",
      message: `${data.code}：${data.msg || data.message}`,
      type: "error",
      position: "bottom-right",
    });
  } else {
    ElNotification({
      title: "操作成功",
      type: "success",
      position: "bottom-right",
    });
    emits("change");
  }
}

function change() {
  emits("change");
}
</script>

<style scoped>
</style>
