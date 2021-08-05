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
            <el-form-item label="API权限" prop="rule">
                <div>
                    <el-checkbox v-model="selectAll" @change="handleSelectAll(selectAll)">全选</el-checkbox>
                    <el-checkbox v-model="expand" @change="expandAll(expand)">合并</el-checkbox>
                </div>
                <el-tree
                    :data="roleList"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :default-checked-keys="defaultCheckedKeys"
                    :props="defaultProps">
                </el-tree>
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
                    name: ''
                },
                roleList: [],
                disabled: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectAll: false,
                expand: false,
                defaultCheckedKeys: []
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.isEdit = Object.keys(this.editData).length
                    this.defaultCheckedKeys = this.editData.rule || []
                    this.fetchApiAuthList();
                } else {
                    this.form = {}
                    this.defaultCheckedKeys = []
                    this.isEdit = false;
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
            expandAll(bool) {
                var nodes =this.$refs.tree.store.nodesMap;
                for (var i in nodes) {
                    nodes[i].expanded = bool;
                }
            },
            handleSelectAll(isAll) {
                if(isAll) this.$refs.tree.setCheckedNodes(this.roleList);
                else this.$refs.tree.setCheckedKeys([]);
            },
            closeDia() {
                this.$nextTick(()=>{
                    this.$refs['form'].clearValidate();
                })
                this.$emit('update:isShow', false)
            },
            fetchApiAuthList() {
                this.api.auth.fetchApiAuthList().then(res => {
                    if (res.code === 0) {
                        this.roleList = res.data
                    } else {
                        this.$message.error(res.message || '')
                    }
                }).finally(res => {
                })
            },
            getCheckedKeys() {
                console.log(111, this.$refs.tree.getCheckedKeys(true));
            },
            confirmSubmit() {
                let rulesId = [];
                let checkedNodes = this.$refs.tree.getCheckedNodes();
                checkedNodes.forEach(item => {
                    if (!item.children) rulesId.push(item.id)
                })
                if (this.disabled) return false;
                this.disabled = true;
                let params = {
                    name: this.form.name,
                    rule: rulesId,
                }
                if (this.isEdit) {
                    this.api.auth.editRequestRole(this.editData.id, params).then(res => {
                        if (res.code === 0) {
                            this.$message.success('编辑成功');
                            this.closeDia();
                            this.$parent.fetchTableData();
                        } else {
                            this.$message.error(res.message || '')
                        }
                    }).finally(res => {
                        this.disabled = false
                    })
                } else {
                    this.api.auth.addRequestRole(params).then(res => {
                        if (res.code === 0) {
                            this.$message.success('新增成功');
                            this.closeDia();
                            this.$parent.fetchTableData();
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
