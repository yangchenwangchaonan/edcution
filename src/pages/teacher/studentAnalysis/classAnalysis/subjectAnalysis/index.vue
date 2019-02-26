<template>
  <div class="subjectAnalysis">
    <ClassAndSubjectTabs v-model="activeValue" :tabs="tabs" @tabClick="tabClick"></ClassAndSubjectTabs>
    <div class="subjectAnalysis-panel-one">
      <!-- <h1>学科分析</h1> -->
      <div class="subjectAnalysis-panel-one-title">学生上线次数统计</div>
      <div class="subjectAnalysis-panel-one-description">根据本学期4次考试情况，可以找出上线不稳定但具备上线潜力的学生</div>
      <div class="subjectAnalysis-panel-one-chart">
        <div class="echart-circle">
          <!-- <el-progress :width="126" color="#4B70FF" type="circle" :percentage="item.difficultyDegree * 100" status="text">{{item.difficultyDegree}}</el-progress> -->
        </div>
         <!-- <div class="subjectAnalysis-panel-one-data-text">累计上线人数</div> -->
      </div>
    </div>
    <div class="subjectAnalysis-panel-two">
      <div class="subjectAnalysis-panel-two-instability-students-situation">
        <div class="subjectAnalysis-panel-two-instability-students">
          <div class="subjectAnalysis-panel-two-students">
              不稳定学生情况
          </div>
        </div>
        <div class="subjectAnalysis-panel-two-online-counts">
          <el-button plain>上线7~6次</el-button>  
          <el-button plain>上线5~4次</el-button> 
        </div>
      </div>
      <div class="subjectAnalysis-panel-two-description">6次考试中，有2次没上线的学生各科未上线情况</div>
      <div class="subjectAnalysis-panel-two-chart">表格</div>
    </div>
  </div>
</template>
<script>
import ClassAndSubjectTabs from '../common/classAndSubjectTabs.vue';

export default {
    components: {
      ClassAndSubjectTabs
    },
    data() {
      return {
        item:{},
        tabs: [
          {
            label: '全科',
            value: '1',
            main: false,
            difficultyDegree:0.48,
            all_stable:8,
            stable_7_6:8,
            stable_5_4:8,
            stable_3_2:8,
            stable_1:8,
          },
          {
            label: '语文',
            value: '2',
            main: true,
            difficultyDegree:0.10,
            all_stable:7,
            stable_7_6:7,
            stable_5_4:7,
            stable_3_2:7,
            stable_1:7,
          },
          {
            label: '数学',
            value: '3',
            main: false,
            difficultyDegree:0.35,
            all_stable:6,
            stable_7_6:6,
            stable_5_4:6,
            stable_3_2:6,
            stable_1:6,
          }
        ],
        activeValue: '1',
        };
    },
    methods:{
      tabClick(ele, index){
        this.item = this.tabs[ele.value-1];
        // item
      },
      init(){
        if(!!this.tabs && this.tabs.length > 0){
          this.item = this.tabs[0];
        }
      },
      initCircle(){
        var dom = document.querySelector(".echart-circle");
        var myChart = this.$echarts.init(dom);
        var app = {};
        let option = null;
        app.title = '环形图';

        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                icon:'circle',
                orient: 'vertical',
                x: '400px',
                y: 'center',
                data:['稳定上线','上线7~6次','上线5~4次','上线3~2次','只上线1次']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['55%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                // fontSize: '30',
                                // fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'稳定上线'},
                        {value:310, name:'上线7~6次'},
                        {value:234, name:'上线5~4次'},
                        {value:135, name:'上线3~2次'},
                        {value:1548, name:'只上线1次'}
                    ]
                }
            ]
        };
        ;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
      }
    },
    created(){
      this.init();
    },
    mounted(){
      this.initCircle();
    }
}
</script>
<style>
  .el-button+.el-button {
      margin-left: -5px;
  }
  .el-button{
    width:108px;
    height:32px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    /* color: #4B70FF; */
    letter-spacing: 0;
    text-align: center;
    /* border-radius: 0; */
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    line-height: 0;
  }
  .el-button.is-plain:focus, .el-button.is-plain:hover{
    background: #FFFFFF;
    border: 1px solid #4B70FF;
  }
</style>

<style scoped src="./subjectAnalysis.css"></style>
