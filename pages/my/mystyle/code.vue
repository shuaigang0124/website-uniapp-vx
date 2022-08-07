<template>
	<view class="">
		<view class="code" v-for="(item,index) in codeList" :key="index" @click="skip(index)">
			<view class="left">
				<image class="image" :src="item.img" mode=""></image>
				<view class="left_name">
					{{item.name}}
				</view>
			</view>
			<view class="right">
				<icon class="cuIcon-right"></icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeList: [{
					img: "../../../static/style/address.png",
					name: "收货管理"
				}, {
					img: "../../../static/style/kefu.png",
					name: "客服帮助"
				}, {
					img: "../../../static/style/more.png",
					name: "更多"
				}, ]
			}
		},
		methods: {
			skip(index) {
				switch (index) {
					case 0:
						uni.showToast({
							title: '跳转地址管理',
							icon: 'none'
						})
						break;
					case 1:
						uni.showToast({
							title: '跳转客服',
							icon: 'none'
						})
						break;
					case 2:
						uni.showToast({
							title: '跳转更多',
							icon: 'none'
						})
						break;
				}
			}
		},
	}
</script>

<style lang="scss">
	.code {
		// margin-top: 10rpx;
		line-height: 70rpx;
		width: 100%;
		padding: 0 60rpx;
		background-color: #FFFFFF;
		display: flex;
		align-content: center;
		justify-content: space-between;
		// border-bottom: 1rpx solid #CCCCCC;

		.left {
			display: flex;

			.image {
				width: 44rpx;
				height: 44rpx;
				margin: auto 0;
			}

			.left_name {
				color: #999999;
				font-size: 28rpx;
				margin-left: 10rpx;
			}
		}

		.right {
			color: #999999;
		}
	}
</style>
