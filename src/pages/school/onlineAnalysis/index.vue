<!--用户: Mr.wang     日期:2018/12/12    时间:10:39-->
<template>
    <div class="school-online-container">
        <header-public :url_index=url_index></header-public>
         <headerTitle></headerTitle>
        <div class="exam_content">
            <div class="left_info_list">
                <LeftNav></LeftNav>
            </div>
            <div class="right_info_list">
                <div class="info_list_first">
                    <div class="subject_list">
                        <span :span="2" v-for="(item,index) in subjectList" :key="`${index}_f`" class="subject_list_style"
                              :class="{subject_list_active:subjectActive == index}"
                              @click="subjectChange(item,index)"><span>{{item}}</span></span>
                    </div>
                    <div class="score_info">
                        <div class="score_info_list">
                            <div class="info_score">
                                <span>一本分数线</span><br>
                                <b>508</b>
                            </div>
                        </div>
                        <div class="score_info_list">
                            <div class="info_score">
                                <span>上线人数</span><br>
                                <b>22<span></span>3</b>
                            </div>
                        </div>
                        <div class="score_info_list">
                            <div class="info_score">
                                <span>上线率</span><br>
                                <b>34%</b>
                            </div>
                        </div>
                        <div class="score_info_list" :class="{border_none:current_subject_index == 0}">
                            <div class="info_score">
                                <span>目标完成率</span><br>
                                <b>12%</b>
                            </div>
                            <div class="target-number">目标上线人数10000</div>
                        </div>
                        <div class="score_info_list" v-if="current_subject_index > 0">
                            <div class="info_score">
                                <span>双上线人数</span><br>
                                <b>34</b>
                            </div>
                        </div>
                        <div class="score_info_list" v-if="current_subject_index > 0">
                            <div class="info_score" style="border:none;">
                                <span>双上线率</span><br>
                                <b>12%</b>
                            </div>
                        </div>
                    </div>
                </div>
                <!--各学校一本上线情况分析-->
                <!--全科-->
                <div class="info_list_two bg_white" v-if="current_subject_index <= 0"
                        id="classAnalysisTrend"
                        ref="classAnalysisTrend">
                    <span  class="echartsTitle" >各学校一本上线情况分析</span>
                    <table class="height_score_table">
                        <thead>
                        <tr>
                            <th v-for="(item, index) in online_analyze_title" :key="`${index}_g`" style="background-color: #ECEFF5">{{item}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in online_analyze" :key="`${index}_h`">
                            <td style="background-color: #ECEFF5;width: 96px">{{item.school_name}}</td>
                            <td>{{item.class_master}}</td>
                            <td>{{item.target_online_number}}</td>
                            <td>{{item.online_number}}</td>
                            <td>{{item.online_rate}}</td>
                            <td>{{item.target_finished_rate}}</td>
                            <td>{{item.stabilization_rate}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--单科-->
                <div class="info_list_two bg_white" v-if="current_subject_index > 0" 
                     id="classAnalysisTrend"
                     ref="classAnalysisTrend"
                    >
                    <span class="echartsTitle">各学校一本上线情况分析</span>
                    <table class="height_score_table">
                        <thead>
                        <tr>
                            <th v-for="(item, index) in online_analyze_title_subject" :key="`${index}_i`" style="background-color: #ECEFF5">
                                {{item}}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in online_analyze_subject" :key="`${index}_a`">
                            <td style="background-color: #ECEFF5;width: 96px">{{item.school_name}}</td>
                            <td>{{item.class_master}}</td>
                            <td>{{item.target_online_number}}</td>
                            <td>{{item.online_number}}</td>
                            <td>{{item.online_rate}}</td>
                            <td>{{item.two_online_number}}</td>
                            <td>{{item.two_online_rate}}</td>
                            <td>{{item.target_finished_rate}}</td>
                            <td>{{item.stabilization_rate}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--踩线生分析（一本线±10）-->
                <div class="info_list_three bg_white" id="classAnalysisCompair" ref="classAnalysisCompair">
                    <span class="echartsTitle">踩线生分析（一本线±10）</span>
                    <table class="height_score_table">
                        <thead>
                        <tr>
                            <th v-for="(item, index) in born_on_line_title" :key="`${index}_b`" style="background-color: #ECEFF5">{{item}}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in born_on_line" :key="`${index}_c`">
                            <td style="background-color: #ECEFF5;width: 96px">{{item.school_name}}</td>
                            <td style="width: 70px;">{{item.class_master}}</td>
                            <td>{{item.foot_fault_number}}</td>
                            <td>{{item.online_number}}</td>
                            <td>{{item.online_proportion}}</td>
                            <td>{{item.no_online_number}}</td>
                            <td>{{item.no_online_proportion}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!--上线波动分析-->
                <div class="info_list_four bg_white"  id="classAnalysisSubjectsCompair" ref="classAnalysisSubjectsCompair">
                    <span class="echartsTitle">上线波动分析</span>
                    <div class="online_fluctuate">
                        <span class="top20" v-for="(item,index) in online_fluctuate_analyze_tab" :key="`${index}_d`"
                              :class="{border_active:border_active_index == index}" @click="border_active(item,index)">{{item}}</span>
                    </div>
                    <div class="online_total_flow">总流人数: <span>{{totalFlowNumber}}</span></div>
                    <table class="height_score_table">
                        <thead>
                        <tr>
                            <th style="background-color: #ECEFF5">学校</th>
                            <th style="background-color: #ECEFF5">班主任</th>
                            <th style="background-color: #ECEFF5">{{tab_name}}数</th>
                            <th style="background-color: #ECEFF5">占比</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item,index) in online_fluctuate_analyze_table" :key="`${index}_e`">
                            <td style="background-color: #ECEFF5;width: 96px">{{item.school_name}}</td>
                            <td>{{item.class_master}}</td>
                            <td>{{item.number}}</td>
                            <td>{{item.proportion}}</td>
                        </tr>
                        </tbody>
                    </table>
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
    import LeftNav from '../components/leftNav';
    import Anchor from '@/components/anchor/anchor.vue';
    export default {
        name: "SchoolOnlineAnalysis",
        components: {
            HeaderPublic,
            HeaderTitle,
            LeftNav,
            Anchor
        },
        data() {
            return {
                 // 右側
                anchorActive: '',
                anchorTitle: '上线分析',
                anchorList: [{
                        label: '一本上线情况分析',
                        value: 'classAnalysisTrend'
                    },
                    {
                        label: '踩线生分析',
                        value: 'classAnalysisCompair'
                    },
                    {
                        label: '上线波动分析',
                        value: 'classAnalysisSubjectsCompair'
                    },
                ],
                url_index: 1,   //header下标
                examInfo: '',
                selectShow: true,
                selectShowTwo: false,
                selectList: [
                    {name: '成绩总览'},
                    {name: '上线分析'}
                ],
                selectListTwo: [
                    {name: '整体质量'},
                    {name: "小题质量"}
                ],
                changeactive: 1,
                subjectList: ['全科', "语文", "数学", "英语", "物理", "化学", "生物"],
                current_subject: "总分",
                current_subject_index: 0,
                subjectActive: 0,
                //各学校一本上线情况分析
                online_analyze_title: ['学校', '班主任', '目标上线人数', '上线人数', "上线率", "目标完成率", "稳定率"],
                online_analyze_title_subject: ['学校',  '班主任', '目标上线人数', '上线人数', "上线率", "双上线人数", "双上线率", "目标完成率", "稳定率"],
                online_analyze: [
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                ],
                online_analyze_subject: [
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                    {
                        school_name: '第一中学',
                        class_master: '王小二',
                        target_online_number: "567",
                        online_number: '455',
                        online_rate: '80%',
                        two_online_number: "455",
                        two_online_rate: "80%",
                        target_finished_rate: "98%",
                        stabilization_rate: "99%"
                    },
                ],
                //踩线生分析（一本线±10）
                born_on_line_title: ["学校", '班主任',  "踩线生人数", "上线人数", "占比(上线/本校)", "未上线人数", "占比(未上线/本校)"],
                born_on_line: [
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                    {
                        school_name: "第一学校",
                        class_master: '王小二',
                        foot_fault_number: "567",
                        online_number: "455",
                        online_proportion: "80%",
                        no_online_number: "98",
                        no_online_proportion: "99%"
                    },
                ],
                //上线波动分析
                online_fluctuate_analyze_tab: ['流入', "流出", "新增上线", "稳定上线"],
                totalFlowNumber: 21,
                online_fluctuate_analyze_table: [
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                    {school_name: '第一中学', class_master: '王小二', number: "62", proportion: "11%"},
                ],
                tab_name: '流入',
                border_active_index: 0
            }
        },
        mounted() {
            this.examInfo = this.$route.query;

                const $classAnalysisTrend = this.$refs.classAnalysisTrend;
                const $classAnalysisCompair = this.$refs.classAnalysisCompair;
                const $classAnalysisSubjectsCompair = this.$refs.classAnalysisSubjectsCompair;
            window.addEventListener('scroll', e => {
                const scrollY = window.scrollY;
                const winHeight = window.innerHeight;
                const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
                const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;
                const classAnalysisSubjectsCompairHeight = $classAnalysisSubjectsCompair.offsetTop + $classAnalysisSubjectsCompair.offsetHeight;

            if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
                this.anchorActive = 'classAnalysisTrend';
                return;
            }

            if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 200) {
                this.anchorActive = 'classAnalysisCompair';
                return;
            }

            if (scrollY >= classAnalysisCompairHeight - 200 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
                this.anchorActive = 'classAnalysisSubjectsCompair';
                return;
            }
            this.anchorActive = '';

            });
        },
        methods: {
            controlSelect() {
                this.selectShow = !this.selectShow;
            },
            //试题质量
            test_quality() {
                this.selectShowTwo = !this.selectShowTwo;
            },
            // 试题质量跳转
            goToPage(index) {
                if (index == 0) {
                    this.$router.push({
                        path: "/eduBureau",
                        query: {
                            grade: this.examInfo.grade,
                            academic: this.examInfo.academic,
                            examName: this.examInfo.examName,
                            examTime: this.examInfo.examTime,
                            subject: this.examInfo.subject
                        }
                    });
                } else {
                    this.$router.push({
                        path: "",
                        query: {
                            grade: this.examInfo.grade,
                            academic: this.examInfo.academic,
                            examName: this.examInfo.examName,
                            examTime: this.examInfo.examTime,
                            subject: this.examInfo.subject
                        }
                    });
                }
            },
            // 下拉菜单切换跳转
            changeSelect(index) {
                this.changeactive = index;
                if (index == 0) {
                    this.$router.push({
                        path: "/eduBureau/achievementAnalysis",
                        query: {
                            grade: this.examInfo.grade,
                            academic: this.examInfo.academic,
                            examName: this.examInfo.examName,
                            examTime: this.examInfo.examTime,
                            subject: this.examInfo.subject
                        }
                    });
                }
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
            // 上线波动分析
            border_active(item, index) {
                this.tab_name = item;
                this.border_active_index = index;
            }
        }
    };
</script>

<style type="stylus" scoped>
.school-online-container {
   /* overflow: hidden; */
   margin: 0 auto;
   margin-bottom: 50px;
   height: 100%;
}
    .online_fluctuate {
        display: inline-block;
        margin-left: 30px;
    }

    .border_active {
        border: 1px solid #4B70FF !important;
        border-radius: 2px;
        color: #4B70FF;
    }

    .online_fluctuate span {
        display: inline-block;
        padding: 8px 20px 8px 20px;
        border: 1px solid #CCCCCC;
        cursor: pointer;
    }


    .bg_white {
        width: 744px;
        background-color: #ffffff;
        border-radius: 6px;
        margin-top: 20px;
        padding-bottom: 20px;
    }

    .echartsTitle {
        display: inline-block;
        margin-top: 20px;
        margin-left: 30px;
        font-size: 18px;
        color: #383B57;
    }

    .height_score_table {
        position: relative;
        width: 684px;
        height: 380px;
        border: 1px solid #A2AFCD;
        border-collapse: collapse;
        border-radius: 6px;
        margin: 20px 30px;
        text-align: center;
    }

    .height_score_table th, td {
        border: 1px solid #ECEFF5;
    }

    .height_score_table th {
        line-height: 50px;
    }

    /*--------------------------------*/
    .border_none {
        border: none !important;
    }

    .score_info {
        padding-bottom: 35px;
        display: flex;
        flex-wrap: wrap;
    }

    .score_info_list {
        width: 186px;
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

    .target-number {
        display: inline;
        font-size: 12px;
        color: #5F6D91;
        background: rgba(162, 175, 205, 0.2);
        border-radius: 100px;
        padding: 4px 10px;
        line-height: 17px;
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
        font-size: 16px;
        font-weight: 600;
        margin: 0px 26px 0 30px;
        border-bottom: 4px solid rgba(0, 0, 0, 0);
    }
    .subject_list_active {
        color: #4B70FF;
        border-bottom: 4px solid #4B70FF;
    }
    .info_list_first {
        width: 744px;
        /*height :247px;*/
        background-color: #ffffff;
        border-radius: 6px;
    }

    .exam_content {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .left_select_list {
        width: 176px;
        border-radius: 6px;
    }

    .score_analysis {
        border-radius: 6px;
    }

    .right_info_list {
        width: 744px;
        border-radius: 6px;
    }

    .score_analysis_first {
        cursor: pointer;
        height: 41px;
        background-color: #ffffff;
    }

    .score_analysis_first img {
        margin: 5px 12px 0px 16px;
    }

    .score_analysis_first span {
        display: inline-block;
        vertical-align: middle;
        margin-top: 3px;
        font-size: 16px;
        color: #383B57;
    }

    .score_analysis_two {
        margin-top: 5px;
        width: 176px;
        height: 41px;
        background-color: #ffffff;
        border-radius: 6px;
        cursor: pointer;
    }

    .score_analysis_two img {
        margin: 5px 12px 0px 16px;
    }

    .score_analysis_two span {
        display: inline-block;
        vertical-align: middle;
        margin-top: 3px;
        font-size: 16px;
        color: #383B57;
    }

    .option {
        width: 176px;
        height: 41px;
        text-align: center;
        line-height: 41px;
        background-color: #ffffff;
        cursor: pointer;
    }

    .active {
        background-color: #4B70FF;
        color: #ffffff;
    }

    .exam_content {
        width: 940px;
        margin: 20px auto;
        display: flex;
        justify-content: space-between;
    }

    .left_select_list {
        width: 176px;
        border-radius: 6px;
    }

    .score_analysis {
        border-radius: 6px;
    }

    .right_info_list {
        width: 744px;
        border-radius: 6px;
    }

    .score_analysis_first {
        cursor: pointer;
        height: 41px;
        background-color: #ffffff;
    }

    .score_analysis_first img {
        margin: 5px 12px 0px 16px;
    }

    .score_analysis_first span {
        display: inline-block;
        vertical-align: middle;
        margin-top: 3px;
        font-size: 16px;
        color: #383B57;
    }

    .score_analysis_two {
        margin-top: 5px;
        width: 176px;
        height: 41px;
        background-color: #ffffff;
        border-radius: 6px;
        cursor: pointer;
    }

    .score_analysis_two img {
        margin: 5px 12px 0px 16px;
    }

    .score_analysis_two span {
        display: inline-block;
        vertical-align: middle;
        margin-top: 3px;
        font-size: 16px;
        color: #383B57;
    }

    .titleBox {
        margin-bottom: 20px;
        margin-top: 14px;
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
.online_total_flow {
    margin: 14px 0 6px 30px;
    font-size: 14px;
    color: #383B57;
}

.info_list_four .height_score_table {
    margin-top: 0;
}
</style>
