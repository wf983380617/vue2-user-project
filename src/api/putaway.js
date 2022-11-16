import request from "../request/index";

/**
 *
 * 查询上架记录
 */

 export function findUpList(params) {
  return request({
    url: "/operaterecord/findUpShelfRecord",
    method: "get",
    params: params,
  });
}

/**
 *
 * 查询下架记录
 */

 export function findDownList(params) {
  return request({
    url: "/operaterecord/findDownShelfRecord",
    method: "get",
    params: params,
  });
}

/**
 *
 * 上下架明细
 */

 export function findDetailed(params) {
  return request({
    url: "/operaterecord/findShelfInfoList",
    method: "get",
    params: params,
  });
}
