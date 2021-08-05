<template>
  <div class="login-container">
    <el-form ref="form" label-width="0px" class="login-form" @keyup.enter="submit">
      <div class="title-container">
        <h3 class="title">Lightning 平台登录</h3>
      </div>
      <el-form-item>
        <el-input class="input-login" prefix-icon="el-icon-user-solid" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="el-icon-lock" type="password" show-password v-model="password"></el-input>
      </el-form-item>
      <div style="margin-bottom:20px">
        <el-checkbox v-model="checked">Remember me</el-checkbox>
        <el-checkbox v-model="checkLDAP">LDAP</el-checkbox>
        <el-checkbox v-model="checkSSO">SSO</el-checkbox>
      </div>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="submit">Login</el-button>

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
<style lang="scss">
*, :after, :before {
    -webkit-box-sizing: border-box;;
    box-sizing: border-box;;
}
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    // width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 35px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  @media screen and (max-width: 750px) {
    .login-form {
      width:100%;
      padding: 20px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
