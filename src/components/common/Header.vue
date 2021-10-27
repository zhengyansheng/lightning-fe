<template>
<div class='admin-header'>
    <router-link :to="{name: 'serviceTree'}" class="logo"> <font size="5" color="orange">Lightning</font> </router-link>
    <div class="nav">
        <el-menu :default-active="activeIndex" @select="selectMenu" class="el-menu" mode="horizontal">
            <template v-for="firstMenu in navMenu">
                <template v-if="firstMenu.children">
                    <el-submenu :key="firstMenu.index" :index="firstMenu.index" popper-class="nav-popup">
                        <template slot="title">{{firstMenu.title}}</template>
                        <template v-for="secondMenu in firstMenu.children">
                            <template v-if="secondMenu.children">
                                <el-submenu  :index="secondMenu.index" :key="secondMenu.index">
                                    <template slot="title">{{secondMenu.title}}</template>
                                    <el-menu-item v-for="thirdMenu in secondMenu.children" :index="thirdMenu.index" :key="thirdMenu.index">
                                        <div class="submenu">
                                            <div class="desc-container">
                                                <p>{{thirdMenu.title}}</p>
                                            </div>
                                        </div>
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <template v-else>
                                <el-menu-item :index="secondMenu.index" :key="secondMenu.index">
                                    <div class="submenu">
                                        <div class="desc-container">
                                            <p>{{secondMenu.title}}</p>
                                        </div>
                                    </div>
                                </el-menu-item>
                            </template>
                        </template>
                        <!-- <el-menu-item v-for="secondMenu in firstMenu.children" :index="secondMenu.index" :key="secondMenu.index">
                            <div class="submenu">
                                <div class="desc-container">
                                    <p>{{secondMenu.title}}</p>
                                </div>
                            </div>
                        </el-menu-item> -->
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :key="firstMenu.index" :index="firstMenu.index">{{firstMenu.title}}</el-menu-item>
                </template>
            </template>
            <!-- <el-submenu :index="firstMenu.index" v-for="firstMenu in navMenu" :key="firstMenu.index"  popper-class="nav-popup">
                <template slot="title">{{firstMenu.title}}</template>
                <el-menu-item v-for="secondMenu in firstMenu.children" :index="secondMenu.index" :key="secondMenu.index">
                    <div class="submenu">
                        <div class="desc-container">
                            <p>{{secondMenu.title}}</p>
                        </div>
                    </div>
                </el-menu-item>
            </el-submenu> -->
        </el-menu>
    </div>
    <div class="user-info">
        <el-menu text-color="#3E3F42" active-background-color="#FFF" class="el-menu" mode="horizontal">
            <el-submenu index="" popper-class="user-popup">
                <!-- <i class="icon-user"></i> -->
                <template slot="title"><img class="avatar" :src="avatarImg" alt="">{{userName}}</template>
                <el-menu-item index="" style="color: #6B6C6F;" @click="logout">退出</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
    <div class="buttons">
        <el-button type="primary" plain size="mini"><el-link type="primary" href="https://github.com/zhengyansheng/lightning" target="_blank">Github仓库</el-link></el-button>
        <!--<el-button type="primary" plain size="mini" style="margin-left:10px;"><el-link type="primary" href="http://zhaopin.aiops724.com/" target="_blank">招聘</el-link></el-button>-->
        <!--<el-button type="primary" plain size="mini" style="margin-right:-37px;"><el-link type="primary" href="https://m.ke.qq.com/course/package/37523?saleToken=2508253&from=wxso" target="_blank">Airflow 课程-腾讯课堂</el-link></el-button>
        <el-button type="primary" plain size="mini"><el-link type="primary" href="https://github.com/airflow-cn/airflow-video" target="_blank">Airflow 课程-51CTO</el-link></el-button>-->
    </div>
</div>
</template>

<script>
import menuConfig from '@utils/menuConfig.js';
import { removeToken } from '@utils/auth'

export default {
    name: 'adminHeader',
    data() {
        return {
            activeIndex: '1',
            navMenu: [],
            avatarImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.nbd.com.cn%2Fuploads%2Farticles%2Fimages%2F681065%2F____401033359.jpg&refer=http%3A%2F%2Fimage.nbd.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615172032&t=e312ba27e41371754314f9a80c2a4024'
        }
    },
    // 监听
    watch: {},
    computed: {
        userName() {
            return this.$store.state.user.name + ' (' + this.$store.state.user.username + ')'
        }
    },
    // 组件实例创建完成
    created() {},
    // 模板挂载结束
    mounted() {
        this.$nextTick(() => {
            console.log(this.$store.state.user.username);
            console.log(this.$store.getters);
            this.navMenu = menuConfig
            this.navMenu.forEach(firstMenu => {
                if (firstMenu.children) {
                    firstMenu.children.forEach(secondMenu => {
                        if (location.pathname.indexOf(secondMenu.routeName) === 1) {
                            this.activeIndex = firstMenu.index
                        }
                    })
                } else {
                    if (location.pathname.indexOf(firstMenu.routeName) === 1) {
                        this.activeIndex = firstMenu.index
                    }
                }
            })
            console.log(this.navMenu);
        })
    },
    // 组件销毁完成
    destroyed() {},
    // vue方法
    methods: {
        selectMenu(index, path) {
            let subMenu = '';
            const menu = this.navMenu[path[0] - 1]
            if (menu.children) {
                const children = menu.children.filter(item => item.index === index)
                if (children.length) {
                    subMenu = children;
                } else {
                    const second = menu.children.filter(item => item.index === path[1]);
                    subMenu = second[0].children.filter(item => item.index === index)
                }
            } else {
                subMenu = [menu]
            }
            subMenu[0].go()
        },
        async logout() {
            removeToken()
            this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        }
    }
}
</script>

<style lang="scss">
.nav-popup {
    // .el-menu {
    //     .el-menu-item{
    //         height: 66px;
    //         padding: 0 !important;
    //         .submenu {
    //             // height: 66px;
    //             padding: 0 20px;
    //             &:hover{
    //                 background-color: #F6F9FD;
    //             }
    //             // img{
    //             //     width: 24px;
    //             //     margin-right: 5px;
    //             // }
    //             .desc-container{
    //                 display: inline-block;
    //                 p{
    //                     height: 20px;
    //                     line-height: 20px;
    //                     // margin-bottom: 4px;
    //                     color: #242930;
    //                     // &:nth-child(1){
    //                     //     color: #242930;
    //                     // }
    //                     // &:nth-child(2){
    //                     //     color: #9EA0A5;
    //                     // }
    //                 }
    //             }
    //         }
    //     }
    // }
}

.user-popup {
    width: 120px;
    text-align: center;
    .el-menu--popup{
        width: 120px;
        min-width: 120px;
        .el-menu-item{
            width: 120px;
            &:hover{
                background-color: #F6F9FD;
            }
        }
    }
}
</style>

<style lang="scss" scoped>
h1,
h2,
h3 {
    font-size: 16px;
}

.admin-header {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #EEE;
    background: #fff;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.03);
    position: relative;
    z-index: 9;

    .logo {
        width: auto;
        height: 48px;
        line-height: 48px;
        float: left;
        // padding: 0 0 0 120px;
        padding: 0 0 0 20px;
        font-size: 16px;
        font-weight: bold;
        // background: url('./../../assets/images/51reboot-logo.jpeg') no-repeat 18px center;
        // background-size: 80px auto;
        color: #52595E;
        position: relative;
        // &::after{
        //     width: 1px;
        //     height: 24px;
        //     background: #EAEDF3;
        //     position: absolute;
        //     left: 108px;
        //     top: 12px;
        //     content: '';
        // }
    }
    .nav{
        .el-menu{
            height: 48px;
            float: left;
            margin-left: 10px;
            /deep/ .el-menu-item{
                height: 48px;
                line-height: 48px;
                font-size: 16px;
                font-weight: 400;
                color: #647787;
                padding: 0 10px;
            }
            /deep/ .el-submenu__title{
                height: 48px;
                line-height: 48px;
                font-size: 16px;
                font-weight: 400;
                color: #647787;
            }
        }
        // /deep/ .el-menu--horizontal>.el-submenu .el-submenu__title {
        //     border-bottom: none;
        //     color: #303133 !important;
        //     padding: 0 20px !important;
        // }
        // /deep/ .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
        //     border-bottom: none;
        //     font-weight: 500;
        //     color: #415361;
        // }
        // /deep/ .el-submenu.is-active .el-submenu__title {
        //     border-bottom: none;
        // }
    }
    .user-info {
        float: right;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        .avatar {
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            height: 24px;
        }
        .icon-user{
            vertical-align: middle;
            margin-right: 5px;
            width: 24px;
            height: 24px;
            text-align: center;
            display: inline-block;
            background: url('./../../assets/images/user-icon.png') no-repeat;
            background-size: 24px 24px;
            position: relative;
            top: -1px;
            margin-right: 8px;
        }
        .el-menu{
            height: 48px;
            /deep/ .el-menu-item{
                height: 48px;
                line-height: 48px;
            }
            /deep/ .el-submenu__title{
                height: 48px;
                line-height: 48px;
            }
            /deep/ .el-submenu__title{
                border-bottom: 0;
            }
        }
    }
    .buttons {
        float: right;
        line-height: 48px;
        height: 48px;
        /deep/ .el-button {
            transform: scale(0.8);
            margin-right: -30px;
        }
    }
    .el-link.el-link--primary:hover {
        color: #fff;
    }
}
// .el-menu--popup .el-submenu .el-submenu__title {
//     color: #303133 !important;
//     padding: 0 20px !important;
// }
</style>
