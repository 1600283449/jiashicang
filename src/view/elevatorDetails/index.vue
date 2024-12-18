<template>
	<el-dialog :visible.sync="drawers" :show-close="false" size="93%" width="1413px" @close="close">
		<div class="disposes justifyBetween">
			<div class="map">
				<img src="../Obstacle/dt.jpeg" alt="" />
			</div>
			<div class="map" style="margin:0 10px 0 10px;">
				<img src="./icon.jpg" alt="" />
			</div>
			<div class="contents">
				<div class="faultDetails">
					<div class="title flexAlignCenter" style="padding-top:4px ;">
						<img src="../../assets/img/largeScreen/disposeicon.png" alt="" class="icon" />
						<div class="name">电梯信息</div>
					</div>
					<div class="faultHandlingContent justifyBetween">
						<div class="faultHandlingstate justifyBetween">
							<div class="faultHandlingstates flex" v-for="v in detailList">
								<div class="titleName">{{v.name}}</div>
								<div class="titleName content">{{v.content}}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="faultDetails">
					<div class="title flexAlignCenter" style="margin-top: 40px;">
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
						<div class="faultHandlingstate">
							<div class="faultHandlingstates flex" v-for="v in detailLists">
								<div class="titleName">{{v.name}}</div>
								<div class="titleName content">{{v.content}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</el-dialog>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import AMapLoader from "@amap/amap-jsapi-loader";
	export default {
		name: 'trappedDispose',
		data() {
			return {
				drawers: false,
				direction: 'btt',
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
				detailLists: [
					{
						name: '设备型号:',
						content: '电梯猫职能终端-视频版'
					},
					{
						name: '服务电话:',
						content: '13812344321'
					},
					{
						name: '设备编号:',
						content: 'ID23452321343'
					},
					{
						name: '在线状态',
						content: '在线'
					},
					{
						name: '所属辖区:',
						content: '银川市-兴庆区-某某街道'
					}
				],
				detailList: [
					{
						name: '注册编码:',
						content: 'ID23452321343'
					},
					{
						name: '设备编号:',
						content: '800575'
					},
					{
						name: '电梯地址:',
						content: '德欣家园4幢1单元L7号梯'
					},
					{
						name: '电梯年龄',
						content: '5年'
					},
					{
						name: '维保单位:',
						content: '银川新奥电梯有限公司'
					},
					{
						name: '维保电话:',
						content: '18712344321'
					},
					{
						name: '电梯类型:',
						content: '直梯'
					},
					{
						name: '内部编号:',
						content: '13412341234123'
					}
				],
			}
		},
		mounted() {},
		computed: {
			...mapState([
				'elevatorstate'
			]),
		},
		watch: {
			elevatorstate() {
				this.drawers = this.elevatorstate
			},
		},
		methods: {
			handleClose() {
			},
			close(){
				this.drawers = false
				this.$store.commit('elevatorstate', this.drawers);
			},
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
			background-size: 100% 139%;
			margin-top: -30px;
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
					padding-left: 2.13541vw;
					;
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
				height: 50%;

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
						width: 16.4%;
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
								width: 70%;
								height: 48.87%;
								margin-top: 10px;
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
							font-size: 0.53334vw;
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
<style>
	/* 全局样式覆盖 */
	.el-dialog__wrapper {
		background-color: rgba(0, 0, 0, 0.5);
		/* 半透明黑色背景 */
	}

	.el-dialog {
		background-color: #0b143a !important;
	}
</style>