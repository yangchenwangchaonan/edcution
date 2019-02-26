<!--用户: Mr.wang 日期:2018/12/13 时间:20:21-->
<template>
  <div class="eduTermList">
    <header-public :url_index="url_index"></header-public>
    <div class="container">
      <div class="termListTitle">
        <label>学年</label>
        <span
          v-for="(item,index) in academic_year"
          :class="{academic_year_active:current_academic_year == index}"
          @click="change_academic_year(index)"
          :key="index"
        >{{item}}</span>
      </div>
      <div class="termListContent">
        <div v-for="(exam,index) in examList" :key="index" class="terms_list">
          <el-col :span="24">
            <div class="grid-content bg-purple-white el-list-edu">
              <el-col class="exam_left" :span="18">
                <div class="exam_title">
                  <button :class="{border_pink:font_color != exam.art_sci}">
                    <span
                      :class="{pink:font_color != exam.art_sci}"
                    >{{exam.grade_and_art_science_desc}}</span>
                  </button>
                  <span class="grid-content exam_name">{{exam.study_desc}}</span>
                </div>
                <div class="exam_time">
                  <el-col :span="24">
                    <span>{{exam.study_notes}}</span>
                  </el-col>
                </div>
              </el-col>
              <el-col class="exam_right" :span="6">
                <a @click="goToExamInfo(exam)" style="cursor: pointer">
                  <div class="el-btn-info" :data-id="index" :data-info="exam.study_desc">查看详细分析报告</div>
                </a>
              </el-col>
            </div>
            <div></div>
          </el-col>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPublic from "@/components/header";
export default {
  name: "termList",
  components: {
    HeaderPublic
  },
  data() {
    return {
      url_index: 2, //header下标
      current_academic_year: 0,
      font_color: 1,
      academic_year: ["2018-2019学年", "2017-2018学年", "2016-2017学年"],
      examList: []
    };
  },
  mounted() {
    this.handleStudyList();
  },
  methods: {
    change_academic_year(index) {
      this.current_academic_year = index;
    },
    // 渲染列表
    handleStudyList() {
      this.axios
        .get("/study_analysis_list?debug=true", {
          params: {
            term_year: this.term_year
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.examList = res.data.data.exam_info_list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goToExamInfo(item) {
      this.$router.push({
        path: "/school/studentAnalysis/passrate",
        query: {
          change_active: 0,
          grade: item.grade,
          examName: item.examName,
          subject_type: item.subject_type
        }
      });
    }
  }
};
</script>

<style lang='stylus' scoped>
.border_pink {
  border: 1px solid #F5535B !important;
}

.pink {
  color: #F5535B !important;
}

.academic_year_active {
  background-color: #4B70FF;
  color: #ffffff;
}

.termListTitle {
  width: 940px;
  height: 64px;
  background-color: #FFFFFF;
  border-radius: 6px;
  margin: 30px auto;

  label {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #A2AFCD;
    margin-left: 20px;
    line-height: 64px;
  }

  span {
    margin-left: 20px;
    display: inline-block;
    padding: 6px;
    cursor: pointer;
    vertical-align: middle;
  }
}

.termListContent {
  width: 940px;
  border-radius: 6px;
  margin: 14px auto;

  .terms_list {
    height: 120px;
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 14px;
    border-radius: 6px;
  }

  .exam_name {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #383B57;
    display: inline-block;
    line-height: 26px;
    margin-left: 10px;
  }

  .el-btn-info {
    width: 150px;
    height: 40px;
    background: #4B70FF;
    box-shadow: 0 16px 10px -12px rgba(255, 137, 55, 0.2);
    border-radius: 100px;
    line-height: 40px;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #FFFFFF;
  }

  .exam_right {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .el-col {
    border-radius: 4px;
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

  .el-nav-edu {
    height: 140px;
  }

  .el-list-edu {
    min-height: 120px;
    background-image: url('../../../../assets/images/list_bg.png');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .el-row {
    margin-bottom: 20px;
    margin-top: 14px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .exam_title {
    padding: 20px 15px;
  }

  button {
    border: 1px solid #4B70FF;
    border-radius: 4px;
  }

  button > span {
    display: inline-block;
    color: #4B70FF;
    padding: 6px 10px !important;
  }

  .exam_time {
    padding: 10px 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #A2AFCD;
  }

  .exam_time_img {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
  }

  .exam_name {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #383B57;
    display: inline-block;
    line-height: 26px;
    margin-left: 10px;
  }
}
</style>
