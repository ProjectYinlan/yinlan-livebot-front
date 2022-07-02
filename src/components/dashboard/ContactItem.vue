<template>
  <div class="dash-control-card-contact-item">
    <img
      :src="avatarUrl"
      alt=""
      class="dash-control-card-contact-item-avatar"
    />
    <div class="dash-control-card-contact-item-content">
      <div class="dash-control-card-contact-item-content-name">{{ name }}</div>
      <div class="dash-control-card-contact-item-content-number">{{ number }}</div>
    </div>
    <div class="dash-control-card-contact-item-btn-group">
      <slot />
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  type: {
    default: "friend",
    type: String
  },
  name: {
    default: "NAME",
    type: String,
  },
  number: {
    default: 123456,
    type: Number,
  }
});

let avatarUrl = '/assets/imgs/yinlan.jpg';
switch (props.type) {

    case "friend":
        avatarUrl = `//q2.qlogo.cn/headimg_dl?dst_uin=${props.number}&spec=640`
        break;

    case "group":
        avatarUrl = `//p.qlogo.cn/gh/${props.number}/${props.number}/640/`
        break;

    case "liveroom":
        avatarUrl = `/api/transfer/biliAvatar?uid=${props.number}`
        break;

    default:
        break;
}

</script>

<style scoped>
</style>