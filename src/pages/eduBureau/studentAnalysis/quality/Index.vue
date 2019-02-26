<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <header-title></header-title>
            <div class='main'>
                <left-title :active="active"></left-title>
                <div class='right'>
                    <div class='course'>
                        <ul class='nav'>
                            <li v-for='(item, id) of nav'
                                :key='id' @click='handleToggleScore(id,item.subject_id)'
                                :class='{active:id == navIndex}'
                                 v-if="id!=0"
                            >
                                {{item.subject_name}}
                            </li>
                        </ul>
                    </div>
                    <div class="edu_knowledge">
                        <div class="edu_tab">
                            <h1>知识点选择</h1>
                            <ul class='left_nav'>
                                <li v-for='(item, id) of leftNav'
                                    :key='id' @click='handleKnowledge(id,item.knowledge_id)'
                                    :class='{active1:id == leftNavIndex}'
                                >
                                    {{item.knowledge_name}}
                                </li>
                            </ul>
                        </div>
                        <div class="edu_info">
                            <h2>知识点：{{knowledge_detail.knowledge_name}}</h2>
                            <div>
                                <p>题型：选择题 | 考察次数：<span>{{exam_count}}</span> | 分值占比：<span>{{score_rate}}</span>% </p>
                                <div v-for="(item,index) of question_list" :key="index">
                                    <div class="edu_answer"><span>{{index+1}}</span>试题来源：{{item.question_src}}</div>
                                    <div class="edu_test"><img :src="item.question_detail" v-if="item.question_detail!=''"/><p v-if="item.question_detail==''">暂无截图</p></div>
                                </div>
                                <!-- <div>
                                    <div class="edu_answer"><span>2</span>试题来源：2018-2019学年上学期期中考试</div>
                                    <div class="edu_test">这里是试题截图</div>
                                </div> -->
                            </div>
                            <div>
                                <p>题型：选择题 | 考察次数：<span>{{exam_count1}}</span> | 分值占比：<span>{{score_rate1}}</span>% </p>
                                <div v-for="(item,index) of question_list1" :key="index">
                                    <div class="edu_test"><img :src="item.question_detail" v-if="item.question_detail!=''"/><p v-if="item.question_detail==''">暂无截图</p></div>
                                </div>
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
    import HeaderTitle from '@/components/headerTitle'
    import LeftTitle from '../common/components/leftTitle'
    export default {
        name: "comment",
        data() {
            return {
                 //header下标
                url_index: 2,
                // 最左侧 下标  
                active: 3,
                // 导航索引
                navIndex: 1,
                nav: [],
                // 学科ID
                subject_id:"",
                // 侧边栏索引
                leftNavIndex: 0,
                // 左侧导航栏
                leftNav: [],
                // 知识点id
                knowledge_id:"",
                 //知识点数据
                knowledge_detail:"",
                exam_count:"",
                exam_count1:"",
                score_rate:"",
                score_rate1:"",
                question_list:[],
                question_list1:[],
            }
        },
        components: {
            HeaderPublic,
            HeaderTitle,
            LeftTitle
        },
        mounted () {
            this.handleSubjectList()
        },
        methods: {
            //切换科目
            handleToggleScore(id,subject_id) {  
                this.navIndex = id
                this.subject_id = subject_id
                this.handleStudyList()
            },
            //切换左边栏
             handleKnowledge(id,knowledge_id) {  
                this.leftNavIndex = id
                this.knowledge_id=knowledge_id
                this.handleKnowledgeInfo()
            },
             // 渲染学科列表
            handleSubjectList(){
                 let education = JSON.parse(sessionStorage.getItem('education'))
                let district_id = education[0].district
				this.axios.get('/study_analyze/district/'+district_id+'/subject_list?debug=true',{
                    params:{
                        term_year:2018,
                        grade:12,
                        term:1,
                        art_sci:2,
                    }
                })
                .then((res)=> {
                    if (res.data.code==0) {
                        this.nav=res.data.data
                        // 首次 进入 默认this.subject_id
                        this.subject_id = res.data.data[this.navIndex].subject_id
                        this.handleStudyList()
                    }
                })
                .catch((err)=> {
                    console.log(err);
                })
            },
            // 渲染知识点列表
            handleStudyList () {
                let education = JSON.parse(sessionStorage.getItem('education'))
                let district_id = education[0].district
				this.axios.get('/study_analyze/district/'+district_id+'/subject/'+this.subject_id+'/knowledge/list?debug=true',{
                    params:{
                        term_year: 2018,
                        grade:12,
                        term:1,
                        art_sci:2,
                    }
                })
                .then((res)=> {
                    if (res.data.code==0) {
                        console.log(res)
                        // 侧边栏数据
                        this.leftNav=res.data.data.knowledge_list
                        // 首次  进入 默认this.knowledge_id
                        this.knowledge_id = res.data.data.knowledge_list[this.leftNavIndex].knowledge_id
                        this.handleKnowledgeInfo()
                    }
                })
                .catch((err)=> {
                    console.log(err);
                })
            },
             // 渲染知识点详情
            handleKnowledgeInfo () {
              
                // let district_id = sessionStorage.getItem('')
                let education = JSON.parse(sessionStorage.getItem('education'))
                let district_id = education[0].district
				this.axios.get('/study_analyze/district/'+district_id+'/subject/'+this.subject_id+'/knowledge/'+this.knowledge_id+'/detail?debug=true',{
                    params:{
                        term_year: 2018,
                        grade:12,
                        term:1,
                        art_sci:2,
                    }
                })
                .then((res)=> {
                    console.log(res)
                    if (res.data.code==0) {
                        console.log(this.knowledge_detail)
                        //知识点数据
                        this.knowledge_detail=res.data.data
                        let data = res.data.data 
                        this.exam_count = data.objective_question_info.exam_count
                        this.exam_count1 = data.subjective_question_info.exam_count
                        this.score_rate = data.objective_question_info.score_rate
                        this.score_rate1 = data.subjective_question_info.score_rate
                        this.question_list = data.objective_question_info.question_list
                        this.question_list1 = data.subjective_question_info.question_list
                    }
                })
                .catch((err)=> {
                    console.log(err);
                })
            },
        }
    };
</script>


<style lang="stylus" scoped>
    @import url('../common/css/allCourse.css');
    @import url('../common/css/someCourse.css');
    .main
        overflow: hidden
        margin: 20px auto 0
        width: 940px
        
        .right
            overflow: hidden
            float: right
            width: 744px
            background #fff;
            height 100%
            padding-bottom 30px
            .knowledge
                width 524px
                height 352px
                margin-top 14px
                background #FFFFFF
                box-shadow 0 0 4px 0 #E9E9F2
                border-radius 6px
                padding-top 20px
                padding-left 30px
                p
                    line-height 22px
                    font-size 16px
                    color #383B57
                    font-weight bold
            .edu_knowledge
                width 744px
                // height 1011px
                background #fff
                margin-top 14px
                .edu_tab
                    float left
                    margin-right 32px
                    h1
                        padding-top 32px
                        margin-left 18px
                        font-size 16px
                        color #383B57
                        font-weight bold
                    .left_nav
                        width 176px
                        // height 903px
                        border 1px solid rgba(162,175,205,0.20)
                        margin-left 18px
                        margin-top 11px
                        padding-top 18px
                        li
                            width 176px
                            height 45px
                            line-height 45px
                            padding-left 25px
                            cursor pointer
                        .active1
                            width 152px
                            height 45px
                            border-left 3.6px solid #3388FF
                            padding-left 21.4px
                            background #F6F7FB
                            color #3388FF
                            font-weight bold
                .edu_info
                    float left
                    padding-top 30px
                    h2
                      font-size 18px
                      color #383B57
                      font-weight bold
                    p
                        margin-top 20px
                        font-size 14px
                        color #5F6D91
                        span
                            font-size 16px
                            color #3388FF
                    .edu_answer
                        margin-top 20px
                        font-size 13px
                        color #5F6D91
                        span
                            display inline-block
                            width 24px
                            font-size 14px
                            color #383B57
                            height 24px
                            background #F6F7FB
                            line-height 24px
                            text-align center
                            margin-right 9px
                    .edu_test
                        display inline-block
                        width 488px
                        height 243px
                        font-size 12px 
                        color #A2AFCD
                        letter-spacing 1px
                        background #F2F4F6
                        margin-top 13px
                        line-height 243px
                        text-align center
</style>

