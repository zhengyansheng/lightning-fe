export default [{
    path: '/workflow/workflows',
    component: () => import('./index.vue'),
    name: 'workflows',
    meta: {
        title: '添加工作组'
    }
}, {
    path: '/workflow/formfields',
    component: () => import('./index.vue'),
    name: 'formfields',
    meta: {
        title: '工单项管理'
    }
}, {
    path: '/workflow/workflows',
    component: () => import('./index.vue'),
    name: 'workflows',
    meta: {
        title: '添加工作组'
    }
}]