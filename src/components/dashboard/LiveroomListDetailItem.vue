<template>
  <ContactItem :name="name" :number="id" :type="type" v-loading="itemLoading">
    全体提醒
    <el-switch
      v-model="atAllValue"
      :loading="atAllLoading"
      :beforeChange="setAtAll"
    />
    <el-popconfirm
      title="确认解除绑定？"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="unbind"
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
      @bound="refresh"
    />
  </ContactItem>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import ContactItem from "./ContactItem.vue";

const emits = defineEmits(["unbound"]);
const props = defineProps({
  name: {
    type: String,
    defalut: "NAME",
  },
  id: {
    type: Number,
    defalut: null,
  },
  parentId: {
    type: Number,
    defalut: null,
  },
  type: {
    type: String,
    defalut: null,
  },
  atAll: {
    type: Boolean,
    defalut: false,
  },
});

let itemLoading = ref(false);

let atAllValue = ref(props.atAll);
let atAllLoading = ref(false);

async function setAtAll() {

  atAllLoading.value = true;

  let data = {};

  switch (props.type) {
    case "liveroom":
      data = {
        uid: props.id,
        groupId: props.parentId,
        atAll: !atAllValue.value,
      };
      break;

    case "group":
      data = {
        uid: props.parentId,
        groupId: props.id,
        atAll: !atAllValue.value,
      };
      break;

    default:
      return;
  }

  let resp = await fetch("/api/dash/control/liveroomList/setAtAll", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  data = await resp.json();

  atAllLoading.value = false;

  if (data.code) {
    ElMessage.error(`${data.code}：${data.msg || data.message}`);
    return false;
  } else {
    ElMessage.success(`修改成功`);
    return true;
  }
}

async function unbind() {

  itemLoading.value = true;

  let data = {};

  switch (props.type) {
    case "liveroom":
      data = {
        uid: props.id,
        groupId: props.parentId
      };
      break;

    case "group":
      data = {
        uid: props.parentId,
        groupId: props.id
      };
      break;

    default:
      return;
  }

  let resp = await fetch("/api/dash/control/liveroomList/unbind", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  data = await resp.json();

  itemLoading.value = false;

  if (data.code) {
    ElMessage.error(`${data.code}：${data.msg || data.message}`);
  } else {
    ElMessage.success(`操作成功`);
    emits("unbound");
  }

}
</script>

<style scoped>
</style>