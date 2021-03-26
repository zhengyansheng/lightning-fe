import request from '@utils/http'

class Homework {
    constructor(env) {
        // 获取任务列表
        this.getTaskHistory = query => {
            return request({
                url: `${env.url}/api/v1/tasks/history/`,
                method: 'get',
                params: query
            })
        };
        // 获取单个任务列表
        this.getCurrentTask = id => {
            return request({
                url: `${env.url}/api/v1/tasks/history/${id}/`,
                method: 'get'
            })
        };
        // 获取脚本中内容
        this.getScriptsContent = filename => {
            return request({
                url: `${env.url}/api/v1/tasks/scripts_playbook/${filename}/`,
                method: 'get'
            })
        };
        // 获取下来列表中的脚本
        this.getScriptsPlaybook = query => {
            return request({
                url: `${env.url}/api/v1/tasks/scripts_playbook`,
                method: 'get',
                params: query
            })
        };
        // 执行任务
        this.createTaskCommand = query => {
            return request({
                url: `${env.url}/api/v1/tasks/exec/command`,
                method: 'post',
                data: query
            })
        };
    }
}

export default new Homework(VUE_ENV)