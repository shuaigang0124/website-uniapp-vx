import App from './App'
import axios from "axios"
import settle from "axios/lib/core/settle"
import buildURL from "axios/lib/helpers/buildURL"

// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif


// 解决uniapp 适配axios请求，避免报adapter is not a function错误
axios.defaults.adapter = config => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: config.method.toUpperCase(),
			url: "https://xxx.com" + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				// console.log(config.baseURL)
				// console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}
