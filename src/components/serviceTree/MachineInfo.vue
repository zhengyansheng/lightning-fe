<template>
    <div class="machine-info-container">
        <!-- 暂时注释 留存 -->
        <!-- <div>
            <el-tag :size="tagSize">所有环境</el-tag>
            <el-tag :size="tagSize" color="#fff">prod</el-tag>
            <el-tag :size="tagSize" color="#fff">pre</el-tag>
            <el-tag :size="tagSize" color="#fff">dev</el-tag>
            <el-tag :size="tagSize" color="#fff">beta</el-tag>
            <el-tag :size="tagSize" color="#fff">test</el-tag>
        </div>
        <div style="margin-top: 10px;">
            <el-tag :size="tagSize">所有类型</el-tag>
            <el-tag :size="tagSize" color="#fff">Idc</el-tag>
            <el-tag :size="tagSize" color="#fff">Cloud</el-tag>
            <el-tag :size="tagSize" color="#fff">Container</el-tag>
        </div> -->
        <div class="btn-groups">
            <div>
                <el-input placeholder="输入关键字进行过滤" v-model="keyword" class="input-with-select" size="small" @keyup.enter.native="getTableList" style="width:300px;">
                    <el-select v-model="selectKeywords" slot="prepend" placeholder="请选择" style="width:100px">
                        <el-option label="全局" value="default"></el-option>
                        <el-option label="主机名" value="hostname"></el-option>
                        <el-option label="内网IP" value="private_ip"></el-option>
                    </el-select>
                </el-input>
            </div>
            <div class="right-btns" v-if="nodes.level === 4">
                <el-button :size="btnSize" type="primary" @click="relatedCmdb">关联</el-button>
                <el-button :size="btnSize" type="warning" @click="deleteData">解绑</el-button>
                <el-button :size="btnSize" type="primary">导出</el-button>
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" v-loading="loading" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" fixed="left" align="center"></el-table-column>
            <el-table-column prop="hostname" label="主机名" min-width="200">
                <template slot-scope="scope">
                    <el-link @click="showDrawerDetails(scope.row)">{{scope.row.hostname}}</el-link>
                </template>
            </el-table-column>
            <el-table-column prop="private_ip" label="内网IP" width="130"></el-table-column>
            <el-table-column prop="public_ip" label="外网IP" width="130"></el-table-column>
            <el-table-column label="状态" width="50">
                <template slot-scope="scope">
<!--                    <span v-if="scope.row.state === 'running'" class="start-icon"><img :src="startPic" />运行中</span>-->
<!--                    <span v-else class="stop-icon"><img :src="stopPic" />已停止</span>-->
                    <span v-if="scope.row.state === 'running'" class="start-icon"><img :src="startPic" /></span>
                    <span v-else class="stop-icon"><img :src="stopPic" /></span>
                </template>
            </el-table-column>
            <el-table-column prop="cpu_total" label="CPU" width="80"></el-table-column>
            <el-table-column prop="mem_total" label="内存/G" width="80"></el-table-column>
<!--            <el-table-column prop="type" label="类型"></el-table-column>-->
            <el-table-column label="类型" width="50">
                <template slot-scope="scope">
                    <span v-if="scope.row.type === 'idc'" class="idc-icon"><img :src="idcPic" /></span>
                    <span v-else-if="scope.row.type === 'cloud'" class="cloud-icon"><img :src="cloudPic" /></span>
                    <span v-else class="docker-icon"><img :src="dockerPic" /></span>
                </template>
            </el-table-column>
<!--            <el-table-column prop="platform" label="平台"></el-table-column>-->
            <el-table-column label="平台" width="50">
                <template slot-scope="scope">
                    <span v-if="scope.row.platform === 'aws'" class="aws-icon"><img :src="awsPic" /></span>
                    <span v-else-if="scope.row.platform === 'ali'" class="ali-icon"><img :src="aliPic" /></span>
                    <span v-else-if="scope.row.platform === 'ten'" class="ten-icon"><img :src="tenPic" /></span>
                    <span v-else-if="scope.row.platform === 'azure'" class="azure-icon"><img :src="azurePic" /></span>
                    <span v-else class="empty-icon"><img :src="emptyPic" /></span>
                </template>
            </el-table-column>
<!--            <el-table-column prop="remark" label="备注"></el-table-column>-->
            <!--<el-table-column prop="create_time" label="创建时间" width="170"></el-table-column>-->
<!--            <el-table-column prop="update_time" label="变更时间" width="170"></el-table-column>-->
            <el-table-column label="操作" v-if="nodes.level === 4" fixed="right" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="text" :disabled="false" :size="btnSize" @click="checkLifeCircle(scope.row)">生命周期</el-button>
                    <el-button type="text" :disabled="true" :size="btnSize" @click="deleteData(scope.row)">登陆</el-button>
                    <el-button type="text" :disabled="true" :size="btnSize" @click="deleteData(scope.row)">审计</el-button>
                    <el-popover
                        placement="bottom"
                        width="100"
                        trigger="click">
                        <el-button type="text" :size="btnSize" slot="reference">更多</el-button>
                        <el-button type="text" style="display:block;margin:0;width:100%;text-align:left;padding-left:10px;box-sizing:border-box;" @click="confirmOperateForMachine('开机', scope.row)">开机</el-button>
                        <el-button type="text" style="display:block;margin:0;width:100%;text-align:left;padding-left:10px;box-sizing:border-box;" @click="confirmOperateForMachine('关机', scope.row)">关机</el-button>
                        <el-button type="text" style="display:block;margin:0;width:100%;text-align:left;padding-left:10px;box-sizing:border-box;" @click="confirmOperateForMachine('重启', scope.row)">重启</el-button>
                        <el-button type="text" style="display:block;margin:0;width:100%;text-align:left;padding-left:10px;box-sizing:border-box;" @click="confirmOperateForMachine('下线', scope.row)">下线</el-button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background :total="total" @current-change="currentPageChange" :current-page.sync='params.page' :page-size="params.page_size" layout="total, prev, pager, next" style="text-align: right;padding-top: 40px;"></el-pagination>
    
        <RelatedCmdbData :isShow.sync="showRelatedDia" @handleSelection="handleSelection" />
        
        <el-drawer
            :visible.sync="showMachineDetails"
            size="50%"
            direction="rtl">
            <el-tabs v-model="activeName">
                <el-tab-pane label="详情" name="first">
                    <MachineDetails :infos="machineInfos" />
                </el-tab-pane>
                <el-tab-pane label="安全组" name="second"></el-tab-pane>
                <el-tab-pane label="网络" name="third"></el-tab-pane>
                <el-tab-pane label="磁盘" name="fourth"></el-tab-pane>
                <el-tab-pane label="监控" name="fifth"></el-tab-pane>
                <el-tab-pane label="报警" name="sixth"></el-tab-pane>
                <el-tab-pane label="操作日志" name="seventh"></el-tab-pane>
            </el-tabs>
        </el-drawer>

        <LifeCircle :isShow.sync="showLifeCircle" :data="lifeCircleData" />
    </div>
</template>
<script>
    import RelatedCmdbData from './RelatedCmdbData'
    import MachineDetails from './MachineDetails'
    import startPic from '@assets/images/start.svg'
    import stopPic from '@assets/images/stop.svg'
    import idcPic from '@assets/images/idc.svg'
    import dockerPic from '@assets/images/docker.svg'
    import vmPic from '@assets/images/vm.svg'
    import cloudPic from '@assets/images/cloud.svg'
    import awsPic from '@assets/images/aws.svg'
    import aliPic from '@assets/images/ali.svg'
    import tenPic from '@assets/images/ten.svg'
    import azurePic from '@assets/images/azure.svg'
    import emptyPic from '@assets/images/empty.svg'
    import LifeCircle from './LifeCircle'
    export default {
        name: '',
        props: {
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            RelatedCmdbData,
            MachineDetails,
            LifeCircle
        },
        data() {
            return {
                loading: false,
                tagSize: 'small',
                tableData: [],
                params: {
                    page: 1,
                    page_size: 10
                },
                btnSize: 'small',
                showRelatedDia: false,
                total: 0,
                selectKeywords: 'default',
                keyword: '',
                moreStatus: '',
                multipleSelection: [],
                startPic,
                stopPic,
                idcPic,
                dockerPic,
                vmPic,
                cloudPic,
                awsPic,
                aliPic,
                tenPic,
                azurePic,
                emptyPic,
                showMachineDetails: false,
                activeName: 'first',
                machineInfos: {},
                lifeCircleData: {},
                showLifeCircle: false
            }
        },
        watch: {
            nodes(newVal) {
                if (newVal) {
                    this.getTableList()
                }
            }
        },
        created() {
            this.getTableList()
        },
        methods: {
            getTableList() {
                let id = this.nodes.pk
                let params = {
                    ...this.params
                }
                if (this.keyword !== '') {
                    params[this.selectKeywords] = this.keyword
                }
                this.loading = true;
                this.api.serviceTree.fetchMachineInfo(id, params).then(res => {
                    this.tableData = res.data.results;
                    this.loading = false;
                    this.total = res.data.count;
                }).catch(err => {
                    console.log(err);
                    this.loading = false;
                })
            },
            deleteData() {
                if (!this.multipleSelection.length) {
                    this.$message.error('请选择解绑数据');
                    return false
                }
                const data = [];
                this.multipleSelection.forEach(v => {
                    data.push(v.id)
                })
                this.$confirm('是否确认解除绑定？', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        server_ids: data
                    }
                    this.api.serviceTree.deleteMachineInfo(this.nodes.pk, params).then(data => {
                        if (data.code === 0) {
                            this.$message.success('解除绑定成功');
                            this.getTableList();
                        } else {
                            this.$message.error(data.message);
                        }
                    })
                }).catch(() => {});
            },
            relatedCmdb() {
                this.showRelatedDia = true;
            },
            handleSelection(val) {
                const params = {
                    node: this.nodes.pk,
                    cmdbs: val
                }
                this.api.serviceTree.postMachineInfo(params).then(res => {
                    if (data.code === 0) {
                        this.$message.success('关联成功');
                        this.getTableList()
                    } else {
                        this.$message.error(data.message);
                    }
                })
            },
            currentPageChange() {
                this.getTableList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            showDrawerDetails(row) {
                this.showMachineDetails = true
                this.machineInfos = Object.assign({}, row)
            },
            checkLifeCircle(row) {
                this.showLifeCircle = true;
                this.lifeCircleData = Object.assign({}, row);
            },
            confirmOperateForMachine(type, row) {
                const obj = {
                    '开机': 'start_instance',
                    '关机': 'stop_instance',
                    '重启': 'reboot_instance',
                    '下线': 'destroy_instance'
                }
                this.$confirm(`是否确认 ${type} ？`, '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        private_ip: row.private_ip
                    }
                    this.api.machinePaid.operateMachineStatus(obj[type], params).then(data => {
                        console.log(data);
                        if (data.code === 0) {
                            this.$message.success(`${type}成功`);
                            this.getTableList();
                        } else {
                            this.$message.error(data.message);
                        }
                    })
                }).catch(() => {});
            }
        }
    }
</script>
<style lang="scss" scoped>
.machine-info-container {
    .el-button--small {
        margin: 10px 0;
        margin-right: 10px;
    }
    .el-table--enable-row-transition .el-table__body td {
        padding: 5px 0 !important;
    }
    .btn-groups {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .right-btns {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
        }
    }
    .stop-icon, .start-icon, .idc-icon, .docker-icon, .vm-icon, .cloud-icon, .aws-icon, .ali-icon, .ten-icon, .azure-icon, .empty-icon {
        color: #EC3542;
        img {
            width: 18px;
            margin-right: 5px;
        }
    }
    .start-icon {
        color: #86da76;
    }
}
.el-link {
    display: block;
    margin: 5px;
}
.el-link.is-underline:hover:after {
    border-bottom: none;
}
.el-radio {
    display: block;
    margin: 10px 0;
}
/deep/ .el-tabs__header {
    margin: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background: #f5f7fa;
}
/deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 20px;
}
</style>
