<template>
    <div class="exam-content-wrap">
        <div class="exam-content-box">
            <div class="exam-header">
                <h2>具体考题及内容</h2>
                <div class="exam-number-list">
                    <a href="javascript:;" class="exam-num cur">1</a>
                    <a href="javascript:;" class="exam-num">2</a>
                    <a href="javascript:;" class="exam-num">3</a>
                    <a href="javascript:;" class="exam-num">4</a>
                    <a href="javascript:;" class="exam-num">5</a>
                    <a href="javascript:;" class="exam-num">6</a>
                </div>
            </div>
            <div class="exam-content">
                <h2>选择题</h2>
                <div class="exam-info">
                    <span class="exam-info-tit">难度: <strong>0.6</strong></span>
                    <span class="exam-info-tit">区分度: <strong>0.6</strong></span>
                    <span class="exam-info-tit">本校正答率: <strong>85</strong>%</span>
                    <span class="exam-info-tit">考察知识点: <strong>古诗文默写</strong></span>
                </div>
                <div class="exam-content-txt">
                    文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                    内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                    容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文
                    言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                    容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                </div>
                <div class="exam-content-result">
                    <h2>选项公布</h2>
                    <ul>
                        <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                        <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                        <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                        <li>文言文内容文言文内容文言文内容文言文内容文言文内容</li>
                    </ul>
                </div>
            </div>
        </div>
         <div class="exam-content-box">
            <div class="exam-header">
                <h2>具体考题及内容</h2>
                <div class="exam-number-list">
                    <a href="javascript:;" class="exam-num cur">1</a>
                    <a href="javascript:;" class="exam-num">2</a>
                    <a href="javascript:;" class="exam-num">3</a>
                    <a href="javascript:;" class="exam-num">4</a>
                    <a href="javascript:;" class="exam-num">5</a>
                    <a href="javascript:;" class="exam-num">6</a>
                </div>
            </div>
            <div class="exam-content">
                <h2>选择题</h2>
                <div class="exam-info">
                    <span class="exam-info-tit">难度: <strong>0.6</strong></span>
                    <span class="exam-info-tit">区分度: <strong>0.6</strong></span>
                    <span class="exam-info-tit">本校正答率: <strong>85</strong>%</span>
                    <span class="exam-info-tit">考察知识点: <strong>古诗文默写</strong></span>
                </div>
                <div class="exam-content-txt">
                    文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                    内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                    容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文
                    言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内
                    容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文内容文言文
                </div>
                <div class="all-public-result">
                    <h2>全市分数公布</h2>
                    <div class="all-public-result-text">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function() {
        return {}
    },
    methods: {

    }
}
</script>
<style>
.exam-content-wrap {
    width: 744px;
}
.exam-content-box {
    margin-top: 14px;
    background: #FFFFFF;
    box-shadow: 0 0 4px 0 #E9E9F2;
    border-radius: 6px;
    padding: 20px 30px;
}
.exam-header {
    padding-bottom: 10px;
    border-bottom: 1px solid #EBEBEB;
}
.exam-header h2 {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #383B57;
    line-height: 25px;
}
.exam-number-list {
    padding-top: 10px;
}
.exam-number-list .exam-num {
    display: inline-block;
    height: 36px;
    width: 44px;
    text-align: center;
    line-height: 34px;
    border: 1px solid #4B70FF;
    border-radius: 6px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #333333;
    margin: 10px 10px 10px 0;
}
.exam-number-list .cur {
    background: #4B70FF;
    color: #fff;
}
.exam-content {
    padding-top: 20px;
}
.exam-content h2 {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #5F6D91;
    line-height: 25px;
}
.exam-info {
    padding-top: 6px;
    height: 25px;;
    font-family: PingFangSC-Semibold;
    
}
.exam-info .exam-info-tit {
    font-size: 14px;
    color: #000;
    line-height: 16px;
    position: relative;
    padding-right: 6px;
}
.exam-info .exam-info-tit:after {
    content: '';
    height: 14px;
    width: 1px;
    background: #000;
    position: absolute;
    right: 0;
    top: 2px;
}
.exam-info .exam-info-tit strong {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #4B70FF;;
    line-height: 20px;
}
.exam-content-txt {
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #5F6D91;
}
.exam-content-result h2 {
    font-size: 14px;
    line-height: 20px;
}
.exam-content-result ul {
    counter-reset: count;
    /* counter-increment: count; */
}
.exam-content-result li {
    padding-left: 33px;
    line-height: 30px;
    position: relative;
}
.exam-content-result li:before {
    content: counter(count, upper-alpha);
    counter-increment: count;
    position: absolute;
    left: 0;
    top: 0;
    font-size: 18px;
    color: #000;
}
.all-public-result h2 {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #5F6D91;
}
.all-public-result-text {
    background: #ECEFF5;
    border-radius: 6px;
    height: 140px;
    margin-top: 10px;
}
</style>

