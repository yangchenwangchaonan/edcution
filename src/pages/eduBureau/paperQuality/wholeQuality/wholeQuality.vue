<template>
    <div class="wholeQualit">
        <div class="wholeQualit-subjects">
            <div class="wholeQualit-subjects-line"></div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
                    <div class="wholeQualit-subjects-panel-one">
                        <div class="wholeQualit-subjects-wrapper">


                            <div class="wholeQualit-subjects-figure">
                                <div class="wholeQualit-subjects-data">
                                    <div class="wholeQualit-subjects-circle">
                                        <el-progress :width="126" style="font-size:22px" color="#4B70FF" type="circle" :percentage="item.difficultyDegree * 100" status="text" :stroke-width="15">
                                            {{item.difficultyDegree}}
                                        </el-progress>
                                    </div>
                                    <div class="wholeQualit-subjects-data-text">试卷难度</div>
                                </div>
                                <div class="wholeQualit-subjects-data">
                                    <div class="wholeQualit-subjects-bar">
                                        <div class="wholeQualit-subjects-bar-blue"
                                             :style="{ height: `${item.difficultyProportion[0] * 100}%` }">
                                            <span class="wholeQualit-subjects-bar-text">{{item.difficultyProportion[0] * 10}}</span>
                                        </div>
                                        <div class="wholeQualit-subjects-bar-red"
                                             :style="{ height: `${item.difficultyProportion[2] * 100}%` }">
                                            <span class="wholeQualit-subjects-bar-text">{{item.difficultyProportion[2] * 10}}</span>
                                        </div>
                                        <div class="wholeQualit-subjects-bar-yellow"
                                             :style="{ height: `${item.difficultyProportion[1] * 100}%` }">
                                            <span class="wholeQualit-subjects-bar-text">{{item.difficultyProportion[1] * 10}}</span>
                                        </div>
                                    </div>
                                    <div class="wholeQualit-subjects-data-text" style="position: relative;right: 19px;">
                                        难度比例
                                    </div>
                                    <div class="wholeQualit-subjects-bar-info" style="position: relative;right: 19px;">
                                        <span class="wholeQualit-subjects-bar-doodle red"></span>
                                        <span class="wholeQualit-subjects-bar-tip">易</span>
                                        <span class="wholeQualit-subjects-bar-doodle yellow"></span>
                                        <span class="wholeQualit-subjects-bar-tip">中</span>
                                        <span class="wholeQualit-subjects-bar-doodle blue"></span>
                                        <span class="wholeQualit-subjects-bar-tip">难</span>
                                    </div>
                                </div>
                                <div class="wholeQualit-subjects-data" style="margin: 0 0 0 104px;">
                                    <div class="wholeQualit-subjects-circle">
                                        <el-progress :width="126" color="#4B70FF" type="circle" :percentage="item.discriminationDegree * 100" status="text" :stroke-width="15">
                                            {{item.discriminationDegree}}
                                        </el-progress>
                                    </div>
                                    <div class="wholeQualit-subjects-data-text">区分度</div>
                                </div>
                            </div>


                        </div>
                        <div class="wholeQualit-subjects-detail">本学科试卷共 <span>14</span> 道题，主观题 <span>14</span> 道，分值占比
                            <span>14</span> ，客观题 <span>14</span> 道，分值占比 <span>14</span>；学科总分 <span>14</span>。
                        </div>
                    </div>
                    <div class="wholeQualit-subjects-panel-two" id="classAnalysisTrend" ref="classAnalysisTrend">
                        <div class="wholeQualit-subjects-panel-two-header">
                            <div class="wholeQualit-subjects-panel-two-header-title">本次考试所包含的知识点</div>
                            <div class="wholeQualit-subjects-panel-two-header-tags">
                                <button v-for="it in item.pointList" :key="it.id"
                                        class="wholeQualit-subjects-panel-two-header-tag">{{it.text}}
                                </button>
                            </div>
                        </div>
                        <div class="wholeQualit-subjects-panel-two-content">
                            <div class="wholeQualit-subjects-panel-two-line1">
                                <span class="panel-two-line1-title">古诗文默写</span>
                                <span style="margin: 0 0 0 8px;">总分：<span class="panel-two-line-light">12</span></span>
                                <span style="margin: 0 0 0 3px;">分数占比：<span
                                        class="panel-two-line-light">17%</span></span>
                            </div>
                            <div class="wholeQualit-subjects-panel-two-line2">
                                第1题 | 题型：选择题 | 难度： <span
                                    class="panel-two-line-light panel-two-line-light-big">0.6</span> | 区分度：<span
                                    class="panel-two-line-light panel-two-line-light-big">0.6</span> | 全市正答率：<span
                                    class="panel-two-line-light panel-two-line-light-big">85</span>% | 本校正答率：<span
                                    class="panel-two-line-light panel-two-line-light-big">85</span>%
                            </div>
                            <div class="wholeQualit-subjects-panel-two-detail">
                                <p>
                                    文言文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内</p>
                                <p>
                                    文言文内容文文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文文言文内</p>
                            </div>
                            <div class="wholeQualit-subjects-panel-two-pub">选项公布</div>
                            <div class="wholeQualit-subjects-panel-two-choose">
                                <div class="panel-two-choose-item">A<span>文言文内容文言文内容文言文内容文言文内容文言文内容</span></div>
                                <div class="panel-two-choose-item">B<span>文言文内容文言文内容文言文内容文言文内容文言文内容</span></div>
                                <div class="panel-two-choose-item">C<span>文言文内容文言文内容文言文内容文言文内容文言文内容</span></div>
                                <div class="panel-two-choose-item">D<span>文言文内容文言文内容文言文内容文言文内容文言文内容</span></div>
                            </div>

                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
         <Anchor
      :anchorActive="anchorActive"
      :anchorTitle="anchorTitle"
      :anchorList="anchorList"
      ref="anchor"
    ></Anchor>
    </div>
</template>
<style src="./wholeQuality.css"></style>
<script>
import Anchor from '@/components/anchor/anchor.vue';
    export default {
        components: {
            Anchor
        },
        data() {
            return {
                 // 右側
                    anchorActive: '',
                    anchorTitle: '整体质量',
                    anchorList: [{
                            label: '本次考试所包含的知识点',
                            value: 'classAnalysisTrend'
                        },
                        // {
                        //     label: '超均率趋势对比',
                        //     value: 'classAnalysisCompair'
                        // },
                        // {
                        //     label: '学科对比',
                        //     value: 'classAnalysisSubjectsCompair'
                        // },
                        // {
                        //     label: '班级薄弱知识点',
                        //     value: 'classAnalysisWeakPoint'
                        // }
                    ],
                tabs: [
                    {
                        label: '语文',
                        name: 'yuwen',
                        difficultyDegree: 0.58, // 试卷难度
                        discriminationDegree: 0.4, // 区分度
                        difficultyProportion: [0.2, 0.6, 0.2], // 难度比例
                        pointList: [
                            {
                                id: 1,
                                text: '古诗文默写'
                            },
                            {
                                id: 2,
                                text: '文言文理解'
                            },
                            {
                                id: 3,
                                text: '现代文阅读'
                            },
                            {
                                id: 4,
                                text: '病句修改'
                            },
                            {
                                id: 5,
                                text: '古诗文默写'
                            },
                            {
                                id: 6,
                                text: '文言文理解'
                            }
                        ]
                    },
                    {
                        label: '数学',
                        name: 'math',
                        difficultyDegree: 0.28, // 试卷难度
                        discriminationDegree: 0.5, // 区分度
                        difficultyProportion: [0.3, 0.5, 0.2], // 难度比例
                        pointList: [
                            {
                                id: 1,
                                text: '古诗文默写'
                            },
                            {
                                id: 2,
                                text: '文言文理解'
                            },
                            {
                                id: 3,
                                text: '现代文阅读'
                            },
                            {
                                id: 4,
                                text: '病句修改'
                            },
                            {
                                id: 5,
                                text: '古诗文默写'
                            },
                            {
                                id: 6,
                                text: '文言文理解'
                            }
                        ]
                    },
                    {
                        label: '英语',
                        name: 'en',
                        difficultyDegree: 0.18, // 试卷难度
                        discriminationDegree: 0.4, // 区分度
                        difficultyProportion: [0.4, 0.4, 0.2], // 难度比例
                        pointList: [
                            {
                                id: 1,
                                text: '古诗文默写'
                            },
                            {
                                id: 2,
                                text: '古诗文默写'
                            },
                            {
                                id: 3,
                                text: '古诗文默写'
                            },
                            {
                                id: 4,
                                text: '古诗文默写'
                            },
                            {
                                id: 5,
                                text: '古诗文默写'
                            },
                            {
                                id: 6,
                                text: '古诗文默写'
                            }
                        ]
                    }
                ],
                activeName: 'yuwen'
            };
        },
        munted(){
             const $classAnalysisTrend = this.$refs.classAnalysisTrend;
                // const $classAnalysisCompair = this.$refs.classAnalysisCompair;
                // const $classAnalysisSubjectsCompair = this.$refs.classAnalysisSubjectsCompair;
                // const $classAnalysisWeakPoint = this.$refs.classAnalysisWeakPoint;
            window.addEventListener('scroll', e => {
                const scrollY = window.scrollY;
                const winHeight = window.innerHeight;
                const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
                // const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;
                // const classAnalysisSubjectsCompairHeight = $classAnalysisSubjectsCompair.offsetTop + $classAnalysisSubjectsCompair.offsetHeight;
                // const classAnalysisWeakPointHeight = $classAnalysisWeakPoint.offsetTop + $classAnalysisWeakPoint.offsetHeight;

            if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
                this.anchorActive = 'classAnalysisTrend';
                return;
            }

            //   if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 200) {
            //     this.anchorActive = 'classAnalysisCompair';
            //     return;
            //   }

            //   if (scrollY >= classAnalysisCompairHeight - 200 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
            //     this.anchorActive = 'classAnalysisSubjectsCompair';
            //     return;
            //   }

            //   if (scrollY >= classAnalysisSubjectsCompairHeight - 500) {
            //     this.anchorActive = 'classAnalysisWeakPoint';
            //     return;
            //   }

            this.anchorActive = '';

            });
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>
