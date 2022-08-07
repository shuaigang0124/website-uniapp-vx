<template>
	<view class="order">
		<view class="order_title">
			<view class="title_right">
				商品记录
			</view>
			<view class="title_left" @click="skipAll(0)">
				更多 »
			</view>
		</view>
		<view class="order_item">
			<view class="order_li" v-for="(item,index) in orderList" :key="index" @click="skipAll(index + 1)">
				<image class="image" :src="item.img" mode=""></image>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{
						img: "../../../static/style/release.png",
						name: "我的商品"
					},
					{
						img: "../../../static/style/exchange.png",
						name: "待发货"
					},
					{
						img: "../../../static/style/release.png",
						name: "待签收"
					},
					{
						img: "../../../static/style/activity.png",
						name: "反馈/售后"
					},
				]
			}
		},
		methods: {
			skipAll(index) {
				switch (index) {
					case 0:
						uni.showToast({
							title: '查看详情',
							icon: 'none'
						})
						break;
					case 1:
						uni.showToast({
							title: '查看我发布的商品',
							icon: 'none'
						})
						break;
					case 2:
						uni.showToast({
							title: '查看待发货记录',
							icon: 'none'
						})
						break;
					case 3:
						uni.showToast({
							title: '查看待签收记录',
							icon: 'none'
						})
						break;
					case 4:
						uni.showToast({
							title: '反馈/售后',
							icon: 'none'
						})
						break;
				}
			}
		},
	}
</script>

<style lang="scss">
	.order {
		background-color: #FFFFFF;
		width: 100%;
		height: 330rpx;

		.order_title {
			line-height: 50rpx;
			// background-color: #007AFF;
			margin: 0 58rpx;
			padding-top: 120rpx;
			display: flex;
			justify-content: space-between;
			align-content: center;
			border-bottom: 1rpx solid #CCCCCC;

			.title_right {
				color: #000000;
				font-size: 30rpx;
				font-weight: bold;
			}

			.title_left {
				color: #999999;
				font-size: 22rpx;
			}
		}

		.order_item {
			// width: 100rpx;
			text-align: center;
			display: flex;
			justify-content: space-between;
			align-content: center;
			// background-color: #007AFF;
			margin: 0 58rpx;

			.order_li {
				display: flex;
				flex-direction: column;
				text-align: center;
				margin-top: 20rpx;
				width: 126rpx;

				.image {
					width: 61rpx;
					height: 53rpx;
					margin: 0 auto;
				}

				.name {
					color: #999999;
					margin-top: 10rpx;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
