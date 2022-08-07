<template>
	<view>
		<view class="img">
			<image class="image" src="../../static/buttom/cat.png"></image>
		</view>
		<view class="login">
			<view v-if="!updatePwd" class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="email" focus placeholder="邮箱账号" :disabled="disabledCode" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<input class="code-input-item" type="number" maxlength="4" v-model="validCode" placeholder="请输入验证码"
						v-on:input="change" />
					<view :class="[disabledCode===true?'code-send-tap':'code-send']" @tap="sendCode"
						:disabled="disabledCode">获取验证码</view>
				</view>
			</view>
			<view v-else class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password" focus placeholder="请输入新密码(仅支持字母和数字)" password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password2" hold-keyboard placeholder="请再次输入密码" password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<button class="button" type="primary" @click="updatePwdEmail">确认修改</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import post from '@/http/request/request';
	export default defineComponent({
		components: {},
		props: {},
		setup() {
			const state = reactive({
				email: '',
				password: '',
				password2: '',
				validCode: null,
				disabledCode: false,
				updatePwd: false
			});
			const methods = {
				// 发送邮箱验证码
				sendCode() {
					if (state.email) {
						let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						if (regex.test(state.email)) {
							state.disabledCode = true;
							request.sendMailCode();
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
							title: "请完善输入",
							duration: 2000
						});
					}
				},
				// 监听验证码输入
				change: function() {
					if (state.disabledCode === true && state.validCode > 999 && state.validCode < 10000) {
						request.checkMailCode();
					}
				},
				// 修改
				updatePwdEmail() {
					if (state.email && state.password && state.password2) {
						let regex = /^[A-Za-z0-9]{8,16}$/;
						if (state.password === state.password2) {
							if (regex.test(state.password)) {
								request.updatePwdByEmail();
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
							title: "请完善输入",
							duration: 2000
						});
					}
				},
			};
			onMounted(() => {});
			const request = {
				sendMailCode() {
					const data = {};
					post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
						//部分删除
					});
				},
				checkMailCode() {
					const data = {};
					post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
						//部分删除
						// uni.showToast({
						// 	icon: "none",
						// 	title: message,
						// 	duration: 2000
						// });
					});
				},
				updatePwdByEmail() {
					// 请求体数据
					const data = {};
					// post请求
					post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
						let {
							code,
							message,
							customData
						} = res;
						if (message === '修改成功！') {
							uni.showToast({
								icon: "none",
								title: "修改成功，即将返回登录",
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack({
									url: '/pages/login/login'
								})
							}, 2000)
						} else {
							uni.showToast({
								icon: "none",
								title: message,
								duration: 2000
							});
						}
					});
				},
			};
			return {
				...methods,
				...toRefs(state)
			};
		}
	})
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

		.code-input-item {
			background-color: #fff;
			height: 80rpx;
			text-align: left;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			border-bottom: 1rpx solid #d2d2d2;
			display: block;
			float: left;
			width: 55%;
		}

		.code-send {
			background-color: #fff;
			height: 80rpx;
			text-align: center;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			display: block;
			float: left;
			width: 30%;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(102, 166, 255, 1);
		}

		.code-send-tap {
			background-color: #fff;
			height: 80rpx;
			text-align: center;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
			display: block;
			float: left;
			width: 30%;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: rgba(96, 96, 96, 2);
			pointer-events: none;
		}

		.button {
			font-size: 30rpx;
		}

	}
</style>
