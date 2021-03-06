/*
 * @Author: Tan Xuan
 * @Date: 2020-10-28 16:58:10
 * @LastEditTime: 2020-10-30 18:51:50
 * @LastEditors: Tan Xuan
 * @Description: 格式化相关
 */

/**
 * 金额格式化
 * @param {number|string} price 金额
 * @param {number} length 保留小数位 max = 4, 最多保留4位小数位
 * @returns {string} 格式化好的字符串
 * eg.  parseFormatNum("123456",1); 结果为：123,456.0
 */
export function formatPrice(price, len = 0) {
  const reg = /(\d)(?=(\d{3})+\.)/g;
  const num = len === 0 || len === 5 ? 2 : 1;
  return price
    .toFixed(len + 1)
    .replace(reg, '$1,')
    .slice(0, -num);
}

/**
 * 阿拉伯数字转换成大写汉字
 * @param {number} money 正整数
 * @param {boolean} needI 是否需要 '整' 字分隔
 * @param {boolean} needY 是否需要 '圆'
 * @returns 大写的整数
 */
export function formatNumberToChina(money, needI = true, needY = true) {
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟'];
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆'];
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘'];
  // 整数金额时后面跟的字符
  let cnInteger = needI ? '整' : '';
  // 整型完以后的单位
  let cnIntLast = needY ? '圆' : '';
  // 最大处理的数字
  let maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  if (money === '') {
    return '';
  }
  let curMoney = parseFloat(money);
  if (curMoney >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (curMoney === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  curMoney = curMoney.toString();
  if (curMoney.indexOf('.') === -1) {
    integerNum = curMoney;
    decimalNum = '';
  } else {
    parts = curMoney.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n === '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum === '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

/**
 * 将银行卡号格式化
 * @param {string} value 银行卡号码
 * @returns 格式化的银行卡号码
 */
export function formatBankNumber(value) {
  return value
    .replace(/\s/g, '')
    .replace(/[^\d]/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ');
}
