<template>
	<div class='login'>
		<div class='login_icon'>
			<img :src='index%2 == 0 ? lgon_icon1 : lgon_icon2' alt="">
			<span :class="[index%2 == 0 ? 'active2' : 'active1']">知师圈AI教育云</span>
		</div>
		<div class='font_title' v-for='(item, id) of fontTitle' :key='id'>
			<h5 :class="[index%2 == 0 ? 'odd' : '']">{{index == id+1 ? item.title1 : ''}}</h5>
			<h5 :class="[index%2 == 0 ? 'odd' : index == 1 ? 'first-h5' : '']">{{index == id+1 ? item.title2 : ''}}</h5>
		</div>
		<swiper :options="swiperOption" class='index_banner'>
			<swiper-slide>
				<div class='page page1'></div>
			</swiper-slide>
			<swiper-slide>
				<div class='page page2'></div>
			</swiper-slide>
			<swiper-slide>
				<div class='page page3'></div>
			</swiper-slide>
			<swiper-slide>
				<div class='page page4'></div>
			</swiper-slide>
			<swiper-slide>
				<div class='page page5'></div>
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
			<div class="swiper-button-prev swiper-button-black" slot="button-prev">

			</div>
      		<div class="swiper-button-next swiper-button-black" slot="button-next"></div>
		</swiper>
		
		<div class='pagination'>
			<div class='title'>
				<span :class="[index%2 == 0 ? 'odd' : '']">0{{index}}</span>
				<span :class="[index%2 == 0 ? 'odd' : '']">/05</span>
			</div>
		</div>
		<login-box></login-box>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper' 
	import LoginBox from './loginBox.vue'
	export default {
		name: 'login',
		components: {
			swiper,  
			swiperSlide,
			LoginBox  
		},
		data () {
			const _this = this;
			return {
				lgon_icon1: require('@/assets/images/h_login_icon.png'),
				lgon_icon2: require('@/assets/images/logo_white.png'),
				index: 1,
				swiperOption: {
					autoplay: true,
					loop: true,
					initialSlide: 0,
					on: {
						slideChangeTransitionEnd: function(){ //切换结束时，告诉我现在是第几个slide
							if(this.activeIndex == 6) {
								_this.index = 1
								
							}else if(this.activeIndex == 0) {
								_this.index = 5
							}else {
								_this.index = this.activeIndex 
							}
						}
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						clickable :true
					}
				},
				fontTitle: [
					{title1:'科学助力教育',title2:'AI智慧挖掘教育大数据，专业服务提升教学水平'},
					{title1:'深度分析',title2:'优化教研放向'},
					{title1:'多维评价',title2:'把握教学质量'},
					{title1:'问题洞察',title2:'助力教学改进'},
					{title1:'精准指导',title2:'增效提分指导'}
				]
				
			}
		}
		
	}
</script>

<style lang='stylus'>
	html 
		width: 100%
		height: 100%
</style>

<style lang='stylus' scoped>
	.login
		overflow: hidden
		width: 100%
		height: 100%
		min-width: 1200px
		min-height: 750px
		.swiper-container
			width: 100%
			height: 100%
			.page
				width: 100%
				height: 100%
			.page1
				background: url('../../assets/images/h_login_bg1.png') no-repeat
				background-size: 100% 100%
			.page2
				background: url('../../assets/images/h_login_bg2.png') no-repeat
				background-size: 100% 100%
			.page3
				background: url('../../assets/images/h_login_bg3.png') no-repeat
				background-size: 100% 100%
			.page4
				background: url('../../assets/images/h_login_bg4.png') no-repeat
				background-size: 100% 100%
			.page5
				background: url('../../assets/images/h_login_bg5.png') no-repeat
				background-size: 100% 100%
			.swiper-button-prev
				position: fixed
				left: 8.3%
				top: 75.87%
				width: 44px
				height: 44px
				background: url('../../assets/images/h_login_left_black.png')
			.swiper-button-next
				position: fixed
				left: 12.8%
				top: 75.87%
				width: 44px
				height: 44px
				background: url('../../assets/images/h_login_right_black.png')
		.pagination
			position: fixed
			left: 8.3%
			top: 64.5%
			z-index: 99
			.title
				overflow: hidden
				position: relative
				span 
					color: #fff
				span:nth-child(1)
					font-size: 28px
				span:nth-child(2)
					margin-top: -5px
					font-size: 12px
				span.odd
					color: #4E65A0
		.login_icon
			position: fixed
			left: 4.17%
			top: 5.2%
			height: 21px
			z-index: 9999
			span.active1 
				font-size: 12px
				color: #fff
				opacity: 0.6
			span.active2
				font-size: 12px
				color: #4E65A0;
				opacity: 0.6
		.font_title
			position: fixed
			left: 8.3%
			top: 29.3%
			z-index: 9999
			h5
				font-size: 40px
				color: #fff
			h5:last-child
				margin-top: 50px
			h5.odd
				color: #4E65A0
			h5.first-h5 
				font-size: 20px
</style>

<style lang='stylus'>
	.index_banner
		.swiper-pagination
			text-align: left
			position: fixed
			left: 8.3%
			top: 70.4%
			.swiper-pagination-bullet
				margin-right: 4px
				width: 60px
				height: 4px
				background: rgba(255,255,255,0.20)
				border-radius: 100px
			.swiper-pagination-bullet2
				background: red
			.swiper-pagination-bullet-active
				background: #FF8937
</style>
