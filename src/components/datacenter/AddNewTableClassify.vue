<template>
    <el-dialog
        title="新增表"
        :visible="isShow"
        width="600px"
        @close="closeDia">
        <el-form ref="form" :model="form" label-width="80px">
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
            <el-form-item label="选择分类" prop="pid" required v-if="showSelect">
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
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
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
            pid: {
                type: Number
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
                },
                showSelect: true
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal && this.pid) {
                    this.showSelect = false;
                    this.form.pid = this.pid
                }
            }
        },
        created() {
            this.getTypeList();
        },
        methods: {
            closeDia() {
                this.$refs['form'].resetFields();
                this.$emit('update:isShow', false)
            },
            getFile(event) {
                this.form.icon = event.target.files[0]
            },
            getTypeList() {
                this.api.datacenter.getTypeList().then(res => {
                    console.log(res.data.results);
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
                        this.api.datacenter.addNewTableClassify(formData, config).then(res => {
                            if (res.code === 0) {
                                this.$message.success('新增表成功');
                                this.closeDia();
                                this.$parent.fetchTableClassifyTree();
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
/deep/ .el-form-item {
    margin-bottom: 18px;
}
/deep/ .el-dialog {
    margin-top: 10px !important;
}
</style>
