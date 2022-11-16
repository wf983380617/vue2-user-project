import axios from "axios";
/**
 *导出excel
 */
export const exportExcel = ({ url, method, params, fileName }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      params: params,
      responseType: "blob",
    })
      .then((res) => {
        const link = document.createElement("a"); //创建a标签
        let blob = new Blob([res.data]);
        // 兼容不同浏览器的URL对象
        const url = window.URL || window.webkitURL || window.moxURL;
        link.href = url.createObjectURL(blob);
        link.download = fileName; //下载的文件名称
        link.click(); //触发click
        window.URL.revokeObjectURL(url);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
