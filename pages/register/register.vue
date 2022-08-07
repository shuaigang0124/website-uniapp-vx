<template>
	<view>
		<view class="img">
			<image class="image" src="../../static/buttom/cat.png"></image>
		</view>
		<view class="login">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="userName" focus placeholder="用户名(2-8位汉字)" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="email" hold-keyboard placeholder="邮箱账号"
							:disabled="disabledChange" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password" hold-keyboard placeholder="请输入8-16位密码(只能为数字或大小写字母)"
							password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password2" hold-keyboard placeholder="请再次输入密码" password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<!-- @input="hideKeyboard" -->
					<input class="code_input-item" type="number" maxlength="4" @input="numInput" v-model="validCode"
						placeholder="请输入验证码" :disabled="disabledChange" />
					<view :class="[disabledCode==true?'code_text_tap':'code_text']" @tap="sendCode"
						:disabled="disabledCode">获取验证码</view>
				</view>
				<view class="uni-form-item uni-column">
					<button class="button" type="primary" @click="userRegister">注册</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Base64 from 'base-64';
	// import {
	// 	defineComponent,
	// 	onMounted,
	// 	reactive,
	// 	toRefs
	// } from "vue";
	import post from '@/http/request/request';
	import moment from 'moment';
	export default {
		data() {
			return {
				userName: '',
				email: '',
				password: '',
				password2: '',
				validCode: null,
				validEmail: '',
				code: 1,
				disabled: false,
				disabledCode: false,
				date: '',
				disabledChange: false
			}
		},
		methods: {
			// 发送邮箱验证码
			sendCode() {
				if (this.email) {
					let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (regex.test(this.email)) {
						this.disabledCode = false;
						this.sendMailCode();
					} else {
						uni.showToast({
							icon: "none",
							title: "邮箱格式错误",
							duration: 2000
						});
					}
				}
			},
			numInput(e) {
				const o = e.target;
				const inputRule = /[^\d]/g
				this.$nextTick(function() {
					this.validCode = o.value.replace(inputRule, '');
					if (this.validCode > 999 && this.validCode < 10000 && this.email) {
						this.checkMailCode();
					}
				})
			},
			// 注册
			userRegister() {
				if (this.userName && this.email && this.password && this.password2) {
					let regex1 = /^[\u4e00-\u9fa5]{2,8}$/;
					let regex2 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					let regex3 = /^[A-Za-z0-9]{8,16}$/;
					if (regex1.test(this.userName)) {
						if (regex2.test(this.email)) {
							if (this.email === this.validEmail) {
								if (this.password === this.password2) {
									if (regex3.test(this.password)) {
										this.register();
									} else {
										uni.showToast({
											icon: "none",
											title: "密码格式错误",
											duration: 2000
										});
									}
								} else {
									uni.showToast({
										icon: "none",
										title: "两次密码输入不一致",
										duration: 2000
									});
								}
							} else {
								uni.showToast({
									icon: "none",
									title: "请输入验证通过的邮箱",
									duration: 2000
								});
							}
						} else {
							uni.showToast({
								icon: "none",
								title: "邮箱格式错误",
								duration: 2000
							});
						}
					} else {
						uni.showToast({
							icon: "none",
							title: "用户名格式错误",
							duration: 2000
						});
					}
				} else {
					uni.showToast({
						icon: "none",
						title: "请完善输入",
						duration: 2000
					});
				}
			},
			sendMailCode() {
				const data = {};
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message,
						customData
					} = res;
					if (code === 200) {
						this.validEmail = this.email;
					}
					uni.showToast({
						icon: "none",
						title: message,
						duration: 2000
					});
				});
			},
			checkMailCode() {
				const data = {};
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message,
						customData
					} = res;
					if (code === 200 && message === '验证通过,前往下一步') {
						this.disabledChange = true;
					}
					uni.showToast({
						icon: "none",
						title: message,
						duration: 2000
					});
				});
			},
			register() {
				// 请求体数据
				const data = {};
				// post请求
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message,
						customData
					} = res;
					if (code === 200) {
						this.updateCityValue('Chongqing', 99);
						uni.showToast({
							icon: "none",
							title: "注册成功，即将返回登录页面",
							duration: 2000
						});
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/login/login'
							})
						}, 2000)
					} else {
						ElMessage.error(message);
					}
				});
			},
			updateCityValue(id, subtractOrAdd) {
				// 请求体数据
				const data = {};
				// post请求
				post("/xxx/xxxx/xxx/xxx", data).then((res, any) => {
					let {
						code
					} = res;
					if (code === 200) {
						console.log("城市用户数据添加成功");
					} else {
						return;
					}
				});
			},
		},
		onLoad() {
			this.date = moment(Date.now()).format("YYYY-MM-DD")
		},
	}
</script>

<style lang="scss">
	.img {
		margin: 100rpx 20rpx;
		text-align: center;

		.image {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			margin-top: 20rpx;
		}
	}

	.login {
		padding: 20rpx 40rpx;
		margin: 100rpx 20rpx;
		text-align: center;
		background-color: #FFFFFF;

		.login-label {
			color: #333333;
			margin: 0 auto;
		}

		.uni-input {
			background-color: #fff;
			height: 80rpx;
			text-align: left;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			border-bottom: 1rpx solid #d2d2d2;
		}

		.uni-form-item {
			margin: 30rpx 0;
		}

		.code_input-item {
			background-color: #fff;
			height: 80rpx;
			text-align: left;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			border-bottom: 1rpx solid #d2d2d2;
			display: block;
			width: 50%;
			float: left;
			background: rgba(255, 255, 255, 1);
		}

		.code_text {
			background-color: #fff;
			height: 100rpx;
			text-align: center;
			padding-left: 10rpx;
			font-size: 30rpx;
			display: block;
			float: left;
			width: 40%;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 166, 255, 1);
		}

		.code_text_tap {
			background-color: #fff;
			height: 100rpx;
			text-align: center;
			padding-left: 10rpx;
			font-size: 30rpx;
			display: block;
			float: left;
			width: 40%;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 166, 255, 1);
			pointer-events: none;
		}

		.button {
			font-size: 30rpx;
		}

	}
</style>
