<template>
    <div>
        <div class="echarts_title" v-if="item.qst_type_str == '客观题'">
            <div class="echarts_info">
                <h1>答题情况</h1>
                <p>班级得分：<span>{{item.class_score_rate}}</span>% | 班级均分：<span>{{item.class_avg_score}}</span>分 | 年级均分：<span>{{item.grade_avg_score}}</span>分</p>
            </div>
            <div class="echarts_answer">
                <p>正确答案：<span>{{item.answer_content}}</span><i class="i_info">*点击柱状图，可查看学生名单</i></p>
            </div>
            <!-- <div id="myChart" class="echarts"></div> -->
            <div class="echarts">
                <div class="choosed"   
                    v-for="(item_qst, index2) of item.qst_score_info_list"
                    :key="index2"
                >
                    <div @click="handleModal1(1)">
                        <histogram class="choosedItem"
                            :title="'选项'+item_qst.option"
                            :people="item_qst.option_count"
                            :isTrue="item_qst.option == item.answer_content ? 1 : 0"
                            :percentage="item_qst.rate+'%'"
                        >
                        </histogram>
                    </div>
                </div>
            </div>
        </div>

        <div class="echarts_title echarts_title1" v-if="item.qst_type_str == '主观题'">
            <div class="echarts_info">
                <h1>答题情况</h1>
                <p>班级得分：<span>{{item.class_score_rate}}</span>% | 班级均分：<span>{{item.class_avg_score}}</span>分 | 年级均分：<span>{{item.grade_avg_score}}</span>分</p>
            </div>
            <div class="echarts_answer">
                <p>分数<i>*点击柱状图，可查看学生名单</i></p>
            </div>
            <div class="echarts">
                <div class="choosed"  
                    v-for="(item_qst, index2) of item.qst_score_info_list"
                    :key="index2"
                >
                    <div @click="handleModal2(item.grade)">
                            <subjective class="choosedItem"
                                :grade= "item_qst.score_range"
                                :people= "item_qst.option_count"
                                :isTrue= "item_qst.option == item.answer_content ? 1 : 0"
                                :percentage= "item_qst.rate+'%'"
                            >
                                {{item.title}}
                            </subjective>
                            </div>
                    </div>
            </div>
            <div class="echarts_answer1">
                <h1>正确答案</h1>
                <p v-for='(item_url, index) of item.answer_url_list'
                    :key='index'
                >
                    <img :src="item_url" alt="">
                </p>
            </div>
        </div>

        <div class="echarts_title echarts_title1 echarts_title2" 
            v-if="item.qst_type_str == '主观题'"
        >
            <div class="echarts_info">
                <h1>答题情况</h1>
                <p>班级得分：<span>19</span>% | 班级均分：<span>2</span>分 | 年级均分：<span>3</span>分</p>
            </div>
            <div class="echarts_num">
                <span v-for='(item, id) of nav'
                      :key='id' 
                      @click='handleToggleScore(id)'
                      :class='{active:id == navIndex}'>
                        {{item}}
                </span>
            </div>
            <div class="echarts_answer echarts_answer2">
                <p>分数 班级均分：<span>0.33</span>分 | 年级均分：<span>2</span>分 | 年级得分率：<span>33.89%</span><i>*点击柱状图，可查看学生名单</i>
                </p>
            </div>
            <div class="echarts">
                <div class="choosed" :key="`${sidx}_h`" v-for="(item, sidx) in subjectiveGrade">
                    <div @click="handleModal3(item.grade)">
                        <subjective  class="choosedItem"
                        :grade="item.grade"
                        :people="item.people"
                        :isTrue="item.isTrue"
                        :percentage="item.percentage"
                        >{{item.title}}</subjective>
                    </div>
                </div>
            </div>
            <div class="echarts_answer1">
                <h1>正确答案</h1>
                <p></p>
            </div>
        </div>
        <modal-option ref="pop"></modal-option>
        <modal-fraction ref="pap"></modal-fraction>
        <modal-weak ref="pdp"></modal-weak>
    </div>
</template>

<script>
    import ModalOption from './modal/option.vue'
    import ModalFraction from './modal/fraction.vue'
    import ModalWeak from './modal/weak.vue'
    import histogram from './histogram/histogram.vue'
    import subjective from './subjective/subjective.vue'
    export default {
        // name: "score_echarts",
        props: {
            item: Object
        },
        data () {
            return {
                navIndex: 0,
                nav: ['1', '2', '3', '4'],
                 choosed:[{title:"选项A",people:"19",isTrue:"1",percentage:"43%"},
                {title:"选项B",people:"9",isTrue:"0",percentage:"19%"},
                {title:"选项C",people:"9",isTrue:"0",percentage:"19%"},
                {title:"选项D",people:"9",isTrue:"0",percentage:"19%"}],
                clazz:{classScores:'19%',classDivide:'2分',gradeDivide:'3分'},
                subjectiveGrade:[{grade:"4-6",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"2-4",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"0-2",people:"19",isTrue:"1",percentage:"52%"}],
            }
        },
        components: {
            ModalOption,
            ModalFraction,
            ModalWeak,
            histogram,
            subjective
        },
        mounted() {

        },
//         watch: {
//             childer_data: {
//                 handler(newValue, oldValue) {
//                     alert()
//                     // let data = this.childer_data
//                     // console.log(data)
// 　　　　        },
//                 //immediate: true,
//                 deep: true  
//             }
//         },
        methods: {
            handleToggleScore(id) {  //切换科目
                this.navIndex = id
            },
            handleModal3(title){
              this.$refs.pdp.handleVisible(title)
            },
            handleModal2(title){
              this.$refs.pap.handleVisible(title)
            },
            handleModal1(title){
              this.$refs.pop.handleVisible(title)
            }
        }
           
};
</script>


<style lang='stylus' scoped>
    .echarts_title
        width 554px
        height 310px
        background #fff
        margin-top 14px
        border-radius 6px
        overflow hidden
        .echarts
            width 554px
            
            margin-left 30.5px
            padding-right 30px
            .choosed
                margin-top 10.5px
        .echarts_info
            padding-top 20px
            margin-left 30px
            font-size 18px
            h1
                font-weight bold
            p
                font-size 12px
                margin-top 14px
                span
                    font-size 16px
                    color #4B70FF
                    font-weight blod
        .echarts_answer
            margin-left 30px
            margin-top 28px
            font-size 12px
            span
                font-size 16px
                color #4B70FF
                font-weight blod
            i
                margin-left 306px
            .i_info
                margin-left 260px

    .echarts_title1
        height 410px
        .echarts1
            width 554px
            height 230px
            margin-left 15px
            margin-top -50px
            padding-right 30px
        .echarts_answer1
            border-top 1px solid #F2F4F6
            margin-top 10px
            h1
                font-size 12px
                color #5F6D91
                margin-left 30px
                margin-top 10px
            p
                width 494px
                height 100px
                background #F2F4F6
                margin 0 auto
                margin-top 8px
                border-radius 6px

    .echarts_title2
        height 458px
        .echarts_num
            margin-left 30px
            margin-top 20px
            span
                display inline-block
                width 30px
                height 30px
                background #A2AFCD
                color #fff
                line-height 30px
                text-align center
                margin-left 10px
                border-radius 6px
                cursor pointer
            .active
                background #4B70FF
        .echarts_answer2
            font-size 12px
            i
                margin-left 0
                font-size 10px
            span
                font-size 12px

</style>
