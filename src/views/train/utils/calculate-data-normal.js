/*
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:07
 * @LastEditTime: 2020-09-23 14:31:13
 * @Description : 数据计算方法
 */

import moment from 'moment'

/**
 * @description: 向上运动
 * @param {Array} speedDataArray 速度数据
 * @param {Array} distanceDataArray 位移数据
 * @param {Number} trainWeight 最终负重
 * @return: {Object}
 */
export function calculateData(
  speedDataArray,
  distanceDataArray,
  trainWeight = 1
) {
  /* 该次数据记录的时间[s] */
  const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')

  /* 相对位移值[mm] */
  const relativeDistance = parseFloat(
    Math.abs(
      Math.max.apply(null, distanceDataArray) -
        Math.min.apply(null, distanceDataArray)
    )
  )

  /* 平均功率[W] */
  let averagePower = 0
  if (speedDataArray.length === 0) {
    averagePower = 0
  } else {
    averagePower = parseFloat(
      (
        (trainWeight * 10 * relativeDistance * 0.001) /
        (speedDataArray.length * 0.1)
      ).toFixed(1)
    )
  }

  /* 峰值功率[W] */
  const powerDataArray = [] // 瞬时功率数组
  speedDataArray.forEach(v => {
    powerDataArray.push(parseFloat((trainWeight * 10 * v * 0.01).toFixed(1)))
  })
  const maxPower = parseFloat(
    (trainWeight * 10 * Math.max.apply(null, speedDataArray) * 0.01).toFixed(1)
  )

  /* 平均速度[m/s] */
  let averageSpeed = 0
  if (speedDataArray.length === 0) {
    averageSpeed = 0
  } else {
    let sumSpeed = 0
    speedDataArray.forEach(v => {
      sumSpeed += v
    })
    averageSpeed = parseFloat(
      ((sumSpeed / speedDataArray.length) * 0.01).toFixed(2)
    )
  }

  /* 峰值速度[m/s] */
  const maxSpeed = parseFloat(
    (Math.max.apply(null, speedDataArray) * 0.01).toFixed(2)
  )

  /* 返回计算结果 */
  return {
    currentTime,
    relativeDistance,
    maxPower,
    maxSpeed,
    averagePower,
    averageSpeed,
    powerDataArray
  }
}
