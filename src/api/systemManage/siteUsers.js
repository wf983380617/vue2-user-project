import request from "@/request/index";

/**
 *
 * 查询组织树
 */

export function findOrgList() {
  return request({
    url: "/org/findOrgList",
    method: "get",
  });
}

/**
 *
 * 新增组织
 */

export function addOrg(data) {
  return request({
    url: "/org/addOrg",
    method: "post",
    data: data,
  });
}

/**
 *
 * 编辑组织
 */

export function updateOrg(data) {
  return request({
    url: "/org/updateOrg",
    method: "post",
    data: data,
  });
}

/**
 *
 * 删除组织
 */

export function deleteOrg(data) {
  return request({
    url: "/org/deleteOrg",
    method: "post",
    data: data,
  });
}

/**
 *
 * 根据组织Id查询用户列表
 */

export function findUserListByOrg(data) {
  return request({
    url: "/api/user/findUserList",
    method: "get",
    params: data,
  });
}

/**
 *
 * 新增用户
 */

export function addUser(data) {
  return request({
    url: "/api/user/addUser",
    method: "post",
    data: data,
  });
}
/**
 *
 * 修改用户
 */

export function updateUser(data) {
  return request({
    url: "/api/user/updateUser",
    method: "post",
    data: data,
  });
}

/**
 *
 * 删除用户
 */

export function deleteUser(data) {
  return request({
    url: "/api/user/deleteUser",
    method: "post",
    data: data,
  });
}

/**
 *
 * 停用/启用用户
 */

export function updateUserLock(data) {
  return request({
    url: "/api/user/updateUserLock",
    method: "post",
    data: data,
  });
}

/**
 *
 * 修改用户密码
 */

export function updatePassword(data) {
  return request({
    url: "/api/user/updatePassword",
    method: "post",
    data: data,
  });
}
