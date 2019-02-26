<template>
    <div>
        <header-public :url_index=url_index></header-public>
        <div class='container'>
            <header-title></header-title>
            <div class='main'>
                <left-nav :active="active"></left-nav>
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
                        <ul class='course_main'>
                            <li>
                                <p class="title">备课参考：班级薄弱知识点</p>
                                <p class="text">在历次考试所考察的知识点中，得分率低于50%的知识点为班级薄弱知识点。</p>
                            </li>
                            <li>
                                <p class="title">累计薄弱知识点</p>
                                <p class="text">{{list.weak_knowledge_cnt}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="cbox">
                        <!-- 提高 -->
                        <div class="item" >
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">提高</span>
                                    <span class="cright"><i>{{improve_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">最近一次考试，以下知识点的掌握提高了，请继续保持。</div>
                            </div>
                            <table class="list-table">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) of (is_show1 == false ? improve_knowledge_list : improve_knowledge_list_all)"
                                    :key='index'>
                                    <td><span class="desc">{{item.knowledge_name}}</span></td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{parseInt(item.class_score_rate)}}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore1">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        <!-- 变差 -->
                        <div class="item">
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">变差</span>
                                    <span class="cright"><i>{{poor_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">最近一次考试，以下知识点掌握不如从前，请老师关注。</div>
                            </div>
                            <table class="list-table">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody ref="tbody_height" :style="{width:tbody_height+ 'px'}">
                                <tr v-for='(item, index) of (is_show2 == false ? poor_knowledge_list : poor_knowledge_list_all)'
                                    :key='index'
                                >
                                    <td>
                                        <span class="desc">{{item.knowledge_name}}</span>
                                    </td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{parseInt(item.class_score_rate)}}%
                                            </span>
                                            <span class="rank orange">
                                                <img v-if='item.class_score_rate_diff < 0' :src="require('@/assets/images/ic_arrow_orange.png')" alt="">
                                                <img v-if='item.class_score_rate_diff > 0' :src="require('@/assets/images/ic_arrow_blue.png')" alt="">
                                                <i :class="item.class_score_rate_diff > 0 ? 'plus' : ''">{{parseInt(Math.abs(item.class_score_rate_diff))}}</i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore2">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        <!-- 新增 -->
                        <div class="item">
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">新增</span>
                                    <span class="cright"><i>{{new_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">最近一次考试，班级新增薄弱知识点，可以趁早复习。</div>
                            </div>
                            <table class="list-table">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) of (is_show3 == false ? new_knowledge_list : new_knowledge_list_all)'
                                    :key='index'
                                >
                                    <td><span class="desc">{{item.knowledge_name}}</span></td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{parseInt(item.class_score_rate)}}%
                                            </span>
                                            <span class="rank orange">
                                                <img v-if='item.class_score_rate_diff < 0' :src="require('@/assets/images/ic_arrow_orange.png')" alt="">
                                                <img v-if='item.class_score_rate_diff > 0' :src="require('@/assets/images/ic_arrow_blue.png')" alt="">
                                                <i :class="item.class_score_rate_diff > 0 ? 'plus' : ''">{{parseInt(Math.abs(item.class_score_rate_diff))}}</i>
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore3">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        <!-- 低于年级水平 -->
                        <div class="item">
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">低于年级水平</span>
                                    <span class="cright"><i>{{lower_grade_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">请老师关注</div>
                            </div>
                            <table class="list-table list-table2">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 238px;">年级得分率</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody ref="tbody_height" :style="{width:tbody_height+ 'px'}">
                                <tr v-for='(item, index) of (is_show4 == false ? lower_grade_knowledge_list : lower_grade_knowledge_list_all)'
                                    :key='index'
                                >
                                    <td><span class="desc">{{item.knowledge_name}}</span></td>
                                    <td>{{item.grade_score_rate}}%</td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{item.class_score_rate}}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore4">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        <!-- 欠缺严重 -->
                        <div class="item">
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">欠缺严重</span>
                                     <span class='cleft_3'>(排序前30%)</span>
                                    <span class="cright"><i>{{bad_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">班级得分率偏低的薄弱知识点，请老师重点关注。</div>
                            </div>
                            <table class="list-table list-table2">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 238px;">丢分次/考察次</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody ref="tbody_height" :style="{width:tbody_height+ 'px'}">
                                <tr v-for='(item, index) of (is_show5 == false ? bad_knowledge_list : bad_knowledge_list_all)'
                                    :key='index'
                                >
                                    <td><span class="desc">{{item.knowledge_name}}</span></td>
                                    <td>{{item.grade_score_rate}}%</td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{item.class_score_rate}}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore5">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        <!-- 高频考察 -->
                        <div class="item">
                            <div class="c_hd">
                                <div class="title">
                                    <span class="cleft">高频考察</span>
                                    <span class='cleft_2'>(出现频率超过80%)</span>
                                    <span class="cright"><i>{{high_freq_knowledge_list_all.length}}</i>个</span>
                                </div>
                                <div class="desc">考试中经常考察的薄弱知识点，请老师关注班级掌握情况。</div>
                            </div>
                            <table class="list-table list-table2">
                                <thead>
                                <tr>
                                    <th style="width: 138px;">知识点</th>
                                    <th style="width: 138px;">丢分次/考察次</th>
                                    <th style="width: 238px;">班级得分率</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for='(item, index) of (is_show6 == false ? high_freq_knowledge_list : high_freq_knowledge_list_all)'
                                    :key='index'
                                >
                                    <td><span class="desc">{{item.knowledge_name}}</span></td>
                                    <td>{{item.grade_score_rate}}%</td>
                                    <td>
                                        <div class="info-box">
                                            <div class="skillbar" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                <div class="filled" LeftNav :style="{width: item.class_score_rate+'%'}"></div>
                                            </div>
                                            <span class="percent" :class="item.class_score_rate > 50 ? 'blue' : 'orange'">
                                                {{item.class_score_rate}}%
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="showmore" @click="showMore6">
                                展开更多
                                <img :src="require('@/assets/images/ic_arrow_more_normal.png')">
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderPublic from "@/components/header"
    import HeaderTitle from '@/components/headerTitle'
    import LeftNav from './LeftNav'
    import ScoreEcharts from './echarts.vue'

    export default {
        name: "passRate",
        data() {
            return {
                url_index: 2,   //header
                tbody_height:184,
                active: 1,        //跳转页面
                teacher: [],
                class_id: '',
                list: [],
                subjects: [],                   //科目列表
                subject_id: 0,                  //科目id
                session_subject_id: '',         //任课
                subjectsIndex: 0,               //科目选中
                improve_knowledge_list: [],     //提高
                improve_knowledge_list_all: [], //提高
                poor_knowledge_list: [],        //变差
                poor_knowledge_list_all: [],    //变差
                new_knowledge_list: [],         //新增
                new_knowledge_list_all: [],     //新增
                lower_grade_knowledge_list: [], //低于年级水平
                lower_grade_knowledge_list_all: [], //低于年级水平
                bad_knowledge_list: [],         //欠缺严重
                bad_knowledge_list_all: [],     //欠缺严重
                high_freq_knowledge_list: [],   //高频考察
                high_freq_knowledge_list_all: [],//高频考察
                is_show1: false,
                is_show2: false,
                is_show3: false,
                is_show4: false,
                is_show5: false,
                is_show6: false

            }
        },
        components: {
            HeaderPublic,
            HeaderTitle,
            LeftNav,
            ScoreEcharts
        },
        mounted () {
            this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
            this.class_id = this.teacher[0].class_id
            this.session_subject_id = this.teacher[0].subject_id
            this.handleGetSubjectsInfo() //查询科目列表
            this.hadnelGetKnowledgeAnalysisInfo()  //首次渲染
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
                this.hadnelGetKnowledgeAnalysisInfo()
            },
            hadnelGetKnowledgeAnalysisInfo () { //首次渲染
                this.$http.get('/class/' + this.class_id + '/subject/' + this.subject_id + '/class_subject_knowledge_analysis?debug=true', {})
                    .then(this.hadnelGetKnowledgeAnalysisInfoSucc.bind(this))
            },  
            hadnelGetKnowledgeAnalysisInfoSucc (res) { //学情分析-备课-获取成功
                console.log(res)
                if(res.data.code == 0) {
                    let data = res.data.data
                    this.list = data
                    let arr1 = data.improve_knowledge_list.slice(0, 5)
                    this.improve_knowledge_list = arr1                                  //提高
                    this.improve_knowledge_list_all = data.improve_knowledge_list       //提高
                    let arr2 = data.poor_knowledge_list.slice(0, 5)
                    this.poor_knowledge_list = arr2                                     //变差
                    this.poor_knowledge_list_all = data.poor_knowledge_list             //变差
                    let arr3 = data.new_knowledge_list.slice(0, 5)
                    this.new_knowledge_list = arr3                                      //新增
                    this.new_knowledge_list_all = data.new_knowledge_list               //新增
                    let arr4 = data.lower_grade_knowledge_list.slice(0, 5)
                    this.lower_grade_knowledge_list = arr4                              //低于年级水平
                    this.lower_grade_knowledge_list_all = data.lower_grade_knowledge_list //低于年级水平
                    let arr5 = data.bad_knowledge_list.slice(0, 5)
                    this.bad_knowledge_list = arr5                                      //欠缺严重
                    this.bad_knowledge_list_all = data.bad_knowledge_list               //欠缺严重
                    let arr6 = data.high_freq_knowledge_list.slice(0, 5)
                    this.high_freq_knowledge_list = arr6                                //高频考察
                    this.high_freq_knowledge_list_all = data.high_freq_knowledge_list   //高频考察
 
                }
            },
            // 点击展示更多
            showMore1() {
               this.is_show1 = !this.is_show1
            },
            showMore2() {
                this.is_show2 = !this.is_show2
            },
            showMore3() {
                this.is_show3 = !this.is_show3
            },
            showMore4() {
                this.is_show4 = !this.is_show4
            },
            showMore5() {
                this.is_show5 = !this.is_show5
            },
            showMore6() {
                this.is_show6 = !this.is_show6
            },
        }
    };
</script>

<style lang='stylus' scoped>
    @import url('../common/css/allCourse.css');
    .course
        background: #fff;
        .course_main {
            overflow: hidden;
            li {
                float: left;
                text-align: center;
                height: 155px;
                min-width: 178px;
                position: relative;
                padding-top: 40px;
                box-sizing: border-box;
                .title {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #A2AFCD;
                    text-align: center;
                }
                .text {
                    font-family: MicrosoftYaHei;
                    font-size: 30px;
                    color: #000000;
                    text-align: center;
                    padding-top: 15px;
                }
                &:after {
                    content: '';
                    position: absolute;
                    top: 42px;
                    right: 0px;
                    height: 60px;
                    border-right: 1px dashed #A2AFCD;
                }
                &:nth-child(1) {
                    padding-left: 30px;
                    padding-right: 10px;
                    width: 370px;
                    .title {
                        font-family: PingFangSC-Semibold;
                        font-size: 22px;
                        color: #383B57;
                        text-align: left;
                    }
                    .text {
                        ont-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #5F6D91;
                        padding-top: 10px;
                        line-height: 1.5;
                        text-align: left;
                    }
                }
                &:nth-last-of-type(1) {
                    &:after {
                        content: none;
                    }
                }
            }
        }

    .skillbar
        width: 120px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        height: 9px;
        background: #E7E7E7;
        border-radius: 6px;
        .filled {
            z-index: 8;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0, 80, 80, .3);
            height: 100%;
            width: 20px;
            border-radius: 5px;
        }

        &.orange {
            .filled {
                background-color: #ff8817
            }
        }

        &.blue {
            .filled {
                background-color: #4B70FF 
            }

        }

    .main
        overflow: hidden
        margin: 20px auto 0
        width: 940px
        display flex
        justify-content space-between
        .right
            overflow: hidden
            float: right
            width: 744px
        .nav li
            position relative;
            .mark
                display inline-block
                background: #FF8E2C;
                border-radius: 20px;
                height: 17px;
                font-size: 10px;
                line-height: 17px;
                padding: 1px 0px;
                font-weight: normal;
                font-family: PingFangSC-Semibold;
                font-size: 10px;
                color: #FFFFFF;
                position absolute
                top: 15px;
                right: -35px;
                width: 37px;
                text-align: center;

    .cbox
        display flex
        justify-content space-between;
        flex-wrap wrap;
        align-items start;
        .item {
            width 365px
            background: #FFFFFF;
            border: 1px solid rgba(162, 175, 205, 0.60);
            border-radius: 6px;
            margin-top 15px;
            .c_hd {
                background: #A2AFCD;
                box-sizing border-box;
                padding 20px;
                color white
                .title {
                    font-size: 18px;
                    display flex;
                    justify-content space-between;
                    padding-bottom 10px;
                    .cleft_2 {
                        font-size: 14px;
                        position: relative;
                        left: -47px;
                        top: 4px;
                    }
                    .cleft_3 {
                        font-size: 14px;
                        position: relative;
                        left: -68px;
                        top: 4px;
                    }
                    .cright {
                        margin-top: -10px;
                    }
                    i {
                        font-size 28px;
                    }
                }
                .desc {
                    opacity: 0.8;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #FFFFFF;
                }
            }
        }
        .list-table {
            font-size 14px;
            th {
                width: 106px;
                height: 36px;
                color: #383B57;
                padding-left: 20px;
                border-bottom: 1px solid rgba(236, 239, 245, 0.51);
            }
            td {
                width: 106px;
                height: 36px;
                border-bottom: 1px solid rgba(236, 239, 245, 0.51);
                padding-left: 20px;
                .desc {
                    display inline-block
                    width 106px;
                    overflow hidden;
                    text-overflow ellipsis;
                    white-space nowrap
                    color: #5F6D91
                }
                .percent {
                    display: inline-block
                    width 27px;
                    padding-left 3px;
                }
                .rank {
                    img {
                        margin-right 3px;
                    }
                    .plus {
                        color: #4B70FF;
                    }
                }
                .percent, .rank {
                    &.orange {
                        color: #FF8E2C;
                    }
                    &.blue {
                        color: #4B70FF ;
                    }
                }
            }
        }
        .list-table2
            tr
                th:nth-child(2) 
                    position: relative 
                    left: -25px
                    padding-left: 0
                td:nth-child(2)
                    position: relative 
                    left: -25px
                    color: #5F6D91
                th:nth-child(3)
                    position: relative 
                    left: -15px
                    padding-left: 0
                td:nth-child(3)
                    position: relative 
                    left: -15px
                    padding-left: 0
                    .info-box
                        display: flex
                        margin-top: 8px
                        span 
                            margin-top: -3px

        .showmore {
            height 37px;
            line-height: 37px;
            box-sizing border-box
            text-align center;
            color rgba(75, 112, 255, .8);
            cursor pointer;
            img {
                margin-left 6px;
            }
        }
</style>
