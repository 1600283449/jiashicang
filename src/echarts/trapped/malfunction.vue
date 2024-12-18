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
				default: '400px' // 添加默认值
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
			}
		},
		watch: {
			options: {
				handler(newVal, oldVal) {
					this.initChart();
				},
				deep: true, // 启用深度监听
				immediate: true // 立即执行一次监听器，以捕捉绑定时的值
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
					if (!document.getElementById('malfunctionchart')) {
						return;
					}

					// 清空数据
					this.options.series[0].data = [];
					this.options.yAxis.data = [];

					// 填充数据
					this.trappedList.forEach((res) => {
						this.options.series[0].data.push(res.value);
						this.options.yAxis.data.push(res.name);
					});


					this.malfunctionEchart = echarts.init(document.getElementById('malfunctionchart'), null, {
						devicePixelRatio: 2.5
					});
					this.malfunctionEchart.setOption(this.options);
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
</script>

<style scoped>
	/* 你可以在这里添加一些样式 */
</style>