import request from '@utils/http'

class Datacenter {
    constructor(env) {
        // 主页 获取列表数据
        this.fetchTableClassifyTree = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/tree/`,
                method: 'get',
                params: data
            })
        };
        // 主页 新增表按钮
        this.addNewTableClassify = (query, config) => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/`,
                method: 'post',
                data: query,
                config
            })
        }
        // 主页 编辑分类按钮
        this.editTableClassify = (id, query, config) => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/${id}/`,
                method: 'put',
                data: query,
                config
            })
        }
        // 主页 删除分类按钮
        this.deleteTableClassify = id => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/${id}/`,
                method: 'delete'
            })
        }
        // 主页 编辑卡片
        this.getEditCardInfo = id => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/${id}/`,
                method: 'get'
            })
        }
        // 获取分类列表
        this.getTypeList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/`,
                method: 'get',
                params: data
            })
        }
        // 获取主分类列表
        this.getMainTypeList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/classify/`,
                method: 'get',
                params: data
            })
        }
        // 解除绑定 
        this.setUnrelation = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/un-relation/`,
                method: 'delete',
                data: data
            })
        }
        // 新增表字段
        this.editTableField = query => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-field/`,
                method: 'post',
                data: query
            })
        }
        // 编辑表字段 
        this.editNewTableField = (query, id) => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-field/${id}/`,
                method: 'put',
                data: query
            })
        }
        // 绑定
        this.editRelation = query => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/relation/`,
                method: 'post',
                data: query
            })
        }

    }
}

export default new Datacenter(VUE_ENV);
