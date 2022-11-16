<template>
  <div class="home-page">
    <div class="home-box">
      <!-- <img class="home-img" src="@/assets/images/lxlogo.png" /> -->
      <div class="home-title">用户中心系统</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 140px);
  .home-box {
    text-align: center;
    .home-img {
      width: 300px;
      height: 100px;
    }
    .home-title {
      margin-top: 20px;
      font-size: 40px;
      font-weight: bold;
    }
  }
}
</style>