<template>
	<div class="trappedStatistics">
		<div class="faultSourceTitle justifyBetween">
			<div class="titles flexcenter">
				<img src="@/assets/img/largeScreen/faultSource.png" alt="" class="titleIcon" />
				<div class="titleContent">
					梯龄与设备在线统计
				</div>
			</div>
		</div>
		<div class="Statistics justifyBetween">
			<div id="devicereasonchart" style="width:65%;height: 90%;margin-left: 0.79vw;margin-top:  0.3950vw;"></div>
			<div class="table">
				<div class="title flexAlignCenter">梯龄与设备统计列表</div>
				<div class="ul justifyBetween">
					<div class="li flexcenter">
						梯龄
					</div>
					<div class="li flexcenter">
						电梯总数
					</div>
					<div class="li flexcenter">
						安装设备数
					</div>
					<div class="li flexcenter">
						设备在线数
					</div>
				</div>
				<div class="ul justifyBetween" v-for="(v,i) in trappedList" :class="[i % 2 === 0 ? 'uls' : 'ul']">
					<div class="li flexcenter">
						{{v.name}}
					</div>
					<div class="li flexcenter">
						{{v.value}}
					</div>
					<div class="li flexcenter">
						{{v.value}}
					</div>
					<div class="li flexcenter">
						{{v.value}}
					</div>
				</div>
			</div>
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
				reasonEcharts: '',
				resizeHandler: '',
				options: {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						},
						textStyle: {
							color: '#ffffff' // 设置提示文字颜色为白色
						}
					},
					legend: {
						textStyle: {
							color: '#ffffff' // 设置图例文字颜色为白色
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value',
						boundaryGap: [0, 0.01],
						axisLabel: {
							color: '#ffffff' // 设置 x 轴文字颜色为白色
						},
						axisTick: {
							show: true // 显示 x 轴刻度
						},
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed', // 设置 x 轴网格线为虚线
								color: '#35519C' // 设置 x 轴网格线颜色
							}
						}
					},
					yAxis: {
						type: 'category',
						data: [],
						axisLabel: {
							color: '#ffffff' // 设置 y 轴文字颜色为白色
						}
					},
					series: [{
						name: '梯龄电梯分布',
						type: 'bar',
						data: [],
						itemStyle: {
							color: '#d97559' // 设置柱状图的颜色
						},
						barWidth: 20 // 设置柱状图的宽度为 15px
					}]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initCharts();
			});

			this.resizeHandler = () => {
				if (this.reasonEcharts) {
					this.reasonEcharts.resize();
				}
			};
			window.addEventListener("resize", this.resizeHandler);
		},
		methods: {
			initCharts() {
				try {
					if (!document.getElementById('devicereasonchart')) {

					}
					this.options.series[0].data = []
					this.trappedList.forEach((res, index) => {
						if (index <= 4) {
							this.options.series[0].data.push(res.value)
							this.options.yAxis.data.push(res.name)
						}
					})
					this.reasonEcharts = echarts.init(document.getElementById('devicereasonchart'),
						null, {
							devicePixelRatio: 2.5
						});
					this.reasonEcharts.setOption(this.options);
				} catch (error) {}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.trappedStatistics {
		width: 100%;
		height: 100%;
		background-image: url(@/assets/img/largeScreen/concentbottom.png);
		background-size: 100% 100%;
		padding: 0 0.6715vw;
		box-sizing: border-box;

		.title {
			width: 100%;
			height: 19.75%;
			.titles {
				width: 16.128%;
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
		.faultSourceTitle {
			width: 100%;
			height: 10%;
			padding: 0 3.129% 0 0.3950vw;
			box-sizing: border-box;
		
			.titles {
				margin-top: 0.2621vw;
		
				.titleIcon {
					width: 13.79%;
				}
				.titleContent {
					font-weight: bold;
					font-size: 0.79vw;
					color: #FFFFFF;
					margin-left: 0.5242vw;
				}
			}
		}
		.Statistics {
			width: 100%;
			height: 87%;
		}
		.table {
			width: 28.2%;
			height: 92%;
			margin-top:  0.3950vw;
			border: 1px solid #1F3570;
			.title {
				width: 100%;
				height: 8.13%;
				background: #1F3570;
				font-weight: 500;
				font-size: 0.625vw;
				color: #FFFFFF;
				padding-left: 0.711vw;
				box-sizing: border-box;
			}

			.ul {
				width: 100%;
				height: 7.9%;

				.li {
					width: 33%;
					height: 100%;
					font-weight: 500;
					font-size: 0.5925vw;
					color: #FFFFFF;
				}
			}

			.uls {
				background: rgba(23, 42, 92, 0.75);
				border-top: 1px solid #1F3570;
				/* 顶部边框 */
				border-right: 0;
				/* 右边框（实际上没有边框） */
				border-bottom: 1px solid #1F3570;
				/* 底部边框 */
				border-left: 0;
			}
		}
	}
</style>