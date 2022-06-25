<template>
  <div class="content">
    <img src="/assets/imgs/beams.jpg" alt="" class="bg" />

    <FlaotBox>
      <div class="box-container">
        
        <div class="box-title">基础信息</div>

        <FormInputBox name="Bot 名称" id="input-bot-name" />

        <FormInputBox name="Bot 使用QQ" id="input-bot-qq" />

        <FormInputBox name="运营者 QQ" id="input-bot-owner" />

        <FormInputBox name="管理使用群号" id="input-bot-manage-group" />

        <FormInputToggle
          name="自动接受好友申请"
          id="toggle-auto-agree-friend"
        />

        <FormInputToggle name="自动接受入群邀请" id="toggle-auto-agree-group" />

        <NextButton />

      </div>

    </FlaotBox>

    <Footer />
  </div>
</template>

<script setup>
import "/stylesheets/welcome.css";
import FlaotBox from "../components/welcome/FloatBox.vue";
import FormInputBox from "../components/welcome/FormInputBox.vue";
import FormInputToggle from "../components/welcome/FormInputToggle.vue";
import NextButton from "../components/welcome/NextButton.vue";
import Footer from "../components/welcome/Footer.vue";
</script>

<style></style>