//域名或选取所有接口不变的那一部分
let baseUrl = 'https://xxxxx.com/xxx';

const post = async (url: string, param ? : any) => {
	let token = await getToken()
	let shuaigangOVO = await getUserId()
	let shuaigangQWQ = await getRole()
	//异步封装接口，使用Promise处理异步请求
	return new Promise((resolve, reject) => {
		// 发送请求
		uni.request({
			//请求头
			header: {
			"Authorization": token || '',
			"shuaigangOVO": shuaigangOVO || '',
			"shuaigangQWQ": shuaigangQWQ || '',
			}, 
			//接收请求的API
			url: baseUrl + url || '',
			//接收请求的方式,如果不传默认为GET
			method: 'POST',
			//接收请求的data,不传默认为空
			data: param || {},
		}).then(res => {
			resolve(res.data);
		}).catch(err =>
			reject(err));
	})
}

const getToken = () => {
	return uni.getStorageSync('token')
}
const getUserId = () => {
	return uni.getStorageSync('shuaigangOVO')
}
const getRole = () => {
	return uni.getStorageSync('shuaigangQWQ')
}

export default post
