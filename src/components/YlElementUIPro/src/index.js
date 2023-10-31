import YlForm from "../packages/YlForm/index.js";
import YlTable from "../packages/YlTable/index.js";
// import YlEcharts from "../packages/YlEcharts/index.js";
const components = [YlForm, YlTable];
const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name || "", component);
  });
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  name: "ElementUIPro",
  version: "1.0.0",
  install,
  YlForm,
  YlTable,
};
