<template>
    <!-- 锚点链接 -->
    <div>
        <ul class='anchor'>
            <li>成绩总览</li>
            <li class='active'><i></i><a href="#allcourse">全科均分统计</a></li>
            <li><i></i><a href="#count">分数分段统计</a></li>
            <li><i></i><a href="#ranking">排名分段统计</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "anchor",
        data () {
          return {};
        },
        components: {

        },
        methods: {

        }
    };
</script>


<style>
    .anchor {
        position: fixed;
        right: 325px;
        top: 357px;
        width: 138px;
        border-left: 1px solid rgba(151,151,151, 0.2);
    }
    .anchor li {
        position: relative;
        margin-top: 14px;
        margin-left: 19px;
        line-height: 20px;
        height: 20px;
    }
    .anchor li:first-child {
        margin-top: 0;
        margin-left: 9px;
    }
    .anchor li:first-child a {
        color: #333333;
    }
    .anchor li:nth-child(2) {
        margin-top: 10px;
    }
    .anchor li:last-child {
        padding-bottom: 5px
    }
    .anchor li.active i {
        display: block;
    }
    .anchor li.active a {
        color: #4B70FF;
    }
    .anchor li i {
        position: absolute;
        left: -23.5px;
        top: 5.5px;
        display: inline-block;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #4B70FF;
        display: none;
    }
    .anchor li a {
        color: #777777;
    }
</style>
