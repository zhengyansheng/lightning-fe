import axios from 'axios';
import store from '@/store'
import { getToken } from '@/utils/auth'

// 请求超时时间
axios.defaults.timeout = 20000;

axios.defaultsbaseURL = process.env.VUE_APP_BASE_API

// 通用请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['content-type'] = 'application/json;charset=utf-8';
axios.defaults.withCredentials = false;

// 请求拦截器
axios.interceptors.request.use(
    response => {
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            response.headers['Authorization'] = 'JWT ' + getToken()
        }
        return Promise.resolve(response)
    },
    error => {
        return Promise.reject(error.response);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // 清除缓存地址
        return Promise.resolve(response);
    },
    error => {
        return Promise.reject(error);
    }
)

/**
 * 控制台输出错误内容
 *
 * @method warn
 * @author zhourj
 */
export const warn = (err) => {
    console.warn(err);
}

/**
 * 发起Put请求
 *
 * @method put
 * @param {String} url
 * @param {Object} params
 * @author zhourj
 */
export const put = (url, params) => {
    return new Promise((resolve) => {
        axios.put(url, params, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err);
        })
    });
}

/**
 * 发起Put请求
 *
 * @method put
 * @param {String} url
 * @param {Object} params
 * @author zhourj
 */
export const deleteReq = (url, params) => {
    return new Promise((resolve) => {
        axios.delete(url, {params}, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err);
        })
    });
}

/**
 * 发起Get请求
 *
 * @method get
 * @param {String} url
 * @param {Object} params
 * @author zhourj
 */
export const get = (url, params) => {
    return new Promise((resolve) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err);
        })
    });
}

/**
 * 发起Post请求
 *
 * @method post
 * @param {String} url
 * @param {Object} params
 * @author zhourj
 */
export const post = (url, params, config) => {
    return new Promise((resolve) => {
        // if (!(config.headers && config.headers['content-type'] === 'application/json')) {
        //     params = QS.stringify(params)
        // }
        axios.post(url, params, {
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err);
        })
    });
}

export default function (params, config) {
    if (!config) config = {};
    if (params.method.toLowerCase() === 'get') return get(params.url, params.params);
    if (params.method.toLowerCase() === 'post') return post(params.url, params.params, config);
    if (params.method.toLowerCase() === 'put') return put(params.url, params.params);
    if (params.method.toLowerCase() === 'delete') return deleteReq(params.url, params.params);
};
