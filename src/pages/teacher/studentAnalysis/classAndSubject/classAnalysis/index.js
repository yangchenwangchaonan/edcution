import ClassAndSubjectTabs from '../common/classAndSubjectTabs.vue';
import Anchor from '@/components/anchor/anchor.vue';
let arr = []
let tabSubject=""
export default {
  components: {
    ClassAndSubjectTabs,
    Anchor
  },
    data() {
        return {
            // 右側
            anchorActive: '',
            anchorTitle: '班级总体分析',
            anchorList: [{
                    label: '上线率趋势',
                    value: 'classAnalysisTrend'
                },
                {
                    label: '超均率趋势对比',
                    value: 'classAnalysisCompair'
                },
                {
                    label: '学科对比',
                    value: 'classAnalysisSubjectsCompair'
                },
            ],
            //成绩总览 
            info: [{
                    label: '高于年级上线率次数',
                    num: ""
                },
                {
                    label: '高于年级均分次数',
                    num: ""
                },
                {
                    label: '累计上线人数',
                    num: ""
                },
                {
                    label: '稳定上线人数',
                    num: ""
                },
            ],
            activeValue: '1',
            examTime: 4,
            classmatesNum: 52,
            onlineRate: {
                    tooltip: {
                        formatter: function (params) {
                            let result =  '<div class="onlineRate-tooltip classAnalysis-tooltip">'
                                result +='<p class="classAnalysis-tooltip-title">'+params[0].axisValue+'</p>'
                            for (let i = 0; i < params.length; i++) {
                                result +=
                                        '<p>' + params[i].seriesName + ':'+params[i].data+'%</p>'      
                            }
                            if (tabSubject=="全科") {
                            result +='<p>低于上线率学科：'+arr[params[0].dataIndex]+'</p>' 
                            }  
                            result +='</div>'
                            return result;
                        },
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'none'
                },
                toolbox: {
                    show : true,
                },
                calculable : true,
                xAxis: {
                    type: 'category',
                    name: '考试',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14
                    },
                    data: [],
                    axisLine: {
                        show: false,
                        color: 'rgb(236,239,245)',
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        rotate: 35,
                        margin: 35,
                        align: 'center'
                    }
                },
                yAxis: {
                    name: '上线率',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        padding: [0, 60, 0, 0],
                        align: 'left'
                    },
                    nameGap: 32,
                    type: 'value',
                    min: 0,
                    max: 100,
                    interval: 25,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 49,
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        align: 'left'
                    }
                },
                    animationEasing: 'quadraticOut',
                    color: ['#4B70FF', '#FF8937', '#4E65A0', '#A2AFCD', '#F8BD46'],
                    legend: {
                        x: 'right',y:"top",icon: "circle", itemWidth: 16,itemHeight: 16,
                        data: ['班级上线率趋势', '年级上线率趋势'],
                    },
                    series: [{
                        name: '班级上线率趋势',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        data: [],
                        lineStyle: {
                        width: 4
                        }
                    },
                    {
                        name: '年级上线率趋势',
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        data: [],
                        lineStyle: {
                        width: 4
                        }
                    }
                    ]
                },
                onlineRate1: {
                    tooltip: {
                formatter: function (params) {
                        let result =  '<div class="onlineRate-tooltip classAnalysis-tooltip">'
                            result +='<p class="classAnalysis-tooltip-title">'+params[0].axisValue+'</p>'
                        for (let i = 0; i < params.length; i++) {
                            result +=
                                    '<p>' + params[i].seriesName + ':'+params[i].data+'%</p>'      
                        } 
                        result +='</div>'
                        return result;
                    },
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'none'
                },
                toolbox: {
                    show : true,
                },
                calculable : true,
                xAxis: {
                    type: 'category',
                    name: '考试',
                    nameLocation:'center',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        padding: [0,0,0,560],
                    },
                    data: [],
                    axisLine: {
                        show: false,
                        color: 'rgb(236,239,245)',
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        rotate: 35,
                        margin: 35,
                        align: 'center'
                    }
                },
                yAxis: {
                    name: '超均率',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        padding: [0, 60, 0, 0],
                        align: 'left'
                    },
                    type: 'value',
                    min: -20,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 49,
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        align: 'left'
                    }
                },
                    color:['#4B70FF', '#FF8937', '#4E65A0', '#A2AFCD', '#F8BD46'],
                    legend:"",
                    animationEasing: 'quadraticOut',
                    series: [],
                },
                onlineRate2: {
                    tooltip: {
                formatter: function (params) {
                        let result =  '<div class="onlineRate-tooltip classAnalysis-tooltip">'
                            result +='<p class="classAnalysis-tooltip-title">'+params[0].axisValue+'</p>'
                        for (let i = 0; i < params.length; i++) {
                            result +=
                                    '<p>' + params[i].seriesName + ':'+params[i].data+'%</p>'      
                        } 
                        result +='</div>'
                        return result;
                    },
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    backgroundColor: 'none'
                },
                toolbox: {
                    show : true,
                },
                calculable : true,
                xAxis: {
                    type: 'category',
                    name: '考试',
                    nameLocation:'center',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        padding: [0,0,0,560],
                    },
                    data: [],
                    axisLine: {
                        show: false,
                        color: 'rgb(236,239,245)',
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        rotate: 35,
                        margin: 35,
                        align: 'center'
                    }
                },
                yAxis: {
                    name: '上线率',
                    nameTextStyle: {
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        padding: [0, 60, 0, 0],
                        align: 'left'
                    },
                    type: 'value',
                    min: 0,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 49,
                        color: 'rgb(96,110,144)',
                        fontSize: 14,
                        align: 'left'
                    }
                },
                    color:['#4B70FF', '#FF8937', '#4E65A0', '#A2AFCD', '#F8BD46'],
                    legend:"",
                    animationEasing: 'quadraticOut',
                    series: [],
                },
                //学科
                tabs: [], 
                // 首次渲染数据
                detail:[],
                // 本学期累计考试次数
                batch_times:"",
                // 二级导航切换班级
                class_info_list:[],
                // tab学科
                tabSubject:"全科",
                // 未上线学科
                offline_subject_trend_list:[],
                // table 低于年级上线率
                tableData: [],
                // lower_grade_info_subject_list
                lower_grade_info_subject_list:[],
                //累计薄弱知识点
                weak_knowledge_info:[],
                // 小导航
                weak_tab:["所有薄弱知识点","低于年级水平知识点"],
                weak_index:0,
                // 学科id
                subject_id:"",
            };
    },

  mounted() {
    //首次渲染
    this.handleClassAnalysis()
    // 首次渲染  科目
    this.handleSubjects()
    // 图表
        const $classAnalysisTrend = this.$refs.classAnalysisTrend;
        const $classAnalysisCompair = this.$refs.classAnalysisCompair;
        const $classAnalysisSubjectsCompair = this.$refs.classAnalysisSubjectsCompair;
        const $classAnalysisWeakPoint = this.$refs.classAnalysisWeakPoint;
    window.addEventListener('scroll', e => {
        const scrollY = window.scrollY;
        const winHeight = window.innerHeight;
        const classAnalysisTrendHeight = $classAnalysisTrend.offsetTop + $classAnalysisTrend.offsetHeight;
        const classAnalysisCompairHeight = $classAnalysisCompair.offsetTop + $classAnalysisCompair.offsetHeight;
        const classAnalysisSubjectsCompairHeight = $classAnalysisSubjectsCompair.offsetTop + $classAnalysisSubjectsCompair.offsetHeight;
        const classAnalysisWeakPointHeight = $classAnalysisWeakPoint.offsetTop + $classAnalysisWeakPoint.offsetHeight;

      if (scrollY >= $classAnalysisTrend.offsetTop - 300 && scrollY < classAnalysisTrendHeight - 200) {
        this.anchorActive = 'classAnalysisTrend';
        return;
      }

      if (scrollY >= classAnalysisTrendHeight - 200 && scrollY < classAnalysisCompairHeight - 200) {
        this.anchorActive = 'classAnalysisCompair';
        return;
      }
        if (scrollY >= classAnalysisCompairHeight - 200 && scrollY < classAnalysisSubjectsCompairHeight - 500) {
            this.anchorActive = 'classAnalysisSubjectsCompair';
            return;
        }
        if (scrollY >= classAnalysisSubjectsCompairHeight - 500) {
            this.anchorActive = 'classAnalysisWeakPoint';
            return;
        }
      this.anchorActive = '';

    });
  },
  methods: {
      
        //首次渲染
        handleClassAnalysis() {
            let teacher = JSON.parse(sessionStorage.getItem('teacher')) //登录session数据
            let class_id = teacher[0].class_id
            let subject_id =teacher[0].subject_id
            this.subject_id=JSON.stringify(subject_id)
        this.axios.get('/class/' + class_id + '/subject/' + subject_id + '/class_analysis_overview?debug=true', {
            params: {
                term_year: 0,
                grade: 0,
                term: 0,
                art_sci: 0
            }
            })
            .then((res) => {
                console.log(res);
                if (res.data.code === 0) {
                    let data = res.data.data
                    //渲染数据
                    this.detail = data
                    //成绩总览
                    this.handleInfo(data)
                    tabSubject=this.tabSubject
                    //本学期累计考试次数
                    this.batch_times=data.weak_knowledge_info.batch_times
                     //班级和年级上线率趋势 
                    this.onlineRate.series[0].data=data.class_major_score_trend_list
                    this.onlineRate.series[1].data=data.grade_major_score_trend_list
                    // x轴
                    let arr0 = []
                    for (let i=0; i<data.subject_info_list.length; i++){
                        arr0.push(data.class_batch_info_list[i].batch_name)
                    }
                    this.onlineRate.xAxis.data = arr0
                    // 未上线学科
                    for (let i=0; i<data.offline_subject_trend_list.length; i++) {
                        arr.push(data.offline_subject_trend_list[i])
                    }
                    // 超均率趋势
                    let arr1 = []
                    let arr3 = []
                    let object =  {x: 'right',y:"top",data:[],icon: "circle", itemWidth: 16,itemHeight: 16}
                    for (let i=0; i<data.class_info_list.length; i++){
                        arr3.push(data.class_batch_info_list[i].batch_name)
                        let obj = {name: data.class_info_list[i].class_name, showSymbol: false,type: 'line',smooth: true,data: [], lineStyle: {width: 4},}
                        object.data.push(data.class_info_list[i].class_name) 
                        this.onlineRate1.legend=object
                        obj.data=data.class_info_list[i].exceed_avg_rate_list
                        arr1.push(obj)
                    }
                    this.onlineRate1.xAxis.data = arr3
                    this.onlineRate1.series=arr1
                    // 学科对比
                    let arr11 = []
                    let arr12 = []
                    let object1 =  {x: 'right',y:"top",data:[],icon: "circle", itemWidth: 16,itemHeight: 16}
                    for (let i=0; i<data.subject_info_list.length; i++){
                        arr12.push(data.class_batch_info_list[i].batch_name)
                        let obj = {name: data.subject_info_list[i].subject_name, showSymbol: false,type: 'line',smooth: true,data: [], lineStyle: {width: 4},}
                        object1.data.push(data.subject_info_list[i].subject_name) 
                        this.onlineRate2.legend=object1
                        obj.data=data.subject_info_list[i].major_score_rate_list
                        arr11.push(obj)
                    }
                    this.onlineRate2.series=arr11
                    this.onlineRate2.xAxis.data=arr12
                    // 低于上线率 
                    for (let i=0; i<data.class_batch_info_list.length; i++) {
                        data.class_batch_info_list[i].class_major_score_rate = data.class_batch_info_list[i].class_major_score_rate+"%"
                        data.class_batch_info_list[i].grade_major_score_rate = data.class_batch_info_list[i].grade_major_score_rate+"%"
                    }
                    this.tableData=data.class_batch_info_list
                    this.lower_grade_info_subject_list=data.lower_grade_info_subject_list
                    //班级薄弱知识点  tab切换
                    if(this.weak_index==0){
                        for (let i=0; i<this.detail.weak_knowledge_info.weak_knowledge_info_list.length; i++){
                            this.detail.weak_knowledge_info.weak_knowledge_info_list[i].class_score_rate =this.detail.weak_knowledge_info.weak_knowledge_info_list[i].class_score_rate+"%"
                        }
                        this.weak_knowledge_info =this.detail.weak_knowledge_info.weak_knowledge_info_list
                    }else{
                        for (let i=0; i<this.detail.weak_knowledge_info.lower_grade_knowledge_info_list.length; i++){
                            this.detail.weak_knowledge_info.lower_grade_knowledge_info_list[i].class_score_rate=this.detail.weak_knowledge_info.lower_grade_knowledge_info_list[i].class_score_rate+"%"
                        }
                        this.weak_knowledge_info =this.detail.weak_knowledge_info.lower_grade_knowledge_info_list
                    }
                    
                    // echarts
                    this.$echarts.init(this.$refs.onlineRate).setOption(this.onlineRate);
                    this.$echarts.init(this.$refs.overRate).setOption(this.onlineRate1);
                    if (this.tabSubject=="全科") {
                    this.$echarts.init(this.$refs.compairRate).setOption(this.onlineRate2);
                    }
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
        //成绩总览
        handleInfo (data) {
            for (let i=0; i<this.info.length; i++) {
                if (this.info[i].label=="高于年级上线率次数") {
                    this.info[i].num=data.over_grade_major_score_cnt
                }
                if (this.info[i].label=="高于年级均分次数") {
                    this.info[i].num=data.over_grade_avg_score_cnt
                }
                if (this.info[i].label=="累计上线人数") {
                    this.info[i].num=data.over_major_score_student
                }
                if (this.info[i].label=="稳定上线人数") {
                    this.info[i].num=data.over_stable_major_score_student
                }
            }
        },
        // 学科切换
        tabClick (tab) {
            this.tabSubject=tab.label
        if(this.tabSubject!="全科"){
            for (let i=0; i<this.anchorList.length; i++) {
                if (this.anchorList[i].label=="学科对比") {
                    this.anchorList[i].label="班级薄弱知识点"
                    // this.anchorList[i].value="classAnalysisWeakPoint"
                }
            }
        }else{
            for (let i=0; i<this.anchorList.length; i++) {
                if (this.anchorList[i].label=="班级薄弱知识点") {
                    this.anchorList[i].label="学科对比"
                    // this.anchorList[i].value="classAnalysisWeakPoint"
                }
            }
        }
            this.handleClassAnalysis()
        },
        handleWeakIndex(index){
            this.weak_index=index
            this.handleClassAnalysis()
        }
    }
}
