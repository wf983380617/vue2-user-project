import Vue from "vue";
import Vuex from "vuex";
import { constantRoutes } from "@/router/routers";
import { Ajax } from "@/libs/util";
Vue.use(Vuex);

// 递归遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(routes) {
  let res = [];
  routes.forEach((item) => {
    // 只有一级菜单，没有子菜单时，动态添加父级菜单
    if (item.parentId == 1 && item.children == null) {
      let menu = {
        path: "/" + item.menuUrl.split("/")[1],
        name: item.menuUrl.split("/")[1],
        redirect: item.menuUrl,
        meta: {
          title:
            window.regConfig.system.lang === "zh-cn"
              ? item.menuTitle
              : item.engMenuTitle,
          icon: item.iconUrl ? item.iconUrl : "",
          hidden: true,
        },
        component: () => import(`@/views/layout/layout.vue`),
      };
      menu.children = [
        {
          path: item.menuUrl,
          name: item.menuName,
          meta: {
            title:
              window.regConfig.system.lang === "zh-cn"
                ? item.menuTitle
                : item.engMenuTitle,
            icon: item.iconUrl ? item.iconUrl : "",
            hidden: item.isHidden === 0 ? false : true,
          },
          component: () => import(`@/views${item.componentUrl}`),
        },
      ];
      res.push(menu);
    } else {
      // 有二级菜单时，递归子菜单
      let menu = {
        path: item.menuUrl,
        name: item.menuName,
        meta: {
          title:
            window.regConfig.system.lang === "zh-cn"
              ? item.menuTitle
              : item.engMenuTitle,
          icon: item.iconUrl ? item.iconUrl : "",
          hidden: item.isHidden === 0 ? false : true,
        },
        component: () => import(`@/views${item.componentUrl}`),
      };
      if (item.children) {
        menu.redirect = item.children[0].menuUrl;
        menu.children = filterAsyncRouter(item.children);
      }
      res.push(menu);
    }
  });
  return res;
}

export default new Vuex.Store({
  state: {
    menus: [],
    lang: "",
  },
  mutations: {
    SET_ROUTES(state, routes) {
      let homeRouter = JSON.parse(JSON.stringify(constantRoutes));
      homeRouter.map((item) => {
        if (item.path === "/") {
          if (window.regConfig.system.lang == "zh-cn") {
            item.meta.title = "首页";
            item.children[0].meta.title = "首页";
          } else {
            item.meta.title = "Home";
            item.children[0].meta.title = "Home";
          }
        }
        return item;
      });
      const permissionRoutes = homeRouter.concat(routes);
      state.menus = permissionRoutes;
    },
  },
  actions: {
    // 从后台接口获取路由列表，生成路由
    async GenerateRoutes({ commit }) {
      return new Promise(async (resolve) => {
        const res = await Ajax.Get("/menu/findMenuListByUserId", {
          userId: sessionStorage.getItem('userId'),
        });
        const sdata = JSON.parse(JSON.stringify(res.data.data));
        const accessRoutes = filterAsyncRouter(sdata);
        commit("SET_ROUTES", accessRoutes);
        resolve(accessRoutes);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
});
