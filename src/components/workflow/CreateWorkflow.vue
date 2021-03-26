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
        <label for=""><strong>姓名：</strong></label>
        <el-input />
    </div>
    <div class="common-group input-group">
        <label for=""><strong>数据库名称：</strong></label>
        <el-input />
    </div>
    <div class="common-group input-group">
        <label for=""><strong>开关：</strong></label>
        <el-switch v-model="value" active-value="100" inactive-value="0"></el-switch>
    </div>
    <div class="common-group input-group">
        <label for=""><strong>下拉框：</strong></label>
        <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="common-group input-group">
        <label for=""><strong>输入框1：</strong></label>
        <el-input :autosize="{ minRows: 2, maxRows: 10}" type="textarea" />
    </div>
    <el-alert title="审批人" type="info" :closable="false"></el-alert>
    <div class="common-group input-group">
        <label for=""><strong>审核人：</strong></label>
        <el-select v-model="value" multiple filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
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

        },
        remoteMethod(query) {
            if (query !== '') {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-alert {
    margin: 20px 0;
}

/deep/ .el-input,
.el-textarea {
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
