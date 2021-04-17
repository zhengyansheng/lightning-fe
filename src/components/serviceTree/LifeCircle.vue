<template>
    <el-dialog :title="title" :visible="isShow" width="800px" @close="closeDia">
        <!-- <el-steps :active="1">
            <el-step v-for="(value, key) in 20" :key="key"
                :title="value"
                icon="el-icon-edit"></el-step>
        </el-steps> -->
        <div class="max-container" v-if="lifeCycleData.length">
            <div class="data-container">
                <div class="data-item" v-for="(item, index) in lifeCycleData" :key="index">
                    <div class="data-infos" v-for="(value, key) in item" :key="key">
                        <div class="infos">
                            <p>{{key}}</p>
                            <span>{{getStatus(value)}}</span>
                        </div>
                        <div class="line"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            暂无数据
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="closeDia">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: '',
        props: {
            isShow: {
                type: Boolean
            },
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    // this.getLifeCycleData('i-2ze2gbg1ppwpqepcn5x8')
                    this.getLifeCycleData(this.data.instance_id)
                }
            }
        },
        data() {
            return {
                title: '主机 生命周期线',
                lifeCycleData: []
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$emit('update:isShow', false)
            },
            getLifeCycleData(id) {
                this.api.machinePaid.fetchLifeCycleData(id).then(res => {
                    console.log(res);
                    if (res.code === 0) {
                        this.lifeCycleData = res.data
                    } else {
                        this.$message.error(res.message)
                    }
                })
            },
            getStatus(value) {
                let arr = value.split('/')
                console.log(value, arr);
                return arr[arr.length-1]
            }
        }
    }
</script>
<style lang="scss" scoped>
.max-container {
    width: calc( 100% + 50px );
}
.data-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .data-item {
        flex: 0 1 auto;
        margin-bottom: 15px;
        // &:first-child {
        //     .line {
        //         display: none;
        //     }
        // }
        .data-infos {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            flex-wrap: wrap;
        }
        .line {
            width: 50px;
            height: 2px;
            background-color: #ddd;
        }
        .infos {
            width: 94px;
            text-align: center;
            font-size: 15px;
            border: 1px solid #afafaf;
            padding: 8px;
            border-radius: 8px;
            span {
                margin-top: 10px;
                display: block;
            }
        }
        &:nth-child(5n) {
            .line {
                display: none;
            }
        }
        &:last-child {
            .line {
                display: none;
            }
        }
    }
}
/deep/ .el-dialog__body {
    padding: 30px 20px !important;
}
</style>
