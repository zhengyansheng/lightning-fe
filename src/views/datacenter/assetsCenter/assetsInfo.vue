<template>
    <div class="assets-center-container">
        <div class="assets-center-operate">
            <el-button type="primary" plain @click="addNewType('')">新增分类</el-button>
            <el-input v-model="search" prefix-icon="el-icon-search" placeholder="请输入内容" style="width: 200px; margin-left:10px;" @keyup.enter="fetchTableClassifyTree"></el-input>
        </div>
        <div class="meta"></div>
        <div class="assets-center-container">
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {

            }
        },
        created() {
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
.assets-center-container {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
    background-color: #fff;
    .assets-center-operate {
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .meta {
        background-color: #fafafa;
        border-top: 1px solid #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    .assets-center-container {
        padding: 24px;
        box-sizing: border-box;
    }
}
</style>
