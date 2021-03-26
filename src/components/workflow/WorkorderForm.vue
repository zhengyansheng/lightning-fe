<template>
<el-dialog title="数据库创建工单" :visible="isShow" :close-on-click-modal='false' width="800px" @close="closeDia">
    <el-steps :active="2" finish-status="success">
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
        <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-alert title="工单" type="info" :closable="false"></el-alert>
    <div class="common-group input-group">
        <label for=""><strong>数据库名字：</strong></label>
        <el-input />
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
        <el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" />
    </div>
    <!-- <el-alert title="审批人" type="info" :closable="false"></el-alert> -->
    <!-- <el-form ref="createDataForm" :rules="createRules" :model="createTemp" label-position="left"
                label-width="120px"
                style="width: 80%; margin-left:20px;margin-top: 10px" v-if="isShowNextUser">
        <el-form-item label="审核人" prop="cur_user">
        <span>{{createTemp.cur_user_cname}}</span><span style="margin-left: 10px">
        <el-button @click="handlerRoleUser" size="mini" type="success">选择审批人</el-button></span>
        </el-form-item>
    </el-form> -->
    <el-alert title="反馈" type="info" :closable="false"></el-alert>
    <div class="common-group input-group">
        <label for=""><strong>反馈：</strong></label>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="common-group input-group">
        <label for=""><strong>意见：</strong></label>
        <el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" />
    </div>
    <!-- <el-form ref="feedbackDataForm" :rules="feedbackRules" :model="feedbackTemp" label-position="left"
                label-width="100px"
                style="width: 90%; margin-left:20px;margin-top: 10px" v-if="dialogStatus=='feedback'">
        <el-form-item label="反馈" prop="opinion">
        <el-select v-model="feedbackTemp.opinion" filterable style="width: 83%!important; margin-left: 15px">
            <el-option v-for="item in feedbackOptions" :key="item.key" :value="item.key"
                        :label="item.display_name"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="意见" prop="remark">
        <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="feedbackTemp.remark" type="textarea"
                    placeholder="input remark" style="width: 83%; margin-left: 15px"/>
        </el-form-item>
    </el-form> -->
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia" size="mini">取消</el-button>
        <el-button v-show="dialogStatus!='detail'" type="primary"
                    @click="handleData(dialogStatus)" size="mini" :loading="chickLoading">确认
        </el-button>
    </div> -->
    <el-alert title="审批历史" type="info" :closable="false"></el-alert>
    <div class="common-group">
        <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
        <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
        <div class="history-record">[2020-12-01 19:38:13] 研发领导:51reboot(同意)</div>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia" size="mini">取消</el-button>
        <el-button type="primary" @click="handleData" size="mini" :loading="chickLoading">确认
        </el-button>
    </div>
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
            chickLoading: false,
            options: [],
            value: ''
        }
    },
    created() {},
    methods: {
        closeDia() {
            this.$emit('update:isShow', false)
        },
        handleData() {

        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-alert {
    margin: 20px 0;
}
/deep/ .el-input, .el-textarea {
    width: 80%;
}
/deep/ .el-select {
    width: 80%;
    .el-input {
        width: 100%;
    }
}
.common-group {
    margin-left: 20px;
    padding: 10px
}
.input-group {
    label {
        width: 100px;
        display: inline-block;
        vertical-align: top;
    }
}
.history-record {
    margin-bottom: 10px;
}
</style>
