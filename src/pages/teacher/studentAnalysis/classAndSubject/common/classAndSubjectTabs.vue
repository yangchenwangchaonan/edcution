<template>
  <div class="classAndSubjectTabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabs" :key="index" :label="item.subject_name"><span slot="label">{{item.subject_name}}<span v-if="subject_id==item.subject_id" class="classAndSubjectTabs-tag">任课</span></span></el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="stylus">
  $themeColor = #4B70FF
  .classAndSubjectTabs {
    background #fff;
    border-radius 6px;
    .classAndSubjectTabs-tag {
      width 64px;
      height 34px;
      position: absolute;
      right: -22px;
      font-size 20px;
      top: 7px;
      display inline-block;
      background #FF8E2C;
      color #fff;
      transform: scale(0.5);
      text-align: center;
      line-height: 34px;
      border-radius: 100px;
    }
    .el-tabs__item {
      font-size 16px;
      padding: 5px 30px 0;
      height: 49px;
      // &:nth-child(2) {
      //   padding-left 30px!important;
      // }
      &.is-active {
        font-size 18px;
        color $themeColor;
      }
      &:hover {
        color $$themeColor
      }
    }
    .el-tabs__active-bar {
      height 4px;
      background $themeColor
    }
    .el-tabs__nav {
      margin: 0 0 0 31px;  
    }
    .el-tabs__nav-wrap {
      // padding: 0 0 10px 0;
      &::after {
        background-color #EBEBEB;
        height 1px;
      }
    }
  }

</style>
<script>
export default {
  props: {
    tabs: Array,
    activeValue: String,
    subject_id:String
  },
  data() {
    return {
      activeName: '0'
    }
  },
  watch: {
    activeName(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    handleClick(tab) {
      this.$emit('tabClick', {label: tab.label});
    }
  }
}
</script>


