<template>
  <el-dialog v-model="visibleValue" title="添加直播间绑定">
    <div class="add-liveroom-dialog" v-loading="loading">
      <el-alert
        v-if="showAlert"
        title="该用户未在洇岚列表中，添加后将会自动关注"
        type="info"
        show-icon
        :closable="false"
      />
      <div class="add-liverom-dialog-input-group">
        <label for="uid-select">用户UID</label>
        <el-autocomplete
          type="number"
          v-model="uidValue"
          :fetch-suggestions="uidInputSearch"
          @blur="uidSelected"
          placeholder="请输入UID"
          id="uid-select"
          value-key="id"
          :highlight-first-item="true"
        >
          <template #suffix>
            <el-icon class="el-input__icon">
              <Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="condidate">
              <div class="left">
                <el-avatar
                  :src="`/api/transfer/biliAvatar?uid=${item.id}`"
                ></el-avatar>
              </div>
              <div class="right">
                <strong class="name">{{ item.name }}</strong>
                <div class="id">{{ item.id }}</div>
              </div>
            </div>
          </template>
        </el-autocomplete>
        <div class="add-liveroom-dialog-preview" v-if="selectedBiliUserID">
          <el-avatar
            size="small"
            :src="`/api/transfer/biliAvatar?uid=${selectedBiliUserID}`"
          ></el-avatar>
          <span>{{ selectedBiliUserName }}</span>
        </div>
      </div>
      <div class="add-liverom-dialog-input-group">
        <label for="group-select">群号</label>

        <el-autocomplete
          type="number"
          v-model="groupValue"
          :fetch-suggestions="groupInputSearch"
          @blur="groupSelected"
          placeholder="请输入群号"
          id="group-select"
          value-key="id"
          :highlight-first-item="true"
        >
          <template #suffix>
            <el-icon class="el-input__icon">
              <Search />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="condidate">
              <div class="left">
                <el-avatar
                  :src="`//p.qlogo.cn/gh/${item.id}/${item.id}/640/`"
                ></el-avatar>
              </div>
              <div class="right">
                <strong class="name">{{ item.name }}</strong>
                <div class="id">{{ item.id }}</div>
              </div>
            </div>
          </template>
        </el-autocomplete>
        <div class="add-liveroom-dialog-preview" v-if="selectedGroupID">
          <el-avatar
            size="small"
            :src="`//p.qlogo.cn/gh/${selectedGroupID}/${selectedGroupID}/640/`"
          ></el-avatar>
          <span>{{ selectedGroupName }}</span>
        </div>
      </div>
      <div class="add-liverom-dialog-input-group">
        <label for="add-liverom-dialog-atall">全体提醒</label>
        <el-switch id="add-liverom-dialog-atall" v-model="atAll" />
      </div>
      <el-button
        class="add-liveroom-dialog-apply-btn"
        type="primary"
        @click="addNewBind"
        >添加绑定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";

const emit = defineEmits(["update:modelValue", "bound"]);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

let visibleValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  async (newItem, originItem) => {
    visibleValue.value = newItem;
    if (newItem) {
      let resp = await fetch("/api/dash/control/liveroomList/getCondidateData");
      let data = await resp.json();

      if (data.code) {
        ElMessage({
          message: `获取候选信息失败：${data.code} - ${data.msg || data.message}`,
          type: "warning",
        });
        return;
      }

      groupList.value = data.data.groupList;
      liveroomList.value = data.data.liveroomList;
    }
  }
);
watch(visibleValue, (newItem, originItem) => {
  emit("update:modelValue", newItem);
});

let groupList = ref([]);
let liveroomList = ref([]);

let loading = ref(false);

let uidValue = ref("");
let groupValue = ref("");

let showAlert = ref(false);

let selectedBiliUserID = ref(0);
let selectedBiliUserName = ref("");

let selectedGroupID = ref(0);
let selectedGroupName = ref("");

let atAll = ref(false);

function uidInputSearch(inputString, callback, biliUser) {
  if (biliUser) {
    callback([biliUser]);
    return;
  }
  const results = inputString
    ? liveroomList.value.filter(candidateFilter(inputString))
    : liveroomList.value;
  callback(results);
}

function groupInputSearch(inputString, callback) {
  const results = inputString
    ? groupList.value.filter(candidateFilter(inputString))
    : groupList.value;
  callback(results);
}

function candidateFilter(input) {
  return (candidate) => {
    return candidate.id.toString().includes(input);
  };
}

async function uidSelected(e) {
  // 进行消抖
  if (
    !e.relatedTarget.className ||
    e.relatedTarget.className ==
      "el-popper is-pure is-light el-autocomplete__popper" ||
    uidValue.value == ""
  )
    return;

  let resultList = liveroomList.value.filter((item) => {
    if (item.id == uidValue.value) return true;
  });

  if (resultList.length) {
    selectedBiliUserID.value = uidValue.value;
    selectedBiliUserName.value = resultList[0]["name"];
    showAlert.value = false;
    return;
  }

  let resp = await fetch(`/api/transfer/biliInfo?uid=${uidValue.value}`);
  let data = await resp.json();

  if (data.code) {
    if (data.code == -404) data.msg = "没有找到该用户";
    ElMessage({
      message: `${data.code}: ${data.msg || data.message}`,
      type: "error",
    });
    return;
  }

  selectedBiliUserID.value = uidValue.value;
  selectedBiliUserName.value = data.data.name;
  showAlert.value = true;
}

async function groupSelected(e) {
  // 进行消抖
  if (
    !e.relatedTarget.className ||
    e.relatedTarget.className ==
      "el-popper is-pure is-light el-autocomplete__popper" ||
    groupValue.value == ""
  )
    return;

  let condidate = groupList.value.filter((item) => {
    if (item.id == groupValue.value) return true;
  });
  if (!condidate.length) {
    ElMessage({
      message: `-404: 没有找到该群聊`,
      type: "error",
    });
    return;
  }
  selectedGroupID.value = groupValue.value;
  selectedGroupName.value = condidate[0]["name"];
}

async function addNewBind() {
  loading.value = true;

  let resp = await fetch("/api/dash/control/liveroomList/addNewBind", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: parseInt(uidValue.value),
      groupId: parseInt(groupValue.value),
      atAll: atAll.value,
    }),
  });
  let data = await resp.json();

  loading.value = false;
  visibleValue.value = false;

  if (data.code) {
    ElNotification({
      title: "绑定失败",
      message: `${data.code}：${data.msg || data.message}`,
      type: "error",
      position: "bottom-right",
    });
  } else {
    ElNotification({
      title: "绑定成功",
      message: `${data.msg || data.message}`,
      type: "success",
      position: "bottom-right",
    });
    emit("bound");
  }
}
</script>

<style scoped>
</style>
