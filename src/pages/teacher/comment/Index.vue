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
                    </div>
                    <!-- 右侧题号 -->
                    <answer :count_arr=count_arr></answer> 
                    <div v-for='(item, index) of list'
                        :key='index'
                    >
                        <div class="knowledge" :style="{overflow: 'hidden'}">
                            <p>题型：{{item.qst_type_str}} | 知识点：{{item.knowledge_desc}}</p>
                            <p>难度：{{item.difficult}} | 区分度：{{item.discrimination}}</p>
                            <img v-for='(item2, index) of item.qst_url_list'
                                :key='index'
                                :src="item2" 
                                alt=""
                            >
                        </div>
                        <score-echarts :item=item></score-echarts>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header";
    import HeaderTitle from '@/components/headerTitle'
    import LeftTitle from '@/pages/teacher/common/components/leftTitle'
    import ScoreEcharts from './echarts.vue'
    import Answer from './Answer.vue'

    export default {
        name: "comment",
        data() {
            return {
                url_index: 1,                   //header下标
                active: 3,
                teacher: [],                    //登录session数据
                class_id: '', 
                list: [],                       //数据
                subjects: [],                   //科目列表
                subject_id: 0,                  //科目id
                subjectsIndex: 0,               //科目选中
                session_subject_id: '',         //任课
                count_arr: [],                  //右侧题号
                
            }
        },
        components: {
            HeaderPublic,
            LeftTitle,
            HeaderTitle,
            ScoreEcharts,
            Answer
        },
        mounted () {
            this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
            this.class_id = this.teacher[0].class_id
            this.session_subject_id = this.teacher[0].subject_id
            this.handleGetSubjectsInfo() //查询科目列表
            this.handleGetClassQuestionInfo() //教师-试卷讲评
        },
        methods: {
            handleGetClassNameInfo (class_id) { //子组件传值-class_id 
               this.class_id = class_id
               this.handleGetClassQuestionInfo()
            },
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
                this.handleGetClassQuestionInfo()
            },
            handleGetClassQuestionInfo () { //教师-试卷讲评
                let batch_id = sessionStorage.getItem('batch_id')
                this.$http.get('/class/' + this.class_id + '/batch/' + batch_id + '/subject/' + this.subject_id + '/class_question_list?debug=true', {})
                    .then(this.handleGetClassQuestionInfoSucc.bind(this))
            },
            handleGetClassQuestionInfoSucc (res) { //教师-试卷讲评-获取成功
                if(res.data.code == 0) {
                    console.log(res)
                    let data = res.data.data
                    this.list = data.qst_info_list
                    this.count_arr = []   //右侧题号
                    for(let item of this.list) {
                        this.count_arr.push({count: item.qst_no, type: item.difficult_enum})
                    }
                }
            }
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
</style>
