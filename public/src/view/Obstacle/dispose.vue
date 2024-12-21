<template>
	<div class="disposes justifyBetween">
		<div class="map">
			<img src="./dt.jpeg" alt="" />
		</div>
		<div class="contents">
			<div class="faultHandling">
				<div class="title flexAlignCenter">
					<img src="../../assets/img/largeScreen/disposeicon.png" alt="" class="icon" />
					<div class="name">故障处置</div>
				</div>
				<div class="faultHandlingContent justifyBetween">
					<div class="select">
						<div class="selects flexAlignCenter" style="margin-top: -0.651vw;">
							<div class="name">告警类型:</div>
							<div class="selecttype flexAlignCenter" v-for="(v,i) in giveAlarm"
								@click="giveAlarmClick(v)">
								<img src="../../assets/img/largeScreen/ObstacleSelect.png" alt="" srcset=""
									class="selectState" v-if="v.state" />
								<img src="../../assets/img/largeScreen/noObstacleSelect.png.png" alt=""
									class="selectState" v-else />
								{{v.name}}
							</div>
						</div>
						<div class="selects flexAlignCenter" style="margin-top: 1.5625vw;">
							<div class="name">处置类型:</div>
							<div class="selecttype flexAlignCenter" v-for="(v,i) in disposeState"
								@click="disposeStateClick(v)">
								<img src="../../assets/img/largeScreen/ObstacleSelect.png" alt="" srcset=""
									class="selectState" v-if="v.state" />
								<img src="../../assets/img/largeScreen/noObstacleSelect.png.png" alt=""
									class="selectState" v-else />
								{{v.name}}
							</div>
						</div>
					</div>
					<div class="button flexcenter">
						提交处置
					</div>
				</div>
			</div>
			<div class="faultDetails">
				<div class="title flexAlignCenter">
					<img src="../../assets/img/largeScreen/disposeicon.png" alt="" class="icon" />
					<div class="name">故障处置</div>
				</div>
				<div class="faultHandlingContent justifyBetween">
					<div class="handle justifyAround">
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/pictureRecording.png" alt="" class="icon" />
							<div class="name">误报引起</div>
						</div>
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/telephone.png" alt="" class="icon" />
							<div class="name">其他引起</div>
						</div>
						<div class="line"></div>
					</div>
					<div class="faultHandlingstate justifyBetween">
						<div class="faultHandlingstates flex" v-for="v in detailList">
							<div class="titleName">{{v.name}}</div>
							<div class="titleName content">{{v.content}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import AMapLoader from "@amap/amap-jsapi-loader";
	export default {
		name: 'trappedDispose',
		data() {
			return {
				inputModel: 0,
				giveAlarm: [{
					name: "正确告警",
					state: true,
				}, {
					name: "错误告謦",
					state: false,
				}],
				disposeState: [{
					name: "无处置",
					state: true,
				}, {
					name: "恢复运行",
					state: false,
				}, {
					name: "阻止运行",
					state: false,
				}],
				progresslist: [{
						name: "接警",
						state: true,
						lineState: false
					},
					{
						name: "派单",
						state: false,
						lineState: true
					},
					{
						name: "接单",
						state: false,
						lineState: true
					},
					{
						name: "到达",
						state: false,
						lineState: true
					},
					{
						name: "救赎",
						state: false,
						lineState: true
					},
					{
						name: "回访",
						state: false,
						lineState: true
					},
				],
				detailList: [{
						name: '处置结果:',
						content: '误报故障'
					},
					{
						name: '报警人电话:',
						content: '18757773212'
					},
					{
						name: '注册编码:',
						content: 'ID23452321343'
					},
					{
						name: '详细地址:',
						content: '银川金鸿物业管理有限公司银墅湾#5西'
					},
					{
						name: '所属辖区:',
						content: '银川市-南湖区-望湖路'
					},
					{
						name: '发生时间:',
						content: '2024-10-1118:10:10'
					},
					{
						name: '故障描述:',
						content: '紧急呼救'
					},
					{
						name: '恢复时间:',
						content: '2024-10-11 19:10:10'
					},
					{
						name: '运行状态:',
						content: '这里是运行的状态'
					},
					{
						name: '乘客数量:',
						content: '0'
					},
					{
						name: '处置结果:',
						content: '误报故障'
					},
					{
						name: '处置结果:',
						content: '误报故障'
					},
					{
						name: '处置结果:',
						content: '误报故障'
					},
					{
						name: '所属楼盘:',
						content: '这里是所属楼盘'
					}
				],
			}
		},
		mounted() {},
		methods: {
			giveAlarmClick(v) {
				this.giveAlarm.forEach((res, index) => {
					if (res.name == v.name) {
						res.state = true
					} else {
						res.state = false
					}
				})
			},
			disposeStateClick(v) {
				this.disposeState.forEach((res, index) => {
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
	.disposes {
		width: 100%;
		height: 100%;

		.map {
			width: 30%;
			height: 100%;

			img {
				width: 100%;
				height: 100%;
			}

			#disposeMap {
				width: 100%;
				height: 100%;
				border-radius: 3px;
			}
		}

		.contents {
			width: 69%;
			height: 100%;
			background-image: url(../../assets/img/largeScreen/Obstaclebackground.png);
			background-size: 100% 100%;

			.faultHandling {
				width: 100%;
				height: 30%;

				.title {
					width: 100%;
					height: 18%;
					padding: 0.46875vw 0.57291vw;
					box-sizing: border-box;

					.icon {
						width: 2.196%;
						height: 142.1%;
					}

					.name {
						font-size: 0.83334vw;
						color: #FFFFFF;
						margin-left: 0.46875vw;
					}
				}

				.faultHandlingContent {
					width: 100%;
					height: 89%;
					padding-left: 2.13541vw;;
					box-sizing: border-box;

					.select {
						width: 60%;

						.selects {
							width: 100%;

							.name {
								width: 15%;
								font-weight: 500;
								font-size: 0.83334vw;
								color: #FFFFFF;
							}

							.selecttype {
								width: 20%;
								margin-left: 1.40625vw;

								img {
									width: 20.56%;
									height: 20.56%;
									margin-right: 0.625vw;
								}

								font-weight: 500;
								font-size: 0.83334vw;
								color: #FFFFFF;
							}
						}
					}

					.button {
						width: 21.412%;
						height: 31.15%;
						background-color: #4665bf;
						font-weight: 500;
						font-size: 0.83334vw;
						color: #FFFFFF;
						border-radius: 10px;
						margin-right: 1.5625vw;
					}

					.handle {
						width: 13.4%;
						height: 89%;
						flex-direction: column;
						padding: 0.78125vw 0;
						position: relative;

						.line {
							position: absolute;
							right: 0;
							width: 0.10416vw;
							height: 90%;
							z-index: 5;
							background-color: #20346E;
						}
					}

					.faultHandlingstate {
						width: 86.6%;
						height: 100%;
						padding: 0 3.33334vw;
					}
				}
			}

			.faultDetails {
				width: 100%;
				height: 70%;

				.title {
					width: 100%;
					height: 9.5%;
					padding: 0.46875vw 0.572917vw;
					box-sizing: border-box;
					
					.icon {
						width: 2.1956%;
						height: 0.78125vw;
					}

					.name {
						font-size: 0.83334vw;
						color: #FFFFFF;
						margin-left: 0.46875vw;
					}
				}

				.faultHandlingContent {
					width: 100%;
					height: 89%;

					.handle {
						width: 13.4%;
						height: 89%;
						flex-direction: column;
						padding: 0.78125vw 0;
						position: relative;

						.line {
							position: absolute;
							right: 0;
							width: 0.104167vw;
							height: 90%;
							z-index: 5;
							background-color: #20346E;
						}

						.handles {
							.icon {
								width: 100%;
								height: 48.87%;
							}

							.name {
								font-weight: 500;
								font-size: 0.625vw;
								color: #FFFFFF;
								margin-top: 0.15625vw;
								margin-top: 0.41667vw;
							}
						}
					}
				}

				.faultHandlingstate {
					width: 86.6%;
					padding: 0.78125vw 3.33334vw;
					height: 89%;
					flex-wrap: wrap;

					.faultHandlingstates {
						width: 50%;
						margin-top: 0.26041vw;

						.titleName {
							font-family: PingFang SC;
							font-weight: 500;
							font-size: 0.83334vw;
							color: #FFFFFF;
						}

						.content {
							margin-left: 0.52083vw;
						}
					}
				}
			}
		}
	}
</style>