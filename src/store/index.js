/*
 * @Author      : Mr.bin
 * @Date        : 2021-09-08 10:43:09
 * @LastEditTime: 2021-09-08 15:43:44
 * @Description : Vuex
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 运动数据
    recordData: {
      speedDataArray: [], // 瞬时速度数组[cm/s]
      distanceDataArray: [], // 瞬时位移数组[mm]
      powerDataArray: [], // 瞬时功率数组[W]
      maxPower: 0, // 峰值功率[W]
      maxSpeed: 0, // 峰值速度[m/s]
      averagePower: 0, // 平均功率[W]
      averageSpeed: 0 // 平均速度[m/s]
    }
  },
  mutations: {
    // 运动数据
    CHANGE_RECORDDATA(state, newRecordData) {
      state.recordData = newRecordData
    }
  },
  actions: {
    // 运动数据
    changeRecordData({ commit }, newRecordData) {
      return new Promise((resolve, reject) => {
        commit('CHANGE_RECORDDATA', newRecordData)
        resolve()
      })
    }
  }
})
