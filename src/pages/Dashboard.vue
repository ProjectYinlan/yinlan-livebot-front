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

      <BroadcastControlCard :radio="broadcastRadio"/>

      <div class="dash-control-card" size="sm">
        <div class="dash-control-card-title">
          <el-icon class="dash-control-card-title-icon"><Setting /></el-icon>
          <div class="dash-control-card-title-content">直播检测选项</div>
        </div>

        <div class="dash-control-card-content">
          <div class="row-center">
            <div class="row-center-title">工作模式</div>
            <span>不登陆账号</span>
            <el-switch
              v-model="bilibotMode"
              class="ml-2"
              style="
                --el-switch-on-color: var(--color-bilibot-auth);
                --el-switch-off-color: var(--color-bilibot-unauth);
              "
            />
            <span>登陆账号</span>
          </div>

          <div class="row-center">
            <div class="row-center-title">检测间隔</div>
            <el-input-number
              v-model="bilibotInterval"
              :min="bilibotIntervalMin"
              :max="bilibotIntervalMax"
              size="small"
            />
            秒
          </div>

          <div class="dash-control-card-apply-btn-group">
            <el-button type="primary" plain disabled>登入 / 登出</el-button>

            <el-button type="primary">应用</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="dash-content-col">
      <div class="dash-control-card" size="lg">
        <div class="dash-control-card-title">
          <el-icon class="dash-control-card-title-icon"
            ><ChatDotSquare
          /></el-icon>
          <div class="dash-control-card-title-content">群/好友 列表</div>
        </div>

        <div class="dash-control-card-content">
          <el-tabs stretch="true">
            <el-tab-pane label="群聊">
              <el-scrollbar>
                <div class="dash-control-card-contact-item">
                  <img
                    src="/assets/imgs/yinlanwo.jpg"
                    alt=""
                    class="dash-control-card-contact-item-avatar"
                  />
                  <div class="dash-control-card-contact-item-content">
                    <div class="dash-control-card-contact-item-content-name">
                      洇岚窝
                    </div>
                    <div class="dash-control-card-contact-item-content-number">
                      259565487
                    </div>
                  </div>
                  <div class="dash-control-card-contact-item-btn-group">
                    <el-button type="primary" circle
                      ><el-icon><Document /></el-icon
                    ></el-button>
                    <el-button type="danger" circle
                      ><el-icon><Delete /></el-icon
                    ></el-button>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>

            <el-tab-pane label="好友"> </el-tab-pane>
          </el-tabs>
        </div>
      </div>
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

import { ref } from "vue";

const broadcastRadio = ref("群聊");

const bilibotMode = ref(true);
const bilibotInterval = ref(60);
const broadcastInput = ref("");

const bilibotIntervalMin = ref(60);
const bilibotIntervalMax = ref(90);
</script>

<style></style>