export default {
    path: '/tableclassify',
    component: () => import('./index.vue'),
    name: 'tableclassify',
    redirect: {name: 'tablemanage'},
    children: [
        {
            path: 'manage',
            component: () => import('./tableManage.vue'),
            name: 'tablemanage',
            meta: {
                title: '表数据'
            },
        }, {
            path: 'info',
            component: () => import('./tableInfo.vue'),
            name: 'tableinfo',
            meta: {
                title: '表数据详情'
            },
        }
    ]
}