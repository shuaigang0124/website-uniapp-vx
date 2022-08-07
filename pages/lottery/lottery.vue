<template>
	<view class="my-top">
		<view class="my-list">
			<view class="item">
				<view class="num">{{point}}</view>
				<view class="extra-info">我的积分</view>
			</view>
			<view class="separate">
				<view>|</view>
			</view>
			<view class="item">
				<view class="num">{{prizeTotal}}</view>
				<view class="extra-info">中奖次数</view>
			</view>
		</view>
		<view class="gradientColor">
			<view class="order_item">
				<view class="order_li" v-for="(item,index) in orderList" :key="index" @click="skipOrderAll(index)">
					<image class="image" :src="item.img" mode=""></image>
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="activity-info">
		<view class="title">活动列表</view>
		<navigator class="more" url="/pages/lottery/add" style="color: #f20c00;">
			<image src="../../static/lottery/add.png" style="width: 13px;height: 13px;" />创建抽奖
		</navigator>
	</view>

	<view class="activity">
		<view class="activity-list" v-for="(item,index) in activityData" :key="index">
			<navigator hover-class="none"
				:url="`/pages/lottery/detail?id=${item.id}&&userId=${item.userId}&&reUserAvatar=${item.reUserAvatar}&&partPoint=${item.partPoint}&&activityName=${item.activityName}&&prizeImg=${item.prizeImg}&&prizeName=${item.prizeName}&&prizeUserId=${item.prizeUserId}&&isEnabled=${item.isEnabled}&&gmtTime=${item.gmtTime}&&peopleNum=${item.peopleNum}&&reUserName=${item.reUserName}&&prizeUserName=${item.prizeUserName}&&userJoinNum=${item.userJoinNum}`">
				<image class="activity-img" :src="'https://shuaigang.top' + item.prizeImg" mode=""></image>
			</navigator>
			<view class="activity-data">
				<!-- 奖品 -->
				<view class="activity-prizeName">
					奖品：{{item.prizeName}}
				</view>
				<view class="activity-buttom">
					<!-- 发起人 -->
					<view class="buttom-left">
						<view class="left1">
							<image class="reAvatar" :src="'https://shuaigang.top' + item.reUserAvatar"
								mode="aspectFit" />
						</view>
						<view class="left2">
							{{item.reUserName}}
						</view>
					</view>
					<view class="buttom-right">
						<navigator v-if="item.isEnabled !== 0" hover-class="none"
							:url="`/pages/lottery/detail?id=${item.id}&&userId=${item.userId}&&reUserAvatar=${item.reUserAvatar}&&partPoint=${item.partPoint}&&activityName=${item.activityName}&&prizeImg=${item.prizeImg}&&prizeName=${item.prizeName}&&prizeUserId=${item.prizeUserId}&&isEnabled=${item.isEnabled}&&gmtTime=${item.gmtTime}&&peopleNum=${item.peopleNum}&&reUserName=${item.reUserName}&&prizeUserName=${item.prizeUserName}&&userJoinNum=${item.userJoinNum}`">
							<button class="activity-button2">活动结束</button>
						</navigator>
						<navigator v-else-if="item.isEnabled === 0 && item.userId !== userId &&item.userJoinNum !== 1"
							hover-class="none"
							:url="`/pages/lottery/detail?id=${item.id}&&userId=${item.userId}&&reUserAvatar=${item.reUserAvatar}&&partPoint=${item.partPoint}&&activityName=${item.activityName}&&prizeImg=${item.prizeImg}&&prizeName=${item.prizeName}&&prizeUserId=${item.prizeUserId}&&isEnabled=${item.isEnabled}&&gmtTime=${item.gmtTime}&&peopleNum=${item.peopleNum}&&reUserName=${item.reUserName}&&prizeUserName=${item.prizeUserName}&&userJoinNum=${item.userJoinNum}`">
							<button class="activity-button">点击参与</button>
						</navigator>
						<navigator v-else-if="item.isEnabled === 0 && item.userId !== userId &&item.userJoinNum === 1"
							hover-class="none"
							:url="`/pages/lottery/detail?id=${item.id}&&userId=${item.userId}&&reUserAvatar=${item.reUserAvatar}&&partPoint=${item.partPoint}&&activityName=${item.activityName}&&prizeImg=${item.prizeImg}&&prizeName=${item.prizeName}&&prizeUserId=${item.prizeUserId}&&isEnabled=${item.isEnabled}&&gmtTime=${item.gmtTime}&&peopleNum=${item.peopleNum}&&reUserName=${item.reUserName}&&prizeUserName=${item.prizeUserName}&&userJoinNum=${item.userJoinNum}`">
							<button class="activity-button2">已参与</button>
						</navigator>
						<navigator v-else hover-class="none"
							:url="`/pages/lottery/detail?id=${item.id}&&userId=${item.userId}&&reUserAvatar=${item.reUserAvatar}&&partPoint=${item.partPoint}&&activityName=${item.activityName}&&prizeImg=${item.prizeImg}&&prizeName=${item.prizeName}&&prizeUserId=${item.prizeUserId}&&isEnabled=${item.isEnabled}&&gmtTime=${item.gmtTime}&&peopleNum=${item.peopleNum}&&reUserName=${item.reUserName}&&prizeUserName=${item.prizeUserName}&&userJoinNum=${item.userJoinNum}`">
							<button class="activity-button">点击查看</button>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import Base64 from 'base-64';
	import post from '@/http/request/request';
	import moment from 'moment';
	export default {
		data() {
			return {
				userId: '',
				attendanceState: false,
				point: 0,
				prizeTotal: 0,
				orderList: [{
						img: "../../static/lottery/sign_in.png",
						name: "每日签到"
					},
					{
						img: "../../static/lottery/create.png",
						name: "发起记录"
					},
					{
						img: "../../static/lottery/participate.png",
						name: "参与记录"
					},
					{
						img: "../../static/lottery/the_winning.png",
						name: "中奖记录"
					},
				],
				activityData: [{
					id: 0,
					userId: "GSG1",
					partPoint: 0,
					activityName: "",
					prizeImg: "",
					prizeName: "",
					prizeUserId: "",
					isEnabled: 0,
					gmtTime: "",
					peopleNum: 0,
					reUserName: "",
					reUserAvatar: "",
					prizeUserName: "",
					userJoinNum: 0,
				}, ],
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target);
			}
			return {
				title: '我们不能失去生活的意义', //分享的名称
				path: '/pages/lottery/lottery',
				mpId: 'wxc9626a093c19fc9d' //此处配置微信小程序的AppId
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: '我们不能失去生活的意义',
				type: 0,
				summary: "",
			}
		},
		methods: {
			skipOrderAll(index) {
				switch (index) {
					case 0:
						if (!this.attendanceState) {
							this.insertAttendance();
						} else {
							uni.showToast({
								title: '当日已签到，请勿重复签到!',
								icon: 'none'
							})
						}
						break;
					case 1:
						uni.showToast({
							title: '发起记录',
							icon: 'none'
						})
						break;
					case 2:
						uni.showToast({
							title: '参与记录',
							icon: 'none'
						})
						break;
					case 3:
						uni.showToast({
							title: '中奖记录',
							icon: 'none'
						})
						break;
				}
			},
			getAllActivity() {
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
						this.activityData = customData;
						// console.log(customData);
					}
				});
			},
			insertAttendance() {
				// 请求体数据
				const data = {};
				// post请求
				post("/xxx/xxxx/xxx/xxx", data).then(
					(res, any) => {
						let {
							code,
							message,
							customData
						} = res;
						if (code === 200 && message === "签到成功") {
							this.point += 2;
							this.attendanceState = true;
						}
						if (code === 5001 && message === "当日已签到，请勿重复签到！") {
							this.attendanceState = true;
						}
						uni.showToast({
							icon: "none",
							title: message,
							duration: 2000
						});
					}
				);
			},
		},
		onLoad() {
			uni.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			});
			// this.userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			// let point = uni.getStorageSync('userPoint');
			// let prizeTotal = uni.getStorageSync('prizeTotal');
			// if (point !== null && point !== '') {
			// 	this.point = point;
			// }
			// if (prizeTotal !== null && prizeTotal !== '') {
			// 	this.prizeTotal = prizeTotal;
			// }
			// this.getAllActivity();
		},
		onShow() {
			this.getAllActivity();
			let userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			if (userId) {
				this.userId = userId;
				// 请求体数据
				const data = {};
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
						post("/xxxx/v1/xxxx/xxxx", data).then((res, any) => {
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync('userPoint', customData.point);
								this.point = customData.point;
								// console.log("获取积分成功");
							}
						});
						// 获取用户中奖次数
						post("/xxxx/xxxx/xxx/xxx", data1).then((res, any) => {
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync('prizeTotal', customData.length);
								this.prizeTotal = customData.length;
								// console.log("获取中奖次数成功");
							}
						});
					}
				});
			} else {
				this.point = 0;
				this.prizeTotal = 0;
			};
		},
		onPullDownRefresh() {
			this.getAllActivity();
			let userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			if (userId) {
				// 请求体数据
				const data = {};
				const data1 = {};
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
								this.point = customData.point;
								// console.log("获取积分成功");
							}
						});
						// 获取用户中奖次数
						post("/xxx/xxx/xxxx/xxx", data1).then((res, any) => {
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync('prizeTotal', customData.length);
								this.prizeTotal = customData.length;
								// console.log("获取中奖次数成功");
							}
						});
					}
				});
			} else {
				this.point = 0;
				this.prizeTotal = 0;
			};
			uni.stopPullDownRefresh();
			uni.showToast({
				icon: "none",
				title: "刷新成功！",
				duration: 2000
			});
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.my-top {
		width: 100%;
		background-color: #f20c00;

		.my-list {
			width: 100%;
			display: flex;
			align-content: center;

			.item {
				color: #fff;
				text-align: center;
				padding: 50rpx 0 50rpx 0;
				flex: 1;

				.num {
					font-size: 20px;
				}

				.extra-info {
					font-size: 14px;
					margin-top: 4rpx;
				}
			}

			.separate {
				color: rgb(220, 220, 220, 0.5);
				font-size: 20px;
				padding: 60rpx 0;
			}
		}

		.gradientColor {
			width: 100%;
			height: 100rpx;
			background: linear-gradient(#f20c00, #F2F2F2);
			background-color: #FFFFFF;

			.order_item {
				height: 200rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				text-align: center;
				display: flex;
				justify-content: space-between;
				align-content: center;
				margin: 0 20rpx 0 20rpx;

				.order_li {
					display: flex;
					flex-direction: column;
					text-align: center;
					margin-top: 50rpx;
					width: 90%;

					.image {
						width: 61rpx;
						height: 53rpx;
						margin: 0 auto;
					}

					.name {
						color: black;
						margin-top: 10rpx;
						font-size: 28rpx;
					}
				}
			}
		}
	}

	.activity-info {
		margin: 130rpx 25rpx 0 25rpx;
		display: flex;
		justify-content: space-between;
		align-content: center;
		font-size: 14px;
		align-items: center;

		.title {
			font-size: 18px;
			color: #404040;
			font-weight: bold;
		}

		.more {
			color: #1550b5;
		}
	}

	.activity {
		margin: 30rpx 25rpx 0 25rpx;

		.activity-list {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-bottom: 30rpx;

			.activity-img {
				border-radius: 20rpx 20rpx 0 0;
				width: 100%;
			}

			.activity-data {
				margin: 15rpx 20rpx 0 20rpx;

				.activity-prizeName {
					font-size: 20px;
				}

				.activity-buttom {
					width: 100%;
					padding: 15rpx 0 15rpx 0;
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					align-items: center;
					height: 50px;

					.buttom-left {
						height: 100%;
						display: flex;
						font-size: 14px;
						align-items: center;
						font-size: 16px;

						.left1 {
							text-align: center;

							.reAvatar {
								width: 30px;
								height: 30px;
								border-radius: 50%;
								margin-right: 3px;
							}
						}

						.left2 {
							color: #999999;
						}

					}

					.buttom-right {
						.activity-button {
							size: mini;
							font-size: 13px;
							font-weight: 600;
							color: #fff;
							background-color: #f20c00;
							border-radius: 20px;
						}

						.activity-button2 {
							size: mini;
							font-size: 13px;
							font-weight: 600;
							color: #808080;
							background-color: #D3D3D3;
							border-radius: 20px;
						}
					}


				}
			}
		}

	}
</style>
