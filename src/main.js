import Vue from "vue";
import App from "./App.vue";
import router from "./router/permission";
import ElementUI from "element-ui"; //全局引入element
import "element-ui/lib/theme-chalk/index.css"; //全局引入element的样式
// 阿里图标库
import "@/assets/iconfont/iconfont.css";
import store from "./store";
import axios from "axios";
import lodash from "lodash";
import md5 from "js-md5";
Vue.prototype.$md5 = md5;
Vue.prototype.axios = axios;
Vue.prototype.$store = store;
Vue.config.productionTip = false;
Vue.prototype.$lodash = lodash;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
