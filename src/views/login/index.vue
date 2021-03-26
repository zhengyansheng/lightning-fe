<template>
    <div class="login-container">
        <img class="bg" src="./../../assets/images/bg.png" alt="">
        <div class="right" @keyup.enter="submit">
            <div class="group">
                <label for="">Username</label>
                <input type="text" v-model="username" />
            </div>
            <div class="group">
                <label for="">Password</label>
                <input type="password" v-model="password" />
            </div>
            <el-checkbox v-model="checked">Remember me</el-checkbox>
            <div class="login-group">
                <input type="button" class="login" value="Login" :loading="loading" @click="submit">
                <el-checkbox v-model="checkLdap">ldap</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: '',
        data() {
            return {
                checked: false,
                checkLdap: false,
                username: 'admin',
                password: 'zhengyansheng',
                loading: false,
                redirect: undefined
            }
        },
        watch: {
            $route: {
                handler: function(route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        created() {
        },
        methods: {
            submit() {
                if (!this.username) {
                    this.$message.error('请填写用户名')
                    return false
                }
                if (!this.password) {
                    this.$message.error('请填写密码')
                    return false
                }
                if (this.password.length < 4) {
                    this.$message.error('密码长度最小不能小于4')
                    return false
                }
                this.loading = true
                this.$store.dispatch('user/login', {
                    username: this.username,
                    password: this.password
                }).then(() => {
                    this.$router.push({ path: this.redirect || '/' })
                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
.login-container {
    width: 100%;
    height: 100%;
    background-color: #a2caa3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .bg {
        margin: 0 50px;
    }
    .right {
        margin: 0 50px;
        width: 50%;
        input {
            width: 100%;
            max-width: 400px;
            background-color: #fff;
            border: none;
            outline: none;
            display: block;
            height: 44px;
            border-radius: 4px;
            padding: 10px;
            box-sizing: border-box;
            font-size: 14px;
        }
        .group {
            margin-bottom: 25px;
            label {
                margin-bottom: 8px;
                display: block;
            }
        }
        .login-group {
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            input {
                width: 200px;
                background-color: #e68d4d;
                color: #f5eded;
                font-size: 18px;
                margin-right: 10px;
                &:hover {
                    background-color: #f77314;
                }
            }
        }
    }
}
</style>
