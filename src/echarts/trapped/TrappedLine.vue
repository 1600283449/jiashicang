<template>
  <div id="TrappedLinechart" :style="{ width: '100%', height: heightData }"></div>
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
      TrappedmyEchart: null,
      resizeHandler: null
    }
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.initChart();
      },
      deep: true,  // 启用深度监听
      immediate: true  // 立即执行一次监听器，以捕捉绑定时的值
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });

    this.resizeHandler = () => {
      if (this.TrappedmyEchart) {
        this.TrappedmyEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.TrappedmyEchart) {
      this.TrappedmyEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    initChart() {
      try {
        if (!document.getElementById('TrappedLinechart')) {
        }
        this.TrappedmyEchart = echarts.init(document.getElementById('TrappedLinechart'), null, {
          devicePixelRatio: 2.5
        });
        this.TrappedmyEchart.setOption(this.options);
      } catch (error) {
      }
    }
  }
};
</script>

<style scoped>
/* 你可以在这里添加一些样式 */
</style>