<template>
<el-dialog :title="title" :visible="isShow" :close-on-click-modal='false' @close="closeDia">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 80%; margin-left:50px;">
        <el-form-item :label="'英文名'" prop="name">
            <el-input v-model="temp.name" />
        </el-form-item>
        <el-form-item :label="'中文名'" prop="cname">
            <el-input v-model="temp.cname" />
        </el-form-item>
        <el-form-item :label="'备注'" prop="remark">
            <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.remark" type="textarea" placeholder="input remark" />
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDia" size="mini">取消</el-button>
        <el-button type="primary" @click="editData?createData():updateData()" size="mini">提交
        </el-button>
    </div>
</el-dialog>
</template>

<script>
import {
    Workflowgroup
} from '@services/workflow'
import {
    isvalidEnName
} from '@utils/validate'
export default {
    name: '',
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        editData: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    cname: '',
                    remark: ''
                }
            }
        }
    },
    data() {
        const validateEnName = (rule, value, callback) => {
            if (!isvalidEnName(value)) {
                callback(new Error('Please name should contain only A-Za-z or _'))
            } else {
                callback()
            }
        }
        return {
            title: '',
            rules: {
                name: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateEnName
                }],
                cname: [{
                    required: true,
                    message: 'cname is required',
                    trigger: 'blur'
                }]
            },
            temp: {
                name: '',
                cname: '',
                remark: ''
            }
        }
    },
    watch: {
        isShow(newVal) {
            if (newVal) {
                if (this.editData) {
                    this.title = '编辑'
                    this.temp = Object.assign({}, this.editData)
                } else {
                    this.title = '新建'
                }
            }
        }
    },
    created() {
        console.log(this.temp, this.editData);
    },
    methods: {
        closeDia() {
            this.$emit('update:isShow', false);
            this.temp.name = ''
            this.temp.cname = ''
            this.temp.remark = ''
        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    Workflowgroup.create(this.temp).then(() => {
                        this.$message.success('创建成功')
                        this.$parent.getTableList()
                        this.closeDia()
                    })
                }
            })
        },
        updateData() {
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp)
                    Workflowgroup.update(this.temp.id, tempData).then(() => {
                        this.$message.success('更新成功')
                        this.$parent.getTableList()
                        this.closeDia()
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
