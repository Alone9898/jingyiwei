/*
* create by zhilong li
* @Mar 22, 2021
*/

import UrlConfig from '../urlconfig'

/**
 * 自动获取请求地址
 * @position 在config文件下
 * @file 以***.url.js命名的文件
 * @set js文件需以export default抛出键值对
 */
let urls = require.context('../config/', false, /\.url.js$/)
let urlreq = {}
for (const key of urls.keys()) {
    urlreq[key] = urls(key)
}
let urlList = {};
for(let key in urlreq) {
    urlList = {...urlList, ...urlreq[key].default}; 
}



/**
 * 删除非法数据
 */
let delObjectnull = (data) => {
    let _d = JSON.parse(JSON.stringify(data))
    _d.keys().forEach(ele => {
        if ([null, undefined].includes(_d[ele])) {
            delete _d[key]
        }
    });
    return _d
}



/**
* 设置请求地址全路径
* @param url 请求地址
* @param params 需要替换地址中的数据对象
* @returns {string} 返回完整请求地址
*/
const getUrl = (url, params, base) => {
  url = !!url ? url.replace(/{(\w+)}/g, (reg, key) => params[key]) : '';
  switch (base) {
      case 'auth':
          url = `${UrlConfig.AUTH_URL}${url}`
          break;
      default:
          url = `${UrlConfig.BASE_URL}${url}`;
          break;
  }
  return url;
};



/**
 * 创建请求配置
 * @param data 请求配置参数
 * @returns {object} 完整请求配置
 */
let buildRequestData = (data) => {
    let result = {};

    result.method = data.method ? data.method : "GET";
    result.data = data.data || {};
    result.header = {
        "Content-Type":  data.contentType ? data.contentType : "application/json;charset=utf-8;multipart/form-data",
        'token': uni.getStorageSync('userInfo').token || ''
    }

    return result;
}



  /**
 * 发起请求
 */
let Ajax = async (request) => {
    uni.showLoading({
        title: '请求中'
    });
    let url = getUrl(request.url, request.urlParam, request.base || 'base'),
        requestData = buildRequestData(request);
    requestData.url = url + '?_date=' + new Date().getTime();

    if (requestData.method === 'post' || !!request.params) {
        for (let key in request.params) {
            if (request.params.hasOwnProperty(key)) {
                requestData.url += `&${key}=${encodeURI(request.params[key])}`;
            }
        }
    }
    let _res = {}
    let res = await uni.request(requestData).then(e => {
        _res = e[1] ? e[1].data : e;
    });
    uni.hideLoading();
    if (!!_res) {
        return _res;
        // if (_res.code === 200) {
        //     return _res.data;
        // } else {
        //     uni.showToast({
        //         title: '数据请求异常',
        //         image:'../static/error.png',
        //         duration: 1000,
        //         mask: true
        //     });
        //     return Promise.reject(new Error('数据请求异常，请重试'));
        // }
    } else {
        uni.showToast({
            title: '网络错误，请检查',
            image:'../static/error.png',
            duration: 1000,
            mask: true
        });
        return Promise.reject(new Error('请求失败或网络错误，请检查'));
    }
}









  /**
 * 以下两个方法的使用示例
 * 
 * async getList() {
 *      let res = await this.$api.getDataRequest('LOGIN', {key: 'value'});
 *      this.tableData = res;
 * };
 * 
 */


  /**
 * 通过 params 以get方式获取数据
 * @param      key                 请求定义静态地址
 * @param      params              请求参数
 * @return     {Promise<*>}        返回promise对象
 */
let getDataRequest = (key, params, base) => {
    return Ajax({
        url: urlList[key],
        params,
        base
    });
};

/**
 * 通过 data 以post方式提交数据
 * @param      key                 请求定义静态地址
 * @param      data                请求参数
 * @return     {Promise<*>}        返回promise对象
 */
 let postDataRequest = (key, data, params, base) => {
    return Ajax({
        method: 'POST',
        url: urlList[key],
        data,
        params,
        base
    });
};
  
  export default {
    getDataRequest,
    postDataRequest
  }