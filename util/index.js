// 单独配置url地址，便于以后维护
const BASE_URL = 'http://103.44.238.145:8989/'
// 暴露一个方法，用uni.request发送请求，异步处理的封装最好用promise
export const axios = (options)=>{
	// resolve（成功之后的回调函数）和reject（失败之后的回调函数）
    let userInfo= uni.getStorageSync('userInfo')
    options.header={
        'token': userInfo.token,//您可根据如本地存储或者vuex再此处使用逻辑或 来插入token
    }
	return new Promise((resolve,reject)=>{
		// 使用uni.request发送请求
		uni.request({
			// 拼接请求地址
              url:BASE_URL+options.url,
			// 请求方式
			method: options.method || 'GET',
            header: options.header,
			// 数据
			data: options.data || {},
			// 请求成功
			success: (res) => {
				// 判断请求数据是否成功
                if (res.data.code === -100 && res.data.msg === "登录过期") {
                    uni.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                    setTimeout(() => {
                        uni.reLaunch({
                        	url: "/pages/login/login"
                        })
                    }, 1000);
                } else {
                    resolve(res.data)
                }	
			},
			// 请求失败
			fail: (err) => {
				uni.showToast({
					title: '请求接口失败!'
				})
				reject(err)
			}
		})
	})
}