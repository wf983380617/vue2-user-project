<template>
  <div>
    <el-container>
      <!-- 菜单区域 -->
      <el-aside :width="isCollapse?'64px':'200px'" style="overflow:hidden">
        <div class="header-title">
          <!-- <img v-if="!isCollapse" class="header-logo" src="@/assets/images/lxlogo.png" /> -->
          <div v-if="!isCollapse">用户中心</div>
        </div>
        <SideBar :menuList="menuList"></SideBar>
      </el-aside>
      <!-- 头部区域 -->
      <el-container>
        <el-header style="height:80px;padding:0">
          <HeaderBar></HeaderBar>
        </el-header>
        <!-- 内容区域 -->
        <el-main style="background:#ddd;padding:10px">
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import HeaderBar from "./components/HeaderBar";
import SideBar from "./components/SideBar";
import AppMain from "./components/AppMain";
import router from "../../router/permission";
import { mapGetters } from "vuex";
export default {
  components: {
    HeaderBar,
    SideBar,
    AppMain
  },
  data() {
    return {
      menuList:[]
    };
  },
  computed: {
    ...mapGetters(["isCollapse"])
  },
  mounted() {
    const routerList = router.options.routes;
    this.menuList = routerList.filter(item=>item.children);
  }
};
</script>
<style lang="scss">
.el-menu-item.is-active {
  background: #409eff !important;
  color: #fff;
}
.header-title {
  height: 80px;
  width: 199px;
  background: rgb(84, 92, 100);
  line-height: 80px;
  color: #fff;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 6px;
  font-size: 20px;
}
.header-logo {
  width: 70px;
  margin-right: 5px;
}
</style>