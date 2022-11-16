<template>
  <div>
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      router
      :collapse="isCollapse"
      :default-active="activeMenu"
      @select="handleSelect"
      class="menu-box"
    >
      <!-- 遍历菜单 -->
      <template v-for="item in menuList">
        <template v-if="!item.extra">
          <template v-if="item.children && !item.meta.hidden">
            <!-- 含有子菜单 -->
            <el-submenu :index="item.path" :key="item.path">
              <template slot="title">
                <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                <span slot="title">{{ item.meta.title }}</span>
              </template>
              <!--递归调用-->
              <menu-list v-if="item.children && !item.meta.hidden" :menuList="item.children"></menu-list>
            </el-submenu>
          </template>
          <!-- 第一层 不含子菜单  -->
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path">
              <i v-if="item.meta.icon" :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import MenuList from "./MenuList";
import { mapGetters } from "vuex";
export default {
  components: {
    MenuList
  },
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      currentMenu: ""
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        const activeRouter = {
          name: to.path,
          title: to.meta.title
        };
        this.$store.dispatch(
          "handleActiveMenu",
          to.path == "/home" ? "/" : to.path
        );
        this.$store.dispatch("handleActiveTag", activeRouter);
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters(["isCollapse", "activeMenu"])
  },
  methods: {
    handleSelect(currentPath) {
      this.$store.dispatch("handleActiveMenu", currentPath);
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .el-menu-item,
.el-submenu {
  text-align: left;
  min-width: 0;
  i {
    width: 20px;
  }
}
::v-deep .el-menu-item {
  height: 50px;
  line-height: 50px;
  width: 199px;
}
::v-deep .el-submenu__title {
  height: 50px;
  line-height: 50px;
}
.menu-box {
  height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>