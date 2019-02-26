<template>
	<div class="header_title" :style="`width: ${width}`">
		<div class='arrow' @click="$router.go(-1)">
			<img src="../../assets/images/h_ter_list_arrow.png" alt=""/>
		</div>
		<span :class="art_sci == 1 ? 'subject' : 'subject active'">{{grade_and_type}}</span>
		<span class='title'>{{batch_name}}</span>
		<div class='toggle_class' v-if='header_title != 0'>
			<span>切换班级</span>
			<select class='class_list'
				v-model="class_name"
				@change='handleGetClassNameInfo()'
			> 
				<option v-for='item of teacher'
					:key='item.class_id'
					:value="item.class_id"	
				>
					{{item.class_name}}
				</option>
			</select>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'header_title',
		props: {
			width: {
				type: String,
				default: '940px'
			},
			header_title: Number
		},
		data () {
			return {
				teacher: [],   //登录session数据
				class_name: '',
				batch_name: '',
				grade_and_type: '',
				art_sci: ''
			}
		},
	  	created () {
			
		},
		mounted () {
			this.teacher = JSON.parse(sessionStorage.getItem('teacher'))   //登录session数据
			this.class_name = this.teacher[0].class_id	
			this.batch_name = sessionStorage.getItem('batch_name')
			this.grade_and_type = sessionStorage.getItem('grade_and_type')
			this.art_sci = sessionStorage.getItem('art_sci')
		},
	  	methods: {
			handleGetClassNameInfo () {
				this.$emit('handleGetClassId', this.class_name)
			}
		},
		
	}
</script>


<style lang='stylus' scoped>
	.header_title
		margin: 20px auto 0
		height: 80px
		background: #fff
		.arrow
			float: left
			margin: 20px 22px
      img{
        cursor pointer
      }
		.subject
			display: inline-block
			margin-top: 26px
			padding: 6px 5px
			border: 1px solid #4B70FF
			border-radius: 4px
			font-size: 14px
			color: #4B70FF
			letter-spacing: 1px
		.subject.active
			color: #F5535B 
			border-color: #F5535B
		.title
			margin-left: 7px
			font-size: 18px
			color: #383B57
			font-weight: bold
		.toggle_class
			float: right
			margin-top: 18px
			margin-right: 20px
			line-height: 44px
			height: 44px
			font-size: 14px
			color: #A2AFCD
			select
				margin-left: 10px
				padding-left: 17px
				line-height: 44px
				width: 100px
				height: 44px
				font-size: 14px
				color: #606382
				background: url('../../assets/images/ic_triangle.png') 78px center no-repeat
				border: 1px solid rgba(162,175,205,0.20)
				border-radius: 6px
				box-shadow: 0 0 4px 0 #E9E9F2;
				cursor: pointer
</style>
