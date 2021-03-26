import request from '@utils/http'
const env = VUE_ENV
export function login(data) {
  return request({
    // url: `http://devops.51reboot.com/api/v1/jwt-token`,
    url: `${env.url}/api/v1/api-token-auth/`,
    // url: `/api/v1/jwt-token`,
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    // url: `http://devops.51reboot.com/api/v1/user/info`,
    url: `${env.url}/api/v1/corp/user/info`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: `${env.url}/vue-admin-template/user/logout`,
    method: 'post'
  })
}
