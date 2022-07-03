<template>
  <div v-loading="loading">
    <div class="dash-bg"></div>
    <div class="dash-title">
      <div class="dash-title-content">洇岚 控制面板</div>
      <div class="dash-title-broadcast" v-html="broadcastMsg"></div>
      <div class="dash-title-settings">
        <el-avatar class="dash-title-settings-avatar" shape="circle" :size="40" :src="`//q2.qlogo.cn/headimg_dl?dst_uin=${accountData ? accountData.id : 1}&spec=640`" />
        <el-dropdown>
          <el-button type="" size="large" circle
            ><el-icon><Setting /></el-icon
          ></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="settingDialogVisible = true">设置</el-dropdown-item>
              <el-dropdown-item @click="logout" divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="dash-content">
      <SettingsDialog v-model="settingDialogVisible" />
      <div class="dash-content-col">
        <OverviewStatsCard
          :groupCount="overviewStatsCardData.groupCount"
          :followCount="overviewStatsCardData.followCount"
          :pushCount="overviewStatsCardData.pushCount"
        />
        <AuditControlCard :auditList="auditControlCardData" />
      </div>

      <div class="dash-content-col">
        <BilibiliStatsCard
          :mode="bilibiliStatsCardData.mode"
          :accountName="bilibiliStatsCardData.accountName"
          :followUserCount="bilibiliStatsCardData.followUserCount"
        />

        <LiveroomControlCard :liveroomList="liveroomControlCardData" />
      </div>

      <div class="dash-content-col">
        <YinlanStatsCard
          :version="yinlanStatsCardData.version"
          :updateDate="yinlanStatsCardData.updateDate"
          :runningTime="yinlanRunningTime"
        />

        <BroadcastControlCard />

        <LiveroomOptionsControlCard :data="liveroomOptionsControlCardData" @liveroomOptionsChange="loadBilibiliData" />
      </div>

      <div class="dash-content-col">
        <ContactListControlCard :contactList="contactListControlCardData" />
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import "../../stylesheets/dashboard.css";

import SettingsDialog from "../components/dashboard/Dialogs/SettingsDialog.vue";

import OverviewStatsCard from "../components/dashboard/StatsCards/OverviewStatsCard.vue";
import BilibiliStatsCard from "../components/dashboard/StatsCards/BilibiliStatsCard.vue";
import YinlanStatsCard from "../components/dashboard/StatsCards/YinlanStatsCard.vue";

import AuditControlCard from "../components/dashboard/ControlCards/AuditControlCard.vue";
import LiveroomControlCard from "../components/dashboard/ControlCards/LiveroomControlCard.vue";
import BroadcastControlCard from "../components/dashboard/ControlCards/BroadcastControlCard.vue";
import LiveroomOptionsControlCard from "../components/dashboard/ControlCards/LiveroomOptionsControlCard.vue";
import ContactListControlCard from "../components/dashboard/ControlCards/ContactListControlCard.vue";

import Footer from "../components/Footer.vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

let loading = ref(true);

let broadcastMsg = ref("未能从公告板获取数据，不过这并不影响使用");
let accountData = ref({});

let settingDialogVisible = ref(false);

let overviewStatsCardData = ref({});
let bilibiliStatsCardData = ref({});
let yinlanStatsCardData = ref({});

let yinlanRunningTime = ref(0);

let auditControlCardData = ref([]);
let liveroomControlCardData = ref({});
let liveroomOptionsControlCardData = ref({});
let contactListControlCardData = ref({});

async function loadData(flag) {

  let resp = await fetch("https://yinlan-bot.oss-cn-beijing.aliyuncs.com/livebot/broadcast.json");
  let data = await resp.json();
  broadcastMsg.value = data.content;

  resp = await fetch("/api/dash");
  data = await resp.json();

  loading.value = false;

  if (data.code) {
    ElMessage.error("无权访问或未登录，正在跳转……");
    router.push('/');
    return;
  };
  data = data.data;

  accountData.value = data.account;

  overviewStatsCardData.value = data.stats.overview;
  bilibiliStatsCardData.value = data.stats.bilibili;
  yinlanStatsCardData.value = data.stats.yinlan;

  yinlanRunningTime.value = yinlanStatsCardData.value.runningTime;

  auditControlCardData.value = data.cards.auditList;
  liveroomControlCardData.value = data.cards.liveroomList;
  liveroomOptionsControlCardData.value = data.cards.liveroomOptions;
  contactListControlCardData.value = data.cards.contactList;

  if (flag) {
    setInterval(() => {
      yinlanRunningTime.value++;
    }, 1000);
  }

}

onMounted(async () => {
  await loadData(1);
  setInterval(async () => {
    await loadData();
  }, 60000);
});

async function loadBilibiliData() {

  let resp = await fetch("/api/dash/stats/bilibili");
  let data = await resp.json();

  if (data.code) return;

  bilibiliStatsCardData.value = data.data;

}

async function logout () {

  let resp = await fetch("/api/auth/logout");
  let data = await resp.json();

  if (data.code) {
    ElMessage.error(`登出失败：${data.code}-${data.msg}`);
    return;
  }

  ElMessage.success("已成功登出~");
  router.push('/');
}

</script>

<style></style>