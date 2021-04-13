<template>
    <el-dialog :title="title" :visible="isShow" width="800px" @close="closeDia">
        <el-steps :active="1">
            <el-step title="步骤 1" icon="el-icon-edit"></el-step>
            <el-step title="步骤 2" icon="el-icon-upload"></el-step>
            <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
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
            nodeId: {
                type: Number
            }
        },
        watch: {
            isShow(newVal) {
                if (newVal) {
                    
                }
            }
        },
        data() {
            return {
                title: '主机 生命周期线'
            }
        },
        created() {
        },
        methods: {
            closeDia() {
                this.$emit('update:isShow', false)
            },
        }
    }
</script>
<style lang="scss" scoped>
.tags-container {
    width: 100%;
    height: 150px;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 15px;
}
.key-value {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    label {
        // margin-right: 10px;
    }
    .el-input {
        width: 100px;
        margin: 0 10px;
    }
}
</style>
