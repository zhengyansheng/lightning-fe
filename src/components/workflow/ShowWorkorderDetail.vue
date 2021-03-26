<template>
    <el-dialog title="提示" :visible="isShow" width="800px" @close="closeDia">
        <el-steps :active="2" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-alert title="申请人" type="info" :closable="false"></el-alert>
        <div class="common-group">
            <strong>申请人：</strong><span>51reboot</span>
            <strong style="margin-left: 50px">中文名：</strong><span>51reboot</span>
            <strong style="margin-left: 50px">Email：</strong><span>51reboot@reboot.com</span>
        </div>
        <el-alert title="工作内容" type="info" :closable="false"></el-alert>
        <div class="common-group input-group">
            <label for=""><strong>数据库名称：</strong></label>
            <span>51reboot</span>
        </div>
        <div class="common-group input-group">
            <label for=""><strong>下拉框：</strong></label>
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <el-alert title="执行日志" type="info" :closable="false"></el-alert>
        <div class="common-group input-group">
            <label for=""><strong>工单日志：</strong></label>
            <span>51reboot</span>
        </div>
        <el-alert title="审批历史" type="info" :closable="false"></el-alert>
        <div class="common-group">
            <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
            <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
            <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeDia">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: '',
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options: [],
            value: ''
        }
    },
    created() {},
    methods: {
        closeDia() {
            this.$emit('update:isShow', false)
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-alert {
    margin: 20px 0;
}
.common-group {
    margin-left: 20px;
    padding: 10px
}
.input-group {
    label {
        width: 100px;
        display: inline-block;
    }
}
.history-record {
    margin-bottom: 10px;
}
</style>
