import request from "../request/index";

/**
 *
 * 查询登录日志
 */

 export function findlogList(params) {
  return request({
    url: "/loginlog/findlogList",
    method: "get",
    params: params,
  });
}