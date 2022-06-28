<template>
  <div v-loading="loading">
    <div class="bg"></div>
    <div class="dash-title">洇岚 控制面板</div>

    <div class="dash-content">
      <div class="dash-content-col">
        <OverviewStatsCard
          :groupCount="overviewStatsCardData.groupCount"
          :followCount="overviewStatsCardData.followCount"
          :pushCount="overviewStatsCardData.pushCount"
        />
        <!-- <OverviewStatsCard :data="overviewStatsCardData" /> -->

        <AuditControlCard :auditList="auditControlCardData" />
      </div>

      <div class="dash-content-col">
        <BilibiliStatsCard
          :mode="bilibiliStatsCardData.mode"
          :accountName="bilibiliStatsCardData.accountName"
          :followUserCount="bilibiliStatsCardData.followUserCount"
        />
        <!-- <BilibiliStatsCard :data="bilibiliStatsCardData" /> -->

        <LiveroomControlCard :liveroomList="liveroomControlCardData" />
      </div>

      <div class="dash-content-col">
        <YinlanStatsCard
          :version="yinlanStatsCardData.version"
          :updateDate="yinlanStatsCardData.updateDate"
          :runningTime="yinlanRunningTime"
        />
        <!-- <YinlanStatsCard :data="yinlanStatsCardData" /> -->

        <BroadcastControlCard :radio="broadcastRadio" :input="broadcastInput" />

        <!-- <LiveroomOptionsControlCard :auth="bilibotAuth" :interval="bilibotInterval" :accountStatus="bilibotAccountStatus" /> -->
        <LiveroomOptionsControlCard
          :auth="bilibotAuth"
          :interval="bilibotInterval"
          :accountStatus="bilibotAccountStatus"
        />
      </div>

      <div class="dash-content-col">
        <ContactListControlCard :contactList="contactListControlCardData" />
      </div>
    </div>
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

import { ref, onMounted } from "vue";
// import { data } from "../../mock/dash.json";

let loading = ref(true);

let overviewStatsCardData = ref({});
let bilibiliStatsCardData = ref({});
let yinlanStatsCardData = ref({});

let yinlanRunningTime = ref(0);

let auditControlCardData = ref([]);
let liveroomControlCardData = ref({});
let contactListControlCardData = ref({});

let broadcastRadio = ref("群聊");
let broadcastInput = ref("");

let bilibotAuth = ref(false);
let bilibotInterval = ref(60);
let bilibotAccountStatus = ref(false);



async function loadData(flag) {

  const res = await fetch("/api/dash");
  let data = await res.json();

  loading.value = false;

  if (data.code) return;
  data = data.data;

  overviewStatsCardData.value = data.stats.overview;
  bilibiliStatsCardData.value = data.stats.bilibili;
  yinlanStatsCardData.value = data.stats.yinlan;

  yinlanRunningTime.value = yinlanStatsCardData.value.runningTime;

  auditControlCardData.value = data.cards.auditList;
  liveroomControlCardData.value = data.cards.liveroomList;
  contactListControlCardData.value = data.cards.contactList;

  bilibotAuth.value = data.cards.liveroomOptions.mode == "auth" ? true : false;
  bilibotInterval.value = data.cards.liveroomOptions.interval;
  bilibotAccountStatus.value =
    data.cards.liveroomOptions.accountStatus == "authed" ? true : false;

  if (flag) {
    setInterval(() => {
      yinlanRunningTime.value++;
    }, 1000);
  }
}

onMounted(async () => {
  await loadData(1);
  setInterval(async ()=>{
    await loadData();
}, 60000)
});
</script>

<style></style>