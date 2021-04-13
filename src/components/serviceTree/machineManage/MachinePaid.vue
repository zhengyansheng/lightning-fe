<template>
    <div class="machine-paid">
        <div>
            <el-select v-model="parentNode" placeholder="请选择" @change="changeParentNodes" size="small">
                <el-option
                    v-for="item in parentNodeLists"
                    :key="item.appkey"
                    :label="item.name"
                    :value="item.appkey">
                </el-option>
            </el-select>
            <el-button style="float:right;" type="primary" plain size="small" @click="addMachinePaid">添加</el-button>
        </div>
        <el-table :data="tableData" v-loading="loading" stripe tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="account" label="账号" min-width="60"></el-table-column>
            <el-table-column prop="pay_type" label="付费方式" min-width="80" :formatter="formatPayType"></el-table-column>
            <el-table-column prop="region_id" label="地域" min-width="100"></el-table-column>
            <el-table-column prop="zone_id" label="可用区" min-width="100"></el-table-column>
            <el-table-column prop="instance_type" label="配置" min-width="100"></el-table-column>
            <el-table-column label="操作" fixed="right" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="paidData(scope.row)">交付</el-button>
                    <el-button type="text" size="small" @click="copyData(scope.row)">复制</el-button>
                    <el-button type="text" size="small" @click="editMachineData(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteData(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <AddMachinePaid :isShow.sync="showAddDia" :nodes="parentNode" />
        <PaidDia :isShow.sync="showPaidDia" :editData="editData" />
    </div>
</template>
<script>
    import AddMachinePaid from './AddMachinePaid'
    import PaidDia from './PaidDia'
    export default {
        name: '',
        components: {
            AddMachinePaid,
            PaidDia
        },
        props: {
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                currentNode: {},
                parentNodeLists: [],
                parentNode: '',
                tableData: [],
                loading: false,
                showAddDia: false,
                showPaidDia: false,
                editData: {}
            }
        },
        watch: {
            nodes(newVal) {
                if (newVal) {
                    this.currentNode = Object.assign({}, newVal)
                    this.getParentNodes(newVal.pk);
                }
            }
        },
        created() {
            this.currentNode = Object.assign({}, this.nodes)
            if (Object.keys(this.currentNode).length) {
                this.getParentNodes(this.currentNode.pk);
            }
        },
        methods: {
            getParentNodes(id) {
                this.api.serviceTree.fetchParentNodes(id).then(res => {
                    this.parentNodeLists = res.data
                    if (this.parentNodeLists[0].pk) {
                        this.parentNode = this.parentNodeLists[0].appkey
                        this.getTableData(this.parentNodeLists[0].appkey)
                    }
                })
            },
            getTableData(id) {
                this.loading = true;
                this.api.machinePaid.fetchMultiCloudTemplate(id).then(res => {
                    this.tableData = res.data
                    this.loading = false;
                }).catch(err => {
                    this.loading = false;
                })
            },
            changeParentNodes(val) {
                this.getTableData(val)
            },
            addMachinePaid() {
                this.showAddDia = true
            },
            deleteData(row) {
                let id = row.ID;
                if (!id) return false
                this.$confirm('是否确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.api.machinePaid.deleteMultiCloudTemplate(id).then(res => {
                        if (res.code !== 0) {
                            this.$message.error(res.message);
                            return false;
                        }
                        this.$message.success('删除成功');
                        this.getTableData(this.parentNode)
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');          
                });
            },
            formatPayType(row) {
                return row.pay_type === 'PrePaid' ? '包年包月' : row.pay_type === 'PostPaid' ? '按量' : ''
            },
            paidData(row) {
                this.showPaidDia = true
                this.editData = Object.assign({}, row)
            },
            copyData(row) {
                let data = Object.assign({}, row)
                data['hostname'] = ''
                let oInput = document.createElement('input');
                oInput.value = JSON.stringify(data);
                document.body.appendChild(oInput);
                oInput.select(); // 选择对象;
                document.execCommand("Copy"); 
                oInput.style.display = 'none'
                this.$message.success('复制成功')
            },
            editMachineData(row) {

            }
        }
    }
</script>
<style lang="scss" scoped>

</style>
