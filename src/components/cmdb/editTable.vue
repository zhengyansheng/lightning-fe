<template>
    <el-dialog :title="title" :visible="isShow" width="800px" @close="resetForm('ruleForm')">
        <el-form :model="ruleForm" :size="size" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="别名" prop="alias">
                <el-input v-model="ruleForm.alias" placeholder="请输入别名"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="classification">
                <el-select v-model="ruleForm.classification" placeholder="请选择类型">
                    <el-option
                        v-for="(citem, cindex) in classificationOptions"
                        :key="cindex"
                        :label="citem.name"
                        :value="citem.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="ruleForm.remarks"></el-input>
            </el-form-item>
            <el-form-item label="字段" prop="name">
                <div class="fields-group" v-for="(item, index) of ruleForm.fields" :key="index">
                    <el-input v-model="item.name" placeholder="名称：name"></el-input>
                    <el-input v-model="item.alias" placeholder="别名：alias"></el-input>
                    <el-select v-model="item.type" placeholder="请选择类型">
                        <el-option label="单行输入框" value="input"></el-option>
                        <el-option label="多行输入框" value="textarea"></el-option>
                        <el-option label="日期" value="date"></el-option>
                        <el-option label="日期时间" value="datetime"></el-option>
                    </el-select>
                    <el-input v-model="item.remarks" placeholder="备注描述"></el-input>
                    <el-checkbox v-model="item.required">是否必填</el-checkbox>
                    <i v-if="index === 0" class="el-icon-circle-plus-outline plus" @click="addFields('add')"></i>
                    <i v-else class="el-icon-remove-outline reduce" @click="addFields('delete', index)"></i>
                </div>
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
            title: '添加表',
            ruleForm: {
                name: '',
                alias: '',
                classification: '',
                remarks: '',
                fields: [{ name: '', type: '', alias: '', remarks: '', required: '' }]
            },
            rules: {
                name: [
                    { required: true, message: '请填写名称', trigger: 'blur' }
                ],
                alias: [
                    { required: true, message: '请填写别名', trigger: 'blur' }
                ],
                classification: [
                    { required: true, message: '请选择', trigger: 'change' }
                ]
            },
            disabled: false,
            classificationOptions: null
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.title = this.editData.id ? '编辑表' : '添加表';
                this.ruleForm = JSON.parse(JSON.stringify(this.editData));
                this.getClassificationList();
            }
        }
    },
    methods: {
        // 获取列表
        getClassificationList() {
            this.api.cmdb.getClassificationList({
                page: 1,
                limit: 999999
            }).then(res => {
                if (Number(res.code) === 20000) {
                    this.classificationOptions = res.data.list;
                }
            }).catch(err => {
                console.log(err);
            })
        },
        // 提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.disabled = true;
                    this.editData.id ? this.editTable() : this.addTable();
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$emit('update:isShow', false);
            this.disabled = false;
            for (const key in this.ruleForm) {
                this.ruleForm[key] = '';
            }
            this.$nextTick(() => {
                if (this.$refs[formName]) {
                    this.$refs[formName].resetFields();
                }
            })
        },
        // 编辑
        editTable() {
            const params = Object.assign({}, this.ruleForm);
            this.api.cmdb.editTable(params).then(data => {
                if (data.code !== 20000) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('编辑表成功');
                this.$parent.getTableList();
                this.resetForm();
            })
        },
        // 添加
        addTable() {
            const params = Object.assign({}, this.ruleForm);
            this.api.cmdb.addTable(params).then(data => {
                if (data.code !== 20000) {
                    this.$message.error(data.message);
                    return false;
                }
                this.$message.success('创建表成功');
                this.$parent.getTableList();
                this.resetForm();
            })
        },
        // 添加
        addFields(type, index) {
            if (type === 'add') {
                this.ruleForm.fields.push({ name: '', type: '', alias: '', remarks: '', required: '' })
            } else {
                this.ruleForm.fields.splice(index, 1);
            }
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
/deep/ .el-select {
    width: 100%;
}
.fields-group {
    margin-bottom: 10px;
    .el-input, .el-select {
        width: 120px;
        margin-right: 10px;
    }
    .plus, .reduce {
        font-size: 26px;
        vertical-align: sub;
        margin-left: 10px;
    }
}
</style>