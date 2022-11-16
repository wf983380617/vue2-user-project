import request from "../request/index";

/**
 *
 * 查询倒架记录
 */

 export function findMoveList(params) {
  return request({
    url: "/operaterecord/findMoveShelfRecord",
    method: "get",
    params: params,
  });
}

/**
 *
 * 倒架明细
 */

 export function shelfInfoList(params) {
  return request({
    url: "/operaterecord/findMoveShelfInfoList",
    method: "get",
    params: params,
  });
}