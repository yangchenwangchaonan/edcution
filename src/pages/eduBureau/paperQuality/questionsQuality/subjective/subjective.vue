<template>
    <div>
        <div class="subjectiveMessage">
            <div class="subjectiveGrade">{{grade}}</div>
        </div>
        <div class="subjectiveBody">
            <div v-if="isTrue==='1'" class="subjectiveChoosed" @click="handleShow">
            </div>
            <div v-else class="subjectiveChoose" @click="handleShow">
            </div>
            <div class="message">{{people}}人，占{{percentage}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        grade:{
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
               let docs = document.querySelectorAll(".subjectiveChoosed");
                docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
                });
            }else{
               let docs = document.querySelectorAll(".subjectiveChoose");
               docs.forEach(element => {
                    element.style.width = 494*parseInt(this.percentage.replace(/%/g,""))/100 + "px";
               });
            }
        },
        handleShow(){

        }
    },
    
    mounted(){
        this.init();
    }
}
</script>
<style src="./subjective.css"></style>

