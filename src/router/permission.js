import VueRouter from "vue-router";
import Vue from "vue";
import { commonRoutes, permissionRoutes } from "./index";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
// import { hiddenRouter } from "./hiddenRouter";
console.log("NODE_ENV:", process.env.NODE_ENV);
const router = new VueRouter({
  mode: "hash",
  base: process.env.VUE_APP_BASE_API,
  routes: [...commonRoutes, ...permissionRoutes],
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
});
Vue.use(VueRouter);
//解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  // 判断是否有userId
  NProgress.start();
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    if (to.path == "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    // 没有userId
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
  // next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
