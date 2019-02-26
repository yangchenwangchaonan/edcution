<!--by gj-->
<template>
  <div>
      <header-public :url_index=url_index></header-public>
      <div class="container" v-cloak>
          <header-title></header-title>
          <div class="exam_content">
              <!--左侧菜单-->
              <div class="left_select_list">
                <left-nav></left-nav>
              </div>
              <!--右侧内容-->
              <div class="right_info_list">
                  <div class="info_list_first">
                    <div class="subject_list">
            <span :span="2" v-for="(item,index) in subjectList" :key="index" class="subject_list_style"
                  :class="{subject_list_active:subjectActive == index}" @click="subjectChange(item,index)"><span>{{item}}</span></span>
                    </div>
                  </div>
                  <div class="subject_list_box">
                      <!--试题图表及部分-->
                      <div class="summary">
                          <div class="diagram_box">
                              <div class="pieDiagramBox">
                                  <div id="pieDiagram_1" class="pieDiagram"></div>
                                  <div class="title">试卷难度</div>
                              </div>

                              <div id="barChart" class="barChart">
                              </div>
                              <div class="pieDiagramBox">
                                  <div id="pieDiagram_2" class="pieDiagram"></div>
                                  <div class="title">区分度</div>
                              </div>

                          </div>
                          <div class="summary_info">

                              本学科试卷共 <span>{{abstract_info['question_number']}}</span> 道题，主观题 <span> {{abstract_info['subject_question_number']}} </span> 道，分值占比 <span> {{abstract_info['subjective_question_percent']}}%</span>，客观题 <span>{{abstract_info['objective_question_number']}} </span> 道，分值占比 <span>{{abstract_info['objective_question_percent']}}%</span>；学科总分 <span>{{abstract_info['total_score']}}</span>。
                          </div>
                      </div>
                      <!--试题内容-->
                      <div class="exam-content-wrap"  id="classAnalysisTrend" ref="classAnalysisTrend">
                          <div class="exam-content-box">
                              <div class="exam-header">
                                  <h2>本次考试所包含的知识点</h2>
                                  <div class="exam-number-list">
                                      <a v-for="(item, index) in knowledgeList" :key="index" href="javascript:;" class="exam-num" :class="item.cls" @click="handleKnowledgeList(index)">{{item.knowledge_name}}</a>
                                  </div>
                              </div>
                              <div class="exam-content">
                                  <h2><span class="title">古诗文默写</span><span>总分: <strong>12</strong></span><span>分数占比: <strong>17%</strong></span></h2>
                                  <div class="exam-info">
                                      <span class="exam-info-tit">第一题</span>
                                      <span class="exam-info-tit">题型: 选择题</span>
                                      <span class="exam-info-tit">难度: <strong>0.6</strong></span>
                                      <span class="exam-info-tit">区分度: <strong>0.6</strong></span>
                                      <span class="exam-info-tit">全市正答率: <strong>85</strong>%</span>
                                      <span class="exam-info-tit">本校正答率: <strong>85</strong>%</span>
                                  </div>
                                  <div class="exam-content-txt">
                                      文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                                      内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                                      容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文
                                      <br>
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
                              </div>
                          </div>
                      </div>
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
  import HeaderPublic from "@/components/header";
  import HeaderTitle from '@/components/headerTitle/schoolHeaderTitle';
  import leftNav from "../components/leftNav"
  import Anchor from '@/components/anchor/anchor.vue';
  export default {
    name: "generalPandect",
    components: {
      HeaderPublic,
      HeaderTitle,
      leftNav,
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
            ],
        url_index: 1,   //header下标
        responseInfo: "",
        examInfo: '',
        selectShow: true,
        selectShowTwo: false,
        selectList: [
          {name: '成绩总览'},
          {name: '上线分析'}
        ],
        selectListTwo: [
          {name: '整体质量'},
          {name: "小题质量"}
        ],
        changeactive: 0,
        subjectList: ['全科', "语文", "数学", "英语", "物理", "化学", "生物"],
        current_subject: "总分",
        current_subject_index: 0,
        subjectActive: 0,
        total_points_height_title: ['名次', '学校', '最高分'],
        total_points_height: [
          {ranking: "1", school_name: '第一中学', height_score: "689"},
          {ranking: "2", school_name: '第二中学', height_score: "689"},
          {ranking: "3", school_name: '师大附中', height_score: "689"},
          {ranking: "4", school_name: '人大附中', height_score: "689"},
          {ranking: "5", school_name: '通州分校', height_score: "689"},
          {ranking: "6", school_name: '海淀分校', height_score: "689"},
          {ranking: "7", school_name: '大兴分校', height_score: "689"}
        ],
        total_points_top100_title: ['名次', '学校', '人数'],
        total_points_top100: [
          {ranking: "1", school_name: '第一中学', number: "689"},
          {ranking: "2", school_name: '第二中学', number: "689"},
          {ranking: "3", school_name: '师大附中', number: "689"},
          {ranking: "4", school_name: '人大附中', number: "689"},
          {ranking: "5", school_name: '通州分校', number: "689"},
          {ranking: "6", school_name: '海淀分校', number: "689"},
          {ranking: "7", school_name: '大兴分校', number: "689"}
        ],
        subsection_btn_list: ["前20%", "20%-40%", "40%-60%", "60%-80%", "后20%"],
        border_active_index: 0,
        school_id: 0,
        batch_id: 0,
        subject_id: 0,
        abstract_info: {},
        knowledgeList: []
      }
    },
    mounted() {
      this.examInfo = this.$route.query;
      // 顶部三个图： 试卷难度, 区分度，难度分布
      this.get_brief_info();

      // 获取全量知识点
      this.get_knowledge_list();
        const $classAnalysisTrend = this.$refs.classAnalysisTrend;
    window.addEventListener('scroll', e => {
        const scrollY = window.scrollY;
        const winHeight = window.innerHeight;
        const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
      if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
        this.anchorActive = 'classAnalysisTrend';
        return;
      }
      this.anchorActive = '';

    });
    },
    methods: {
      get_knowledge_list() {
      //TODO: 参数要正确
        let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_knowledges?debug=true";
        this.axios.get(url)
        .then(response => {
          const knowledges = response.data.data.knowledges;
          for (let i = 0, len = knowledges.length; i < len; i++) {
            const item = knowledges[i];
            item.cls = i === 0 ? 'cur' : '';
            this.$set(this.knowledgeList, i, item);
          }
          //this.knowledgeList = response.data.data.knowledges;
        }).catch(
          error => {
            console.log(error);
          });
      },
      handleKnowledgeList(index) {
        for (let i = 0, len = this.knowledgeList.length; i < len; i++) {
            const item = this.knowledgeList[i];
            item.cls = i === index ? 'cur' : '';
            this.$set(this.knowledgeList, i, item);
          }
      },
      get_brief_info() {
        let url = "/school/" + this.school_id + "/batch/" + this.batch_id + "/subject/" + this.subject_id + "/subject_school_paper_difficult?debug=true";
        this.axios.get(url)
        .then(response => {
          //console.log(response.data.data);
          this.initPieChart(response.data.data.difficulty,
                            response.data.data.discrimination);
          this.initBarChart(response.data.data.difficulty_percent);

          this.abstract_info["question_number"] = response.data.data.all_question_nums;
          this.abstract_info["subjective_question_number"] = response.data.data.subjective_question_nums;
          this.abstract_info["subjective_question_percent"] = response.data.data.subjective_question_percent;
          this.abstract_info["objective_question_number"] = response.data.data.object_question_nums;
          this.abstract_info["objective_question_percent"] = response.data.data.object_question_percent;
          this.abstract_info["total_score"] = response.data.data.all_socre;
        }).catch(
          error => {
            console.log(error);
          });
      },
      // 成绩分析
      controlSelect() {
        this.selectShow = !this.selectShow;
      },
      //试题质量
      test_quality() {
        this.selectShowTwo = !this.selectShowTwo;
      },
      // 下拉菜单切换跳转
      changeSelect(index) {
        this.changeactive = index;
        if (index == 1) {
          this.$router.push({
            path: "/eduBureau/achievementAnalysis/onlineAnalysis",
            query: {
              grade: this.examInfo.grade,
              academic: this.examInfo.academic,
              examName: this.examInfo.examName,
              examTime: this.examInfo.examTime,
              subject: this.examInfo.subject
            }
          });
        }
      },
      // 试题质量跳转
      goToPage(index) {
        if (index == 0) {
          this.$router.push({
            path: "/eduBureau",
            query: {
              grade: this.examInfo.grade,
              academic: this.examInfo.academic,
              examName: this.examInfo.examName,
              examTime: this.examInfo.examTime,
              subject: this.examInfo.subject
            }
          });
        } else {
          this.$router.push({
            path: "",
            query: {
              grade: this.examInfo.grade,
              academic: this.examInfo.academic,
              examName: this.examInfo.examName,
              examTime: this.examInfo.examTime,
              subject: this.examInfo.subject
            }
          });
        }
      },
      // 学科切换
      subjectChange(item, index) {
        this.subjectActive = index;
        if (index == 0) {
          this.current_subject = "总分"
        } else {
          this.current_subject = item;
        }
        this.current_subject_index = index;
      },
      border_active(index) {
        this.border_active_index = index;
      },

      initPieChart(difficulty, discrimination, ratios) {
        var self = this;

        function PercentPie(option) {
          this.backgroundColor = option.backgroundColor || '#fff';
          this.color = option.color || ['#38a8da', '#d4effa'];
          this.fontSize = option.fontSize || 12;
          this.domEle = option.domEle;
          this.value = option.value;
          this.name = option.name;
          this.title = option.title;
        }
        PercentPie.prototype.init = function () {
          var _that = this;
          var option = {
            backgroundColor: _that.backgroundColor,
            color: _that.color,
            title: {
              text: _that.title,
              top: '3%',
              left: '1%',
              textStyle: {
                color: '#000',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontFamily: 'sans-serif',
                fontSize: 16,
              }
            },
            series: [{
              name: '来源',
              type: 'pie',
              radius: ['60%', '75%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                  textStyle: {
                    fontSize: _that.fontSize,
                    color: '#000'
                  },
                  //formatter: '{b}\n{c}%'
                  formatter: '{b}'
                }
              },
              data: [{
                value: _that.value,
                name: _that.name,
                label: {
                  normal: {
                    show: true
                  }
                }
              },
                {
                  value: 100 - _that.value,
                  name: ''
                }
              ]
            }]
          };

          self.$echarts.init(_that.domEle).setOption(option);
        };

        var option1 = {
          value: difficulty * 100,//百分比,必填
          name: difficulty,//必填
          title: '',
          backgroundColor: null,
          color: ['#4B70FF', 'rgba(162,175,205,0.10)'],
          fontSize: 30,
          domEle: document.getElementById("pieDiagram_1")//必填
        };
        var percentPie1 = new PercentPie(option1);
        percentPie1.init();

        var option2 = {
          value: discrimination * 100,//百分比,必填
          name: discrimination,//必填
          title: '',
          backgroundColor: null,
          color: ['#4B70FF', 'rgba(162,175,205,0.10)'],
          fontSize: 30,
          domEle: document.getElementById("pieDiagram_2")//必填
        };
        var percentPie2 = new PercentPie(option2);
        percentPie2.init();
      },
      initBarChart(difficulty_percent) {
        let items = difficulty_percent.split(':');
        let easy = parseInt(items[0]);
        let medium = parseInt(items[1]);
        let hard = parseInt(items[2]);

        var option = {
          tooltip: {},
          color: ['#F5535B', '#FFDD73', '#4B70FF', '#FF8096', '#800080'],
          title: {
            text: '难度比例',
            textStyle: {
              fontWeight: 'normal',
              fontSize: 14,
              color: '#5F6D91'
            },
            left: '56px',
            bottom: 20
          },
          legend: {
            bottom: -5,
            data: [{
              name: '易',
              icon: 'circle'
            }, {
              name: '中',
              icon: 'circle'
            }, {
              name: '难',
              icon: 'circle'
            }]
          },
          grid: {
            top: '40px',
            containLabel: false
          },
          xAxis: [
            {
              show: false,
              type: 'category',
              data: ['难度比例']
            }
          ],
          yAxis: [
            {
              show: false,
              type: 'value'
            }
          ],
          series: [
            {
              name: '易',
              type: 'bar',
              stack: '难度',
              data: [{
                name: '易',
                value: easy,
                label: {
                  show: true,
                  position: 'right'
                }
              }],
              barWidth: '48px',
              maxBarWidth: '48px'
            },
            {
              name: '中',
              type: 'bar',
              stack: '难度',
              data: [{
                value: medium,
                label: {
                  show: true,
                  position: 'right'
                }
              }]
            },
            {
              name: '难',
              type: 'bar',
              stack: '难度',
              data: [{
                value: hard,
                label: {
                  show: true,
                  position: 'right'
                }
              }]
            },
          ]
        };
        this.$echarts.init(document.getElementById("barChart")).setOption(option);
      }
    }
  };
</script>

<style type="stylus" scoped>
  /*first---------------------------------*/
  .school_number {
    line-height: 41px;
    color: #A2AFCD;
  }

  .school_number label {
    margin-left: 10px;
  }

  .score_info {
    height: 152px;
    border-bottom: 1px solid #EBEBEB;
    display: flex;
    justify-content: space-between;
  }

  .score_info_list {
    width: 250px;
    text-align: center;
  }

  .info_score {
    height: 80px;
    margin-top: 35px;
    border-right: 2px dashed #EBEBEB;
  }

  .info_score.no-bdr {
    border-right: none;
  }

  .info_score .mark {
    font-size: 12px;
    color: #5F6D91;
    text-align: center;
    background-color: rgba(162, 175, 205, 0.2);
    padding: 5px 20px;
    border-radius: 20px;
    margin-top: 5px;
  }

  .info_score span {
    font-size: 14px;
    color: #A2AFCD;
    text-align: center;
    display: inline-block;
    margin: 15px 0px;
  }

  .info_score b {
    font-size: 30px;
    color: #000000;
    text-align: center;
  }

  .subject_list_active {
    color: #4B70FF;
    border-bottom: 4px solid #4B70FF;
  }

  .subject_list {
    height: 50px;
    border-bottom: 1px solid #EBEBEB;
  }

  .subject_list span {
    cursor: pointer;
  }

  .subject_list_style {
    display: inline-block;
    line-height: 48px;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin: 0px 26px 0 30px;
  }

  .subject_list_box {

  }

  .subject_list_box .diagram_box {
    height: 290px;
    display: flex;
    justify-content: space-around;
    /*align-items: center;*/
    background-color: #ffffff;
    padding-top: 20px;
    box-sizing: border-box;
  }

  .subject_list_box .diagram_box .pieDiagram {
    width: 180px;
    height: 180px;
  }

  .subject_list_box .pieDiagramBox .title {
    font-size: 14px;
    color: #5F6D91;
    text-align: center;
  }

  .summary_info {
    border-top: 1px solid #EBEBEB;
    font-size: 14px;
    color: #5F6D91;
    background-color: #ffffff;
    padding: 13px 30px;
  }

  .summary_info span {
    font-size: 18px;
    color: #4b5674;
    text-align: center;
    line-height: 20px;
  }

  .subject_list_box .diagram_box .barChart {
    width: 180px;
    height: 230px;
    margin-top: -10px;
  }

  .info_list_first {
    width: 744px;
    background-color: #ffffff;
    border-radius: 6px;
  }

  .option {
    width: 176px;
    height: 41px;
    text-align: center;
    line-height: 41px;
    background-color: #ffffff;
    cursor: pointer;
  }

  .active {
    background-color: #4B70FF;
    color: #ffffff;
  }

  .exam_content {
    width: 940px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }

  .left_select_list {
    width: 176px;
    border-radius: 6px;
  }

  .score_analysis {
    border-radius: 6px;
  }

  .right_info_list {
    width: 744px;
    border-radius: 6px;
  }

  .score_analysis_first {
    cursor: pointer;
    height: 41px;
    background-color: #ffffff;
  }

  .score_analysis_first img {
    margin: 5px 12px 0px 16px;
  }

  .score_analysis_first span {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
    font-size: 16px;
    color: #383B57;
  }

  .score_analysis_two {
    margin-top: 5px;
    width: 176px;
    height: 41px;
    background-color: #ffffff;
    border-radius: 6px;
    cursor: pointer;
  }

  .score_analysis_two img {
    margin: 5px 12px 0px 16px;
  }

  .score_analysis_two span {
    display: inline-block;
    vertical-align: middle;
    margin-top: 3px;
    font-size: 16px;
    color: #383B57;
  }

  .titleBox {
    margin-bottom: 20px;
    margin-top: 14px;
    line-height: 80px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .goBack {
    margin-left: 20px;
  }

  button {
    width: 72px;
    height: 28px;
    border: 1px solid #4B70FF;
    border-radius: 4px;
    margin-left: 20px;
  }

  button > span {
    display: inline-block;
    color: #4B70FF;
  }

  .exam_name {
    font-size: 18px;
    color: #383B57;
    vertical-align: middle;
    margin-left: 10px;
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
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .exam-number-list .exam-num {
    display: inline-block;
    height: 34px;
    text-align: center;
    line-height: 34px;
    border: 1px solid #4B70FF;
    border-radius: 6px;
    font-size: 14px;
    color: #333333;
    padding: 0 20px;
    margin: 10px 24px 0 0;
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
    padding-right: 10px;
  }

  .exam-content h2 span.title {
    font-size: 18px;
    color: #5F6D91;
  }

  .exam-content h2 strong {
    font-size: 14px;
    color: #4B70FF;
  }

  .exam-info {
    padding-top: 6px;
    height: 25px;

  }

  .exam-info .exam-info-tit {
    font-size: 14px;
    color: #5F6D91;
    line-height: 16px;
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
    color: #4B70FF;
    line-height: 20px;
    font-size: 18px;
  }

  .exam-content-txt {
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    line-height: 1.5;
  }

  .exam-content-result h2 {
    font-size: 14px;
    line-height: 20px;
  }

  .exam-content-result ul {
    counter-reset: count;
    margin-top: 5px;
    /* counter-increment: count; */
  }

  .exam-content-result li {
    padding-left: 26px;
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
    font-size: 14px;
    color: #5F6D91;
  }

  .all-public-result-text {
    background: #ECEFF5;
    border-radius: 6px;
    height: 140px;
    margin-top: 10px;
  }
</style>
