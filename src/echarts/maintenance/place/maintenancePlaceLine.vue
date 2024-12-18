<template>
  <div id="maintenancePlaceLineChart" :style="{ width: '100%', height: heightData }"></div>
</template>

<script>
import * as echarts from 'echarts';
import { nextTick } from 'vue';

export default {
  name: 'lines',
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
      linemyEchart: null,
      resizeHandler: null
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.maintenancePlaceLineCharts();
      },
      deep: true,  // 启用深度监听
      immediate: true  // 立即执行一次监听器，以捕捉绑定时的值
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.maintenancePlaceLineCharts();
    });

    this.resizeHandler = () => {
      if (this.linemyEchart) {
        this.linemyEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.linemyEchart) {
      this.linemyEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    maintenancePlaceLineCharts() {
      try {
        if (!document.getElementById('maintenancePlaceLineChart')) {
        }
        this.linemyEchart = echarts.init(document.getElementById('maintenancePlaceLineChart'), null, {
          devicePixelRatio: 2.5
        });
        this.linemyEchart.setOption(this.options);
      } catch (error) {
      }
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>