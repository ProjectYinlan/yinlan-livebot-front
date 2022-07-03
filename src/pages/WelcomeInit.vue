<template>
  <div class="content">
    <img src="/assets/imgs/beams.jpg" alt="" class="bg" />

    <FloatBox>
      <div
        class="box-container"
        v-if="configType == 'link'"
        v-loading="loading"
      >
        <div class="box-title">连接信息</div>

        <FormInputBox
          name="Bot QQ"
          placeholder="Bot 所使用的QQ"
          type="number"
          id="input-bot-link-qq"
          v-model="linkQQ"
        />

        <FormInputBox
          name="连接地址"
          placeholder="如 http://localhost:26393"
          id="input-bot-link-host"
          v-model="linkHost"
        />

        <FormInputBox
          name="认证密钥"
          placeholder="verifyKey"
          id="input-bot-link-key"
          v-model="linkVerifyKey"
        />

        <FormInputToggle
          name="启用 WebSocket"
          id="toggle-link-enable-websocket"
          v-model="linkEnableWebSocket"
        />

        <el-upload
          action=""
          accept=".yml"
          :limit="1"
          :on-change="fileChange"
          :auto-upload="false"
          drag
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            将 setting.yml 拖拽至此 或 <em>点此选择</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              选择 config/net.mamoe.mirai-api-http/setting.yml 以<strong
                >自动解析</strong
              >
            </div>
          </template>
        </el-upload>

        <NextButton @click="setConfig()" />
      </div>

      <div
        class="box-container"
        v-if="configType == 'base'"
        v-loading="loading"
      >
        <div class="box-title">基础信息</div>

        <FormInputBox
          name="Bot 名称"
          id="input-bot-base-name"
          v-model="baseName"
        />

        <FormInputBox
          name="运营者 QQ"
          type="number"
          id="input-bot-base-owner"
          v-model="baseOwner"
        />

        <FormInputBox
          name="管理使用群号"
          type="number"
          id="input-bot-base-manage-group"
          v-model="baseManageGroup"
        />

        <FormInputToggle
          name="自动接受好友申请"
          id="toggle-base-auto-Accept-friend"
          v-model="baseAutoAcceptFriend"
        />

        <FormInputToggle
          name="自动接受入群邀请"
          id="toggle-base-auto-Accept-group"
          v-model="baseAutoAcceptGroup"
        />

        <NextButton @click="setConfig()" />
      </div>

      <div class="box-container" v-if="configType == 'complete'">
        <el-result
          icon="success"
          title="配置完毕"
          sub-title="请手动重启整个洇岚程序，重启后该页面将自动跳转至登录页面"
        />
      </div>
    </FloatBox>

    <Footer />
  </div>
</template>

<script setup>
import "/stylesheets/welcome.css";
import FloatBox from "../components/welcome/FloatBox.vue";
import FormInputBox from "../components/welcome/FormInputBox.vue";
import FormInputToggle from "../components/welcome/FormInputToggle.vue";
import NextButton from "../components/welcome/NextButton.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import yaml from "yaml";

let configType = ref("link");

let loading = ref(false);

let linkHost = ref("");
let linkVerifyKey = ref("");
let linkQQ = ref();
let linkEnableWebSocket = ref(false);

let baseName = ref("");
let baseOwner = ref();
let baseManageGroup = ref();
let baseAutoAcceptFriend = ref(false);
let baseAutoAcceptGroup = ref(false);

/**
 * 解析yml
 */
function fileChange(file) {
  let fileReader = new FileReader();

  fileReader.onload = async (e) => {
    let raw = e.target.result;

    let options = yaml.parse(raw);

    linkHost.value = options.adapterSettings.http
      ? `http://${options.adapterSettings.http.host}:${options.adapterSettings.http.port}`
      : `http://localhost:8080`;

    if (options.adapters.includes("ws")) {
      linkEnableWebSocket.value = true;
    }

    linkVerifyKey.value = options.verifyKey;
  };

  fileReader.readAsText(file.raw);
}

/**
 * 配置
 */
async function setConfig() {
  loading.value = true;

  let url, reqData, targetType;

  switch (configType.value) {
    case "link":
      url = "/api/welcome/setLinkConfig";
      reqData = {
        host: linkHost.value,
        verifyKey: linkVerifyKey.value,
        qq: linkQQ.value,
        enableWebSocket: linkEnableWebSocket.value,
      };
      targetType = "base";
      break;

    case "base":
      url = "/api/welcome/setBaseConfig";
      reqData = {
        name: baseName.value,
        owner: baseOwner.value,
        manageGroup: baseManageGroup.value,
        autoAcceptFriend: baseAutoAcceptFriend.value,
        autoAcceptGroup: baseAutoAcceptGroup.value,
      };
      targetType = "complete";
      break;

    default:
      return;
  }

  const resp = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  });
  let data = await resp.json();

  loading.value = false;

  if (data.code) {
    ElMessage({
      message: `设置失败 ${data.code}：${data.msg || data.message}`,
      type: "error",
    });
  } else {
    ElMessage({
      message: "设置成功",
      type: "success",
    });
    configType.value = targetType;

    if (targetType == "complete") {
      fetch("/api/welcome/shutdown");

      let reqInterval = setInterval(async () => {
        Promise.race([
          fetch("/api/dash"),
          new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error("request timeout")), 2000);
          }),
        ]).then((data) => {
          clearInterval(reqInterval);
          window.location = "/";
        });
      }, 5000);
    }
  }
}
</script>

<style></style>