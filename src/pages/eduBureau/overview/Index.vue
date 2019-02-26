<!--用户: Mr.wang     日期:2018/12/20    时间:17:10-->
<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class="eduoverview">
            <div class="header_top">
                <el-dropdown trigger="click" style="margin-left: 61px">
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
                <div class="header_top_title">
                    <div class="title_details">
                        <div class="title_details_left">
                            <p>{{current_header_top['header_top_title'].title_name}}</p>
                            <div>
                                <img :src="require('@/assets/images/overview/icon_school.png')" alt=""><span class="">{{current_header_top['header_top_title'].school_num}}所分校</span>
                                <img style="margin-left: 33px"
                                     :src="require('@/assets/images/overview/icon_student.png')" alt=""><span class="">{{current_header_top['header_top_title'].student_num}}名学生</span>
                            </div>
                        </div>
                        <div class="title_details_right">
                            <div class="title_details_right_com">
                                <div class="border_right">
                                    <p><img :src="require('@/assets/images/overview/icon_fsx.png')"
                                            alt=""><span>一本分数线</span></p>
                                    <b>{{current_header_top['header_top_title'].a_line_num}}</b>
                                </div>
                            </div>
                            <div class="title_details_right_com">
                                <div class="border_right">
                                    <p><img :src="require('@/assets/images/overview/icon_sxl.png')"
                                            alt=""><span>上线率</span></p>
                                    <b>{{current_header_top['header_top_title'].enrollment_rate}}</b>
                                </div>
                            </div>
                            <div class="title_details_right_com">
                                <div class="border_right">
                                    <p><img :src="require('@/assets/images/overview/icon_pjf.png')"
                                            alt=""><span>全区均分</span></p>
                                    <b>{{current_header_top['header_top_title'].average}}</b>
                                </div>
                            </div>
                            <div class="title_details_right_com">
                                <div>
                                    <p><img :src="require('@/assets/images/overview/icon_zgf.png')"
                                            alt=""><span>全区最高分</span></p>
                                    <b>{{current_header_top['header_top_title'].highest_score}}</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header_top_middle">
                    <div class="chart_box">
                        <el-row>
                            <el-col :span="21">
                                <div class="grid-content bg-purple">
                                    <i class="icon_left"></i>
                                    <span class="name_title">各学校上线指标追踪</span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple">
                                    <a class="button_my"><span>详细分析</span></a>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="list_box">
                        <div id="bar_echarts" style="width: 570px;height: 300px"></div>
                        <div class="list_box_word">
                            <div class="word_first word">
                                <p>
                                    <label>{{school_data.length}}</label>
                                    <span>所学校超过上线目标</span>
                                </p>
                                <div>
                                    <span v-for="(item,index) in school_data" :key="index">{{item}}、</span>
                                </div>
                            </div>
                            <div class="word_two word">
                                <p>
                                    <label>3</label>
                                    <span>所学校低于上线目标</span>
                                </p>
                                <div>
                                    <span>通州学校、丰台学校、航天城学校</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content_middle">
                <div class="content_middle_left">
                    <el-row style="margin-top: 28px">
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <i class="icon_left"></i>
                                <span class="name_title">学生成绩人群分析</span>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">
                                <a class="button_my"><span>详细分析</span></a>
                            </div>
                        </el-col>
                    </el-row>
                    <div calss="doughnut_box">
                        <div id="doughnut" style="width: 300px;height: 220px;margin: 20px;float: left"></div>
                        <div class="doughnut_right">
                            <p v-for="(item,index) in current_doughnut_option"><label>{{item.proportion}}%</label><span>{{item.value}}人</span></p>
                        </div>
                    </div>
                </div>
                <div class="content_middle_right">
                    <el-row style="margin-top: 28px">
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <i class="icon_left"></i>
                                <span class="name_title">试卷分析</span>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="grid-content bg-purple">
                                <a class="button_my"><span>详细分析</span></a>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="content_middle_right_con">
                        <div>
                            <span>语文：主观题11道，分值占比94% ，客观题3道，分值占比6%</span>
                            <img :src="require('@/assets/images/overview/icon_jt.png')" alt="">
                        </div>
                        <div class="paper_analysis">
                            <div>
                                <div class="nan_du" id="nan_du" style="width: 130px;height: 150px"></div>
                                <p style="margin-left: 47px;display: inline-block;font-size: 14px;color: #5F6D91;">试卷难度</p>
                            </div>
                            <div class="nan_yi">
                                <span style="font-size: 36px;color: #2C2C2C;margin-left: -10px">2:6:2</span>
                                <div>
                                    <span class="color_arr" v-for="(item,index) in color_arr" :style="{backgroundColor:item}"></span>
                                </div>
                                <span style="margin-left: -10px;margin-top: 40px;font-size: 14px">易：中：难</span>
                            </div>
                            <div class="quFen_du">
                                <div class="nan_du" id="quFen_du" style="width: 130px;height: 150px"></div>
                                <p style="margin-left: 47px;display: inline-block;font-size: 14px;color: #5F6D91;">区分度</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header";

    export default {
        components: {
            HeaderPublic
        },
        name: "index2",
        data() {
            return {
                url_index: 0,   //header下标
                eduoverview: {
                    header_top: {
                        header_top_title: {
                            title_name: "中国人民大学附属中学集团校",
                            school_num: 10,
                            student_num: 5987,
                            a_line_num: 582,
                            enrollment_rate: 38,
                            average: 608,
                            highest_score: 716
                        },
                        left_tip: ['高二理科', "高二文科", "高三文科", "高三理科"],
                        divide_contrast_option: {
                            color: ['#4B70FF'],
                            tooltip: {
                                trigger: 'axis',
                                show: true,
                                axisPointer: {
                                    type: 'none'        // 默认为直线
                                },
                                tooltip: {
                                    crossStyle: {
                                        opacity: 1
                                    },
                                    backgroundColor: "#ffffff",
                                    borderColor: "red",
                                    borderRadius: 4,
                                    borderWidth: 1,
                                    padding: 0
                                },
                                label: {
                                    backgroundColor: "#583636"
                                },
                                formatter: function (params) {
                                    let result = '<div style=""><div style="border-radius:4px 4px 0px 0px;width:120px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;padding-left: 10px;line-height: 30px">' +
                                        "上线目标完成率" +
                                        '</div>';
                                    for (let i = 0; i < params.length; i++) {
                                        result += '<div style="border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                            '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;text-align: center">' + params[i].data + '</span>' +
                                            "</div></div>";
                                    }
                                    return result;
                                }
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [
                                {
                                    name: "学校",
                                    nameTextStyle: {
                                        padding: [30, 0, 0, -35]
                                    },
                                    position: 'bottom',
                                    type: 'category',
                                    data: ['人大附中', '人大附中分校', '人大附中二分校', '朝阳学校', "朝阳分校", "西山学校", "翠微学校", "通州校区"],
                                    axisLine: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 40
                                    }
                                }
                            ],
                            yAxis: [
                                {
                                    axisLine: {
                                        show: false
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    name: "上线目标完成率 %",
                                    type: 'value',
                                    nameTextStyle: {
                                        padding: [30, 0, 0, 35]
                                    },
                                }
                            ],
                            series: [
                                {
                                    name: '均分',
                                    type: 'bar',
                                    data: [86, 88, 90, 102,80,110,94,97],
                                    barWidth: "14px",
                                    itemStyle: {
                                        normal: {
                                            barBorderRadius: [14, 14, 0, 0],
                                        }
                                    }
                                }
                            ]
                        },
                    },
                    middle:{
                        doughnut_option:{
                            tooltip: {
                                trigger: 'item',
                                formatter: "{a} <br/>{b}: {c} ({d}%)",
                                fontSize:18,
                            },
                            color:['#A2AFCD', '#FF8937', '#FFC95D', '#1AB99B', '#4B70FF'],
                            legend: {
                                orient: 'vertical',
                                x: 'right',
                                data:['[150-0]分','[300-150]分','[450-300]分','[600-450]分','[750-600]分'],
                                top:'middle'
                            },
                            series: [
                                {
                                    name:'分段占比',
                                    type:'pie',
                                    center: ['25%', '50%'],
                                    radius: ['50%', '60%'],
                                    avoidLabelOverlap: false,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '16',
                                                fontWeight: 'bold'
                                            }
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data:[
                                        {value:123, name:'[150-0]分',proportion:3.11},
                                        {value:1002, name:'[300-150]分',proportion:25.3},
                                        {value:562, name:'[450-300]分',proportion:14.19},
                                        {value:1138, name:'[600-450]分',proportion:28.74},
                                        {value:1135, name:'[750-600]分',proportion:28.66}
                                    ]
                                }
                            ]
                        },
                        gauge_option1:{
                            tooltip : {
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                            color:['#A2AFCD', '#FF8937', '#FFC95D', '#1AB99B', '#4B70FF'],
                            grid:{

                            },
                            series: [
                                {
                                    splitLine:{
                                        show: false    //隐藏分割线
                                    },
                                    name: '试卷难度',
                                    type: 'gauge',
                                    max:1,
                                    radius:'80%',
                                    splitNumber:5,
                                    detail: {formatter:'{value}',fontSize:24},
                                    data: [{value: 0.5}],
                                    pointer:{
                                        show:false
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            width: 10, // 这个是修改宽度的属性
                                            color: [[0.2, '#1AB99B'], [0.8, '#4C84FF'], [1, '#FF8937']]
                                        }
                                    },
                                    axisLabel:{
                                        show:false
                                    }
                                }
                            ]
                        },
                        gauge_option3:{
                            tooltip : {
                                formatter: "{a} <br/>{b} : {c}%"
                            },
                            color:['#A2AFCD', '#FF8937', '#FFC95D', '#1AB99B', '#4B70FF'],
                            series: [
                                {
                                    splitLine:{
                                        show: false    //隐藏分割线
                                    },
                                    name: '试卷难度',
                                    type: 'gauge',
                                    max:1,
                                    radius:'80%',
                                    splitNumber:5,
                                    detail: {formatter:'{value}',fontSize:24},
                                    data: [{value: 0.5}],
                                    pointer:{
                                        show:false
                                    },
                                    axisLine: {
                                        lineStyle: {
                                            width: 10, // 这个是修改宽度的属性
                                            color: [[0.2, '#1AB99B'], [0.8, '#4C84FF'], [1, '#FF8937']]
                                        }
                                    },
                                    axisLabel:{
                                        show:false
                                    }
                                }
                            ]
                        },
                    }
                },
                color_arr:['#1AB99B',"#1AB99B","#4C84FF","#4C84FF","#4C84FF","#4C84FF","#4C84FF","#4C84FF","#FF8937","#FF8937"],
                current_header_top: {},
                current_left_tip: '',
                divide_contrast_option: {},
                doughnut_option:{},
                school_data:[],
                current_doughnut_option:[],
                current_gauge_option1:{},
                current_gauge_option2:{},
                current_gauge_option3:{}
            }
        },
        created() {
            this.current_header_top = this.eduoverview['header_top'];
            this.current_left_tip = this.eduoverview['header_top']['left_tip'][0];
            this.school_data = this.eduoverview['header_top']['divide_contrast_option']['xAxis'][0]['data'];
            this.doughnut_option = this.eduoverview['middle']['doughnut_option'];
            this.current_doughnut_option = this.eduoverview['middle']['doughnut_option']['series'][0]['data'];
            this.current_gauge_option1 = this.eduoverview['middle']['gauge_option1'];
            this.current_gauge_option3 = this.eduoverview['middle']['gauge_option3'];
        },
        mounted() {
            this.divide_contrast_option = this.eduoverview['header_top']['divide_contrast_option'];
            this.divide_contrast();
            this.doughnut();
            this.gauge_option1();
            this.gauge_option3();
        },
        methods: {
            divide_contrast() {
                let divide_contrast = document.getElementById('bar_echarts');
                let option = this.divide_contrast_option;
                this.$echarts.init(divide_contrast).setOption(option);
            },
            doughnut(){
                let doughnut = document.getElementById('doughnut');
                let option = this.doughnut_option;
                this.$echarts.init(doughnut).setOption(option);
            },
            gauge_option1(){
                let gauge = document.getElementById('nan_du');
                let option = this.current_gauge_option1;
                this.$echarts.init(gauge).setOption(option);
            },
            gauge_option3(){
                let gauge = document.getElementById('quFen_du');
                let option = this.current_gauge_option3;
                this.$echarts.init(gauge).setOption(option);
            }
        }
    };
</script>


<style lang="stylus" scoped>
    .color_arr
        display inline-block
        width 6px
        height 20px
        border-radius 7px
        margin-right 8px  !important
        margin-left 0px !important
        padding 0
    .doughnut_box
        display flex
        justify-content space-between
    .doughnut_right
        float right
        margin 70px 50px 0px 20px
        p
            line-height 25px
            label
                display inline-block
                width 52px
    .border_right
        border-right 1px dashed rgba(162, 175, 205, 0.60)

    .icon_left
        display inline-block
        width 6px
        height 30px
        background-color #4C83F6

    .name_title
        display block
        margin: -27px 0px 0px 16px
        font-family MicrosoftYaHei !important
        font-size 18px !important
        color #002676 !important

    .button_my
        display inline-block
        width 88px
        height 28px
        border 1px solid #4B70FF
        border-radius 23px
        span
            color #4B70FF
            display inline-block
            padding 8px 16px 6px 16px

    .eduoverview
        width 1000px
        margin 30px auto
        .header_top
            width 100%
            height 542px
            background-color #FFFFFF
            border-radius 6px
            .header_top_title
                height 168px
                border-bottom 1px solid #DBDFE8
                .title_details
                    padding-top 11px
                    display flex
                    justify-content space-between
                    .title_details_left
                        height 145px
                        width 340px
                        border-right 1px solid #E5E9F2
                        display table-cell
                        text-align center
                        p
                            font-family MicrosoftYaHei
                            font-size 20px
                            color #002676
                            margin-top 30px
                        div
                            text-align left
                            line-height 20px
                            width 300px
                            margin-top 19px
                            margin-left 40px
                            span
                                display inline-block
                                vertical-align middle
                                margin-top 4px
                                opacity 0.5
                                font-family MicrosoftYaHei
                                font-size 14px
                                color #002676
                                margin-left 2px
                    .title_details_right
                        width 615px
                        margin-right 42px
                        display flex
                        justify-content space-around
                        .title_details_right_com
                            width 165px
                            height 100%
                            div
                                margin-top 48px
                                margin-left 20px
                                height 60px
                                span
                                    display inline-block
                                    margin-left 9px
                                    font-family PingFangSC-Regular
                                    font-size 14px
                                    color #8895B7
                                b
                                    display inline-block
                                    margin-top 12px
                                    font-family ArialMT
                                    font-size 30px
                                    color #000000

                .left_tip
                    position absolute
                    right 259px
                    top 174px
                    width 42px
                    height 90px
                    background-color #4C83F6
                    border 4px 0 0 4px
                    display inline-block
                    justify-content space-between
                .img_left
                    display inline-block
                    width 12px
                    height 90px
                    float left
                    img
                        margin-top 38px
                        margin-left 4px
                .font_right
                    height 90px
                    width 25px
                    margin-top 20px
                    margin-left 4px
                    word-wrap: break-word;
                    letter-spacing: 20px;
                    color #FFFFFF
                    text-align center
                    float right

            .chart_box
                margin-top 28px
            .list_box
                display flex
                justify-content space-between
                .list_box_word
                    width 300px
                    margin 30px auto
                    .word_two
                        margin-top 39px
                    .word
                        p
                            border-bottom 1px solid #979797
                            label
                                font-size 30px
                                color:#000000
                            span
                                font-size 12px
                                color:#000000
                                font-family: MicrosoftYaHe
                        div
                            span
                                opacity: 0.6;
                                font-family: MicrosoftYaHei;
                                font-size: 14px;
                                color: #000000;
                                line-height: 30px;
        .content_middle
            width 100%
            height 300px
            display flex
            justify-content space-between
            margin-top 14px
            .content_middle_left
                width 508px
                height 300px
                background-color #FFFFFF
                border-radius 6px
            .content_middle_right
                width 478px
                height 300px
                background-color #FFFFFF
                border-radius 6px
                .content_middle_right_con
                    div
                        span
                            display inline-block
                            margin 25px 0px 0px 22px
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            color: #5F6D91;
                .paper_analysis
                    display flex
                    justify-content space-between
                    .nan_yi
                        width 150px
                        text-align center

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
