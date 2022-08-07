<template>
	<view class="page">
		<view class="top">
			<view class="location-info" @click="selectCity">
				<!-- <image src="../../../static/img/gsg.jpg" class="icon" mode="aspectFit" />
				<text class="addr">{{region}}</text> -->
				<uni-icons class="arrow" color="#fff" type="arrowdown" size="10" />
			</view>
			<view class="search-box">
				<uni-icons class="search" color="#404040" type="search" size="18" />
				<input class="m-input" type="text" v-model="keyword" placeholder="搜索你想要加入的教会(如:圣火喵喵教)"
					@click="toSearch" />
			</view>
		</view>
		<view class="navs">
			<view class="page-section-spacing">
				<view class="swiper-box">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration">
						<swiper-item>
							<view class="swiper-item uni-bg-red">
								<image
									src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/2022-maomaojiao2.webp"
									mode="aspectFill"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green">
								<image
									src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/2022-maomaojiao.webp"
									mode="aspectFill"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue">
								<image
									src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp"
									mode="aspectFill"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="modules">
				<view class="item">
					<image class="pic"
						src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240639925-2633492627893272.webp" />
					<view class="name">圣火喵喵教</view>
				</view>
				<view class="item">
					<image class="pic"
						src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp" />
					<view class="name">皓月狗狗教</view>
				</view>
				<view class="item">
					<image class="pic"
						src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp" />
					<view class="name">鸟儿教</view>
				</view>
				<view class="item">
					<image class="pic"
						src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp" />
					<view class="name">鸡公教</view>
				</view>
			</view>
		</view>
		<view class="news-box">
			<view class="section-info">
				<view class="title">最新新闻</view>
				<navigator class="more" url="">查看更多 ></navigator>
			</view>
			<view class="news-list">
				<view class="item">
					<view class="left">
						<view class="title">7月圣火喵喵教召开了第n次教会</view>
						<view class="extra-info">
							<view class="type">教会资讯</view>
							<text class="date">2022-07-19</text>
						</view>
					</view>
					<view class="right">
						<image class="news-pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240593536-2633446239241456.webp"
							mode="aspectFill" />
					</view>
				</view>
				<view class="item">
					<view class="left">
						<view class="title">中共中央党委提出拥护圣火喵喵教刻不容缓</view>
						<view class="extra-info">
							<view class="type">政策法规</view>
							<text class="date">2022-07-01</text>
						</view>
					</view>
					<view class="right">
						<image class="news-pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240639925-2633492627893272.webp"
							mode="aspectFill" />
					</view>
				</view>
				<view class="item">
					<view class="left">
						<view class="title">关于明天浙江气温又将回升的通知，希望各位教徒注意避暑</view>
						<view class="extra-info">
							<view class="type">预测预报</view>
							<text class="date">2022-07-19</text>
						</view>
					</view>
					<view class="right">
						<image class="news-pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp"
							mode="aspectFill" />
					</view>
				</view>
			</view>
		</view>
		<view class="experts-box">
			<view class="section-info">
				<view class="title">精选好教主</view>
				<navigator class="more" url="">更多精选 ></navigator>
			</view>
			<view class="experts-list">
				<view class="item">
					<view class="title">专家推荐</view>
					<view class="extra-info">精准纳入教会</view>
				</view>
				<view class="item">
					<view class="title">好评最多</view>
					<view class="extra-info">教会发展最庞大</view>
				</view>
			</view>
		</view>
		<view class="qa-box">
			<view class="section-info">
				<view class="title">最新问答</view>
				<navigator class="more" url="">更多问答 ></navigator>
			</view>
			<view class="qa-list">
				<view class="item">
					<view class="title">“圣火喵喵教”PK光明“狗狗教”，你支持哪派？</view>
					<!-- <view class="user-info">
						<image class="avatar" src="http://img3.imgtn.bdimg.com/it/u=15857274,120780525&fm=26&gp=0.jpg"
							mode="aspectFill" />
						<view class="name">给它一大比斗</view>
					</view> -->
					<view class="q-content">
						最近抖音上开始了一场猫狗大战，圣火喵喵教和皓月狗狗教的成员们都想称霸世界，双方互不相让，并且在评论区开展了无比激烈的斗争，
						不过猫猫教凭借有教歌这一点占据上风，虽说狗狗教也出了教歌，不过很多人听了之后说要退出狗狗教。
						圣火喵喵教和地球喵喵教的梗如出一辙，都是由一群爱猫人士自发组建的“教派”，主要目的是为了让一群有共同爱好的人一起愉快的“吸猫”。
						圣火喵喵教口号：圣火昭昭，圣火耀耀，凡我弟子，喵喵喵喵！
						flame burning,flame shining,all my kitty,meow meow meow meow!
						扣1力挺圣火喵喵教，扣2力挺狗狗教！
					</view>
					<view class="q-pic">
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240771812-2633624514683903.webp"
							mode="aspectFill" />
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp"
							mode="aspectFill" />
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20211220/1639986778631-94076075059201.webp"
							mode="aspectFill" />
					</view>
					<view class="other-info">
						<text class="total-ans">24个回答</text>
						· 2022-02-22
					</view>
				</view>
				<view class="item">
					<view class="title">最近很多小伙伴们看见关于圣火喵喵教这样的名字，关于圣火喵喵教具体又是怎么样的教派呢？</view>
					<!-- <view class="user-info">
						<image class="avatar" src="http://img3.imgtn.bdimg.com/it/u=15857274,120780525&fm=26&gp=0.jpg"
							mode="aspectFill" />
						<view class="name">圣火昭昭，圣火耀耀，凡我弟子‌‌‌‌‌‌‌‌‌‌‌‌，喵喵喵喵。</view>
					</view> -->
					<view class="q-content">1、该梗主要源于剑三中的明教大光明录：
						2、其中的内容为：圣火昭昭，圣光耀耀，凡我弟子，同心同劳，怜我世人，飘零无助，恩泽万物，唯光明故......
						3、如今出现了一中十分神奇的宗教，该宗教中的人们全部都信仰猫咪、
						4、大家也是可以理解为是超级喜欢猫咪的人们而自发组成的。
						5、圣火喵喵教源自很多网友在晒猫时会配上这段文字：圣火昭昭，圣火耀耀，凡我弟子‌‌‌‌‌‌‌‌‌‌‌‌，喵喵喵喵。
						6、搭配上喵喵喵喵的BGM，试问谁能拒绝加入圣火喵喵教呢！
					</view>
					<view class="q-pic">
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240593536-2633446239241456.webp"
							mode="aspectFill" />
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240639925-2633492627893272.webp"
							mode="aspectFill" />
						<image class="pic"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240661956-2633514658888729.webp"
							mode="aspectFill" />
					</view>
					<view class="other-info">
						<text class="total-ans">66个回答</text>
						· 2022-07-01
					</view>
				</view>
			</view>
		</view>
		<view class="videos-box">
			<view class="section-info">
				<view class="title">知识讲堂</view>
				<navigator class="more" url="">更多知识 ></navigator>
			</view>
			<view class="videos-list">
				<view class="item">
					<view class="left">
						<image class="cover"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20220719/1658240771812-2633624514683903.webp"
							mode="aspectFill" />
						<view class="play-time">
							<image class="play-icon" src="/static/img/gsg.jpg" mode="aspectFit" />
							05:20
						</view>
					</view>
					<view class="right">
						<view class="title">猫咪喜欢空间狭窄的地方，例如房间的角落或者纸盒等，
							主人可以在家里给猫咪准备猫爬架或者猫窝等属于猫的隐私空间的地方。其次猫咪喜欢夜间行动，
							猫咪的夜视能力非常好，晚上的活动量比白天大，白天大多数都是在睡觉，喜欢与人互动玩耍。
							另外就是它反应迅速、行动敏捷、善于捕捉猎物，主人可以给猫咪购买逗猫棒等玩具。
							最后猫十分爱干净，这几乎是所有猫咪都通有的习性，可以见到除了流浪猫以外的猫咪身体都是十分清洁的，
							那是它们时常舔它们的毛发，以保持清洁，主人需要给它饲喂一些化毛的产品，猫草之类的，帮助它们消化体内的毛球，
							避免因为舔舐毛发过多形成毛球症出现呕吐的症状。</view>
						<view class="extra-info">
							<view class="owner">圣火喵喵教研究所</view>
							·
							<text class="date">2022-05-20</text>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="left">
						<image class="cover"
							src="https://shuaigang.top/gsg/static-resource/formal/2/20211218/1639807415900-1622025345981709.webp"
							mode="aspectFill" />
						<view class="play-time">
							<image class="play-icon" src="/static/img/123456.jpg" mode="aspectFit" />
							02:50
						</view>
					</view>
					<view class="right">
						<view class="title">狗的生活习性，在被人们养成一个宠物犬了之后呢，狗狗其实算是一个杂食性的动物，
							除了肉，他们也能接受一些蔬菜和一些水果，那么狗狗是一个非常忠诚的品种，它们有非常传统，非常良好的美德，
							比如说它们对主人非常的忠诚，它们对人非常的友好，那么狗呢，大家也知道它们的嗅觉和听觉是非常灵敏的，
							他们甚至是通过嗅觉去判断同伴的性别。那么当然相反的，它们的一个味觉和一个视觉是比较差的。
							它们的味觉呢，主要是用来品尝一些食物的新鲜和腐败，它们的视觉范围，基本上维持在距离20米到30米左右。
							那除了这些习惯呢，狗狗还喜欢跟人打交道，喜欢玩玩具狗狗呢。
							还是警惕性比较高的，它们有自我防御能力，比如说他们在一个地方要趴下之前，他们会先转一圈审视一遍，确认这个地方安全了才会趴下。
							当然一些这样的狗，由于在家中获得极大的安全感，这些行为可能表现的并不是那么明显，
							狗在夏天的时候呢，通过舌头来散热，它们身上是没有汗腺的，它们会张大嘴巴大口喘气来散热，
							随着人类饲养水平越来越高，所的寿命基本上是在15年到20年之间，那么狗的习性，主要是以上这些你都清楚了。
							小贴士，狗狗很忠诚，是杂食性动物，虽然嗅觉很好，
							但是视觉味觉很差，狗狗警惕性比较高，它们身上没有汗腺，通过张大嘴巴来散热，寿命一般在15到20年之间。</view>
						<view class="extra-info">
							<view class="owner">狗狗教研究所</view>
							·
							<text class="date">2019-10-29</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Base64 from 'base-64';
	// import {
	// 	mapMutations
	// } from 'vuex';
	// import uniIcons from '@/components/uni-icon/uni-icon.vue';
	// import citySelect from '@/components/city-select/city-select.vue';
	import uniPopup from '@/pages/home/uni-popup.vue';
	import {
		defineComponent,
		onMounted,
		reactive,
		toRefs
	} from "vue";
	import post from '@/http/request/request';
	export default defineComponent({
		components: {
			// uniIcons,
			// citySelect,
			uniPopup
		},
		props: {},
		setup() {
			const state = reactive({
				show: false,
				region: '',
				keyword: '',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			});
			const methods = {
				// ...mapMutations(['logout']),
				toSearch() {
					uni.navigateTo({
						url: '../../search/search'
					});
				},
				selectCity() {
					this.show = true;
				},
				back_city(e) {
					if (e !== 'no') {
						this.region = e.cityName;
					}
					this.show = false;
				},
				onShareAppMessage(res) {
					if (res.from === 'button') { // 来自页面内分享按钮
						console.log(res.target)
					}
					return {
						title: '', //分享的名称
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
			};
			onMounted(() => {});
			const request = {};
			return {
				...methods,
				...toRefs(state)
			};
		}
	})
</script>

<style lang="scss">
	.page {
		background: #fbf7fb;

		.top {
			height: 156px;
			background: #1550b5;
			padding: 0 16px;

			.location-info {
				display: flex;
				align-content: flex-start;
				align-items: center;
				justify-content: flex-start;
				justify-items: center;
				color: #fff;

				.icon {
					width: 16px;
					height: 20px;
					margin-right: 8px;
				}

				.addr {
					font-size: 16px;
					font-weight: 500;
					margin-right: 4px;
				}
			}

			.search-box {
				margin-top: 22px;
				background: #fff;
				position: relative;
				height: 36px;
				display: flex;
				align-content: center;
				justify-content: flex-start;
				border-radius: 4px;

				.search {
					position: absolute;
					left: 16px;
					top: 50%;
					margin-top: -9px;
				}

				.m-input {
					width: 100%;
					height: 100%;
					padding-left: 38px;
					border-radius: 4px;

					.uni-input-placeholder {
						color: #999999;
						font-size: 14px;
					}
				}
			}
		}

		.navs {
			min-height: 214px;
			padding: 0 16px;
			background: #fff;

			.page-section-spacing {
				position: relative;
				height: 80px;

				.swiper-box {
					position: absolute;
					z-index: 10;
					background: #fff;
					width: 100%;
					top: -48px;
					border-radius: 4px;
					box-shadow: 0px 2px 12px 0px rgba(153, 153, 153, 0.16);

					.swiper {
						height: 130px;

						.swiper-item {
							border-radius: 4px;
							height: 100%;

							image {
								width: 100%;
							}
						}
					}
				}
			}

			.modules {
				margin-top: 32px;
				display: flex;

				.item {
					flex: 1;
					text-align: center;

					.pic {
						width: 48px;
						height: 48px;
						border-radius: 100%;
						background: #f1f1f1;
						margin: 0 auto;
					}

					.name {
						color: #333333;
						font-size: 14px;
					}
				}
			}
		}

		.news-box {
			margin-top: 12px;
			padding: 24px 16px;
			background: #fff;

			.section-info {
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

			.news-list {
				margin-top: 8px;

				.item {
					display: flex;
					justify-content: space-between;
					margin: 16px 0;

					.left {
						flex: 1;

						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							height: 44px;
							line-height: 22px;
							font-size: 16px;
							color: #404040;
							font-weight: bold;
						}

						.extra-info {
							display: flex;
							align-content: flex-start;
							font-size: 14px;
							margin-top: 16px;

							.type {
								color: #1550b5;
								margin-right: 16px;
							}

							.date {
								color: #999999;
							}
						}
					}

					.right {
						.news-pic {
							width: 110px;
							height: 80px;
						}
					}
				}
			}
		}

		.experts-box {
			margin-top: 12px;
			padding: 24px 16px;
			background: #fff;

			.section-info {
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

			.experts-list {
				margin-top: 20px;
				display: flex;
				align-content: flex-start;

				.item {
					color: #fff;
					font-size: 14px;
					padding: 18px 0 16px 12px;
					flex: 1;

					.title {
						font-size: 16px;
					}

					.extra-info {
						margin-top: 4px;
					}

					&:nth-child(1) {
						background: linear-gradient(315deg, rgba(28, 206, 175, 1) 0%, rgba(0, 141, 152, 1) 100%);
						margin-right: 15px;
					}

					&:nth-child(2) {
						background: linear-gradient(48deg, rgba(255, 205, 80, 1) 0%, rgba(244, 166, 0, 1) 100%);
					}
				}
			}
		}

		.qa-box {
			margin-top: 12px;
			padding: 24px 16px;
			background: #fff;

			.section-info {
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

			.qa-list {
				margin-top: 20px;

				.item {
					margin: 16px 0;

					.title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						line-height: 22px;
						font-size: 16px;
						color: #404040;
						font-weight: bold;
					}

					.user-info {
						margin-top: 12px;
						display: flex;
						align-content: flex-start;
						align-items: center;

						.avatar {
							width: 32px;
							height: 32px;
							border-radius: 100%;
						}

						.name {
							margin-left: 12px;
							font-size: 14px;
							color: #404040;
							font-weight: bold;
						}
					}

					.q-content {
						font-size: 14px;
						line-height: 20px;
						margin: 4px 0 12px 0;
						color: #666666;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.q-pic {
						display: flex;
						align-content: flex-start;

						.pic {
							flex: 1;
							width: 104px;
							height: 104px;
							border-radius: 8px;

							&:nth-child(2) {
								margin: 0 16px;
							}
						}
					}

					.other-info {
						color: #999999;
						font-size: 14px;
						margin-top: 12px;

						.total-ans {
							color: #1550b5;
							margin-right: 5px;
						}
					}
				}
			}
		}

		.videos-box {
			margin-top: 12px;
			padding: 24px 16px;
			background: #fff;

			.section-info {
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

			.videos-list {
				margin-top: 8px;

				.item {
					display: flex;
					justify-content: flex-start;
					margin: 16px 0;

					.left {
						width: 121px;
						margin-right: 12px;
						position: relative;
						height: 75px;

						.cover {
							width: 121px;
							height: 75px;
						}

						.play-time {
							position: absolute;
							bottom: 8px;
							right: 4px;
							background: rgba(33, 33, 33, 0.6);
							border-radius: 12px;
							display: flex;
							align-content: flex-start;
							color: #fff;
							font-size: 10px;
							align-items: center;
							padding: 0 8px;

							.play-icon {
								width: 10px;
								height: 10px;
								margin-right: 3px;
							}
						}
					}

					.right {
						.title {
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							height: 44px;
							line-height: 22px;
							font-size: 16px;
							color: #404040;
							font-weight: bold;
						}

						.extra-info {
							display: flex;
							align-content: flex-start;
							font-size: 14px;
							margin-top: 7px;
							color: #999999;

							.owner {
								margin-right: 5px;
							}

							.date {
								margin-left: 5px;
							}
						}
					}
				}
			}
		}
	}
</style>
