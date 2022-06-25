<template>
  <div class="dash-control-card" size="lg">
    <div class="dash-control-card-title">
      <el-icon class="dash-control-card-title-icon"><ChatDotSquare /></el-icon>
      <div class="dash-control-card-title-content">群/好友 列表</div>
    </div>

    <div class="dash-control-card-content">
      <el-tabs stretch="true">
        <el-tab-pane label="群聊">
          <el-scrollbar>
            <ContactItem
              name="洇岚窝"
              number="259565487"
              avatar="/assets/imgs/yinlanwo.jpg"
            >
              <el-button type="primary" circle
                ><el-icon><Document /></el-icon
              ></el-button>
              <el-button type="danger" circle
                ><el-icon><Delete /></el-icon
              ></el-button>
            </ContactItem>
          </el-scrollbar>
        </el-tab-pane>

        <el-tab-pane label="好友">
          <ContactItem
              name="玖叁"
              number="1285419578"
              avatar="/assets/imgs/colour93.jpg"
            >
              <el-button type="primary" circle
                ><el-icon><Document /></el-icon
              ></el-button>
              <el-button type="danger" circle
                ><el-icon><Delete /></el-icon
              ></el-button>
            </ContactItem>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import ContactItem from "../ContactItem.vue";
</script>

<style scoped>
</style>