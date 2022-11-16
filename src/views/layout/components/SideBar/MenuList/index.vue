<template>
  <div>
    <template v-for="item in menuList">
      <template v-if="item.children && !item.meta.hidden">
        <!-- 第二层 含有子菜单菜单 -->
        <el-submenu v-if="!item.meta.hidden" :index="item.path" :key="item.path">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <!--递归调用-->
          <menu-list v-if="item.children && !item.meta.hidden" :menuList="item.children"></menu-list>
        </el-submenu>
      </template>
      <!-- 第二层 不含有子菜单菜单 -->
      <template v-else>
        <el-menu-item v-if="!item.meta.hidden"  :index="item.path" :key="item.path">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name:'menu-list',
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
</style>