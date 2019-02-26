<template>
     <div>
        <div style="width: 686px;height: 400px" class="echarts" id="classAnalysisCompair"></div>
        <div style="width: 686px;height: 400px" class="echarts" id="classAnalysisSubjectsCompair" ></div>
        <!-- <div>{{score}}</div> -->
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
                            let result = '<div style="border-radius:4px 4px 0px 0px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;line-height: 30px">' + "【" + params[0].axisValue + "】" + "分段" + '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="padding: 0px 10px;border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span>' + params[i].seriesName + '</span>' +
                                    ':' +
                                    '<span>' + params[i].data+ "%" + '</span>' +
                                    "</div>";
                            }
                            return result;
                        }
                    },
                    color:["#4B70FF","#FF8937"],
                    title: {
                        text: '分数分段统计'
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
                            data : null,
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
                        name:'本班占比',
                        type:'line',
                        data:[],
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
                        name:'年级占比',
                        type:'line',
                        data:[]
                    },
                ]
                },
                // 排名分段统计
                ranking_section_statistics:{
                    title: {
                        text: '排名分段统计'
                    },
                    color: ['#4B70FF'],
                    tooltip: {
                        trigger: 'axis',
                        show:true,
                        axisPointer: {
                            type: 'none'        // 默认为直线
                        },
                        tooltip: {
                            crossStyle: {
                                opacity: 1
                            },
                            backgroundColor: "#ffffff",
                            borderColor: "red",
                            borderRadius:4,
                            borderWidth:1,
                            padding: 0
                        },
                        label: {
                            backgroundColor: "#583636"
                        },
                        formatter: function (params) {
                            let result = '<div style=""><div style="border-radius:4px 4px 0px 0px;width:120px;height:30px;background-color:#ECEFF5;color:#5F6D91;margin:-4px -4px -4px -4px;padding-left: 10px;line-height: 30px">' +
                                params[0].axisValue +"排名段"+
                                '</div>';
                            for (let i = 0; i < params.length; i++) {
                                result += '<div style="border-radius:0px 0px 4px 4px;color:#667395;background-color: #ffffff;margin:-4px -4px -4px -4px;line-height: 30px">' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].seriesName + '</span>' +
                                    ':' +
                                    '<span style="margin-left: 10px;border-radius:0px 0px 4px 4px;">' + params[i].data+ "%" + '</span>' +
                                    "</div></div>";
                            }
                            return result;
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            nameTextStyle:{
                                padding: [30,0,0,-35]
                            },
                            position:'bottom',
                            type: 'category',
                            data: null,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 40
                            }
                        }
                    ],
                    yAxis: [
                        {
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            name: "占比：%",
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '本班占比',
                            type: 'bar',
                            data: [],
                            barWidth:"44px",
                            itemStyle: {
                                normal:{
                                    barBorderRadius:[4, 4, 4, 4],
                                }
                            }
                        }
                    ]
                }
            }
        },
        components: {

        },
        created () {
            
        },
        mounted () {
            this.drawLine();
            this.drawLine1();    
        },
        watch: {
            childer_data: {
                handler(newValue, oldValue) {
                    let data = this.childer_data
                    this.fractional_statistics.xAxis[0].data = data.score_range_list
                    this.ranking_section_statistics.xAxis[0].data = data.rank_range_list
                    for(let item of data.score_range_info_list[0].rate) {
                        this.fractional_statistics.series[0].data.push(item)
                    }
                    for(let item of data.score_range_info_list[1].rate) {
                        this.fractional_statistics.series[1].data.push(item)
                    }
                    for(let item of data.rank_range_info_list) {
                        this.ranking_section_statistics.series[0].data.push(item.class_rate)
                    }
                    this.drawLine();
                    this.drawLine1(); 
　　　　        },
                //immediate: true,
                deep: true  
            }
        },
        methods: {
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('classAnalysisCompair'));
                let option = this.fractional_statistics;
                myChart.setOption(option);
            },

            drawLine1(){
                let myChart = this.$echarts.init(document.getElementById('classAnalysisSubjectsCompair'));
                let option = this.ranking_section_statistics;
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
