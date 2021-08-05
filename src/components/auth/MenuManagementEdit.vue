<template>
<el-dialog :title="title" :visible="isShow" width="800px" @close="closeDia">
    <el-form ref="form" :model="form" :inline="true" label-width="120px" size="small">
        <el-form-item label="父级" prop="pid">
            <el-select v-model="form.pid" placeholder="请选择">
                <el-option v-for="item in parentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="路径" prop="path" required>
            <el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name" required>
            <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路由名" prop="title" required>
            <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="VUE文件路径" prop="component" required>
            <el-input v-model="form.component" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" required>
            <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="重定向" prop="redirect">
            <el-input v-model="form.redirect" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详情路由" prop="active_menu">
            <el-input v-model="form.active_menu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
            <el-select v-model="form.role" placeholder="请选择" multiple>
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序" prop="order" required>
            <el-input v-model.number="form.order" type="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="不缓存" prop="no_cache" required>
            <el-switch v-model="form.no_cache"></el-switch>
        </el-form-item>
        <el-form-item label="显示" prop="breadcrumb" required>
            <el-switch v-model="form.breadcrumb"></el-switch>
        </el-form-item>
        <el-form-item label="固定" prop="affix" required>
            <el-switch v-model="form.affix"></el-switch>
        </el-form-item>
        <el-form-item label="隐藏" prop="hidden" required>
            <el-switch v-model="form.hidden"></el-switch>
        </el-form-item>
        <el-form-item label="显示根路由" prop="always_show" required>
            <el-switch v-model="form.always_show"></el-switch>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    name: 'MenuManagementEdit',
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
            form: {
                pid: null,
                role: [],
                path: '',
                name: '',
                component: '',
                title: '',
                icon: '',
                order: null,
                redirect: '',
                active_menu: '',
                hidden: false,
                always_show: false,
                no_cache: false,
                affix: false,
                breadcrumb: false,		
            },
            title: '',
            parentList: [],
            roleList: []
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.isEdit = Object.keys(this.editData).length
                this.title = this.isEdit ? '编辑' : '新增';
                if (this.isEdit) this.form = Object.assign({}, this.editData);
                this.fetchTableData()
                this.fetchRoleList()
            } else {
                this.isEdit = false;
            }
        },
    },
    created() {},
    methods: {
        closeDia() {
            this.$nextTick(()=>{
                this.$refs['form'].clearValidate();
            })
            this.form = this.$options.data().form
            this.$emit('update:isShow', false)
        },
        fetchTableData() {
            this.api.auth.fetchParentMenuList().then(res => {
                console.log(234, res.data);
                this.parentList = res.data
            })
        },
        fetchRoleList() {
            this.api.auth.fetchRoleList().then(res => {
                this.roleList = res.data.results
            })
        },
        getLeftRuleList() {
            this.api.auth.fetchRuleClassifyList().then(res => {
                this.parentList = res.data.results
            })
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
        save() {
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    if (this.isEdit) {
                        this.api.auth.editRequestMenu(this.editData.id, this.form).then(res => {
                            if (res.code === 0) {
                                this.$message.success('编辑成功');
                                this.closeDia();
                                this.$parent.fetchTableData();
                            } else {
                                this.$message.error(res.message)
                            }
                        }).finally(res => {
                            this.disabled = false
                        })
                    } else {
                        this.api.auth.addRequestMenu(this.form).then(res => {
                            if (res.code === 0) {
                                this.$message.success('新增成功');
                                this.closeDia();
                                this.$parent.fetchTableData();
                            } else {
                                this.$message.error(res.message)
                            }
                        }).finally(res => {
                            this.disabled = false
                        })
                    }
                } else {
                    return false
                }
            })
        },
    },
}
</script>
<style lang="scss" scoped>
/deep/.el-form-item__content {
    width: 190px;
}
</style>
