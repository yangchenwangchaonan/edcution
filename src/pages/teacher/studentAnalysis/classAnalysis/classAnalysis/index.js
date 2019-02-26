import ClassAndSubjectTabs from '../common/classAndSubjectTabs.vue';
export default {
  components: {
    ClassAndSubjectTabs
  },
  data() {
    return {
      tabs: [
        {
          label: '全科',
          value: '1',
          main: false
        },
        {
          label: '语文',
          value: '2',
          main: true
        },
        {
          label: '数学',
          value: '3',
          main: false
        }
      ],
      info: [
        {
          id: '1',
          label: '高于年级上线率次数',
          num: 4
        },
        {
          id: '2',
          label: '高于年级均分次数',
          num: 3
        },
        {
          id: '3',
          label: '累计上线人数',
          num: 24
        },
        {
          id: '4',
          label: '稳定上线人数',
          num: 13
        }
      ],
      activeValue: '1',
      examTime: 4,
      classmatesNum: 52,
      tableData: [
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        },
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        },
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        },
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        },
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        },
        {
          exam: '人大附中20181113',
          classRate: '13%',
          gradeRate: '22%',
          subjectsRate: [
            {
              label: '语文',
              highlight: false
            },
            {
              label: '数学',
              highlight: false
            },
            {
              label: '英语',
              highlight: false
            },
            {
              label: '物理',
              highlight: true
            },
            {
              label: '生物',
              highlight: false
            }
          ]
        }
      ],
      weakTableData: [
        {
          knowledge: '人大附中20181113',
          showTime: 13,
          classPoint: 8,
          gradePoint: 89
        },
        {
          knowledge: '人大附中20181113',
          showTime: 13,
          classPoint: 48,
          gradePoint: 89
        },
        {
          knowledge: '人大附中20181113',
          showTime: 13,
          classPoint: 64,
          gradePoint: 89
        },
        {
          knowledge: '人大附中20181113',
          showTime: 13,
          classPoint: 74,
          gradePoint: 89
        }
      ],
      weakResult: [
        {
          label: '本学期累计考试',
          value: 4,
          unit: '次'
        },
        {
          label: '累计错题',
          value: 26,
          unit: '道'
        },
        {
          label: '累计薄弱知识点',
          value: 81,
          unit: '个'
        },
        {
          label: '低于年级水平知识点',
          value: 24,
          unit: '个'
        }
      ],
      onlineRate: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      },
      lowSubjects: [
        {
          label: '语文',
          value: 4
        },
        {
          label: '数学',
          value: 26
        },
        {
          label: '英语',
          value: 81
        },
        {
          label: '物理',
          value: 2
        },
        {
          label: '化学',
          value: 1
        }
      ]
    };
  },
  mounted() {
    // this.$echarts.init(this.$refs.onlineRate).setOption(this.onlineRate);
    // this.$echarts.init(this.$refs.overRate).setOption(this.onlineRate);
    // this.$echarts.init(this.$refs.compairRate).setOption(this.onlineRate);
  },
  watch: {
    activeValue(val) {
      console.log(val);
    }
  },
  methods: {
    tabClick(tab) {
      console.log(tab);
    }
  }
}