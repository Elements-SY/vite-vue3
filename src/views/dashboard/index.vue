<template>
  <div class="dashboard-container">
    <github-corner class="github-corner" />

    <!-- 数据 -->
    <el-row :gutter="40" class="card-panel__col">
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="uv" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">访问数</div>
            <div class="card-panel-num">1000</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">消息数</div>
            <div class="card-panel-num">1000</div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">收入金额</div>
            <div class="card-panel-num">1000</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" class="card-panel__col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="shopping" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">订单数</div>
            <div class="card-panel-num">1000</div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 项目 + 团队成员介绍 -->
    <el-row :gutter="40">
      <!-- 项目介绍 -->
      <el-col :md="12" :lg="12" class="card-panel__col">
        <Project />
      </el-col>

      <!-- 团队介绍 -->
      <el-col :md="12" :lg="12" class="card-panel__col">
        <Team />
      </el-col>
    </el-row>

    <!-- Echarts 图表 -->
    <el-row :gutter="40" style="margin-top: 20px">
      <el-col :sm="24" :lg="8" class="card-panel__col">
        <BarChart
          id="barChart"
          height="400px"
          width="100%"
          class="chart-container"
        />
      </el-col>

      <el-col :xs="24" :sm="12" :lg="8" class="card-panel__col">
        <PieChart
          id="pieChart"
          height="400px"
          width="100%"
          class="chart-container"
        />
      </el-col>

      <el-col :xs="24" :sm="12" :lg="8" class="card-panel__col">
        <RadarChart
          id="radarChart"
          height="400px"
          width="100%"
          class="chart-container"
        />
      </el-col>
    </el-row>
        <el-row>
      <el-col>
        <yl-form
          ref="ruleForm"
          :formConfig="formConfig"
          :queryForm="queryForm"
          :inline="false"
          formWidth="auto"
          @blur="blurEvent"
        />
      </el-col>
    </el-row>
    <yl-table
      ref="ylTable"
      :attrs="tableAttr"
      :loadingTable="tableAttr.loadingTable"
      :columns="columns"
      :tableData="tableData"
      :pageConfig="pageConfig"
      @search="searchBtn"
      @add="addBtn"
      @delete="deleteData"
      @sizeChange="handleSizeChange"
      @currentChange="handleCurrentChange"
      @selectionEvent="tableSelectionChange"
    >
    </yl-table>
  </div>
</template>
<script lang="ts">
export default { name: 'Dashboard' };
</script>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs, watch, nextTick } from 'vue';
// 组件引用
import GithubCorner from '@/components/GithubCorner/index.vue';
import SvgIcon from '@/components/SvgIcon/index.vue';

import BarChart from './components/Chart/BarChart.vue';
import PieChart from './components/Chart/PieChart.vue';
import RadarChart from './components/Chart/RadarChart.vue';

import Project from './components/Project/index.vue';
import Team from './components/Team/index.vue';
import { formConfig } from "./formConfig";
import { tableAttr, columnHeader } from "./tableConfig";
import { tableData } from "./tableDate";
console.log(columnHeader())
const state = reactive({
      formConfig: formConfig, // 表单配置项
      queryForm: {
        // 表单参数
        status: "有效",
      },
      pageConfig: {
        // 分页配置项
        isPagination: true,
        total: 0,
        pageData: {
          page: 1,
          size: 10,
        },
      },
      tableAttr: tableAttr, // table配置项
      columns: columnHeader(
        indexAdd,
        viewRow,
        editRow,
        deleteRow
      ), // 表头
      tableData: [], // 表格数据
})
  nextTick(() => {
    getTableData();
  });
    // 请求数据
   function getTableData() {
      setTimeout(() => {
        state.tableData = tableData;
        state.pageConfig.total = tableData.length;
      }, 1000);
    }
    // input输入框失焦事件
    function blurEvent(item) {
      console.log(`input输入框失焦事件`);
    }
    // 搜索
    function searchBtn(row) {
      console.log("搜索：", state.queryForm);
      getTableData();
    }
    // 添加
    function addBtn(row) {
      console.log("添加：", row);
    }
    // 勾选删除
    function deleteData(row) {
      console.log("勾选删除：", row);
    }
    // 条数变化
    function handleSizeChange(row) {
      console.log("条数变化：", row);
    }
    // 页码变化
    function handleCurrentChange(row) {
      console.log("页码变化：", row);
    }
    // table勾选
    function tableSelectionChange(row) {
      console.log("已勾选：", row);
    }
    // 翻页序号递增
    function indexAdd(index) {
      const page = state.pageConfig.pageData.page; // 当前页码
      const pagesize = state.pageConfig.pageData.size; // 每页条数
      return index + 1 + (page - 1) * pagesize;
    }
    // 查看详情
    function viewRow(row) {
      console.log("查看详情：", row);
    }
    // 编辑
    function editRow(row) {
      console.log("编辑：", row);
    }
    // 单行删除
    function deleteRow(row) {
      console.log("单行删除：", row);
    }
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 24px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
    z-index: 99;
  }

  .box-center {
    margin: 0 auto;
    display: table;
  }

  .user-profile {
    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .card-panel__col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-user {
        background: #e77541;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-message {
      color: #36a3f7;
      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-money {
      color: #f4516c;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .icon-shopping {
      color: #34bfa3;

      .svg-icon {
        width: 4em !important;
        height: 4em !important;
      }
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px 20px 0;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
        text-align: right;
      }
    }
  }

  .chart-container {
    background: #ffffff;
  }
}
</style>
