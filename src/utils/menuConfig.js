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
    title: '权限管理',
    index: '3',
    children: [
        {
            title: '角色管理',
            index: '3-1',
            routeName: 'roles',
            go() {
                window.location.href = '/authroles'
            },
        }, {
            title: '权限管理',
            index: '3-2',
            routeName: 'authority',
            go() {
                window.location.href = '/authority'
            },
        }, {
            title: '菜单管理',
            index: '3-3',
            routeName: 'menus',
            go() {
                window.location.href = '/authmenus'
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
