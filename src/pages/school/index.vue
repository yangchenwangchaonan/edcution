<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class="container">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-white el-nav-edu">
                        <div class="exam_list_infos">
                            <label>学年</label>
                            <span v-for="(item,index) in examYear" :key="index" :class="{ active:examYearActive == index }"
                                  :data-id="index" @click="examYearChange(index)">{{item}}</span>
                        </div>
                        <div class="exam_list_infos">
                            <label>年级</label>
                            <span v-for="(item,index) in examGrade" :key="index" :class="{ active:examGradeActive == index }"
                                  :data-id="index" @click="examGradeChange(index)">{{item}}</span>
                        </div>
                        <div class="exam_list_infos">
                            <label>考试</label>
                            <span v-for="(item,index) in examInfo" :key="index" :class="{ active:examInfoActive == index }"
                                  :data-id="index" @click="examInfoChange(index)">{{item}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div v-for="(exam,index) in examList" :key="index" style="height: 120px;" class="exam_lists">
                <el-col :span="24">
                    <div class="grid-content bg-purple-white el-list-edu">
                        <el-col class="exam_left" :span="18">
                            <div class="exam_title">
                                <span class="grid-content exam_name">{{exam.examName}}</span>
                            </div>
                            <div class="exam_time">
                                <el-col :span="8">
                                    <img src="@/assets/images/ic_time.png" alt="" class="exam_time_img"><span
                                        style="margin-left: 4px">考试时间：</span><span>{{exam.examTime}}</span>
                                </el-col>
                                <el-col :span="8" style="margin-left: 15px;">
                                    <img src="@/assets/images/ic_xueke.png" alt="" class="exam_time_img"><span
                                        style="margin-left: 4px">考试学科：</span><span>{{exam.subject}}</span>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col class="exam_right" :span="6">
                            <a @click="goToExamInfo(exam)" style="cursor: pointer">
                                <div class="el-btn-info" :data-id="index" :data-info="exam.examName">查看详细分析报告</div>
                            </a>
                        </el-col>
                    </div>
                </el-col>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header";

    export default {
        name: "index",
        components: {
            HeaderPublic
        },
        data() {
            return {
                url_index: 1,   //header下标
                examList: [
                    {
                        grade: "高二",
                        academic: "理科",
                        examName: "2018年-2019学年一年级期中考试",
                        examTime: "2018-09-12",
                        subject: "全学科"
                    },
                    {
                        grade: "高二",
                        academic: "理科",
                        examName: "2018年-2019学年一年级期中考试",
                        examTime: "2018-09-12",
                        subject: "全学科"
                    },
                    {
                        grade: "高三",
                        academic: "理科",
                        examName: "2018年-2019学年一年级期中考试",
                        examTime: "2018-09-12",
                        subject: "全学科"
                    },
                    {
                        grade: "高二",
                        academic: "理科",
                        examName: "2018年-2019学年一年级期中考试",
                        examTime: "2018-09-12",
                        subject: "全学科"
                    },
                ],
                examYear: ["2016-2017学年", "2017-2018学年", "2018-2019学年"],
                examGrade: ["全部年级", "高二", "高三"],
                examInfo: ["全部考试", "周考", "月考", "期中", "期末", "会考"],
                examYearActive: 0,
                examGradeActive: 0,
                examInfoActive: 0,
            }
        },
        created() {

        },
        mounted() {
            this.get_exam_list();
        },
        methods: {
            // 考试列表
            get_exam_list() {
                let termYear = 2017, grade = 11, examCategory = 0;
                let schoolId = sessionStorage.getItem('school_id');
                console.log(schoolId);
                // /schoolId/3422000093/termYear/2017/grade/11/examCategory/0/exam_list?debug=true 
                this.axios.get('/schoolId/' + schoolId + '/termYear/' + termYear + '/grade/' + grade + '/examCategory/' + examCategory + '/exam_list?debug=true')
                    .then(function (response) {
                        console.log(response.data);
                        // value the exam list
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            goToExamInfo(res) {
                this.$router.push({
                    path: "/school/generalPandect",
                    query: {
                        grade: res.grade,
                        academic: res.academic,
                        examName: res.examName,
                        examTime: res.examTime,
                        subject: res.subject
                    }
                });
            },
            examYearChange(index) {
                this.examYearActive = index;
            },
            examGradeChange(index) {
                this.examGradeActive = index;
            },
            examInfoChange(index) {
                this.examInfoActive = index;
            }
        }
    };
</script>

<style type="stylus" scoped>
    .active {
        background-color: #4B70FF;
        color: #ffffff;
    }

    .el-nav-edu {
        line-height: 30px;
        padding: 8px;
    }

    .exam_list_infos {
        position: relative;
        margin-top: 12px;
    }

    .exam_list_infos label {
        margin-left: 20px;
        margin-right: 20px;
        color: #A2AFCD;
    }

    .exam_list_infos > span {
        display: inline-block;
        margin-right: 15px;
        padding: 0 6px 0 6px;
        cursor: pointer;
    }
        .exam_lists{
            width :940px;
            margin: 14px auto;
        }

    .el-row {
        width :940px;
        margin: 14px auto;
        &:last-child {
            margin-bottom: 0;
        }
    }

    .exam_title {
        padding: 20px 15px;
    }

    button {
        border: 1px solid #4B70FF;
        border-radius: 4px;
    }

    button > span {
        display: inline-block;
        color: #4B70FF;
        padding: 6px 10px !important;

    }

    .exam_time {
        padding: 10px 20px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #A2AFCD;

    }

    .exam_time_img {
        display: inline-block;
        vertical-align: middle;
        margin-top: -3px;
    }

    .exam_name {
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #383B57;
        display: inline-block;
        line-height: 26px;
        margin-left: 10px;
    }

    .el-btn-info {
        width: 150px;
        height: 40px;
        background: #4B70FF;
        box-shadow: 0 16px 10px -12px rgba(255, 137, 55, 0.20);
        border-radius: 100px;
        line-height: 40px;
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #FFFFFF;
    }

    .exam_right {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

    .el-col {
        border-radius: 4px;
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

    .el-nav-edu {
        height: 140px;
    }

    .el-list-edu {
        min-height: 120px;
        background-image: url('../../assets/images/list_bg.png');
        background-repeat: no-repeat;
        background-size: 100%;
    }
</style>
