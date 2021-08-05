<template>
    <el-dialog
        :title="title"
        :visible="isShow"
        width="600px"
        @close="closeDia">
        <el-form ref="form" :model="form" label-width="100px" :validate-on-rule-change="false">
            <el-form-item label="名称" prop="name" required>
                <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" :disabled="disabled" @click="confirmSubmit">提 交</el-button>
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
                default: () => {
                    return {}
                }
            }
        },
        data() {
            return {
                title: '',
                isEdit: false,
                form: {
                    name: '',
                },
                disabled: false,
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.isEdit = Object.keys(this.editData).length
                    this.form = Object.assign({}, this.editData)
                } else {
                    this.isEdit = false;
                    this.form.name=''
                }
            },
            isEdit(newVal) {
                if (newVal) {
                    this.title = '编辑'
                    this.form = Object.assign({}, this.editData)
                } else {
                    this.title = '新增'
                }
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$nextTick(()=>{
                    this.$refs['form'].clearValidate();
                    this.form = this.$options.data().form
                })
                this.$emit('update:isShow', false)
            },
            confirmSubmit() {
                if (this.disabled) return false;
                this.disabled = true;
                if (this.isEdit) {
                    this.api.auth.editRequestRuleClassify(this.editData.id, this.form).then(res => {
                        if (res.code === 0) {
                            this.$message.success('编辑成功');
                            this.closeDia();
                            this.$parent.getLeftRuleList();
                        } else {
                            this.$message.error(res.message||'')
                        }
                    }).finally(res => {
                        this.disabled = false
                    })
                } else {
                    this.api.auth.addRequestRuleClassify(this.form).then(res => {
                        if (res.code === 0) {
                            this.$message.success('新增成功');
                            this.closeDia();
                            this.$parent.getLeftRuleList();
                        } else {
                            this.$message.error(res.message||'')
                        }
                    }).finally(res => {
                        this.disabled = false
                    })
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
.table-group {
    margin: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    &>label {
        width: 80px;
    }
}
</style>
