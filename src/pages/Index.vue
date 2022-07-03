<template v-if="status == 'active'">
  <div class="content">
    <img src="/assets/imgs/beams.jpg" alt="" class="bg" />
    <FloatBox>
      <div class="box-container" v-loading="loading">
        <div class="box-title">登录</div>

        <FormInputBox
          name="管理员QQ"
          placeholder="请输入管理员QQ"
          type="number"
          id="input-login-qq"
          v-model="id"
        />

        <FormInputBox
          name="验证码"
          placeholder="点此获取验证码"
          id="input-verify-code"
          v-model="code"
          @click="getVerifyCode"
        />

        <NextButton @click="login" /></div
    ></FloatBox>
    <Footer />
  </div>
</template>

<script setup>
import FloatBox from "../components/welcome/FloatBox.vue";
import FormInputBox from "../components/welcome/FormInputBox.vue";
import NextButton from "../components/welcome/NextButton.vue";
import Footer from "../components/Footer.vue";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

let router = useRouter();

let status = ref();

async function loadData() {
  let resp = await fetch("/api");
  let data = await resp.json();
  status.value = data.status;
}

onMounted(async () => {
  await loadData();
});

watch(status, (newItem, originItem) => {
  if (newItem == "uninitialized") {
    router.push("/welcome");
  }
});

let loading = ref(false);

let id = ref();
let code = ref();
let expireTs = ref(0);

async function getVerifyCode () {

  let ts = (new Date()).getTime();

  if (ts < expireTs.value) {
    ElMessage.info(`${(expireTs.value - ts) / 1000}秒后才能重新获取嗷`);
    return;
  };

  if (!id.value) return;

  let resp = await fetch("/api/auth/getVerifyCode", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id.value
    })
  })
  let data = await resp.json();

  if (data.code) {
    ElMessage.error(`获取验证码失败：${data.code}-${data.msg}`);
    return;
  }

  ElMessage.success("验证码已发送至您的QQ");
  expireTs.value = data.ts + 60 * 1000;

}

async function login () {

  loading.value = true;

  let resp = await fetch("/api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id.value,
      code: code.value
    })
  })
  let data = await resp.json();

  loading.value = false;

  if (data.code) {
    ElMessage.error(`登录失败：${data.code}-${data.msg}`);
    return;
  }

  ElMessage.success("欢迎回来~ 正在跳转……");
  
  router.push('/dash');

}

</script>

<style scoped>
</style>