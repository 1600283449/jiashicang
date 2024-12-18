<template>
	<div class="content flex" style="margin-top: 3.8vw;">
		<div class="select">
			<div class="flexcenter" v-for="(v, i) in Trappedselect"
				:class="{ 'selects': v.state, 'noselects': !v.state }"
				:style="{ 'top': i === 1 ? '3.99vw' : '0','zIndex': v.state ? '0' : '1'  }" @click="selectClick(v)">
				{{ v.name }}
			</div>
		</div>
		<div class="contents">
			<div class="title">
				<div class="titles justifyBetween">
					<div class="titleLeft flexAlignCenter">
						<img src="@/assets/img/newlargeScreen/titleIcon.png" alt="" class="icon" />
						<div class="name">物联感知</div>
					</div>
					<div class="TitleRight" @click="IotPerceptionClick()">
						详细统计 >
					</div>
				</div>
			</div>
			<div class="trappedContents" v-if="trappedContentsState"  @mouseleave="handleMouseLeave" @mouseenter="handleMouseEnter">
				<div class="allTitle flexcenter">
					<div class="allTitles flexDirectionCenter" v-for="v in behaviorList"  @click="mytableClick()">
						<div class="allName">{{v.name}}</div>
						<div class="allContent">{{v.content}}</div>
					</div>
				</div>
				<div class="mapSelect flexAlignCenter">
					<div class="mapSelects flexcenter" v-for="(v,i) in behaviorState"
						:class="{ 'mapSelects': v.state, 'nomapSelects': !v.state }"  :style="{width:i==1?'27%':'24%'}"
						@click="mapselectClick(v)">{{v.name}}</div>
				</div>
				<div class="echartsmap">
					<perceptionlines :heightData="heightData" :options="lineOptions" v-if="behaviorStates==1"></perceptionlines>
					<perceptionLine :heightData="heightData" :options="lineOptions" v-if="behaviorStates==2"></perceptionLine>
					<perceptionpie :heightData="heightData" :options="chartOptions" v-if="behaviorStates==3"></perceptionpie>
					<perception :heightData="heightData" :options="malfunctionOptions" v-if="behaviorStates==4">
					</perception>
				</div>
			</div>
			<div class="trappedplace" v-else  @mouseleave="placeMouse" @mouseenter="placeMouseEnter">
				<div class="mapSelect flexAlignCenter">
					<div class="mapSelects flexcenter" v-for="(v,i) in placebehaviorState"
						:class="{ 'mapSelects': v.state, 'nomapSelects': !v.state }"
						:style="{width:100/placebehaviorState.length+'%'}" @click="placeSelectClick(v)">{{v.name}}</div>
				</div>
				<div class="echartsmap">
					<LotPerceptionPlaceLine :heightData="heightData" :options="lineOptions" v-if="placeState==1">
					</LotPerceptionPlaceLine>
					<LotPerceptionPlacePie :heightData="heightData" :options="chartOptions" v-if="placeState==2"></LotPerceptionPlacePie>
					<LotPerceptionPlacebars :heightData="heightData" :options="placebarsOptions" v-if="placeState==3"></LotPerceptionPlacebars>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import perceptionlines from '@/echarts/LotPerception/perceptionlines';
	import perceptionLine from '@/echarts/LotPerception/perceptionLine';
	import perceptionpie from '@/echarts/LotPerception/perceptionpie';
	import perception from '@/echarts/LotPerception/perception';
	
	
	import LotPerceptionPlacebars from "@/echarts/LotPerception/place/LotPerceptionPlacebars"
	import LotPerceptionPlaceLine from "@/echarts/LotPerception/place/LotPerceptionPlaceLine"
	import LotPerceptionPlacePie from "@/echarts/LotPerception/place/LotPerceptionPlacePie"
	import {
		convertToDaysHoursMinutesSeconds
	} from '@/utils/time.js';

	export default {
		components: {
			perceptionlines,
			perceptionLine,
			perceptionpie,
			perception,
			LotPerceptionPlacebars,
			LotPerceptionPlaceLine,
			LotPerceptionPlacePie
		},
		name: 'left',
		data() {
			return {
				trappedContentsState: true,
				Trappedselect: [{
						name: '全局掌控',
						state: true
					},
					{
						name: '场所一览',
						state: false
					},
				],
				behaviorList: [{
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
				behaviorState: [{
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
				placebehaviorState: [{
						name: "各场所新增设备",
						state: true
					},
					{
						name: "各场所电梯接入总数",
						state: false
					},
					{
						name: "本月各场所新增故障",
						state: false
					}
				],
				currentIndex: "",
				placeIndex:"",
				behaviorStates: 1,
				placeState: 1,
				heightData: '97%',
				placebarsOptions: {},
				chartOptions: {},
				lineOptions: {},
				malfunctionOptions: {},
				lineheight: '100%',
				timeoutId: '',
				intervalId: "",
				placeIntervalId:1,
				placeTimeout:'。'
			}
		},
		props: {},
		watch: {},
		created() {
			this.pie();
			this.line();
			this.malfunction();
			this.placebarend()
		},
		mounted() {
			this.startTimer();
			this.placeTimer();
		},
		methods: {
			mytableClick(){
				this.$store.commit('mytablestate', true);
			},
			IotPerceptionClick(){
				this.$store.commit('deviceDrawers',true);
			},
			// 场所一揽
			placeUpdate() {
				this.placebehaviorState.forEach((item, index) => {
					item.state = index === this.placeIndex;
					if (item.state) {
						this.placeState = index + 1;
					}
				});
			},
			placeSelect(index) {
				this.placeIndex = index;
				this.placeUpdate(); // 可选：立即更新状态以反映点击选择
			},
			placeStopTimer() {
				clearInterval(this.placeIntervalId);
			},
			placeTimer() {
				this.placeStopTimer();
				this.placeIntervalId = setInterval(() => {
					this.placeIndex = (this.placeIndex + 1) % this.placebehaviorState.length;
					this.placeUpdate();
				}, 5000); // 每5秒更新一次
			},
			placeMouse(){
				this.placeTimeout = setTimeout(() => {
					this.placeTimer();
				}, 5000);
			},
			placeMouseEnter(){
				// 清除定时器，防止在鼠标再次进入时触发延迟事件
				if (this.placeTimeout) {
					clearInterval(this.placeTimeout);
				}
			},
			placeSelectClick(v){
				this.placebehaviorState.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						this.placeState = index + 1;
						this.placeSelect(index);
						this.placeStopTimer();
					} else {
						res.state = false;
					}
				});
			},
			// 智慧救援
			updateState() {
				this.behaviorState.forEach((item, index) => {
					item.state = index === this.currentIndex;
					if (item.state) {
						this.behaviorStates = index + 1;
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
					this.currentIndex = (this.currentIndex + 1) % this.behaviorState.length;
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
			selectClick(v) {
				this.Trappedselect.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						if (v.name == '全局掌控') {
							this.trappedContentsState = true
						} else {
							this.trappedContentsState = false
						}
					} else {
						res.state = false;
					}
				});
			},
			mapselectClick(v) {
				this.behaviorState.forEach((res, index) => {
					if (v.name === res.name) {
						res.state = true;
						this.behaviorStates = index + 1;
						this.selectItem(index);
						this.stopTimer();
					} else {
						res.state = false;
					}
				});
			},
			placebarend() {
				this.placebarsOptions = {
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
						barWidth: 10 // 设置柱状图的宽度为 15px
					}]
				};
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
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 30.5%;
		.contents {
			width: 93%;
			height: 100%;
			background-image: url(@/assets/img/newlargeScreen/allbackground.png);
			background-size: 100% 100%;
			padding: 0.364583vw 0.41667vw;
			box-sizing: border-box;
			.title {
				width: 100%;
				height: 10%;
				background-image: url(@/assets/img/newlargeScreen/titleBackground.png);
				background-size: 100% 100%;
				margin-left: 0.3125vw;
				.titles {
					width: 100%;
					height: 100%;
					padding: 0 0.78125vw;
					box-sizing: border-box;

					.titleLeft {
						.icon {
							width: 1.30208vw;
							height: 1.25vw;
						}

						.name {
							font-weight: bold;
							font-size: 0.9375vw;
							color: #FFFFFF;
							margin-left: 0.46875vw;
						}
					}

					.TitleRight {
						font-weight: 500;
						font-size: 0.625vw;
						color: #FFFFFF;
						margin-bottom: 0.41667vw;
					}
				}
			}

			.trappedplace {
				width: 100%;
				height: 90%;

				.mapSelect {
					width: 100%;
					height: 11%;
					margin-top: 0.15625vw;

					.mapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.625vw;
						color: #FFFFFF;
						box-sizing: border-box;
						background-image: url(@/assets/img/newlargeScreen/mapselect.png);
						background-size: 100% 100%;
					}

					.nomapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.625vw;
						color: #477BB1;
						box-sizing: border-box;
						background-image: url(@/assets/img/newlargeScreen/nomapselect.png);
						background-size: 100% 100%;
					}
				}

				.echartsmap {
					width: 100%;
					height: 89%;
					margin-top: 0.104167vw;
				}
			}

			.trappedContents {
				width: 100%;
				height: 90%;

				.allTitle {
					width: 100%;
					height: 36%;
					flex-wrap: wrap;

					.allTitles {
						width: 33%;
						height: 50%;
						background-image: url(@/assets/img/newlargeScreen/titlesBackground.png);
						background-size: 100% 100%;
						padding: 0.520833vw 0;
						box-sizing: border-box;

						.allName {
							font-weight: 500;
							font-size: 0.520833vw;
							color: #FFFFFF;
						}

						.allContent {
							font-weight: bold;
							font-size: 0.729167vw;
							color: #FFFFFF;
							margin-top: 0.104167vw;
						}
					}

					.behaviorTitles {
						width: 33%;
						height: 100%;
						background-image: url(@/assets/img/newlargeScreen/titlesBackground.png);
						background-size: 100% 100%;
						padding: 0.520833vw 0;
						box-sizing: border-box;

						.allName {
							font-weight: 500;
							font-size: 0.729167vw;
							color: #FFFFFF;
						}

						.allContent {
							font-weight: bold;
							font-size: 1.354167vw;
							color: #4C92FA;
							margin-top: 0.208333vw;
						}
					}
				}

				.mapSelect {
					width: 100%;
					height: 9%;
					margin-top: 0.15625vw;

					.mapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.625vw;
						color: #FFFFFF;
						box-sizing: border-box;
						background-image: url(@/assets/img/newlargeScreen/mapselect.png);
						background-size: 100% 100%;
					}

					.nomapSelects {
						width: 24%;
						height: 100%;
						font-weight: bold;
						font-size: 0.625vw;
						color: #477BB1;
						box-sizing: border-box;
						background-image: url(@/assets/img/newlargeScreen/nomapselect.png);
						background-size: 100% 100%;
					}
				}

				.echartsmap {
					width: 100%;
					height: 56.4%;
					margin-top: 0.104167vw;
				}
			}
		}

		.select {
			width: 7%;
			height: 60%;
			position: relative;

			.selects {
				width: 100%;
				height: 50%;
				background-image: url(@/assets/img/newlargeScreen/norightSelects.png);
				background-size: 100% 100%;
				font-weight: bold;
				font-size: 0.78125vw;
				color: #FFFFFF;
				text-align: center;
				line-height: 0.78125vw;
				padding-bottom: 0.364583vw;
				box-sizing: border-box;
				position: absolute;
				z-index: 2;
			}

			.noselects {
				width: 100%;
				height: 50%;
				background-image: url(@/assets/img/newlargeScreen/rightSelects.png);
				background-size: 100% 100%;
				font-weight: bold;
				font-size: 0.78125vw;
				color: #FFFFFF;
				text-align: center;
				line-height: 0.78125vw;
				padding-bottom: 0.104167vw;
				box-sizing: border-box;
				position: absolute;
				z-index: 1;
			}
		}
	}
</style>