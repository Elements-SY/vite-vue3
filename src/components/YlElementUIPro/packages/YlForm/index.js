import YlForm from "./src/index.vue";

YlForm.install = function (Vue) {
  Vue.component(YlForm.name, YlForm);
};

export default YlForm;
