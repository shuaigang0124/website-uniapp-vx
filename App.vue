<script>
	import post from '@/http/request/request';
	import Base64 from 'base-64';
	export default {
		onLaunch: function() {
			let userId = Base64.decode(uni.getStorageSync('shuaigangOVO'));
			if (userId) {
				// 请求体数据
				const data = {};
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
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync('userPoint', customData.point);
							}
						});
						// 获取用户兑换次数
						post("/xxx/xxx/xxx", data).then((res, any) => {
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200 && message !== '') {
								uni.setStorageSync('forRecordTotal', customData.length);
							}
						});
						const data1 = {};
						// 获取用户中奖次数
						post("/xxx/xxx/xxx/xxx", data1).then((res, any) => {
							let {
								code,
								message,
								customData
							} = res;
							if (code === 200) {
								uni.setStorageSync('prizeTotal', customData.length);
							}
						});
					}
				});
			}
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		onError: function() {
			// console.log('App Error')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
