<template>
  <div ref="barEcharts" class="yl-echarts-container bar-echarts"></div>
</template>
<script>
import { optionBar } from "./optionConfig";
export default {
  name: "EchartsBar",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 初始化echarts实例
    const myChart = this.$echarts.init(this.$refs.barEcharts);
    console.log(myChart);
    // 绘制图表
    myChart.setOption(optionBar);
  },
  methods: {},
};
</script>
<style lang="scss">
.yl-echarts-container {
  height: 200px;
}
</style>
