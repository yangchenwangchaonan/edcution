<!--用户: Mr.wang     日期:2018/12/14    时间:18:00-->
<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class="container" v-cloak>
            <header-title width="940px"></header-title>
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
                                    <span>本校均分</span><br>
                                    <b>{{responseInfo.school_avg_score == undefined ? "-": responseInfo.school_avg_score}}</b><br>
                                    <span class="mark">全区均分 {{responseInfo.district_avg_score == undefined ? "-": responseInfo.district_avg_score}} </span>
                                </div>
                            </div>
                            <div class="score_info_list" v-if="current_subject_index == 0">
                                <div class="info_score">
                                    <span>本校最高分</span><br>
                                    <b>{{responseInfo.school_highest_score == undefined ? "-": responseInfo.school_highest_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list" v-if="current_subject_index > 0">
                                <div class="info_score">
                                    <span>全区最高分</span><br>
                                    <b>{{responseInfo.district_most_score == undefined ? "-": responseInfo.district_most_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list" v-if="current_subject_index > 0">
                                <div class="info_score">
                                    <span>全区最低分</span><br>
                                    <b>{{responseInfo.district_lowest_score == undefined ? "-": responseInfo.district_lowest_score}}</b>
                                </div>
                            </div>
                            <div class="score_info_list ">
                                <div class="info_score no-bdr">
                                    <span>上线率</span><br>
                                    <b>{{responseInfo.online_rate == undefined ? "-": responseInfo.online_rate}}</b>
                                </div>
                            </div>
                        </div>
                        <div class="school_number">
                            <label>参考班级: </label><span>{{responseInfo.join_school_num == undefined ? "-" : responseInfo.join_school_num}}</span>
                            <label>参考人数：</label><span>{{responseInfo.join_student_num}}</span>
                            <label>缺考人数：</label><span>{{responseInfo.not_join_student_num}}</span>
                        </div>
                    </div>
                    <div class="info_list_two bg_white classAnalysisPanel" 
                         id="classAnalysisTrend"
                         ref="classAnalysisTrend"
                    >
                        <span class="echartsTitle"><span>{{current_subject}}</span>均分对比</span>
                        <div id="divide_contrast" style="width: 686px;height: 430px;margin: 0 auto;"></div>
                    </div>
                    <div
                     id="classAnalysisCompair"
                     ref="classAnalysisCompair"
                     class="info_list_three bg_white classAnalysisPanel">
                        <span class="echartsTitle">{{current_subject}}最高分对比</span>
                        <table class="height_score_table">
                            <thead>
                            <tr>
                                <th v-for="(item,index) in total_points_height_title" :key="index" style="background-color: #ECEFF5">
                                    {{item}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in total_points_height" :key=index>
                                <td :class="idx==0?'td_first':''" v-for="(tdData,idx) in item" :key=idx>{{tdData}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="info_list_four bg_white classAnalysisPanel"
                        id="classAnalysisSubjectsCompair"
                        ref="classAnalysisSubjectsCompair"
                    >
                        <span class="echartsTitle">{{current_subject}}全区前100名人数对比</span>
                        <table class="height_score_table">
                            <thead>
                            <tr>
                                <th v-for="(item,index) in total_points_top100_title" :key="index" style="background-color: #ECEFF5">
                                    {{item}}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in total_points_top100" :key="index">
                                <td :class="idx==0?'td_first':''" v-for="(tdData,idx) in item" :key="idx">{{tdData}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="info_list_five bg_white classAnalysisPanel" id="classAnalysisWeakPoint" ref="classAnalysisWeakPoint">
                        <span class="echartsTitle">{{current_subject}}分数段统计</span>
                        <div id="total_statistics" style="width: 686px;height: 400px;margin-top: 20px"></div>
                    </div>
                    <div class="info_list_six bg_white classAnalysisPanel" id="classAnalysisWeakPoint1" ref="classAnalysisWeakPoint1">
                        <span class="echartsTitle">排名分段统计</span>
                        <div class="subsection_btn_list">
            <span class="top20" v-for="(item,index) in subsection_btn_list"
                  :class="{border_active:border_active_index == index}" :key="index" @click="border_active(index)">{{item}}</span>
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
    import HeaderTitle from '@/components/headerTitle/schoolHeaderTitle';
    import SideNav from "@/pages/school/components/sideNav.vue";
    import leftNav from "../components/leftNav"
    import Anchor from '@/components/anchor/anchor.vue';
    export default {
        name: "generalPandect",
        components: {
            HeaderPublic,
            HeaderTitle,
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
                total_points_height_title: ['班级', '班主任', '最高分', '本校名次', '本区名次'],
                total_points_height: [
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                    ["高二（1）班", '李晓欣', "689", '2', '21'],
                ],
                total_points_top100_title: ['班级', '班主任', '班级人数', '本校占比'],
                total_points_top100: [
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                    ["高二（1）班", '李晓欣', "689", '11%'],
                ],
                subsection_btn_list: ["前20%", "20%-40%", "40%-60%", "60%-80%", "后20%"],
                border_active_index: 0,
                district_id: 0,
                school_id: 0,
                batch_id: 0,
                subject_id: 0,
                curr_ranking_section_id: 0,
                ranking_section_data: [],
                divide_contrast_option: {
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
                            name: "班级",
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
                            type: 'value'
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
                total_subsection_statistics_option: {
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
                        name: "占比：%",
                        nameTextStyle: {
                            align: "left"
                        },
                        type: 'value'
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
                ranking_subsection_statistics_option: {
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
                            name: "班级",
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
                            name: "占比 %",
                            type: 'value',
                            max: 100
                        }
                    ],
                    series: [
                        {
                            name: '占比(%)',
                            type: 'bar',
                            data: [45, 45, 37, 80, 25],
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
            // 科目简要信息
            this.get_brief_info();
            // 总分平均分bar图
            this.get_average_data();
            // 总分分数段 & 排名分数段
            this.get_sections();
            // 最高分表格
            this.get_highest_score_contrast();
            // top 100 表格
            this.get_top_100_contrast();
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
      get_top_100_contrast() {
        //TODO: correct value
        let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_compare_district100?debug=true";
        this.axios.get(url)
        .then(response => {
          console.log(response.data.data);
          let top_100_contrast = [];
          for (let i in response.data.data.top100_class_compare_vo_list) {
            let item = response.data.data.top100_class_compare_vo_list[i];
            let curr_class = new Array();
            curr_class.push(item.class_name);
            curr_class.push(item.class_teacher);
            curr_class.push(item.class_number);
            curr_class.push(item.district_percent + "%");

            top_100_contrast.push(curr_class);
          }
          this.total_points_top100 = top_100_contrast;
        }).catch(
          error => {
            console.log(error);
          });
      },
      get_highest_score_contrast() {
        //TODO: correct value
        let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_compare_highest?debug=true";
        this.axios.get(url)
        .then(response => {
          let highest_contrast = [];
          for (let i in response.data.data.subject_most_score_vo_list) {
            let item = response.data.data.subject_most_score_vo_list[i];
            let curr_class = new Array();
            curr_class.push(item.class_name);
            curr_class.push(item.teacher_name);
            curr_class.push(item.highest_score);
            curr_class.push(item.school_num);
            curr_class.push(item.distric_num);

            highest_contrast.push(curr_class);
          }

          this.total_points_height = highest_contrast;
        }).catch(
          error => {
            console.log(error);
          });
      },
            get_brief_info() {
                let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_title_msg?debug=true";
                this.axios.get(url)
                    .then(response => {
                        //console.log(response.data.data);
                        // 科目简要信息
                        this.responseInfo = response.data.data;
                    }).catch(
                    error => {
                        console.log(error);
                    });
            },

            get_sections() {
                // TODO: value the real id
                let url = "/school/0/batch/0/subject/0/subject_school_part_analysis" + "?debug=true";
                var that = this;
                this.axios.get(url)
                    .then(response => {
                        console.log(response.data.data);
                        // 转换数据格式
                        let series_data = new Array();
                        let class_name_list = new Array();
                        for (let i in response.data.data.class_all_score_parts) {
                            let item = response.data.data.class_all_score_parts[i];

                            let result = new Object();
                            result["type"] = "line";
                            result["smooth"] = true;
                            result["symbol"] = "circle";
                            result["showSymbol"] = false;
                            result["name"] = item.class_name;
                            result["data"] = item.all_score_part_rank;

                            series_data.push(result);
                            class_name_list.push(item.class_name);
                        }

                        // 总分分段
                        this.total_subsection_statistics_option.xAxis.data = response.data.data.part_name;
                        this.total_subsection_statistics_option.series = series_data;
                        this.total_subsection_statistics_option.legend.data = class_name_list;
                        this.total_subsection_statistics();

                        // 排名分段
                        this.ranking_subsection_statistics_option.xAxis[0].data = response.data.data.rank_class_name;
                        this.ranking_section_data = response.data.data.rank_part_analysis_list;
                        this.ranking_subsection_statistics_option.series[0].data = this.ranking_section_data[this.border_active_index].rank_percent;
                        this.ranking_subsection_statistics();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },

            get_average_data() {
                let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_compare_avg" + "?debug=true";
                var that = this;
                this.axios.get(url)
                    .then(response => {
                        //console.log(response.data.data);

                        this.divide_contrast_option.xAxis[0].data = response.data.data.class_name;
                        this.divide_contrast_option.series[0].data = response.data.data.class_avg_score;
                        this.divide_contrast();
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },

            get_exam_info() {
                this.axios.get("/district/overview/" + this.district_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "?debug=true").then(response => {
                    //console.log(response.data.data);
                    this.responseInfo = response.data.data;
                    // 本校总分均分对比
                    let score_list_len = this.responseInfo.schools_avg_score_list.length;
                    let school_name_arr = [];
                    let avg_score_arr = [];
                    for (let i = 0; i < score_list_len; i++) {
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
            // 本校均分对比
            divide_contrast() {
                // this.divide_contrast_option.xAxis[0].data
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
                console.log(option.xAxis);
                this.$echarts.init(ranking_statistics).setOption(option);
            },
            border_active(index) {
                this.border_active_index = index;
                this.ranking_subsection_statistics_option.series[0].data = this.ranking_section_data[this.border_active_index].rank_percent;
                this.ranking_subsection_statistics();
            }
        }
    }
</script>

<style type="style" scoped>
html,body {
  scroll-behavior: auto;
}
.classAnalysisPanel {
    /* padding: 0 0 42px 0; */
    position: relative;
  }
    .border_none {
        border: none !important;
    }

    .border_bottom {
        border-bottom: 1px solid #EBEBEB;
    }

    .subsection_btn_list {
        display: inline-block;
        margin-left: 80px;
    }

    .border_active {
        border: 1px solid #4B70FF !important;
        color: #4B70FF;
    }

    .subsection_btn_list span {
        display: inline-block;
        padding: 8px 20px 8px 20px;
        border: 1px solid #CCCCCC;
        cursor: pointer;
    }
    .subsection_btn_list span:nth-of-type(1){
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .subsection_btn_list span:nth-last-of-type(1){
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
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
    .height_score_table td.td_first {
        background-color: #ECEFF5;
        width: 100px
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
    .info_score.no-bdr {
        border-right: none;
    }

    .info_score .mark {
        font-size: 12px;
        color: #5F6D91;
        text-align: center;
        background-color: rgba(162, 175, 205, 0.2);
        padding: 5px 20px;
        border-radius: 20px;
        margin-top: 10px;
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
        line-height: 48px;
        text-align: center;
        font-weight: 600;
        margin: 0px 26px 0px 30px;
        font-size: 16px;
    }

    .info_list_first {
        width: 744px;
        /*height :247px;*/
        background-color: #ffffff;
        border-radius: 6px;
    }

    .exam_content {
        margin: 20px auto;
        width: 940px;
        display: flex;
        justify-content: space-between;
    }

    .titleBox {
        width: 940px;
        margin: 14px auto;
        line-height: 80px;
       
    }
    .titleBox:last-child {
        margin-bottom: 0;
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

