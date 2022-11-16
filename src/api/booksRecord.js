import request from "../request/index";

/**
 *
 * 查询图书操作日志
 */

 export function BookregList(params) {
  return request({
    url: "/operaterecord/findBookRegRecord",
    method: "get",
    params: params,
  });
}
