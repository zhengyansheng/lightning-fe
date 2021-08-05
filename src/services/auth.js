import request from '@utils/http'

class Auth {
    constructor(env) {
        // 获取角色列表数据
        this.fetchRoleList = data => {
            return request({
                url: `${env.url}/api/v1/prem/role/`,
                method: 'get',
                params: data
            })
        };
        // 新增角色
        this.addRequestRole = data => {
            return request({
                url: `${env.url}/api/v1/prem/role/`,
                method: 'post',
                data
            })
        }
        // 编辑角色
        this.editRequestRole = (id, data) => {
            return request({
                url: `${env.url}/api/v1/prem/role/${id}/`,
                method: 'put',
                data
            })
        }
        // 删除角色
        this.deleteRequestRole = id => {
            return request({
                url: `${env.url}/api/v1/prem/role/${id}/`,
                method: 'delete'
            })
        }
        // 获取 API权限 二级树
        this.fetchApiAuthList = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule-classify/tree/`,
                method: 'get',
                params: data
            })
        };

        // 权限管理 左侧权限分类列表
        this.fetchRuleClassifyList = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule-classify/`,
                method: 'get',
                params: data
            })
        };
        // 新增权限分类
        this.addRequestRuleClassify = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule-classify/`,
                method: 'post',
                data
            })
        }
        // 编辑权限分类
        this.editRequestRuleClassify = (id, data) => {
            return request({
                url: `${env.url}/api/v1/prem/rule-classify/${id}/`,
                method: 'put',
                data
            })
        }
        // 删除权限分类
        this.deleteRequestRuleClassify = id => {
            return request({
                url: `${env.url}/api/v1/prem/rule-classify/${id}/`,
                method: 'delete'
            })
        }

        // 权限管理 右侧权限信息列表
        this.fetchRuleInfoList = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule/`,
                method: 'get',
                params: data
            })
        };
        // 新增权限信息
        this.addRequestRuleInfo = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule/`,
                method: 'post',
                data
            })
        }
        // 编辑权限信息
        this.editRequestRuleInfo = data => {
            return request({
                url: `${env.url}/api/v1/prem/rule/`,
                method: 'put',
                data
            })
        }
        // 删除权限信息
        this.deleteRequestRuleInfo = id => {
            return request({
                url: `${env.url}/api/v1/prem/rule/${id}/`,
                method: 'delete'
            })
        }

        // 菜单管理 获取父级列表
        this.fetchParentMenuList = data => {
            return request({
                url: `${env.url}/api/v1/prem/menu/parent/`,
                method: 'get',
                params: data
            })
        }
        // 菜单管理 获取子级列表
        this.fetchChildrenMenuList = data => {
            return request({
                url: `${env.url}/api/v1/prem/menu/`,
                method: 'get',
                params: data
            })
        }
        // 新增菜单
        this.addRequestMenu = data => {
            return request({
                url: `${env.url}/api/v1/prem/menu/`,
                method: 'post',
                data
            })
        }
        // 编辑菜单
        this.editRequestMenu = (id, data) => {
            return request({
                url: `${env.url}/api/v1/prem/menu/${id}/`,
                method: 'put',
                data
            })
        }
        // 删除菜单
        this.deleteRequestMenu = id => {
            return request({
                url: `${env.url}/api/v1/prem/menu/${id}/`,
                method: 'delete'
            })
        }

    }
}

export default new Auth(VUE_ENV);
