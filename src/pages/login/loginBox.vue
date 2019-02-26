<template>
	<div class='main'>
		<div class='content'>
			<p>登录</p>
			<div class='entry'>
				<input type="text" class='user' v-model="user">
				<input type="password" class='pass' v-model='pass'>
			</div>
			<div class='remember'>
				<input type="checkbox" id='remember' ref='checkbox' @click='handleCheckbox'>
				<label for="remember">记住密码</label>
			</div>
			<input class='btn' type="button" value='登录' @click='handleLogin'>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login_box',
		data () {
			return {
				user: '',
				pass: '',
				isCheckbox: false
			}
		},
		methods: {
			handleJudgeRememberme () {
				let user = localStorage.getItem('user')
				if(user) {
					this.user = localStorage.getItem('user')
					this.pass = localStorage.getItem('pass')
					this.isCheckbox = true
					this.$refs.checkbox.checked = true
				}
			},
			handleLogin () {
				if(this.user == '') {
					alert('用户名不能为空')
					return;
				}
				if(this.pass == '') {
					alert('密码不能为空')
					return;
				}
				this.handleSendLogin()
			},
			handleSendLogin () {
				this.$http.post('/user/login', {
			      	user_name: this.user,
			      	pwd: this.pass
				})
			  		.then(this.handlehandleSendLoginSucc.bind(this))
			  		.catch(this.handlehandleSendLoginErr.bind(this))
			},
			handlehandleSendLoginSucc (res) {
				console.log(res)
				if(res.data.code != 0) {
					alert(res.data.msg)
					return;
				}
				if(this.isCheckbox) {
					localStorage.setItem('user', this.user)
					localStorage.setItem('pass', this.pass)
				}else {
					localStorage.removeItem('user')
					localStorage.removeItem('pass')
				}
				sessionStorage.setItem('uid', res.data.data.uid)
				sessionStorage.setItem('user_name', res.data.data.user_name)
				sessionStorage.setItem('real_name', res.data.data.real_name)
				sessionStorage.setItem('role_type', res.data.data.role_type)
				this.handleJudgeRoleType(res) //判断权限
			},
			handleJudgeRoleType (res) { //判断权限
				let role = res.data.data.role_type
				if(role == 6 || role == 7) { //教师端
					this.$router.push({path: '/teacher/overview'})
					sessionStorage.setItem('teacher', JSON.stringify(res.data.data.teacher_class_info_list))
					// console.log(JSON.parse(sessionStorage.getItem('teacher')))
					return;
				}
				if(role == 4 || role == 5) { //学校端
					this.$router.push({path: '/schooloverview'})
					sessionStorage.setItem('school', JSON.stringify(res.data.data.teacher_school_info_list))
					// sessionStorage.setItem('school_id', res.data.data.teacher_school_info_list[0].school_id)
					// sessionStorage.setItem('school_name', res.data.data.teacher_school_info_list[0].school_name)
					// sessionStorage.setItem('school_full_name', res.data.data.teacher_school_info_list[0].school_full_name)
					return;
				}
				if(role == 0 || role == 1 || role == 2 || role == 3) { //教育局端
					this.$router.push({path: '/eduBureau/overview'})
					sessionStorage.setItem('education', JSON.stringify(res.data.data.district_info_list))
					// sessionStorage.setItem('district', res.data.data.district_info_list[0].district)
					// sessionStorage.setItem('district_name', res.data.data.district_info_list[0].district_name)
				}
			},
			handlehandleSendLoginErr (err) {
				alert(err)
			},
			handleCheckbox () {
				this.isCheckbox = !this.isCheckbox
			}
		},
		mounted () {
			let _this = this
			window.onkeyup = function(e) {
				if(e.keyCode && e.keyCode == 13 || e.keyCode == 10) {
					_this.handleLogin()
				}
			}
	  		this.handleJudgeRememberme()
	  	}
	}
</script>

<style lang='stylus' scoped>
    .main
        position: fixed
        top: 50%
        transform: translateY(-50%)
        right: 8.4%
        z-index: 9999
        width: 374px
        height: 408px
        border: 1px solid #A2AFCD
        border-radius: 10px
        background: #fff
		.content
			margin: 0 auto
			width: 316px
			p
				margin-top: 30px
				font-size: 20px
				color: #383B57
			.entry
				margin-left: -10px
				input
					padding-left: 20px
					width: 314px
					height: 58px
					border: 1px solid #A2AFCD
					border-radius: 6px;
				.user
					margin-top: 32px
				.pass
					margin-top: 20px
			.remember
				margin-top: 20px
				height: 18px
				input
					width: 18px
					height: 18px
					border: 1px solid #383B57
					border-radius: 2px
					font-size: 18px
					color: #383B57
				input[type="checkbox"]:checked
					width: 16px
					height: 16px
					border: none
					background: url('../../assets/images/h_login_checkbox.png')
				label
					margin-left: 10px
					line-height: 18px
					font-size: 14px
					color: #383B57
					font-weight: bold
			.btn
				margin-top: 52px
				width: 316px
				height: 50px
				background: #FF942C
				border-radius: 100px
				font-size: 18
				color: white
				font-weight: bold
				letter-spacing: 7.5px
				cursor: pointer
</style>
