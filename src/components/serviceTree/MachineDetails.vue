<template>
    <div class="machine-details">
        <h2>基本信息</h2>
        <el-row>
            <el-col :span="12"><div class="group"><label for="">实例ID</label><span>{{infos.instance_id}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">名称</label><span>{{infos.hostname}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">状态</label><span>{{infos.state}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">区域</label><span>{{infos.region_name}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">平台</label><span>{{infos.platform}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">机器类型</label><span>{{infos.type}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">创建人</label><span>{{infos.create_user}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">备注</label><span>{{infos.remark}}</span></div></el-col>
        </el-row>
        <el-divider></el-divider>
        <h2>配置信息</h2>
        <el-row>
            <el-col :span="12"><div class="group"><label for="">内网IP</label><span>{{infos.private_ip}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">外网IP</label><span>{{infos.public_ip}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">系统镜像</label><span>{{infos.image_id}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">操作系统</label><span>{{infos.os_system}} {{infos.os_version}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">实例类型</label><span>{{infos.instance_type}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">CPU | 内存</label><span>{{infos.cpu_total}} 核 | {{infos.mem_total}} G</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">实例付费方式</label><span>{{infos.instance_charge_type}}</span></div></el-col>
        </el-row>
        <el-divider></el-divider>
        <h2>其他</h2>
        <el-row>
            <el-col :span="12"><div class="group"><label for="">创建时间</label><span>{{infos.create_server_time}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">删除保护</label><span></span></div></el-col>

            <el-col :span="12"><div class="group"><label for="">帐号</label><span>{{infos.account}}</span></div></el-col>
            <el-col :span="12"><div class="group"><label for="">主帐号ID</label><span>{{infos.root_id}}</span></div></el-col>
        </el-row>
    </div>
</template>
<script>
    import startPic from '@assets/images/start.svg'
    import stopPic from '@assets/images/stop.svg'
    export default {
        name: '',
        props: {
            infos: {
                type: Object
            }
        },
        data() {
            return {
                startPic,
                stopPic
            }
        },
        created() {
            console.log(this.infos);
        },
        methods: {
        }
    }
</script>
<style lang="scss" scoped>
.machine-details {
    padding: 0 20px;
    h2 {
        border-left: 3px solid #409EFF;
        font-weight: 500;
        font-size: 16px;
        padding-left: 5px;
        color: #303133;
        margin-bottom: 20px;
    }
    label {
        display: inline-block;
        width: 100px;
        color: #909399;
    }
    .group {
        font-size: 14px;
        color: #303133;
    }
    .el-col {
        margin-bottom: 15px;
    }
    .stop-icon, .start-icon {
        color: #EC3542;
        img {
            width: 18px;
            margin-right: 5px;
        }
    }
    .start-icon {
        color: #86da76;
    }
}
</style>
