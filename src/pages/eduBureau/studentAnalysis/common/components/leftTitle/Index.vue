<template>
	<div class="tch_lf_title">
		<div class="tch_lf_msg">
			<div @click="handleShow" class="tch_tab">
					<img src="@/assets/images/y_tch_tab1.png"/>
					<p>历史考试</p>
					<i :class="show==true?'i1':'i'"></i>
			</div>

			<div class="tch_tab_info" v-if="show">
					<p @click="handleActive" :class="active==0?'tch_tab_info_active':''">上线情况</p>
					<p @click="handleActive1" :class="active==1?'tch_tab_info_active':''">超均率分析</p>
			</div>
		</div>
		<div class="tch_lf_msg">
			<div class="tch_tab"  @click="handleActive2" :class="active==3?'tch_tab_info_active':''">
					<img :src="active==3?require('@/assets/images/h_edu_icon2.png'):
                                         require('@/assets/images/h_edu_icon1.png')"/>
					<p :class="active==3?'tch_tab_info_active':''">试卷质量</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		  // name: 'header',
		  props:{
			   active: Number,
		  },
		  data () {
			    return {
				   show: true,
			  }
		  },
	  	created () {
	  		
	  	},
	  	methods: {
			handleShow () {
				this.show=!this.show
			},
			handleActive () {
				// this.active=true
				this.$router.push({path:"/eduBureau/studentAnalysis/average"})
			},
			handleActive1 () {
				// this.active=false
				this.$router.push({path:"/eduBureau/studentAnalysis/passrate"})
			},
			handleActive2 () {
				// this.active=null
				this.$router.push({path:"/eduBureau/studentAnalysis/quality"})
			}
	  	}
	}
</script>


<style lang='stylus' scoped>
		.tch_lf_title
			float: left
			width 176px
			background #fff	
			border-radius 6px
			.tch_lf_msg
				margin-bottom 0px
				.tch_tab
					padding-top 13px
					padding-left 23px
					height 38px
					cursor pointer
					p
						display inline-block
						font-size 16px
						color #383B57
						font-weight bold
						vertical-align middle
						margin-left 5px
					.i
						display inline-block
						border 6px solid 
						position relative
						top 6px
						left 15px
						border-color #5F6D91 transparent  transparent  transparent
						border-radius 3px
					.i1
						display inline-block
						border 6px solid 
						position relative
						top -3px
						left 15px
						border-color transparent  transparent   #5F6D91 transparent
						border-radius 3px
                    
				.tch_tab_info
					width 176px
					height 82px
					font-size 16px
					p
						line-height 41px
						height 41px
						padding-left 70px
						cursor pointer
				.tch_tab_info_active
					background #4B70FF
					color #fff !important
</style>	