<template>
	<view>
		<view class="img">
			<image class="image" src="../../static/buttom/cat.png"></image>
		</view>
		<view class="login">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="username" focus placeholder="邮箱账号" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password" hold-keyboard placeholder="密码" password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<button class="button" type="primary" @click="userLogin">登录</button>
					</view>
				</view>
				<view class="register">
					<navigator url="/pages/register/register" open-type="navigate" hover-class="none">
						还没账号？去注册
					</navigator>
				</view>
				<view class="forget">
					<navigator url="/pages/forget/forget" open-type="navigate" hover-class="none">
						忘记密码？去找回
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Base64 from 'base-64';
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
				username: '',
				password: ''
			});
			const methods = {
				userLogin() {
					if (state.username && state.password) {
						let regex =
							/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						if (regex.test(state.username)) {
							request.login();
						} else {
							console.log("输入账号格式错误")
						}
						// let regex2 = /^[A-Za-z0-9]{8,16}$/;
						// if (regex2.test(state.password)) {
						// 	console.log("检验通过")
						// } else {
						// 	console.log("输入密码格式错误")
						// }
					} else {
						console.log("请完善输入")
					}
				}
			};
			onMounted(() => {

			});
			const request = {
				login() {
					// 请求体数据
					const data = {
						//部分删除
					};
					// post请求
					post("xxxxx/xxxx/xxxxx/xxxx", data).then((res, any) => {
						let {
							code,
							message,
							customData
						} = res;
						if (code === 200) {
							uni.showToast({
								icon: "none",
								title: "登陆成功，即将返回主页",
								duration: 2000
							});
							// 缓存到浏览器中 Local Storage 中
							uni.setStorageSync("token", customData.Authorization);
							uni.setStorageSync("shuaigangOVO", customData.userId);
							uni.setStorageSync("shuaigangQWQ", customData.role);
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/my/my'
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
				}
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

		.button {
			font-size: 30rpx;
		}

		.register {
			display: block;
			float: left;
			text-align: center;
			width: 50%;
			margin-top: 40rpx;
			font-size: 20rpx;
		}
		
		.forget {
			display: block;
			float: left;
			text-align: center;
			width: 50%;
			margin-top: 40rpx;
			font-size: 20rpx;
		}
	}
</style>
