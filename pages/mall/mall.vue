<template>
	<view>
		<!-- 搜索 -->
		<view class="search">
			<view class="search_input">
				<icon type="search" :size="13" color="#999"></icon>
				<text class="input_text">搜索商品</text>
			</view>
		</view>
		<!-- 左边列表 -->
		<scroll-view scroll-y :scroll-with-animation="isTap" scroll-anchoring class="classify_left"
			:scroll-into-view="leftIndex" :style="{ height: height + 'px', top: top + 'px' }">
			<view :id="`left_${index}`" v-for="(item, index) in LeftList" :key="index" class="left_tiem"
				:class="[currentTab == index ? 'active' : '']" :data-current="index" @tap.stop="selectLeft">
				<text>{{ item.name }}</text>
			</view>
		</scroll-view>
		<!-- 右边商品 -->
		<scroll-view @scroll="scroll" scroll-anchoring scroll-y scroll-with-animation class="classify_right"
			:scroll-into-view="rightIndex" :style="{ height: height + 'px', top: top + 'px' }">
			<block v-for="(item,index) in LeftList" :key="index">
				<t-linkage :distanceTop="distanceTop" :recalc="1" :scrollTop="scrollTop" :index="index"
					@linkage="linkage">
					<view class="right_list" :id="`right_${index}`">
						<view class="right_item">
							<view class="right_name">
								{{item.name}}
							</view>
							<!-- 商品列表 -->
							<view v-for="(item2,index2) in commodityData" :key="index2">
								<view v-if="item.id === item2.typeId" @click="exchange(item2)" class="right_trade">
									<image class="image11" :src="'https://shuaigang.top' + item2.tradeImg" mode="">
									</image>
									<view class="trade_name">
										<view class="name">
											{{item2.tradeName}}
										</view>
										<view class="name2">
											库存：{{item2.tradeNum}}
										</view>
										<view class="trade_flex">
											<view class="money">
												<image class="image22" src="../../../static/style/point.png" mode="">
												</image>
												{{item2.pointNum}}
											</view>
											<image class="image33" src="../../../static/style/point_for_shopping.png"
												mode=""></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</t-linkage>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import classification from '@/pages/mall/classification.vue';
	// import {
	// 	defineComponent,
	// 	onMounted,
	// 	reactive,
	// 	toRefs
	// } from "vue";
	import Base64 from 'base-64';
	import post from '@/http/request/request';
	export default {
		data() {
			return {
				LeftList: [{
						id: 1,
						name: '电子产品',
					},
					{
						id: 2,
						name: '垃圾产品',
					},
					{
						id: 3,
						name: '虚拟产品',
					},
					{
						id: 4,
						name: '其它',
					},
				],
				isTap: true,
				leftIndex: 'left_0',
				rightIndex: 'left_0',
				height: 0, //scroll-view高度
				top: 0,
				currentTab: 0, //预设当前项的值
				isScroll: true, //商品动画效果
				distanceTop: uni.upx2px(92), //滑动组件
				scrollTop: 0,
				userId: '',
				commodityData: []
			}
		},
		methods: {
			getSystemInfo() {
				// setTimeout(() => {
				uni.getSystemInfo({
					success: res => {
						let height = 92;
						let top = 0;
						//#ifdef H5
						top = 44;
						//#endif
						this.height = res.windowHeight - uni.upx2px(height);
						this.top = top + uni.upx2px(height);
					}
				})
				// }, 50)
			},
			exchange(item) {
				// console.log(item.id)
				// console.log(item.typeId)
				uni.showModal({ //提示框
					title: '确定要兑换吗？',
					complete: e => {
						if (e.confirm) {
							if (item.tradeNum >= 1) {
								if (uni.getStorageSync('shuaigangOVO')) {
									// 请求体数据
									const data = {
										//部分删除
									};
									// post请求
									post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
										let {
											code,
											message,
											customData
										} = res;
										if (code === 200) {
											uni.showToast({
												icon: "none",
												title: message,
												duration: 2000
											});
											item.tradeNum -= 1;
										} else {
											uni.showToast({
												icon: "none",
												title: message,
												duration: 2000
											});
										}
									});
								} else {
									uni.showToast({
										icon: "none",
										title: "未登录",
										duration: 2000
									});
								}
							} else {
								uni.showToast({
									icon: "none",
									title: "商品已售罄",
									duration: 2000
								});
							}
						}
					}
				});
			},
			// 点击标题切换
			selectLeft(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur;
					this.cartoon()
				}
			},
			//动画时长固定300ms
			scroll(e) {
				if (!this.isScroll) {
					setTimeout(() => {
						this.isScroll = true;
					}, 150);
				} else {
					this.scrollTop = e.detail.scrollTop;
				}
			},
			//滑动组件
			linkage(e) {
				if (e.isLinkage && e.index != this.currentTab) {
					this.isTap = false;
					this.currentTab = e.index;
					this.cartoon(true)
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			cartoon(isScroll) {
				if (!isScroll) {
					this.isScroll = false;
					this.isTap = true;
					if (this.currentTab > 6) {
						this.leftIndex = `left_${this.currentTab -2}`;
					} else {
						this.leftIndex = `left_0`
					}
					this.rightIndex = `right_${this.currentTab}`
				} else {
					this.leftIndex = `left_${this.currentTab}`;
				}
			},
			onShareAppMessage(res) {
				if (res.from === 'button') { // 来自页面内分享按钮
					console.log(res.target)
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
			getMallTrade() {
				// 请求体数据
				const data = {
				};
				// post请求
				post("/xxx/xxx/xxx/xxx", data).then((res, any) => {
					let {
						code,
						message,
						customData
					} = res;
					if (code === 200) {
						this.commodityData = customData;
					}
				});
			},

		},
		onLoad() {
			this.getSystemInfo();
			// uni.setStorageSync('shuaigangOVO', Base64.encode("GSG1"))
			uni.showShareMenu({
				withShareTicket: true,
				//设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
				menus: ["shareAppMessage", "shareTimeline"]
			})
		},
		onShow() {
			this.getMallTrade();
		},
		onPullDownRefresh() {
			this.getMallTrade();
		},
		components: {
			classification
		}
	}
</script>

<style lang="scss">
	// 搜索
	.search {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;

		:after {
			content: '';
			position: absolute;
			border-bottom: 1rpx solid #d2d2d2;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			bottom: 0;
			right: 0;
			left: 0;
		}

		.search_input {
			width: 100%;
			height: 60rpx;
			background-color: #F1F1F1;
			border-radius: 30rpx;
			font-size: 26rpx;
			color: #999;
			display: flex;
			align-items: center;
			justify-content: center;

			.input_text {
				padding-left: 16rpx;
			}
		}
	}

	// 右边列表
	.classify_left {
		width: 200rpx;
		position: fixed;
		left: 0;
		z-index: 10;

		.left_tiem {
			width: 200rpx;
			height: 110rpx;
			background: #F2F2F2;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #CCCCCC;
			font-weight: 400;
		}

		.active {
			position: relative;
			color: #1A1A1A;
			font-size: 28rpx;
			font-weight: 600;
			background: #FFFFFF;

			::before {
				content: '';
				position: absolute;
				border-left: 8rpx solid #27B451;
				height: 40rpx;
				left: 0;
			}
		}
	}

	//右边商品
	.classify_right {
		width: 100%;
		position: fixed;
		padding-left: 200rpx;
		box-sizing: border-box;
		// background-color: #FFFFFF;
		left: 0;

		.right_list {
			width: 100%;
			overflow: hidden;
			// padding-top: 20rpx;
			// padding-right: 20rpx;
			box-sizing: border-box;
			padding-bottom: env(safe-area-inset-bottom);

			.right_item {
				background-color: #FFFFFF;
				width: 100%;
				box-sizing: border-box;
				padding: 20rpx;

				// border-radius: 12rpx;
				.right_name {
					font-size: 28rpx;
					color: #1A1A1A;
					margin-top: 10rpx;
					margin-bottom: 20rpx;
					// font-weight: bold;
				}

				.right_trade {
					// width: 100%;
					display: flex;
					flex: 1;
					border-bottom: 1rpx solid #CCCCCC;
					margin-top: 20rpx;

					.image11 {
						height: 120rpx;
						width: 120rpx;
						border-radius: 20rpx;
					}

					.trade_name {
						flex: 2;
						// width: 100%;
						// margin-left: 15rpx;
						margin: 0 15rpx;

						.name {
							color: #1A1A1A;
							font-size: 28rpx;
						}

						.name2 {
							color: #808080;
							margin-top: 10rpx;
							font-size: 22rpx;
						}
					}

					.trade_flex {
						display: flex;
						margin-top: 10rpx;
						justify-content: space-between;
						margin-bottom: 10rpx;

						.money {
							color: #FF0101;
							font-size: 28rpx;

							.image22 {
								height: 30rpx;
								width: 30rpx;
							}
						}

						.image33 {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
						}
					}

				}
			}
		}
	}
</style>
