<template>
  <div class="dash-control-card" size="sm" with-btn>
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><Setting /></el-icon>
      <div class="dash-control-card-title-content">直播检测选项</div>
    </div>

    <div class="dash-control-card-content">
      <div class="row-center">
        <div class="row-center-title">工作模式</div>
        <el-switch
          v-model="mode"
          class="ml-2"
          style="
            --el-switch-on-color: var(--color-bilibot-auth);
            --el-switch-off-color: var(--color-bilibot-anonymous);
          "
          active-value="auth"
          inactive-value="anonymous"
          active-text="登录账号"
          inactive-text="匿名"
        />
      </div>

      <div class="row-center">
        <div class="row-center-title">检测间隔</div>
        <el-input-number
          v-model="interval"
          :min="mode ? 10 : 60"
          :max="90"
          size="small"
        />
        秒
      </div>
    </div>
    <div class="dash-control-card-apply">
      <el-button type="primary" :loading="applyBtnLoading" @click="setCheckOptions()">应用</el-button>

      <el-popconfirm
        title="确认登出？"
        confirm-button-text="确认"
        cancel-button-text="取消"
        @confirm="logout()"
        v-if="accountStatus == 'authed'"
      >
        <template #reference>
          <el-button
            type="primary"
            plain
            :loading = "authBtnLoading"
            :disabled="mode == 'anonymous'"
            >登出</el-button
          >
        </template>
      </el-popconfirm>
      <el-button
        type="primary"
        plain
        v-else
        :disabled="mode == 'anonymous'"
        @click="showAuthDialog()"
        >登入</el-button
      >
    </div>

    <el-dialog v-model="authDialogVisible" title="登入账号">
      <div class="dash-control-card-live-options-auth-dialog">
        <div class="dash-control-card-live-options-auth-dialog-content">
          <div class="qr">
            <el-image
              v-loading="authQRLoading"
              :src="authQR"
              @click="getLoginQR()"
            />
          </div>
          <div class="context">
            <div>请使用 <strong>B站手机客户端</strong> 扫描二维码</div>
            <div>
              <strong>{{ authCount }}</strong> 秒后过期
            </div>
            <div>点击二维码以刷新</div>
            <div>账号凭证将本地存储</div>
            <el-alert
              v-if="authQRAlertText != ''"
              :title="authQRAlertText"
              :type="authQRAlertType"
              show-icon
              :closable="false"
            />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { ElNotification } from "element-plus";
import * as qrcode from "qrcode";

const props = defineProps(["data"]);
const emit = defineEmits(["liveroomOptionsChange"]);

let mode = ref("anonymous");
let interval = ref(60);
let accountStatus = ref("unauth");

let applyBtnLoading = ref(false);

let authBtnLoading = ref(false);
let authDialogVisible = ref(false);
let authQRLoading = ref(false);
let authQRAlertType = ref("info");
let authQRAlertText = ref("");
let authOAuthKey = ref("");
let authQR = ref("");
let authCount = ref(0);
let authInterval;

watch(
  () => props.data,
  (newItem, originItem) => {
    mode.value = newItem.mode;
    interval.value = newItem.interval;
    accountStatus.value = newItem.accountStatus;
  }
);

watch(mode, (newItem, originItem) => {
  if (newItem == props.data.mode) {
    interval.value = props.data.interval;
    return;
  }

  switch (newItem) {
    case "auth":
      interval.value = 10;
      break;

    case "anonymous":
      interval.value = 60;
      break;
  }
});

/**
 * 修改直播检测设置
 */
async function setCheckOptions() {

  applyBtnLoading.value = true;

  const resp = await fetch("/api/dash/control/liveroomOptions/setCheckOptions", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mode: mode.value,
      interval: interval.value
    })
  });
  let data = await resp.json();

  applyBtnLoading.value = false;

  if (data.code) {
    ElNotification({
      title: "操作失败",
      message: `${data.code}：${data.msg}`,
      type: "error",
      position: "bottom-right",
    });
    mode.value = props.mode;
    interval.value = props.interval;
  } else {
    ElNotification({
      title: "操作成功",
      type: "success",
      position: "bottom-right",
    });
    emit("liveroomOptionsChange");
  }

}

/**
 * 显示登陆对话框
 */
async function showAuthDialog() {
  authDialogVisible.value = true;

  // 先判断上次的剩多少时间过期
  if (authCount.value > 30) return;

  await getLoginQR();
}

/**
 * 获取登录二维码
 */
async function getLoginQR() {
  authQRLoading.value = true;
  authQRAlertText.value = "";

  const res = await fetch("/api/dash/control/liveroomOptions/getLoginQR");
  let data = await res.json();

  if (data.code) {
    authDialogVisible.value = false;
    ElNotification({
      title: "获取失败",
      message: `${data.code}：${data.msg}`,
      type: "error",
      position: "bottom-right",
    });
    return;
  }

  data = data.data;

  authOAuthKey.value = data.oauthKey;

  authQR.value = await qrcode.toDataURL(data.url);

  authCount.value = parseInt(data.ts + 180 - new Date().getTime() / 1000);

  // 定时器
  clearInterval(authInterval);
  authInterval = setInterval(() => {
    if (authCount.value == 0) {
      QRExpired();
      return;
    }
    if (!(authCount.value % 5)) {
      getLoginInfo();
    }
    authCount.value--;
  }, 1000);

  authQRLoading.value = false;
}

/**
 * 获取登录信息
 */
async function getLoginInfo() {
  const resp = await fetch("/api/dash/control/liveroomOptions/getLoginInfo", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      oauthKey: authOAuthKey.value,
    }),
  });
  let data = await resp.json();

  switch (data.code) {
    case 0:
      QRLogon(data.data);
      break;

    case -5:
      authQRAlertText.value = "已扫描，等待确认";
      authQRAlertType.value = "success";
      authQRLoading.value = true;
      return;

    case -4:
      return;

    case -2:
      QRExpired();
      return;

    default:
      authQRAlertText.value = `${data.code}：${data.msg}`;
      authQRAlertType.value = "error";
      return;
  }
}

/**
 * 二维码过期
 */
function QRExpired() {
  authCount.value == 0;
  clearInterval(authInterval);
  authOAuthKey.value = null;
  authQRLoading.value = false;
  authQRAlertText.value = "二维码已失效，请点击刷新";
  authQRAlertType.value = "error";
}

/**
 * 二维码已登录
 */
function QRLogon(data) {
  clearInterval(authInterval);
  const { uname, mid } = data;
  authDialogVisible.value = false;
  accountStatus.value = true;
  authCount.value == 0;
  authOAuthKey.value = null;
  authQRLoading.value = false;
  authQRAlertText.value = "";
  ElNotification({
    title: `已登录 ${uname}`,
    message: `uid: ${mid}`,
    type: "success",
    position: "bottom-right",
  });
  emit("liveroomOptionsChange");
}

/**
 * 登出
 */
async function logout() {

  authBtnLoading.value = true;

  const res = await fetch("/api/dash/control/liveroomOptions/logout");
  let data = await res.json();

  authBtnLoading.value = false;

  if (data.code) {
    ElNotification({
      title: "操作失败",
      message: `${data.code}：${data.msg}`,
      type: "error",
      position: "bottom-right",
    });
  } else {
    ElNotification({
      title: "操作成功",
      type: "success",
      position: "bottom-right",
    });
    accountStatus.value = false;
    emit("liveroomOptionsChange");
  }

}

</script>

<style scoped>
</style>