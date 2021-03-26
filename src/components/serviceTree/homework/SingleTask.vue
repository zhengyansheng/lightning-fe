<template>
    <div class="single-task">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="执行方式">
                        <el-radio-group v-model="form.name">
                            <el-radio label="Ansible"></el-radio>
                            <el-radio label="SSH"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="命令来源">
                        <el-radio-group v-model="form.name">
                            <el-radio label="本地输入"></el-radio>
                            <el-radio label="脚本库"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="命令类型">
                        <el-radio-group v-model="form.name">
                            <el-radio label="bash"></el-radio>
                            <el-radio label="python"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="命令内容">
                        <el-input type="textarea" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="使用参数">
                        <el-switch v-model="form.name"></el-switch>
                    </el-form-item>
                    <el-form-item label="脚本参数">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="命令描述">
                        <el-input type="textarea" v-model="form.name"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-input v-model="params.search" placeholder="请输入搜索" style="width: 1500px;"></el-input>
                <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55" fixed="left" align="center"></el-table-column>
                    <el-table-column prop="hostname" label="主机名"></el-table-column>
                </el-table>
                <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
            </el-col>
            <el-col :span="24">
                <div style="text-align:center;">
                    <el-button size="small">取 消</el-button>
                    <el-button size="small" type="primary" style="margin-left:20px;">确 定</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                tableData: [],
                multipleSelection: [],
                form: {
                    name: ''
                },
                total: 1,
                params: {
                    page: 1,
                    page_size: 10,
                    search: ''
                }
            }
        },
        created() {
        },
        methods: {
            getTableData() {

            },
            handleSelectionChange() {
                this.multipleSelection = val;
            },
            currentPageChange() {
                this.getTableData()
            }
        }
    }
</script>
<style lang="scss" scoped>
.single-task {
    width: 100%;
}
</style>
