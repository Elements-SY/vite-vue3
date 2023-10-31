import YlTable from "./src/index.vue";

YlTable.install = function (Vue) {
  Vue.component(YlTable.name, YlTable);
};

export default YlTable;
