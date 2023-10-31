/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
/**
 * @author SunYu
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result, data;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, data);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    data = args; // 把实参作为防抖回调函数的返回值
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
/**
 * Array Json去重 & 排序
 * @author SunYu
 * @param {Array} arr
 * @param {string || Object} keys
 * @description 对数组中指定的JSON字段去重和指定的字段进行排序
 * @example
 * 当指定一个字段去重时：removeDuplicates(arr, "name")
 * 当指定一个字段去重并且排序如下：
 * removeDuplicates(res.data.list, {
 *    duplicate: "name", // 去重字段
 *    sortType: "Number", // 排序类型
 *    sortAttr: "id", // 排序字段
 * })
 */
export function removeDuplicates(arr, keys) {
  let duplicate, dateTime;
  if (typeof keys == "object") {
    duplicate = keys.duplicate;
    dateTime = keys.dateTime;
  }
  // 去重
  let map = new Map();
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (
      !map.has(item[duplicate]) ||
      new Date(map.get(item[duplicate])[dateTime]) < new Date(item[dateTime])
    ) {
      map.set(item[duplicate], item);
    }
  }
  const result = Array.from(map.values());
  // 返回去重结果
  if (typeof keys == "string") return result;
  // 排序
  if (typeof keys == "object") {
    if (keys.sort) {
      if (keys.sortType.toLowerCase().trim() == "number") {
        if (result.length) {
          result = sortFn();
        }
        // 返回排序去重结果
      }
    }
    return result;
  }
  // 排序方法
  function sortFn() {
    if (isNaN(Number(result[0][keys.sortAttr]))) {
      return result.sort((a, b) =>
        a[keys.sortAttr].localeCompare(b[keys.sortAttr])
      ); // 按字母排序
    } else {
      return result.sort((a, b) => a[keys.sortAttr] - b[keys.sortAttr]); // 按数字排序
    }
  }
}
/**
 * Array Json
 * @author SunYu
 * @param {Array} arr
 * @param {string} key
 * @description 把所有重复的过滤出来
 * @example
 * filterRepeat(arr, "name")
 */
export function filterRepeat(arr, key) {
  const newArr = arr
    .map((item) => item[key])
    .filter((key, index, array) => array.indexOf(key) !== index);

  return arr.filter((item) => newArr.includes(item[key]));
}
/**
 * Array Json
 * @author SunYu
 * @param {Array} arr
 * @param {string} key
 * @param {string} time
 * @description 把数组JSON字段重复的值过滤出来，并且根据时间戳返回最新的那一条且返回新的数组
 * @example
 * filterRepeatNewData(arr, "name", "createTime")
 */
export function filterRepeatNewData(arr, key, time) {
  // 找出最大时间戳
  const maxDate = filterRepeat(arr, key).reduce(
    (max, obj) =>
      new Date(obj[time]).getTime() > max ? new Date(obj[time]).getTime() : max,
    -Infinity
  );
  // 找出最大时间戳对应的数据并且返回新的数组
  const result = filterRepeat(arr, key).filter(
    (obj) => new Date(obj[time]).getTime() === maxDate
  );
  return result;
}
/*
  form表单组件&table组件
  日期组件时间限制;
  上传组件，压缩&切片下载;
  Vue2/Vue3 + Element UI & ElementPlug;
  推到 npm上
  npm run dev 本地预览
  npm run build 本地打包
  npm run build:prod 打包生产
  npm run build:ui-npm 打包UI组件到npm上
  npm run build:plugins-npm 打包JS方法到npm上
  只要是打包到npm 上同时也会更新发布到github上

  使用批量导入文件，然后弄一个数组，筛选需要的。
  再弄一个节流阀，是否启用筛选模式，如果不启用筛选模式就代表统统引入;
*/
