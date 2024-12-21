<template>
	<div class="disposes justifyBetween">
		<div class="map">
			<!-- <iframe :src="plugFlowUrl" width="600" height="400" frameborder="0"></iframe> -->
			<!-- <div id="disposeMap"></div> -->
			<!-- <iframe src="" frameborder="0"></iframe> -->
			<video style="width: 100%;height: 100%;" ref="videoElement"></video>
			<button @click="playVideo">播放</button>
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
								<div class="progressState flexAlignCenter" @click="progressClick(v)">
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
								<input type="text" name="" v-model="trappedList.dealTrapped" id="" class="myinput">
							</div>
							<div class="inputs justifyBetween">
								<div class="name flexcenter">受伤人数</div>
								<input type="text" name="" v-model="trappedList.dealCasualties" id="" class="myinput">
							</div>
							<div class="selectinputs inputs justifyBetween">
								<div class="name flexcenter">故障原因</div>
								<!-- 			<el-select v-model="trappedList.dealReason" placeholder="请选择" class="myinputselect">
									<el-option v-for="item in fauitList" :key="item.id" :label="item.text"
										:value="item.id">
									</el-option>
								</el-select> -->
								<el-cascader v-model="trappedList.dealReason" :options="fauitList"
									:props="{ value: 'id', label: 'text' }" @change="handleChange"></el-cascader>
							</div>
						</div>
						<div class="describe flex">
							<div class="describeName">现场描述</div>
							<el-input type="textarea" :rows="2" placeholder="请输入内容" class="describeInput"
								v-model="trappedList.dealScene">
							</el-input>
							<!-- <el-button type="primary" class="button">提交</el-button> -->
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
						<div class="handles flexDirectionCenter" @click="videoClick()">
							<img src="../../assets/img/largeScreen/pictureRecording.png" alt="" class="icon" />
							<div class="name">视频播放</div>
						</div>
						<div class="handles flexDirectionCenter">
							<img src="../../assets/img/largeScreen/telephone.png" alt="" class="icon" />
							<div class="name">语音通话</div>
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
		<trappedpop :title="title" :currentTime="currentTime" v-if="progresssState" @cancel="cancel"></trappedpop>
		<pop :progressContent="progressContent" v-if="progresssStates" @cancel="mycancel"></pop>
	</div>
</template>

<script>
	import flvjs from 'flv.js';
	import AMapLoader from "@amap/amap-jsapi-loader";
	import trappedpop from '@/components/trappedpop.vue'
	import pop from '@/components/pop.vue'
	import fauit from "@/assets/JSON/fauit.json"
	import md5 from 'js-md5';
	import {
		Base64
	} from 'js-base64';
	import {
		terminal,
		monitorSteam
	} from '@/api/index';
	export default {
		name: 'trappedDispose',
		data() {
			return {
				inputModel: 0,
				textarea: "",
				value: '',
				plugFlowUrl: "",
				progresssState: false,
				progresssStates: false,
				fauitList: {},
				trappedList: {
					dealTrapped: 0,
					dealCasualties: "",
					dealScene: "",
					dealReason: "",
				},
				progresslist: [{
						name: "接警",
						state: true,
						process: 1
					},
					{
						name: "派单",
						state: false,
						process: 2
					},
					{
						name: "接单",
						state: false,
						process: 3
					},
					{
						name: "到达",
						state: false,
						process: 4
					},
					{
						name: "救赎",
						state: false,
						process: 5
					},
					{
						name: "回访",
						state: false,
						process: 6
					},
				],
				detailList: [],
				title: "",
				currentTime: '',
				progressContent: ''
			}
		},
		components: {
			trappedpop,
			pop
		},
		mounted() {
			this.initMap()
			this.fauitList = fauit
			console.log(this.fauitList)

		},
		props: {
			contentList: {
				type: Object
			}
		},
		watch: {
			contentList: {
				handler(newVal, oldVal) {
					this.inputModel = newVal.iemsAlarmDeal.dealCasualties
					this.progresslist.forEach((v, i) => {
						v.state = false
						for (let item = 0; item <= newVal.iemsAlarmDeal.process; item++) {
							if (item == v.process) {
								v.state = true
							}
						}
					})
					this.detailList = [{
							name: '报警人电话:',
							content: newVal.iemsAlarmDeal.faultMark
						},
						{
							name: '注册编码:',
							content: newVal.elevatorS2Addr
						},
						{
							name: '详细地址:',
							content: newVal.elevatorS2Addr
						},
						{
							name: '所属辖区:',
							content: newVal.elevatorS2AreaIdName
						},
						{
							name: '发生时间:',
							content: newVal.elevatorS2RegNo
						},
						{
							name: '故障描述:',
							content: newVal.faultIdName
						},
						{
							name: '所属楼盘:',
							content: newVal.elevatorS2BuildingIdName
						}
					]
				},
				deep: true, // 启用深度监听
				immediate: true // 立即执行一次监听器，以捕捉绑定时的值
			}
		},
		methods: {
			playVideo() {
				this.$refs.videoElement.play();
			},
			videoClick() {
				if (this.contentList.isVideo == 0) {
					return
				} else if (this.contentList.iotType == 0) {
					return
				} else if (this.contentList.iotType == 1) {
					this.thirdParty()
				}
			},
			thirdParty() {
				terminal(
					this.contentList.iemsAlarmDeal.elevatorId
				).then((res) => {
					this.plugFlow(res.data)
				})
			},
			plugFlow(data) {
				console.log(data)
				var reqObj = {};
				var h = this.time()
				reqObj.requestTime = h;
				const d = Date.now();
				reqObj.sign = md5(data.appkey + data.appSecret + d).toUpperCase();
				reqObj.appKey = data.appkey;
				reqObj.regNo = data.s2RegNo;
				reqObj.companyId = data.companyId;
				reqObj.type =1;
				monitorSteam({
					companyId: data.companyId,
					reqJson: Base64.encode(JSON.stringify(reqObj))
				}).then((res) => {
					const parsedData = JSON.parse(res.data);
					console.log(parsedData)
					this.plugFlowUrl = parsedData.url
					if (flvjs.isSupported()) {
						const videoElement = this.$refs.videoElement;
						this.player = flvjs.createPlayer({
							type: 'flv',
							url: this.plugFlowUrl,
						});
						this.player.attachMediaElement(videoElement);
						this.player.load();
						this.player.play();
					} else {
						console.error('flv.js is not supported in this browser');
					}
				})
			},
			handleChange() {},
			cancel(data) {
				this.progresssState = data.progresssState
			},
			mycancel(data) {
				this.progresssStates = data.progresssState
			},
			progressClick(v) {
				var that = this
				let firstTrueIndex = this.progresslist.findIndex(item => item.state === true);

				// 检查该索引之后的对象，直到找到第一个 state 为 false 的对象
				let nextFalseObject = null;
				if (firstTrueIndex !== -1 && firstTrueIndex + 1 < this.progresslist.length) {
					for (let i = firstTrueIndex + 1; i < this.progresslist.length; i++) {
						if (this.progresslist[i].state === false) {
							nextFalseObject = this.progresslist[i];
							break;
						}
					}
				}
				if (v.name == nextFalseObject.name) {
					if (v.process == 2) {
						if (this.trappedList.dealTrapped == 0) {
							this.progressContent = '困人人数不能为0'
							this.progresssStates = true
							setTimeout(function() {
								that.progresssStates = false
							}, 2000)
						} else {
							this.myprogress(v, nextFalseObject)
						}
					} else {
						this.myprogress(v, nextFalseObject)
					}
				}
			},
			myprogress(v, nextFalseObject) {
				this.title = v.name
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
				const day = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');
				this.currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
				this.progresssState = true
			},
			time() {
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
				const day = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
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
	.el-select {
		height: 100% !important;
	}

	.el-input {
		height: 100% !important;
	}

	.el-input__inner {
		height: 100% !important;
		border: none !important;
		text-align: right;
	}

	.el-textarea__inner {
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
									height: 100%;
									border: none;
									border-radius: 4px;
									margin-right: 0.15625vw;
									outline: none;
									/* 移除默认的焦点高亮 */
									box-shadow: none;
									/* 移除可能的阴影效果 */
									text-align: right;
								}

								.name {
									width: 110px;
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
							height: 50%;

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