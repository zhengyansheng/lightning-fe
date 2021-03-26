import request from '@utils/http'

class MachinePaid {
    constructor(env) {
        // 主机交付 - 获取列表 - 根据叶子节点查询该节点上所有的模版
        this.fetchMultiCloudTemplate = app_key => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/template/?app_key=${app_key}`,
                method: 'get'
            })
        };
        // 删除模版
        this.deleteMultiCloudTemplate = id => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/template/${id}/`,
                method: 'delete'
            })
        };
        // 创建模版
        this.createMultiCloudTemplate = data => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/template/`,
                method: 'post',
                data: data
            })
        };
        // 交付云主机
        this.paidMultiCloudTemplate = data => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/instance/create`,
                method: 'post',
                data: data
            })
        };
    }
}

export default new MachinePaid(VUE_ENV);