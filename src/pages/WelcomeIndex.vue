<template>
  <div class="content">
    <img src="/assets/imgs/beams.jpg" alt="" class="bg" />

    <FlaotBox>
      <div class="box-container">
        <div class="box-intro">欢迎使用 洇岚 直播助手版</div>

        <NextButton href="/welcome/config" />
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
import Footer from "../components/Footer.vue";
</script>

<style></style>