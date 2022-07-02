<template>
  <div class="dash-control-card" size="sm" with-btn>
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><CopyDocument /></el-icon>
      <div class="dash-control-card-title-content">广播</div>
    </div>

    <div class="dash-control-card-content" v-loading="sending">
      <el-radio-group
        v-model="sendTypeString"
        class="dash-control-card-broadcast-content-item"
      >
        <el-radio-button label="群聊" />
        <el-radio-button label="好友" />
      </el-radio-group>
      <el-input
        class="dash-control-card-broadcast-content-item"
        v-model="content"
        :rows="4"
        type="textarea"
        placeholder="在这里输入需要广播的内容嗷"
        resize="none"
      />
    </div>
    <div class="dash-control-card-apply">
      <el-button type="primary" :loading="sending" @click="broadcast()">发送</el-button>
    </div>
  </div>
</template>

<script setup>
import { ElNotification } from "element-plus";
import { ref, watch } from "vue";

defineProps({
  input: {
    type: String,
    default: "",
  },
});

let sendTypeString = ref("群聊");
let sendType = ref('group');
let content = ref("");
let sending = ref(false);

watch(
  sendTypeString,
  (newItem, originItem) => {
    switch (newItem) {
      case "群聊":
        sendType.value = 'group';
        break;
    
      case "好友":
        sendType.value = 'friend';
        break;
    }
  }
)

async function broadcast() {

  sending.value = true;

  const resp = await fetch("/api/dash/control/broadcast", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: content.value,
      type: sendType.value
    }),
  });
  let data = await resp.json();

  sending.value = false;

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
      message: `已发送 ${data.data.complete}/${data.data.total} 个${sendTypeString.value}`,
      type: "success",
      position: "bottom-right",
    });
    content.value = "";
  }

}

</script>

<style scoped>
</style>