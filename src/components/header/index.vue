<template>
    <div class="header">
        <div class="header_logo">
            <img src="../../assets/images/y_header_logo.png"/>
            <span>知师圈AI教育云</span>
        </div>
        <div class='header_main'>
            <div class='main_box'>
                <div v-for='(item, index) of main'
                    :key='index'
                    :class="[url_index == index ? 'active header_tab' : 'header_tab']"
                    @click='handleToggleHeader(index)'
                >
                    <img :src='item.icon' alt="">
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
        <div class="header_right">
            <div class="header_message">
                <img src="../../assets/images/y_header_message.png" alt="">
                <i>2</i>
            </div>
            <div class="header_photo">
                <img src="../../assets/images/y_header_photo.png">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'headerNav',
        props: {
            url_index: Number
        },
        data () {
            return {
                // url_index: 0,
                main: [
                    {
                        icon: require('../../assets/images/y_header_over1.png'),
                        icon_act: require('../../assets/images/y_header_over1.png'),
                        title: '教学总览'
                    },
                    {
                        icon: require('../../assets/images/y_header_examination.png'),
                        icon_act: require('../../assets/images/y_header_examination1.png'),
                        title: '考试分析'
                    },
                    {
                        icon: require('../../assets/images/y_header_study.png'),
                        icon_act: require('../../assets/images/y_header_study1.png'),
                        title: '学情分析'
                    }
                ]
            }
        },
        created () {

        },
        methods: {
            handleToggleHeader (index) {
                // this.url_index = index
                let role = sessionStorage.getItem('role_type');
                if(index == 0) { //教学总览
                    if(role == 6 || role == 7) { //教师端
                        this.$router.push({path: '/teacher/overview'});
                        return;
                    }
                    if(role == 4 || role == 5) { //学校端
                        this.$router.push({path: '/schooloverview'});
                        return;
                    }
                    if(role == 0 || role == 1 || role == 2 || role == 3) { //教育局端
                        this.$router.push({path: '/eduBureau/overview'})
                    }
                    return;
                }
                if(index == 1) { //考试分析
                    if(role == 6 || role == 7) { //教师端
                        this.$router.push({path: '/teacher'});
                        return;
                    }
                    if(role == 4 || role == 5) { //学校端
                        this.$router.push({path: '/school'});
                        return;
                    }
                    if(role == 0 || role == 1 || role == 2 || role == 3) { //教育局端
                        this.$router.push({path: '/eduBureau'})
                    }
                    return;
                }
                if(index == 2) { //学情分析
                    if(role == 6 || role == 7) { //教师端
                        this.$router.push({path: '/teacher/studentAnalysis/termList'})
                        return;
                    }
                    if(role == 4 || role == 5) { //学校端
                        this.$router.push({path: '/school/studentAnalysis/termList'})
                        return;
                    }
                    if(role == 0 || role == 1 || role == 2 || role == 3) { //教育局端
                        this.$router.push({path: '/eduBureau/studentAnalysis/termList'})
                    }
                }
            }
        }
    }
</script>

<style lang='stylus' scoped>
    .header
        width 100%
        height 100px
        background #2E3256
        .header_logo
            padding-left 50px
            padding-top 39.2px
            float left
            img
                width 31.90px
                height 16.5px
            span
                font-size 12px
                color #FFFFFF
                opacity 0.6
        .header_main
            margin: 0 auto
            width: 1200px
            height: 100px
            .main_box
                margin-left: 357px
                width: 486px
                height: 100px
                .header_tab
                    float left
                    width 137px
                    height 96px
                    display inline-block
                    font-size 12px
                    color #A2AFCD
                    text-align center
                    opacity 0.5
                    margin-left 25px
                    cursor pointer
                    img
                        padding-top 27px
                    p
                        padding-top 10px
                .header_tab.active
                    opacity 1
                    ont-size 12px
                    color #FFFFFF
                    text-align center
                    background #333B6C
                    border-bottom 4px solid #FF942C
.header_right {
    position: relative;
    top -64px;
}
.header_tab_active {
    opacity: 1;
    ont-size: 12px;
    color: #FFFFFF;
    text-align: center;
    background: #333B6C;
    border-bottom: 4px solid #FF942C;
 }

  .header_message {
    float: right;
    display: inline-block;
     padding-right: 108px;
     margin-left -200px
    margin-top: 4px;

    img {
      width: 20px;
      height: 20px;
    }

    i {
      position: relative;
      top: -6px;
      left: -14px;
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #FF8937;
      color: #fff;
      font-size: 10px;
      text-align: center;
    }
  }

  .header_photo {
    margin-left : -200px;
    float: right;
    display: inline-block;
    padding-right: 50px;
  }

</style>
