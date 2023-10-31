import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { apiList, searchWord } from "./mock.js";
export default {
  init() {
    let mock = new MockAdapter(axios);
    // 模拟成功请求
    mock.onGet("/success").reply(200, {
      msg: "success",
    });
    // 模拟失败请求
    mock.onGet("/error").reply(500, {
      msg: "failure",
    });
    //
    mock.onGet(apiList.city).reply((config) => {
      // 解析axios传过来的数据
      console.log(config.params)
    //   let res = config.params;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
           resolve([200, { code: 200, msg: "获取成功", searchWord }]);
        }, 500);
      });
    });
  },
};
