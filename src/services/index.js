import request from '@utils/http'

class Index {
    constructor(env) {
        // 登陆
        this.getIwtToken = query => {
            return request({
                url: `${env.url}/api/v1/jwt-token`,
                method: 'post',
                params: query
            })
        };
        // 登陆
        this.getUserInfo = query => {
            return request({
                url: `${env.url}/api/v1/user/info`,
                method: 'get',
                params: query
            })
        };
    }
}

export default new Index(VUE_ENV);