import request from "../request/index";


/**
 * 登录
 */
export function goLogin(data) {
  return request({
    url: "/api/user/login",
    method: "post",
    data: data,
    noToken: true,
  });
}

/**
 * 退出登录 
 */
 export function loginOut(data) {
  return request({
    url: "/api/user/logout",
    method: "post",
    data: data,
  });
}
