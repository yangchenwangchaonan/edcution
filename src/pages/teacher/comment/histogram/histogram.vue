<template>
    <div>
        <div class="histogramBody">
            <div v-if="isTrue == '1'" class="histogramChoosed" @click="handleShow">
                <span class="histogramMessage">{{title}}</span>
            </div>
            <div v-else class="histogramChoose" @click="handleShow">
                <span class="histogramMessage">{{title}}</span>
            </div>
            <div class="message">{{people}}人，占{{percentage}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:String
        },
        people:{
            type: Number,
            default: Number
        },
        isTrue:{
            type: Number,
            default: Number
        },
        percentage:{
            type:String,
            default:String
        }
    },
    data(){
        return {

        }
    },
    watch: {
        percentage: {
            handler(newValue, oldValue) {
                this.init()
　　　　     },
            //immediate: true,
            // deep: true  
            immediate: true
        }    
    },
    methods:{
        init(){
            // alert(this.isTrue)
            if(this.isTrue == 1){
                let docs = document.querySelectorAll(".histogramChoosed");
                console.log(docs)
                docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
                });
            }else{
                let docs = document.querySelectorAll(".histogramChoose");
                console.log(docs)
                docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
                });
            }
        },
        handleShow(){

        }
    }
}
</script>
<style src="./histogram.css"></style>

