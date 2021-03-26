<template>
    <el-dialog :title="textMap[dialogStatus]==='Create'?'添加数据': '编辑数据'" :visible="isShow">
        <el-form
            ref="dataForm"
            :rules="rules"
            :inline="true"
            :model="tableData"
            label-width="80px"
        >
            <el-form-item
                v-for="(tableFieldsItem, tableFieldsIndex) in tableValue.fields"
                :key="tableFieldsIndex"
                :label="tableFieldsItem.alias + ': '"
                :prop="tableFieldsItem.required===true?tableFieldsItem.name:''">
                <el-input v-model="tableData[tableFieldsItem.name]" :placeholder="'请输入' + tableFieldsItem.alias" size="small" style="width: 120%" />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button @click="dialogFormVisible = false">关闭</el-button>
            <el-button type="primary" @click="dialogStatus==='create'?createDataFunc():updateDataFunc()">提交</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
       name: '',
       props: {
           isShow: {
               type: Boolean
           }
       },
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

</style>
