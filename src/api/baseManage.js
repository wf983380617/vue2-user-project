import request from "../request/index";

/**
 *
 * 查询层位树
 */

export function getTreeList() {
  return request({
    url: "/area/findAreaList",
    method: "get",
  });
}

/**
 *
 * 根据树id分页查询层位列表
 */

export function getFloorList(params) {
  return request({
    url: "/position/findPositionList",
    method: "get",
    params: params,
  });
}
/**
 *
 * 添加树节点
 */

 export function addTreeNode(data) {
  return request({
    url: "/area/addArea",
    method: "post",
    data: data,
  });
}
/**
 *
 * 修改树节点
 */

 export function editTreeNode(data) {
  return request({
    url: "/area/updateArea",
    method: "post",
    data: data,
  });
}

/**
 *
 * 删除树节点
 */

 export function delTreeNode(data) {
  return request({
    url: "/area/deleteArea",
    method: "post",
    data: data,
  });
}
/**
 *
 * 新增层位
 */

 export function createFloor(data) {
  return request({
    url: "/position/addPosition",
    method: "post",
    data: data,
  });
}

/**
 *
 * 删除层位
 */

 export function deleteFloor(data) {
  return request({
    url: "/position/deletePosition",
    method: "post",
    data: data,
  });
}