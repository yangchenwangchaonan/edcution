<!--用户: Mr.wang     日期:2018/12/11    时间:10:20-->
<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class="container">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-white el-nav-edu">
                        <div class="exam_list_infos">
                            <label>学年</label>
                            <span v-for="(item, index) in examYear" :class="{ active:examYearActive == index }"
                                  :data-id="index" @click="examYearChange(index)">{{item.name}}</span>
                        </div>
                        <div class="exam_list_infos">
                            <label>年级</label>
                            <span v-for="(item,index) in examGrade" :class="{ active:examGradeActive == index }"
                                  :data-id="index" @click="examGradeChange(index)">{{item.name}}</span>
                        </div>
                        <div class="exam_list_infos">
                            <label>考试</label>
                            <span v-for="(item,index) in examInfo" :class="{ active:examInfoActive == index }"
                                  :data-id="index" @click="examInfoChange(index)">{{item.name}}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div v-for="(exam,index) in examList" class="listCon">
                <el-col :span="24">
                    <div class="grid-content bg-purple-white el-list-edu">
                        <el-col class="exam_left" :span="18">
                            <div class="exam_title">
                                <button><span>{{exam.grade_and_type}}</span></button>
                                <span class="grid-content exam_name">{{exam.batch_name}}</span>
                            </div>
                            <div class="exam_time">
                                <el-col :span="9">
                                    <img src="@/assets/images/ic_time.png" alt="" class="exam_time_img"><span
                                        style="margin-left: 4px">考试时间：</span><span>{{exam.exam_date}}</span>
                                </el-col>
                                <el-col :span="9" style="margin-left: 15px;">
                                    <img src="@/assets/images/ic_xueke.png" alt="" class="exam_time_img"><span
                                        style="margin-left: 4px">考试学科：</span><span>{{exam.subjects}}</span>
                                </el-col>
                            </div>
                        </el-col>
                        <el-col class="exam_right" :span="6">
                            <a @click="goToExamInfo(exam)" style="cursor: pointer">
                                <div class="el-btn-info" :data-id="index" :data-info="exam.batch_name">查看详细分析报告</div>
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
                examYear: [{"name": "2016-2017学年", "year": 2016}, {"name": "2017-2018学年", "year": 2017}, {"name": "2018-2019学年", "year": 2018}],
                examGrade: [{"name":"全部年级", "grade":0}, {"name":"高二", "grade": 11}, {"name": "高三", "grade": 12}],
                examInfo: [{"name": "全部考试", "type": 0}, {"name":"周考", "type":1},{"name": "月考", "type":2}, {"name":"期中", "type":3}, {"name":"期末", "type": 4}, {"name":"会考", "type": 5}],
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
                // TODO: get from cookies / sessions
                 let district_id = 0;

                 let grade_begin_year = this.examYear[this.examYearActive].year;
                 let k12_grade = this.examGrade[this.examGradeActive].grade;
                 let exam_type = this.examInfo[this.examInfoActive].type;

                 var that = this;
                 this.axios.get('/district/' + district_id + '/exam_list?debug=true&term_year=' + grade_begin_year + '&grade=' + k12_grade + '&exam_category=' + exam_type)
                     .then(function (response) {
                         console.log(response.data.data);
                         that.examList = response.data.data;
                     })
                     .catch(function (error) {
                         console.log(error);
                     })
             },
            goToExamInfo(res) {
                console.log(res);
                this.$router.push({
                    path: "/eduBureau/achievementAnalysis/generalPandect",
                    query: {
                        changeactive:0,
                        grade: res.grade,
                        batch_name: res.batch_name,
                        grade_and_type: res.grade_and_type,
                        batch_id:res.batch_id,
                        district_id:res.district_id
                    }
                });
            },
            examYearChange(index) {
                this.examYearActive = index;
                this.get_exam_list();
            },
            examGradeChange(index) {
                this.examGradeActive = index;
                this.get_exam_list();
            },
            examInfoChange(index) {
                this.examInfoActive = index;
                this.get_exam_list();
            }
        }
    };
</script>

<style type="stylus" scoped>
    .listCon{
        width :940px;
        margin:14px auto;
    }
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

    .el-row {
        width: 940px;
        margin-bottom: 20px;
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
        padding: 10px 15px;
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
