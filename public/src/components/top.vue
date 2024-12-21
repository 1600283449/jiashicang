<template>
	<div class="top justifyBetween">
		<div class="concent flexcenter">
			<img src="../assets/img/largeScreen/time.png" alt="" />
			<div class="concents">{{currentTime}}</div>
		</div>
		<div class="concent flexcenter">
			<!-- <img src="../assets/img/largeScreen/address.png" alt="" style="width: 15px;height: 20px;" /> -->
			<!-- <div class="concents">{{citys.province}}-{{citys.city}}-{{citys.district}}</div> -->
		</div>
	</div>
</template>
<script>
	import {
		mapState
	} from 'vuex';
	import citySelect from "./citySelect"
	import weatherData from "@/assets/JSON/weather.json"
	export default {
		name: 'app',
		data() {
			return {
				switchShow: false,
				outerVisible: false,
				currentTime: '',
				WeatherLists: [],
				citys: ""
			}
		},
		components: {
			citySelect
		},
		mounted() {
			var that = this
			setInterval(() => {
				that.updateTime();
			}, 1000);
		},
		computed: {
			...mapState([
				'WeatherList', 'map', 'city' // 映射 this.someState 为 this.$store.state.someState  
			]),
		},
		watch: {
			city() {
				this.citys = this.city
			},
			WeatherList() {
				this.WeatherLists = this.WeatherList
				console.log(this.WeatherList)
			},
		},
		methods: {
			handleClose(data) {
				this.outerVisible = data
			},
			outerVisibleClick() {
				this.outerVisible = true
			},
			getIcon(weatherName) {
				// 查找对应的天气图标  
				const weatherItem = weatherData.find(item => item.name === weatherName);
				if (weatherItem) {
					// 这里可能需要处理路径，确保它是可以直接用在<img>标签中的  
					// 如果你的项目配置了别名解析，并且构建工具（如webpack）能正确处理这些别名，  
					// 那么直接返回weatherItem.icon可能就足够了。  
					// 否则，你可能需要引入require或import来动态加载图片  
					return require(`@/assets/img/icon/${weatherItem.icon.replace('@/assets/img/icon/', '')}`);
				}
				// 如果没有找到对应的天气，可以返回一个默认图标  
			},
			updateTime() {
				const Data = new Date();
				const days = [" 周日", " 周一", " 周二", " 周三", " 周四", " 周五", " 周六"];
				const dayOfWeek = Data.getDay();
				this.currentTime = Data.getFullYear() + "年" +
					(Data.getMonth() + 1) + "月" +
					Data.getDate() + "日 " +
					Data.toLocaleTimeString() + days[dayOfWeek];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		width:100%;
		height:3.45972vw;;
		background-image: url(../assets/img/largeScreen/top.gif);
		background-size: 100% 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		.concent{
			padding: 0 1.52018vw;
			margin-top: 0.61452vw;
			box-sizing: border-box;
			img{
				width: 6.84%;
				height: 6.84%;
			}
			.concents{
				font-weight: 400;
				font-size: 0.94356vw;
				color: #2EB8FF;
				margin-left: 0.41936vw;
			}
		}
	}
</style>