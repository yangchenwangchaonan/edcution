<template>
  <div class="paperQuality-sideNav">
    <el-menu
      :router="true"
      default-active="wholeQuality"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span class="paperQuality-garde"></span>
          <span style="margin: 0 0 0 4px;">成绩分析</span>
        </template>
        <el-menu-item index="schoolGeneralPandect">成绩总览</el-menu-item>
        <el-menu-item index="onlineAnalysis">上线分析</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span class="paperQuality-garde"></span>
          <span style="margin: 0 0 0 4px;">试卷质量</span>
        </template>
        <el-menu-item index="wholeQuality">整体质量</el-menu-item>
        <el-menu-item index="questionsQuality">小题质量</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
<style scoped>
  .paperQuality-sideNav {
    background-color: #4B70FF;
    color: #fff;
    border-radius: 6px;
  }
  .paperQuality-sideNav .paperQuality-garde {
    display: inline-block;
    width: 32px;
    height: 32px;
    background-image: url('../../../assets/images/y_tch_tab1.png');
    background-size: 100%;
  }
</style>
<style>
  .paperQuality-sideNav .el-menu {
    border-radius: 6px;
  }
  .paperQuality-sideNav .el-submenu__title:hover {
    background-color: #4B70FF;
    color: #fff;
  }
  .paperQuality-sideNav .el-submenu__title {
    padding-left: 20px;
    font-size: 16px;
    line-height: 48px;
    height: 48px;
  }
  .paperQuality-sideNav .el-menu-item:focus, .paperQuality-sideNav .el-menu-item:hover {
    background-color: #4B70FF;
    color: #fff;
  }
  .paperQuality-sideNav .el-submenu .el-menu-item {
    min-width: initial;
    font-size: 16px;
    height: 41px;
    line-height: 41px;
    padding-left: 69px!important;
  }
  /* .paperQuality-sideNav .el-submenu .el-menu-item.is-active {
    background-color: #4B70FF;
    color: #fff;
  } */
</style>
