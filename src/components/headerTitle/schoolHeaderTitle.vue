<!--用户: Mr.wang     日期:2018/12/15    时间:16:06-->
<template>
    <div class="header_title" :style="`width: ${width}`">
        <div class='arrow'>
            <img src="../../assets/images/h_ter_list_arrow.png" alt=""/>
        </div>
        <span class='subject'>高二理科</span>
        <span class='title'>2008年-2019学年一年级期中考试</span>
    </div>
</template>

<script>
    export default {
        name: 'header_title',
        created () {

        },
        methods: {

        },
        props: {
            width: {
                type: String,
                default: '940px'
            }
        }
    }
</script>


<style lang='stylus' scoped>
    .header_title
        margin: 20px auto 0
        height: 80px
        background: #fff
        .arrow
            float: left
            margin: 20px 22px
        .subject
            display: inline-block
            margin-top: 26px
            padding: 6px 5px
            border: 1px solid #4B70FF
            border-radius: 4px
            font-size: 14px
            color: #4B70FF
            letter-spacing: 1px
        .title
            margin-left: 7px
            font-size: 18px
            color: #383B57
            font-weight: bold



</style>
