<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <header-title @handleGetClassId='handleGetClassNameInfo'></header-title>
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
                                <p>班级均分</p>
                                <p>{{list.class_avg_score}}</p>
                                <p>年级均分{{list.grade_avg_score}}</p>
                            </li>
                            <li>
                                <p>班级最高分</p>
                                <p>{{list.class_max_score}}</p>
                            </li>
                            <li v-if='subjectsIndex != 0'>
                                <p>班级最低分</p>
                                <p>{{list.class_min_score}}</p>
                            </li>
                            <li>
                                <p>年级排名</p>
                                <p>{{list.grade_rank}}</p>
                            </li>
                            <li>
                                <p>上线率</p>
                                <p>{{list.major_online_rate}}</p>
                            </li>
                        </ul>
                        <p class='count'>本班参考人数：{{list.presence_number}}, 缺考人数 {{list.absence_number}}</p>
                    </div>
                    <!-- 全科均分统计 -->
                    <div class='average_count' v-show='subjectsIndex==0' id="classAnalysisTrend"  ref="classAnalysisTrend">
                        <div class='top'>
                            <span>全科均分统计</span>
                            <i></i>
                            <span>低于年级平均分</span>
                        </div>
                        <ul class='title'>
                            <li>学科</li>
                            <li>满分</li>
                            <li>班级均分</li>
                            <li>年级均分</li>
                            <li>年级名次</li>
                            <li>最高分</li>
                            <li>最低分</li>
                        </ul>
                        <ul class='content'
                            v-for='(item, index) of subject_score_info_list'
                            :key='index'
                        >
                            <li>{{item.subject_name}}</li>
                            <li>{{item.full_score}}</li>   
                            <li :class="[item.class_avg_score < item.grade_avg_score ? 'active' : '']">{{item.class_avg_score}}</li>  
                            <li>{{item.grade_avg_score}}</li> 
                            <li>{{item.grade_rank}}</li> 
                            <li>{{item.max_score}}</li> 
                            <li>{{item.min_score}}</li> 
                        </ul>
                        <!-- <ul class='all_count'>
                            <li>总分</li>
                            <li>700</li>
                            <li>700</li>
                            <li>700</li>
                            <li>700</li>
                            <li>700</li>
                            <li>700</li>
                        </ul> -->
                    </div>
                    <div class="echarts_box"  ref="classAnalysisCompair">
                        <score-echarts :childer_data=childer_data></score-echarts>
                    </div>
                    <div class="echarts_box"  ref="classAnalysisSubjectsCompair">
                        <!-- <score-echarts :childer_data=childer_data></score-echarts> -->
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
    import HeaderTitle from '@/components/headerTitle/'
    // import AnchorPublic from '@/components/anchor/anchor.vue'
    import LeftTitle from '@/pages/teacher/common/components/leftTitle'
    import ScoreEcharts from './echarts.vue'
    import Anchor from '@/components/anchor/anchor.vue';
    export default {
        name: "score",
        data () {
            return {
                 // 右側
                anchorActive: '',
                anchorTitle: '成绩总览',
                anchorList: [{
                        label: '全科均分统计',
                        value: 'classAnalysisTrend'
                    },
                    {
                        label: '分数分段统计',
                        value: 'classAnalysisCompair'
                    },
                    {
                        label: '排名分段统计',
                        value: 'classAnalysisSubjectsCompair'
                    },
                ],
                url_index: 1,                   //header下标
                // Height: null,                //左侧导航栏高度
                teacher: [],                    //登录session数据
                class_id: '',                   //班级id
                active: 0,
                list: [],                       //数据
                subjects: [],                   //科目列表
                subject_id: 0,                  //科目id
                session_subject_id: '',         //任课
                subjectsIndex: 0,               //科目选中
                anchorArr: ['全科均分统计', '分数分段统计', ],
                parentQuer: null,
                subject_score_info_list: [],    //全班均分统计数据
                childer_data: {                 //echarts数据
                    score_range_list: [],       //分段分数统计x
                    score_range_info_list: [],  //分段分数统计
                    rank_range_list: [],        //排名分段统计x
                    rank_range_info_list: [],   //排名分段统计
                } 
            }
        },
        components: {
            HeaderPublic,
            HeaderTitle,
            // AnchorPublic,
            LeftTitle,
            ScoreEcharts,
            Anchor
        },
        mounted () {
            this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
            this.class_id = this.teacher[0].class_id
            this.session_subject_id = this.teacher[0].subject_id
            this.parentQuer = this.$route.query
            //this.handleGetHeight()  //左侧导航栏高度
            this.handleGetSubjectsInfo() //查询科目列表
            this.handleGetScoreInfo() //老师-成绩总览
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

            if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 300) {
                this.anchorActive = 'classAnalysisCompair';
                return;
            }
        
            if (scrollY >= classAnalysisCompairHeight - 300 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
                this.anchorActive = 'classAnalysisSubjectsCompair';
                return;
            }

            this.anchorActive = '';

            });
        },
        methods: {
            // handleGetHeight () { //左侧导航栏高度
            //     let Height = document.querySelector('.right')
            //     this.Height =  Height.offsetHeight
            // },
            handleGetClassNameInfo (class_id) { //子组件传值-class_id 
               this.class_id = class_id
               this.handleGetScoreInfo()
            },
            handleGetSubjectsInfo () { //查询科目列表
                let batch_id = sessionStorage.getItem('batch_id')
                this.$http.get('/batch/' +batch_id+ '/batch_class_and_subject_info?debug=true', {})
                    .then(this.handleGetExamListInfoSucc.bind(this))
            },
            handleGetExamListInfoSucc (res) { //查询科目列表成功
                // console.log(res)
                if(res.data.code == 0) {
                    this.subjects = res.data.data.subject_info_list
                }
            },
            handleToggleScore (id, item) {  //切换科目
                this.subjectsIndex = id
                this.subject_id = item.subject_id
                this.handleGetScoreInfo()
            },
            handleGetScoreInfo () { //查询老师-成绩总览
                let batch_id = sessionStorage.getItem('batch_id')
                this.$http.get('/class/' + this.class_id + '/batch/' + batch_id + '/subject/' + this.subject_id + '/class_score_info?debug=true', {})
                    .then(this.handleGetScoreInfoSucc.bind(this))
            },
            handleGetScoreInfoSucc (res) { //查询老师-成绩总览成功
                 console.log(res)
                if(res.data.code == 0) {
                    this.list = res.data.data
                    this.subject_score_info_list = res.data.data.subject_score_info_list
                    this.childer_data.score_range_list = res.data.data.score_range_list
                    this.childer_data.score_range_info_list = res.data.data.score_range_info_list
                    this.childer_data.rank_range_list = res.data.data.rank_range_list
                    this.childer_data.rank_range_info_list = res.data.data.rank_range_info_list
                }
            }, 
            
        },

    };
</script>


<style lang='stylus' scoped>
    @import url('../common/css/allCourse.css');
    @import url('../common/css/someCourse.css');
    .main
        margin: 20px auto 0
        width: 940px
        .right
            float: right
            width: 744px
        .echarts_box
            width 744px
            background-color #F2F4F6

</style>
