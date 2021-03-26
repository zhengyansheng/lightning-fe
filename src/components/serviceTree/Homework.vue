<template>
    <div class="homework-platform">
        <el-tabs v-model="activeName" @tab-click="handleClickTab">
            <el-tab-pane label="任务管理" name="taskManage">
                <TaskManage :nodes="nodes" />
            </el-tab-pane>
            <el-tab-pane label="任务报表" name="taskList">
                <TaskList />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import SingleTask from './homework/SingleTask'
import Transcript from './homework/Transcript'
import TaskList from './homework/TaskList'
import ScriptManage from './homework/ScriptManage'
import TaskManage from './homework/TaskManage'
    export default {
        name: '',
        components: {
            SingleTask,
            Transcript,
            TaskList,
            ScriptManage,
            TaskManage
        },
        props: {
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                activeName: 'taskManage'
            }
        },
        created() {
        },
        methods: {
            handleClickTab(val) {
                console.log(val);
            }
        }
    }
</script>
<style lang="scss" scoped>
.homework-platform {

}
</style>
