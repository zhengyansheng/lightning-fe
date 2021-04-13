<template>
    <el-dialog :title="title" :visible="isShow" width="600px" @close="resetForm">
        <el-tabs v-model="activeName">
            <el-tab-pane label="标准录入" name="normal">
                <el-form :model="ruleForm" size="small" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号" prop="account">
                        <el-select v-model="ruleForm.account" placeholder="请选择账号" style="width: 100%">
                            <el-option
                                v-for="item in appkeyList"
                                :key="item.en_name"
                                :label="`${item.en_name}(${item.cn_name})`"
                                :value="item.en_name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="计费方式" prop="pay_type">
                        <el-select v-model="ruleForm.pay_type" placeholder="请选择计费方式" style="width: 100%">
                            <el-option key="PrePaid" label="包年包月" value="PrePaid"></el-option>
                            <el-option key="PostPaid" label="按量" value="PostPaid"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="地域" prop="region_id">
                        <el-input v-model="ruleForm.region_id" placeholder="请输入地域"></el-input>
                    </el-form-item>
                    <el-form-item label="可用区" prop="zone_id">
                        <el-input v-model="ruleForm.zone_id" placeholder="请输入可用区"></el-input>
                    </el-form-item>
                    <el-form-item label="配置" prop="instance_type">
                        <el-input v-model="ruleForm.instance_type" placeholder="请输入配置"></el-input>
                    </el-form-item>
                    <el-form-item label="镜像" prop="image_id">
                        <el-input v-model="ruleForm.image_id" placeholder="请输入镜像"></el-input>
                    </el-form-item>
                    <el-form-item label="VPC" prop="vpc_id">
                        <el-input v-model="ruleForm.vpc_id" placeholder="请输入VPC"></el-input>
                    </el-form-item>
                    <el-form-item label="子网" prop="subnet_id">
                        <el-input v-model="ruleForm.subnet_id" placeholder="请输入子网"></el-input>
                    </el-form-item>
                    <el-form-item label="安全组" required>
                        <div v-for="(item, index) in securityGroupIds" :key="index" style="width: 90%; display:inline-block;">
                            <el-input v-model="securityGroupIds[index]" placeholder="请输入安全组" style="width: 90%; margin-bottom:8px;"></el-input>
                            <el-button type="danger" size="mini" icon="el-icon-minus" circle style="margin-left: 10px;" v-show="securityGroupIds.length > 1" @click="securityGroupIds.splice(index, 1)"></el-button>
                        </div>
                        <el-button type="primary" size="mini" icon="el-icon-plus" circle style="margin-left: 10px;" @click="securityGroupIds.push('')"></el-button>
                    </el-form-item>
                    <el-form-item label="外网IP" style="margin-bottom:0; margin-top:-14px;">
                        <el-radio v-model="outsideIP" label="is_public">公网IP</el-radio>
                        <el-radio v-model="outsideIP" label="is_eip">弹性IP</el-radio>
                    </el-form-item>
                    <el-form-item label="存储">
                        <div v-for="(item, index) in disksList" :key="index" style="width: 90%; margin-bottom:8px;display:inline-block;">
                            <el-select v-model="item.disk_type" placeholder="请选择" style="width: 28%;margin-right:10px;">
                                <el-option key="system" label="系统盘" value="system"></el-option>
                                <el-option key="data" label="数据盘" value="data"></el-option>
                            </el-select>
                            <el-select v-model="item.disk_storage_type" placeholder="请选择" style="width: 28%;margin-right:10px;">
                                <el-option key="cloud" label="普通盘" value="cloud"></el-option>
                                <el-option key="ssd" label="SSD" value="ssd"></el-option>
                            </el-select>
                            <el-input-number v-model="item.disk_storage_size" controls-position="right" style="width: 28%" :min="100" :step="100" :step-strictly="true"></el-input-number>
                            <el-button type="danger" size="mini" icon="el-icon-minus" circle style="margin-left: 10px;" v-show="disksList.length > 1" @click="disksList.splice(index, 1)"></el-button>
                        </div>
                        <el-button type="primary" size="mini" icon="el-icon-plus" circle style="margin-left: 10px;" @click="disksList.push({ disk_type: 'system', disk_storage_type: 'cloud', disk_storage_size: 100 })"></el-button>
                    </el-form-item>
                    <el-form-item label="AppKey">
                        <span>{{nodes}}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disabled">创建</el-button>
                        <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="一键生成" name="fast">
                <el-form :model="copyForm" size="small" :rules="copyRules" ref="copyForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="AppKey">
                        <span>{{nodes}}</span>
                    </el-form-item>
                    <el-form-item label="数据">
                        <el-input @input="handleJsonDataChange" v-model="copyForm.textarea" type="textarea" :rows="20" placeholder="请输入json数据"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitCopyForm('copyForm')" :disabled="disabled">生成</el-button>
                        <el-button @click="resetForm">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        
    </el-dialog>
</template>
<script>
    export default {
        name: '',
        props: ['isShow', 'nodes'],
        data() {
            return {
                activeName: 'normal',
                title: '创建模版',
                ruleForm: {
                    account: '',
                    pay_type: 'PrePaid',
                    region_id: '',
                    zone_id: '',
                    instance_type: '',
                    image_id: '',
                    vpc_id: '',
                    subnet_id: ''
                },
                copyForm: {
                    textarea: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请填写账号', trigger: 'blur' }
                    ],
                    pay_type: [
                        { required: true, message: '请选择计费方式', trigger: 'change' }
                    ],
                    region_id: [
                        { required: true, message: '请填写地域', trigger: 'blur' }
                    ],
                    zone_id: [
                        { required: true, message: '请填写可用区', trigger: 'blur' }
                    ],
                    instance_type: [
                        { required: true, message: '请填写配置', trigger: 'blur' }
                    ],
                    image_id: [
                        { required: true, message: '请填写镜像', trigger: 'blur' }
                    ],
                    vpc_id: [
                        { required: true, message: '请填写VPC', trigger: 'blur' }
                    ],
                    subnet_id: [
                        { required: true, message: '请填写子网', trigger: 'blur' }
                    ]
                },
                copyRules: {
                    textarea: [
                        { required: true, message: '请填写json数据', trigger: 'blur' }
                    ],
                },
                disabled: false,
                outsideIP: '',
                securityGroupIds: [''],
                disksList: [{ disk_type: 'system', disk_storage_type: 'cloud', disk_storage_size: 100 }],
                appkeyList: []
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.getAppkeyLists()
                }
            }
        },
        created() {
        },
        methods: {
            getAppkeyLists() {
                this.api.appkey.fetchMultiCloudAccount().then(res => {
                    this.appkeyList = res.data
                })
            },
            resetForm() {
                this.$emit('update:isShow', false)
                this.disabled = false; 
                for (const key in this.ruleForm) {
                    this.ruleForm[key] = '';
                }
                this.outsideIP = ''
                this.securityGroupIds = ['']
                this.disksList = [{ disk_type: 'system', disk_storage_type: 'cloud', disk_storage_size: 100 }]
                this.$nextTick(() => {
                    if (this.$refs['ruleForm']) this.$refs['ruleForm'].resetFields();
                })
                this.copyForm.textarea = '';
                this.$nextTick(() => {
                    if (this.$refs['copyForm']) this.$refs['copyForm'].resetFields();
                })
            },
            submitCopyForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.addMachinePaid(JSON.parse(this.copyForm.textarea));
                    }
                });
            },
            // 确认提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let securityGroup = this.securityGroupIds.filter(function (s) {
                            return s && s.trim();
                        });
                        this.securityGroupIds = securityGroup;
                        if (securityGroup.length) {
                            this.disabled = true;

                            let params = {
                                ...this.ruleForm,
                                app_key: this.nodes,
                                disks: [...this.disksList],
                                security_group_ids: [...this.securityGroupIds],
                                is_public: false,
                                is_eip: false
                            }
                            if (this.outsideIP) {
                                params[this.outsideIP] = true
                            }
                            this.addMachinePaid(params);
                        } else {
                            this.securityGroupIds = ['']
                            this.$message.warning('请填写安全组')
                        }
                    }
                });
            },
            addMachinePaid(params) {
                this.api.machinePaid.createMultiCloudTemplate(params).then(res => {
                    if (res.code !== 0) {
                        this.$message.error(res.message);
                        this.disabled = false;   
                    } else {
                        this.$message.success('创建成功');
                        this.resetForm('ruleForm');
                        this.$parent.getTableData(this.nodes);
                    }
                }).catch(err => {
                    this.disabled = false;   
                })
            },
            handleJsonDataChange(val) {
                let object = JSON.parse(val)
                this.$delete(object, 'CreatedAt')
                this.$delete(object, 'UpdatedAt')
                this.$delete(object, 'DeletedAt')
                this.copyForm.textarea = JSON.stringify(object, undefined, 4)
                console.log('change', this.copyForm.textarea);
            }
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
    margin-top: 30px !important;
}
/deep/ .el-form-item--small.el-form-item {
    margin-bottom: 8px;
}
</style>
