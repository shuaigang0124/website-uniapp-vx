<template>
	<view class="my-top">
		<view class="my-head">
			<view class="item">
				<image class="image1" :src="'https://shuaigang.top' + activityData.reUserAvatar"></image>
			</view>
			<view class="item">
				<view class="content">
					<view class="reUserName">{{activityData.reUserName}}</view>
					<view class="num">已发布{{num}}次抽奖</view>
				</view>
			</view>
		</view>
		<view class="gradientColor">
			<view class="item2">
				<view class="img2">
					<image class="image2" :src="'https://shuaigang.top' + activityData.prizeImg">
					</image>
				</view>
				<view class="content2">
					<view class="prizeName">奖品：{{activityData.prizeName}}</view>
					<view
						v-if="activityData.prizeUserName !== '' && activityData.prizeUserName !== null && activityData.prizeUserName !== 'null'"
						class="prizeUserName">恭喜用户【<view class="content">{{activityData.prizeUserName}}</view>】中奖
					</view>
					<view v-else class="partPoint">消耗积分：{{activityData.partPoint}}
						<image class="pointImage" src="../../static/style/point.png" mode="">
						</image>
					</view>
					<view class="gmtTime">开奖时间：{{activityData.gmtTime}}</view>
				</view>
			</view>
			<view class="event">
				<view class="button">
					<button v-if="activityData.isEnabled !== 0" class="activityEnd">活动结束</button>
					<button
						v-else-if="activityData.isEnabled === 0 && activityData.userId !== userId && activityData.userJoinNum === 0"
						class="joinActivity" @click="goToLottery">参与抽奖</button>
					<button
						v-else-if="activityData.isEnabled === 0 && activityData.userId !== userId && activityData.userJoinNum !== 0"
						class="activityEnd">已参与</button>
					<button v-else class="joinActivity">等待开奖</button>
				</view>
				<view class="joinNum">
					<view class="peopleNum">已有{{activityData.peopleNum}}人参与</view>
				</view>
			</view>
		</view>
	</view>
	<view class="bottom">
		<!-- 		<view class="nextActivity">
			<button class="nextButton" shape="circle">参与下个抽奖</button>
		</view> -->
	</view>
</template>

<script>
	import Base64 from 'base-64';
	import post from '@/http/request/request';
	export default {
		data() {
			return {
				userId: '',
				num: 10,
				activityData: {
					id: 0,
					userId: "",
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
				},
			}
		},
		methods: {
			goToLottery() {
				// 请求体数据
				const data = {
				};
				// post请求
				post("/xxx/xxx/xxxx/xxx", data).then((res, any) => {
					let {
						code,
						message,
						customData
					} = res;
					if (code === 200) {
						this.activityData.userJoinNum = 1;
						uni.showToast({
							icon: "none",
							title: "参与成功！",
							duration: 2000
						});
					}
				});
			},
		},
		onLoad: function(option) {
			this.userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			// console.log(option);
			this.activityData.id = Number(option.id);
			this.activityData.userId = option.userId;
			this.activityData.partPoint = Number(option.partPoint);
			this.activityData.activityName = option.activityName;
			this.activityData.prizeImg = option.prizeImg;
			this.activityData.prizeName = option.prizeName;
			if (option.prizeUserId !== 'null') {
				this.activityData.prizeUserId = option.prizeUserId;
				this.activityData.prizeUserName = option.prizeUserName;
			}
			this.activityData.isEnabled = Number(option.isEnabled);
			this.activityData.gmtTime = option.gmtTime;
			this.activityData.peopleNum = Number(option.peopleNum);
			this.activityData.reUserName = option.reUserName;
			this.activityData.reUserAvatar = option.reUserAvatar;
			this.activityData.userJoinNum = Number(option.userJoinNum);
			// this.activityData = option;
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.my-top {
		width: 100%;
		background-color: #f20c00;

		.my-head {
			width: 100%;
			display: flex;
			align-content: center;

			.item {
				text-align: left;
				padding: 20rpx 0 20rpx 20rpx;

				.image1 {
					margin-left: 10rpx;
					width: 60px;
					height: 60px;
					border-radius: 10%;
				}

				.content {
					align-items: center;
					align-content: center;

					.reUserName {
						color: #F5F5F5;
						margin-top: 15rpx;
						font-size: 20px;
					}

					.num {
						color: #DCDCDC;
						margin-top: 15rpx;
						font-size: 13px;
					}

				}

			}

		}

		.gradientColor {
			width: 100%;
			height: calc(50vw - 20rpx);
			background: linear-gradient(#f20c00, #F2F2F2);
			background-color: #FFFFFF;

			.item2 {
				justify-content: space-between;
				border-radius: 20rpx;
				background-color: #FFFFFF;
				margin: 0 20rpx 0 20rpx;

				.img2 {
					width: 100%;

					.image2 {
						border-radius: 20rpx 20rpx 0 0;
						width: 100%;
					}
				}

				.content2 {
					padding: 20rpx 0 20rpx 40rpx;

					.prizeName {
						font-size: 16px;
					}

					.prizeUserName {
						display: flex;
						margin-top: 10rpx;
						font-size: 16px;

						.content {
							color: blue;
						}
					}

					.partPoint {
						margin-top: 10rpx;
						font-size: 16px;
						display: flex;
						align-items: center;

						.pointImage {
							margin-left: 5rpx;
							height: 30rpx;
							width: 30rpx;
						}
					}

					.gmtTime {
						color: #A9A9A9;
						margin-top: 10rpx;
						font-size: 12px;
					}
				}
			}

			.event {
				padding: 40rpx 0 40rpx 0;

				.button {
					display: flex;
					align-items: center;

					.activityEnd {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #D3D3D3;
						color: #808080;
						width: 100px;
						height: 100px;
						border-radius: 50%;
					}

					.joinActivity {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #f20c00;
						color: #fff;
						width: 100px;
						height: 100px;
						border-radius: 50%;
					}
				}

				.joinNum {
					margin-top: 40rpx;

					.peopleNum {
						color: #808080;
						text-align: center;
					}
				}
			}
		}

	}

	.bottom {
		background-color: #fff;
		background: linear-gradient(#F2F2F2, #f20c00);
		height: 100px;
		z-index: -1;
		width: 100%;
		position: fixed;
		bottom: var(--window-bottom, 0);

		// .nextActivity {
		// 	padding: 20rpx 20rpx 20rpx 20rpx;
		// 	// display: flex;
		// 	// align-items: center;
		// 	// align-content: center;

		// 	.nextButton {
		// 		background-color: #f20c00;
		// 		color: #fff;
		// 		border-radius: 30px;
		// 	}
		// }
	}
</style>
