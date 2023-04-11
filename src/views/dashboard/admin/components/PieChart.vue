<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

import { fetchItemStockByCategory } from '@/api/item'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      chartData: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
      this.getCountItemStockByCategory()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  created() {
    // this.getList()
    // this.getItemList()
    //this.getCountItemStockByCategory()
  },
  methods: {
    getCountItemStockByCategory() {
      fetchItemStockByCategory().then(response => {
        this.chartData = response.data.data.map(item => {
          return {
            name: item.name,
            value: item.value
          }
        })
        this.initChart()
        console.log('fetchItemStockByCategory()')
        console.log(this.chartData)
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.chartData.map((item) => item.name)
        },
        series: [
          {
            name: 'Total item stock count by category',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.chartData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
