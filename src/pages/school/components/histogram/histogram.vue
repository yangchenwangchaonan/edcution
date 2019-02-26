<template>
    <div>
        <div class="histogramBody" @click="handleShow">
            <div v-if="isTrue==='1'" class="histogramChoosed">
                <span class="histogramMessage">{{title}}</span>
            </div>
            <div v-else class="histogramChoose">
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
            type:String,
            default:String
        },
        isTrue:{
            type:String,
            default:String
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

    methods:{
        init(){
            if(this.isTrue === '1'){
               let docs = document.querySelectorAll(".histogramChoosed");
                docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
                });
            }else{
               let docs = document.querySelectorAll(".histogramChoose");
               docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
               });
            }
        },
        handleShow(){
            this.$emit('showMessage')
        }
    },
    
    mounted(){
        this.init();
    }
}
</script>
<style src="./histogram.css"></style>

