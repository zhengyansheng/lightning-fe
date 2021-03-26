<template>
    <el-drawer
        :visible="isShow"
        size="50%"
        @close="closeDia"
        direction="rtl">
        <el-tabs v-model="activeName" class="parent-tabs">
            <el-tab-pane label="任务详情" name="detail">
                <el-form ref="form" :model="form" label-width="120px" v-if="form">
                    <el-form-item label="任务ID：">{{form.task_id}}</el-form-item>
                    <el-form-item label="任务名称：">{{form.task_name}}</el-form-item>
                    <el-form-item label="命令：">{{form.script_file}}</el-form-item>
                    <el-form-item label="执行用户：">{{form.create_user}}</el-form-item>
                    <el-form-item label="任务状态：">{{form.task_state}}</el-form-item>
                    <el-form-item label="主机：">{{form.task_hosts}}</el-form-item>
                    <el-form-item label="执行耗时：">{{form.exec_interval}}</el-form-item>
                    <el-form-item label="执行时间：">{{form.exec_interval}}</el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="执行结果" name="result">
                <el-tabs v-model="resultsActive" style="width:95%;margin:auto;margin-top:-10px;">
                    <el-tab-pane :label="'总计('+totalNum+')'" name="total">
                        <json-viewer :value="total" :expanded="true" :expand-depth="5"></json-viewer>
                    </el-tab-pane>
                    <el-tab-pane :label="'执行成功('+successNum+')'" name="success"><json-viewer :value="success" :expanded="true" :expand-depth="5"></json-viewer></el-tab-pane>
                    <el-tab-pane :label="'执行失败('+failedNum+')'" name="failed"><json-viewer :value="failed" :expanded="true" :expand-depth="5"></json-viewer></el-tab-pane>
                    <el-tab-pane :label="'不可达('+unreachableNum+')'" name="unreachable"><json-viewer :value="unreachable" :expanded="true" :expand-depth="5"></json-viewer></el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </el-drawer>
</template>
<script>
    export default {
        name: '',
        props: {
            taskData: {
                type: Object
            },
            isShow: {
                type: Boolean
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.form = Object.assign({}, this.taskData);
                    this.getCurrentTask()
                }
            }
        },
        data() {
            return {
                form: null,
                activeName: 'detail',
                resultsActive: 'total',
                totalNum: 0,
                successNum: 0,
                failedNum: 0,
                unreachableNum: 0,
                total: 0,
                success: 0,
                failed: 0,
                unreachable: 0
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$emit('update:isShow', false)
            },
            getCurrentTask() {
                let id = this.taskData.id
                this.api.homework.getCurrentTask(id).then(res => {
                    let result = res.data.task_result
                    this.successNum = Object.keys(result.success).length
                    this.failedNum = Object.keys(result.failed).length
                    this.unreachableNum = Object.keys(result.unreachable).length
                    this.totalNum = this.successNum + this.failedNum + this.unreachableNum
                    // 成功的数据 stdout
                    let successData = {};
                    for(let host in result.success) {
                        successData[host] = {
                            stdout: result.success[host].stdout
                        }
                    }
                    this.success = Object.assign({}, successData)

                    // 失败的数据 stdout
                    let failedData = {};
                    for(let host in result.failed) {
                        failedData[host] = {
                            stdout: result.failed[host].stdeer
                        }
                    }
                    this.failed = failedData

                    this.unreachable = result.unreachable
                    this.total = result
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .parent-tabs > .el-tabs__header {
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: #f5f7fa;
}
/deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
}
/deep/ .el-form-item {
    margin-bottom: 0;
}
/deep/ .jv-container {
    height: 500px;
    overflow: auto;
}
</style>
