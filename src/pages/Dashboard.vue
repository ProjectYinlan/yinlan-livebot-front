<template>
  <div v-loading="loading">
    <div class="bg"></div>
    <div class="dash-title">
      <div class="dash-title-content">洇岚 控制面板</div>
      <div class="dash-title-broadcast" v-html="broadcastMsg"></div>
      <div class="dash-title-settings">
        <el-avatar class="dash-title-settings-avatar" shape="circle" :size="40" :src="`//q2.qlogo.cn/headimg_dl?dst_uin=${accountData.id}&spec=640`" />
        <el-dropdown>
          <el-button type="" size="large" circle
            ><el-icon><Setting /></el-icon
          ></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided>登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="dash-content">
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

        <LiveroomOptionsControlCard :data="liveroomOptionsControlCardData" />
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

let loading = ref(true);

let broadcastMsg = ref("未能从公告板获取数据，不过这并不影响使用");
let accountData = ref({});

let overviewStatsCardData = ref({});
let bilibiliStatsCardData = ref({});
let yinlanStatsCardData = ref({});

let yinlanRunningTime = ref(0);

let auditControlCardData = ref([]);
let liveroomControlCardData = ref({});
let liveroomOptionsControlCardData = ref({});
let contactListControlCardData = ref({});

async function loadData(flag) {

  let res = await fetch("https://yinlan-bot.oss-cn-beijing.aliyuncs.com/livebot/broadcast.json");
  let data = await res.json();
  broadcastMsg.value = data.content;

  res = await fetch("/api/dash");
  data = await res.json();

  if (data.code) return;
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

  loading.value = false;
}

onMounted(async () => {
  await loadData(1);
  setInterval(async () => {
    await loadData();
  }, 60000);
});
</script>

<style></style>