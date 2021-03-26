import request from '@utils/http'

class Cmdb {
    constructor(env) {
        // 分类管理
        // 获取分类管理列表
        this.getClassificationList = query => {
            return request({
                url: `${env.url}/api/v1/classification`,
                method: 'get',
                params: query
            })
        };
        // 添加
        this.addClassification = query => {
            return request({
                url: `${env.url}/api/v1/classification`,
                method: 'post',
                data: query
            })
        };
        // 编辑
        this.editClassification = query => {
            return request({
                url: `${env.url}/api/v1/classification`,
                method: 'put',
                data: query
            })
        };
        // 删除
        this.deleteClassification = query => {
            return request({
                url: `${env.url}/api/v1/classification`,
                method: 'delete',
                data: query
            })
        };
        // 表管理
        // 获取表管理列表
        this.getTableList = query => {
            return request({
                url: `${env.url}/api/v1/table`,
                method: 'get',
                params: query
            })
        };
        // 添加
        this.addTable = query => {
            return request({
                url: `${env.url}/api/v1/table`,
                method: 'post',
                data: query
            })
        };
        // 编辑
        this.editTable = query => {
            return request({
                url: `${env.url}/api/v1/table`,
                method: 'put',
                data: query
            })
        };
        // 删除
        this.deleteTable = query => {
            return request({
                url: `${env.url}/api/v1/table`,
                method: 'delete',
                data: query
            })
        };
        // 数据管理
        // 获取分类对应的列表
        this.classificationTable = query => {
            return request({
                url: `${env.url}/api/v1/classification/table`,
                method: 'get',
                params: query
            })
        };
        // 获取表详细信息
        this.getTableValue = query => {
            return request({
                url: `${env.url}/api/v1/table/value`,
                method: 'get',
                params: query
            })
        };
        // 新建数据
        this.createData = query => {
            return request({
                url: `${env.url}/api/v1/data`,
                method: 'post',
                data: query
            })
        };
        // 更新数据
        this.updateData = query => {
            return request({
                url: `${env.url}/api/v1/data`,
                method: 'put',
                data: query
            })
        };
        // 数据列表
        this.dataList = query => {
            return request({
                url: `${env.url}/api/v1/data`,
                method: 'get',
                params: query
            })
        };
        // 删除数据
        this.deleteData = query => {
            return request({
                url: `${env.url}/api/v1/data`,
                method: 'delete',
                data: query
            })
        };
    }
}

export default new Cmdb(VUE_ENV);