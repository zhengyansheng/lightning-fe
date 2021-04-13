<template>
    <el-dialog :title="title" :visible="isShow" width="450px" @close="resetForm('ruleForm')">
        <el-form :model="ruleForm" :size="size" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="节点名称" prop="name" required>
                <el-input v-model="ruleForm.name" placeholder="请输入节点名称"></el-input>
            </el-form-item>
            <el-form-item label="中文名称" prop="name_cn">
                <el-input v-model="ruleForm.name_cn" placeholder="请输入中文名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark" type="textarea" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">保存</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
export default {
    name: '',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        const checkNodeName = (rule, value, callback) => {
            const r = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
            if (value == null || String(value).trim() === '') {
                callback(new Error('请输入节点名称'));
            } else if (r.test(value)) {
                callback(new Error('节点名称不能为中文'));
            }else {
                callback();
            }
        };
        return {
            size: 'medium',
            title: '添加节点',
            ruleForm: {
                name: '',
                name_cn: '',
                remark: '',
                parent: ''
            },
            rules: {
                name: [
                    { required: true, validator: checkNodeName, trigger: 'blur' }
                ]
            },
            disabled: false
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                console.log(1, this.editData);
                this.title = this.editData.type === 'edit' ? '编辑节点' : '添加节点';
                // this.ruleForm = Object.assign({}, this.editData);
                this.ruleForm.name = this.editData.name
                this.ruleForm.name_cn = this.editData.name_cn
                this.ruleForm.remark = this.editData.remark
                this.ruleForm.parent = this.editData.parent
                console.log(11, this.editData);
            }
        }
    },
    methods: {
        // 确认提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.disabled = true;
                    this.editData.type === 'edit' ? this.editNodeTree() : this.addNodeTree();
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$emit('update:isShow', false);
            this.disabled = false;
            for (const key in this.ruleForm) {
                this.ruleForm[key] = '';
            }
            for (const key in this.editData) {
                this.editData[key] = '';
            }
            this.$nextTick(() => {
                if (this.$refs[formName]) this.$refs[formName].resetFields();
            })
        },
        // 修改
        editNodeTree() {
            const params = {
                name: this.ruleForm.name,
                name_cn: this.ruleForm.name_cn,
                remark: this.ruleForm.remark
            }
            this.api.serviceTree.editNodeTree(this.editData.pk, params).then(data => {
                if (data.code !== 0) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('编辑节点成功');
                this.$parent.getServiceTreeList();
                this.resetForm('ruleForm');
            })
        },
        // 添加
        addNodeTree() {
            const params = {
                name: this.ruleForm.name,
                name_cn: this.ruleForm.name_cn,
                parent: this.ruleForm.parent,
                remark: this.ruleForm.remark
            }
            this.api.serviceTree.addNodeTree(params).then(data => {
                if (data.code !== 0) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('添加节点成功');
                this.$parent.getServiceTreeList();
                this.resetForm('ruleForm');
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog__header {
    padding: 20px 20px 0px;
}
/deep/ .el-input .el-input__count{
    color: #B6C2CC !important;
}
/deep/ .el-textarea .el-input__count{
    color: #B6C2CC !important;
}
/deep/ .el-dialog__body{
    padding: 20px;
}
/deep/ .el-form-item:last-child{
    margin-bottom: 0px;
}
</style>