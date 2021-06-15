<template>
    <el-dialog
        title=""
        :visible="isShow"
        width="90%"
        @close="closeDia">
        <el-tabs v-model="activeName" style="position: relative;top: -28px;">
            <el-tab-pane label="基本信息" name="base">
                <BasicInfo :editData="cardInfo" :pid="pid" @close="closeDia" />
            </el-tab-pane>
            <el-tab-pane label="字段管理" name="manage">
                <!-- <WordsManage /> -->
                <TableData :editData="cardInfo" @close="closeDia" :pid="pid" />
            </el-tab-pane>
            <el-tab-pane label="关系绑定" name="relation">
                <Relation :editData="cardInfo.children" :pid="pid" @refresh="getEditCardInfo" />
            </el-tab-pane>
        </el-tabs>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
        </span> -->
    </el-dialog>
</template>
<script>
    import BasicInfo from './BasicInfo'
    import WordsManage from './WordsManage'
    import Relation from './Relation'
    import TableData from './TableData.vue'
    export default {
        name: '',
        components: {
            BasicInfo,
            WordsManage,
            Relation,
            TableData
        },
        props: {
            isShow: {
                type: Boolean,
                default: false
            },
            pid: {
                type: Number
            }
        },
        data() {
            return {
                activeName: 'base',
                cardInfo: {}
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.getEditCardInfo()
                }
            }
        },
        created() {
            console.log('editCard', this.pid);
        },
        methods: {
            closeDia() {
                this.$emit('update:isShow', false)
                this.$parent.fetchTableClassifyTree();
            },
            getEditCardInfo() {
                this.api.datacenter.getEditCardInfo(this.pid).then(res => {
                    this.cardInfo = res.data
                    this.$forceUpdate();
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
