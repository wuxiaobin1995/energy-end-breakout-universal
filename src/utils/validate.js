/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2021-09-08 15:43:05
 * @Description : 全局公共验证方法
 */

/**
 * @description: 验证用户名
 * @param {String} value
 * @return {Boolean}
 */
export function validateUserName(value) {
  // 4到16位（字母，数字，下划线，减号）
  const reg = /^[a-zA-Z0-9_-]{4,16}$/
  return reg.test(value)
}

/**
 * @description: 验证密码
 * @param {String} value
 * @return {Boolean}
 */
export function validatePassword(value) {
  // 4到16位（字母，数字，下划线）
  const reg = /^[a-zA-Z0-9_]{4,16}$/
  return reg.test(value)
}

/**
 * @description: 匹配n个纯数字
 * @param {String} value
 * @return {Boolean}
 */
export function validateOnlyNumber(value) {
  const reg = /^\d{1,}$/
  return reg.test(value)
}
