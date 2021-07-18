export default [{
    path: '/authroles',
    component: () => import('./authRoles.vue'),
    name: 'authroles',
    meta: {
        title: '权限管理'
    }
}, {
    path: '/authmenus',
    component: () => import('./menuManage.vue'),
    name: 'authmenus',
    meta: {
        title: '菜单管理'
    }
}, {
    path: '/authority',
    component: () => import('./authManage.vue'),
    name: 'authority',
    meta: {
        title: '菜单管理'
    }
}]