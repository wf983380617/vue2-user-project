<template>
  <div class="login-box">
    <div class="login-container">
      <div class="login-title">用户中心</div>
      <div class="login-content">
        <el-form :model="loginForm" :rules="formRules" ref="loginForm" class="login-form">
          <el-form-item prop="loginName">
            <el-input v-model="loginForm.loginName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="btnLoading"
              class="login-btn"
              type="primary"
              @click="submitForm('loginForm')"
            >立即登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        loginName: "",
        password: ""
      },
      formRules: {
        loginName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 12, message: "长度在 5 到 12 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      btnLoading: false
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    // 绑定enter事件
    handleKeydown(e) {
      let that = this;
      if (e.keyCode === 13) {
        that.submitForm("loginForm");
      }
    },
    submitForm(formName) {
      const that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          try {
            that.btnLoading = true;
            if (
              that.loginForm.loginName == "admin" &&
              that.loginForm.password == "123456"
            ) {
              sessionStorage.setItem("userId", "admin");
              that.$router.push({ path: "/" });
            } else {
              that.btnLoading = false;
              that.$message.error("账号或密码错误");
            }
          } catch (error) {
            that.btnLoading = false;
          }
        } else {
          that.btnLoading = false;
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-form-item__content {
  margin-left: 0;
  height: 40px;
  line-height: 40px;
}
.login-box {
  height: 100vh;
  width: 100%;
  background: #e9edf2;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  &::before {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    top: 10%;
    right: 10%;
    border-radius: 50%;
    background-color: #e2e5ed;
  }
  &::after {
    content: "";
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: 10%;
    left: 10%;
    border-radius: 50%;
    background-color: #e2e5ed;
  }
  .login-container {
    z-index: 1000;
    width: 500px;
    padding: 50px 30px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    // width: 300px;
    .login-title {
      // color: #fff;
      font-size: 32px;
      padding-bottom: 40px;
      font-weight: 600;
    }
    .login-content {
      display: flex;
      justify-content: center;
      align-items: center;
      .login-form {
        width: 300px;
        .login-btn {
          width: 300px;
        }
      }
    }
  }
}
</style>
  