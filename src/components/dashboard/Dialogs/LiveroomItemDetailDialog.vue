<template>
  <el-dialog v-model="visibleValue" :title="title">
    <el-scrollbar v-if="dataList.length">
      <div v-for="data in dataList" :key="data.id">
        <LiveroomItemDetailItem
          :name="data.name"
          :id="data.id"
          :type="type == 'group' ? 'liveroom' : 'group'"
          :parentId="targetId"
          :atAll="data.atAll"
          @unbound="refresh(1)"
        />
      </div>
    </el-scrollbar>

    <el-empty v-else description="这里空空如也"> </el-empty>
  </el-dialog>
</template>

<script setup>
import LiveroomItemDetailItem from "../LiveroomListDetailItem.vue";
import { ref, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";

const emit = defineEmits(["update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: null,
  },
  targetId: {
    type: Number,
    default: null,
  },
  title: {
    type: String,
    default: "详情页",
  },
});

let visibleValue = ref(props.modelValue);
let dataList = ref([]);

watch(
  () => props.modelValue,
  async (newItem, originItem) => {
    visibleValue.value = newItem;
    if (newItem) await refresh();
  }
);
watch(visibleValue, (newItem, originItem) => {
  emit("update:modelValue", newItem);
});

async function refresh(flag) {

    if (flag) emit("change");

  let url =
    props.type == "group"
      ? `/api/dash/control/liveroomList/getGroupDetail?groupId=${props.targetId}`
      : `/api/dash/control/liveroomList/getLiveroomDetail?uid=${props.targetId}`;

  let resp = await fetch(url);
  let data = await resp.json();

  if (data.code) {
    ElMessage({
      message: `获取信息失败：${data.code} - ${data.msg || data.message}`,
      type: "error",
    });
    return;
  }

  dataList.value = data.data;
}
</script>

<style scoped>
</style>
