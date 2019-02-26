<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <header-title :header_title=header_title></header-title>
            <div class='main'>
                <left-title :active="active"></left-title>
                <div class='right'>
                    <div class='course'>
                        <ul class='nav'>
                            <li v-for='(item, id) of subjects'
                                :key='id' 
                                :class='{active:id == subjectsIndex}'
                                @click='handleToggleScore(id, item)'
                            >
                                {{item.subject_name}}
                                <span v-if='item.subject_id == session_subject_id'>任课</span>
                            </li>
                        </ul>
                        <ul class='content'>
                            <li>
                                <p>一本分数线</p>
                                <p>{{list.major_score}}</p>
                            </li>
                            <li>
                                <p>上线人数</p>
                                <p>{{list.major_online_num}}</p>
                            </li>
                            <li>
                                <p>上线率</p>
                                <p>{{list.major_online_rate}}</p>
                            </li>
                            <li>
                                <p>目标完成率</p>
                                <p>{{list.major_task_completion_rat}}</p>
                                <p>目标上线人数{{list.major_task_online_num}}</p>
                            </li>
                            <li v-show='subjectsIndex != 0'>
                                <p>双上线人数</p>
                                <p>{{list.major_double_online_num}}</p>
                            </li>
                            <li v-show='subjectsIndex != 0'>
                                <p>双上线率</p>
                                <p>{{list.major_double_online_rate}}</p>
                            </li>
                            
                        </ul>
                        <p class='count'>本班参考人数: 50, 缺考人数0</p>
                    </div>
                    <!-- 上线情况 -->
                    <div class='pass_rate'  id="classAnalysisTrend" ref="classAnalysisTrend">
                        <div class='top1'>
                            <span>上线情况</span>
                        </div>
                        <div class='main'>
                            <ul class='title'>
                                <li>姓名</li>
                                <li>总分</li>
                                <li>班级排名</li>
                                <li>年级排名</li>
                                <li>未上线科目</li>
                            </ul>
                            <ul class='content' 
                                v-for='(item, index) of major_online_info_list'
                                :key='index'
                            >
                                <li>{{item.student_name}}</li>
                                <li>{{item.score}}</li>
                                <li>{{item.class_rank}}</li>
                                <li>{{item.grade_rank}}</li>
                                <li>{{item.weak_knowledge_desc}}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 上线率趋势 -->
                    <score-echarts :childer_data=childer_data id="classAnalysisCompair" ref="classAnalysisCompair"></score-echarts>
                    <!-- 上线波动分析 -->
                    <div class='pass_rate'>
                        <div class='top2' >
                            <div class='title_nav' id="classAnalysisSubjectsCompair" ref="classAnalysisSubjectsCompair">
                                <span class='title'>上线波动分析</span>
                                <ul>
                                    <li v-for='(item, id) of passNav'
                                        :key='id'
                                        :class='{active:id == passIndex}'
                                        @click='handleTogglePassFluctuate(id)'
                                    >
                                        {{item}}
                                    </li>
                                </ul>
                            </div>
                            <p>相比上次考试本次考试新上线为流入；上次上线本次未上线为流出；本学期第一次上线为新增上线；本学期未流出为稳定上线。</p>
                        </div>
                        <div class='main'>
                            <ul class='title'>
                                <li>姓名</li>
                                <li>总分</li>
                                <li>班级排名</li>
                                <li>年级排名</li>
                                <li>薄弱知识点</li>
                            </ul>
                            <ul class='content'
                                v-for='(item, index) of inflow_major_online_info_list'
                                :key='index'
                            >
                                <li>{{item.student_name}}</li>
                                <li>{{item.score}}</li>
                                <li>{{item.class_rank}}</li>
                                <li>{{item.grade_rank}}</li>
                                <li>{{item.weak_knowledge_desc}}</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 踩线生分析 -->
                    <div class='pass_rate' >
                        <div class='top2' id="classAnalysisWeakPoint" ref="classAnalysisWeakPoint">
                            <div class='title_nav'>
                                <span class='title'>踩线生分析</span>
                                <ul>
                                    <li v-for='(item, id) of footfaultNav'
                                        :key='id'
                                        :class='{active:id == footfaultIndex}'
                                        @click='handleToggleFootfaultAnalysis(id)'
                                    >
                                        {{item}}
                                    </li>
                                </ul>
                            </div>
                            <p>在一本线附近的学生具有稳定上线的潜力，可以关注他们的薄弱学科。</p>
                        </div>
                        <div class='main main2'>
                            <ul class='title'>
                                <li>姓名</li>
                                <li>总分</li>
                                <li>班级排名</li>
                                <li>年级排名</li>
                                <li>薄弱知识点</li>
                            </ul>
                            <ul class='content'
                                v-for='(item, index) of up_major_online_info_list'
                                :key='index'
                            >
                                <li>{{item.student_name}}</li>
                                <li>{{item.score}}</li>
                                <li>{{item.class_rank}}</li>
                                <li>{{item.grade_rank}}</li>
                                <li>{{item.weak_knowledge_desc}}</li>
                            </ul>
                        </div>
                        <p class='common'>
                            <span>共同薄弱知识点：</span>
                            <span>{{up_weak_knowledge_desc}}</span>
                        </p>
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
    import HeaderPublic from "@/components/header"
    import HeaderTitle from '@/components/headerTitle'
    import LeftTitle from '@/pages/teacher/common/components/leftTitle'
    import ScoreEcharts from './echarts.vue'
     import Anchor from '@/components/anchor/anchor.vue';
    export default {
        name: "passRate",
        data () {
            return {
                    // 右側
                anchorActive: '',
                anchorTitle: '上线分析',
                anchorList: [{
                        label: '上线情况',
                        value: 'classAnalysisTrend'
                    },
                    {
                        label: '上线率趋势',
                        value: 'classAnalysisCompair'
                    },
                    {
                        label: '上线波动分析',
                        value: 'classAnalysisSubjectsCompair'
                    },
                    {
                        label: '踩线生分析',
                        value: 'classAnalysisWeakPoint'
                    },    
                ],
                url_index: 1,       //header下标
                header_title: 0,                //右侧班级隐藏
                active: 1,          //跳转页面
                teacher: [],        //登录session数据
                class_id: [],
                batch_id: 0,        //
                list: [],           //数据
                subjects: [],       //科目列表
                subject_id: 0,      //科目id
                subjectsIndex: 0,   //科目选中
                session_subject_id: '',         //任课
                major_online_info_list: [],//上线情况
                inflow_major_online_info_list: [],//上线波动分析
                passIndex: 0,       //上线波动分析
                passNav: [],        //上线波动分析标题
                up_major_online_info_list: [],   //踩线生分析
                footfaultIndex: 0,  //踩线生分析
                footfaultNav: [],
                up_weak_knowledge_desc: '',   //踩线生分析薄弱点
                childer_data: {       //echarts数据
                    exam_batch_list: [],   //上线率趋势x轴
                    class_major_online_rate_list: []  //上线率趋势
                } 
            }
        },
        components: {
            HeaderPublic,
            HeaderTitle,
            LeftTitle,
            ScoreEcharts,
            Anchor
        },
        mounted () {
            this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
            this.class_id = this.teacher[0].class_id
            this.session_subject_id = this.teacher[0].subject_id
            this.handleGetSubjectsInfo() //查询科目列表
            this.handleGetFormalInfo() //老师-上线分析
                const $classAnalysisTrend = this.$refs.classAnalysisTrend;
                const $classAnalysisCompair = this.$refs.classAnalysisCompair;
                const $classAnalysisSubjectsCompair = this.$refs.classAnalysisSubjectsCompair;
                const $classAnalysisWeakPoint = this.$refs.classAnalysisWeakPoint;
            window.addEventListener('scroll', e => {
                const scrollY = window.scrollY;
                const winHeight = window.innerHeight;
                const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
                const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;
                const classAnalysisSubjectsCompairHeight = $classAnalysisSubjectsCompair.offsetTop + $classAnalysisSubjectsCompair.offsetHeight;
                const classAnalysisWeakPointHeight = $classAnalysisWeakPoint.offsetTop + $classAnalysisWeakPoint.offsetHeight;

            if (scrollY >= $classAnalysisTrend.offsetTop - 200 && scrollY < classAnalysisTrendHeight - 300) {
                this.anchorActive = 'classAnalysisTrend';
                return;
            }

            if (scrollY >= classAnalysisTrendHeight - 300 && scrollY < classAnalysisCompairHeight - 200) {
                this.anchorActive = 'classAnalysisCompair';
                return;
            }

            if (scrollY >= classAnalysisCompairHeight - 200 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
                this.anchorActive = 'classAnalysisSubjectsCompair';
                return;
            }

            if (scrollY >= classAnalysisSubjectsCompairHeight - 500) {
                this.anchorActive = 'classAnalysisWeakPoint';
                return;
            }

            this.anchorActive = '';

            });
        },
        methods: {
            handleGetSubjectsInfo () { //查询科目列表
                let batch_id = sessionStorage.getItem('batch_id')
                this.$http.get('/batch/' +batch_id+ '/batch_class_and_subject_info?debug=true', {})
                    .then(this.handleGetExamListInfoSucc.bind(this))
            },
            handleGetExamListInfoSucc (res) { //查询科目列表成功
                if(res.data.code == 0) {
                    this.subjects = res.data.data.subject_info_list
                }
            },
            handleToggleScore (id, item) {  //切换科目
                this.subjectsIndex = id
                this.subject_id = item.subject_id
                this.handleGetFormalInfo()
            },
            handleGetFormalInfo () {  //老师-上线分析
                let batch_id = sessionStorage.getItem('batch_id')
                let subject_id = this.subject_id
                this.$http.get('/class/' + this.class_id + '/batch/' + batch_id + '/subject/' + subject_id + '/class_major_score_info?debug=true', {})
                    .then(this.handleGetFormalInfoSucc.bind(this))
            },
            handleGetFormalInfoSucc (res) {
                if(res.data.code == 0) {
                    this.list = res.data.data
                    console.log(111,res.data.data )
                    this.major_online_info_list = res.data.data.major_online_info_list
                    this.inflow_major_online_info_list = res.data.data.inflow_major_online_info_list
                    this.up_major_online_info_list = res.data.data.up_major_online_info_list
                    this.passNav = res.data.data.major_flow_title_list
                    this.footfaultNav = res.data.data.major_threshold_title_list  
                    this.childer_data.exam_batch_list = res.data.data.exam_batch_list
                    this.childer_data.class_major_online_rate_list = res.data.data.class_major_online_rate_list
                }
            },
            handleTogglePassFluctuate (id) { //上线波动分析切换
                this.passIndex = id
                if(id == 0) {
                    this.inflow_major_online_info_list = this.list.inflow_major_online_info_list
                }
                if(id == 1) {
                    this.inflow_major_online_info_list = this.list.outflow_major_online_info_list	
                }
                if(id == 2) {
                    this.inflow_major_online_info_list = this.list.new_major_online_info_list
                }
                if(id == 3) {
                    this.inflow_major_online_info_list = this.list.stable_major_online_info_list
                }
            },
            handleToggleFootfaultAnalysis (id) { //踩线生分析切换
                this.footfaultIndex = id
                if(id == 0) {
                    this.up_major_online_info_list = this.list.up_major_online_info_list
                    this.up_weak_knowledge_desc = this.list.up_weak_knowledge_desc
                }
                if(id == 1) {
                    this.up_major_online_info_list = this.list.down_major_online_info_list
                    this.up_weak_knowledge_desc = this.list.down_weak_knowledge_desc
                }
            }
        }
    };
</script>


<style lang='stylus' scoped>
    @import url('../common/css/allCourse.css');
    @import url('../common/css/passRate.css');
    .main
        overflow: hidden
        margin: 20px auto 0
        width: 940px
        .right
            overflow: hidden
            float: right
            width: 744px
</style>

