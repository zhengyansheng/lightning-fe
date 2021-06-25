<template>
    <div class="container">
        <router-view />
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {

            }
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-table th {
    text-align: center;
    font-weight: bold;
    color: #606266;
    background-color:#EBEEF5;
}
/deep/ .el-table--border, .el-table--group {
    border: 1px solid #DCDFE6;
}
/deep/ .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #DCDFE6;
}
/deep/ .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #DCDFE6;
}
/deep/ .el-table .el-table__header-wrapper .el-table__header th.is-leaf {
    border-bottom: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
}
/deep/ .el-table--border th, .el-table__fixed-right-patch {
    border-bottom: 1px solid #DCDFE6 !important;
}
/deep/ .el-card__header {
    background: rgb(217, 236, 255);
}
</style>
