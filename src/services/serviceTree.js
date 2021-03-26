import request from '@utils/http'

class Cmdb {
    constructor(env) {
        // 获取树形列表
        this.getServiceTreeList = query => {
            return request({
                url: `${env.url}/api/v1/service-tree`,
                method: 'get',
                params: query
            })
        };
        // 获取导航
        this.getBindClassify = query => {
            return request({
                url: `${env.url}/api/v1/get-bind-classify`,
                method: 'get',
                params: query
            })
        };
        // 获取tag
        this.getBindClassifyTable = query => {
            return request({
                url: `${env.url}/api/v1/get-bind-classify-table`,
                method: 'get',
                params: query
            })
        };
        // 获取table
        this.getCmdbTableDetails = query => {
            return request({
                url: `${env.url}/api/v1/cmdb-table-details`,
                method: 'get',
                params: query
            })
        };
        // 获取table
        this.cmdbTableDetails = query => {
            return request({
                url: `${env.url}/api/v1/cmdb-table-details`,
                method: 'get',
                params: query
            })
        };
        // 移除
        this.deleteBind = query => {
            return request({
                url: `${env.url}/api/v1/delete-bind`,
                method: 'delete',
                params: query
            })
        };
        // 获取表绑定的数据
        this.getBindTableDataList = query => {
            return request({
                url: `${env.url}/api/v1/get-bind-table-data`,
                method: 'get',
                params: query
            })
        };
        // 绑定cmdb数据
        this.bindCmdbData = query => {
            return request({
                url: `${env.url}/api/v1/bind-cmdb-data`,
                method: 'post',
                data: query
            })
        };

        // 新接口
        // 获取服务树列表
        this.fetchServiceTree = query => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/`,
                method: 'get',
                params: query
            })
        };
        // 添加节点
        this.addNodeTree = query => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/`,
                method: 'post',
                data: query
            })
        };
        // 编辑节点
        this.editNodeTree = (id, query) => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/${id}/`,
                method: 'put',
                data: query
            })
        };
        // 删除节点
        this.deleteTreeNode = id => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/${id}/`,
                method: 'delete'
            })
        };
        // 获取主机信息
        this.fetchMachineInfo = (id, query) => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/${id}/server/`,
                method: 'get',
                params: query
            })
        };
        // 删除主机信息
        // this.deleteMachineInfo = (id, query) => {
        //     return request({
        //         url: `${env.url}/api/v1/service_tree/nodes/${id}/server/`,
        //         method: 'delete',
        //         params: query
        //     })
        // };
        // 获取关联数据列表
        this.fetchCmdbInstances = query => {
            return request({
                url: `${env.url}/api/v1/cmdb/instances/`,
                method: 'get',
                params: query
            })
        };
        // 节点绑定
        this.postMachineInfo = query => {
            return request({
                url: `${env.url}/api/v1/service_tree/server/`,
                method: 'post',
                data: query
            })
        };
        // 节点删除
        this.deleteMachineInfo = (id, query) => {
            return request({
                url: `${env.url}/api/v1/service_tree/unlink/${id}/`,
                method: 'delete',
                data: query
            })
        };
        // 查询节点上的Tag
        this.fetchNodesTag = id => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/${id}/tag/`,
                method: 'get'
            })
        };
        // 新增Tag
        this.addNodesTag = query => {
            return request({
                url: `${env.url}/api/v1/service_tree/tag/`,
                method: 'post',
                data: query
            })
        };
        // 删除Tag
        this.deleteNodesTag = id => {
            return request({
                url: `${env.url}/api/v1/service_tree/tag/${id}/`,
                method: 'delete'
            })
        };
        // permission 查询 搜索⽤用户
        this.fetchCorpUsers = query => {
            return request({
                url: `${env.url}/api/v1/corp/users/`,
                method: 'get',
                params: query
            })
        };
        // 添加权限
        this.addOperaPermission = query => {
            return request({
                url: `${env.url}/api/v1/service_tree/opera_permission/`,
                method: 'post',
                data: query
            })
        };
        // 查询指定节点上的⽤用户权限
        this.fetchOperaPermissionMember = id => {
            return request({
                url: `${env.url}/api/v1/service_tree/nodes/${id}/opera_permission_member/`,
                method: 'get'
            })
        };
        // 删除指定节点上的⽤用户权限
        this.deleteOperaPermission = (id, query) => {
            return request({
                url: `${env.url}/api/v1/service_tree/opera_permission/${id}/`,
                method: 'delete',
                data: query
            })
        };
        // 获取当前节点及所有父节点的叶子节点
        this.fetchParentNodes = id => {
            return request({
                url: `${env.url}/api/v1/service_tree/parents/${id}/`,
                method: 'get'
            })
        };
    }
}

export default new Cmdb(VUE_ENV);