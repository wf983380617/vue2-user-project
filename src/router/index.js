export const commonRoutes = [
  {
    path: "/login",
    extra: true,
    component: () => import("../views/login/index"),
  },
  {
    path: "*",
    extra: true,
    component: () => import("../views/error/index"),
  },
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    meta: {
      title: "首页",
      icon: "el-icon-s-home",
      hidden: true,
    },
    component: () => import("../views/layout/index"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页",
          hidden: false,
          icon: "el-icon-s-home",
        },
        component: () => import("../views/home/index"),
      },
    ],
  },
];
export const permissionRoutes = [
  {
    path: "/testComponents",
    name: "layout",
    redirect: "/testComponents1",
    meta: {
      title: "测试组件",
      icon: "el-icon-s-home",
      hidden: false,
    },
    component: () => import("../views/layout/index"),
    children: [
      {
        path: "/testComponents1",
        name: "testComponents1",
        meta: {
          title: "测试组件1",
          hidden: false,
          icon: "el-icon-s-home",
        },
        component: () => import("../views/test/index"),
      },
      {
        path: "/testComponents2",
        name: "testComponents2",
        meta: {
          title: "测试组件2",
          hidden: false,
          icon: "el-icon-s-home",
        },
        component: () => import("../views/test1/index"),
      },
      {
        path: "/testComponents3",
        name: "testComponents3",
        meta: {
          title: "测试组件3",
          hidden: false,
          icon: "el-icon-s-home",
        },
        component: () => import("../views/test3/index"),
      },
    ],
  },
];
