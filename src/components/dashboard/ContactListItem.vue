<template>
  <ContactItem :name="name" :number="id" :type="type">
    <el-tag class="tag" v-if="tagShow" :type="tagType">{{
      tagText
    }}</el-tag>
    <el-popconfirm
      title="确认删除？"
      confirm-button-text="确认"
      cancel-button-text="取消"
      @confirm="remove()"
    >
      <template #reference>
        <el-button type="danger" circle
          ><el-icon><Delete /></el-icon
        ></el-button>
      </template>
    </el-popconfirm>
  </ContactItem>
</template>

<script setup>

import { ElNotification } from "element-plus";

import ContactItem from "./ContactItem.vue";

const emit = defineEmits(["removed"]);

const props = defineProps({
  type: {
    default: "TYPE",
    type: String,
  },
  name: {
    default: "NAME",
    type: String,
  },
  id: {
    default: 10000,
    type: Number,
  },
  permission: {
    default: null,
    type: String,
  },
  role: {
    default: null,
    type: String,
  }
});

let tagType = "";
let tagText = "";
let tagShow = true;

if (props.type == 'group') {

  switch (props.permission) {
    case "MEMBER":
      tagType = "";
      tagText = "成员";
      break;

    case "ADMINISTRATOR":
      tagType = "success";
      tagText = "管理";
      break;

    case "OWNER":
      tagType = "warning";
      tagText = "群主";
      break;

    default:
      tagShow = false;
      break;
  }

}

if (props.type == 'friend') {

  switch (props.role) {

    case "normal":
      tagShow = false;
      break;

    case "bot":
      tagType = "";
      tagText = "Bot";
      break;

    case "admin":
      tagType = "success";
      tagText = "管理";
      break;

    case "owner":
      tagType = "warning";
      tagText = "主人";
      break;

    default:
      tagShow = false;
      break;
  }

}


/**
 * 删好友&群
 */
async function remove() {
  const resp = await fetch("/api/dash/control/contactList/remove", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: props.type,
      id: props.id,
    }),
  });
  let data = await resp.json();

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
    emit("removed", {
      id: props.id,
      type: props.type,
    });
  }
}
</script>

<style scoped>
</style>