<template>
    <el-dialog
        title="新增"
        :visible="isShow"
        width="600px"
        @close="closeDia">

        <el-form ref="form" label-width="100px" style="max-height: 400px;overflow: auto;">
            <el-form-item v-for="(item, index) in formData" :key="index" style="margin-bottom: 8px;">
                <span slot="label">{{item.label}}</span>
                <el-input v-if="item.type==='Int'" v-model.number="item.value" type="number" :required="item.not_null || false"></el-input>
                <el-select v-else-if="item.type==='Choices'" v-model="item.value" placeholder="请选择" style="width: 100%;" :required="item.not_null || false">
                    <el-option
                        v-for="val in item.select_list"
                        :key="val"
                        :label="val"
                        :value="val">
                    </el-option>
                </el-select>
                <el-input v-else v-model="item.value" :maxlength="Number(item.lens) || ''" :required="item.not_null || false"></el-input>
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
        props: ['isShow', 'fields', 'table_classify_id'],
        data() {
            return {
                formData: []
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    console.log('this.fields', this.fields);
                    let formData = this.fields.map(item => {
                        item['value'] = ''
                        return item
                    })
                    this.formData = JSON.parse(JSON.stringify(formData));
                }
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.formData = []
                this.$emit('update:isShow', false)
            },
            confirmSubmit() {
                console.log('this.formData', this.formData);
                let obj = {}
                this.formData.forEach(item => {
                    obj[item.props] = item.value
                })
                let params = {
                    table_classify: this.table_classify_id,
                    data: obj
                }
                this.api.assetscenter.addTableData(params).then(res => {
                    console.log('res', res);
                    if (res.code === 0) {
                        this.$message.success('添加成功')
                        this.$parent.searchData();
                        this.closeDia()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
