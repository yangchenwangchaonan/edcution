<template>
     <div>
        <div id="count" style="width: 686px;height: 400px" class="echarts"></div>
     </div>
</template>

<script>
    export default {
        name: "score_echarts",
        props: {
            childer_data: Object
        },
        data () {
            return {
                fractional_statistics:{
                    tooltip: {
                        trigger: 'axis',
                        tooltip: {
                            crossStyle: {
                                opacity: 1
                            },
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff"
                        },
                        label: {
                            backgroundColor: "#583636"
                        },
                        formatter: function (params) {
                            console.log(params)
                            let result = '<div style="padding: 0 10px;border-radius:4px 4px 0px 0px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;line-height: 30px">' + "【" + params[0].axisValue + "】" + "分段" + '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="padding: 0 10px;border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span>' + '上线率趋势' + '</span>' +
                                    ':' +
                                    '<span>' + params[i].data+"%" + '</span>' +
                                    "</div>";
                            }
                            return result;
                        }
                    },
                    color:["#4B70FF","#FF8937"],
                    title: {
                        text: '上线率趋势'
                    },
                    legend: {
                        left: 'right',
                        data:['本班占比','年级占比']
                    },
                    toolbox: {
                        show : true,
                    },
                    calculable : true,
                    xAxis : [
                        {
                            name : '分数段',
                            type : 'category',
                            boundaryGap : false,
                            data : [],
                            axisLabel: {
                                interval: 0,
                                rotate: 40
                            }
                        }
                    ],
                    yAxis : [
                    {
                        name : '占比%',
                        type : 'value',
                        axisLine: {show:false},
                        axisTick: {show:false},
                    }
                ],
                    series : [
                    {
                        symbol:'circle',
                        showSymbol: false,
                        smooth: true,
                        // name:'本班占比',
                        type:'line',
                        data:[120, 132, 101, 134, 90, 230, 210],
                        areaStyle: {},
                        // markLine: {
                        //     symbol:'none',
                        //     data: [
                        //         {type: 'average', name: '平均值'}
                        //     ]
                        // },

                    },
                    {
                        symbol:'circle',
                        showSymbol: false,
                        smooth: true,
                        // name:'年级占比',
                        type:'line',
                        // data:[220, 182, 191, 234, 290, 330, 310]
                    },
                ]
                }
                
            }
        },
        components: {

        },
        watch: {
            childer_data: {
                handler(newValue, oldValue) {
                    let data = this.childer_data
                    this.fractional_statistics.xAxis[0].data = data.exam_batch_list
                    console.log(data.class_major_online_rate_list)
                    this.fractional_statistics.series[0].data = data.class_major_online_rate_list
                    this.drawLine();
　　　　        },
                //immediate: true,
                deep: true  
            }
        },
        mounted () {
            this.drawLine();
        },
        methods: {
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('count'));
                let option = this.fractional_statistics;
                myChart.setOption(option);
            }
        }
    };
</script>


<style lang='stylus' scoped>
    .echarts
        width 744px
        height 447px
        background #fff
        margin 14px auto
        border-radius 6px
        padding 30px 29px





</style>
