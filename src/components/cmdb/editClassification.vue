<template>
    <el-dialog :title="title" :visible="isShow" width="450px" @close="resetForm('ruleForm')">
        <el-form :model="ruleForm" :size="size" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">保存</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
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
        },
        editData: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            size: 'medium',
            title: '添加分类',
            ruleForm: {
                name: '',
                remarks: ''
            },
            rules: {
                name: [
                    { required: true, message: '请填写名称', trigger: 'blur' }
                ]
            },
            disabled: false
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.title = this.editData.name ? '编辑分类' : '添加分类';
                this.ruleForm.name = this.editData.name;
                this.ruleForm.remarks = this.editData.remarks;
            }
        }
    },
    methods: {
        // 确认提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.disabled = true;
                    this.editData.name ? this.editClassification() : this.addClassification();
                }
            });
        },
        // 重置表单
        resetForm(formName) {
            this.$emit('update:isShow', false);
            this.disabled = false;
            this.$nextTick(() => {
                if (this.$refs[formName]) this.$refs[formName].resetFields();
            })
        },
        closeDia() {
            this.$emit('update:isShow', false);
        },
        // 修改
        editClassification() {
            const params = {
                ...this.editData,
                name: this.ruleForm.name,
                remarks: this.ruleForm.remarks || ''
            }
            this.api.cmdb.editClassification(params).then(data => {
                if (data.code !== 20000) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('编辑分类成功');
                this.$parent.getTableList();
                this.resetForm();
            }).catch(err => {
                console.log(err);
                this.disabled = false;
            })
        },
        // 添加
        addClassification() {
            const params = {
                name: this.ruleForm.name,
                remarks: this.ruleForm.remarks || ''
            }
            this.api.cmdb.addClassification(params).then(data => {
                if (data.code !== 20000) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('添加分类成功');
                this.$parent.getTableList();
                this.resetForm();
            }).catch(err => {
                console.log(err);
                this.disabled = false;
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