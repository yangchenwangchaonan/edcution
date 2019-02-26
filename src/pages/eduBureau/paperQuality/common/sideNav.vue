<template>
  <div class="sideNav">
    <el-menu
      :router="true"
      default-active="wholeQuality"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <span class="sideNav-icon sideNav-grade"></span>
          <span class="sideNav-title">成绩分析</span>
        </template>
        <el-menu-item index="generalPandect">成绩总览</el-menu-item>
        <el-menu-item index="onlineAnalysis">上线分析</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span class="sideNav-icon sideNav-paper"></span>
          <span class="sideNav-title">试卷质量</span>
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
<style lang="stylus">
  .sideNav {
    background-color: #4B70FF;
    color: #fff;
    border-radius: 6px;

    .sideNav-icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      background: center;
      background-repeat: no-repeat;
    }
    .sideNav-paper {
      background-image: url('../../../../assets/images/h_edu_icon1.png');
      background-size: 26px 20px;
    }
    .sideNav-grade {
      background-image: url('../../../../assets/images/y_tch_tab2.png');
      background-size: 32px 32px;
    }
    .sideNav-title {
      margin: 0 0 0 4px;
      font-family: PingFangSC-Semibold;
    }
    .el-menu {
      border-radius: 6px;
    }
    .el-submenu__title {
      padding-left: 20px;
      font-size: 16px;
      line-height: 48px;
      height: 48px;
      &:hover {
        background-color: #4B70FF;
        color: #fff;
        .sideNav-paper {
          background-image: url('../../../../assets/images/h_edu_icon2.png');
          background-size: 26px 20px;
        }
        .sideNav-grade {
          background-image: url('../../../../assets/images/y_tch_tab21.png');
          background-size: 24px 23px;
        }
        .el-icon-arrow-down {
          color #fff;
        }
      }
    }
    .el-icon-arrow-down {
      color #5F6D91;
      font-size: 17px;
      right: 11px;
      &:before {
        content: "\E60B";
      }
    }
    .el-menu-item {
      min-width: initial;
      font-size: 16px;
      height: 41px;
      line-height: 41px;
      padding-left: 69px!important;
      &.is-active {
        background-color: #4B70FF;
        color: #fff;
      }
      &:focus,&:hover {
        background-color: #4B70FF;
        color: #fff;
      }
    }
  }
</style>
