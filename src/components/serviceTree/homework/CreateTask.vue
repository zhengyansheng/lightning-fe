<template>
    <el-dialog title="创建任务" :visible="isShow" width="1000px" @close="closeDia">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="任务名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="任务描述">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="并发数" prop="fork">
                <el-input type="number" v-model="form.fork" min="1"></el-input>
            </el-form-item>
            <el-form-item label="命令" prop="script_name">
                <div>
                    <el-radio v-model="script" label="script">脚本</el-radio>
                    <el-radio v-model="script" label="playbook">剧本</el-radio>
                </div>
                <div style="position:relative;">
                    <el-select v-model="form.script_name" placeholder="请选择脚本" v-if="script==='script'" @change="getScriptsContent">
                        <el-option
                            v-for="item in scriptLists"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-select v-model="form.script_name" placeholder="请选择剧本" v-if="script==='playbook'" @change="getScriptsContent">
                        <el-option
                            v-for="item in playbookLists"
                            :key="item"
                            :label="item"
                            :value="item">
                        </el-option>
                    </el-select>
                    <el-switch
                        style="position:absolute;top:10px;left:250px;"
                        active-text="显示文件内容"
                        inactive-text="隐藏文件内容"
                        v-model="isShowScript">
                    </el-switch>
                </div>
                <pre v-if="isShowScript">
                    {{content}}
                </pre>
            </el-form-item>
            <el-form-item label="主机" prop="hosts">
                <el-transfer
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入关键字"
                    :titles="['未选择', '已选择']"
                    :props="{
                        key: 'private_ip',
                        label: 'hostname'
                    }"
                    v-model="form.hosts"
                    :data="hostList">
                </el-transfer>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeDia">取 消</el-button>
            <el-button size="small" type="primary" @click="createScripts('form')">执 行</el-button>
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
            nodes: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    this.getHostList();
                    this.getScriptsPlaybook();
                }
            }
        },
        data() {
            return {
                host: [],
                hostList: [],
                form: {
                    name: '',
                    remark: '',
                    hosts: [],
                    script_name: '',
                    fork: 1
                },
                script: 'script', // 扩展名是yaml就是剧本，否则就是脚本
                scriptLists: [],
                playbookLists: [],
                content: '',
                isShowScript: false,
                filterMethod(query, item) {
                    return item.hostname.indexOf(query) > -1;
                },
                rules: {
                    name: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' }
                    ],
                    fork: [
                        { required: true, message: '请填写并发数', trigger: 'change' }
                    ],
                    script_name: [
                        { required: true, message: '请选择命令文件', trigger: 'change' }
                    ],
                    hosts: [
                        { required: true, message: '请选择主机', trigger: 'change' }
                    ]
                }
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$refs['form'].resetFields();
                this.$emit('update:isShow', false)
            },
            getHostList() {
                let id = this.nodes.pk
                let params = {
                    page: 1,
                    page_size: 10000
                }
                this.api.serviceTree.fetchMachineInfo(id, params).then(res => {
                    this.hostList = res.data.results;
                })
            },
            getScriptsPlaybook() {
                this.api.homework.getScriptsPlaybook().then(res => {
                    this.scriptLists = res.data.script;
                    this.playbookLists = res.data.playbook
                })
            },
            getScriptsContent(val) {
                this.api.homework.getScriptsContent(val).then(res => {
                    this.content = res.data;
                })
            },
            createScripts(formName) {
                console.log(this.form);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.api.homework.createTaskCommand(this.form).then(res => {
                            this.$message.success('创建成功');
                            this.closeDia();
                            this.$parent.getTableList();
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
/deep/ .el-transfer-panel {
    width: 280px;
}
/deep/ .el-transfer__buttons {
    /deep/ .el-button {
        display: block;
        margin: 0 0 10px 0;
    }
}
pre {
    color:#444;
    margin:15px auto;
    padding:20px 15px;
    border:1px dashed #ddd;
    border-left:4px solid #bbb;
    background:#fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAmCAIAAACphTeFAAAAJElEQVRIx2N4RS5gGNU5qnNU56hOZJ2fyQWjOkd1juoc1YkMAKDL4lkok3p7AAAAAElFTkSuQmCC') repeat;
    white-space:pre-wrap;
    word-wrap:break-word;
    letter-spacing:1.5px;
    font:14px/25px 'Comic Sans MS','courier new';
    line-height:22px;
    background-size:100% 44px
}
</style>
