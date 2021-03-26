<template>
   <div class="classification-container">
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>资源管理</el-breadcrumb-item>
            <el-breadcrumb-item>分类管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="list-main">
            <div class="search">
                <el-input clearable placeholder="请输入分类名称" :size="size" v-model.trim="params.name" @keyup.enter.native="searchData" style="width: 192px"></el-input>
                <el-button type="primary" @click="searchData" :size="size">搜索</el-button>
                <el-button class="add-btn" type="primary"  :size="size" @click="editClassification()">新建分类</el-button>
            </div>
            <div class="clear"></div>
            <div class="list">
                <el-table :data="tableData" style="width: 100%" v-loading="loading" stripe>
                    <el-table-column prop="id" label="ID"></el-table-column>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="180">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.create_time)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="update_time" label="更新时间" width="180">
                        <template slot-scope="scope">
                            {{formatDate(scope.row.update_time)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="200" align="center">
                        <template slot-scope="scope">
                            <el-button :size="menuSize" @click="editClassification(scope.row)">编辑</el-button>
                            <el-button :size="menuSize" type="danger" @click="deleteClassification(scope.row)" style="margin-right: 10px">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.count_per_page" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
            </div>
        </div>
        <EditClassification :isShow.sync="isShow" :editData="editData" />
   </div>
</template>
<script>
    import EditClassification from '@components/cmdb/editClassification';
    export default {
       name: '',
       data() {
           return {
                params: {
                    page: 1,
                    limit: 10,
                    name: ''
                },
                total: 0,
                tableData: [],
                isDisabled: false,
                size: 'medium',
                menuSize: 'mini',
                loading: false,
                editData: {},
                isShow: false
           }
       },
       components: {
           EditClassification
       },
       created() {
           this.getTableList();
       },
       methods: {
            // 获取列表
            getTableList() {
                if (this.loading) return false;
                this.loading = true;
                this.api.cmdb.getClassificationList(this.params).then(res => {
                    if (Number(res.code) === 20000) {
                        this.total = res.data.total
                        this.tableData = res.data.list;
                    }
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                    console.log(err);
                })
            },
            // 页码切换
            currentPageChange() {
                this.getTableList();
            },
            // 搜索
            searchData() {
                this.params.page = 1;
                this.getTableList();
            },
            // 删除
            deleteClassification(row) {
                this.$confirm('是否删除此分类？', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    console.log(row.id);
                    this.api.cmdb.deleteClassification({ id: row.id }).then(data => {
                        if (data.code !== 20000) {
                            this.$message.error(data.message);
                            return false;
                        }
                        this.$message.success('删除分类成功');
                        this.getTableList();
                    })
                }).catch(() => {});
            },
            // 编辑/添加
            editClassification(row) {
                this.isShow = true;
                this.editData = row || {};
            }
       }
    }
</script>
<style lang="scss" scoped>

</style>