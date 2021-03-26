<template>
<el-dialog title="表详情" :visible="isShow" width="600px" @close="closeDia">
    <el-row :gutter="20">
        <el-col :span="12">
            <div class="group">
                <label for="">ID</label>
                <span>{{tableData.id}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">名称</label>
                <span>{{tableData.name}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">别名</label>
                <span>{{tableData.alias}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">类型</label>
                <span>{{tableData.classification_name}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">创建时间</label>
                <span>{{formatDate(tableData.create_time)}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">更新时间</label>
                <span>{{formatDate(tableData.update_time)}}</span>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="group">
                <label for="">备注</label>
                <span>{{tableData.remarks || '无'}}</span>
            </div>
        </el-col>
    </el-row>
    <el-table :data="tableData.fields">
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="alias" label="别名"></el-table-column>
        <el-table-column property="type" label="类型"></el-table-column>
        <el-table-column property="required" label="必填" :formatter="formatRequired"></el-table-column>
        <el-table-column property="remarks" label="备注"></el-table-column>
    </el-table>
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
            default () {
                return {}
            }
        }
    },
    data() {
        return {
            size: 'medium',
            tableData: {}
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                this.tableData = JSON.parse(JSON.stringify(this.editData));
            }
        }
    },
    created() {},
    methods: {
        // 格式化是否必填
        formatRequired(row) {
            return row.required ? '是' : '否';
        },
        closeDia() {
            this.$emit('update:isShow', false);
            this.tableData = {};
        }
    }
}
</script>

<style lang="scss" scoped>
.group {
    margin-bottom: 20px;
    label {
        font-weight: 600;
        font-size: 14px;
        color: rgb(76, 82, 82);
        width: 100px;
        text-align: right;
        padding-right: 15px;
        display: inline-block;
    }
    span {
        font-size: 14px;
    }
}
</style>
