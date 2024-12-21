<template>
  <div id="malfunctionchart" :style="{ width: '100%', height: heightData }"></div>
</template>

<script>
import * as echarts from 'echarts';
import { nextTick } from 'vue';

export default {
  name: 'EChartsComponent',
  props: {
    options: {
      type: Object,
      required: true
    },
    heightData: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      malfunctionEchart: null,
      resizeHandler: null,
      trappedList: [
        {
          name: "1年内",
          value: "100",
          proportion: "30.21%",
        },
        {
          name: "1-3年",
          value: "60",
          proportion: "15.21%",
        },
        {
          name: "3-6年",
          value: "50",
          proportion: "12.21%",
        },
        {
          name: "6-10年",
          value: "9",
          proportion: "5.21%",
        }
      ],
      localOptions: {} // 本地数据副本
    };
  },
  watch: {
    options: {
      handler(newVal) {
        this.localOptions =newVal // 深拷贝 options 到 localOptions
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });

    this.resizeHandler = () => {
      if (this.malfunctionEchart) {
        this.malfunctionEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.malfunctionEchart) {
      this.malfunctionEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    initChart() {
      try {
        const chartDom = document.getElementById('malfunctionchart');
        if (!chartDom) {
          return;
        }

        this.malfunctionEchart = echarts.init(chartDom, null, {
          devicePixelRatio: 2.5
        });
        this.updateChart();
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    },
    updateChart() {
      try {
        if (!this.malfunctionEchart) {
          return;
        }
        this.localOptions.series[0].data = [];
        this.localOptions.yAxis.data = [];
      //   // 填充数据
        this.trappedList.forEach((res) => {
          this.localOptions.series[0].data.push(res.value);
          this.localOptions.yAxis.data.push(res.name);
        });
        this.malfunctionEchart.setOption(this.localOptions);
      } catch (error) {
        console.error('Error updating chart:', error);
      }
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>