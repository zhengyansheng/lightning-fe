<template>
<div class="workorders">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>工单系统</el-breadcrumb-item>
        <el-breadcrumb-item>工单</el-breadcrumb-item>
        <el-breadcrumb-item>发起工单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
        <div class="left">
            <div v-for="group in workflowgroupList" :key="group.id">
                <div v-for="(workflowgroup, index)  in group" :key="index">
                    <div class="title">{{workflowgroup.cname}}</div>
                    <el-row :gutter="12">
                        <el-col :span="8" v-for="(item, i) in workflowgroup.workflow" :key="i">
                            <el-card shadow="never">
                                <div class="workorders-card">
                                    <i class="el-icon-setting"></i>
                                    <p>{{item.cname}}</p>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="right">
            <h3>热门工单</h3>
            <div class="items" v-for="(item, index) in hotWorkFlowList" :key="index" @click="handleCommand(item)">
                <p>{{index + 1}}. {{item.group_cname}}->{{item.cname}}</p><span>{{item.num}}次</span>
            </div>
        </div>
    </div>
    <CreateWorkflow :isShow.sync="isShowCreateWorkflow" />
</div>
</template>

<script>
import {
    Workflow,
    Workflowgroup,
    Workorder
} from '@services/workflow'
import CreateWorkflow from '@components/workflow/CreateWorkflow'
export default {
    name: '',
    components: {
        CreateWorkflow
    },
    data() {
        return {
            workflowgroupList: [],
            hotWorkFlowList: [],
            isShowCreateWorkflow: false
        }
    },
    created() {
        this.getTableInfo()
    },
    methods: {
        getTableInfo() {
            Workorder.get_table_info().then(response => {
                if (response.hasOwnProperty("workflowgroups") && response.workflowgroups.length > 0) {
                    this.dealGroup(response.workflowgroups)
                }
                if (response.hasOwnProperty("workflows") && response.workflows.length > 0) {
                    this.hotWorkFlowList = response.workflows
                }
            })
        },
        dealGroup(wfgList) {
            var groupList = []
            var workflowgroupList = []
            for (var i = 0; i < wfgList.length; i++) {
                if (i != 0 && i % 4 == 0) {
                    groupList.push(workflowgroupList)
                    workflowgroupList = []
                }
                workflowgroupList.push(wfgList[i])
                if (i + 1 == wfgList.length) {
                    groupList.push(workflowgroupList)
                    workflowgroupList = []
                }
            }
            this.workflowgroupList = groupList
        },
        handleCommand(row) {
            this.isShowCreateWorkflow = true;
        }
    }
}
</script>

<style lang="scss" scoped>
.workorders {
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 50px;
        &>div {
            background-color: #fff;
            box-sizing: border-box;
            padding: 25px;
        }
        .left {
            width: calc(100% - 320px);
            padding-top: 5px;
            .title {
                margin: 20px 0;
                position: relative;
                padding-left: 8px;
                font-size: 14px;
                &::before {
                    content: '';
                    display: inline-block;
                    width: 3px;
                    height: 100%;
                    background-color: rgb(84, 170, 240);
                    position: absolute;
                    left: 0;
                }
            }
            .workorders-card {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;

                .el-icon-setting {
                    font-size: 30px;
                    margin-right: 10px;
                }

                p {
                    font-size: 14px;
                }
            }
        }

        .right {
            width: 300px;

            .items {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-start;
                cursor: pointer;
            }
        }
    }
}
</style>
