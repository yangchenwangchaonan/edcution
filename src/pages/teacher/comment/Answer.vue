<template>
     <div class='answer'>
        <div class='title'>
            <h1>答题情况</h1>
            <img src='../../../assets/images/h_ter_comment_icon1.png' alt="" @click='handleSortFlex'>
            <ul class='sort' v-show='isSort'>
                <li v-for='(item, index) of sortArr'
                    :key='index'
                    :class="{active:sortIndex == index}"
                    @click="handleToggleSort(index)"
                >
                    {{item}}
                </li>
            </ul>
        </div>
        <ol class='grade'>
            <li v-for='(item, id) of gradeArr'
                :key='id'
            >
                <i></i>
                {{item}}
            </li>
        </ol>
        <ul class='count'>
            <li v-for='(item, index) of count_arr'
                :key="index"
                :class="[countIndex == index ? 'active' :
                    item.type == 2 ? 'active2' : 
                    item.type == 3 ? 'active3' :
                    item.type == 4 ? 'active4' : ''  
                ]"
                @click='handleToggleCount(index)'    
            >
                {{item.count}}
            </li>
        </ul>
     </div>
</template>

<script>
    export default {
        name: "answer",
        props: {
            count_arr: Array
        },
        data() {
            return {
               gradeArr: ['困难', '较难', '一般', '较易'],
               countIndex: 0,
               isSort: false,   //排序展开或者合起
               sortArr: ['按题号排序', '按得分率排序'],   //排序数据
               sortIndex: 0,  //排序选中
            }
        },
        components: {
            
        },
        methods: {
            handleToggleCount (index) { //切换题号
                this.countIndex = index
            },
            handleSortFlex () {
                this.isSort = !this.isSort
            },
            handleToggleSort (index) { //切换排序方式
                this.sortIndex = index
                this.isSort = !this.isSort
            }
        }
    };
</script>


<style lang="stylus" scoped>
    .answer
        float: right
        margin-top: 14px
        padding: 0 10px
        width: 156px
        background: #fff
        border-radius: 6px
        box-shadow: 0 0 4px 0 #E9E9F2
        .title
            position: relative
            margin-top: 14px
            line-height: 22px
            height: 22px
            h1
                display: inline-block
                font-size: 16px
                color: #383B57
                font-weight: bold
            img 
                float: right
                margin-top: 4px
                cursor: pointer
            ul
                position: absolute
                right: 0
                width: 111px
                background: #fff 
                border: 1px solid #E9E9F2 
                box-shadow: 0 0 4px 0 #E9E9F2;
                border-radius: 6px
                cursor: pointer 
                li
                    padding-left: 10px
                    line-height: 38px
                    height: 38px
                    font-size: 14px
                    color: #5F6D91
                    border-bottom: 1px solid #E9E9F2 
                li:last-child 
                    border-bottom: none
                li.active
                    color: #4B70FF



        .grade
            overflow: hidden
            margin-top: 10px
            height: 17px
            li
                float: left
                margin-left: 4px
                line-height: 20px
                font-size: 12px
                color: #A2AFCD 
                i 
                    display: inline-block
                    margin-right: -2px
                    width: 10px
                    height: 10px
                    background: #4B70FF 
                    border-radius: 50%
            li:first-child 
                margin-left: 0
                i 
                    background: #F5535B
            li:nth-child(2)
                i 
                    background: #FF8937 
            li:nth-child(3)
                i 
                    background: #F8BD46
        .count
            overflow: hidden
            margin-top: 10px
            margin-bottom: 20px
            li
                float: left
                line-height: 17px
                padding: 4px 10px
                margin-right: 10px
                margin-top: 10px
                height: 17px
                font-size: 12px
                color: #4B70FF 
                border: 1px solid
                border-radius: 6px
                cursor: pointer
            li.active
                color: #ffffff
                background: #F5535B
                border-color: #F5535B
            li.active2
                color: #F8BD46 
            li.active3
                color: #FF8937 
            li.active4
                color: #F5535B     


         
</style>
