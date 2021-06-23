export default {
    path: '/searchcenter',
    component: () => import('./index.vue'),
    name: 'searchcenter',
    redirect: {name: 'sclist'},
    children: [
        {
            path: 'sclist',
            component: () => import('./scList.vue'),
            name: 'sclist',
            meta: {
                title: '查询中心'
            },
        }, {
            path: 'searchinfo',
            component: () => import('./searchInfo.vue'),
            name: 'searchinfo',
            meta: {
                title: '资产数据详情'
            },
        }
    ]
}