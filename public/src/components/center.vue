<template>
	<div class="center">
		<div class="statistics justifyBetween">
			<div class="newStatistics justifyAround">
				<div class="newStatisticsS flexDirectionCenter" v-for="(v,i) in statisticsList.trapped"  @mouseenter="mouseenter(v)" @mouseleave="mouseleave(v)"  @click="trappedDisposeClick(v)">
					<div class="name">{{v.name}}</div>
					<div class="num" :style="{'color':v.color}">{{v.content}}</div>
				</div>
			</div>
			<div class="newStatistics justifyAround">
				<div class="newStatisticsS flexDirectionCenter" v-for="(v,i) in statisticsList.obstacle" @click="obstacleClick(v)">
					<div class="name">{{v.name}}</div>
					<div class="num">{{v.content}}</div>
				</div>
			</div>
			<!-- cententBackground.png -->
		<!-- 	 <div class="statisticsS flexDirectionCenter" 
                 v-for="(v,i) in statisticsList" 
                 @click="trappedDisposeClick(v)"
                 @mouseenter="mouseenter(v)"
                 @mouseleave="mouseleave(v)"
                 :class="{'special-background': v.state, 'shake-animation': v.state, 'flicker-animation': v.state}">
                <div class="name">{{v.name}}</div>
                <div class="num" :style="{'color':v.color}">
                    {{v.content}}
                </div>
            </div>
			<div class="trappedType justifyBetween" v-if="trappedTypeState">
				<div class="trappedTypes flexDirectionCenter" v-for="(v,i) in trappedTypeList">
					<div class="num" :style="{'color':v.color}">{{v.content}}</div>
					<div class="name">{{v.name}}</div>
				</div>
			</div> -->
		<div class="trappedType justifyBetween" v-if="trappedTypeState">
		    <div class="trappedTypes flexDirectionCenter" v-for="(v,i) in trappedTypeList">
		        <div class="num" :style="{'color':v.color}">{{v.content}}</div>
		        <div class="name">{{v.name}}</div>
		    </div>
		</div>
		</div>
		<div class="select flex" v-if="tableState">
			<div class="selects">
				<div class="flexcenter" :class="selectState?'selectName':'selectNames'" @click="selectState=true">困人
				</div>
				<div class="flexcenter" :class="selectState==false?'selectName':'selectNames'"
					@click="selectState=false">阻梯</div>
			</div>
			<div class="table">
				<div class="ul justifyBetween" v-for="(v,i) in tableList" :class="[i % 2 === 0 ? 'ul' : 'uls']">
					<div class="li flexcenter">{{v.jurisdiction}}</div>
					<div class="li flexcenter">{{v.addr}}</div>
					<div class="li flexcenter">{{v.faultTime}}</div>
					<div class="li flexcenter">{{v.faultId}}</div>
					<div class="li flexcenter " @click="tableDispose">前往处理</div>
				</div>
		<!-- 		<div class="ul justifyBetween" v-for="(v,i) in 20" :class="[i % 2 === 0 ? 'ul' : 'uls']">
					<div class="li flexcenter">银川市-兴庆区-望湖路</div>
					<div class="li flexcenter">XXx小区XX栋</div>
					<div class="li flexcenter">2024-10-11 14:22:12</div>
					<div class="li flexcenter">轿厢在开锁区域外停止</div>
					<div class="li flexcenter " @click="tableDispose">前往处理</div>
				</div> -->
			</div>
		</div>
	<!-- 	<div class="search">
			<div class="input flexAlignCenter">
				<input class="searches" value="" placeholder="请输入电梯设备编码" />
				<img src="../assets/img/largeScreen/searchs.png" alt="" class="searchImg" />
			</div>
		</div> -->
	</div>
</template>

<script>
	import {
		daytrappedV2
	} from '@/api/index';
	export default {
		name: 'left',
		data() {
			return {
				tableState:true,
				tableList:[],
				selectState: true,
				trappedDispose: false,
				ObstacleDispose: false,
				trappedTypeState: false,
				tableDisposeState: false,
				trappedTypeList: {},
				statisticsList: {},
				trappedList:[],
				obstacleList:[],
				selectList:{},
			}
		},
		mounted() {
			this.list()
		},
		watch:{
			selectState(){
				if(this.selectState){
					this.tableList=this.selectList.trappedDeals
				}else{
					this.tableList=this.selectList.trappedDeals
				}
			}
		},
		methods: {
			tableDispose(){
				
			},
			list() {
				daytrappedV2({
					sign: this.$route.query.sign
				}).then((res) => {
					this.selectList=res.data
					if(res.data.trappedDeals.length!=0){
						this.selectState=true
						this.tableList=res.data.trappedDeals
					}else if(res.data.batteryDeals.length!=0){
						this.selectState=false
						this.tableList=res.data.batteryDeals
					}else{
						this.tableState=false
						this.tableList=[]
					}
					this.statisticsList = {
						trapped: [{
								name: "当前困人警报",
								content: res.data.trappedCnt.a1,
								id: 1,
								color: "#F03838",
								state: true
							},
							{
								name: "待接警",
								content: res.data.trappedCnt.a2,
								id: 2,
								color: "#FFFFFF",
								state: false
							}
						],
						obstacle: [{
								name: "当前阻梯故障数",
								content: res.data.batteryToDo,
								id: 3,
								color: "#FFFFFF",
								state: false
							},
							{
								name: "今日已处理故障数",
								content:  res.data.batteryComplete,
								id: 4,
								color: "#FFFFFF",
								state: false
							}
						]
					}
					this.trappedTypeList=[{
							name: "待派单",
							content:res.data.trappedCnt.a3,
							color: "#F03838"
						},
						{
							name: "待接单",
							content:res.data.trappedCnt.a4,
							color: "#FFFFFF"
						},
						{
							name: "待到达",
							content:res.data.trappedCnt.a5,
							color: "#FFFFFF"
						},
						{
							name: "待救出",
							content:res.data.trappedCnt.a6,
							color: "#FFFFFF"
						},
						{
							name: "待回访",
							content:res.data.trappedCnt.a7,
							color: "#FFFFFF"
						},
						{
							name: "不合规",
							content:res.data.trappedCnt.a8,
							color: "#FFFFFF"
						}
					]
				})
			},
			mouseenter(v) {
				this.trappedTypeState = true;
				// 手动设置 state 为 true 以测试
				v.state = false;
			},
			mouseleave(v) {
				this.trappedTypeState = false;
				// 手动设置 state 为 false 以测试
				v.state = false;
			},
			trappedDisposeClick(v) {
					this.trappedDispose = true;
					this.$store.commit('trappedDispose', this.trappedDispose);
					this.ObstacleDispose = false;
					this.$store.commit('ObstacleDispose', this.ObstacleDispose);
			},
			obstacleClick(){
				this.ObstacleDispose = true;
				this.$store.commit('ObstacleDispose', this.ObstacleDispose);
				this.trappedDispose = false;
				this.$store.commit('trappedDispose', this.trappedDispose);
			},
			tabledispose() {
				this.tableDisposeState = true;
				this.$store.commit('tableDisposeState', this.tableDisposeState);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@keyframes shake {

		0%,
		100% {
			transform: translateX(0);
		}

		10%,
		30%,
		50%,
		70%,
		90% {
			transform: translateX(-10px);
		}

		20%,
		40%,
		60%,
		80% {
			transform: translateX(10px);
		}
	}

	@keyframes background-flicker {

		0%,
		100% {
			background: radial-gradient(circle, rgba(255, 0, 0, 0.1) 70%, rgba(255, 0, 0, 0.6) 100%);
		}

		50% {
			background: radial-gradient(circle, rgba(255, 0, 0, 0.1) 70%, rgba(255, 0, 0, 0.3) 100%);
		}
	}

	.center {
		width: 44%;
		height: 30%;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 28%;
		margin-top: 3.45972vw;

		.statistics {
			width: 100%;
			height: 35.22%;
			margin-top: 0.83334vw;
			padding: 0 0.26042vw;
			box-sizing: border-box;
			position: relative;

			.newStatistics {
				width: 48%;
				height: 100%;
				background-image: url(../assets/img/largeScreen/cententBackground.png);
				background-size: 100% 100%;

				.newStatisticsS {
					width: 50%;
					height: 100%;
					.name {
						font-weight: 500;
						font-size: 0.9375vw;
						color: #FFFFFF;
					}

					.num {
						font-weight: bold;
						font-size: 2.34375vw;
						color: #FFFFFF;
					}
				}
			}

			.trappedType {
				width: 47.35%;
				height: 65%;
				background: #0E1D45;
				position: absolute;
				left: 0.26042vw;
				bottom: -65%;
				z-index: 4;

				.trappedTypes {
					width: 16.6%;
					height: 100%;
					margin-bottom: 0.3125vw;

					.num {
						font-weight: bold;
						font-size: 0.9375vw;
						color: #F03838;
					}

					.name {
						font-weight: 500;
						font-size: 0.67708vw;
						color: #FFFFFF;
						margin-top: 0.10416vw;
					}
				}
			}

			.statisticsS {
				width: 22%;
				height: 100%;
				background-image: url(../assets/img/largeScreen/centerstatistics.png);
				background-size: 100% 100%;
				transition: background 0.3s ease; // 添加过渡效果

				.name {
					font-weight: 500;
					font-size: 0.9375vw;
					color: #FFFFFF;
				}

				.num {
					font-weight: bold;
					font-size: 2.34375vw;
				}
			}

			.special-background {
				background-image: none; // 清除默认背景图片
				background: radial-gradient(circle, rgba(255, 0, 0, 0.1) 70%, rgba(255, 0, 0, 0.6) 100%);
			}

			.shake-animation {
				animation: shake 0.5s infinite;
			}

			.flicker-animation {
				animation: background-flicker 1s infinite;
			}
		}

		.select {
			width: 100%;
			height: 43.05%;
			background-image: url(../assets/img/largeScreen/table.png);
			background-size: 100% 100%;

			.selects {
				width: 2.8%;
				height: 100%;
				padding: 0.36458vw 0 0 0.36458vw;

				.selectName {
					width: 100%;
					height: 45%;
					text-align: center;
					background: #184164;
					opacity: 0.9;
					font-size: 0.83334vw;
					color: #FFFFFF;
				}

				.selectNames {
					width: 100%;
					height: 44%;
					text-align: center;
					background: #052642;
					opacity: 0.5;
					font-size: 0.83334vw;
					color: #477BB1;
				}
			}

			.table {
				width: 96%;
				height: 90%;
				padding: 0.52083vw 0;
				box-sizing: border-box;
				overflow: auto;
				scrollbar-width: none;

				.ul {
					padding: 0.15625vw 0;
					box-sizing: border-box;

					.li {
						min-width: 20%;
						font-weight: 500;
						font-size: 0.52083vw;
						color: #FFFFFF;
						white-space: nowrap;	
						overflow: hidden;
						text-overflow: ellipsis;
						padding-left: 10px;
						box-sizing: border-box;
					}

					.line {
						border-bottom: 0.05208vw solid #FFFFFF;
					}
				}

				.uls {
					background-image: url(../assets/img/largeScreen/tableSelect.png);
					background-size: 100% 100%;
				}
			}

			.table::-webkit-scrollbar {
				display: none;
			}
		}

		.search {
			width: 100%;
			height: 18.5%;

			.input {
				width: 30%;
				height: 100%;
				background: url(../assets/img/largeScreen/input.png);
				background-size: 100% 100%;
				padding-right: 0.52083vw;
				box-sizing: border-box;

				.searches {
					width: 83%;
					height: 100%;
					background-color: rgba(0, 0, 0, 0);
					outline: none;
					box-shadow: none;
					color: #fff;
					padding-left: 0.78125vw;
					font-size: 0.83334vw;
					border: none;
				}

				.searches::placeholder {
					color: #8F97D2;
					opacity: 1;
				}

				.searches::-webkit-input-placeholder {
					color: #8F97D2;
				}

				.searches::-moz-placeholder {
					color: #8F97D2;
				}

				.searchImg {
					width: 8.29%;
					height: 40.4%;
					margin-top: -0.15625vw;
				}
			}
		}
	}
</style>