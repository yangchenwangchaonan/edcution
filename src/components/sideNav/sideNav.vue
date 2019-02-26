<template>
  <div class="sideNav">
    <el-menu
      :router="true"
      :default-active="value"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="item in sideNavList">
        <el-submenu :index="item.id" :key="item.id" v-if="item.children && item.children.length > 0">
          <template slot="title">
            <span :class="'sideNav-icon ' + item.iconClass"></span>
            <span class="sideNav-title">{{item.label}}</span>
          </template>
          <el-menu-item :key="it.id" v-for="it in item.children" :index="it.to">{{it.label}}</el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.to" :key="item.id" v-else>
          <template slot="title">
            <span :class="'sideNav-icon ' + item.iconClass"></span>
            <span class="sideNav-title">{{item.label}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    sideNavList: Array,
    value: String
  },
  data() {
    return {}
  },
  watch: {
    value(val) {
      this.$emit('input', val);
    }
  },
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
      background-image: url('../../assets/images/h_edu_icon1.png');
      background-size: 26px 20px;
    }
    .sideNav-grade {
      background-image: url('../../assets/images/y_tch_tab2.png');
      background-size: 32px 32px;
    }
    .sideNav-beike {
      background-image: url('../../assets/images/ic_beike.png');
      background-size: 20px 20px;
    }
    .sideNav-title {
      margin: 0 0 0 4px;
    }
    .el-menu {
      border-radius: 6px;
    }
    .el-submenu__title {
      font-family: PingFangSC-Semibold;
    }
    .el-submenu__title,.el-menu-item  {
      padding-left: 20px;
      font-size: 16px;
      line-height: 48px;
      height: 48px;
      &:hover,&.is-active {
        background-color: #4B70FF;
        color: #fff;
        .sideNav-paper {
          background-image: url('../../assets/images/h_edu_icon2.png');
          background-size: 26px 20px;
        }
        .sideNav-grade {
          background-image: url('../../assets/images/y_tch_tab21.png');
          background-size: 24px 23px;
        }
        .sideNav-beike {
          background-image: url('../../assets/images/ic_beike_white.png');
          background-size: 20px 20px;
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
      &.is-active {
        background-color: #4B70FF!important;
        color: #fff!important;
      }
      &:focus,&:hover {
        background-color: #4B70FF!important;
        color: #fff!important;
      }
    }
    .el-submenu[aria-haspopup="true"] {
      .el-menu-item {
        min-width: initial;
        font-size: 14px;
        height: 41px;
        line-height: 41px;
        padding-left: 69px!important;
        color #383B57;
      }
    }
    
  }
</style>
