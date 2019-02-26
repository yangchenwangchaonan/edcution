<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <el-dropdown trigger="click">
                <span class="beg"><</span>
              <p  class="begsed">
                  高二一班
              </p>
              <el-dropdown-menu style="
                margin-top: 50px;
                margin-left: 1071px;" slot="dropdown">
                <el-dropdown-item class="clearfix">
                  高二一班
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  高二二班
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="com_box cate_box">
                <div class="cates">
                    <div class="classname">
                        <h3>人大附中-高二1班</h3>
                        <p>612</p>
                    </div>
                    <div class="item">
                        <h3><img :src="require('@/assets/images/icon_up_green.png')"
                                                        alt="">  一本分数线</h3>
                        <p>582</p>
                    </div>
                    <div class="item">
                        <h3><img :src="require('@/assets/images/icon_up_green.png')"
                                                        alt="">  上线率</h3>
                        <p>38%</p>
                        <span>上线32人</span>
                    </div>
                    <div class="item">
                        <h3><img :src="require('@/assets/images/icon_up_green.png')"
                                                        alt="">   全校均分</h3>
                        <p>608</p>
                    </div>
                     <div class="item">
                        <h3><img :src="require('@/assets/images/icon_up_green.png')"
                                                        alt="">   全校最高分</h3>
                        <p>712</p>
                    </div>

                </div>
                <div class="lp1"> </div>
                <div class="goal">
                    <div class="title"> 上线率趋势</div>
                    <div class="qushi">
                        <div id="chart_online_qushi"></div>
                    </div>
                </div>
                        <!-- 图表 -->
                <div class="lp2"> </div>
                <div class="tps"> </div>
                <div class="goal">
                  <div class="charts" style="width:'50%',height:'6.54rem'">
                    <div class="title" style="margin-top: -46%;margin-left: 54%;">
                      不稳定学生筛查
                        <p >
                            详细分析
                       </p>
                    </div>
                    <div class="qushi">
                    <div id="myChart" :style="{width:'400px',height:'344px',marginLeft:'54%'}">
                    </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="com_box score_over" style="min-height: 300px">

               <!--  <ul class="subjects">
                    <li v-for="(item,index) in subject_list"
                        :class="{active:current_sub_show == index}"
                        @click="change_current_sub_show(index)">
                        <span>{{item}}</span>
                    </li>
                </ul> -->
                <div class="lp"> </div>
                <div class="ftcs1"> 班级学情 </div>
                <div class="ftcs"> 语文薄弱知识点
                    <el-dropdown trigger="click">
                      <p class="el-dropdown-link" style="width: 20px;
                        height: 20px;
                        background: #D8D8D8;
                        border-radius: 18px;
                        text-align: center;
                        line-height: 18px;
                        color: #979797;
                        margin-top: -17px;
                        position: absolute;">
                          >
                      </p>
                      <!-- margin-left: 20px; -->
                      <el-dropdown-menu  slot="dropdown">
                        <el-dropdown-item @click.native="goaa(1)" class="clearfix">
                          语文
                          <!-- <el-badge class="mark" :value="12" /> -->
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          数学
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          英语
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          物理
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          化学
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          生物
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>

                 </div>
                 <p class="fot1">累计考试<span class="fot2"> 5</span>次</p>
                 <p class="tp1"> </p>
                 <p class="fot11">薄弱知识点<span class="fot21">81</span>个</p>
                 <div class="detail"> 详细分析</div>
                <div  style="margin-left: 23%">
                         <div style="float: left;height: 67px; margin-left: 8%;margin-top: 20px" v-for="list,index in subject_list" >
                            <el-progress class="inner_circle" color="#4B70FF" :width="51" type="circle"
                                         :percentage="overPercent" status="text" :stroke-width="3">
                                <div>
                                    <div class="info">{{overPercent}}
                                    </div>
                                </div>
                            </el-progress>
                            <div class="fotxt">人大附中期中</div>
                            <div class="fotxt2">01811118111018111018111018111018111</div>
                        </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header";

    export default {
        name: "eduOverview",
        components: {
            HeaderPublic
        },
        data() {
            return {
                url_index: 0,   //header下标
                overPercent: 80,
                color: ['#4B70FF', '#FF8E2C'],
                online_qushi_option: {
                    tooltip: {
                        trigger: 'axis',
                        borderRadius:6,
                        padding: 0,
                        formatter: function (params) {
                          let result = '<div style="border-radius:6px;border: 1px solid rgba(162,175,205,0.60);background: white;color:#5F6D91;">' +
                            '<div style="width:180px;height:40px;line-height: 40px;background-color:#ECEFF5;margin:0px;padding-left: 10px;">' +params[0].axisValue +'</div>';
                          for (let i = 0; i < params.length; i++) {
                            result += '<div style="line-height: 30px;padding-left: 10px;">' +
                              '<span>' + params[i].seriesName + '：</span>' +
                              '<span>' + params[i].value + "%" + '</span>' +
                              '</div>';
                          }
                          result += '</div>'
                          return result;
                        }

                    },
                    color: ['#4B70FF', '#FF8937'],
                    legend: {
                        left: 'right',
                        data: ['班级上线率趋势', '年级上线率趋势'],
                        textStyle: {
                            fontSize: 14,
                            color: '#A2AFCD'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                        borderColor:'#ECEFF5'
                    },
                    xAxis: {
                        name: "考试",
                        nameTextStyle: {
                            padding: [30, 0, 0, -13]
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: [' ', '人大附中期中','考试'],
                        // data: ['人大附中期中\n20181113', '人大附中期中', '人大附中期中\n20181113', '人大附中期中\n20181113', '人大附中期中\n20181113', '人大附中期中\n20181113'],
                        axisLabel: {
                            interval: 0,
                            rotate: 40,
                            color:'#333333'
                        },
                        axisLine: {
                          lineStyle: {
                            color: '#ECEFF5'
                          }
                        }
                    },
                    yAxis: {
                        name: "上线率",
                        nameTextStyle: {
                            align: "left"
                        },
                        axisLine: {
                          show: false
                        },
                        axisTick: {
                          show: false
                        },
                        splitLine:{
                          lineStyle:{
                            color:'#ECEFF5'
                          }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            symbol: 'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '班级上线率趋势',
                            type: 'line',
                            data: [20,50,90],
                            //areaStyle: {},
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 3,
                                        color: '#4B70FF'
                                    }
                                }
                            },
                        },
                        {
                            symbol: 'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '年级上线率趋势',
                            type: 'line',
                            data: [10,80,50],
                            //areaStyle: {},
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 3,
                                        color: '#FF8937'
                                    }
                                }
                            },
                        }
                    ]
                },
                current_show:0,
                current_sub_show:0,
                grade_list:['高二文科', '高二理科', '高三文科', '高三理科'],
                subject_list:["语文","数学","英文","物理","化学","生物"]

            }
        },
        mounted() {
            this.online_qushi();

             /*ECharts图表*/
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            myChart.setOption({
              tooltip: {
                        trigger: 'axis',
                        borderRadius:6,
                        padding: 0,
                        formatter: function (params) {
                          let result = '<div style="border-radius:6px;border: 1px solid rgba(162,175,205,0.60);background: white;color:#5F6D91;">' +
                            '<div style="width:180px;height:40px;line-height: 40px;background-color:#ECEFF5;margin:0px;padding-left: 10px;">'+'上线' +params[0].axisValue +'</div>';
                          for (let i = 0; i < params.length; i++) {
                            result += '<div style="line-height: 30px;padding-left: 10px;">' +
                              // '<span>' + params[i].seriesName + "次" + '：</span>' +
                              '<span>' + params[i].value + "人" + '</span>' +
                              '</div>';
                          }
                          result += '</div>'
                          return result;
                        }

              },
              xAxis: {
               type: 'category',
               data: ['1次', '2次', '3次', '4次', '5次', '6次']
               },
               yAxis: {
                   type: 'value'
               },
               series: [
                        {
                            symbol: 'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '',
                            type: 'line',
                            data: [50,40,30,30,20,10],
                            //areaStyle: {},
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        width: 3,
                                        color: '#4B70FF'
                                    }
                                }
                            },
                        }
                    ]
              //  series: [{
              //      data: [1, 3, 4, 7, 4, 6, 9],
              //      type: 'line'
              // }]
             })
        },
        created() {
            // this.online_qushi1();
        },
        methods: {
            goaa(num){
                // alert(num)
            },
            change_current_show(index){
                this.current_show = index;
            },
            change_current_sub_show(index){
                this.current_sub_show = index;
            },
            //上线趋势
            online_qushi() {
                let elm = document.getElementById('chart_online_qushi');
                this.$echarts.init(elm).setOption(this.online_qushi_option);

            },

            goToComment(){
                this.$router.push({
                    path:"/teacher/comment"
                })
            },
            goToScore(){
                this.$router.push({
                    path:"/teacher/score"
                })
            },
            goToClassAnalysis(){
                this.$router.push({
                    path:"/teacher/classAndSubject/classAnalysis"
                })
            },
            goToLessonPreparation(){
                this.$router.push({
                    path:"/teacher/lessonPreparation"
                })
            }
        }
    };
</script>

<style lang='stylus' scoped>
    .container {
        width 940px;
    }

    .btn
        display inline-block;
        box-shadow: 0 4px 10px -4px rgba(100, 121, 252, 0.50);
        border-radius: 23px;
        text-align center
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: #FFFFFF;
        padding 5px 15px;
        cursor pointer;
        &.btn_primary {
            background-color: #4B70FF
            margin-left: 10px;
        }

    .main_title
        font-family: MicrosoftYaHei;
        font-size: 24px;
        color: #333333;
        text-align: center;
        margin 50px auto;
        background: linear-gradient(-90deg, #4497FF, #4b72ff)
        -webkit-background-clip: text;
        color: transparent;

    .list_box
        display flex
        justify-content center
        li {
            border: 1px solid #4B70FF;
            border-radius: 6px;
            margin 0px 5px;
            padding 11px 10px;
            min-width 118px
            text-align center
            cursor pointer

            .t_name {
                font-family: PingFangSC-Medium;
                font-size: 16px;
                color: #333333;
            }
            .score {
                opacity: 0.6;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #333333;
            }
            &.active {
                background: #4B70FF;
                .t_name {
                    color: white;
                }
                .score {
                    color: #FFFFFF;
                }
            }
        }

    .com_box
        padding 22px 30px 0px;
        background white
        margin-top: 30px;
        border-radius: 6px;
        .t_hd {
            display flex
            justify-content space-between
            .title {
                font-size: 18px;
                color: #333333;
            }
        }

    .cate_box {
        .cates {
            display flex
            justify-content space-between
            border-bottom: 1px solid rgba(162, 175, 205, 0.20);
            padding 44px 0px 34px;
            .item {
                position relative;
                text-align center;
                width 100%;
                &:after {
                    content: '';
                    height 60px;
                    position absolute
                    top: 0px;
                    right 0px;
                    border-left 2px dotted rgba(162, 175, 205, 0.60);
                }
                &:nth-last-of-type(1) {
                    &:after {
                        content: none;
                    }
                }
                h3 {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #8895B7;
                    text-align: left;
                    margin-left: 10%;
                }
                p {
                    text-align: left;
                    margin-left: 7%;
                    font-family: ArialMT;
                    font-size: 30px;
                    color: #000000;
                    margin-top:15px;
                    .f_small {
                        color: rgba(0, 0, 0, 0.60);
                        font-size: 12px;
                    }
                    img {
                        margin -6px 3px 0px 10px;
                    }
                }
                span {
                    margin-left: 7%;
                    margin-top: -7%;
                    position: absolute;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #000000;
                }
            }
        }
        .goal {
            .title {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                color: #002676;
                padding 40px 0px 0px 0px;
                p {
                    background: rgb(255, 255, 255);
                    border: 1px solid rgb(75, 112, 255);
                    border-radius: 23px;
                    width: 87px;
                    height: 28px;
                    line-height: 28px;
                    text-align: center;
                    position: absolute;
                    margin-left: 330px;
                    margin-top: -33px;
                    font-size: 13px;
                    color: #4C83F6;
                }
            }
            .qushi {
                display flex;
                justify-content space-between
                align-items center
            }

        }
        .goal1 {
            position:absolute;
            margin-left: 455px;
            margin-top: -403px;
            z-index:99;
            .title {
                font-family: MicrosoftYaHei;
                font-size: 18px;
                color: #002676;
                padding 40px 0px 0px 0px;
            }
            .qushi {
                display flex;
                justify-content space-between
                align-items center
            }

        }
    }

    #chart_online_qushi {
        height 350px;
        width 400px;
    }

    .online_per
        .inner_circle {
            width: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            font-size 14px;

            .info {
                font-size: 18px;
                color: #000;
                span {
                    font-size 14px;
                }
            }
            .desc {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #A2AFCD;
                text-align: center;
                padding-top: 5px;
            }
        }

        .txt {
            opacity: 0.7;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #000000;
            margin-top: 25px;
        }

    .score_over
        .subjects {
            display flex;
            justify-content space-between;
            text-align left;
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #333333;
            border-bottom 1px solid rgba(162, 175, 205, 0.40);
            height 60px;
            line-height 60px;
            font-weight bold
            margin-top: 20px;

            li {
                margin-right 80px;
                cursor pointer
                &.active {
                    span {
                        display inline-block
                        height 100%
                        color: #4B70FF;
                        border-bottom 4px solid #4B70FF
                        height: 58px;
                    }
                }
            }
        }

        .summary {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(162, 175, 205, 0.3);

            .summary_item {
                flex 1
                .s_top {
                    display flex;
                    padding-top: 16px;
                    padding-bottom: 30px;
                    .sbox {
                        width 50%;
                        margin 28px 0px;
                        text-align center
                        border-right 2px dotted rgba(162, 175, 205, 0.60);
                        &:nth-last-of-type(1) {
                            border-right none;
                        }
                        p {
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                            padding-bottom: 15px;
                        }
                        span {
                            font-family: MicrosoftYaHei;
                            font-size: 30px;
                            color: #6378FF;
                        }
                    }
                    > p {
                        width 50%
                    }
                }
            }
            #chart_know_over {
                width 262px;
                height 180px
            }
            .detail_link {
                height 122px;
                border-left 2px dotted rgba(162, 175, 205, 0.60);
                width 162px;
                display flex
                justify-content center
                align-items center
            }
        }

    .skillbar
        width: 130px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        height: 9px;
        background: #E7E7E7;
        border-radius: 6px;
        .filled {
            z-index: 8;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 80, 80, .3);
            height: 100%;
            width: 20px;
            border-radius: 5px;
        }

        &.orange {
            .filled {
                background-color: #ff8817
            }
        }

        &.blue {
            .filled {
                background-color: #6479FC
            }

        }

    .list-table {
        font-size 14px;
        width 100%
        text-align center
        th {
            height: 56px;
            color: #383B57;
            padding-left: 20px;
            border-bottom: 1px solid rgba(236, 239, 245, 0.51);
            background-color: white
        }
        tr:nth-of-type(odd) {
            td {
                background: #fbfbfb
            }
        }
        td {
            height: 50px;
            padding-left: 20px;
            background: white
            .desc {
                display inline-block
                width 138px;
                overflow hidden;
                text-overflow ellipsis;
                white-space nowrap
            }
            .percent {
                display: inline-block
                width 27px;
                padding-left 3px;
            }
            .rank {
                img {
                    margin-right 3px;
                }
            }
            .percent, .rank {
                &.orange {
                    color: #ff8817;
                }
                &.blue {
                    color: #6479FC;
                }
            }
        }
    }
    .classname{
        font-family: MicrosoftYaHei;
        font-size: 20px;
        color: #002676;
        border-right: #E5E9F2;
        border-width: 1px;
        border-right-style: solid;
        width: 165%;
        p {
            opacity: 0.5;
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: #002676;
            margin-top: 23px;
        }
    }
    .spn{
        width: 26px;
        height: 26px;
        border-radius: 50%;
        position: absolute;
        line-height: 26px;
        text-align: center;
        background: rgb(255, 226, 226);

    }
    .ftcs1{
        font-family: MicrosoftYaHei;
        font-size: 18px;
        color: #002676;

    }
    .ftcs{
        font-family: PingFangSC-Regular;
        font-size: 20px;
        color: #000000;
        height:60px;
         margin-top: 25px;
        margin-left: 3%;
        position: absolute;
    }
    .fot1{
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        margin-top: 90px;
        position:absolute;
        margin-left: 3%;
    }
    .fot2{
        font-family: ArialMT;
        font-size: 26px;
        color: #000000;margin-left: 6px
    }
    .fot11{
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #000000;
        position:absolute;
        margin-top:201px;
        margin-left: 3%;
    }
    .fot21{
        margin-top:11%;
        font-family: ArialMT;
        font-size: 26px;
        color: #000000;margin-left: 6px
    }
    .tp1{
        border: 1px solid rgba(162, 175, 205, 0.6);
        width: 127px;
        position: absolute;
        margin-top: 163px;
        border-style:dashed;
        margin-left: 3%;
    }
    .tps{
        border: 0.3px solid #e5e9f2;
        height: 338px;
        position: absolute;
        margin-top: -378px;
        margin-left: 447px;
    }
    .fotxt{
        margin-top: -21%;
        margin-left: 24%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
    }
    .fotxt2{
        margin-top: 10px;
        margin-left: 25%;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8895B7;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        width:224px;
    }
    .detail{
        background: rgb(255, 255, 255);
        border: 1px solid rgb(75, 112, 255);
        border-radius: 23px;
        width: 87px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        position: absolute;
        margin-left: 24%;
        margin-top: -2%;
        font-size: 13px;
        color: #4C83F6;
        margin-left: 802px;
        margin-top: -20px;
    }
    .lp{
        background: rgb(76, 131, 246);
        height: 30px;
        width: 6px;
        position: absolute;
        margin-top: -10px;
        margin-left: -28px;
    }
    .lp1{
        background: rgb(76, 131, 246);
        height: 30px;
        width: 6px;
        position: absolute;
        margin-top: 28px;
        margin-left: -28px;
    }
    .lp2{
        background: rgb(76, 131, 246);
        height: 30px;
        width: 6px;
        position: absolute;
        margin-top: -378px;
        margin-left: 447px;
    }
    .beg{
        height: 90px;
        margin-left: 899px;
        line-height: 90px;
        margin-top: 52px;
        position: absolute;
        z-index: 20;
        color: rgb(255, 255, 255);
        width: 42px;
        opacity: 0.6;
    }
    .begsed{
        height: 90px;
        width: 42px;
        background: rgb(76, 131, 246);
        position: absolute;
        border-radius: 5px;
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: rgb(255, 255, 255);
        float: right;
        writing-mode: vertical-lr;
        text-align: center;
        line-height: 42px;
        margin-top: 50px;
        margin-left: 897px;
    }
</style>
