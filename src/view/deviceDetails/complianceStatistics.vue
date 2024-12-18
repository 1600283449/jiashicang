<template>
	<div class="trappedStatistics">
		<div class="title justifyAround">
			<div class="titles flexDirectionCenter" v-for="v in titleList" :class="v.state?'ytitle':''"
				@click="titleClick(v)">
				<div class="num">{{v.num}}</div>
				<div class="name">{{v.name}}</div>
			</div>
		</div>
		<div class="line">
		</div>
		<div class="Statistics justifyBetween">
			<div id="devicelinechart" style="width: 100%;height: 90%;margin-left: 1.17186vw;"></div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	import {
		nextTick
	} from 'vue';
	export default {
		name: 'trappedStatistics',
		data() {
			return {
				trappedList: [{
						time: "10月17日",
						num: "266",
						new: "18",
					},
					{
						time: "10月16日",
						num: "266",
						new: "18"
					},
					{
						time: "10月15日",
						num: "266",
						new: "18"
					},
					{
						time: "10月14日",
						num: "266",
						new: "18"
					},
					{
						time: "10月13日",
						num: "266",
						new: "18"
					},
					{
						time: "10月12日",
						num: "266",
						new: "18"
					},
					{
						time: "10月11日",
						num: "266",
						new: "18"
					},
					{
						time: "10月10日",
						num: "266",
						new: "18"
					},
				],
				titleList: [{
						name: "困人故障总数",
						num: "199",
						state: true
					},
					{
						name: "困人电梯总数",
						num: "160",
						state: false
					}
				],
				compliancelineEchart: '',
				resizeHandler: '',
				options: {
					title: {
						textStyle: {
							fontSize: 12,
							color: "#ffffff"
						}
					},
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						top: "10%",
						left: '3%',
						right: '4%',
						bottom: '0%',
						containLabel: true,
					},
					toolbox: {
						show: false
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						textStyle: {
							color: "#3B70AA",
							fontSize: 9,
						},
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: '#fff',
								fontSize: 9,
							},
						},
						boundaryGap: true, // 去除轴内间距
						data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
					},
					color: ["#D97559"],
					yAxis: {
						type: 'value',
						axisLine: {
							show: false,
						},
						splitLine: {
							show: true,
							lineStyle: {
								 type: 'dashed', 
								color: "#3B70AA" // 设置x轴刻度线的颜色为半透明红色  
							}
						},
						axisTick: {
							show: false // 不显示 y 轴刻度线
						},
						axisLabel: {
							textStyle: {
								color: '#fff', // y 轴标签文字颜色
								fontSize: 9
							}
						}
					},
					series: [{
						type: 'bar',
						stack: 'Total',
						data: [120, 132, 101, 134, 90, 230, 210],
						 barWidth: '40%'
					}]
				}
			};
		},
		mounted() {
			this.$nextTick(() => {
				this.initCharts();
			});

			this.resizeHandler = () => {
				if (this.compliancelineEchart) {
					this.compliancelineEchart.resize();
				}
			};
			window.addEventListener("resize", this.resizeHandler);
		},
		methods: {
			initCharts() {
				try {
					if (!document.getElementById('devicelinechart')) {

					}
					this.options.xAxis.data=[]
					this.trappedList.forEach((v,i)=>{
						this.options.xAxis.data.push(v.time)
					})
					this.options.series[0].data=[]
					this.trappedList.forEach((v,i)=>{
						this.options.series[0].data.push(v.num)
					})
					this.compliancelineEchart = echarts.init(document.getElementById('devicelinechart'), null, {
						devicePixelRatio: 2.5
					});
					this.compliancelineEchart.setOption(this.options);
				} catch (error) {}
			},
			titleClick(v) {
				this.titleList.forEach((res, index) => {
					if (res.name == v.name) {
						res.state = true
					} else {
						res.state = false
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.trappedStatistics {
		width: 100%;
		height: 100%;
		background-image: url(@/assets/img/largeScreen/trappedStatisticss.png);
		background-size: 100% 100%;
		padding: 0 0.27345vw;
		box-sizing: border-box;

		.title {
			width: 100%;
			height: 19.75%;
			.titles {
				width: 35.05%;
				height: 100%;
				.name {
					font-weight: 500;
					font-size: 0.625vw;
					color: #FFFFFF;
				}

				.num {
					font-weight: bold;
					font-size: 1.25vw;
					color: #F92424;
				}
			}

			.ytitle {
				background-image: url(../../assets/img/largeScreen/trappedStatisticsTitle.png);
				background-size: 100% 100%;
			}
		}

		.line {
			width: 100%;
			height: 0.43%;
			background-image: url(../../assets/img/largeScreen/line.png);
			background-size: 100% 100%;
		}

		.Statistics {
			width: 100%;
			height: 80%;
		}
	}
</style>