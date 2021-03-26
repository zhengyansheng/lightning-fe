<template>
<div class="workorders-history">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>工单审批</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="list-main">
        <el-tabs v-model="activeName">
            <el-tab-pane label="我的待办" name="1"></el-tab-pane>
            <el-tab-pane label="工单历史" name="2"></el-tab-pane>
        </el-tabs>
        <WorkorderWaiting v-if="activeName === '1'" />
        <WorkorderDone v-else />
    </div>
</div>
</template>

<script>
import WorkorderWaiting from '@components/workflow/WorkorderWaiting'
import WorkorderDone from '@components/workflow/WorkorderDone'
export default {
    name: '',
    components: {
        WorkorderWaiting,
        WorkorderDone
    },
    data() {
        return {
            activeName: '1'
        }
    },
    created() {
        
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>
