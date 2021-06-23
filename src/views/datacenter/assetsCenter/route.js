export default {
    path: '/assets',
    component: () => import('./index.vue'),
    name: 'assets',
    redirect: {name: 'assetscenter'},
    children: [
        {
            path: 'assetscenter',
            component: () => import('./assetsCenter.vue'),
            name: 'assetscenter',
            meta: {
                title: '资产中心'
            },
        }, {
            path: 'assetsinfo',
            component: () => import('./assetsInfo.vue'),
            name: 'assetsinfo',
            meta: {
                title: '资产数据详情'
            },
        }
    ]
}