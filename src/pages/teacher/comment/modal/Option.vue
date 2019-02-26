<template>
    <div class='container'>
        <el-dialog  width="500px"
                    height= "223px" 
                   :visible="visible"
                   @close="handleClose"
                   custom-class='modal_info'
                   >
                <div class="modal_title">第10题-{{option}}学生名单(9人,占比75%)</div> 
               <span class="modal_name">苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三、苏敏、张明、王三</span>  
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "comment",
    data () {
            return {
              visible:false,  
              option:""
            }
        },
    components: {
        
    },
    methods: {
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
    .modal_info
        width 500px
        height 223px
        border-radius 6px
        .modal_title
            height 50px
            background #A2AFCD
            border-radius 6px 6px 0 0
            color #fff
            line-height 50px
            padding-left 21px
            font-size 18px
        .modal_name
            display inline-block
            padding-left 23.3px
            margin-top 18px
            padding-right 26.1px
            line-height 20px
            font-size 14px
            color #5F6D91
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
</style>
