<template>
	<div>
		<div id="container" style="width: 100%; height: 100vh;"></div>
	</div>
</template>

<script>
	import AMapLoader from "@amap/amap-jsapi-loader";
	import {
		elevatorAreaLdg,
		elevatorListV2
	} from '@/api/index';
	export default {
		name: "AMapDistrict",
		data() {
			return {
				map: null,
				markers: [],
				zoomState: 0,
				depth: "省",
				elevatorData: [],
				elevatorDatas: [{
					"regNo": "311010382202004319",
					"elevatorId": 44,
					"factoryId": "20ML-04319",
					"latitude": 30.134340627870483,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-滨海新区-沥海街道",
					"addr": "兴湾产业园3D-1",
					"inside": "兴湾产业园3D-1",
					"unqNo": "236981",
					"monitorStatus": 0,
					"longitude": 120.72925075334344
				}, {
					"regNo": "311010382202004313",
					"elevatorId": 45,
					"factoryId": "20ML04313",
					"latitude": 30.133545612282553,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-滨海新区-沥海街道",
					"addr": "兴湾精准医学产业园1幢2号梯",
					"inside": "1-2",
					"unqNo": "236987",
					"monitorStatus": 0,
					"longitude": 120.72828601266285
				}, {
					"regNo": "311010382202004317",
					"elevatorId": 46,
					"factoryId": "20ML-04317",
					"latitude": 30.133332010779075,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-滨海新区-沥海街道",
					"addr": "兴湾精准医学产业园3幢2号梯",
					"inside": "3B-1",
					"unqNo": "236983",
					"monitorStatus": 0,
					"longitude": 120.72898044482325
				}, {
					"regNo": "311010382202004316",
					"elevatorId": 47,
					"factoryId": "20ML-04316",
					"latitude": 30.134335761839427,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-滨海新区-沥海街道",
					"addr": "兴湾精准医学产业园3幢1号梯",
					"inside": "3A-1",
					"unqNo": "236984",
					"monitorStatus": 0,
					"longitude": 120.72845979744643
				}, {
					"regNo": "311010382202004315",
					"elevatorId": 48,
					"factoryId": "20ML-04315",
					"latitude": 30.13307808451305,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-滨海新区-沥海街道",
					"addr": "产业园1#楼1#梯",
					"inside": "1-1",
					"unqNo": "236985",
					"monitorStatus": 0,
					"longitude": 120.72908537815309
				}, {
					"regNo": "311010015202210069",
					"elevatorId": 49,
					"factoryId": "2210-069K",
					"latitude": 29.719393248823884,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-诸暨市-大唐街道",
					"addr": "赵剑刚",
					"inside": "/",
					"unqNo": "247032",
					"monitorStatus": 0,
					"longitude": 120.16627985838629
				}, {
					"regNo": "311010015202210071",
					"elevatorId": 50,
					"factoryId": "2210-071K",
					"latitude": 29.71945238142634,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-诸暨市-大唐街道",
					"addr": "张利华",
					"inside": "/",
					"unqNo": "247033",
					"monitorStatus": 0,
					"longitude": 120.16613201455662
				}, {
					"regNo": "311010015202210070",
					"elevatorId": 51,
					"factoryId": "2210-070K",
					"latitude": 29.71940653952417,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-诸暨市-大唐街道",
					"addr": "赵剑维",
					"inside": "/",
					"unqNo": "247034",
					"monitorStatus": 0,
					"longitude": 120.16622234850043
				}, {
					"regNo": "30103306002002040008",
					"elevatorId": 52,
					"factoryId": "B034",
					"latitude": 29.987017334627577,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-越城区-稽山街道",
					"addr": "住院楼C",
					"inside": "住院楼C",
					"unqNo": "024561",
					"monitorStatus": 0,
					"longitude": 120.60652515564533
				}, {
					"regNo": "35003306812012120004",
					"elevatorId": 53,
					"factoryId": "10020975-0060",
					"latitude": 29.697817855565315,
					"isVideo": 0,
					"iotType": 2,
					"areaIdName": "绍兴市-诸暨市-大唐街道",
					"addr": "永新城东小厅东",
					"inside": "33#",
					"unqNo": "055817",
					"monitorStatus": 0,
					"longitude": 120.16001863145434
				}],
				colors: {},
				disProvince: null,
				citylist: [],
				zoomnum: 0,
				depths:""
			};
		},
		mounted() {
			this.city()
			elevatorListV2({
				sign: this.$route.query.sign,
				limit: 10,
				offset: 1
			}).then((res) => {
				console.log(res)
			})
		},
		watch: {
			zoomState() {
				this.updateMarkers();
			},
		},
		methods: {
			city() {
				elevatorAreaLdg({
					sign: this.$route.query.sign,
				}).then((res) => {
					this.elevatorData = res.data.data
					this.initMap()
				})
			},
			async initMap() {
			    var that = this;
			    window._AMapSecurityConfig = {
			      securityJsCode: "f4de85ab5ecb320d720a67ed6bf0ef69",
			    };
			    try {
			      const AMap = await AMapLoader.load({
			        key: "86e04d8982b6f31b73443c28bf053138",
			        version: "2.0",
			        plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.InfoWindow", "AMap.Geocoder"],
			      });
			
			      // 确保 geocoder.getLocation 完成后再初始化地图
			      await new Promise((resolve, reject) => {
			        var geocoder = new AMap.Geocoder({
			          city: that.elevatorData[0].addr,
			        });
			        var address = [];
			        that.elevatorData.forEach((v, i) => {
			          address.push(v.addr);
			        });
			        geocoder.getLocation(address, function (status, result) {
			          if (status === "complete" && result.info === "OK") {
			            result.geocodes.forEach((item, index) => {
			              that.elevatorData[index].longitude = [item.location.lng, item.location.lat];
			              that.elevatorData[index].adcode = item.adcode;
			              if (item.level == '省') {
			                that.elevatorData[index].level = 0;
			              } else if (item.level == '市') {
			                that.elevatorData[index].level = 1;
			              } else if (item.level == '区县' || item.level == '住宅区') {
			                that.elevatorData[index].level = 2;
			              } else {
			                that.elevatorData[index].level = 2; // 假设默认为区县级别
			              }
			            });
			            resolve();
			          } else {
			            reject(new Error("Geocoder failed"));
			          }
			        });
			      });
			
			      this.initializeMap(AMap);
			    } catch (e) {
			      console.error(e);
			    }
			  },
			initializeMap(AMap) {
				if (this.elevatorData[0].level == 0) {
					this.depth = 0
					this.depths = 0
					this.zoomnum = 6
				} else if (this.elevatorData[0].level == 1) {
					this.depth = 1
					this.depths = 1
					this.zoomnum = 8
				} else if (this.elevatorData[0].level == 2) {
					this.depth = 2
					this.depths = 2
					this.zoomnum = 11
				}
				this.map = new AMap.Map("container", {
					resizeEnable: true,
					zoom: this.zoomnum,
					center: this.elevatorData[0].longitude,
					mapStyle: "amap://styles/d3ca347c6fedaa405fedcd482fb7336f",
					animateEnable: true,
					dragEnable: true,
					zoomEnable: true,
					doubleClickZoom: true,
				});
				this.updateMap();
				this.initPro(this.elevatorData[0].adcode, this.depth);
				this.map.on("zoomend", this.updateMap);
			},
			initPro(code, depth) {
				if (this.disProvince) {
					this.disProvince.setMap(null);
				}
				this.loadNewLayer(code, depth);
			},
			loadNewLayer(code, depth) {
				this.disProvince = new AMap.DistrictLayer.Province({
					zIndex: 12,
					adcode: [code],
					depth: depth,
					styles: {
						fill: (properties) => this.getColorByAdcode(properties.adcode),
						"province-stroke": "cornflowerblue",
						"city-stroke": "white",
						"county-stroke": "rgba(255,255,255,0.5)",
					},
				});
				this.disProvince.setMap(this.map);
			},
			getColorByAdcode(adcode) {
				if (!this.colors[adcode]) {
					var gb = Math.random() * 155 + 50;
					this.colors[adcode] = "rgb(" + gb + "," + gb + ",255)";
				}
				return this.colors[adcode];
			},
			updateMap() {
				var zoom = this.map.getZoom();
				// if (this.depths = 1 && zoom < 7) {
				// 	zoom = 8
				// } else if (this.depths = 2 && zoom < 10) {
				// 	zoom = 10
				// }
				if (zoom < 7) {
					if (this.zoomState != 1) {
						this.zoomState = 1;
						this.depth = 0;
					}
				} else if (zoom >= 7 && zoom < 10) {
					if (this.zoomState != 2) {
						this.zoomState = 2;
						this.depth = 1;
					}
				} else if (zoom >= 10 && zoom < 13) {
					if (this.zoomState != 3) {
						this.zoomState = 3;
						this.depth = 2;
					}
				} else if (zoom >= 13) {
					if (this.zoomState != 4) {
						this.zoomState = 4;
						this.depth = 3;
					}
				}
				this.map.setZoomAndCenter(zoom, this.map.getCenter(), {
					animation: true,
				});
			},
			updateMarkers() {
				this.markers.forEach((marker) => marker.setMap(null));
				this.markers = [];
				switch (this.zoomState) {
					case 1:
						for (const [adcode, data] of Object.entries(this.elevatorData)) {
							if (data.level == 0) {
								const provinceMarker = new AMap.Marker({
									position: totalElevators.longitude,
									title: `总电梯数: ${totalElevators.eleCnt}`,
									content: `<div class="province-marker flexdirection">
              <div class='provinceTitle'>宁夏电梯数据</div>
              <div class="province-markers">总电梯数: ${totalElevators.eleCnt}</div>
              <div class="province-markers">故障电梯数: 3</div>
              <div class="province-markers">发生困人电梯数: 3</div>
              <div class="province-markers">发生阻梯电梯数: 3</div>
            </div>`,
								});
								provinceMarker.on("click", () => {
									this.map.setZoomAndCenter(7, totalElevators.longitude, {
										animation: true,
									});
								});
								this.markers.push(provinceMarker);
							}
						}
						this.initPro(this.elevatorData[0].adcode, this.depth);
						break;
					case 2:

						for (const [adcode, data] of Object.entries(this.elevatorData)) {
							if (data.level == 1) {
								const cityMarker = new AMap.Marker({
									position: data.longitude,
									title: `电梯数: ${data.eleCnt}`,
									content: `<div class="province-marker flexdirection">
								  <div class='provinceTitle'> ${data.addr}</div>
								  <div class="province-markers">总电梯数:  ${data.eleCnt}</div>
								  <div class="province-markers">故障电梯数: 3</div>
								  <div class="province-markers">发生困人电梯数: 3</div>
								  <div class="province-markers">发生阻梯电梯数: 3</div>
								</div>`,
								});
								cityMarker.on("click", () => {
									this.map.setZoomAndCenter(10, data.longitude, {
										animation: true,
									});
								});
								this.markers.push(cityMarker)
							}
						}
						this.initPro(this.elevatorData[0].adcode, this.depth);
						break;
					case 3:
						for (const [adcode, cityData] of Object.entries(this.elevatorData)) {
							// for (const [districtAdcode, districtData] of Object.entries(
							// 		cityData.districts
							// 	))
							if (cityData.level == 2) {
								console.log(cityData)
								const districtMarker = new AMap.Marker({
									position: cityData.longitude,
									title: `电梯数: ${cityData.eleCnt}`,
									content: `<div class="province-marker flexdirection">
                  <div class='provinceTitle'> ${cityData.addr}</div>
                  <div class="province-markers">总电梯数:  ${cityData.eleCnt}</div>
                  <div class="province-markers">故障电梯数: 3</div>
                  <div class="province-markers">发生困人电梯数: 3</div>
                  <div class="province-markers">发生阻梯电梯数: 3</div>
                </div>`,
								});
								districtMarker.on("click", () => {
									this.map.setZoomAndCenter(13, cityData.longitude, {
										animation: true,
									});
								});
								this.markers.push(districtMarker);
							}
						}
						this.initPro(this.elevatorData[0].adcode, this.depth);
						break;
					case 4:
						for (const [adcode, cityData] of Object.entries(this.elevatorDatas)) {
							console.log(cityData, 199)
							const marker = new AMap.Marker({
								position: [cityData.longitude, cityData.latitude],
								title: "电梯位置",
								content: `<div class="coordinate">1</div>`,
							});
							const infoWindow = new AMap.InfoWindow({
								content: `<div class="coordinate-marker flexdirection">
                    <div class='coordinateTitle'> 电梯详情</div>
                    <div class="province-markers">电梯唯一码:${cityData.regNo}</div>
                    <div class="province-markers">设备编号: 2347654543534534</div>
                    <div class="province-markers">所在地点: 旅馆</div>
                    <div class="province-markers">检测状态: 未绑定硬件</div>
                  </div>`,
								offset: new AMap.Pixel(0, -30),
								isCustom: true, // 使用自定义样式
							});
							marker.on("mouseover", () => {
								infoWindow.open(this.map, [cityData.longitude, cityData.latitude]);
							});
							marker.on("mouseout", () => {
								infoWindow.close();
							});
							marker.on("click", () => {
								// const maxZoom = this.map.getMaxZoom();

								const currentZoom = this.map.getZoom();
								if (currentZoom >= 15) {
									this.$store.commit('elevatorstate', true);
								} else {
									this.map.setZoomAndCenter(15, [cityData.longitude, cityData.latitude], {
										animation: true,
									});
								}
							});
							this.markers.push(marker);
						}
						this.disProvince.setMap(null);
						break;
				}
				this.markers.forEach((marker) => marker.setMap(this.map));
			},
		},
	};
</script>

<style scoped>
	html,
	body,
	#container {
		width: 100%;
		height: 100%;
		margin: 0;
	}
</style>

<style lang="scss">
	.province-marker {
		height: 100px;
		width: 116px;
		background-image: url(../assets/img/largeScreen/border.png);
		background-size: 100% 100%;
		color: #fff;
		justify-content: center;
		align-items: flex-start;
		font-size: 12px;
		position: relative;
		padding-left: 10px;
		padding-top: 11px;
		box-sizing: border-box;
	}

	.province-markers {
		margin-top: 3px;
	}

	.provinceTitle {
		position: absolute;
		top: 3px;
		left: 0;
	}

	.coordinate {
		width: 26px;
		height: 35px;
		background-image: url(../assets/img/largeScreen/sign.png);
		background-size: 100% 100%;
		color: #fff;
		text-align: center;
		font-size: 12px;
		line-height: 25px;
	}

	.coordinate-marker {
		height: 114px;
		width: 193px;
		background-image: url(../assets/img/largeScreen/border.png);
		background-size: 100% 100%;
		color: #fff;
		justify-content: center;
		align-items: flex-start;
		font-size: 12px;
		position: relative;
		box-sizing: border-box;
		padding-top: 10px;
		padding-left: 10px;
		margin-top: 28px;
		margin-left: 20px;

		.coordinateTitle {
			position: absolute;
			top: 5px;
			left: 8px;
		}
	}
</style>