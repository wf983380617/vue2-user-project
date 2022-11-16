import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  getters: {
    // 判断菜单是否折叠
    isCollapse: (state) => {
      return state.isCollapse == "true" ? true : false;
    },
    // 选中的菜单
    activeMenu: (state) => state.activeMenu,
    // 标签列表
    tableTabsList: (state) => state.tableTabsList,
    // 选中的标签
    activeTag: (state) => state.activeTag,
  },
  state: {
    isCollapse: sessionStorage.getItem("isCollapse")
      ? sessionStorage.getItem("isCollapse")
      : "false",
    tableTabsList: sessionStorage.getItem("tableTabsList")
      ? JSON.parse(sessionStorage.getItem("tableTabsList"))
      : [
          {
            title: "首页",
            name: "/home",
          },
        ],
    activeMenu: sessionStorage.getItem("activeMenu")
      ? sessionStorage.getItem("activeMenu")
      : "/",
    activeTag: sessionStorage.getItem("activeTag")
      ? sessionStorage.getItem("activeTag")
      : "/",
  },
  mutations: {
    IS_COLLAPSE(state, isCollapse) {
      sessionStorage.setItem("isCollapse", isCollapse);
      state.isCollapse = isCollapse;
    },
    // 顶部标签
    ACTIVE_TAG(state, activeRouter) {
      sessionStorage.setItem("activeTag", activeRouter);
      state.activeTag = activeRouter;
      const hasTag = state.tableTabsList.some(
        (item) => item.name === activeRouter.name
      );
      if (!hasTag) {
        state.tableTabsList.push(activeRouter);
      }
      sessionStorage.setItem(
        "tableTabsList",
        JSON.stringify(state.tableTabsList)
      );
    },
    ACTIVE_MENU(state, activeMenu) {
      sessionStorage.setItem("activeMenu", activeMenu);
      state.activeMenu = activeMenu;
    },
    REMOVE_TAG(state, tabList) {
      sessionStorage.setItem(
        "tableTabsList",
        JSON.stringify(tabList)
      );
      state.tableTabsList = tabList;
    },
  },
  actions: {
    handleCollapse({ commit }, isCollapse) {
      commit("IS_COLLAPSE", isCollapse);
    },
    handleActiveTag({ commit }, activeRouter) {
      commit("ACTIVE_TAG", activeRouter);
    },
    handleActiveMenu({ commit }, activeMenu) {
      commit("ACTIVE_MENU", activeMenu);
    },
    removeActiveTag({ commit }, tabList) {
      commit("REMOVE_TAG", tabList);
    },
  },
});
