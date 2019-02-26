<template>
  <div class="subjectAnalysis">
    <ClassAndSubjectTabs v-model="activeValue" :subject_id="subject_id" :tabs="tabs" @tabClick="tabClick"></ClassAndSubjectTabs>
    <div class="subjectAnalysis-panel-one" 
         id="classAnalysisTrend" 
         ref="classAnalysisTrend">
      <!-- <h1>学科分析</h1> -->
      <div class="subjectAnalysis-panel-one-title" >学生上线次数统计</div>
      <div class="subjectAnalysis-panel-one-description">根据本学期<span>{{batch_times}}</span>次考试情况，可以找出上线不稳定但具备上线潜力的学生</div>
        <div class="echart-circle">
        </div>
        <!-- <div class="echart-data">
            <div class="echart-data-people" v-for="(item,index) in echarData" :key="index">{{item.value}}人</div>
        </div> -->
    </div>
    <div class="subjectAnalysis-panel-two" 
         id="classAnalysisCompair"
         ref="classAnalysisCompair">
      <div class="subjectAnalysis-panel-two-instability-students-situation">
        <div class="subjectAnalysis-panel-two-instability-students">
          <div class="subjectAnalysis-panel-two-students">
              不稳定学生情况
          </div>
        </div>
        <div class="subjectAnalysis-panel-two-online-counts">
          <el-button @click="confirm(index)" class="subjectAnalysis-panel-two-button" v-for="(item,index) in counts" :key="index">
            {{item}}
          </el-button>
        </div>
      </div>
      <div class="subjectAnalysis-panel-two-description">{{desc}}</div>
      <div class="subjectAnalysis-panel-two-chart">
         <el-table
          :data="gridSitulation"
          border
          style="width: 100%">
          <el-table-column
            prop="student_name"
            label="姓名"
            align="center"
            width="96">
          </el-table-column>
          <el-table-column
            
            :label="countIndex!='全科'?'薄弱知识点':'未上线学科'"
            align="left"
          > 
               <template slot-scope="scope">
                <div v-if="countIndex!='全科'" v-html="scope.row.weak_knowledge_desc+'('+scope.row.weak_knowledge_cnt+'个)'" class="ddd"></div>
                <div v-if="countIndex=='全科'"  class="ddd"><span :key="index" v-for="(item,index) of scope.row.major_offline_subject_list"><i v-if="index!=0">&nbsp;&nbsp;|&nbsp;&nbsp;</i> {{item.subject_name+"："+item.major_offline_count}}次</span></div> 
                <span class="span" @click="handleModal(scope.row.student_name)">查看详细情况</span>
          </template>

          </el-table-column>
          <!-- <el-table-column
            prop="classPoint"
            label="班级得分率"
            width="203">
            <template slot-scope="scope">
              <el-progress color="#FF8E2C" v-if="scope.row.classPoint < 40" :percentage="scope.row.classPoint" status="text"><span style="color: #FF8E2C;">{{scope.row.classPoint}}%</span></el-progress>
              <el-progress color="#4B70FF" v-else :percentage="scope.row.classPoint" status="text"><span style="color: #4B70FF;">{{scope.row.classPoint}}%</span></el-progress>
            </template>
          </el-table-column>
          <el-table-column
            prop="gradePoint"
            align="center"
            label="年级得分率">
          </el-table-column>-->
        </el-table> 
      </div>
    </div>
    <Anchor
      :anchorActive="anchorActive"
      :anchorTitle="anchorTitle"
      :anchorList="anchorList"
      ref="anchor"
    ></Anchor>
    <modal-fraction ref="pap"></modal-fraction>
    <modal-weak ref="pdp"></modal-weak>
  </div>
</template>
<script src="./subjectAnalysis.js"></script>
<style>
.ddd{
    width: 400px; 
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
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
  .classAnalysisWeakPoint {
    background: #fff;
    box-shadow: 0 0 4px 0 #E9E9F2;
    border-radius: 6px;
    margin: 14px 0 0 0;
    padding: 0 0 24px 0;
  }
  .classAnalysisWeakPoint-table {
      padding: 20px 30px 0;
  }
  .el-table {
    border-radius: 6px 6px 0 6px;
  }
  .el-table .cell{
    line-height: 26px;
    padding-top: 1px;
  }
  .el-table th {
    background: rgba(162, 175, 205, 0.2);
    color: #383B57;
    text-align: left;
  }
  .el-table_1_column_1 {
    background: rgba(162, 175, 205, 0.2);
    color: #5F6D91;
  }
  .el-table_1_column_2 {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #5F6D91;
  }
  .el-table td {
    padding: 5px 0;
  }
  .el-table__body-wrapper {
    color: #5F6D91;
  }
  .classAnalysisCompairRateHight {
    color: #5F6D91;
  }
  .etable-column-content{
    display: inline-block;
    width:395px;
    height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #5F6D91;
    margin-left: 8px;
}
.etable-column-a{
    margin-left: 78px;
    margin-top: 10px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #4B70FF;
    /* text-align: right; */
}
.etable-count{
    margin-left: 14px;
}
.span {
    position: absolute;
    top: 20%;
    right:10px;
    cursor: pointer;
    color:#4B70FF;
}
</style>

<style scoped src="./subjectAnalysis.css"></style>
