import echarts from "../../src/utils/echarts";
import EchartsBar from "./EchartsBar";
const components = [EchartsBar];
const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name || "", component);
  });
  Vue.prototype.$echarts = echarts;
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  name: "Echarts",
  version: "1.0.0",
  install,
  EchartsBar,
};
