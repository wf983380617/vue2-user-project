<template>
  <div class="error-container">
    <el-result title="404" subTitle="抱歉，请求错误">
      <template slot="icon">
        <el-image
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        ></el-image>
      </template>
      <template slot="extra">
        <el-button type="primary" size="medium" @click="goHome">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push({
        path: "/"
      });
      this.$store.dispatch("handleActiveMenu", '/');
      const activeRouter = {
        name: '/home',
        title: '首页'
      };
      this.$store.dispatch("handleActiveTag", activeRouter);
    }
  }
};
</script>