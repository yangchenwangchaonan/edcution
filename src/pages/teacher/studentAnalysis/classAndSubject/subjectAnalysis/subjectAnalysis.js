import ClassAndSubjectTabs from '../common/classAndSubjectTabs.vue';
import Anchor from '@/components/anchor/anchor.vue';
import ModalFraction from './modal/fraction.vue'
import ModalWeak from './modal/weak.vue'
export default {
    components: {
      ClassAndSubjectTabs,
      Anchor,
      ModalFraction,
      ModalWeak,
    },
    data() {
      return {
          // 右側
          anchorActive: '',
          anchorTitle: '学生分析',
          anchorList: [{
                  label: '学生上线统计',
                  value: 'classAnalysisTrend'
              },
              {
                  label: '不稳定学生情况',
                  value: 'classAnalysisCompair'
              }
          ],
        item:{},
        gridSitulation:[],
        tabs: [],
        activeValue: '1',
        countIndex:"全科",
        echarData:[],
        // 考试次数
        batch_times:"",
        // 小tab文字层
        counts:[],
        // 数组套两个数组
        unstable_student_info_list:[],
        // tab下的描述
        desc:"",
        grid:[],
        subject_id:"",
        };
    },
    methods:{
        tabClick(ele, index){
            this.countIndex=ele.label
      },
      handleInfo () {
        alert()
      },
       // 渲染信息
       handleMessage() {
        let teacher = JSON.parse(sessionStorage.getItem('teacher')) //登录session数据
        let class_id = teacher[0].class_id
        let subject_id =teacher[0].subject_id
        this.subject_id = JSON.stringify(subject_id)
        this.axios.get('/class/'+class_id+'/subject/'+subject_id+'/class_subject_analysis?debug=true')
            .then((res) => {
                console.log(res)
                if (res.data.code === 0) {
                    // 学生上线次数统计
                    let arr = []
                    let data =res.data.data
                    for (let i=0; i<data.major_online_info_list.length; i++) {
                        arr.push({name:data.major_online_info_list[i].online_desc+"      "+data.major_online_info_list[i].online_count+"人",value:data.major_online_info_list[i].online_count})
                    }
                    this.echarData = arr
                    
                    let sum = 0
                    for (let i=0; i<data.major_online_info_list.length; i++) {
                        sum+=data.major_online_info_list[i].online_count
                    }
                    this.allCount= sum
                    // 考试次数
                    this.batch_times=data.batch_times
                    // 不稳定学生情况
                    this.counts=data.unstable_major_title_list

                    this.grid = data.unstable_student_info_list

                    this.tabBotInfo = data.unstable_major_desc_list

                    this.desc = this.tabBotInfo[0]

                    this.gridSitulation = this.grid[0]
                    // this.grid=data.unstable_student_info_list[0]
                    this.init();
                    //饼状图    
                    this.initCircle();
                }
                
            })
            .catch((err) => {
            console.log(err);
            })
    },
       
           
           
        
       // 渲染科目
       handleSubjects() {
        this.axios.get('study_analysis_subject_list?debug=true')
            .then((res) => {
                console.log(res)
            if (res.data.code === 0) {
                this.tabs = res.data.data.subject_info_list
            }
            })
            .catch((err) => {
            console.log(err);
            })
        },
      init(){
        // if(this.tabs && this.tabs.length > 0){
        //   this.item = this.tabs[0];
        // }
        // this.grid.forEach((oneGrid)=>{
        //   oneGrid.forEach((ele) => {
        //     let count = ele.weakKnowledge.length - 23;
        //     ele.weakKnowledge = ele.weakKnowledge.substring(0,23).concat("...").concat("<span class='etable-count'>").concat("(").concat(count).concat("个)").concat("</span>");
        //     ele.weakKnowledge = '<div class="etable-column-content">'.concat(ele.weakKnowledge).concat('</div>').concat('<a class="etable-column-a" onclick="handleInfo()">查看详细情况</a>')
        //   })
        // })
        // this.gridSitulation = this.grid[0];
      },
      initCircle(){
        var dom = document.querySelector(".echart-circle");
        var myChart = this.$echarts.init(dom);
        var app = {};
        let option = null;
        app.title = '环形图';

        option = {
            // tooltip: {
            //     // trigger: 'item',
            //     // formatter: "{a} <br/>{b}: {c} ({d}%)"
            // },
            legend: {
                icon:'circle',
                orient: 'vertical',
	              itemGap: 15,
                x: '553px',
                y: 'center',
                textStyle:{
                  fontFamily: 'PingFangSC-Regular',
                  fontSize: 14,
                  color: '#A2AFCD',
                },
                // data:[this.echarData[0].name,this.echarData[1].name,this.echarData[2].name]
            },
            graphic: [{
            type:'text',
            left:'center',
            top:'42%',
            style:{
                text:this.allCount,
                fill:'#5F6D91',
                fontSize:'24',
            }
        },{
            type:'text',
            left:'center',
            top:'55%',
            style:{
                text:'累计上线人数',
                fill:'#5F6D91',
                fontSize:'14',
            }
        }],
            series: [
                {
                    name:'上线分类',
                    type:'pie',
                    radius: ['57%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'left'
                        },
                        emphasis: {
                          show: false,
                            textStyle: {
                              fontFamily: 'PingFangSC-Regular',
                              fontSize: '24px',
                              color: '#383B57',
                              textAlign: 'center',
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
                    color:["#4B70FF","#FFC95D","#FF8937","#FF8937","#A2AFCD"],
                    data:this.echarData,
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
      },
        // 不稳定学生情况tab切换   
        confirm(count){
            this.gridSitulation = this.grid[count];
            this.desc = this. tabBotInfo[count]
        },
        handleModal(a){
            this.$refs.pap.handleVisible(a)
        },
    },

    mounted(){
        this.handleMessage()
        this.handleSubjects()
            const $classAnalysisTrend = this.$refs.classAnalysisTrend;
            const $classAnalysisCompair = this.$refs.classAnalysisCompair;
        window.addEventListener('scroll', e => {
            const scrollY = window.scrollY;
            const winHeight = window.innerHeight;
            const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
            const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;

            if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
            this.anchorActive = 'classAnalysisTrend';
            return;
            }

            if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 200) {
            this.anchorActive = 'classAnalysisCompair';
            return;
            }

            this.anchorActive = '';

        });
    }
}