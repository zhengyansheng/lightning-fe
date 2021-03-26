export default {
    path: '/scheduler',
    component: () => import('./index.vue'),
    name: 'scheduler',
    meta: {
        title: '任务调度'
    }
}