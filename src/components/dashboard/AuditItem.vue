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
          :src="avatar"
          alt=""
          class="dash-control-card-audit-card-avatar"
        />
      </div>
    </div>

    <div class="bottom">
      <div class="left">
        <el-button type="info" plain>查看详情</el-button>
      </div>

      <div class="right">
        <el-button type="success">同意</el-button>
        <el-button type="danger">拒绝</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    type: String,
    name: {
        default: "NAME",
        type: String
    },
    number: {
        default: 123456,
        type: Number
    },
    desc: {
        default: "DESC",
        type: String
    },
    avatar: {
        default: "/assets/imgs/yinlan.jpg",
        type: String
    }
});

let typeName = "TYPE_NAME";
switch (props.type) {

    case "friend":
        typeName = "好友申请";
        break;

    case "group":
        typeName = "邀群申请";
        break;

    default:
        break;
}

</script>

<style scoped>
</style>