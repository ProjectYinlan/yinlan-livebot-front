<template>
  <el-dialog v-model="dialogVisible" title="设置">
    <div class="settings-dialog">
      <el-alert
        title="如果您需要重新设置连接地址、Bot QQ 等信息，请点击 “重置设置”，该操作不会删除已有数据，配置修改及权限分配预计将在下版本更新"
        type="info"
        show-icon
        :closable="false"
      />
      <el-popconfirm
        v-if="unreseted"
        title="确认重置？"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="resetConfig"
      >
        <template #reference>
          <el-button
            type="danger"
            class="settings-dialog-btn"
            :loading="reseting"
            >重置设置</el-button
          >
        </template>
      </el-popconfirm>

      <el-result
        v-else
        icon="success"
        title="重置完毕"
        sub-title="请手动重启整个洇岚程序，重启后该页面将自动跳转至配置页面"
      />
    </div>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

let dialogVisible = ref(props.modelValue);
watch(
  () => props.modelValue,
  (newItem, originItem) => {
    dialogVisible.value = newItem;
  }
);
watch(dialogVisible, (newItem, originItem) => {
  emits("update:modelValue", newItem);
});

let unreseted = ref(true);
let reseting = ref(false);

async function resetConfig() {
  reseting.value = true;

  let resp = await fetch("/api/dash/control/setting/resetConfig", {
    method: "post",
  });
  let data = await resp.json();

  reseting.value = false;

  if (data.code) {
    ElMessage.error(`${data.code}：${data.msg}`);
    return;
  }

  ElMessage.success(data.msg);
  unreseted.value = false;

  let reqInterval = setInterval(async () => {
    Promise.race([
      fetch("/api"),
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error("request timeout")), 2000);
      }),
    ]).then((data) => {
      clearInterval(reqInterval);
      window.location = "/";
    });
  }, 5000);
}
</script>

<style scoped>
</style>