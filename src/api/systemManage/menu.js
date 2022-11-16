import request from "@/request/index";

/**
 *
 * 查询菜单树
 */

export function findMenuList() {
  return request({
    url: "/menu/findMenuList",
    method: "get",
  });
}
/**
 *
 * 新增菜单
 */

export function addMenu(data) {
  return request({
    url: "/menu/addMenu",
    method: "post",
    data: data,
  });
}

/**
 *
 * 菜单详情
 */

 export function findMenuInfo(data) {
  return request({
    url: "/menu/findMenuInfo",
    method: "get",
    params: data,
  });
}

/**
 *
 * 编辑菜单
 */

 export function updateMenu(data) {
  return request({
    url: "/menu/updateMenu",
    method: "post",
    data: data,
  });
}

/**
 *
 * 删除菜单
 */

 export function deleteMenu(data) {
  return request({
    url: "/menu/deleteMenu",
    method: "post",
    data: data,
  });
}
