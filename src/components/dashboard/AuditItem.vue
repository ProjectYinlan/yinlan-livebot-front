<template>
  <div class="dash-control-card-audit-card">
    <div class="top">
      <div class="left">
        <div class="dash-control-card-audit-card-title" :type="type">
          {{ typeName }}
        </div>
        <div class="dash-control-card-audit-card-name">{{ name }}</div>
        <div class="dash-control-card-audit-card-number">{{ number }}</div>
        <div class="dash-control-card-audit-card-desc">
          {{ desc }}
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
        <el-tooltip content="查看详情" placement="bottom">
          <el-button type="info" plain circle
            ><el-icon><Document /></el-icon
          ></el-button>
        </el-tooltip>
      </div>

      <div class="right">
        <el-tooltip content="同意" placement="bottom">
          <el-button type="success" circle
            ><el-icon><Check /></el-icon
          ></el-button>
        </el-tooltip>

        <el-tooltip content="拒绝" placement="bottom">
          <el-button type="danger" circle
            ><el-icon><Close /></el-icon
          ></el-button>
        </el-tooltip>

        <el-tooltip content="忽略" placement="bottom">
          <el-button type="info" circle
            ><el-icon><Minus /></el-icon
          ></el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  name: {
    default: "NAME",
    type: String,
  },
  number: {
    default: 123456,
    type: Number,
  },
  desc: {
    default: "DESC",
    type: String,
  },
});

let typeName = "TYPE_NAME";
let avatarUrl = "/assets/imgs/yinlan.jpg";
switch (props.type) {
  case "friend":
    typeName = "好友申请";
    avatarUrl = `http://q2.qlogo.cn/headimg_dl?dst_uin=${props.number}&spec=640`;
    break;

  case "group":
    typeName = "邀群申请";
    avatarUrl = `http://p.qlogo.cn/gh/${props.number}/${props.number}/640/`;
    break;

  default:
    break;
}
</script>

<style scoped>
</style>