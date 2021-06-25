<template>
    <el-dialog
        title=""
        :visible="isShow"
        :width="activeName==='base'?'400px':'80%'"
        @close="closeDia">
        <el-tabs v-model="activeName" style="position: relative;top: -28px;">
            <el-tab-pane label="基本信息" name="base">
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
            </el-tab-pane>
            <el-tab-pane label="关联中心" name="relation">
                <RelationCenter :parent_asset_id="rowData.id" v-if="activeName==='relation'" />
            </el-tab-pane>
        </el-tabs>
        
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
        </span>
    </el-dialog>
</template>
<script>
    import RelationCenter from './RelationCenter.vue'
    export default {
        name: '',
        components: {
            RelationCenter
        },
        props: ['isShow', 'fields', 'table_classify_id', 'rowData'],
        data() {
            return {
                formData: [],
                activeName: 'base'
            }
        },
        watch: {
            isShow(newVal) {
                this.activeName = 'base'
                console.log('isShow', newVal);
                if (newVal) {
                    let formData = this.fields.map(item => {
                        item['value'] = this.rowData[item.props] || ''
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
                this.$emit('update:isShow', false)
                this.formData = []
            },
            confirmSubmit() {
                let obj = {}
                this.formData.forEach(item => {
                    obj[item.props] = item.value
                })
                let params = {
                    table_classify: this.table_classify_id,
                    data: obj
                }
                this.api.assetscenter.editTableData(params, this.rowData.id).then(res => {
                    if (res.code === 0) {
                        this.$message.success('编辑成功')
                        this.$parent.searchData();
                        this.closeDia()
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__headerbtn {
    z-index: 10 !important;
}
</style>
