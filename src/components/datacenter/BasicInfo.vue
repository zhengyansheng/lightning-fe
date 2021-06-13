<template>
    <el-form ref="form" :model="form" label-width="80px" style="width: 500px;margin: auto;">
        <el-form-item label="名称" prop="name" required>
            <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="别名" prop="alias" required>
            <el-input v-model="form.alias" size="small"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" required>
            <input type="file" @change="getFile($event)" name="file" id="file">
        </el-form-item>
        <el-form-item label="日志记录" prop="record_log" required>
            <el-switch v-model="form.record_log" size="small"></el-switch>
        </el-form-item>
        <el-form-item label="禁止关联" prop="is_forbid_bind" required>
            <el-switch v-model="form.is_forbid_bind" size="small"></el-switch>
        </el-form-item>
        <el-form-item label="选择分类" prop="pid" required>
            <el-select v-model="form.pid" placeholder="请选择" size="small">
                <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input type="textarea" v-model="form.remark" size="small"></el-input>
        </el-form-item>
        <el-form-item>
            <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button> -->
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    export default {
        name: '',
        props: {
            editData: {
                type: Object
            }
        },
        data() {
            return {
                typeList: [],
                form: {
                    name: '',
                    alias: '',
                    icon: null,
                    record_log: false,
                    is_forbid_bind: false,
                    pid: '',
                    remark: ''
                }
            }
        },
        watch: {
            editData(newVal) {
                if (newVal) this.form = Object.assign({}, this.editData);
            }
        },
        created() {
            this.getTypeList();
            this.form = Object.assign({}, this.editData)
        },
        methods: {
            closeDia() {
                this.$emit('close')
            },
            getFile(event) {
                this.form.icon = event.target.files[0]
            },
            getTypeList() {
                this.api.datacenter.getTypeList().then(res => {
                    if (res.code === 0) {
                        this.typeList = res.data.results;
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            confirmSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        const formData = new FormData()
                        for (let key in this.form) {
                            console.log(key, this.form[key]);
                            formData.append(key, this.form[key])
                        }
                        const config = {
                            headers: {
                            'Content-Type': 'multipart/form-data'
                            }
                        }
                        this.api.datacenter.editTableClassify(this.form.pid, formData, config).then(res => {
                            if (res.code === 0) {
                                this.$message.success('编辑成功');
                                this.closeDia();
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
    margin-top: 10px !important;
}
</style>
