import request from '@utils/http'

class Corp {
    constructor(env) {
        // 获取左侧列表
        this.fetchOrganizationsList = query => {
            return request({
                url: `${env.url}/api/v1/corp/organizations/`,
                method: 'get',
                params: query
            })
        };
        // 获取右侧表格
        this.fetchOrganizationsUserTable = (id, query) => {
            return request({
                url: `${env.url}/api/v1/corp/organizations/${id}/user/`,
                method: 'get',
                params: query
            })
        };
    }
}

export default new Corp(VUE_ENV);