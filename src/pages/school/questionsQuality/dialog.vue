<template>
<div v-show="show">
    <div class="dialog-bg" :style="`width: ${width}px;height: ${height}px`"></div>
    <div class="dialog">
        <div class="dialog-header">
            {{dtitle}}
            <a href="javascript:;" class="dialog-close" @click="hideDialog"></a>
        </div>
        <div class="dialog-body">
            {{nameList}}
        </div>
    </div>
</div>
</template>
<script>
export default {
    data: function() {
        return {
            width: 0,
            height: 0
        }
    },
    props: {
        dtitle: {
            type: String,
            default: ''
        },
        nameList: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('hide');
        }
    },
    watch: {
        show(newValue) {
            if(newValue) {
                this.width = document.documentElement.clientWidth;
                this.height = document.documentElement.clientHeight;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            if(this.show) {
                this.width = document.documentElement.clientWidth;
                this.height = document.documentElement.clientHeight;
            }
        })
    }
}
</script>
<style>
.dialog-bg {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999999;
}
.dialog {
    background: #FFFFFF;
    border: 1px solid rgba(162,175,205,0.60);
    border-radius: 6px;
    height: 223px;
    width: 500px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -112px;
    margin-left: -250px;
    z-index: 999999;
}
.dialog-header {
    background: #A2AFCD;
    border-radius: 5px 5px 0 0;
    position: relative;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #FFFFFF;
    line-height: 50px;
    padding-left: 21px;
}
.dialog-close {
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    top: 0;
    right: 18px;
    height: 100%;
    line-height: 50px;
    width: 14px;
}
.dialog-close:after,
.dialog-close:before {
    background: #fff;
    content: '';
    width: 2px;
    height: 20px;
    position: absolute;
    transform: rotate(45deg);
    top: 13px;
}
.dialog-close:after {
    transform: rotate(-45deg);
}
.dialog-body {
    padding: 18px 23px;
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #5F6D91;
    line-height: 22px;
    position: relative;
}
</style>
