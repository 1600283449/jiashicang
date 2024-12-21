<template>
  <div id="LotPerceptionPlacePie" :style="{ width: '100%', height: heightData }"></div>
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
      default: '400px'  // 添加默认值
    }
  },
  data() {
    return {
      myEchart: null,
      resizeHandler: null
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.LotPerceptionPlacePieChart();
      },
      deep: true,  // 启用深度监听
      immediate: true  // 立即执行一次监听器，以捕捉绑定时的值
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.LotPerceptionPlacePieChart();
    });

    this.resizeHandler = () => {
      if (this.myEchart) {
        this.myEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.myEchart) {
      this.myEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    LotPerceptionPlacePieChart() {
      try {
        if (!document.getElementById('LotPerceptionPlacePie')) {
        }
        this.myEchart = echarts.init(document.getElementById('LotPerceptionPlacePie'), null, {
          devicePixelRatio: 2.5
        });
        this.myEchart.setOption(this.options);
      } catch (error) {
      }
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>