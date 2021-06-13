<template>
    <div class="container">
        <div class="one-line">
            <div class="group">
                <el-input placeholder="请输入内容" v-model="currentData.name">
                    <template slot="prepend">名称</template>
                </el-input>
            </div>
            <div class="group">
                <el-input placeholder="请输入内容" v-model="currentData.alias">
                    <template slot="prepend">别名</template>
                </el-input>
            </div>
            <div class="group">
                <el-input placeholder="请输入内容" v-model="currentData.order">
                    <template slot="prepend">排序编号</template>
                </el-input>
            </div>
            <div class="group switch-group">
                <div class="el-input-group__prepend left-label">唯一标识</div>
                <div class="el-input-group__append right-label"><el-switch v-model="currentData.guid"></el-switch></div>
            </div>
            <div class="group type-group">
                <div class="el-input-group__prepend left-label">类型</div>
                <el-select v-model="currentData.type" slot="append" placeholder="请选择">
                    <el-option label="IP" value="IP"></el-option>
                    <el-option label="Str" value="Str"></el-option>
                    <el-option label="Int" value="Int"></el-option>
                </el-select>
            </div>
            <div class="group select-group" v-for="(selects, indexs) of selectList" :key="indexs">
                <el-select v-model="selects.value" slot="append" placeholder="请选择">
                    <el-option :key="index" :label="s.label" :value="s.value" v-for="(s, index) of showRulesList(selects.value)"
                    :disabled="disabled(s, item)"></el-option>
                </el-select>
                <el-input placeholder="请输入内容" v-model="selects.value" />
                <span class="el-icon-circle-close closed" v-if="isEdit" @click="listDelete(indexs)"></span>
            </div>
            <div class="group btn-group" v-if="isEdit">
                <el-button type="primary" icon="el-icon-plus" circle @click="listAdd"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="listDelete"></el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            dataList: {
                type: Object
            },
            isEdit: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                selectList: [],
                rulesList: [
                    {
                        label: 'default',
                        value: 'default'
                    }, {
                        label: 'unique',
                        value: 'unique'
                    }, {
                        label: 'not_null',
                        value: 'not_null'
                    }, {
                        label: 'prefix',
                        value: 'prefix'
                    }, {
                        label: 'suffix',
                        value: 'suffix'
                    }, {
                        label: 'lens',
                        value: 'lens'
                    }, {
                        label: 'max',
                        value: 'max'
                    }, {
                        label: 'min',
                        value: 'min'
                    }
                ],
                currentData: {}
            }
        },
        computed: {
            disabled() {
                return (s, item) => {
                    return (s.value === 'lens' && item.type !=='Str') || (s.value === 'max' && item.type !=='Int') || (s.value === 'min' && item.type !=='Int')
                }
            },
            showRulesList() {
                return (val) => {
                    let newList = JSON.parse(JSON.stringify(this.rulesList));
                    const arr = this.selectList.map(item => {
                        return (item = item.value);
                    });
                    newList = newList.filter(item => {
                        if (val == item.value) {
                            return item;
                        } else {
                            if (arr.indexOf(item.value) == -1) {
                                return item;
                            }
                        }
                    });
                    return newList;
                };
            }
        },
        created() {
            this.currentData = this.dataList
        },
        methods: {
            closeDia() {
                this.$emit('close')
            },
            listAdd() {
                if (this.selectList.length < this.rulesList.length) {
                    this.selectList.push({
                        value: ''
                    });
                } else {
                    console.log("不能再加啦");
                }
            },
            listDelete(index) {
                this.selectList.splice(index, 1);
            },
            confirmSubmit() {
                let params = {
                    "table_classify": this.editData.id,
                    "fields": {
                        "slot": {
                            "guid": true,
                            "name": "槽位",
                            "order": 0
                        },
                    },
                    "rules": {
                        "slot": {
                            "type": "Str",
                            "unique": true
                        },
                    }
                }
                this.api.datacenter.editTableField(params).then(res => {
                    if (res.code === 0) {
                        this.$message.success('修改成功');
                        this.closeDia();
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.one-line {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 10px;
}
.group {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-right: 20px;
    margin-bottom: 10px;
    // &:first-child {
    //     margin-left: 0;
    // }
}
/deep/ .select-group {
    position: relative;
    .el-select {
        background-color: #F5F7FA;
        .el-input .el-input__inner {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
            border-right: 0;
            color: #909399;
        }
    }
    &>.el-input .el-input__inner {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
    .closed {
        position: absolute;
        top: -4px;
        right: -4px;
        cursor: pointer;
        color: #F56C6C;
    }
}
.switch-group {
    .left-label {
        height: 38px;
        line-height: 38px;
        width: auto;
    }
    .right-label {
        height: 38px;
        line-height: 38px;
        width: 100%;
        text-align: center;
        border-left: 1px solid #DCDFE6;
    }
    /deep/ .el-input--suffix .el-input__inner {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
}
.type-group {
    .left-label {
        height: 38px;
        line-height: 38px;
        width: auto;
    }
    /deep/ .el-input--suffix .el-input__inner {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
}
.btn-group {
    width: auto;
    margin-right: 0;
}
.add-whole-line {
    display: flex;
    justify-content: center;
}
</style>
