<template>
  <div id="maintenancelines" :style="{ width: '100%', height: heightData }"></div>
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
      maintenanceEchart: null,
      resizeHandler: null
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.behaviorinitChart();
      },
      deep: true,  // 启用深度监听
      immediate: true  // 立即执行一次监听器，以捕捉绑定时的值
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.behaviorinitChart();
    });

    this.resizeHandler = () => {
      if (this.maintenanceEchart) {
        this.maintenanceEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.maintenanceEchart) {
      this.maintenanceEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    behaviorinitChart() {
      try {
        if (!document.getElementById('maintenancelines')) {
        }
        this.maintenanceEchart = echarts.init(document.getElementById('maintenancelines'), null, {
          devicePixelRatio: 2.5
        });
        this.maintenanceEchart.setOption(this.options);
      } catch (error) {
      }
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>