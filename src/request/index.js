import axios from "axios";
import { Message } from "element-ui";
const BASE_URL = "/api";

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method == "post") {
      if (config.data) {
        config.data.userId = sessionStorage.getItem("userId")
          ? sessionStorage.getItem("userId")
          : "";
      }
    } else {
      if (config.params) {
        config.params.userId = sessionStorage.getItem("userId")
          ? sessionStorage.getItem("userId")
          : "";
      } else {
        config.params = {
          userId: sessionStorage.getItem("userId")
            ? sessionStorage.getItem("userId")
            : "",
        };
      }
    }
    if (!config.noToken) {
      config.headers["Authorization"] = `${sessionStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      if (response.data.code == 200) {
        // Message.success({
        //   message: "操作成功",
        //   duration: 1500,
        // });
        return Promise.resolve(response.data);
      } else if (response.data.code == 504) {
        Message.error({
          message: response.data.msg,
          duration: 1500,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 300);
        sessionStorage.clear();
        return Promise.resolve(response.data);
      } else {
        Message.error({
          message: response.data.msg,
          duration: 1500,
        });
        return Promise.resolve(response.data);
      }
    } else if (response.status == 401) {
      Message.error({
        message: "授权登录失败",
        duration: 1500,
      });
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    console.log(error);
    Message.error({
      message: "系统开小差了",
      duration: 1500,
    });
    return Promise.reject(error);
  }
);
export default service;
