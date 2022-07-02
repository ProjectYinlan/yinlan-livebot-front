<template>
  <div class="dash-control-card-audit-card">
    <div class="top">
      <div class="left">
        <div class="dash-control-card-audit-card-title" :type="type">
          {{ typeName }}申请
        </div>
        <div class="dash-control-card-audit-card-name">{{ name }}</div>
        <div class="dash-control-card-audit-card-id">{{ id }}</div>
        <div class="dash-control-card-audit-card-desc">
          {{ descStr }}
        </div>
        <div class="dash-control-card-audit-card-timestamp">
          {{ timestamp }}
        </div>
      </div>

      <div class="right">
        <img
          :src="avatarUrl"
          alt=""
          class="dash-control-card-audit-card-avatar"
        />
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <el-button
          type="info"
          plain
          circle
          @click="auditDetailDialogVisible = true"
          ><el-icon><Document /></el-icon
        ></el-button>
      </div>

      <div class="right">
        <el-button type="success" circle @click="auditHandle('accept')"
          ><el-icon><Check /></el-icon
        ></el-button>

        <el-popconfirm
          title="确认拒绝？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="auditHandle('deny')"
        >
          <template #reference>
            <el-button type="danger" circle
              ><el-icon><Close /></el-icon
            ></el-button>
          </template>
        </el-popconfirm>

        <el-popconfirm
          title="确认忽略？"
          confirm-button-text="确认"
          cancel-button-text="取消"
          @confirm="auditHandle('ignore')"
        >
          <template #reference>
            <el-button type="info" circle
              ><el-icon><Minus /></el-icon></el-button
          ></template>
        </el-popconfirm>
      </div>
    </div>

    <el-dialog v-model="auditDetailDialogVisible" title="申请详情">
      <div class="dash-control-card-audit-card-detail-dialog">
        <div class="left">
          <div class="left">
            <img :src="avatarUrl" alt="" class="avatar" />
          </div>
          <div class="right">
            <div>{{ typeName }}昵称：{{ name }}</div>
            <div>{{ typeName }}账号：{{ id }}</div>
            <div>时间：{{ timestamp }}</div>
            <div class="desc">备注：{{ desc }}</div>
          </div>
        </div>
        <div class="right">
          <div class="left">
            <img :src="fromAvatarUrl" alt="" class="avatar" />
          </div>
          <div class="right">
            <div>{{ typeFrom }}昵称：{{ fromName }}</div>
            <div>{{ typeFrom }}账号：{{ fromId }}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElNotification } from "element-plus";
import { ref } from "vue";

const emit = defineEmits(["operated"]);

const props = defineProps({
  eventId: {
    default: 0,
    type: Number,
  },
  type: String,
  name: {
    default: "NAME",
    type: String,
  },
  id: {
    default: 10000,
    type: Number,
  },
  fromName: {
    default: "FROM_NAME",
    type: String,
  },
  fromId: {
    default: 10000,
    type: Number,
  },
  desc: {
    default: "DESC",
    type: String,
  },
  ts: {
    default: 1659283200000,
    type: Number,
  },
});

let auditDetailDialogVisible = ref(false);

let descStr = "DESC_STR";

let typeName = "TYPE_NAME";
let typeFrom = "TYPE_FROM";
let avatarUrl = "/assets/imgs/yinlan.jpg";
let fromAvatarUrl = "/assets/imgs/yinlan.jpg";

let ts = new Date(props.ts);
let timestamp = `${ts.toLocaleDateString()} ${ts.toLocaleTimeString()}`;

let operate;

switch (props.type) {
  case "friend":
    typeName = "好友";
    typeFrom = "来源群";
    avatarUrl = `http://q2.qlogo.cn/headimg_dl?dst_uin=${props.id}&spec=640`;
    fromAvatarUrl = `http://p.qlogo.cn/gh/${props.fromId}/${props.fromId}/640/`;
    descStr = props.desc;
    break;

  case "group":
    typeName = "邀群";
    typeFrom = "邀请人";
    avatarUrl = `http://p.qlogo.cn/gh/${props.id}/${props.id}/640/`;
    fromAvatarUrl = `http://q2.qlogo.cn/headimg_dl?dst_uin=${props.fromId}&spec=640`;
    descStr = `来自 ${props.fromName} (${props.fromId}) 的邀请`;
    break;

  default:
    break;
}

/**
 * 操作事件处理
 */
async function auditHandle(operate) {
  const resp = await fetch("/api/dash/control/auditHandle", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId: props.eventId,
      operate,
    }),
  });
  let data = await resp.json();

  if (data.code) {
    ElNotification({
      title: "操作失败",
      message: `${data.code}：${data.msg || data.message}`,
      type: "error",
      position: "bottom-right",
    });
  } else {
    ElNotification({
      title: "操作成功",
      type: "success",
      position: "bottom-right",
    });
    emit("operated", props.eventId);
  }
}
</script>

<style scoped>
</style>