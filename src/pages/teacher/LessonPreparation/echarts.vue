<template>
     <div>
        <div id="myChart" class="echarts"></div>
     </div>
</template>

<script>
    export default {
        name: "score_echarts",
        data () {
            return {
              
            }
        },
        components: {
            
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine () {
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                    myChart.setOption({
                         tooltip : {
                                trigger: 'axis'
                            },
                            title: {
                                text: '分数分段统计图'
                            },
                            legend: {
                                data:['邮件营销','联盟广告']
                            },
                            toolbox: {
                                show : true,
                                feature : {
                                    mark : {show: true},
                                    dataView : {show: true, readOnly: false},
                                    // magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                                    // restore : {show: true},
                                    // saveAsImage : {show: true}
                                }
                            },
                            calculable : true,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : ['周一','周二','周三','周四','周五','周六','周日']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value'
                                }
                            ],
                            series : [
                                
                                {
                                    smooth : true,
                                    name:'邮件营销',
                                    type:'line',
                                    stack: '总量',
                                    data:[120, 132, 101, 134, 90, 230, 210]
                                },
                                {
                                    smooth : true,
                                    name:'联盟广告',
                                    type:'line',
                                    stack: '总量',
                                    data:[220, 182, 191, 234, 290, 330, 310]
                                },
                            ]
                        });
                    }
        }
    }
</script>


<style lang='stylus' scoped>
    .echarts
        width 774px
        height 447px
        background #fff
        margin-top 14px
        border-radius 6px
                    
                   
                    

</style>