<template>
    <div class='topic-container'>
        <header-public></header-public>
        <header-title></header-title>
        <div class='main'>
            <div class="left_select_list">
                <div class="score_analysis">
                    <div class="score_analysis_first" @click="controlSelect()"><img src="@/assets/images/ic_chengjifenxi.png" alt=""><span class="">成绩分析</span><img ref="rotate" src="@/assets/images/ic_triangle.png" alt=""></div>
                    <div class="score_analysis_select" v-if="selectShow == true">
                    <div v-for="(list,index) in selectList" :key="index" class="option" :class="{ active:changeactive == index}" @click="changeSelect(index)">{{list.name}}</div>
                    </div>
                </div>
                    <div class="score_analysis_two" @click="goToEvaluation()">
                    <img src="@/assets/images/ic_shijuanjiangping.png" alt=""><span>试卷讲评</span>
                    </div>
            </div>
            <div class="exam-content-wrap">
                <div class="exam-class-tabs">
                    <a href="" class="exam-class-tab cur">语文</a>
                    <a href="" class="exam-class-tab">数学</a>
                    <a href="" class="exam-class-tab">英语</a>
                    <a href="" class="exam-class-tab">化学</a>
                    <a href="" class="exam-class-tab">生物</a>
                </div>
              <div class="exam-content-box">
                  <div class="exam-header">
                      <h2>本次考试所包含的知识点</h2>
                      <div class="exam-number-list">
                          <a href="javascript:;" class="exam-num cur">1</a>
                          <a href="javascript:;" class="exam-num">2</a>
                          <a href="javascript:;" class="exam-num">3</a>
                          <a href="javascript:;" class="exam-num">4</a>
                          <a href="javascript:;" class="exam-num">5</a>
                          <a href="javascript:;" class="exam-num">6</a>
                      </div>
                  </div>
                  <div class="exam-content">
                      <h2>选择题</h2>
                      <div class="exam-info">
                          <span class="exam-info-tit">难度: <strong>0.6</strong></span>
                          <span class="exam-info-tit">区分度: <strong>0.6</strong></span>
                          <span class="exam-info-tit">本校正答率: <strong>85</strong>%</span>
                          <span class="exam-info-tit">考察知识点: <strong>古诗文默写</strong></span>
                      </div>
                      <div class="exam-content-txt">
                          文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                          内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                          容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文
                          言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                          容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                      </div>
                      <div class="exam-content-result">
                          <h2>选项公布</h2>
                          <ul>
                              <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                              <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                              <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                              <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                          </ul>
                      </div>
                      <div class="exam-answers-box">
                            <div class="exam-answers-header">
                                 <h2>答题情况</h2>
                            </div>
                            <div class="exam-info">
                                <span class="exam-info-tit">班级得分: <strong>90</strong>%</span>
                                <span class="exam-info-tit">班级均分: <strong>2</strong>分</span>
                                <span class="exam-info-tit">年纪均分: <strong>85</strong>分</span>
                            </div>
                            <div class="answerLine">
                                <div class="answer">正确答案:<span class="answerWord">A</span></div>
                                <div class="answerOthers">*点击柱状图，可查看学生名单</div>
                            </div>
                            <div class="choosed"  v-for="(item, index) in choosed" :key="index">
                                <histogram class="choosedItem"
                                :title="item.title"
                                :people="item.people"
                                :isTrue="item.isTrue"
                                :percentage="item.percentage"
                                >{{item.title}}</histogram>
                            </div>
                      </div>
                  </div>
              </div>
              <div class="exam-content-box">
                  <div class="exam-header">
                      <h2>本次考试所包含的知识点</h2>
                      <div class="exam-number-list">
                          <a href="javascript:;" class="exam-num cur">1</a>
                          <a href="javascript:;" class="exam-num">2</a>
                          <a href="javascript:;" class="exam-num">3</a>
                          <a href="javascript:;" class="exam-num">4</a>
                          <a href="javascript:;" class="exam-num">5</a>
                          <a href="javascript:;" class="exam-num">6</a>
                      </div>
                  </div>
                  <div class="exam-content">
                      <h2>主观题</h2>
                      <div class="exam-info">
                          <span class="exam-info-tit">难度: <strong>0.6</strong></span>
                          <span class="exam-info-tit">区分度: <strong>0.6</strong></span>
                          <span class="exam-info-tit">本校正答率: <strong>85</strong>%</span>
                          <span class="exam-info-tit">考察知识点: <strong>古诗文默写</strong></span>
                      </div>
                      <div class="exam-content-txt">
                          文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                          内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                          容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文
                          言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                          容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                      </div>
                      <div class="all-public-result">
                        <h2>全市分数公布</h2>
                        <div class="all-public-result-text">

                        </div>
                      </div>
                      <div class="exam-answers-box">
                            <div class="exam-answers-header">
                                 <h2>答题情况</h2>
                            </div>
                            <div class="exam-info">
                                <span class="exam-info-tit">班级得分: <strong>90</strong>%</span>
                                <span class="exam-info-tit">班级均分: <strong>2</strong>分</span>
                                <span class="exam-info-tit">年纪均分: <strong>85</strong>分</span>
                            </div>
                            <div class="exam-answers-number">
                                <a href="" class="exam-answers-num cur">1</a>
                                <a href="" class="exam-answers-num">2</a>
                                <a href="" class="exam-answers-num">3</a>
                                <a href="" class="exam-answers-num">4</a>
                            </div>
                            <div class="answerLine2">
                                <div class="answer">
                                    分数
                                </div>
                                <div class="answerOthers2">*点击柱状图，可查看学生名单</div>
                            </div>
                            <div class="choosed"  v-for="(item, index) in subjectiveGrade" :key="index">
                                <subjective class="choosedItem"
                                :grade="item.grade"
                                :people="item.people"
                                :isTrue="item.isTrue"
                                :percentage="item.percentage"
                                >{{item.title}}</subjective>
                            </div>
                            <div class="exam-answer-right">
                                <h2>正确答案</h2>
                                <div class="exam-answer-right-text">

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
    import HeaderTitle from '@/components/headerTitle/schoolHeaderTitle';
    import histogram from '../components/histogram/histogram.vue'
    import subjective from '../components/subjective/subjective.vue'
    export default {
        name: "SchoolOverallQuality",
        data () {
            return {
              selectShow:true,
              selectList:[
                {name:'成绩总览'},
                {name:'上线统计'}
              ],
              changeactive:0,
              choosed:[{title:"选项A",people:"19",isTrue:"1",percentage:"43%"},
                {title:"选项B",people:"9",isTrue:"0",percentage:"19%"},
                {title:"选项C",people:"9",isTrue:"0",percentage:"19%"},
                {title:"选项D",people:"9",isTrue:"0",percentage:"19%"}],
                clazz:{classScores:'19%',classDivide:'2分',gradeDivide:'3分'},
                subjectiveGrade:[{grade:"4-6",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"2-4",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"0-2",people:"19",isTrue:"1",percentage:"52%"}],
                answerList:[1,2,3,4],
                subjectiveGrade:[{grade:"4-6",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"2-4",people:"9",isTrue:"0",percentage:"24%"},
                {grade:"0-2",people:"19",isTrue:"1",percentage:"52%"}],
            }
        },
        components: {
            HeaderPublic,
            HeaderTitle,
            histogram,
            subjective
        },
        methods: {

        }
    };
</script>


<style lang='stylus' scoped>
.topic-container {
    width: 940px;
    margin: 0 auto;
}
.topic-container .left_select_list {
    margin-top: 20px;
}


  .subject_list_active{
    color:#4B70FF;
    border-bottom:2px solid #4B70FF;
  }
    .subject_list{
      height :50px;
      border-bottom :1px solid #EBEBEB;
    }
  .subject_list span{
    cursor :pointer;
  }
      .subject_list_style{
        display :inline-block;
        line-height :50px;
        text-align :center;
        font-weight :600;
        margin-left :30px;
      }
  .info_list_first{
    width: 1000px;
    height :247px;
    background-color :#ffffff;
    border-radius :6px;
  }

  .option{
    width :176px;
    height :41px;
    text-align :center;
    line-height :41px;
    background-color :#ffffff;
    cursor :pointer;
  }
  .active{
    background-color :#4B70FF;
    color:#ffffff;
  }
  .main{
    display :flex;
    justify-content :space-between;
  }
  .left_select_list{
    width :176px;
    border-radius :6px;
  }
  .score_analysis{
    border-radius :6px;
  }
  .right_info_list{
    width :1000px;
    border-radius :6px;
  }
    .score_analysis_first{
      cursor :pointer;
      height: 41px;
      background-color :#ffffff;
    }

    .score_analysis_first img{
      margin:5px 12px 0px 16px;
    }
  .score_analysis_first span{
    display :inline-block;
    vertical-align :middle;
    margin-top :3px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #383B57;
  }
    .score_analysis_two{
      margin-top :5px;
      width :176px;
      height: 41px;
      background-color :#ffffff;
      border-radius :6px;
      cursor :pointer;
    }
    .score_analysis_two img{
      margin:5px 12px 0px 16px;
    }
  .score_analysis_two span{
    display :inline-block;
    vertical-align :middle;
    margin-top :3px;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #383B57;
  }
  .titleBox {
    margin-bottom: 20px;
    margin-top: 14px;
    line-height :80px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .goBack{
    margin-left :20px;
  }
  button{
    width :72px;
    height :28px;
    border: 1px solid #4B70FF;
    border-radius: 4px;
    margin-left :20px;
  }
  button >span{
    display :inline-block;
    color:#4B70FF;
  }
  .exam_name{
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #383B57;
    vertical-align :middle;
    margin-left :10px;
  }
  .title {
    height: 80px;
    border-radius: 4px;
    background: #ffffff;
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



.exam-class-tabs {
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 #E9E9F2;
    border-radius: 6px;
    margin-top: 20px;
}
.exam-class-tabs .exam-class-tab {
    display: inline-block;
    height: 46px;
    line-height: 46px;
    border-bottom: 4px solid #fff;
    font-size: 16px;
    color: #383B57;
    margin: 0 25px 0 30px;
}
.exam-class-tabs .exam-class-tab.cur {
    border-bottom: 4px solid #4B70FF;
    color: #4B70FF;
    font-size: 18px;
    text-align: center;
}
.exam-content-wrap {
    width: 744px;
}
.exam-content-box {
    margin-top: 14px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 #E9E9F2;
    border-radius: 6px;
    padding: 20px 30px;
}
.exam-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #EBEBEB;
}
.exam-header h2 {
    font-size: 18px;
    color: #383B57;
    line-height: 25px;
}

.exam-number-list {
    padding-bottom 10px;
    padding-top: 10px;
}
.exam-number-list .exam-num {
    display: inline-block;
    height: 36px;
    text-align: center;
    line-height: 34px;
    border: 1px solid #4B70FF;
    border-radius: 6px;
    font-size: 14px;
    color: #333333;
    width: 44px;
    margin: 10px 10px 0 0;
}
.exam-number-list .cur {
    background: #4B70FF;
    color: #fff;
}
.exam-content {
    padding-top: 20px;
}
.exam-content h2 {
    font-size: 18px;
    color: #5F6D91;
    line-height: 25px;
}

.exam-content h2 span {
  font-size: 14px;
  color: #5F6D91;
  vertical-align: bottom;
  padding-left: 10px;
}
.exam-content h2 strong {
  font-size 14px;
  color: #4B70FF;
}
.exam-info {
    padding-top: 6px;
    height: 25px;
}
.exam-info .exam-info-tit {
    font-size: 14px;
    color: #5F6D91;
    line-height: 20px;
    position: relative;
    padding-right: 6px;
}
.exam-info .exam-info-tit:after {
    content: '';
    height: 14px;
    width: 1px;
    background: #5F6D91;
    position: absolute;
    right: 0;
    top: 2px;
}
.exam-info .exam-info-tit:last-child:after {
  width: 0;
}
.exam-info .exam-info-tit strong {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #4B70FF;;
    line-height: 20px;
}
.exam-content-txt {
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 20px;
    color: #333;
}
.exam-content-result {
    margin-bottom: 30px;
}
.exam-content-result h2 {
    font-size: 14px;
    line-height: 20px;
}
.exam-content-result ul {
    counter-reset: count;
}
.exam-content-result li {
    padding-left: 33px;
    line-height: 30px;
    position: relative;
}
.exam-content-result li:before {
    content: counter(count, upper-alpha);
    counter-increment: count;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: #5F6D91;
}
.all-public-result h2 {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5F6D91;
}
.all-public-result-text {
    background: #ECEFF5;
    border-radius: 6px;
    height: 140px;
    margin-top: 10px;
}
.exam-answers-box {
    padding-top: 20px;
}
.exam-answers-header h2 {
    color: #5F6D91;
}
.exam-answers-box .exam-info .exam-info-tit {
    font-size: 12px;
    line-height: 25px;
}
.exam-answers-box .exam-info .exam-info-tit strong {
    line-height: 17px;
    font-size: 18px;
}
.exam-answers-box .exam-info .exam-info-tit:after {
    top: -1px;
}
.exam-answers-number {
    padding: 19px 0;
}
.exam-answers-number .exam-answers-num {
    display: inline-block;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 12px;
    background: #A2AFCD;
    border-radius: 6px;
    color: #fff;
}
.exam-answers-number .exam-answers-num.cur {
    background: #4B70FF;
}
.exam-answer-right {
    padding-top: 33px;
}
.exam-answer-right h2 {
    font-size: 12px;
    color: #5F6D91;
    line-height: 17px;
}
.exam-answer-right-text {
    background: #ECEFF5;
    border-radius: 6px;
    height: 100px;
    margin-top: 8px;
}
.answerLine{
    width: 494px;
    margin-top: 29px;
    overflow: hidden;
}
.answer{
    font-family: PingFangSC-Semibold;
    font-size: 12px;
    color: #5F6D91;
    float: left;
}
.answerWord {
    font-size: 18px;
    color: #4B70FF;
    padding-left: 8px;
    vertical-align: -1px;
}
.answerOthers{
    text-align: right;
    font-family: PingFangSC-Regular;
    margin-top: 6px;
    font-size: 12px;
    color: #A2AFCD;
}
.choosed{
    margin-top:10px;
    font-family: PingFangSC-Medium;
    font-size: 15px;
    /* color: #FFFFFF; */
}
.choosedItem{
    margin-top:10px;
}
.answerLine2{
    width: 494px;
    margin-top: 22px;
    margin-left: 2px;
    overflow: hidden;
}
.answerOthers2{
    text-align: right;
    font-family: PingFangSC-Regular;
    margin-top: 0px;
    font-size: 12px;
    color: #A2AFCD;
}
</style>
<style>
body {
    height: auto;
}
</style>

