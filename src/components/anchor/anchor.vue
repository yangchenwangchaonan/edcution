<template>
  <div class="global-anchor" ref="anchor">
    <ul class="global-anchor-ul">
      <li>{{anchorTitle}}</li>
      <li class="global-anchor-li" :class="{active: anchorActive === item.value}" v-for="item in anchorList" :key="item.value"><i></i><a :href="'#' + item.value">{{item.label}}</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      anchorList: Array,
      anchorTitle: String,
      anchorActive: String
    },
    data() {
      return {
        // active: ''
      };
    },
    mounted() {
      // const $anchor = this.$refs.anchor;

      // window.addEventListener('scroll', e => {
      //   if ($anchor.offsetWidth >= 0) {
      //     let heightArray = [];

      //   }
      // });
      // this.active = ''
    }
  }
</script>
<style lang="stylus">
  .global-anchor {
    .global-anchor-ul {
      position: fixed;
      left calc(50vw + 483px);
      top: 357px;
      width: 208px;
      border-left: 1px solid rgba(151,151,151, 0.2);
      li {
        position: relative;
        margin-top: 14px;
        margin-left: 19px;
        line-height: 20px;
        height: 20px;
        a {
          color: #777;
        }
        i {
          position: absolute;
          left: -23.5px;
          top: 5.5px;
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #4B70FF; 
          display: none;
        }
        &:first-child {
          margin-top: 0;
          margin-left: 9px;
          a {
            color #333;
          }
        }
        &:nth-child(2) {
          margin-top: 10px;
        }
        &:last-child {
          padding-bottom: 5px
        }
        &.active {
          i {
            display: block;
          }
          a {
            color: #4B70FF;
          }
        }
      }
    }
  }
</style>
