<template>
  <div class="bg"></div>
  <div class="dash-title">洇岚 控制面板</div>

  <div class="dash-content">
    <div class="dash-content-col">

      <OverviewStatsCard groupCount="1" followCount="1" pushCount="1" />

      <AuditControlCard />
    
    </div>

    <div class="dash-content-col">
     
      <BilibiliStatsCard mode="登陆账号" accountName="路过的玖叁" followUserCount="1" />

      <LiveroomControlCard />
      
    </div>

    <div class="dash-content-col">

      <YinlanStatsCard version="0.1.0" updateDate="2022.8.1" runningTime="1:01:01" />

      <BroadcastControlCard :radio="broadcastRadio" :input="broadcastInput" />

      <LiveroomOptionsControlCard :mode="bilibotMode" :interval="bilibotInterval" />

    </div>

    <div class="dash-content-col">
      <ContactListControlCard />
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

const broadcastRadio = ref("群聊");
const broadcastInput = ref("");

const bilibotMode = ref(true);
const bilibotInterval = ref(60);

</script>

<style></style>