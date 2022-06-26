<template>
  <div class="bg"></div>
  <div class="dash-title">洇岚 控制面板</div>

  <div class="dash-content">
    <div class="dash-content-col">

      <!-- <OverviewStatsCard :groupCount="1" followCount="1" pushCount="1" /> -->
      <OverviewStatsCard :data="data.stats.overview" />

      <AuditControlCard :auditList="data.cards.auditList" />
    
    </div>

    <div class="dash-content-col">
     
      <!-- <BilibiliStatsCard mode="auth" accountName="路过的玖叁" followUserCount="1" /> -->
      <BilibiliStatsCard :data="data.stats.bilibili" />

      <LiveroomControlCard :liveroomList="data.cards.liveroomList" />
      
    </div>

    <div class="dash-content-col">

      <!-- <YinlanStatsCard version="0.1.0" updateDate="2022.8.1" :runningTime="yinlanRunningTime" /> -->
      <YinlanStatsCard :data="data.stats.yinlan" />

      <BroadcastControlCard :radio="broadcastRadio" :input="broadcastInput" />

      <!-- <LiveroomOptionsControlCard :auth="bilibotAuth" :interval="bilibotInterval" :accountStatus="bilibotAccountStatus" /> -->
      <LiveroomOptionsControlCard :auth="bilibotAuth" :interval="bilibotInterval" :accountStatus="bilibotAccountStatus" />

    </div>

    <div class="dash-content-col">
      <ContactListControlCard :contactList="data.cards.contactList" />
    </div>
  </div>
</template>

<script setup>
import "/stylesheets/dashboard.css";

import OverviewStatsCard from "../components/dashboard/StatsCards/OverviewStatsCard.vue";
import BilibiliStatsCard from "../components/dashboard/StatsCards/BilibiliStatsCard.vue";
import YinlanStatsCard from "../components/dashboard/StatsCards/YinlanStatsCard.vue";

import AuditControlCard from "../components/dashboard/ControlCards/AuditControlCard.vue";
import LiveroomControlCard from "../components/dashboard/ControlCards/LiveroomControlCard.vue";
import BroadcastControlCard from "../components/dashboard/ControlCards/BroadcastControlCard.vue";
import LiveroomOptionsControlCard from "../components/dashboard/ControlCards/LiveroomOptionsControlCard.vue";
import ContactListControlCard from "../components/dashboard/ControlCards/ContactListControlCard.vue";

import { ref } from "vue";
import { data } from "../../mock/dash.json";

console.log(data);

let yinlanRunningTime = ref(0);
// setInterval(()=>{
//   yinlanRunningTime.value ++;
// }, 1000)

let broadcastRadio = ref("群聊");
let broadcastInput = ref("");

let bilibotAuth = ref(data.cards.liveroomOptions.mode == 'auth' ? true : false);
let bilibotInterval = ref(data.cards.liveroomOptions.interval);
let bilibotAccountStatus = ref(data.cards.liveroomOptions.mode == 'authed' ? true : false);




</script>

<style></style>