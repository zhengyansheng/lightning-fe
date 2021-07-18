const menuConfig = [{
    title: '服务树',
    index: '1',
    routeName: 'serviceTree',
    go() {
        window.location.href = '/service-tree'
    }
}, 
// {
//     title: '工单系统',
//     index: '2',
//     children: [
//         {
//             title: '工单',
//             index: '2-1',
//             children: [
//                 {
//                     title: '发起工单',
//                     index: '2-1-1',
//                     routeName: 'workorders',
//                     go() {
//                         window.location.href = '/workflow/workorders'
//                     }
//                 }, {
//                     title: '我的工单',
//                     index: '2-1-2',
//                     routeName: 'myworkflow',
//                     go() {
//                         window.location.href = '/workflow/myworkflow'
//                     }
//                 }
//             ]
//         }, {
//             title: '工单审批',
//             index: '2-2',
//             routeName: 'workorderswaiting',
//             go() {
//                 window.location.href = '/workflow/workorderswaiting'
//             }
//         }, {
//             title: '工单历史',
//             index: '2-3',
//             routeName: 'workordersHistory',
//             go() {
//                 window.location.href = '/workflow/workordershistory'
//             }
//         }, {
//             title: '工作流配置',
//             index: '2-4',
//             routeName: 'workflows',
//             go() {
//                 window.location.href = '/workflow/workflows'
//             }
//         }, {
//             title: '添加工作组',
//             index: '2-5',
//             routeName: 'workflowsGroup',
//             go() {
//                 window.location.href = '/workflow/workflowsgroup'
//             }
//         }
//     ]
// }, {
//     title: '作业平台',
//     index: '3',
//     routeName: 'platform',
//     go() {
//         window.location.href = '/platform'
//     }
// }, 
{
    title: '定时任务',
    index: '2',
    routeName: 'cron',
    go() {
        window.location.href = '/cron'
    }
}, {
    title: '任务调度',
    index: '3',
    routeName: 'scheduler',
    go() {
        window.location.href = '/scheduler'
    }
}, {
    title: '消息网关',
    index: '4',
    routeName: 'network',
    go() {
        window.location.href = '/network'
    }
//}, {
//    title: '审计',
//    index: '5',
//    routeName: 'audit',
//    go() {
//        window.location.href = '/audit'
//    }
//}, {
//    title: '企业架构',
//    index: '6',
//    routeName: 'corp',
//    go() {
//        window.location.href = '/corp'
//    }
}, {
    title: '资源数据中心',
    index: '5',
    children: [
        {
            title: '表管理',
            index: '5-1',
            routeName: 'tableclassify',
            go() {
                window.location.href = '/tableclassify'
            },
        }, {
            title: '资产中心',
            index: '5-2',
            routeName: 'assets',
            go() {
                window.location.href = '/assets'
            },
        }, {
            title: '查询中心',
            index: '5-3',
            routeName: 'searchcenter',
            go() {
                window.location.href = '/searchcenter'
            },
        }
    ]
}, {
    title: '权限管理',
    index: '6',
    children: [
        {
            title: '角色管理',
            index: '6-1',
            routeName: 'roles',
            go() {
                window.location.href = '/authroles'
            },
        }, {
            title: '权限管理',
            index: '6-2',
            routeName: 'authority',
            go() {
                window.location.href = '/authority'
            },
        }, {
            title: '菜单管理',
            index: '6-3',
            routeName: 'menus',
            go() {
                window.location.href = '/authmenus'
            },
        }
    ]
}
// , {
//     title: '资源管理',
//     index: '3',
//     children: [
//         {
//             title: '分类管理',
//             desc: '',
//             icon: '',
//             index: '3-1',
//             routeName: 'classification',
//             go() {
//                 window.location.href = '/cmdb/classification'
//             }
//         }, {
//             title: '表管理',
//             desc: '',
//             icon: '',
//             index: '3-2',
//             routeName: 'table',
//             go() {
//                 window.location.href = '/cmdb/table'
//             }
//         }, {
//             title: '数据管理',
//             desc: '',
//             icon: '',
//             index: '3-3',
//             routeName: 'data',
//             go() {
//                 window.location.href = '/cmdb/data'
//             }
//         }
//     ]
// }
]

export default menuConfig
