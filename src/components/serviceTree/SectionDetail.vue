<template>
    <div class="session-container">
        <div class="info-group">
            <p>信息</p>
            <div class="info-details">
                <div class="name-group-info">
                    <label for="">节点名称: </label>
                    <span>{{currentNode.name}}</span>
                </div>
                <div class="name-group-info">
                    <label for="">中文名称: </label>
                    <span>{{currentNode.name_cn}}</span>
                </div>
                <div class="name-group-info">
                    <label for="">节点路径: </label>
                    <span>{{currentNode.abspath}}</span>
                </div>
                <div class="name-group-info">
                    <label for="">AppKey: </label>
                    <span>{{currentNode.appkey}}</span>
                </div>
                <div class="name-group-info">
                    <label for="">创建时间: </label>
                    <span>{{currentNode.create_time}}</span>
                </div>
            </div>
        </div>
        <div class="info-group">
            <p>负责人</p>
            <div class="info-details">
                <!-- <div class="tips">
                    PD负责人拥有节点读权限，监控配置权限 <br />
                    SRE负责人拥有节点写权限，监控配置权限 <br />
                    RD限制2-12人，其他人数不限但逗号连接后的总长度限制为255 <br />
                </div> -->
                <div class="name-group">
                    <label for="">开发者: </label>
                    <div>
                        <el-tag
                            :key="index"
                            v-for="(tag, index) in operaPermissionMember.read_member"
                            size="small">
                            {{tag.name}}({{tag.username}}) 
                        </el-tag>
                    </div>
                </div>
                <div class="name-group">
                    <label for="">管理者: </label>
                    <div>
                        <el-tag
                            :key="index"
                            v-for="(tag, index) in operaPermissionMember.write_member"
                            size="small">
                            {{tag.name}}({{tag.username}}) 
                        </el-tag>
                    </div>
                </div>
                <div class="name-group">
                    <label for="">开发者 <font style="color: green">继承</font>: </label>
                    <div>
                        <el-tag
                            :key="index"
                            v-for="(tag, index) in operaPermissionMember.read_member_ref"
                            size="small">
                            {{tag.name}}({{tag.username}}) 
                        </el-tag>
                    </div>
                </div>
                <div class="name-group">
                    <label for="">管理者 <font style="color: green">继承</font>: </label>
                    <div>
                        <el-tag
                            :key="index"
                            v-for="(tag, index) in operaPermissionMember.write_member_ref"
                            size="small">
                            {{tag.name}}({{tag.username}}) 
                        </el-tag>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-group">
            <p>标签</p>
            <div class="info-details">
                <el-tag
                    :key="index"
                    v-for="(item, index) in dynamicTags"
                    size="small"
                    :disable-transitions="false">
                    {{item.key}}: {{item.value}}
                </el-tag>
            </div>
        </div>
    </div>
</template>
<script>
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
        data() {
            return {
                currentNode: {},
                operaPermissionMember: {},
                dynamicTags: {}
            }
        },
        watch: {
            nodes(newVal) {
                if (newVal) {
                    this.currentNode = Object.assign({}, newVal)
                    this.fetchOperaPermissionMember(newVal.pk);
                    this.getTagList(newVal.pk)
                }
            }
        },
        created() {
            this.currentNode = Object.assign({}, this.nodes)
            if (Object.keys(this.currentNode).length) {
                this.fetchOperaPermissionMember(this.currentNode.pk);
                this.getTagList(this.currentNode.pk)
            }
        },
        methods: {
            // 获取负责人信息
            fetchOperaPermissionMember(id) {
                if (!id) return false;
                this.api.serviceTree.fetchOperaPermissionMember(id).then(res => {
                    this.operaPermissionMember = res.data;
                })
            },
            getTagList(id) {
                if (!id) return false;
                this.api.serviceTree.fetchNodesTag(id).then(res => {
                    this.dynamicTags = res.data.tag;
                })
            },
        }
    }
</script>
<style lang="scss" scoped>
.session-container {
    .info-group {
        width: 100%;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        border-radius: 4px;
        margin-top: 10px;
        &:first-child {
            margin-top: 0;
        }
        &>p {
            margin: 0;
            padding: 10px;
            background-color: rgb(198, 226, 255);
            border-bottom: 1px solid rgb(179, 216, 255);
            font-size: 14px;
            font-weight: bold;
        }
        .info-details {
            padding: 20px;
            box-sizing: border-box;
            .tips {
                width: 100%;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 4px;
                background-color: rgb(225, 243, 216);
                line-height: 1.5;
            }
            .name-group-info {
                margin-top: 10px;
                &>label {
                    width: 100px;
                    display: inline-block;
                    font-weight: bold;
                    color:#303133;
                }
                &:first-child {
                    margin-top: 0;
                }
            }
            .name-group {
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: flex-start;
                &>label {
                    width: 100px;
                    display: inline-block;
                    font-weight: bold;
                    color:#303133;
                    flex: 1 0 auto;
                }
                &>div {
                    width: calc( 100% - 100px );
                }
                &:first-child {
                    margin-top: 0;
                }
                .el-tag {
                    margin-bottom: 2px;
                }
            }
        }
    }
}
</style>
