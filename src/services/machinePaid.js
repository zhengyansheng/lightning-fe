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
                url: `${env.goUrl}/api/v1/task-scheduler/dag/delivery_machine`,
                method: 'post',
                data: data
            })
        };
        // 开机 start_instance 关机 stop_instance 重启 reboot_instance 下线 destroy_instance
        this.operateMachineStatus = (url, data) => {
            return request({
                url: `${env.goUrl}/api/v1/task-scheduler/dag/${url}`,
                method: 'post',
                data: data
            })
        };
        // 获取生命周期数据
        this.fetchLifeCycleData = id => {
            return request({
                url: `${env.goUrl}/api/v1/multi-cloud/life_cycle/${id}`,
                method: 'get'
            })
        };
    }
}

export default new MachinePaid(VUE_ENV);
