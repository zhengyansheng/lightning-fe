import request from '@utils/http'

class Appkey {
    constructor(env) {
        // 密钥管理 获取数据
        this.fetchMultiCloudAccount = data => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/account/`,
                method: 'get',
                params: data
            })
        };
        // 添加
        this.postMultiCloudAccount = data => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/account/`,
                method: 'post',
                data: data
            })
        };
        // 删除
        this.deleteMultiCloudAccount = id => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/account/${id}/`,
                method: 'delete'
            })
        };
    }
}

export default new Appkey(VUE_ENV);