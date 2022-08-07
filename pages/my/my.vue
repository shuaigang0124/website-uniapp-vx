<template>
	<view>
		<view class="my_top">
			<view class="my_garden"></view>
			<!-- 头像 -->
			<!-- <my-head></my-head> -->
			<view class="head">
				<view class="head_left">
					<image v-if="!userId" class="image1"
						src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp"
						mode=""></image>
					<image v-else-if="userId && !uploadState" class="image1"
						:src="'https://shuaigang.top' + user.avatar" mode="" @click="uploadAvatar"></image>
					<image v-else class="image1" :src="user.avatar" mode="" @click="uploadAvatar"></image>
					<view class="head_title">
						<view class="head_name">
							<!-- <button v-if="!userId" type='primary' open-type="getUserInfo" class="button"
								@getuserinfo="getUserInfo">立即登录</button> -->
							<button v-if="!userId" type='primary' class="button" @click="getUserLogin">立即登录</button>
							<button v-else type='primary' class="button"
								@click="deltedUserInfo">{{ user.userName }}</button>
						</view>
						<view class="member">
							🐱圣火喵喵教教徒
							<tui-icon name="arrowright" :size="28" unit="rpx" color="#FFFF"></tui-icon>
						</view>
					</view>
				</view>
				<view class="head_right">
					<image class="pic" src="/static/style/shezhi.png" mode="" @click="skipSet" />
				</view>
			</view>
			<!-- 积分 -->
			<!-- <my-array></my-array> -->
			<view class="array">
				<!-- @click="skip(index)" -->
				<view class="array2" v-for="(item,index) in arrayData" :key="index">
					<view class="count">
						{{item.count}}
					</view>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<!-- 订单 -->
		<my-order></my-order>
		<!-- 其他分类 -->
		<view style="margin-top: 10rpx;">
			<my-code></my-code>
		</view>
	</view>
</template>

<script>
	import myOrder from '@/pages/my/mystyle/order.vue' //订单
	import myCode from '@/pages/my/mystyle/code.vue' // 其他分类
	import Base64 from 'base-64';
	// import {
	// 	defineComponent,
	// 	onMounted,
	// 	reactive,
	// 	toRefs
	// } from "vue";
	import post from '@/http/request/request';
	export default {
		data() {
			return {
				arrayData: [{
						count: '0',
						name: "我的积分"
					},
					{
						count: '0',
						name: "兑换次数"
					},
					{
						count: '0',
						name: "发布次数"
					}
					// ,
					// {
					// 	count: '0',
					// 	name: "签到天数"
					// }
				],
				user: {
					id: "",
					userName: "",
					avatar: ""
				},
				uploadState: false,
				userId: ''
			}
		},
		methods: {
			uploadAvatar() {
				let that = this;
				uni.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片，只有一张图片获取下标为0
						// console.log(res.tempFiles);
						// var tempFilePaths = res.tempFilePaths[0];
						that.uploadState = true;
						that.user.avatar = res.tempFiles[0].path;
						console.log("获取图片成功")
						if (res.tempFiles[0].size / 1024 / 1024 < 1) {
							uni.uploadFile({
								url: 'https://xxx.com/xxx/xxxx/xxx/xxx/xxxx',
								filePath: res.tempFilePaths[0],
								header: {
									'Authorization': uni.getStorageSync('token'),
									"Content-Type": "multipart/form-data",
								},
								name: 'file',
								formData: {
									multipartFile: res.tempFilePaths[0],
									userId: that.user.id,
									type: 2
								},
								success: (res) => {
									let data = JSON.parse(res.data.replace(
										'\uFEFF', ''))
									let {
										code,
										message,
										customData
									} = data;
									// console.log(data);
									// console.log(code);
									// console.log(message);
									// console.log(customData);
									if (code === 200 && message === 'OK' &&
										customData !== null) {
										console.log("上传成功");
										that.updateAvatar(customData
											.avatarPath);
									} else {
										uni.showToast({
											icon: "none",
											title: message,
											duration: 2000
										});
									}
								}
							});
						} else {
							uni.showToast({
								icon: "none",
								title: '图片大小不能超过1MB！',
								duration: 2000
							});
						}
					}
				});
			},
			skipSet() {
				uni.showToast({
					icon: "none",
					title: '打开设置',
					duration: 2000
				});
			},
			getUserLogin() {
				// uni.navigateTo 保留当前页面,跳转到应用内的某个页面,使用uni.navigateBack可以返回到原页面。
				// uni.redirectTo 关闭当前页面,跳转到应用内的某个页面。
				// uni.reLaunch  关闭所有页面,跳转到应用内的某个页面。
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			deltedUserInfo() {
				uni.showModal({ //提示框
					title: '退出登录？',
					complete: e => {
						if (e.confirm) {
							this.logout();
						}
					}
				});
			},
			updateAvatar(filePath) {
				// 请求体数据
				const data = {};
				// post请求
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message
					} = res;
					if (code === 200 && message === '保存成功！') {
						this.getUserInfo();
						uni.showToast({
							icon: "none",
							title: '修改成功',
							duration: 2000
						});
					} else {
						uni.showToast({
							icon: "none",
							title: message,
							duration: 2000
						});
					}
				});
			},
			getUserInfo() {
				const data = {
					customData: {},
				};
				const data1 = {
					customData: {
						prizeUserId: this.userId,
						isEnabled: 1
					}
				};
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						customData
					} = res;
					if (code === 200) {
						this.user = customData;
						this.uploadState = false;
						// this.arrayData[0].count = uni.getStorageSync("userPoint");
						// this.arrayData[1].count = uni.getStorageSync("forRecordTotal");
						// this.arrayData[2].count = uni.getStorageSync("prizeTotal");
						// post请求
						post("/xxx/xxxx", data).then((res, any) => {
							let {
								code,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync("token", customData.Authorization);
								// 获取用户积分
								post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
									let {
										code,
										message,
										customData
									} = res;
									if (code === 200) {
										uni.setStorageSync('userPoint', customData.point);
										this.arrayData[0].count = uni.getStorageSync("userPoint");
									}
								});
								// 获取用户兑换次数
								post("/xxx/xxx/xxxx/xxx", data).then((res, any) => {
									let {
										code,
										message,
										customData
									} = res;
									if (code === 200 && message !== '') {
										uni.setStorageSync('forRecordTotal', customData.length);
										this.arrayData[1].count = uni.getStorageSync(
											"forRecordTotal");
									}
								});
								// 获取用户中奖次数
								post("/xxx/xxx/xxx/xxx", data1).then((res,
									any) => {
									let {
										code,
										message,
										customData
									} = res;
									if (code === 200) {
										uni.setStorageSync('prizeTotal', customData.length);
										this.arrayData[2].count = uni.getStorageSync("prizeTotal");
									}
								});
							}
						});
					}
				});
			},
			logout() {
				// 请求体数据
				const data = {
					customData: {},
				};
				// post请求
				post("/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message
					} = res;
					if (code === 200) {
						this.userId = "";
						this.arrayData[0].count = 0;
						this.arrayData[1].count = 0;
						this.arrayData[2].count = 0;
						uni.clearStorageSync();
					}
					uni.showToast({
						icon: "none",
						title: message,
						duration: 2000
					});
				});
			},
		},
		// onLoad() {
		// 	this.userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
		// 	if (this.userId) {
		// 		this.getUserInfo();
		// 	}
		// },
		onShow() {
			this.userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			if (this.userId) {
				this.getUserInfo();
				// 请求体数据
				const data = {
					customData: {},
				};
				const data1 = {};
				// post请求
				post("/xxxx/xxxx", data).then((res, any) => {
					let {
						code,
						customData
					} = res;
					if (code === 200) {
						uni.setStorageSync("token", customData.Authorization);
						// 获取用户积分
						post("/xxx/xxx/xxx/xxxx", data).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('userPoint', res.customData.point);
								this.arrayData[0].count = uni.getStorageSync("userPoint");
							}
						});
						// 获取用户兑换次数
						post("/xxx/xxxx/xxx/xxxx", data).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('forRecordTotal', res.customData.length);
								this.arrayData[1].count = uni.getStorageSync("forRecordTotal");
							}
						});
						// 获取用户中奖次数
						post("/xxx/xxx/xxx/xxx", data1).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('prizeTotal', res.customData.length);
								this.arrayData[2].count = uni.getStorageSync("prizeTotal");
							}
						});
					}
				});
			};
		},
		onPullDownRefresh() {
			let userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			if (userId) {
				// 请求体数据
				const data = {};
				const data1 = {};
				// post请求
				post("/xxx/xxx", data).then((res, any) => {
					let {
						code,
						customData
					} = res;
					if (code === 200) {
						uni.setStorageSync("token", customData.Authorization);
						// 获取用户积分
						post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('userPoint', res.customData.point);
								this.arrayData[0].count = uni.getStorageSync("userPoint");
							}
						});
						// 获取用户兑换次数
						post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('forRecordTotal', res.customData.length);
								this.arrayData[1].count = uni.getStorageSync("forRecordTotal");
							}
						});
						// 获取用户中奖次数
						post("/xxx/xxx/xxx/xxx", data1).then((res, any) => {
							if (res.code === 200) {
								uni.setStorageSync('prizeTotal', res.customData.length);
								this.arrayData[2].count = uni.getStorageSync("prizeTotal");
							}
						});
					}
				});
			};
			uni.stopPullDownRefresh();
			uni.showToast({
				icon: "none",
				title: "刷新成功！",
				duration: 2000
			});
		},
		components: {
			myOrder,
			myCode
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.my_top {
		width: 100%;
		height: 510rpx;
		background-color: #27B451;

		.my_garden {
			width: 620rpx;
			height: 100%;
			background-color: #FFFFFF;
			opacity: 0.2;
			border-radius: 0 310rpx 310rpx 0;
		}

		.head {
			height: 180rpx;
			width: 100%;
			position: absolute;
			top: 180rpx;
			padding: 0 60rpx 0 60rpx;
			display: flex;
			align-content: center;
			justify-content: space-between;
			// background-color: #007AFF;

			.head_left {
				display: flex;

				.image1 {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					margin-top: 20rpx;
				}

				.head_title {
					display: flex;
					flex-direction: column;
					margin-left: 20rpx;

					.head_name {
						display: flex;
						margin-top: 30rpx;

						.name {
							color: #FFFFFF;
							font-size: 45rpx;
							// font-weight: bold;
						}

						.button {
							// opacity: 0.5;
							width: 240rpx;
							height: 70rpx;
							text-align: left;
							margin: 0 0 0 10rpx;
							padding: 0;
							font-size: 30rpx;
							background-color: #52c374;
							color: #FFFFFF;
							font-weight: bold;
						}

						.button::after {
							border: none;
						}

						.name2 {
							color: #FFFFFF;
							font-size: 25rpx;
							margin-left: 10rpx;
							margin-top: 25rpx;
							// font-weight: bold;
						}
					}

					.member {
						color: #FFFFFF;
						font-size: 20rpx;
						margin-top: 20rpx;
						margin-left: 20rpx;
						display: flex;
						align-items: center;
						// font-weight: bold;
					}
				}
			}

			.head_right {
				margin-right: 115rpx;
				margin-left: 50rpx;
				margin-top: 60rpx;

				.pic {
					width: 48rpx;
					height: 48rpx;
				}
			}
		}

		.array {
			position: relative;
			bottom: 100rpx;
			height: 200rpx;
			width: 632rpx;
			// margin: 0 60rpx 0 60rpx;
			margin-left: 60rpx;
			background-color: #FFFFFF;
			border-radius: 40rpx;

			display: flex;
			justify-content: space-around;
			box-shadow: 0rpx 1rpx 2rpx #CCCCCC;

			.array2 {
				display: flex;
				align-content: center;
				flex-direction: column;
				text-align: center;
				margin-top: 55rpx;

				.count {
					color: #000000;
					font-size: 40rpx;
					// font-weight: bold;
				}

				.name {
					color: #999999;
					font-size: 28rpx;
					margin-top: 10rpx;
					// font-weight: bold;
				}
			}
		}
	}
</style>
