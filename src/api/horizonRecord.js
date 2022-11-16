import request from "../request/index";

/**
 *
 * 查询层位操作日志
 */

 export function PositionList(params) {
  return request({
    url: "/operaterecord/findPositionRegRecord",
    method: "get",
    params: params,
  });
}
