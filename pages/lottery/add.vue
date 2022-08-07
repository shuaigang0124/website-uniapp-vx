<template>
	<view class="all">
		<view class="title">基础信息</view>
		<view class="title-info">
			<view class="info-list">
				<view class="img" @click="uploadImg">
					<image class="image" :src="inputData.prizeImg !== '' && inputData.prizeImg !== null 
						? inputData.prizeImg : 'https://shuaigang.top/gsg/static-resource/formal/2/20220805/lihe.webp'" />
					<button class="txt">更换图片</button>
				</view>
				<view class="uni-form-item">
					<view class="left">活动名称</view>
					<view class="right">
						<input class="uni-input" v-model="inputData.activityName" focus placeholder="请输入活动名称" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="left">奖品名称</view>
					<view class="right">
						<input class="uni-input" v-model="inputData.prizeName" hold-keyboard placeholder="请输入奖品名称" />
					</view>
				</view>
				<view class="uni-form-item">
					<view class="left">参与积分</view>
					<view class="right">
						<input class="uni-input" type="number" @input="numInput" maxlength="3"
							v-model="inputData.partPoint" hold-keyboard placeholder="请输入参与积分" />
					</view>
				</view>
			</view>
		</view>
		<view class="time">开奖时间</view>
		<view class="time-info">
			<view class="info-list">
				<view class="uni-item">
					<view class="left">开奖时间</view>
					<view class="right">
						<!-- v-model="dateTime" -->
						<picker mode="multiSelector" :range="dateTimeArray" :value="dateTime" @change="change"
							@columnchange="columnchange">
							<view class="uni-input">
								<!-- disable = "true" 是禁用input 防止点击弹出键盘 -->
								<input type="text" disabled="true" v-model="inputData.gmtTime" placeholder="请选择时间"
									placeholder-class="inputPlace" />
							</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
	</view>
	<view class="bottom">
		<view class="insertActivity">
			<button class="button" @click="reActivity()">发起抽奖</button>
		</view>
	</view>
</template>

<script>
	import Base64 from 'base-64';
	import moment from 'moment';
	import post from '@/http/request/request';
	export default {
		data() {
			return {
				userId: '',
				inputData: {
					userId: '',
					activityName: '',
					prizeName: '',
					prizeImg: '',
					partPoint: '',
					gmtTime: '',
				},
				dateTimeArray: null,
				dateTime: null,
				startYear: 2022,
				endYear: 2099,
			}
		},
		methods: {
			numInput(e) {
				const o = e.target;
				const inputRule = /[^\d]/g
				this.$nextTick(function() {
					this.inputData.partPoint = o.value.replace(inputRule, '');
				})
			},
			uploadImg() {
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
						that.inputData.prizeImg = res.tempFiles[0].path;
						console.log("获取图片成功")
						if (res.tempFiles[0].size / 1024 / 1024 < 2) {
							uni.uploadFile({
								url: 'https://xxx/xxx/xxx/xxx',
								filePath: res.tempFilePaths[0],
								header: {
									'Authorization': uni.getStorageSync('token'),
									"Content-Type": "multipart/form-data",
								},
								name: 'file',
								formData: {
									multipartFile: res.tempFilePaths[0],
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
									console.log(data);
									console.log(code);
									console.log(message);
									console.log(customData);
									if (code === 200 && message === 'OK' &&
										customData !== null) {
										console.log("上传成功");
										that.inputData.prizeImg = customData.imgPath;
										console.log(that.inputData.prizeImg);
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
								title: '图片大小不能超过2MB！',
								duration: 2000
							});
						}
					}
				});
			},
			reActivity() {
				let userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
				if (userId) {
					if (this.inputData.activityName && this.inputData.prizeName && this.inputData.partPoint && this
						.inputData.gmtTime) {
						// let time = new Date(this.inputData.gmtTime).getTime();
						// let now = new Date().getTime();
						// now = now + 24 * 60 * 60 * 1000;
						// if (time > now) {
							const data = {
							};
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
								}
							});
						// } else {
						// 	uni.showToast({
						// 		icon: "none",
						// 		title: "开奖时间不得小于当前时间往后的24个小时",
						// 		duration: 2000
						// 	});
						// }
					} else {
						uni.showToast({
							icon: "none",
							title: '请检查输入',
							duration: 2000
						});
					}
				} else {
					uni.showToast({
						icon: "none",
						title: '请登录后进行操作',
						duration: 2000
					});
				}
			},
			change(e) {
				let value = []
				e.detail.value.forEach((val, index) => {
					if (index === 0) {
						value.push(this.withData(val + 22))
					} else if (index === 1 || index === 2) {
						value.push(this.withData(val + 1))
					} else {
						value.push(this.withData(val))
					}
				})
				let dateArray = "20" + value[0] + "-" + value[1] + "-" + value[2] + " " + value[3] + ":" + value[4] + ":" +
					value[5]
				this.inputData.gmtTime = dateArray
				console.log(this.inputData.gmtTime)
			},
			columnchange(e) {
				let dateArr = this.dateTimeArray
				let arr = this.dateTime
				//滑动所在列的数据并对其值进行更新
				arr[e.detail.column] = e.detail.value
				//更新展示月份对应的天数（28 or 29 or 30 or 31）
				dateArr[2] = this.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]])
				//最后把最新的数值赋值到dateTimeArray
				this.dateTimeArray = dateArr
				this.dateTime = arr
			},
			//时间格式化
			withData(param) {
				return param < 10 ? '0' + param : '' + param;
			},
			getLoopArray(start, end) {
				var start = start || 0;
				var end = end || 1;
				var array = [];
				for (var i = start; i <= end; i++) {
					array.push(this.withData(i));
				}
				return array;
			},
			getMonthDay(year, month) {
				var flag = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0),
					array = null;
				switch (month) {
					case '01':
					case '03':
					case '05':
					case '07':
					case '08':
					case '10':
					case '12':
						array = this.getLoopArray(1, 31)
						break;
					case '04':
					case '06':
					case '09':
					case '11':
						array = this.getLoopArray(1, 30)
						break;
					case '02':
						array = flag ? this.getLoopArray(1, 29) : this.getLoopArray(1, 28)
						break;
					default:
						array = '月份格式不正确，请重新输入！'
				}
				return array;
			},
			dateTimePicker(startYear, endYear, date) {
				// 返回默认显示的数组和联动数组的声明
				var dateTime = [],
					dateTimeArray = [
						[],
						[],
						[],
						[],
						[]
					];
				var start = startYear || 2022;
				var end = endYear || 2099;

				//处理传过来的字符串转化为数组
				let dataArr = date.split(" ")[0].split('-')
				let time = date.split(" ")[1].split(':')
				// 默认开始显示数据 如果把自定义值传过来的话就使用自定义时间 否则用当前时间  ...dataArr数组解构
				var defaultDate = [...dataArr, ...time];

				// 处理联动列表数据
				/*年月日 时分秒*/
				dateTimeArray[0] = this.getLoopArray(start, end);
				dateTimeArray[1] = this.getLoopArray(1, 12);
				dateTimeArray[2] = this.getMonthDay(defaultDate[0], defaultDate[1]);
				dateTimeArray[3] = this.getLoopArray(0, 23);
				dateTimeArray[4] = this.getLoopArray(0, 59);
				dateTimeArray[5] = this.getLoopArray(0, 59);

				//遍历dateTimeArray数组
				dateTimeArray.forEach((current, index) =>
					//匹配defaultDate[index]值在current数组中的位置
					dateTime.push(current.indexOf(defaultDate[index]))
				);

				return {
					dateTimeArray: dateTimeArray,
					dateTime: dateTime
				}
			}
		},
		onLoad() {
			//传入开始展示年份startYear 结束展示年份endYear
			//自定义开始显示时间 目前使用当前获取的时间
			let dateTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
			let obj = this.dateTimePicker(this.startYear, this.endYear, dateTime)
			this.dateTimeArray = obj.dateTimeArray
			this.dateTime = obj.dateTime
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F2F2F2;
	}

	.all {
		padding: 20rpx 20rpx 0 20rpx;

		.title {
			color: #808080;
			font-size: 14px;
		}

		.title-info {
			margin-top: 20rpx;
			background-color: #fff;
			border-radius: 2%;

			.info-list {
				padding: 20rpx 20rpx 10rpx 20rpx;

				.img {
					position: relative;
					display: flex;
					flex-direction: column;
					align-items: flex-end;

					.image {
						width: 100%;
					}

					.txt {
						margin: 20rpx 20rpx;
						font-size: 13px;
						color: #fff;
						background-color: rgb(128, 128, 128, 0.5);
						border-radius: 50px;
						position: absolute;
						top: 0;
					}
				}

				.uni-form-item {
					margin: 30rpx 0;
					border-bottom: 1rpx solid #d2d2d2;
					width: 100%;
					height: 80rpx;
					display: flex;
					font-size: 30rpx;

					.left {
						width: 30%;
						text-align: left;
						padding-left: 20rpx;
					}

					.right {
						width: 70%;

						.uni-input {
							text-align: right;
							padding-right: 20rpx;
						}
					}
				}

			}
		}

		.time {
			margin-top: 20rpx;
			color: #808080;
			font-size: 14px;
		}

		.time-info {
			margin-top: 20rpx;
			background-color: #fff;
			border-radius: 2%;

			.info-list {
				padding: 20rpx 20rpx 10rpx 20rpx;

				.uni-item {
					display: flex;
					margin: 10rpx 0 20rpx 0;

					.left {
						width: 40%;
						text-align: left;
						padding-left: 20rpx;
					}

					.right {
						width: 60%;

						.uni-input {
							text-align: right;
							padding-right: 20rpx;
						}
					}
				}
			}
		}
	}


	.bottom {
		background-color: #fff;
		width: 100%;
		position: fixed;
		bottom: var(--window-bottom, 0);

		.insertActivity {
			padding: 20rpx 20rpx 20rpx 20rpx;
			display: flex;
			align-items: center;
			align-content: center;

			.button {
				background-color: #f20c00;
				color: #fff;
				border-radius: 30px;
			}
		}
	}
</style>
