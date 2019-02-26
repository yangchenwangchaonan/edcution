<template>
    <div class='topic-container'>
        <headerPublic :url_index=url_index></headerPublic>
        <headerTitle></headerTitle>
        <div class='main'>
            <div class="left_select_list">
                <LeftNav></LeftNav>
            </div>
            <div class="right_select_list">
                <div class="questionsQuality">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="语文" name="first">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">语文考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions">
                                        <el-button class="specificContent" v-for="(item, idx) in list" :key="idx" :class="{active_bg:active_bg === idx}"  @click="change_question_number(idx)">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{current_property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{current_property.discrimination}}</span>
                                        <span class="propertyMessage">| 全区得分率:</span><span class="propertyValue">{{current_property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{current_property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" >
                                        <img style="width: 700px" :src="require('../../teacher/common/images/chinese/1-9-'+ current_img +'.png')" alt="">
                                    </div>
                                    <!--<div class="title2">选项公布</div>-->
                                    <!--<div class="choose" :key="`${chindex}_c`" v-for="(item, chindex) in choose">-->
                                        <!--<div class="itemTitle">{{item.title}}</div>-->
                                        <!--<div class="itemValue">{{item.value}}</div>-->
                                    <!--</div>-->
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">全校得分率:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">全校均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">全区均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" :key="`${chdidx}_d`" v-for="(item, chdidx) in choosed">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="数学" name="second">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">数学考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions">
                                        <el-button class="specificContent" :key="`${idx}_b` "
                                                   v-for="(item, idx) in list">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                                        <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" v-html="content"></div>
                                    <div class="title2">选项公布</div>
                                    <div class="choose" :key="`${chindex}_c`" v-for="(item, chindex) in choose">
                                        <div class="itemTitle">{{item.title}}</div>
                                        <div class="itemValue">{{item.value}}</div>
                                    </div>
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">班级均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">年级均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" :key="`${chdidx}_d`" v-for="(item, chdidx) in choosed">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="英语" name="third">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">英语考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions" >
                                        <el-button class="specificContent" :key="`${idx}_b` "
                                                   v-for="(item, idx) in list">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                                        <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" v-html="content"></div>
                                    <div class="title2">选项公布</div>
                                    <div class="choose" :key="`${chindex}_c`" v-for="(item, chindex) in choose">
                                        <div class="itemTitle">{{item.title}}</div>
                                        <div class="itemValue">{{item.value}}</div>
                                    </div>
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">班级均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">年级均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" :key="`${chdidx}_d`" v-for="(item, chdidx) in choosed">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="物理" name="fourth">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">物理考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions" >
                                        <el-button class="specificContent" :key="`${idx}_b` "
                                                   v-for="(item, idx) in list">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                                        <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" v-html="content"></div>
                                    <div class="title2">选项公布</div>
                                    <div class="choose" :key="`${chindex}_c`" v-for="(item, chindex) in choose">
                                        <div class="itemTitle">{{item.title}}</div>
                                        <div class="itemValue">{{item.value}}</div>
                                    </div>
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">班级均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">年级均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" :key="`${chdidx}_d`" v-for="(item, chdidx) in choosed">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="化学" name="fifth">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">化学考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions" >
                                        <el-button class="specificContent" :key="`${idx}_b` "
                                                   v-for="(item, idx) in list">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                                        <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" v-html="content"></div>
                                    <div class="title2">选项公布</div>
                                    <div class="choose" :key="`${chindex}_c`" v-for="(item, chindex) in choose">
                                        <div class="itemTitle">{{item.title}}</div>
                                        <div class="itemValue">{{item.value}}</div>
                                    </div>
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">班级均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">年级均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" :key="`${chdidx}_d`" v-for="(item, chdidx) in choosed">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="生物" name="sixth">
                            <div style="background: #FFFFFF;">
                                <div class="topHead">生物考题</div>
                                <div class="topContent">
                                    <div class="specificAuestions" >
                                        <el-button class="specificContent" v-for="(item, idx) in list" :key="idx">
                                            {{item}}
                                        </el-button>
                                    </div>
                                </div>
                                <div class="middle"></div>
                                <div class="outline">
                                    <div class="title">选择题</div>
                                    <div class="properties">
                                        <span class="propertyMessage">难度:</span><span class="propertyValue">{{property.difficulty}}</span>
                                        <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                                        <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                                        <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                                    </div>
                                    <div class="details" v-html="content"></div>
                                    <div class="title2">选项公布</div>
                                    <div class="choose" v-for="(item, chindex) in choose" :key="`${chindex}_c`">
                                        <div class="itemTitle">{{item.title}}</div>
                                        <div class="itemValue">{{item.value}}</div>
                                    </div>
                                    <div class="answerSituation">答题情况</div>
                                    <div class="classGrade">
                                        <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                                        |
                                        <span class="classMessage">班级均分:</span><span class="classValue">{{clazz.classDivide}}</span>
                                        |
                                        <span class="classMessage">年级均分:</span><span class="classValue">{{clazz.gradeDivide}}</span>
                                    </div>
                                    <div class="answerLine">
                                        <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                        <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                                    </div>
                                    <div class="choosed" v-for="(item, chdidx) in choosed" :key="`${chdidx}_d`">
                                        <histogram class="choosedItem"
                                                   :title="item.title"
                                                   :people="item.people"
                                                   :isTrue="item.isTrue"
                                                   :percentage="item.percentage"
                                                   @showMessage="showNameDialog(item)"
                                        >{{item.title}}
                                        </histogram>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <Dialog :dtitle="dialogTitle" :nameList="dialogNameList" :show="showDialog" @hide="handlHideDialog"></Dialog>
    </div>
</template>
<script>
    import histogram from '../components/histogram/histogram.vue'
    import subjective from '../components/subjective/subjective.vue'
    import HeaderPublic from "@/components/header";
    import HeaderTitle from '@/components/headerTitle/schoolHeaderTitle';
    import LeftNav from '../components/leftNav';
    import Dialog from './dialog';

    export default {
        components: {
            histogram,
            subjective,
            HeaderPublic,
            HeaderTitle,
            LeftNav,
            Dialog
        },
        data() {
            return {
                active_bg:0,
                url_index: 1,   //header下标
                activeName: 'first',
                list: [1, 2, 3, 4, 5, 6, 7, 8],
                property: {
                    difficulty: '0.6',
                    discrimination: '0.6',
                    answerRate: '85%',
                    knowledgePoints: '古诗文默写'
                },//"难度：0.6 | 区分度：0.6 | 本校正答率：85% | 考察知识点：古诗文默写",
                current_property:{},
                property_object:[
                    {
                        difficulty: '0.6',
                        discrimination: '0.6',
                        answerRate: '79%',
                        knowledgePoints: '阅读理解',
                    },
                    {
                        difficulty: '0.5',
                        discrimination: '0.4',
                        answerRate: '83%',
                        knowledgePoints: '古文默写'
                    },
                    {
                        difficulty: '0.4',
                        discrimination: '0.5',
                        answerRate: '80%',
                        knowledgePoints: '作文'
                    },
                    {
                        difficulty: '0.6',
                        discrimination: '0.6',
                        answerRate: '85%',
                        knowledgePoints: '造句'
                    },
                    {
                        difficulty: '0.6',
                        discrimination: '0.6',
                        answerRate: '79%',
                        knowledgePoints: '阅读理解',
                    },
                    {
                        difficulty: '0.5',
                        discrimination: '0.4',
                        answerRate: '83%',
                        knowledgePoints: '古文默写'
                    },
                    {
                        difficulty: '0.4',
                        discrimination: '0.5',
                        answerRate: '80%',
                        knowledgePoints: '作文'
                    },
                    {
                        difficulty: '0.6',
                        discrimination: '0.6',
                        answerRate: '85%',
                        knowledgePoints: '造句'
                    },

                ],
                content: "文言文内容文言文内容文言文内容文言文内容文言文内容文言文<br/>内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文",
                choose: [{title: 'A', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'B', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'C', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'D', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'}],
                choosed: [{
                    title: "选项A",
                    people: "19",
                    isTrue: "1",
                    percentage: "43%",
                    dtitle: '第1题-A选项学生名单(19人,占比25%)',
                    dnameList: '苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三'
                },
                    {
                        title: "选项B",
                        people: "9",
                        isTrue: "0",
                        percentage: "19%",
                        dtitle: '第2题-A选项学生名单(29人,占比73%)',
                        dnameList: '苏敏、张明、王三、苏敏、王三、苏敏、张明、王三、苏敏、张明、王三'
                    },
                    {
                        title: "选项C",
                        people: "9",
                        isTrue: "0",
                        percentage: "19%",
                        dtitle: '第3题-A选项学生名单(39人,占比45%)',
                        dnameList: '苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三'
                    },
                    {
                        title: "选项D",
                        people: "9",
                        isTrue: "0",
                        percentage: "19%",
                        dtitle: '第4题-A选项学生名单(49人,占比75%)',
                        dnameList: '苏敏、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三'
                    }],
                clazz: {classScores: '19%', classDivide: '2分', gradeDivide: '3分'},
                subjectiveGrade: [{
                    grade: "4-6",
                    people: "9",
                    isTrue: "0",
                    percentage: "24%",
                    dtitle: '第5题-A选项学生名单(92人,占比70%)',
                    dnameList: '苏敏、张王三、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三'
                },
                    {
                        grade: "2-4",
                        people: "9",
                        isTrue: "0",
                        percentage: "24%",
                        dtitle: '第6题-A选项学生名单(93人,占比9%)',
                        dnameList: '苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三'
                    },
                    {
                        grade: "0-2",
                        people: "19",
                        isTrue: "1",
                        percentage: "52%",
                        dtitle: '第7题-A选项学生名单(94人,占比5%)',
                        dnameList: '苏敏、张明、王三、苏敏、张明、王、苏敏、张明、王三、苏敏、张明、王三'
                    }],
                answerList: [1, 2, 3, 4],
                dialogTitle: '',
                dialogNameList: '',
                showDialog: false,
                current_img:1
            };
        },
        mounted(){
            this.current_property = this.property_object[0];
        },
        methods: {
            change_question_number(idx) {
                console.log(idx);
                this.active_bg = idx;
                this.current_img = idx +1;
                this.current_property = this.property_object[idx];
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },

            trim(str) {  //str表示要转换的字符串
                return str.replace(/\n|\r\n/g, "<br/>");
            },

            init() {
                this.content = this.trim(this.content);
            },
            showNameDialog(item) {
                console.log(item)
                this.dialogTitle = item.dtitle;
                this.dialogNameList = item.dnameList;
                this.showDialog = true;
            },
            handlHideDialog() {
                this.showDialog = false;
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style>
    .active_bg{
        background-color: #4B70FF;
        color:#ffffff !important;
    }
    .specificContent{
        margin-top: 10px;
    }
    .main {
        display: flex;
        width: 940px;
        margin: 20px auto;
        justify-content: space-between;
    }

    .paperQuality-sideNav {
        color: #fff;
        border-radius: 6px;
    }

    .paperQuality-sideNav .paperQuality-garde {
        display: inline-block;
        width: 32px;
        height: 32px;
        background-image: url('../../../assets/images/y_tch_tab1.png');
        background-size: 100%;
    }

    .paperQuality-sideNav .el-menu {
        border-radius: 6px;
    }

    .paperQuality-sideNav .el-submenu__title:hover {
        background-color: #4B70FF;
        color: #fff;
    }

    .paperQuality-sideNav .el-submenu__title {
        padding-left: 20px;
        font-size: 16px;
        line-height: 48px;
        height: 48px;
    }

    .paperQuality-sideNav .el-menu-item:focus, .paperQuality-sideNav .el-menu-item:hover {
        background-color: #4B70FF;
        color: #fff;
    }

    .paperQuality-sideNav .el-submenu .el-menu-item {
        min-width: initial;
        font-size: 16px;
        height: 41px;
        line-height: 41px;
        padding-left: 69px !important;
    }

    /* .el-tabs__item{
        width:37px;
        height:25px;
        padding: 0;
        margin-left:31px;
        font-size: 18px;
        color: #4B70FF;
        text-align: center;
    }*/
    /* .el-tabs__active-bar{
        width:34px;
        transform:translateX(31px);
    } */
    .questionsQuality .el-tabs__active-bar {
        height: 4px;
        background: #4B70FF;
    }

    .questionsQuality .el-tabs__item.is-active {
        color: #4B70FF;
    }

    .questionsQuality .el-tabs__item {
        color: #333333;
        padding: 0;
        height: 52px;
        line-height: 47px;
        margin: 0 26px 0 30px;
        font-weight: 600;
        font-size: 16px;
        border-bottom: 4px solid rgba(0, 0, 0, 0);
    }

    .specificAuestions .el-button {
        height: 36px;
        border-radius: 6px;
        border: 1px solid #4B70FF;
        font-size: 14px;
        color: #333333;
        margin-left: 0;
        margin-right: 10px;
    }

    .specificAuestions .el-button:focus, .specificAuestions .el-button:hover {
        background: #4B70FF;
        border-radius: 6px;
        font-size: 14px;
        color: #FFFFFF;
    }

    .itemSituation .el-button {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        font-size: 14.4px;
        color: #FFFFFF;
        background: #A2AFCD;
        border: 1px solid #A2AFCD;
        border-radius: 6px;
        padding: 0;
        margin-left: 0;
        margin-right: 10px;
    }

    .itemSituation .el-button:focus, .itemSituation .el-button:hover {
        background: #4B70FF;
        border-radius: 6px;
        font-size: 14.4px;
        color: #FFFFFF;
    }

    .el-tabs__nav-scroll {
        background: white;
        font-size: 18px;
        color: #4B70FF;
        text-align: center;
    }

    .questionsQuality .el-tabs__header {
        margin: 0;
    }

    .questionsQuality .el-tabs__item.is-active {
        border-bottom-color: #4B70FF;
    }

    .questionsQuality .el-tabs__active-bar {
        display: none;
    }
</style>

<style scoped src="./questionsQuality.css"></style>

