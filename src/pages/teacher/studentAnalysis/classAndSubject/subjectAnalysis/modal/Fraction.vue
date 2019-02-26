<template>
    <div class='container'>
        <el-dialog  width="500px"
                    height= "437px" 
                   :visible="visible"
                   @close="handleClose"
                   custom-class='modal_info1'
                   >
                <div class="modal_title">查看详细情况</div> 
                <p class="modal_name_con">
                    <span  v-for='(item, id) of nav'
                        :key='id' @click='handleToggleScore(id)' 
                        class="modal_name1"
                        :class='{active:id == navIndex}'>
                        {{item}}
                    </span> 
                    <span class="span"><i class="i"></i></span>
                </p>
                 <div class="classAnalysisWeakPoint-table">
                    <el-table :data="weak_knowledge_info" border style="width: 100%">
                    <el-table-column prop="knowledge_name" label="薄弱知识点" align="center" width="115"></el-table-column>
                    <el-table-column prop="times" label="丢分次数/考察次数" align="center" width="153"></el-table-column>
                    <el-table-column prop="class_score_rate" align="center" label="累计得分率" width="184">
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
                    </el-table>
                </div>
               
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "comment",
    data () {
            return {
              visible:false,  
              option:"",
              navIndex: 0,
              nav: ['郑美心 6分', '郑美心 6分', '郑美心 6分', '郑美心 6分'],
            }
        },
    components: {
        
    },
    methods: {
        handleToggleScore (id) {  
            this.navIndex = id
        },
        handleVisible (value) {
            this.option=value
            this.visible=true
        },
        handleClose () {
            this.visible=false
        },
    }
};
</script>


<style lang="stylus">
    .modal_info1
        width 500px
        height 437px
        border-radius 6px
        .modal_title
            height 50px
            background #A2AFCD
            border-radius 6px 6px 0 0
            color #fff
            line-height 50px
            padding-left 21px
            font-size 18px
        .modal_name_con
            margin-left 20px
            margin-top 20px
            cursor pointer
            .modal_name1
                display inline-block
                background #ECEFF5
                width 100px
                height 44px
                margin-right 10px
                line-height 44px
                border-radius 6px
                text-align center
                color #606382
                font-size 14px
            .active
                background #4B70FF
                color #fff
            .span
                width 18px
                height 42px
                border 1px solid #E9E9F2
                display inline-block
                float right
                border-radius 6px
                margin-right 20px
                box-shadow 0 0 4px 0 #E9E9F2
                .i
                    display inline-block
                    border 6px solid 
                    border-color transparent  transparent  transparent #5F6D91 
                    border-radius 3px 
                    margin-top 16px
                    margin-left 7px
        .modal_option_name
            margin-top 20px
            margin-left 20px
            margin-bottom 10px
        .modal_option
            margin-left 20px
            width 460px
            height 168px
            background #ECEFF5
            border-radius 6px
        .el-dialog__header
            padding 0
        .el-dialog__body
            padding 0
        .el-dialog__headerbtn .el-dialog__close
            color #fff
            font-size 20px
            margin-top -5px
        .el-dialog__headerbtn
            top 15px
.classAnalysisCompairRate-table {
      padding: 0 30px;
      margin: 14px 0 0 0;
      .el-table {
        border-radius: 6px 6px 0 6px;
      }
      .el-table th {
        background: rgba(162, 175, 205, 0.2);
        color: #383B57;
      }
      .el-table_1_column_1 {
        background: rgba(162, 175, 205, 0.2);
        color: #5F6D91;
      }
      .el-table_1_column_2 {
        color: #FF8937;
      }
      .el-table td {
        // padding: 5px 0;
      }
      .el-table__body-wrapper {
        color: #5F6D91;
      }
      .classAnalysisCompairRateHight {
        color: #FF8937;
      }
    }
    .el-table__empty-block{
        width 100% !important;
    }
</style>
