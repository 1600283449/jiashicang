<template>
	<div class="left">
		<!-- 智慧救援模块 -->
		<LotPerceptionContent></LotPerceptionContent>
		<!-- 行为分析模块 -->
		<maintenanceContent></maintenanceContent>
		<!-- 全局洞察模块 -->
		<superviseContent></superviseContent>
	</div>
</template>

<script>
	import LotPerceptionContent from '../view/LotPerception/homePage/index';
	import maintenanceContent from '../view/maintenance/homePage/index';
	import superviseContent from '../view/supervise/homePage/index';
	import {
		convertToDaysHoursMinutesSeconds
	} from '@/utils/time.js';

	export default {
		components: {
			LotPerceptionContent,
			maintenanceContent,
			superviseContent
		},
		name: 'left',
		data() {
			return {
				TrappedList: [{
						name: "接入总数",
						content: 10
					},
					{
						name: "在线数",
						content: 10
					},
					{
						name: "离线数",
						content: 10
					},
					{
						name: "本月新增设备",
						content: 10
					},
					{
						name: "本月故障",
						content: 10
					},
					{
						name: "物联厂家",
						content: 10
					}
				],
				obstacleList: [{
						name: "全部投诉",
						content: 10
					},
					{
						name: "已处置",
						content: 10
					},
					{
						name: "待处理",
						content: 10
					},
					{
						name: "处理中",
						content: 10
					},
					{
						name: "已回访",
						content: 10
					},
					{
						name: "回访不满意",
						content: 10
					},
					{
						name: "二次回访",
						content: 10
					},
					{
						name: "转交维保",
						content: 10
					}
				],
				behaviorList: [{
						name: "今日待维保",
						content: 10
					},
					{
						name: "今日维保完成",
						content: 10
					},
					{
						name: "今日超期维保",
						content: 10
					},
					{
						name: "维保单位数量",
						content: 10
					},
					{
						name: "俢保人员",
						content: 10
					},
					{
						name: "合规率",
						content: 10
					}
				],
				selectState: [{
						name: "设备接入趋势",
						state: true
					},
					{
						name: "物联厂家接入排名",
						state: false
					},
					{
						name: "设备误报统计",
						state: false
					},
					{
						name: "设备离线率统计",
						state: false
					}
				],
				behaviorState: [{
						name: "设备离线率统计",
						state: true
					},
					{
						name: "维保人员分布",
						state: false
					},
					{
						name: "维保单位TOP",
						state: false
					},
					{
						name: "维保严重隐患TOP",
						state: false
					}
				],
				obstacleState: [{
						name: "投诉趋势",
						state: true
					},
					{
						name: "投诉问题分析",
						state: false
					},
					{
						name: "维保单位TOP",
						state: false
					},
					{
						name: "使用单位TOP",
						state: false
					}
				],
				currentIndex: "",
				behaviorIndex: "",
				obstacleIndex: "",
				trappedState: 1,
				behaviorStates: 1,
				obstacleStates: 1,
				
				TrappeState: 1,
				heightData: '97%',
				chartOptions: {},
				lineOptions: {},
				malfunctionOptions: {},
				lineheight: '100%',
				obstacleDrawers: false,
				drawer: false,
				timeoutId: '',
				intervalId: "",
				behaviorintervalId: "",
				obstacleintervalId: "",
				obstacletimeoutId: ""
			}
		},
		props: {
			trappedTotalList: {
				type: Object,
				default: () => ({}) // 提供默认值，避免 undefined 引起的问题
			}
		},
		watch: {
			// trappedTotalList: {
			// 	handler(newVal) {
			// 		console.log(newVal);
			// 		this.TrappedList.forEach((v, i) => {
			// 			switch (v.name) {
			// 				case "困人事件处置总数":
			// 					v.content = newVal.faultNum;
			// 					break;
			// 				case "总困人人数":
			// 					v.content = newVal.trappedPeople;
			// 					break;
			// 				case "平均救援时间":
			// 					const time = convertToDaysHoursMinutesSeconds(newVal.meanRescue)
			// 					v.content = time;
			// 					break;
			// 				case "平均到达时间":
			// 					const times = convertToDaysHoursMinutesSeconds(newVal.meanReach)
			// 					v.content = times;
			// 					break;
			// 			}
			// 		});
			// 	},
			// 	immediate: true // 立即执行一次，确保初始值也被处理
			// }
		},
		created() {
			this.pie();
			this.line();
			this.malfunction();
		},
		mounted() {
			this.startTimer();
			this.behaviorStartTimer();
			this.obstacleStartTimer();
		},
		methods: {
			// 全局洞察
			obstacleUpdate() {
				this.obstacleState.forEach((item, index) => {
					item.state = index === this.obstacleIndex;
					if (item.state) {
						this.obstacleStates = index + 1;
					}
				});
			},
			obstacleSelectItem(index) {
				this.obstacleIndex = index;
				this.obstacleUpdate(); // 可选：立即更新状态以反映点击选择
			},
			obstacleStartTimer() {
				this.obstacleStopTimer();
				this.obstacleintervalId = setInterval(() => {
					this.obstacleIndex = (this.obstacleIndex + 1) % this.obstacleState.length;
					this.obstacleUpdate();
				}, 5000); // 每5秒更新一次
			},
			obstacleStopTimer() {
				clearInterval(this.obstacleintervalId);
			},
			obstacleLeave(event) {
				// 设置一个 5 秒的定时器
				this.obstacletimeoutId = setTimeout(() => {
					this.obstacleStartTimer();
				}, 5000);
			},
			obstacleEnter(event) {
				// 清除定时器，防止在鼠标再次进入时触发延迟事件
				if (this.obstacletimeoutId) {
					clearInterval(this.obstacletimeoutId);
				}
			},
			obstacleClick(v) {
				this.obstacleState.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						this.obstacleStates = index + 1;
						this.obstacleSelectItem(index);
						this.obstacleStopTimer();
					} else {
						res.state = false;
					}
				});
			},
			// 行为分析
			behaviorUpdate() {
				this.behaviorState.forEach((item, index) => {
					item.state = index === this.behaviorIndex;
					if (item.state) {
						this.behaviorStates = index + 1;
					}
				});
			},
			behaviorSelectItem(index) {
				this.behaviorIndex = index;
				this.behaviorUpdate(); // 可选：立即更新状态以反映点击选择
			},
			behaviorStartTimer() {
				this.behaviorStopTimer();
				this.behaviorintervalId = setInterval(() => {
					this.behaviorIndex = (this.behaviorIndex + 1) % this.behaviorState.length;
					this.behaviorUpdate();
				}, 5000); // 每5秒更新一次
			},
			behaviorStopTimer() {
				clearInterval(this.behaviorintervalId);
			},
			behaviorLeave(event) {
				// 设置一个 5 秒的定时器
				this.behaviortimeoutId = setTimeout(() => {
					this.behaviorStartTimer();
				}, 5000);
			},
			behaviorEnter(event) {
				// 清除定时器，防止在鼠标再次进入时触发延迟事件
				if (this.behaviortimeoutId) {
					clearInterval(this.behaviortimeoutId);
				}
			},
			behaviorClick(v) {
				this.behaviorState.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						this.behaviorStates = index + 1;
						this.behaviorSelectItem(index);
						this.behaviorStopTimer();
					} else {
						res.state = false;
					}
				});
			},
			// 智慧救援
			updateState() {
				this.selectState.forEach((item, index) => {
					item.state = index === this.currentIndex;
					if (item.state) {
						this.trappedState = index + 1;
					}
				});
			},
			selectItem(index) {
				this.currentIndex = index;
				this.updateState(); // 可选：立即更新状态以反映点击选择
			},
			startTimer() {
				this.stopTimer();
				this.intervalId = setInterval(() => {
					this.currentIndex = (this.currentIndex + 1) % this.selectState.length;
					this.updateState();
				}, 5000); // 每5秒更新一次
			},
			stopTimer() {
				clearInterval(this.intervalId);
			},
			handleMouseLeave(event) {
				// 设置一个 5 秒的定时器
				this.timeoutId = setTimeout(() => {
					this.startTimer();
				}, 5000);
			},
			handleMouseEnter(event) {
				// 清除定时器，防止在鼠标再次进入时触发延迟事件
				if (this.timeoutId) {
					clearInterval(this.timeoutId);
				}
			},
			mapselectClick(v) {
				this.selectState.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						this.trappedState = index + 1;
						this.selectItem(index);
						this.stopTimer();
					} else {
						res.state = false;
					}
				});
			},
			malfunction() {
				this.malfunctionOptions = {
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
						bottom: '2%',
						top: '10%', // 调整顶部间距，以增加图表的高度
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
						type: 'bar',
						data: [],
						itemStyle: {
							color: '#d97559' // 设置柱状图的颜色
						},
						barWidth: 20 // 设置柱状图的宽度为 15px
					}]
				};
			},
			// 饼状图
			pie() {
				this.chartOptions = {
					tooltip: {
						trigger: 'item'
					},
					legend: {
						bottom: '10%',
						left: 'left',
						selectedMode: false,
						orient: 'vertical',
						textStyle: {
							color: "#ffffff",
							fontSize: 12,
						},
					},
					series: [{
						name: 'Access From',
						type: 'pie',
						radius: '50%',
						center: ['63%', '40%'],
						data: [{
								value: 13,
								name: '平层因人'
							},
							{
								value: 13,
								name: '轿厢在开锁区外停止'
							},
							{
								value: 26,
								name: '紧急呼救'
							}
						],
						color: ["#f0a438", "#c200ec", "#f03838"],
						label: {
							normal: {
								show: true,
								color: '#fff',
								formatter: '{c}' + '起' +
									'\({d}%)', // 视觉引导线内容格式器,{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
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
				};
			},
			// 阻梯
			line() {
				this.lineOptions = {
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
					color: ["#055db8"],
					yAxis: {
						type: 'value',
						axisLine: {
							show: false,
						},
						splitLine: {
							show: true,
							lineStyle: {
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
						type: 'line',
						stack: 'Total',
						data: [120, 132, 101, 134, 90, 230, 210],
						itemStyle: {
							normal: {
								color: '#0078EC', // 数据点中心颜色
								borderColor: '#fff', // 数据点外圈颜色
								borderWidth: 2, // 数据点外圈宽度
								shadowColor: 'rgba(0, 0, 0, 0.5)', // 数据点阴影颜色
								shadowBlur: 10, // 数据点阴影模糊大小
								shadowOffsetX: 0, // 数据点阴影水平方向偏移
								shadowOffsetY: 0, // 数据点阴影垂直方向偏移
								symbolSize: 10 // 数据点大小
							},
							emphasis: { // 鼠标悬停时的样式
								color: '#0078EC', // 鼠标悬停时的数据点中心颜色
								borderColor: '#fff', // 鼠标悬停时的数据点外圈颜色
								borderWidth: 2, // 鼠标悬停时的数据点外圈宽度
								symbolSize: 10 // 鼠标悬停时的数据点大小
							}
						}
					}]
				};
			},
			Trappes() {
				this.TrappeState = 1;
				this.chartOptions.series[0].label = {
					normal: {
						show: true,
						formatter: '{c}' + '起' +
							'\({d}%)', // 视觉引导线内容格式器,{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
					},
				};
			},
			Trappenum() {
				this.TrappeState = 2;
				this.chartOptions.series[0].label = {
					normal: {
						show: true,
						formatter: '{c}' + '台' +
							'\({d}%)', // 视觉引导线内容格式器,{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
					},
				};
			},
			obstacleDetails() {
				this.obstacleDrawers = true;
				this.$store.commit('obstacleDrawers', this.obstacleDrawers);
			},
			detailsClick() {
				this.drawer = true;
				this.$store.commit('drawer', this.drawer);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.left {
		width: 21%;
		height: 100%;
		position: absolute;
		z-index: 2;
		top: 0;
		right: 0.26vw; /* 5px to vw */
		
		.content {
			width: 100%;
			height: 30.5%;
			.contents {
				width: 93%;
				height: 100%;
				background-image: url(../../src/assets/img/newlargeScreen/allbackground.png);
				background-size: 100% 100%;
				padding: 0.36vw 0.42vw; /* 7px 8px to vw */
				box-sizing: border-box;

				.title {
					width: 100%;
					height: 11.3%;
					background-image: url(../../src/assets/img/newlargeScreen/titleBackground.png);
					background-size: 100% 100%;
					margin-left: 0.31vw; /* 6px to vw */

					.titles {
						width: 100%;
						height: 100%;
						padding: 0 0.78vw 0.21vw 0.78vw; /* 0 15px 4px 15px to vw */
						box-sizing: border-box;

						.titleLeft {
							.icon {
								width: 1.3vw; /* 25px to vw */
								height: 1.25vw; /* 24px to vw */
							}

							.name {
								font-weight: bold;
								font-size: 0.94vw; /* 18px to vw */
								color: #FFFFFF;
								margin-left: 0.47vw; /* 9px to vw */
							}
						}

						.TitleRight {
							font-weight: 500;
							font-size: 0.63vw; /* 12px to vw */
							color: #FFFFFF;
							margin-bottom: 0.42vw; /* 8px to vw */
						}
					}
				}

				.allTitle {
					width: 100%;
					height: 33.5%;
					flex-wrap: wrap;

					.allTitles {
						width: 33%;
						height: 50%;
						background-image: url(../../src/assets/img/newlargeScreen/titlesBackground.png);
						background-size: 100% 100%;
						padding: 0.52vw 0; /* 10px 0 to vw */
						box-sizing: border-box;

						.allName {
							font-weight: 500;
							font-size: 0.52vw; /* 10px to vw */
							color: #FFFFFF;
						}

						.allContent {
							font-weight: bold;
							font-size: 0.73vw; /* 14px to vw */
							color: #FFFFFF;
							margin-top: 0.10vw; /* 2px to vw */
						}
					}
					.behaviorTitles {
						width: 33%;
						height: 50%;
						background-image: url(../../src/assets/img/newlargeScreen/titlesBackground.png);
						background-size: 100% 100%;
						padding: 0.52vw 0; /* 10px 0 to vw */
						box-sizing: border-box;
						
						.allName {
							font-weight: 500;
							font-size: 0.73vw; /* 14px to vw */
							color: #FFFFFF;
						}
						
						.allContent {
							font-weight: bold;
							font-size: 1.35vw; /* 26px to vw */
							color: #4C92FA;
							margin-top: 0.21vw; /* 4px to vw */
						}
					}
				}

				.mapSelect {
					width: 100%;
					height: 6.4%;
					margin-top: 0.16vw; /* 3px to vw */

					.mapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.63vw; /* 12px to vw */
						color: #FFFFFF;
						box-sizing: border-box;
						background-image: url(../../src/assets/img/newlargeScreen/mapselect.png);
						background-size: 100% 100%;
					}

					.nomapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.63vw; /* 12px to vw */
						color: #477BB1;
						box-sizing: border-box;
						background-image: url(../../src/assets/img/newlargeScreen/nomapselect.png);
						background-size: 100% 100%;
					}
				}

				.echartsmap {
					width: 100%;
					height: 48.4%;
					margin-top: 0.10vw; /* 2px to vw */
				}
			}

			.select {
				width: 7%;
				height: 60%;
				position: relative;

				.selects {
					width: 100%;
					height: 50%;
					background-image: url(../../src/assets/img/newlargeScreen/rightSelects.png);
					background-size: 100% 100%;
					font-weight: bold;
					font-size: 0.78vw; /* 15px to vw */
					color: #FFFFFF;
					text-align: center;
					line-height: 0.78vw; /* 15px to vw */
					padding-bottom: 0.36vw; /* 7px to vw */
					box-sizing: border-box;
					position: absolute;
					z-index: 1;
				}

				.noselects {
					width: 100%;
					height: 50%;
					background-image: url(../../src/assets/img/newlargeScreen/norightSelects.png);
					background-size: 100% 100%;
					font-weight: bold;
					font-size: 0.78vw; /* 15px to vw */
					color: #FFFFFF;
					text-align: center;
					line-height: 0.78vw; /* 15px to vw */
					padding-bottom: 0.10vw; /* 2px to vw */
					box-sizing: border-box;
					position: absolute;
					top: 2.29vw; /* 44px to vw */
				}
			}
		}
	}
</style>
