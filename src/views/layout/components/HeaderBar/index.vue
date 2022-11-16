<template>
  <div class="header-container">
    <div class="header-box">
      <div class="header-left">
        <i class="el-icon-s-fold" style="margin-right: 15px" @click="handleToggle"></i>
        <div class="breadcrumb">{{breadcrumb}}</div>
      </div>
      <div>
        <el-popconfirm
          icon="el-icon-info"
          icon-color="red"
          title="确定退出登录吗？"
          @confirm="handleLogout"
        >
          <div slot="reference" style="cursor: pointer;display:flex;align-items:center">
            <i class="el-icon-user" style="margin-right: 6px;color:#409EFF;font-size:16px"></i>
            <span>{{ userName || 'admin'}}</span>
          </div>
        </el-popconfirm>
      </div>
    </div>
    <div class="header-tag">
      <el-tabs
        v-model="activeTagName"
        type="card"
        @tab-remove="removeTab"
        stretchs
        @tab-click="tabClick"
      >
        <el-tab-pane
          v-for="item in tableTabsList"
          :closable="item.name == '/home' ? false : true"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { loginOut } from "@/api/index";
export default {
  data() {
    return {
      activeTagName: "",
      breadcrumb: "",
      userName: sessionStorage.getItem("userId")
    };
  },
  computed: {
    ...mapGetters(["tableTabsList", "activeTag"])
  },
  watch: {
    activeTag: {
      handler(newVal, oldVal) {
        this.activeTagName = newVal.name;
        this.breadcrumb = newVal.title;
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    async handleLogout() {
      const that = this;
      that.$message.success("退出成功");
      sessionStorage.clear();
      sessionStorage.removeItem("tableTabsList");
      that.$router.replace({ path: "/login" });
    },
    handleToggle() {
      this.$store.dispatch(
        "handleCollapse",
        String(!this.$store.getters.isCollapse)
      );
    },
    tabClick(e) {
      this.$router.push({
        path: e.name
      });
      this.$store.dispatch(
        "handleActiveMenu",
        e.name == "/home" ? "/" : e.name
      );
    },
    removeTab(targetName) {
      let tabs = this.tableTabsList;
      let activeName = this.activeTagName;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
              this.$router.push({
                path: nextTab.name
              });
              this.$store.dispatch(
                "handleActiveMenu",
                nextTab.name == "/home" ? "/" : nextTab.name
              );
              this.$store.dispatch("handleActiveTag", {
                name: nextTab.name,
                title: nextTab.title
              });
            }
          }
        });
      }
      this.$store.dispatch(
        "removeActiveTag",
        tabs.filter(tab => tab.name !== targetName)
      );
      this.activeTagName = activeName;
    }
  }
};
</script>
<style lang="scss" scoped>
.header-box {
  height: 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  .header-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .breadcrumb {
      font-size: 14px;
    }
  }
}
</style>