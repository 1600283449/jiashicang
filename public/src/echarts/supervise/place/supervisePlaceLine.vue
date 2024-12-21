<template>
  <div id="supervisePlaceLine" :style="{ width: '100%', height: heightData }"></div>
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
        this.supervisePlaceLines();
      },
      deep: true,  // 启用深度监听
      immediate: true  // 立即执行一次监听器，以捕捉绑定时的值
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.supervisePlaceLines();
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
    supervisePlaceLines() {
      try {
        if (!document.getElementById('supervisePlaceLine')) {
        }
        this.linemyEchart = echarts.init(document.getElementById('supervisePlaceLine'), null, {
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