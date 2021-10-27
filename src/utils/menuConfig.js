const menuConfig = [{
    title: '服务树',
    index: '1',
    routeName: 'serviceTree',
    go() {
        window.location.href = '/service-tree'
    }
}, 
{
    title: '资源数据中心',
    index: '2',
    children: [
        {
            title: '表管理',
            index: '2-1',
            routeName: 'tableclassify',
            go() {
                window.location.href = '/tableclassify'
            },
        }, {
            title: '资产中心',
            index: '2-2',
            routeName: 'assets',
            go() {
                window.location.href = '/assets'
            },
        }, {
            title: '查询中心',
            index: '2-3',
            routeName: 'searchcenter',
            go() {
                window.location.href = '/searchcenter'
            },
        }
    ]
}, {
    title: '定时任务',
    index: '4',
    routeName: 'cron',
    go() {
        window.location.href = '/cron'
    }
}, {
    title: '任务调度',
    index: '5',
    routeName: 'scheduler',
    go() {
        window.location.href = '/scheduler'
    }
}, {
    title: '消息网关',
    index: '6',
    routeName: 'network',
    go() {
        window.location.href = '/network'
    }
}
]

export default menuConfig
