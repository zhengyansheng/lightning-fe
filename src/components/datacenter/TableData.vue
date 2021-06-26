<template>
    <div class="table-data">
        <div style="max-height:500px;overflow:auto;">
            <div class="one-line" v-for="(item, wholelineIndex) in displayLists" :key="wholelineIndex">
                <div class="group">
                    <el-input placeholder="请输入内容" v-model="item.name" @change="handleChange" :disabled="!isEdit">
                        <template slot="prepend">字段名</template>
                    </el-input>
                </div>
                <div class="group">
                    <el-input placeholder="请输入内容" v-model="item.alias" :disabled="!isEdit">
                        <template slot="prepend">中文名</template>
                    </el-input>
                </div>
                <div class="group">
                    <el-input placeholder="请输入内容" v-model="item.order" :disabled="!isEdit" type="number" :min="0">
                        <template slot="prepend">排序编号</template>
                    </el-input>
                </div>
                <div class="group switch-group">
                    <div class="el-input-group__prepend left-label">唯一标识</div>
                    <div class="el-input-group__append right-label"><el-switch v-model="item.guid" :disabled="!isEdit"></el-switch></div>
                </div>
                <div class="group type-group">
                    <div class="el-input-group__prepend left-label">类型</div>
                    <el-select v-model="item.type" slot="append" placeholder="请选择" :disabled="!isEdit" @change="changeType(item.type, item.rules)">
                        <el-option label="IP" value="IP"></el-option>
                        <el-option label="Str" value="Str"></el-option>
                        <el-option label="Int" value="Int"></el-option>
                        <el-option label="Choices" value="Choices"></el-option>
                    </el-select>
                </div>
                <!-- <div class="group" v-if="item.type==='Choices'">
                    <el-input placeholder="请输入内容" v-model="item.select_list" :disabled="!isEdit">
                        <template slot="prepend">可选值</template>
                    </el-input>
                </div> -->
                <div class="group select-group" v-for="(selects, indexs) of item.rules" :key="indexs">
                    <el-select v-model="selects.name" slot="append" placeholder="请选择" :disabled="!isEdit">
                        <el-option :key="index" :label="s.label" :value="s.value" v-for="(s, index) of showRulesList(selects.name, item.rules)"
                        :disabled="disabled(s, item)"></el-option>
                    </el-select>
                    <el-input v-if="selects.name=='lens'||selects.name=='max'||selects.name=='min'" v-model.number="selects.value" type="number" :min="0" :disabled="!isEdit" />
                    <el-input v-else-if="selects.name!=='unique' && selects.name!=='not_null'" :disabled="!isEdit" placeholder="请输入内容" v-model="selects.value" />
                    <el-input v-else placeholder="请输入内容" v-model="selectsValue" readonly :disabled="!isEdit" />
                    <!-- <div v-else class="switch-container"><el-switch disabled v-model="selectsValue"></el-switch></div> -->
                    <span class="el-icon-circle-close closed" v-if="isEdit" @click="listDelete(indexs, item.rules)"></span>
                </div>
                <div class="group btn-group" v-if="isEdit">
                    <el-button type="primary" icon="el-icon-plus" circle @click="listAdd(item.rules)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="listDeleteWholeLine(wholelineIndex)"></el-button>
                </div>
            </div>
            <div class="add-whole-line" v-if="isEdit"><el-button type="success" icon="el-icon-plus" circle @click="listAddWholeLine"></el-button></div>
        </div>
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
                    }, {
                        label: 'select_list',
                        value: 'select_list'
                    }
                ],
                displayLists: {
                    name: '',
                    alias: '',
                    order: 0,
                    guid: false,
                    type: 'IP',
                    rules: []
                },
                selectsValue: 'true',
                isCurrentEdit: false
            }
        },
        computed: {
            disabled() {
                return (s, item) => {
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
            changeType(val, selectList) {
                console.log('val, selectList', val, selectList);
                if (val === 'Choices') {
                    selectList.push({
                        name: 'select_list'
                    });
                }
            },
            handleChange() {
                this.$forceUpdate()
            },
            initList() {
                let emptylist = [{name: '', alias: '', order: 0, guid: false, type: 'IP', rules: []}]
                let list = [];
                let fields = this.editData.fields;
                let rules = this.editData.rules;
                if (!fields || !Object.keys(fields).length) {
                    this.isCurrentEdit = false;
                    return emptylist;
                }
                this.isCurrentEdit = true;
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
                            console.log('rrrr', r);
                            oneData[r] = rules[key][r]
                            if (r !== 'type') {
                                if (r === 'select_list') {
                                    oneData['rules'].push({
                                        name: 'select_list',
                                        value: rules[key][r].join(',')
                                    })
                                } else if (r === 'unique' || r === 'not_null') {
                                    oneData['rules'].push({
                                        name: r,
                                        value: 'true'
                                    })
                                } else {
                                    oneData['rules'].push({
                                        name: r,
                                        value: rules[key][r]
                                    })
                                }
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
                let choiceIsError = false
                this.displayLists.forEach(item => {
                    console.log('item.name', item.name);
                    console.log('item.alias', item.alias);
                    let key = item.name.trim()
                    let fieldsObj = {}
                    fieldsObj[key] = {
                        guid: item.guid,
                        name: item.alias.trim(),
                        order: Number(item.order),
                    }
                    let rulesObj = {}
                    rulesObj[key] = { type: item.type }
                    if (item.type === 'Choices') {
                        console.log(1231231231312, item, typeof item.select_list);
                        rulesObj[key] = Object.assign(rulesObj[key], {
                            select_list: typeof item.select_list==='object' ? item.select_list:item.select_list.split(',')
                        })
                    }
                    console.log('33333', rulesObj);
                    item.rules.forEach(rule => {
                        let obj = {}
                        console.log('rule.value', rule.value);
                        if (rule.name === 'unique' || rule.name === 'not_null') obj[rule.name] = true
                        else if (item.type === 'Choices' && rule.name === 'default') {
                            console.log(33333333, item.select_list, item.select_list.indexOf(rule.value) < 0);
                            if ((typeof item.select_list==='object' && item.select_list.indexOf(rule.value) < 0) || (typeof item.select_list!=='object'&&item.select_list.split(',').indexOf(rule.value) < 0)) {
                                choiceIsError = true
                                return this.$message.error('default字段的取值范围在可选值内')
                            }
                            obj[rule.name] = rule.value
                        }
                        else if (rule.name === 'lens' || rule.name === 'max' || rule.name === 'min') {
                            obj[rule.name] = Number(rule.value)
                        }
                        else {
                            if (rule.value) {
                                obj[rule.name] = rule.value.trim()
                            } else {
                                console.log('rule.valuerule.value', rule.value);
                            }
                        }
                        rulesObj[key] = Object.assign(obj, rulesObj[key])
                    })
                    fields = Object.assign(fields, fieldsObj)
                    rules = Object.assign(rules, rulesObj)
                    if (item.guid) guidIndex++
                })
                if (guidIndex !== 1) return this.$message.error('唯一标识有且只能有一个为true');
                if (choiceIsError) return false;
                let params = {
                    table_classify: this.editData.id,
                    fields,
                    rules
                }
                if (this.isCurrentEdit) {
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
        // flex-wrap: wrap;
        // padding-bottom: 10px;
        border-bottom: 1px dashed #DCDFE6;
        margin-bottom: 10px;
        // overflow-x: auto;
        width: auto;
        height: 55px;
        padding-top: 5px;
    }
    .group {
        width: 200px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-right: 20px;
        margin-bottom: 10px;
        flex-shrink: 0;
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
