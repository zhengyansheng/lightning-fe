<template>
    <el-dialog :title="title" :visible="isShow" width="600px" @close="resetForm">
        <el-form :model="ruleForm" size="small" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
                <span>{{ruleForm.account}}</span>
            </el-form-item>
            <el-form-item label="计费方式" prop="pay_type">
                <el-select v-model="ruleForm.pay_type" placeholder="请选择计费方式" style="width: 100%">
                    <el-option key="PrePaid" label="包年包月" value="PrePaid"></el-option>
                    <el-option key="PostPaid" label="按量" value="PostPaid"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="地域" prop="region_id">
                <span>{{ruleForm.region_id}}</span>
            </el-form-item>
            <el-form-item label="可用区" prop="zone_id">
                <span>{{ruleForm.zone_id}}</span>
            </el-form-item>
            <el-form-item label="配置" prop="instance_type">
                <span>{{ruleForm.instance_type}}</span>
            </el-form-item>
            <el-form-item label="镜像" prop="image_id">
                <span>{{ruleForm.image_id}}</span>
            </el-form-item>
            <el-form-item label="VPC" prop="vpc_id">
                <span>{{ruleForm.vpc_id}}</span>
            </el-form-item>
            <el-form-item label="子网" prop="subnet_id">
                <span>{{ruleForm.subnet_id}}</span>
            </el-form-item>
            <el-form-item label="安全组">
                <span>{{ruleForm.security_group_ids.length ? ruleForm.security_group_ids.join(',') : ''}}</span>
            </el-form-item>
            <el-form-item label="外网IP">
                <el-radio v-model="outsideIP" label="is_public">公网IP</el-radio>
                <el-radio v-model="outsideIP" label="is_eip">弹性IP</el-radio>
            </el-form-item>
            <el-form-item label="主机名">
                <el-input v-model="ruleForm.hostname" placeholder="请输入主机名" style="width: 90%; margin-bottom:10px;"></el-input>
                <!-- <div v-for="(item, index) in hostnamesList" :key="index" style="width: 90%; margin-bottom:10px;display:inline-block;">
                    <el-input v-model="hostnamesList[index]" placeholder="请输入主机名" style="width: 90%; margin-bottom:10px;"></el-input>
                    <el-button type="danger" size="mini" icon="el-icon-minus" circle style="margin-left: 10px;" @click="hostnamesList.splice(index, 1)"></el-button>
                </div>
                <el-button type="primary" size="mini" icon="el-icon-plus" circle style="margin-left: 10px;" @click="hostnamesList.push('')"></el-button> -->
            </el-form-item>
            <el-form-item label="存储">
                <div v-for="(item, index) in disksList" :key="index" style="width: 90%; margin-bottom:10px;display:inline-block;">
                    <el-select v-model="item.disk_type" placeholder="请选择" style="width: 28%;margin-right:10px;">
                        <el-option key="system" label="系统盘" value="system"></el-option>
                        <el-option key="data" label="数据盘" value="data"></el-option>
                    </el-select>
                    <el-select v-model="item.disk_storage_type" placeholder="请选择" style="width: 28%;margin-right:10px;">
                        <el-option key="cloud" label="普通盘" value="cloud"></el-option>
                        <el-option key="ssd" label="SSD" value="ssd"></el-option>
                    </el-select>
                    <el-input-number v-model="item.disk_storage_size" controls-position="right" style="width: 28%" :min="100" :step="100" :step-strictly="true"></el-input-number>
                    <el-button type="danger" size="mini" icon="el-icon-minus" circle style="margin-left: 10px;" @click="disksList.splice(index, 1)"></el-button>
                </div>
                <el-button type="primary" size="mini" icon="el-icon-plus" circle style="margin-left: 10px;" @click="disksList.push({ disk_type: 'system', disk_storage_type: 'cloud', disk_storage_size: 100 })"></el-button>
            </el-form-item>
            <el-form-item label="AppKey">
                <span>{{ruleForm.app_key}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" :disabled="disabled">交付</el-button>
                <el-button @click="resetForm">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    export default {
        name: '',
        props: ['isShow', 'editData'],
        data() {
            return {
                title: '交付',
                ruleForm: {
                    account: '',
                    pay_type: '',
                    region_id: '',
                    zone_id: '',
                    instance_type: '',
                    image_id: '',
                    vpc_id: '',
                    subnet_id: '',
                    security_group_ids: [],
                    app_key: '',
                    hostname: ''
                },
                disabled: false,
                outsideIP: '',
                hostnamesList: [''],
                disksList: [{ disk_type: 'system', disk_storage_type: 'cloud', disk_storage_size: 100 }]
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.ruleForm = { ...this.editData }
                    if (this.editData.is_public) this.outsideIP = 'is_public'
                    else if (this.editData.is_eip) this.outsideIP = 'is_eip'
                    else this.outsideIP = ''
                    this.disksList = [...this.ruleForm.disks]
                }
            }
        },
        created() {
        },
        methods: {
            resetForm() {
                this.$emit('update:isShow', false)
                this.disabled = false; 
                for (const key in this.ruleForm) {
                    this.ruleForm[key] = '';
                }
                this.outsideIP = ''
                this.hostnamesList = ['']
            },
            // 确认提交
            submitForm() {
                if (this.ruleForm.hostname) {
                    this.disabled = true;
                    this.editMachinePaid();
                } else {
                    this.$message.warning('请填写主机名')
                }
            },
            editMachinePaid() {
                let params = {
                    ...this.ruleForm,
                    disks: [...this.disksList],
                    is_public: false,
                    is_eip: false
                }
                if (this.outsideIP) {
                    params[this.outsideIP] = true
                }
                this.api.machinePaid.paidMultiCloudTemplate(params).then(res => {
                    if (res.code !== 0) {
                        this.$message.error(res.message);
                        this.disabled = false;   
                    } else {
                        this.$message.success('交付成功');
                        this.resetForm();
                        this.$parent.getTableData(this.ruleForm.app_key);
                    }
                }).catch(err => {
                    this.disabled = false;   
                })
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
