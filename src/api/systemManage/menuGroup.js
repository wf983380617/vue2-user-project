import request from "@/request/index";

/**
 *
 * 查询菜单组列表
 */

export function getMenuGroupList(data) {
  return request({
    url: "/group/findGroupList",
    method: "get",
    params: data,
  });
}

/**
 *
 * 添加菜单组
 */

 export function addGroup(data) {
  return request({
    url: "/group/addGroup",
    method: "post",
    data: data,
  });
}
/**
 *
 * 编辑菜单组
 */

 export function updateGroup(data) {
  return request({
    url: "/group/updateGroup",
    method: "post",
    data: data,
  });
}
/**
 *
 * 删除菜单组
 */

 export function deleteGroup(data) {
  return request({
    url: "/group/deleteGroup",
    method: "post",
    data: data,
  });
}
/**
 *
 * 查询菜单树
 */

 export function getMenuTreeList(data) {
  return request({
    url: "/group/findAllMeunuList",
    method: "get",
    params: data,
  });
}

/**
 *
 * 菜单组绑定菜单树
 */

 export function addGroupMenu(data) {
  return request({
    url: "/group/addGroupMenu",
    method: "post",
    data: data,
  });
}

/**
 *
 * 用户下拉框查询菜单组列表
 */

 export function findGroupSelectList() {
  return request({
    url: "/group/findGroupSelectList",
    method: "get",
  });
}