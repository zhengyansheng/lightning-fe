import request from '@utils/http'

class Assetscenter {
    constructor(env) {
        // 主类型获取
        this.fetchAssetsMainList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/classify/`,
                method: 'get',
                params: data
            })
        };
        // 子类型获取
        this.fetchAssetsSecondList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-classify/`,
                method: 'get',
                params: data
            })
        };
        // 获取主页面table列表
        this.fetchAssetsTableList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/`,
                method: 'get',
                params: data
            })
        };
        // 删除数据
        this.deleteTableData = id => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/${id}/`,
                method: 'delete',
            })
        }
        // 新增数据
        this.addTableData = query => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/`,
                method: 'post',
                data: query
            })
        }
        // 编辑数据
        this.editTableData = (query, id) => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/${id}/`,
                method: 'put',
                data: query
            })
        }
        // 绑定中心列表查询
        this.fetchBDRelationList = id => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/${id}/`,
                method: 'get',
            })
        }
        // 点击绑定后获取的列表
        this.fetchNeedBDRelationList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/`,
                method: 'get',
                params: data
            })
        }
        // 绑定
        this.setBDRelation = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/relation/`,
                method: 'post',
                data
            })
        };
        // 解绑
        this.cancelBDRelation = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/un-relation/`,
                method: 'delete',
                data
            })
        };
        // 查询中心列表
        this.fetchSCList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/search/`,
                method: 'get',
                params: data
            })
        }
        // 查询详情
        this.fetchSearchDetail = id => {
            return request({
                url: `${env.url}/api/v1/cmdb/table-data/${id}/`,
                method: 'get'
            })
        }
        // 变更记录
        this.fetchRecordList = data => {
            return request({
                url: `${env.url}/api/v1/cmdb/record/`,
                method: 'get',
                params: data
            })
        }
    }
}

export default new Assetscenter(VUE_ENV);
