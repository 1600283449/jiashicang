<template>
	<div class="disposes justifyBetween">
		<div class="map">
			<div id="disposeMap"></div>
		</div>
		<div class="content">
			<div class="faultHandling">
				<div class="title flexAlignCenter">
					<img src="../../assets/img/largeScreen/disposeicon.png" alt="" class="icon" />
					<div class="name">故障处置</div>
				</div>
				<div class="faultHandlingContent justifyBetween">
					<div class="handle justifyAround">
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/falseAlarm.png" alt="" class="icon" />
							<div class="name">误报引起</div>
						</div>
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/test.png" alt="" class="icon" />
							<div class="name">测试引起</div>
						</div>
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/other.png" alt="" class="icon" />
							<div class="name">其他引起</div>
						</div>
						<div class="line"></div>
					</div>
					<div class="faultHandlingstate">
						<div class="progress flexAlignCenter">
							<div class="myprogress flex" v-for="(v,i) in progresslist">
								<div class="name">{{v.name}}</div>
								<div class="progressState flexAlignCenter">
									<div class="line" :class="v.state?i==0?'mylines lines':'lines':''"></div>
									<img src="../../assets/img/largeScreen/complete.png" alt="" srcset="" class="icon"
										v-if="v.state" />
									<img src="../../assets/img/largeScreen/nocomplete.png" alt="" srcset="" class="icon"
										v-else />
								</div>
							</div>
						</div>
						<div class="input justifyBetween">
							<div class="inputs justifyBetween">
								<div class="name flexcenter">困人人数</div>
								<input type="text" name="" v-model="inputModel" id="" class="myinput">
							</div>
							<div class="inputs justifyBetween">
								<div class="name flexcenter">受伤人数</div>
								<input type="text" name="" v-model="inputModel" id="" class="myinput">
							</div>
							<div class="selectinputs inputs justifyBetween">
								<div class="name flexcenter">故障原因</div>
								<el-select v-model="value" placeholder="请选择" class="myinputselect">
									<el-option v-for="item in options" :key="item.value" :label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
								<!-- <input type="text" name="" v-model="inputModel" id="" class="myinput"> -->
							</div>
						</div>
						<div class="describe flex">
							<div class="describeName">现场描述</div>
							<el-input type="textarea" :rows="2" placeholder="请输入内容" class="describeInput"
								v-model="textarea">
							</el-input>
							<el-button type="primary" class="button">提交</el-button>
						</div>
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
				textarea: "",
				value: '',
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
		mounted() {
			this.initMap()
		},
		methods: {
			// 地图
			initMap() {
				window._AMapSecurityConfig = {
					securityJsCode: "f4de85ab5ecb320d720a67ed6bf0ef69",
				};
				var that = this
				AMapLoader.load({
						key: "86e04d8982b6f31b73443c28bf053138", // 申请好的Web端开发者Key，首次调用 load 时必填
						version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
						plugins: ['AMap.Geocoder'] //插件列表
					})
					.then(AMap => {
						var that = this
						that.map = new AMap.Map("disposeMap", {
							resizeEnable: true,
							zoom: 10,
						});
					})
					.catch(e => {
						console.log(e);
					});
			},
		}
	}
</script>
<style type="text/css">
	.el-select{
		height: 100% !important;
	}
	.el-input{
		height: 100% !important;
	}
	.el-input__inner {
		height: 100% !important;
		border: none !important;
		text-align: right;
	}
	.el-textarea__inner{
		height: 100%;
	}
</style>
<style lang="scss" scoped>
	.disposes {
		width: 100%;
		height: 100%;

		.map {
			width: 30%;
			height: 100%;

			#disposeMap {
				width: 100%;
				height: 100%;
				border-radius: 3px;
			}
		}

		.content {
			width: 69%;
			height: 100%;

			.faultHandling {
				width: 100%;
				height: 52%;
				background-image: url(../../assets/img/largeScreen/faultHandling.png);
				background-size: 100% 100%;

				.title {
					width: 100%;
					height: 10%;
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
							width: 100%;
							height: 33%;
							.icon {
								width: 36.16%;
								height: 55.64%;
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

					.faultHandlingstate {
						width: 86.6%;
						height: 100%;
						padding: 0 3.33334vw;

						.progress {
							// margin-left: 0.46875vw;
							margin-left: -5vw;
							width: 112%;
							margin-top: 0.9vw;
							height: 28.59%;

							.myprogress {
								align-items: flex-end;
								flex-direction: column;
								width: 20%;
								height: 100%;
								position: relative;

								.name {
									font-family: PingFang SC;
									font-weight: 500;
									font-size: 1.04167vw;
									color: #FFFFFF;
									// min-width: 40px;
									position: absolute;
									right: -0.26041vw;
								}

								.progressState {
									text-align: center;
									margin-top: 2.13541vw;
									width: 100%;

									.icon {
										width: 23%;
										height: 100%;
									}

									.line {
										width: 80%;
										height: 0.104167vw;
										background-color: #fff;
									}

									.lines {
										width: 80%;
										height: 0.104167vw;
										background-color: #2879d4;
									}

									.mylines {
										background-color: #0b143a;
									}
								}
							}
						}

						.input {
							margin-top: 1.24vw;
							    width: 100%;
							    height: 15.52%;
							.inputs {
								width: 24.815%;
								height: 100%;
								background: #FFFFFF;
								border-radius: 4px;

								.name {
									height: 100%;
									font-weight: 500;
									font-size: 0.83334vw;
									color: #0D162B;
									padding: 0.57291vw 0.78125vw;
									box-sizing: border-box;
									margin-top: -0.104167vw;

								}

								.myinput {
									width: 40%;
									height: 90%;
									border: none;
									border-radius: 4px;
									margin-right: 0.15625vw;
									outline: none;
									/* 移除默认的焦点高亮 */
									box-shadow: none;
									/* 移除可能的阴影效果 */
									text-align: right;
								}
							}

							.selectinputs {
								width: 40.737%;
								.myinputselect {
									width: 60%;
									height:100%;
									border: none;
									border-radius: 4px;
									margin-right: 0.15625vw;
									outline: none;
									/* 移除默认的焦点高亮 */
									box-shadow: none;
									/* 移除可能的阴影效果 */
									text-align: right;
								}
							}
						}
					}

					.describe {
						width: 100%;
						height: 23.69%;
						margin-top: 24px;

						.describeName {
							font-weight: 500;
							font-size: 0.88541vw;
							color: #FFFFFF;
							min-width: 12.91%;
						}

						.button {
							height: 60%;
							margin-top: 3%;
							margin-left: 2.08334vw;
							line-height: 60%;
						}
					}
				}
			}

			.faultDetails {
				width: 100%;
				height: 48%;
				background-image: url(../../assets/img/largeScreen/faultDetails.png);
				background-size: 100% 100%;

				.title {
					width: 100%;
					height: 10%;
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
							width: 100%;
							height:50%;
							.icon {
								width: 60.26%;
								height: 61.65%;
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
							margin-left: 10px;
						}
					}
				}
			}
		}
	}
</style>