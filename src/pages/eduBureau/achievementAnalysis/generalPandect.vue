<!--用户: Mr.wang     日期:2018/12/11    时间:13:09-->
<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class="container" v-cloak>
            <el-row class="titleBox">
                <el-col :span="24" class="title">
                    <a href="javascript:history.back(-1)"><img src="@/assets/images/ic_back.png" alt="" class="goBack"></a>
                    <button><span>{{examInfo.grade_and_type == undefined ? "高二文科" : examInfo.grade_and_type}}</span></button>
                    <span class="grid-content exam_name">{{examInfo.batch_name  == undefined ? "人大附中摸底考试" : examInfo.batch_name}}</span>
                </el-col>
            </el-row>
            <div class="exam_content">
                <div class="left_select_list">
                    <left-nav></left-nav>
                </div>
                <div class="right_info_list">
                    <div class="info_list_first">
                        <div class="subject_list">
            <span :span="2" v-for="(item,index) in subjectList" :key="index" class="subject_list_style"
                  :class="{subject_list_active:subjectActive == index}" @click="subjectChange(item,index)"><span>{{item}}</span></span>
                        </div>
                        <div class="score_info" :class="{border_bottom:current_subject_index <= 0}">
                            <div class="score_info_list">
                                <div class="info_score">
                                    <span>全区均分</span><br>
                                    <b>{{responseInfo.avg_score == undefined ? "-": responseInfo.avg_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list">
                                <div class="info_score">
                                    <span>全区最高分</span><br>
                                    <b>{{responseInfo.max_score == undefined ? "-": responseInfo.max_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list" v-if="current_subject_index > 0">
                                <div class="info_score">
                                    <span>全区最低分</span><br>
                                    <b>{{responseInfo.min_score == undefined ? "-": responseInfo.min_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list">
                                <div class="info_score" :class="{border_none:current_subject_index > 0}">
                                    <span>优秀率</span><br>
                                    <b>{{responseInfo.excellent_rate == undefined ? "-": responseInfo.excellent_rate}}%</b>
                                </div>
                            </div>
                            <div class="score_info_list" v-if="current_subject_index <= 0">
                                <div class="info_score" style="border:none !important;">
                                    <span>合格率</span><br>
                                    <b>{{responseInfo.pass_rate == undefined ? "-": responseInfo.pass_rate}}%</b>
                                </div>
                            </div>
                        </div>
                        <div class="score_info" v-if="current_subject_index > 0">
                            <div class="score_info_list" >
                                <div class="info_score" style="border:none !important;width: 186px">
                                    <span>合格率</span><br>
                                    <b>{{responseInfo.pass_rate == undefined ? "-": responseInfo.pass_rate}}%</b>
                                </div>
                            </div>
                        </div>
                        <div class="school_number">
                            <label>参考学校：</label><span>{{responseInfo.total_school == undefined ? "-" : responseInfo.total_school}}</span>
                            <label>参考人数：</label><span>{{responseInfo.total_student}}</span>
                            <label>缺考人数：</label><span>{{responseInfo.absent_student}}</span>
                        </div>
                    </div>
                    <div class="info_list_two bg_white"  id="classAnalysisTrend" ref="classAnalysisTrend">
                        <span class="echartsTitle">全区<span>{{current_subject}}</span>均分对比</span>
                        <div id="divide_contrast" style="width: 686px;height: 430px;margin: 0 auto;"></div>
                    </div>
                    <div class="info_list_three bg_white"  id="classAnalysisCompair" ref="classAnalysisCompair">
                        <span class="echartsTitle">{{current_subject}}最高分对比</span>
                        <table class="height_score_table">
                            <thead>
                            <tr>
                                <th v-for="(item,index) in total_points_height_title" :key="index" style="background-color: #ECEFF5">{{item}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in total_points_height" :key="index">
                                <td style="background-color: #ECEFF5;width: 96px">{{item.ranking}}</td>
                                <td>{{item.school_name}}</td>
                                <td>{{item.height_score}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="info_list_four bg_white"  id="classAnalysisSubjectsCompair" ref="classAnalysisSubjectsCompair">
                        <span class="echartsTitle">{{current_subject}}全区前100名人数对比</span>
                        <table class="height_score_table">
                            <thead>
                            <tr>
                                <th v-for="(item,index) in total_points_top100_title" :key="index" style="background-color: #ECEFF5">{{item}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in total_points_top100" :key="index">
                                <td style="background-color: #ECEFF5;width: 96px">{{item.ranking}}</td>
                                <td>{{item.school_name}}</td>
                                <td>{{item.number}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="info_list_five bg_white" id="classAnalysisWeakPoint" ref="classAnalysisWeakPoint">
                        <span class="echartsTitle">{{current_subject}}分数段统计</span>
                        <div id="total_statistics" style="width: 686px;height: 400px;margin-top: 20px"></div>
                    </div>
                    <div class="info_list_six bg_white" id="classAnalysisWeakPoint1" ref="classAnalysisWeakPoint1">
                        <span class="echartsTitle">排名分段统计</span>
                        <div class="subsection_btn_list">
            <span class="top20" v-for="(item,index) in subsection_btn_list" :key="index"
                  :class="{border_active:border_active_index == index}" @click="border_active(index)">{{item}}</span>
                        </div>
                        <div id="ranking_statistics" style="width: 686px;height: 400px"></div>
                    </div>
                </div>
            </div>
        </div>
    <Anchor
      :anchorActive="anchorActive"
      :anchorTitle="anchorTitle"
      :anchorList="anchorList"
      ref="anchor"
    ></Anchor>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header";
    import SideNav from "@/pages/eduBureau/paperQuality/common/sideNav.vue";
    import leftNav from "@/components/sideNav/leftNav"
    import Anchor from '@/components/anchor/anchor.vue';
    export default {
        name: "generalPandect",
        components: {
            HeaderPublic,
            SideNav,
            leftNav,
            Anchor
        },
        data() {
            return {
                 // 右側
                anchorActive: '',
                anchorTitle: '成绩总览',
                anchorList: [{
                        label: '总分均分对比',
                        value: 'classAnalysisTrend'
                    },
                    {
                        label: '总分最高分对比',
                        value: 'classAnalysisCompair'
                    },
                    {
                        label: '总分全区前100名人数对比',
                        value: 'classAnalysisSubjectsCompair'
                    },
                    {
                        label: '总分分数段统计',
                        value: 'classAnalysisWeakPoint'
                    },
                     {
                        label: '排名分段统计',
                        value: 'classAnalysisWeakPoint1'
                    },
                    
                ],
                url_index: 1,   //header下标
                responseInfo: "",
                examInfo: '',
                subjectList: ['全科', "语文", "数学", "英语", "物理", "化学", "生物"],
                current_subject: "总分",
                current_subject_index: 0,
                subjectActive: 0,
                total_points_height_title: ['名次', '学校', '最高分'],
                total_points_height: [
                    {ranking: "1", school_name: '第一中学', height_score: "689"},
                    {ranking: "2", school_name: '第二中学', height_score: "689"},
                    {ranking: "3", school_name: '师大附中', height_score: "689"},
                    {ranking: "4", school_name: '人大附中', height_score: "689"},
                    {ranking: "5", school_name: '通州分校', height_score: "689"},
                    {ranking: "6", school_name: '海淀分校', height_score: "689"},
                    {ranking: "7", school_name: '大兴分校', height_score: "689"}
                ],
                total_points_top100_title: ['名次', '学校', '人数'],
                total_points_top100: [
                    {ranking: "1", school_name: '第一中学', number: "689"},
                    {ranking: "2", school_name: '第二中学', number: "689"},
                    {ranking: "3", school_name: '师大附中', number: "689"},
                    {ranking: "4", school_name: '人大附中', number: "689"},
                    {ranking: "5", school_name: '通州分校', number: "689"},
                    {ranking: "6", school_name: '海淀分校', number: "689"},
                    {ranking: "7", school_name: '大兴分校', number: "689"}
                ],
                subsection_btn_list: ["前20%", "20%-40%", "40%-60%", "60%-80%", "后20%"],
                border_active_index: 0,
                district_id: 0,
                batch_id: 0,
                subject_id: 0,
                divide_contrast_option:{
                    color: ['#4B70FF'],
                    tooltip: {
                        trigger: 'axis',
                        show:true,
                        axisPointer: {
                            type: 'none'        // 默认为直线
                        },
                        tooltip: {
                            crossStyle: {
                                opacity: 1
                            },
                            backgroundColor: "#ffffff",
                            borderColor: "red",
                            borderRadius:4,
                            borderWidth:1,
                            padding: 0
                        },
                        label: {
                            backgroundColor: "#583636"
                        },
                        formatter: function (params) {
                            let result = '<div style=""><div style="border-radius:4px 4px 0px 0px;width:120px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;padding-left: 10px;line-height: 30px">' +
                                params[0].axisValue +
                                '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].seriesName + '</span>' +
                                    ':' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].data + '</span>' +
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
                            nameTextStyle:{
                                padding: [30,0,0,-35]
                            },
                            type: 'category',
                            data: ['实验中学', '实验中学', '第十七中学', '实验中学'],
                            axisTick: {
                                alignWithLabel: true
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
                            name: "均分",
                            type: 'value',
                            nameTextStyle:{
                                padding: [30,0,0,-35]
                            },
                        }
                    ],
                    series: [
                        {
                            name: '均分',
                            type: 'bar',
                            data: [456, 458, 437, 480],
                            markLine: {
                                symbol:'none',
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            barWidth:"44px",
                            itemStyle: {
                                normal:{
                                    barBorderRadius:[4, 4, 4, 4],
                                }
                            }
                        }
                    ]
                },
                total_subsection_statistics_option:{
                    tooltip: {
                        trigger: 'axis',
                        tooltip: {
                            crossStyle: {
                                opacity: 1
                            },
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff"
                        },
                        label: {
                            backgroundColor: "#583636"
                        },
                        formatter: function (params) {
                            let result = '<div style="border-radius:4px 4px 0px 0px;width:120px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;line-height: 30px">' + "【" + params[0].axisValue + "】" + "分段" + '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span style="margin-left: 10px">' + params[i].seriesName + '</span>' +
                                    ':' +
                                    '<span style="margin-left: 10px">' + params[i].data + '</span>' +
                                    "</div>";
                            }
                            return result;
                        }
                    },
                    color:['#4B70FF','#FF8937','#4E65A0','#A2AFCD','#F8BD46'],
                    legend: {
                        left: 'right',
                        data: ['学校1', '学校2', '学校3', '学校4', '学校5']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        name: "分段",
                        nameTextStyle:{
                            padding: [30,0,0,-13]
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['0-50', '50-100', '150-200', '250-300', '350-400', '450-500', '550-600'],
                        axisLabel: {
                            interval: 0,
                            rotate: 40
                        }
                    },
                    yAxis: {
                        axisLine: {show:false},
                        axisTick: {show:false},
                        name: "占比：%（各分段人数在本学校的人数占比，分段人数/本校人数）",
                        nameTextStyle: {
                            padding: [30,0,0,300]
                        },
                        type: 'value',
                    },
                    series: [
                        {
                            symbol:'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '学校1',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#4B70FF'
                                    }
                                }
                            },
                        },
                        {
                            symbol:'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '学校2',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#FF8937'
                                    }
                                }
                            },
                        },
                        {
                            symbol:'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '学校3',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#4E65A0'
                                    }
                                }
                            },
                        },
                        {
                            symbol:'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '学校4',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#A2AFCD'
                                    }
                                }
                            },
                        },
                        {
                            symbol:'circle',
                            showSymbol: false,
                            smooth: true,
                            name: '学校5',
                            type: 'line',
                            stack: '总量',
                            data: [420, 432, 301, 434, 490, 430, 420],
                            itemStyle: {
                                normal: {
                                    lineStyle: {
                                        color: '#F8BD46',

                                    }
                                }
                            },
                        }
                    ]
                },
                ranking_subsection_statistics_option:{
                    color: ['#4B70FF'],
                    tooltip: {
                        trigger: 'axis',
                        show:true,
                        axisPointer: {
                            type: 'none'        // 默认为直线
                        },
                        tooltip: {
                            crossStyle: {
                                opacity: 1
                            },
                            backgroundColor: "#ffffff",
                            borderColor: "red",
                            borderRadius:4,
                            borderWidth:1,
                            padding: 0
                        },
                        label: {
                            backgroundColor: "#583636"
                        },
                        formatter: function (params) {
                            let result = '<div style=""><div style="border-radius:4px 4px 0px 0px;width:120px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;padding-left: 10px;line-height: 30px">' +
                                params[0].axisValue +
                                '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].seriesName + '</span>' +
                                    ':' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].data + '</span>' +
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
                            nameTextStyle:{
                                padding: [30,0,0,-35]
                            },
                            position:'bottom',
                            type: 'category',
                            data: ['实验中学', '实验中学', '第十七中学', '实验中学'],
                            axisTick: {
                                alignWithLabel: true
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
                            name: "均分",
                            type: 'value',
                            nameTextStyle: {
                                padding: [30,0,0,-20]
                            },
                        }
                    ],
                    series: [
                        {
                            name: '均分',
                            type: 'bar',
                            data: [456, 458, 437, 480],
                            barWidth:"44px",
                            itemStyle: {
                                normal:{
                                    barBorderRadius:[4, 4, 4, 4],
                                }
                            }
                        }
                    ]
                }
            }
        },
        mounted() {
            this.get_exam_info();
            this.total_subsection_statistics();
            this.ranking_subsection_statistics();
            this.examInfo = this.$route.query;
            const $classAnalysisTrend = this.$refs.classAnalysisTrend;
                const $classAnalysisCompair = this.$refs.classAnalysisCompair;
                const $classAnalysisSubjectsCompair = this.$refs.classAnalysisSubjectsCompair;
                const $classAnalysisWeakPoint = this.$refs.classAnalysisWeakPoint;
                const $classAnalysisWeakPoint1 = this.$refs.classAnalysisWeakPoint1;
            window.addEventListener('scroll', e => {
                const scrollY = window.scrollY;
                const winHeight = window.innerHeight;
                const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
                const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;
                const classAnalysisSubjectsCompairHeight = $classAnalysisSubjectsCompair.offsetTop + $classAnalysisSubjectsCompair.offsetHeight;
                const classAnalysisWeakPointHeight = $classAnalysisWeakPoint.offsetTop + $classAnalysisWeakPoint.offsetHeight;
                const classAnalysisWeakPointHeight1 = $classAnalysisWeakPoint1.offsetTop + $classAnalysisWeakPoint1.offsetHeight;
            if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
                this.anchorActive = 'classAnalysisTrend';
                return;
            }

            if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 300) {
                this.anchorActive = 'classAnalysisCompair';
                return;
            }

            if (scrollY >= classAnalysisCompairHeight - 300 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
                this.anchorActive = 'classAnalysisSubjectsCompair';
                return;
            }

            if (scrollY >= classAnalysisSubjectsCompairHeight - 500 && scrollY< classAnalysisWeakPointHeight - 300) {
                this.anchorActive = 'classAnalysisWeakPoint';
                return;
            }
            if (scrollY >= classAnalysisWeakPointHeight-300) {
                this.anchorActive = 'classAnalysisWeakPoint1';
                return;
            }
            this.anchorActive = '';

            });
        },
        methods: {
            get_exam_info() {
                this.axios.get("/district/overview/" + this.district_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "?debug=true").then(response => {
                    this.responseInfo = response.data.data;
                    // 全区总分均分对比
                    let score_list_len = this.responseInfo.schools_avg_score_list.length;
                    let school_name_arr = [];
                    let avg_score_arr = [];
                    for(let i = 0;i < score_list_len;i++){
                        school_name_arr.push(this.responseInfo.schools_avg_score_list[i].school_name);
                        avg_score_arr.push(this.responseInfo.schools_avg_score_list[i].avg_score);
                    }
                    this.divide_contrast_option.xAxis[0].data = school_name_arr;
                    this.divide_contrast_option.series[0].data = avg_score_arr;
                    this.divide_contrast();

                }).catch(
                    error => {
                        console.log(error);
                    });
            },
            // 学科切换
            subjectChange(item, index) {
                this.subjectActive = index;
                if (index == 0) {
                    this.current_subject = "总分"
                } else {
                    this.current_subject = item;
                }
                this.current_subject_index = index;
            },
            // 全区均分对比
            divide_contrast() {
                let divide_contrast = document.getElementById('divide_contrast');
                let option = this.divide_contrast_option;
                this.$echarts.init(divide_contrast).setOption(option);
            },
            // 总分分数段统计
            total_subsection_statistics() {
                let total_statistics = document.getElementById('total_statistics');
                let option = this.total_subsection_statistics_option;
                this.$echarts.init(total_statistics).setOption(option);
            },
            //排名分段统计
            ranking_subsection_statistics() {
                let ranking_statistics = document.getElementById('ranking_statistics');
                let option = this.ranking_subsection_statistics_option;
                this.$echarts.init(ranking_statistics).setOption(option);
            },
            border_active(index) {
                this.border_active_index = index;
            }
        }
    };
</script>

<style type="stylus" scoped>
    .top20:first-child{
        border-radius :2px 0 0 2px;
    }
    .top20:last-child{
        border-radius :0 2px 2px 0;
    }
    .border_none{
        border:none !important;
    }
        .border_bottom{
            border-bottom: 1px solid #EBEBEB;
        }

    .subsection_btn_list {
        display: inline-block;
        margin-left: 29px;
    }

    .border_active {
        border: 1px solid #4B70FF !important;
        color: #4B70FF;
    }

    .subsection_btn_list span {
        display: inline-block;
        padding: 8px 20px 7px 20px;
        border: 1px solid #CCCCCC;
        cursor: pointer;
    }

    .container {
        /*overflow-y :scroll;*/
    }

    //two--------------------------------------
    .info_list_two {

    }

    .bg_white {
        width: 744px;
        height: 477px;
        background-color: #ffffff;
        border-radius: 6px;
        margin-top: 20px;
    }

    .echartsTitle {
        display: inline-block;
        margin-top: 20px;
        margin-left: 20px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #383B57;
    }

    .height_score_table {
        width: 686px;
        height: 380px;
        border: 1px solid #A2AFCD;
        border-collapse: collapse;
        border-radius: 6px;
        margin: 20px auto;
        text-align: center;
    }

    .height_score_table th, td {
        border: 1px solid #ECEFF5;
    }

    .height_score_table th {
        line-height: 50px;
    }

    /*first---------------------------------*/
    .school_number {
        line-height: 41px;
        color: #A2AFCD;
    }

    .school_number label {
        margin-left: 10px;
    }

    .score_info {
        height: 152px;
        display: flex;
        justify-content: space-between;
    }

    .score_info_list {
        width: 250px;
        text-align: center;
    }

    .info_score {
        height: 80px;
        margin-top: 35px;
        border-right: 2px dashed #EBEBEB;
    }

    .info_score span {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #A2AFCD;
        text-align: center;
        display: inline-block;
        margin: 15px 0px;
    }

    .info_score b {
        font-family: MicrosoftYaHei;
        font-size: 30px;
        color: #000000;
        text-align: center;
    }

    .subject_list_active {
        color: #4B70FF;
        border-bottom: 4px solid #4B70FF;
    }

    .subject_list {
        height: 50px;
        border-bottom: 1px solid #EBEBEB;
    }

    .subject_list span {
        cursor: pointer;
    }

    .subject_list_style {
        display: inline-block;
        line-height: 46px;
        text-align: center;
        font-weight: 600;
        margin-left: 30px;
        margin-right: 26px;
        font-size :18px;
    }

    .info_list_first {
        width: 744px;
        /*height :247px;*/
        background-color: #ffffff;
        border-radius: 6px;
    }

    .exam_content {
        margin:0 auto;
        width :940px;
        display: flex;
        justify-content: space-between;
    }

    .titleBox {
        width :940px;
        margin: 14px auto;
        line-height: 80px;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .goBack {
        margin-left: 20px;
    }

    button {
        width: 72px;
        height: 28px;
        border: 1px solid #4B70FF;
        border-radius: 4px;
        margin-left: 20px;
    }

    button > span {
        display: inline-block;
        color: #4B70FF;
    }

    .exam_name {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #383B57;
        vertical-align: middle;
        margin-left: 10px;
    }

    .title {
        height: 80px;
        border-radius: 4px;
        background: #ffffff;
    }

    .bg-purple-white {
        background: #ffffff;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .grid-content {
        border-radius: 4px;
    }

</style>
