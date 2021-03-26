export default {
    path: '/cron',
    component: () => import('./index.vue'),
    name: 'cron',
    meta: {
        title: '定时任务'
    }
}