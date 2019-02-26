<template>
  <div class="classAnalysis">
    <div class="classAnalysisInfo">
      <ClassAndSubjectTabs v-model="activeValue" :subject_id="subject_id" :tabs="tabs" @tabClick="tabClick"></ClassAndSubjectTabs>
      <div class="classAnalysisInfo-info-wrapper">
        <div class="classAnalysisInfo-info-item" :key="item.id" v-for="item in info">
          <div class="classAnalysisInfo-info-item-text">{{item.label}}</div>
          <div class="classAnalysisInfo-info-item-title">{{item.num}}</div>
          <div class="classAnalysisInfo-info-item-line"></div>
        </div>
        <div class="classAnalysisInfo-info-item" v-if="tabSubject!='全科'">
            <div class="classAnalysisInfo-info-item-text">累计薄弱知识点</div>
            <div class="classAnalysisInfo-info-item-title">{{detail.weak_knowledge_cnt}}</div>
            <div class="classAnalysisInfo-info-item-line"></div>
        </div>
      </div>
      <div class="classAnalysisInfo-brief">本学期累计考试次数：{{batch_times}}，本班人数：{{classmatesNum}}</div>
    </div>
    <div
      id="classAnalysisTrend"
      ref="classAnalysisTrend"
      class="classAnalysisOnlineRate classAnalysisPanel"
    >
      <div class="classAnalysisPanelTitle">上线率趋势</div>
      <div class="classAnalysisKindWrapper">
        <!-- <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">班级上线率趋势</span>
        </div>
        <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">年级上线率趋势</span>
        </div> -->
      </div>
      <div class="classAnalysisOnlineRate-charts classAnalysisPanel-charts" ref="onlineRate"></div>
    </div>
    <div
      id="classAnalysisCompair"
      ref="classAnalysisCompair"
      class="classAnalysisOverRate classAnalysisPanel"
    >
      <div class="classAnalysisPanelTitle">超均率趋势对比</div>
      <div class="classAnalysisKindWrapper">
        <!-- <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">班级上线率趋势</span>
        </div>
        <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">年级上线率趋势</span>
        </div> -->
      </div>
      <div class="classAnalysisOverRate-charts classAnalysisPanel-charts" ref="overRate"></div>
    </div>
    <div  v-if="tabSubject!='全科'"
      id="classAnalysisSubjectsCompair"
      ref="classAnalysisSubjectsCompair"></div>
    <div
      v-if="tabSubject=='全科'"
      id="classAnalysisSubjectsCompair"
      ref="classAnalysisSubjectsCompair"
      class="classAnalysisCompairRate classAnalysisPanel"
     
    >
      <div class="classAnalysisPanelTitle">学科对比</div>
      <div class="classAnalysisKindWrapper">
        <!-- <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">班级上线率趋势</span>
        </div>
        <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">年级上线率趋势</span>
        </div> -->
      </div>
      <div class="classAnalysisCompairRate-charts classAnalysisPanel-charts" ref="compairRate"></div>
      <div class="classAnalysisKindWrapper" style="position: static;">
        <div class="classAnalysisKind">
          <div class="classAnalysisKind-circle"></div>
          <span class="classAnalysisKind-text">低于年级上线率</span>
        </div>
      </div>
      <div class="classAnalysisCompairRate-table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="batch_name" label="考试" align="center" width="140"></el-table-column>
          <el-table-column prop="class_major_score_rate" label="班级上线率" align="center" width="116"></el-table-column>
          <el-table-column prop="grade_major_score_rate" label="年级上线率" align="center" width="116"></el-table-column>
          <el-table-column prop="subject_major_info_list" label="各学科上线情况">
            <template slot-scope="scope" v-for="item1 in tableData">
              <span v-for="(item, index) in item1.subject_major_info_list" :key="index">
                <template v-if="index !== 0">、</template>
                <span :class="{classAnalysisCompairRateHight:item.lower_grade_info==0}">{{item.subject_name}}</span>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="classAnalysis-result"  >
        <span>上线率低于年级水平的学科</span>
            <span v-for="(item, index) in lower_grade_info_subject_list" :key="index">
                <template v-if="index !== 0">|</template>
                {{item.subject_name}}：
                <span class="classAnalysis-result-highlight">{{item.lower_grade_info_cnt}}</span>次
            </span>
      </div>
    </div>
    <div id="classAnalysisWeakPoint" ref="classAnalysisWeakPoint" v-if="tabSubject=='全科'"> </div>
    <div id="classAnalysisWeakPoint" ref="classAnalysisWeakPoint" class="classAnalysisWeakPoint" v-if="tabSubject!='全科'">
      <div class="classAnalysisWeakPoint-header">
        <span class="classAnalysisWeakPoint-header-title">班级薄弱知识点</span>
        <div class="classAnalysisWeakPoint-header-tabs">
          <div class="classAnalysisWeakPoint-header-tab" @click="handleWeakIndex(index)"  :key="index" v-for="(item,index) of weak_tab" :class="{active:index==weak_index}">{{item}}</div>
        </div>
      </div>
      <div class="classAnalysisWeakPoint-table">
        <el-table :data="weak_knowledge_info" border style="width: 100%">
          <el-table-column prop="knowledge_name" label="知识点" align="center" width="140"></el-table-column>
          <el-table-column prop="times" label="出现次数" align="center" width="116"></el-table-column>
          <el-table-column prop="class_score_rate" label="班级得分率" width="203">
            <template slot-scope="scope">
              <el-progress
                color="#FF8E2C"
                v-if="scope.row.grade_score_rate < 40"
                :percentage="scope.row.grade_score_rate"
                status="text"
              >
                <span style="color: #FF8E2C;">{{scope.row.grade_score_rate}}%</span>
              </el-progress>
              <el-progress color="#4B70FF" v-else :percentage="scope.row.classPoint" status="text">
                <span style="color: #4B70FF;">{{scope.row.grade_score_rate}}%</span>
              </el-progress>
            </template>
          </el-table-column>
          <el-table-column prop="class_score_rate" align="center" label="年级得分率"></el-table-column>
        </el-table>
      </div>
      <div style="font-size: 12px;" class="classAnalysis-result">
        <span>
            本学期累计考试：
          <span class="classAnalysis-result-highlight">{{detail.weak_knowledge_info.batch_times}}</span>
          次<template> | </template>
        </span>
        <span>
            累计错题：
          <span class="classAnalysis-result-highlight">{{detail.weak_knowledge_info.wrong_count}}</span>
          次<template> | </template>
        </span>
        <span>
           累计薄弱知识点：
          <span class="classAnalysis-result-highlight">{{detail.weak_knowledge_info.weak_knowledge_cnt}}</span>
          次<template> | </template>
        </span>
        <span>
            低于年级水平知识点：
          <span class="classAnalysis-result-highlight">{{detail.weak_knowledge_info.low_grade_knowledge_cnt}}</span>
          次
        </span>
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
<style lang="stylus" src="./index.stylus"></style>
<script src="./index.js"></script>
