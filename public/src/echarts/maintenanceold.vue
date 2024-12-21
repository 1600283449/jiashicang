<template>
	<div class="mymaintenance flex">
		<div class="Title flexdirection Titleleft">
			<div class="Titles">
				<div class="name">电梯尚未维保</div>
				<div class="num">{{maintenanceData.notStartedYet}}</div>
			</div>
			<div class="Titles">
				<div class="name">电梯超期维保</div>
				<div class="num">{{maintenanceData.overdue}}</div>
			</div>
			<div class="Titles">
				<div class="name">电梯维保完成</div>
				<div class="num">{{maintenanceData.complete}}</div>
			</div>
		</div>
		<div class="statistics">
			  <div id="maintenancechart" :style="{ width: '100%', height: heightData }"></div>
		</div>
		<div class="Title flexdirection TitleRight">
			<div class="Titles">
				<div class="name">临近检验检测</div>
				<div class="num">{{inspect.todo}}</div>
			</div>
			<div class="Titles">
				<div class="name">检验检测超期</div>
				<div class="num">{{inspect.overdue}}</div>
			</div>
			<div class="Titles">
				<div class="name">检验检测完成</div>
				<div class="num">{{inspect.complete}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import { nextTick } from 'vue';

export default {
  name: 'maintenances',
  props: {
    options: {
      type: Object,
      required: true
    },
    heightData: {
      type: String,
      default: '400px'  // 添加默认值
    },
	maintenanceData: {
      type: Object,
      default: () => ({})  // 添加默认值
    },
	inspect: {
	  type: Object,
	  default: () => ({})  // 添加默认值
	}
  },
  data() {
    return {
      maintenancemyEchart: null,
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
      if (this.maintenancemyEchart) {
        this.maintenancemyEchart.resize();
      }
    };
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    if (this.maintenancemyEchart) {
      this.maintenancemyEchart.dispose();
    }
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
  methods: {
    initChart() {
      try {
        if (!document.getElementById('maintenancechart')) {
        }
        this.maintenancemyEchart = echarts.init(document.getElementById('maintenancechart'), null, {
          devicePixelRatio: 2.5
        });
        this.maintenancemyEchart.setOption(this.options);
      } catch (error) {
      }
    }
  }
};
</script>

<style scoped lang="scss">
	.mymaintenance{
		height: 100%;
		padding: 0 1.36292vw;
		box-sizing: border-box;
		.Title{
			.Titles{
				text-align: center;
				margin-top: 0.9vw;
				.name{
					font-weight: 500;
					font-size: 0.73388vw;
					color: #FFFFFF;
				}
				.num{
					font-weight: bold;
					font-size: 1vw;
					color: #FFFFFF;
					margin-top: 0.05242vw;
				}
			}
		}
		.Titleleft{
			margin-right: 0.41936vw;
		}
		.TitleRight{
			margin-left: 0.41936vw;
		}
	}
	.statistics{
		width: 47%;
		height: 100%;
	}
</style>