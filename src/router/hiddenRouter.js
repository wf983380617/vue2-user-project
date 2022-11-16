export const hiddenRouter = [
  {
    path: "/detailPage",
    name: "layout",
    redirect: "/floorDetail",
    extra: true,
    meta: {
      title: "详情/编辑页",
    },
    component: () => import("../views/layout/index"),
    children: [
      {
        path: "/floorDetail/:id",
        name: "floorDetail",
        meta: {
          title: "层位详情",
        },
        component: () => import("../views/baseManage/floorDetail/index"),
      },
      {
        path: "/bookDetail/:id",
        name: "bookDetail",
        meta: {
          title: "图书详情",
        },
        component: () => import("../views/baseManage/bookDetail/index.vue"),
      },
    ],
  },
];
