import request from "../request/index";

/**
 *
 * 查询盘点记录
 */

 export function inventoryList(params) {
  return request({
    url: "/operaterecord/findcheckRecord",
    method: "get",
    params: params,
  });
}

/**
 *
 * 盘点明细
 */

 export function detailed(params) {
  return request({
    url: "/operaterecord/findCheckInfoList",
    method: "get",
    params: params,
  });
}

/**
 *
 * 保存未盘原因
 */

 export function update(data) {
  return request({
    url: "/operaterecord/updateCheckInfo",
    method: "post",
    data: data,
  });
}