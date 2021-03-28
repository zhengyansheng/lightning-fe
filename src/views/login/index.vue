<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="0px" class="login-form" @keyup.enter="submit">
      <el-form-item label="">
      <div class="login-title">Lightning 登录</div>
      
      </el-form-item>
      <el-form-item label="">
        <el-input class="input-login" prefix-icon="el-icon-user-solid" v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input prefix-icon="el-icon-lock" type="password" show-password v-model="password"></el-input>
      </el-form-item>
      <el-form-item label="">
      <el-checkbox v-model="checked">Remember me</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login"  @click="submit">Login</el-button>
      </el-form-item>
    </el-form>
   </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      checked: false,
      checkLdap: false,
      username: "admin",
      password: "zhengyansheng",
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    submit() {
      if (!this.username) {
        this.$message.error("请填写用户名");
        return false;
      }
      if (!this.password) {
        this.$message.error("请填写密码");
        return false;
      }
      if (this.password.length < 4) {
        this.$message.error("密码长度最小不能小于4");
        return false;
      }
      this.loading = true;
      this.$store
        .dispatch("user/login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: this.redirect || "/" });
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: #a2caa3;
  .login-title{
    text-align:center;
    font-size:20px;
    background: url('./../../assets/images/bg.png') no-repeat;
    background-size: 40px;

  }
  .login-form{
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 170px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    color: #ffffff;
    .el-input{
      border: 2px solid transparent;
      outline: none;
      display: block;
      height: 39px;
      border-radius: 4px;
      box-sizing: border-box;
      font-size: 14px;
    }
    
    .login{
        width: 200px;
        background-color: #e68d4d;
        color: #f5eded;
        font-size: 18px;
        margin-right: 10px;
        border:0;
        &:hover {
          background-color: #f77314;
        }
    }
  }
  .el-input__prefix, .el-input__suffix{
    color:#ffffff
  }


}
  
</style>
<style>
.login-container .el-input__inner{
        background: #ffffff;
      }
</style>
