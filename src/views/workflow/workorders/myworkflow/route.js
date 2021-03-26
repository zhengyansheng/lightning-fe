export default {
    path: '/workflow/myworkflow',
    component: () => import('./index.vue'),
    name: 'myworkflow',
    meta: {
        title: '我的工单'
    }
}