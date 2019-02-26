<template>
    <div class="questionsQuality">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
                <div style="background: #FFFFFF;">
                    <div class="topHead">具体考题及内容</div>
                    <div class="topContent">
                        <div class="specificAuditions" v-for="(items,index) in list" :key="index" style="margin-top: 10px">
                            <el-button class="specificContent" v-for="(item,index) in items" :key="index">
                                {{item}}
                            </el-button>
                        </div>
                    </div>
                    <div class="middle"></div>
                    <div class="outline">
                        <div class="title">选择题</div>
                        <div class="properties">
                            <span class="propertyMessage">难度:</span><span
                                class="propertyValue">{{property.difficulty}}</span>
                            <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                            <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                            <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                        </div>
                        <div class="details" v-html="content"></div>
                        <div class="title2">选项公布</div>
                        <div class="choose" v-for="(item,index) in choose" :key="index">
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
                        <div class="choosed" v-for="item in choosed" :key="item.title">
                            <histogram class="choosedItem"
                                       :title="item.title"
                                       :people="item.people"
                                       :isTrue="item.isTrue"
                                       :percentage="item.percentage"
                            >{{item.title}}
                            </histogram>
                        </div>
                    </div>
                </div>
                <div style="background: #FFFFFF;margin-top: 35px;">
                    <div class="topHead">具体考题及内容</div>
                    <div class="topContent">
                        <div class="specificAuditions" v-for="(items, index) in list" :key="index" style="margin-top: 10px">
                            <el-button class="specificContent" v-for="(item,index) in items" :key="index">
                                {{item}}
                            </el-button>
                        </div>
                    </div>
                    <div class="middle"></div>
                    <div class="outline">
                        <div class="title">选择题</div>
                        <div class="properties">
                            <span class="propertyMessage">难度:</span><span
                                class="propertyValue">{{property.difficulty}}</span>
                            <span class="propertyMessage">| 区分度:</span><span class="propertyValue">{{property.discrimination}}</span>
                            <span class="propertyMessage">| 本校正答率:</span><span class="propertyValue">{{property.answerRate}}</span>
                            <span class="propertyMessage">| 考察知识点:</span><span class="propertyValue">{{property.knowledgePoints}}</span>
                        </div>
                        <div class="details" v-html="content"></div>
                        <div class="scoreAnnouncement">
                            全市分数公布
                        </div>
                        <div class="scoreBox">

                        </div>

                        <div class="answerSituation2">答题情况</div>
                        <div class="classGrade">
                            <span class="classMessage">班级得分:</span><span class="classValue">{{clazz.classScores}}</span>
                            <span class="classMessage">| 班级均分:</span><span
                                class="classValue">{{clazz.classDivide}}</span>
                            <span class="classMessage">| 年级均分:</span><span
                                class="classValue">{{clazz.gradeDivide}}</span>
                        </div>
                        <div class="itemSituation">
                            <el-button class="chooses" v-for="(item,index) in answerList" :key="index">
                                {{item}}
                            </el-button>
                        </div>
                        <div class="answerLine2">
                            <div class="answer">
                                分数
                            </div>
                            <div class="answerOthers2">*点击柱状图，可查看学生名单</div>
                        </div>
                        <div class="choosed" v-for="(item, index) in subjectiveGrade" :key="index">
                            <subjective class="choosedItem"
                                        :grade="item.grade"
                                        :people="item.people"
                                        :isTrue="item.isTrue"
                                        :percentage="item.percentage"
                            >{{item.title}}
                            </subjective>
                        </div>
                        <div style="height:140px">
                            <div class="answerCorrect">
                                正确答案
                            </div>
                            <div class="answerBox">
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    import histogram from './histogram/histogram.vue'
    import subjective from './subjective/subjective.vue'

    export default {
        components: {
            histogram,
            subjective
        },
        data() {
            return {
                activeName: 'first',
                list: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [14, 15, 16, 17, 18, 19, 20, 21]],
                property: {difficulty: '0.6', discrimination: '0.6', answerRate: '85%', knowledgePoints: '古诗文默写'},//"难度：0.6 | 区分度：0.6 | 本校正答率：85% | 考察知识点：古诗文默写",
                content: "文言文内容文言文内容文言文内容文言文内容文言文内容文言文<br/>内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文",
                choose: [{title: 'A', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'B', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'C', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'},
                    {title: 'D', value: '文言文内容文言文内容文言文内容文言文内容文言文内容'}],
                choosed: [
                    {title: "选项A", people: "19", isTrue: "1", percentage: "43%"},
                    {title: "选项B", people: "9", isTrue: "0", percentage: "19%"},
                    {title: "选项C", people: "10", isTrue: "0", percentage: "19%"},
                    {title: "选项D", people: "11", isTrue: "0", percentage: "19%"}
                ],
                clazz: {classScores: '19%', classDivide: '2分', gradeDivide: '3分'},
                subjectiveGrade: [{grade: "4-6", people: "9", isTrue: "0", percentage: "24%"},
                    {grade: "2-4", people: "9", isTrue: "0", percentage: "24%"},
                    {grade: "0-2", people: "19", isTrue: "1", percentage: "52%"}],
                answerList: [1, 2, 3, 4],
                tabs:[{
                    name:"first",
                    label:"语文"
                },{
                    name:"second",
                    label:"数字"
                },{
                    name:"third",
                    label:"英语"
                },{
                    name:"fourth",
                    label:"物理"
                },{
                    name:"fifth",
                    label:"化学"
                },{
                    name:"sixth",
                    label:"生物"
                }]
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            trim(str) {  //str表示要转换的字符串
                return str.replace(/\n|\r\n/g, "<br/>");
            },

            init() {
                this.content = this.trim(this.content);
            }
        },
        created() {
            this.init();
        }
    }
</script>

<style>
    .margin_top_10{
        margin-top: 10px;
    }
    .el-tabs__nav {
        margin-left: 31px;
    }

    .questionsQuality .el-tabs__item {
        font-size: 16px;
        color: #383B57;
        padding: 0 28px;
    }

    .questionsQuality .el-tabs__item.is-active {
        color: #409EFF;
        font-size: 18px;
    }
    .specificAuditions .el-button {
        height: 36px;
        border-radius: 6px;
        border: 1px solid #4B70FF;
        font-family: PingFangSC-Semibold;
        font-size: 14.4px;
        color: #333333;
    }

    .specificAuditions .el-button:focus, .specificAuditions .el-button:hover {
        background: #4B70FF;
        border-radius: 6px;
        font-family: PingFangSC-Semibold;
        font-size: 14.4px;
        color: #FFFFFF;
    }

    .itemSituation .el-button {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        font-family: PingFangSC-Semibold;
        font-size: 14.4px;
        color: #FFFFFF;
        background: #A2AFCD;
        border-radius: 6px;
        padding: 0;
    }

    .itemSituation .el-button:focus, .itemSituation .el-button:hover {
        background: #4B70FF;
        border-radius: 6px;
        font-family: PingFangSC-Semibold;
        font-size: 14.4px;
        color: #FFFFFF;
    }

    .el-tabs__nav-scroll {
        background: white;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #4B70FF;
        text-align: center;
    }
</style>

<style scoped src="./questionsQuality.css"></style>

