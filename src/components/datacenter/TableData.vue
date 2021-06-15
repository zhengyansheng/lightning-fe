<template>
    <div class="table-data">
        <div class="one-line" v-for="(item, wholelineIndex) in displayLists" :key="wholelineIndex">
            <div class="group">
                <el-input placeholder="请输入内容" v-model="item.name" @change="handleChange">
                    <template slot="prepend">名称</template>
                </el-input>
            </div>
            <div class="group">
                <el-input placeholder="请输入内容" v-model="item.alias">
                    <template slot="prepend">别名</template>
                </el-input>
            </div>
            <div class="group">
                <el-input placeholder="请输入内容" v-model="item.order">
                    <template slot="prepend">排序编号</template>
                </el-input>
            </div>
            <div class="group switch-group">
                <div class="el-input-group__prepend left-label">唯一标识</div>
                <div class="el-input-group__append right-label"><el-switch v-model="item.guid"></el-switch></div>
            </div>
            <div class="group type-group">
                <div class="el-input-group__prepend left-label">类型</div>
                <el-select v-model="item.type" slot="append" placeholder="请选择">
                    <el-option label="IP" value="IP"></el-option>
                    <el-option label="Str" value="Str"></el-option>
                    <el-option label="Int" value="Int"></el-option>
                    <el-option label="Choices" value="Choices"></el-option>
                </el-select>
            </div>
            <div class="group" v-if="item.type==='Choices'">
                <el-input placeholder="请输入内容" v-model="item.order">
                    <template slot="prepend">可选值</template>
                </el-input>
            </div>
            <div class="group select-group" v-for="(selects, indexs) of item.rules" :key="indexs">
                <el-select v-model="selects.name" slot="append" placeholder="请选择">
                    <el-option :key="index" :label="s.label" :value="s.value" v-for="(s, index) of showRulesList(selects.name, item.rules)"
                    :disabled="disabled(s, item)"></el-option>
                </el-select>
                <el-input v-if="selects.name!=='unique' && selects.name!=='not_null'" placeholder="请输入内容" v-model="selects.value" />
                <el-input v-else placeholder="请输入内容" v-model="selectsValue" readonly />
                <!-- <div v-else class="switch-container"><el-switch disabled v-model="selectsValue"></el-switch></div> -->
                <span class="el-icon-circle-close closed" v-if="isEdit" @click="listDelete(indexs, item.rules)"></span>
            </div>
            <div class="group btn-group" v-if="isEdit">
                <el-button type="primary" icon="el-icon-plus" circle @click="listAdd(item.rules)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="listDeleteWholeLine(wholelineIndex)"></el-button>
            </div>
        </div>
        <div class="add-whole-line" v-if="isEdit"><el-button type="success" icon="el-icon-plus" circle @click="listAddWholeLine"></el-button></div>

        <el-divider v-if="isEdit"></el-divider>
        <div v-if="isEdit" style="float: right;">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="confirmSubmit">提 交</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        props: {
            editData: {
                type: Object
            },
            isEdit: {
                type: Boolean,
                default: true
            },
            pid: {
                type: Number
            }
        },
        data() {
            return {
                formDatas: [
                    {
                        name: '',
                        alias: '',
                        order: 0,
                        guid: false,
                        type: ''
                    }
                ],
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
                name: '',
                alias: '',
                select: '',
                order: '',
                guid: '',
                isSwitch: true,
                type: 'IP',
                displayLists: {
                    name: '',
                    alias: '',
                    order: 0,
                    guid: false,
                    type: 'IP',
                    rules: []
                },
                selectsValue: true,
                isEdit: false
            }
        },
        computed: {
            disabled() {
                return (s, item) => {
                    console.log('sssss', s);
                    return (s.value === 'lens' && item.type !=='Str') ||
                            ((s.value === 'max' || s.value === 'min') && item.type !=='Int') ||
                            (item.type =='Choices' && (s.value !== 'default' || s.value === 'unique'))
                }
            },
            showRulesList() {
                return (val, selectList) => {
                    let newList = JSON.parse(JSON.stringify(this.rulesList));
                    const arr = selectList.map(item => item = item.name);
                    newList = newList.filter(item => {
                        if (val == item.value) {
                            return item;
                        } else {
                            if (arr.indexOf(item.value) == -1) return item;
                        }
                    });
                    return newList;
                };
            },
        },
        watch: {
            editData() {
                this.displayLists = JSON.parse(JSON.stringify(this.initList()));
            }
        },
        created() {
            this.displayLists = JSON.parse(JSON.stringify(this.initList()))
        },
        methods: {
            handleChange() {
                this.$forceUpdate()
            },
            initList() {
                let emptylist = [{name: '', alias: '', order: 0, guid: false, type: 'IP', rules: []}]
                let list = [];
                let fields = this.editData.fields;
                let rules = this.editData.rules;
                if (!fields || !Object.keys(fields).length) {
                    this.isEdit = false;
                    return emptylist;
                }
                this.isEdit = true;
                for (let key in fields) {
                    let oneData = {
                        name: key
                    }
                    for(let i in fields[key]) {
                        if (i === 'name') {
                            oneData['alias'] = fields[key][i]
                        } else {
                            oneData[i] = fields[key][i]
                        }
                    }
                    if (Object.keys(rules).length && rules[key] && Object.keys(rules[key]).length) {
                        oneData['rules'] = []
                        for(let r in rules[key]) {
                            oneData[r] = rules[key][r]
                            if (r !== 'type') {
                                oneData['rules'].push({
                                    name: r,
                                    value: rules[key][r]
                                })
                            }
                        }
                    }
                    list.push(oneData)
                }
                return list;
            },
            closeDia() {
                this.$emit('close')
            },
            listAddWholeLine() {
                this.displayLists.push({name: '', alias: '', order: 0, guid: false, type: 'IP', rules: []})
                this.$forceUpdate()
            },
            listDeleteWholeLine(index) {
                this.displayLists.splice(index, 1)
                this.$forceUpdate()
            },
            listAdd(selectList) {
                if (selectList.length < this.rulesList.length) {
                    selectList.push({
                        name: ''
                    });
                } else {
                    console.log("不能再加啦");
                }
            },
            listDelete(index, selectList) {
                selectList.splice(index, 1);
            },
            confirmSubmit() {
                if (!this.displayLists.length) return false;
                let fields = {}
                let rules = {}
                // 判断guid 是否是唯一的true
                let guidIndex = 0
                this.displayLists.forEach(item => {
                    let key = item.name
                    let fieldsObj = {}
                    fieldsObj[key] = {
                        guid: item.guid,
                        name: item.alias,
                        order: Number(item.order),
                    }
                    let rulesObj = {}
                    rulesObj[key] = { type: item.type }
                    item.rules.forEach(rule => {
                        let obj = {}
                        if (rule.name === 'unique' || rule.name === 'not_null') obj[rule.name] = true
                        else obj[rule.name] = rule.value
                        rulesObj[key] = Object.assign(obj, rulesObj[key])
                    })
                    fields = Object.assign(fields, fieldsObj)
                    rules = Object.assign(rules, rulesObj)
                    if (item.guid) guidIndex++
                })
                if (guidIndex !== 1) return this.$message.error('唯一标识有且只能有一个为true');
                let params = {
                    table_classify: this.editData.id,
                    fields,
                    rules
                }
                if (this.isEdit) {
                    this.api.datacenter.editNewTableField(params, this.editData.field_id).then(res => {
                        if (res.code === 0) {
                            this.$message.success('修改成功');
                            this.closeDia();
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
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
    }
</script>
<style lang="scss" scoped>
.table-data {
    .one-line {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        // padding-bottom: 10px;
        border-bottom: 1px dashed #DCDFE6;
        margin-bottom: 10px;
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
        .switch-container {
            width: 100px;
            padding: 0 10px;
            text-align: center;
            background-color: #F5F7FA;
            border: 1px solid #DCDFE6;
            height: 38px;
            line-height: 36px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
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
}
</style>
