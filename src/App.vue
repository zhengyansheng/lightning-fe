<template>
    <div id="app">
        <template v-if="!isLogin">
            <Header />
            <div class="wrap">
                <div class="main"><router-view /></div>
            </div>
        </template>
        <template v-else><router-view /></template>
    </div>
</template>

<script>
import Header from './components/common/Header.vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
export default {
    name: 'App',
    components: {
        Header
    },
    watch: {
		'$route' (to, from) { //监听路由是否变化
			console.log(to)
			if(to.name === 'login'){ //跳转到哪个页面
                this.isLogin = true;
			} else {
                this.isLogin = false;
            }
		},
    },
    data() {
        return {
            isLogin: false
        }
    },
    created() {
        axios.defaults.headers.common[
        'Authorization'
        ] = `JWT ` + getToken()
    },
    methods: {
        
    }
}
</script>

<style lang="scss">
html, body {
        height: 100%;
        background: #F8F8F8;
        
        -webkit-transform: translate3d(0,0,0);
        transform: translate3d(0,0,0);
    }
#app{
    height: calc(100% - 49px);
}
.wrap{
    height: calc( 100% - 50px );
    overflow-y: auto;
}
.main{
    width: calc(100% - 46px);
    height: 100%;
    min-width: 900px;
    float: left;
    padding: 10px 25px;
    overflow: auto;
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    transition: all .3s;
}
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>
