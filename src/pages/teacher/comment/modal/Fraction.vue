<template>
    <div class='container'>
        <el-dialog  width="500px"
                    height= "360px" 
                   :visible="visible"
                   @close="handleClose"
                   custom-class='modal_info1'
                   >
                <div class="modal_title">第10题-{{option}}学生名单(9人,占比75%)</div> 
                <p class="modal_name_con">
                    <span  v-for='(item, id) of nav'
                        :key='id' @click='handleToggleScore(id)' 
                        class="modal_name1"
                        :class='{active:id == navIndex}'>
                        {{item}}
                    </span> 
                    <span class="span"><i class="i"></i></span>
                </p>
                <div class="modal_option_name">郑美心的答案预览</div>
                <div class="modal_option"></div>
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
        height 360px
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

</style>
