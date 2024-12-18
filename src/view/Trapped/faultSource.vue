<template>
	<div class="trappedStatistics">
		<div class="faultSourceTitle justifyBetween">
			<div class="titles flexcenter">
				<img src="@/assets/img/largeScreen/complaintIcon.png" alt="" class="titleIcon" />
				<div class="titleContent">
					困人故障事件来源
				</div>
			</div>
		</div>
		<div class="Statistics justifyBetween">
			<div id="faultSourcelinechart" style="width:65%;height:100%;margin-left: 1.17186vw;"></div>
			<div class="table">
				<div class="title flexAlignCenter">困人故障事件来源列表</div>
				<div class="ul justifyBetween">
					<div class="li flexcenter">
						来源
					</div>
					<div class="li flexcenter">
						次数
					</div>
				</div>
				<div class="ul justifyBetween" v-for="(v,i) in trappedList" :class="[i % 2 === 0 ? 'uls' : 'ul']">
					<div class="li flexcenter">
						{{v.name}}
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
						name: "智能硬件报警",
						value: "100",
					},
					{
						name: "平台人工派单",
						value: "60",
					},
					{
						name: "话务人工派单",
						value: "50",
					},
					{
						name: "110",
						value: "9",
					},
					{
						name: "119",
						value: "6",
					},
					{
						name: "12345",
						value: "3",
					},
					{
						name: "96333",
						value: "2",
					},
					{
						name: "被困扫码报警",
						value: "2",
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
					},
					{
						name: "困人人数总计",
						num: "199",
						state: false
					},
					{
						name: "伤亡人数总计",
						num: "160",
						state: false
					}
				],
				faultSourcelinEcharts: '',
				resizeHandler: '',
				options: {
					tooltip: {
						trigger: 'item'
					},
					itemStyle: {
						borderRadius: 10,
						borderColor: '#fff',
						borderWidth: 2
					},
					legend: {
						bottom: '11%',
						left: 'left',
						selectedMode: false,
						orient: 'vertical',
						itemGap: 16,
						textStyle: {
							color: "#ffffff",
							fontSize: 14,
						},
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: '70%',
						center: ['63%', '52%'],
						data: [],
						color: ["#5087ec", "#68bbc4", "#58a55c", "#f2bd42", "#ee752f", "#d95040", "#5087ec",
							"#68bbc4"
						],
						label: {
							normal: {
								show: true,
								color: '#fff',
								fontSize: 14,
								formatter: '{b}' +
									'{c}', //视觉引导线内容格式器,{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
							},
						},
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initCharts();
			});

			this.resizeHandler = () => {
				if (this.faultSourcelinEcharts) {
					this.faultSourcelinEcharts.resize();
				}
			};
			window.addEventListener("resize", this.resizeHandler);
		},
		methods: {
			initCharts() {
				try {
					if (!document.getElementById('faultSourcelinechart')) {

					}
					this.options.series[0].data = this.trappedList
					this.faultSourcelinEcharts = echarts.init(document.getElementById('faultSourcelinechart'),
						null, {
							devicePixelRatio: 2.5
						});
					this.faultSourcelinEcharts.setOption(this.options);
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
		background-image: url(@/assets/img/largeScreen/concentbottom.png);
		background-size: 100% 100%;
		padding: 0 0.6715vw;
		box-sizing: border-box;

		.faultSourceTitle {
			width: 100%;
			height: 10%;
			padding: 0 3.129% 0 0.39061vw;
			box-sizing: border-box;

			.titles {
				margin-top: 0.2621vw;
				.titleIcon {
					width: 13.79%;
				}

				.titleContent {
					font-weight: bold;
					font-size:  0.7817vw;
					color: #FFFFFF;
					margin-left: 0.5242vw;
				}
			}
		}

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

		.Statistics {
			width: 100%;
			height: 87%;
		}

		.table {
			width: 28.2%;
			height: 90%;
			border: 1px solid #1F3570;
			margin-top: 0.39061vw;

			.title {
				width: 100%;
				height: 8.13%;
				background: #1F3570;
				font-weight: 500;
				font-size: 0.625vw;
				color: #FFFFFF;
				padding-left: 0.70312vw;;
				box-sizing: border-box;
			}

			.ul {
				width: 100%;
				height: 9.8%;

				.li {
					width: 33%;
					height: 100%;
					font-weight: 500;
					font-size: 0.625vw;
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