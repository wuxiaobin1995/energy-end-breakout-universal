<!--
 * @Author      : 吴晓斌
 * @Date        : 2020-09-11 16:19:07
 * @LastEditTime: 2021-09-08 17:27:01
 * @Description : LineChart子组件：位移与峰值功率
-->
<template>
  <div class="container">
    <!-- 按钮 -->
    <el-button
      class="btn"
      type="success"
      round
      size="small"
      @click="handleShow"
    >
      {{ isMaxPowerShow ? '切换位移曲线图' : '切换峰值功率图' }}
    </el-button>

    <!-- 图形 -->
    <div
      id="MaxPowerChart"
      ref="MaxPowerChart"
      :style="{ width: '100%', height: '90%' }"
      v-show="isMaxPowerShow"
    />
    <div
      id="DistanceChart"
      ref="DistanceChart"
      :style="{ width: '100%', height: '90%' }"
      v-show="isDistanceShow"
    />
  </div>
</template>

<script>
export default {
  name: 'LineChartOneNormal',

  data() {
    return {
      myChartMaxPower: null,
      myChartDistance: null,
      isMaxPowerShow: true,
      isDistanceShow: true
    }
  },

  mounted() {
    this.initChart().then(() => {
      this.isDistanceShow = false
    })
  },
  beforeDestroy() {
    if (this.myChartDistance) {
      this.myChartDistance.dispose() // 释放位移图表实例，释放后实例不再可用
      this.myChartDistance = null
    } else if (this.myChartMaxPower) {
      this.myChartMaxPower.dispose() // 释放最大功率图表实例，释放后实例不再可用
      this.myChartMaxPower = null
    }
  },

  computed: {
    // 通过Vuex传递值
    recordData() {
      return this.$store.state.recordData
    }
  },

  watch: {
    recordData: {
      handler(newValue, oldValue) {
        /* 位移 */
        let newDistance = []
        if (newValue.distanceDataArray.length !== 0) {
          // 不出现负值
          const minDistance = Math.min.apply(null, newValue.distanceDataArray)
          if (minDistance < 0) {
            for (let i = 0; i < newValue.distanceDataArray.length; i++) {
              newDistance.push(newValue.distanceDataArray[i] - minDistance)
            }
          } else {
            newDistance = newValue.distanceDataArray
          }
        }
        let oldDistance = []
        if (oldValue.distanceDataArray.length !== 0) {
          // 不出现负值
          const minDistance = Math.min.apply(null, oldValue.distanceDataArray)
          if (minDistance < 0) {
            for (let i = 0; i < oldValue.distanceDataArray.length; i++) {
              oldDistance.push(oldValue.distanceDataArray[i] - minDistance)
            }
          } else {
            oldDistance = oldValue.distanceDataArray
          }
        }

        /* x轴 */
        const xAxisData = []
        // 以时间较长者作为x坐标长
        if (
          newValue.distanceDataArray.length >= oldValue.distanceDataArray.length
        ) {
          for (let i = 0; i < newValue.distanceDataArray.length; i++) {
            xAxisData.push((i * 0.1).toFixed(1))
          }
        } else {
          for (let i = 0; i < oldValue.distanceDataArray.length; i++) {
            xAxisData.push((i * 0.1).toFixed(1))
          }
        }

        /* 重新设值，刷新最大功率柱状图图形 */
        this.myChartMaxPower.setOption({
          xAxis: {
            data: []
          },
          series: [
            {
              data: [newValue.maxPower]
            },
            {
              data: [oldValue.maxPower]
            }
          ]
        })

        /* 重新设值，刷新位移曲线图形 */
        this.myChartDistance.setOption({
          xAxis: {
            data: xAxisData
          },
          series: [
            {
              data: newDistance
            },
            {
              data: oldDistance
            }
          ]
        })
      },
      deep: true
    }
  },

  methods: {
    /**
     * @description: echarts配置项
     */
    initChart() {
      return new Promise((resolve, reject) => {
        /* 最大功率 */
        this.myChartMaxPower = this.$echarts.init(
          document.getElementById('MaxPowerChart')
        )
        this.myChartMaxPower.setOption({
          /* 标题栏。包含主标题和副标题 */
          title: {
            text: '峰值功率柱状图', // 主标题
            subtext: '峰值功率[W]' // 副标题
          },
          /* 图例。展现了不同系列的标记(symbol)，颜色和名字 */
          legend: {
            data: ['新功率', '旧功率']
          },
          /* 直角坐标系 grid 中的 x 轴 */
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          /* 直角坐标系 grid 中的 y 轴 */
          yAxis: [
            {
              type: 'value'
            }
          ],
          /* 系列列表。每个系列通过 type 决定自己的图表类型 */
          series: [
            {
              name: '新功率',
              type: 'bar',
              label: {
                show: true,
                fontSize: 30
              },
              data: []
            },
            {
              name: '旧功率',
              type: 'bar',
              label: {
                show: true,
                fontSize: 30
              },
              data: []
            }
          ],
          /* 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具 */
          toolbox: {
            show: true,
            feature: {
              // 导出图片
              saveAsImage: {
                name: `最大功率图_${this.$moment().format('YYYY-MM-DD')}`
              },
              restore: {} // 重置
            }
          },
          /* 是否开启动画效果 */
          animation: true
        })

        /* 位移 */
        this.myChartDistance = this.$echarts.init(
          document.getElementById('DistanceChart')
        )
        this.myChartDistance.setOption({
          /* 标题栏。包含主标题和副标题 */
          title: {
            text: '位移曲线图', // 主标题
            subtext: '位移[mm]' // 副标题
          },
          /* 提示框 */
          tooltip: {
            trigger: 'axis' // 触发类型：坐标轴触发
          },
          /* 图例。展现了不同系列的标记(symbol)，颜色和名字 */
          legend: {
            data: ['新位移曲线', '旧位移曲线']
          },
          /* 直角坐标系 grid 中的 x 轴 */
          xAxis: [
            {
              name: 't/s',
              type: 'category',
              boundaryGap: false,
              data: []
            }
          ],
          /* 直角坐标系 grid 中的 y 轴 */
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          /* 系列列表。每个系列通过 type 决定自己的图表类型 */
          series: [
            {
              name: '新位移曲线',
              type: 'line',
              smooth: true,
              areaStyle: {},
              markPoint: {
                symbolSize: 68,
                data: [{ type: 'max', name: '最大值' }]
              },
              data: []
            },
            {
              name: '旧位移曲线',
              type: 'line',
              smooth: true,
              markPoint: {
                symbolSize: 68,
                data: [{ type: 'max', name: '最大值' }]
              },
              data: []
            }
          ],
          /* 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具 */
          toolbox: {
            show: true,
            feature: {
              // 导出图片
              saveAsImage: {
                name: `位移曲线图_${this.$moment().format('YYYY-MM-DD')}`
              },
              restore: {} // 重置
            }
          },
          /* 是否开启动画效果 */
          animation: true
        })

        return resolve()
      })
    },

    /**
     * @description: 切换图形按钮
     */
    handleShow() {
      this.isDistanceShow = !this.isDistanceShow
      this.isMaxPowerShow = !this.isMaxPowerShow
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  /* 按钮 */
  .btn {
    margin-left: 5px;
  }
}
</style>
