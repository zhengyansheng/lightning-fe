<template>
    <el-dialog :title="title" :visible="isShow" width="600px" @close="resetForm('ruleForm')">
        <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="英文名" prop="en_name">
                <el-input v-model="ruleForm.en_name" placeholder="请输入英文名"></el-input>
            </el-form-item>
            <el-form-item label="中文名" prop="cn_name">
                <el-input v-model="ruleForm.cn_name" placeholder="请输入中文名"></el-input>
            </el-form-item>
            <el-form-item label="平台" prop="platform">
                <el-input v-model="ruleForm.platform" placeholder="请输入平台"></el-input>
            </el-form-item>
            <el-form-item label="密钥 - KeyId" prop="access_key_id">
                <el-input v-model="ruleForm.access_key_id" placeholder="请输入密钥 - KeyId"></el-input>
            </el-form-item>
            <el-form-item label="密钥 - KeySecret" prop="secret_key_id">
                <el-input v-model="ruleForm.secret_key_id" placeholder="请输入密钥 - KeySecret"></el-input>
            </el-form-item>
            <el-form-item label="主账号ID" prop="root_id">
                <el-input v-model="ruleForm.root_id" placeholder="请输入主账号ID"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">保存</el-button>
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
            }
        },
        data() {
            return {
                title: '云账号 AccessKey API 的密钥',
                ruleForm: {
                    cn_name: '',
                    en_name: '',
                    platform: '',
                    access_key_id: '',
                    secret_key_id: '',
                    root_id: ''
                },
                rules: {
                    cn_name: [
                        { required: true, message: '请填写中文名', trigger: 'blur' }
                    ],
                    en_name: [
                        { required: true, message: '请填写英文名', trigger: 'blur' }
                    ],
                    platform: [
                        { required: true, message: '请填写平台', trigger: 'blur' }
                    ],
                    access_key_id: [
                        { required: true, message: '请填写密钥 - KeyId', trigger: 'blur' }
                    ],
                    secret_key_id: [
                        { required: true, message: '请填写密钥 - KeySecret', trigger: 'blur' }
                    ]
                },
                disabled: false
            }
        },
        created() {
        },
        methods: {
            resetForm(formName) {
                this.$emit('update:isShow', false)
                this.disabled = false; 
                this.loading = false;
                for (const key in this.ruleForm) {
                    this.ruleForm[key] = '';
                }
                this.$nextTick(() => {
                    if (this.$refs[formName]) this.$refs[formName].resetFields();
                })
            },
            // 确认提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.disabled = true;
                        this.addAppKey();
                    }
                });
            },
            addAppKey() {
                this.api.appkey.postMultiCloudAccount(this.ruleForm).then(res => {
                    if (res.code !== 0) {
                        this.$message.error(res.message);
                        this.disabled = false;   
                        this.loading = false;
                    } else {
                        this.$message.success('删除成功');
                        this.resetForm('ruleForm');
                        this.$parent.getTableData();
                    }
                }).catch(err => {
                    this.disabled = false;   
                    this.loading = false;
                })
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
