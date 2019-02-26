<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <div class="main_title">人民附属分校</div>
            <ul class="list_box">
                <li v-for="(item, index) of teacher" 
                    :key='index'
                    :class="{active:current_show == index}" 
                    @click="change_current_show(index, item)"
                >
                    <div class="t_name">{{item.class_name}}</div>
                </li>
            </ul>

            <div class="com_box cate_box">
                <div class="t_hd">
                    <div class="title">{{grade_list_active}}</div>
                    <div>
                        <a class="btn btn_primary" @click="goToComment()">试卷讲评</a>
                        <a class="btn btn_primary" @click="goToScore()">详细分析</a>
                    </div>
                </div>
                <div class="cates">
                    <div class="item">
                        <h3>班级均分</h3>
                        <p>{{list.class_avg_score}}</p>
                    </div>
                    <div class="item">
                        <h3>均分年级排名</h3>
                        <p>{{list.grade_rank}}</p>
                    </div>
                    <div class="item">
                        <h3>班级最高分</h3>
                        <p>{{list.class_max_score}}</p>
                    </div>
                    <div class="item">
                        <h3>一本分数线</h3>
                        <p>{{list.major_entry_score}}</p>
                    </div>
                    <div class="item">
                        <h3>上线人数</h3>
                        <p>
                            {{list.major_online_cnt}}
                            <span class="f_small">
                                <img :src="require('@/assets/images/icon_up_green.png')" alt="">
                                {{list.major_online_cnt_diff}}
                            </span>
                        </p>
                    </div>
                </div>
                <div class="goal">
                    <div class="title">上线率趋势</div>
                    <div class="qushi">
                        <div id="chart_online_qushi"></div>
                        <div class="online_per">
                            <el-progress class="inner_circle" color="#4B70FF" :width="148" type="circle"
                                         :percentage="overPercent" status="text" :stroke-width="18">
                                <div>
                                    <div class="info">{{overPercent}}<span>%</span></div>
                                    <div class="desc">上线率</div>
                                </div>
                            </el-progress>
                            <div class="txt">{{grade_list_active}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="com_box score_over">
                <div class="t_hd">
                    <div class="title">班级学情</div>
                    <div>
                        <a class="btn btn_primary" @click="goToClassAnalysis()">了解更多</a>
                        <a class="btn btn_primary" @click="goToLessonPreparation()">去备课</a>
                    </div>
                </div>
                <ul class="subjects">
                    <li v-for="(item,index) in subject_list"
                        :key='index'
                        :class="{active:current_sub_show == index}"
                        @click="change_current_sub_show(index)">
                        <span>{{item}}</span>
                    </li>
                </ul>
                <div class="summary">
                    <div class="summary_item">
                        <div class="s_top">
                            <div class="sbox">
                                <p>本学期累计考试次数</p>
                                <span>{{subject_knowledge_info_list.batch_times}}</span>
                            </div>
                            <div class="sbox">
                                <p>累计错题</p>
                                <span>{{subject_knowledge_info_list.wrong_cnt}}</span>
                            </div>
                            <div class="sbox">
                                <p>累计薄弱知识点</p>
                                <span>{{subject_knowledge_info_list.weak_knowledge_cnt}}</span>
                            </div>
                            <div class="sbox">
                                <p>低于年级水平知识点</p>
                                <span>{{subject_knowledge_info_list.lower_grade_knowledge_cnt}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sumary_table">
                <table class="list-table">
                    <thead>
                    <tr>
                        <th style="width: 138px;">知识点</th>
                        <th>考察次数</th>
                        <th>年级得分率</th>
                        <th style="width: 310px;">班级得分率</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for='(item, index) of subject_knowledge_info_list.class_knowledge_info_list'
                        :key='index'
                    >
                        <td><span class="desc">{{item.knowledge_desc}}</span></td>
                        <td>{{item.show_times}}</td>
                        <td>{{item.grade_score_rate}}%</td>
                        <td>
                            <div class="info-box">
                                <div class="skillbar orange">
                                    <div class="filled" LeftNav :style="{width: item.class_score_rate + '%'}"></div>
                                </div>
                                <span class="percent">{{item.class_score_rate}}%</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
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
                list: [],       //数据
                overPercent: 0, //上线率
                color: ['#4B70FF', '#FF8E2C'],
                online_qushi_option: {
                    tooltip: {
                        trigger: 'axis',
                        borderRadius:6,
                        padding: 0,
                        formatter: function (params) {
                          let result = '<div style="border-radius:6px;border: 1px solid rgba(162,175,205,0.60);background: white;color:#5F6D91;">' +
                            '<div style="height:40px;line-height: 40px;background-color:#ECEFF5;margin:0px;padding: 0 10px;">' +params[0].axisValue +'</div>';
                          for (let i = 0; i < params.length; i++) {
                            result += '<div style="line-height: 30px;padding: 0 10px;">' +
                              '<span>' + params[i].seriesName + '：</span>' +
                              '<span>' + (params[i].value == undefined ? 0 : params[i].value) + "%" + '</span>' +
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
                        data: [],
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
                            data: [],
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
                            data: [],
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
                teacher: [],            //登录session数据
                class_id: '',           //班级id
                current_show: 0,        //考试批次列表下标
                grade_list_active: '',  //标题
                subject_knowledge_info_list: [],   //班级学情
                subject_list: [],       //学情科目列表
                current_sub_show: 0,    //学情科目切换

            }
        },
        mounted() {
            this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
            this.class_id = this.teacher[0].class_id
            
            console.log(this.teacher)
            this.handleGetClassOverviewInfo()   //首次渲染
        },
        methods: {
            change_current_show(index, item) {  //考试批次列表切换
                this.current_show = index;
                this.class_id = item.class_id
                this.handleGetClassOverviewInfo()
                console.log(this.class_id)
            },
            change_current_sub_show(index){  //学情科目切换
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
            },
            handleGetClassOverviewInfo () { //首次渲染
                this.$http.get('/class/' + this.class_id + '/class_overview?debug=true', {})
                    .then(this.handleGetClassOverviewInfoSucc.bind(this))
            },
            handleGetClassOverviewInfoSucc (res) {
                if(res.data.code == 0) {
                    console.log(res)
                    let data = res.data.data
                    this.list = data
                    this.grade_list_active = data.batch_name_list[data.batch_name_list.length-1]   //标题
                    this.online_qushi_option.xAxis.data = data.batch_name_list  //x轴
                    this.online_qushi_option.series[0].data = data.class_major_online_rate_list  //班级上线率趋势
                    this.online_qushi_option.series[1].data = data.grade_major_online_rate_list  //年级上线率趋势
                    this.overPercent = data.major_online_rate //上线率
                    // 学情
                    this.subject_list = []
                    for(let item of data.subject_knowledge_info_list) { 
                        this.subject_list.push(item.subject_name)
                    }
                    if(data.subject_knowledge_info_list == '') {
                        this.subject_knowledge_info_list = []
                    }
                    for(let i=0; i<data.subject_knowledge_info_list.length; i++) {
                        if(this.current_sub_show == i) {
                            this.subject_knowledge_info_list = data.subject_knowledge_info_list[i]
                        }
                    }
                    this.online_qushi();  //上升率趋势   
                }
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
                    font-size: 14px;
                    color: #333333;
                    padding-bottom: 15px;
                }
                p {
                    font-family: MicrosoftYaHei;
                    font-size: 30px;
                    color: #6479FC;
                    .f_small {
                        color: rgba(0, 0, 0, 0.60);
                        font-size: 12px;
                    }
                    img {
                        margin -6px 3px 0px 10px;
                    }
                }
            }
        }
        .goal {
            .title {
                font-family: PingFangSC-Medium;
                font-size: 14px;
                color: #383B57;
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
        height 400px;
        width 700px;
    }

    .online_per
        .inner_circle {
            width: 100%;
            text-align: center;
            display: flex;
            justify-content: center;
            font-size 14px;

            .info {
                font-size: 26px;
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
</style>