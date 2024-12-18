<template>
	<div>
		<div id="container" style="width: 100%; height: 100vh;"></div>
	</div>
</template>

<script>
	import AMapLoader from "@amap/amap-jsapi-loader";

	export default {
		name: "AMapDistrict",
		data() {
			return {
				map: null,
				markers: [],
				zoomState: 0,
				depth: "省",
				elevatorData: {
					"640100": { // 银川市  
						count: 20,
						name: "银川市",
						positions: [
							[106.278179, 38.46637],
							[106.280000, 38.468000],
							[106.282000, 38.470000],
						],
						districts: {
							"640104": { // 兴庆区
								count: 8,
								name: "兴庆区",
								positions: [
									[106.278179, 38.46637],
									[106.280000, 38.468000],
									[106.282000, 38.470000],
								],
							},
							"640105": { // 西夏区
								count: 12,
								name: "西夏区",
								positions: [
									[106.190000, 38.490000],
									[106.192000, 38.492000],
									[106.194000, 38.494000],
								],
							},
						},
					},
					"640200": { // 石嘴山市
						count: 15,
						name: "石嘴山市",
						positions: [
							[106.382000, 39.020000],
							[106.384000, 39.022000],
							[106.386000, 39.024000],
						],
						districts: {
							"640202": { // 大武口区
								count: 5,
								name: "大武口区",
								positions: [
									[106.382000, 39.020000],
									[106.384000, 39.022000],
									[106.386000, 39.024000],
								],
							},
							"640205": { // 惠农区
								count: 10,
								name: "惠农区",
								positions: [
									[106.400000, 39.040000],
									[106.402000, 39.042000],
									[106.404000, 39.044000],
								],
							},
						},
					},
					"640300": { // 吴忠市
						count: 18,
						name: "吴忠市",
						positions: [
							[106.198000, 37.986000],
							[106.200000, 37.988000],
							[106.202000, 37.990000],
						],
						districts: {
							"640302": { // 利通区
								count: 7,
								name: "利通区",
								positions: [
									[106.198000, 37.986000],
									[106.200000, 37.988000],
									[106.202000, 37.990000],
								],
							},
							"640303": { // 红寺堡区
								count: 11,
								name: "红寺堡区",
								positions: [
									[106.210000, 37.980000],
									[106.212000, 37.982000],
									[106.214000, 37.984000],
								],
							},
						},
					},
					// 你可以继续添加更多市区的数据
				},
				colors: {},
				disProvince: null,
			};
		},
		mounted() {
			this.initMap();
		},
		watch: {
			zoomState() {
				this.updateMarkers();
			},
		},
		methods: {
			initMap() {
				var that = this;
				window._AMapSecurityConfig = {
					securityJsCode: "f4de85ab5ecb320d720a67ed6bf0ef69",
				};
				AMapLoader.load({
						key: "86e04d8982b6f31b73443c28bf053138",
						version: "2.0",
						plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.InfoWindow"],
					})
					.then((AMap) => {
						this.map = new AMap.Map("container", {
							resizeEnable: true,
							zoom: 6,
							center: [106.278179, 38.46637], // 宁夏中心
							mapStyle: "amap://styles/d3ca347c6fedaa405fedcd482fb7336f",
							animateEnable: true,
							dragEnable: true,
							zoomEnable: true,
							doubleClickZoom: true,
						});
						this.updateMap();
						this.initPro(640000, this.depth); // 宁夏省代码
						this.map.on("zoomend", this.updateMap);
					})
					.catch((e) => {
						console.error(e);
					});
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
					depth: depth === "省" ? 0 : depth,
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
				const zoom = this.map.getZoom();
				if (zoom < 7) {
					if (this.zoomState != 1) {
						this.zoomState = 1;
						this.depth = "省";
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
						const totalElevators = Object.values(this.elevatorData).reduce(
							(sum, data) => sum + data.count,
							0
						);
						const provinceMarker = new AMap.Marker({
							position: [106.278179, 38.46637],
							title: `总电梯数: ${totalElevators}`,
							content: `<div class="province-marker flexdirection">
              <div class='provinceTitle'>宁夏电梯数据</div>
              <div class="province-markers">总电梯数: ${totalElevators}</div>
              <div class="province-markers">故障电梯数: 3</div>
              <div class="province-markers">发生困人电梯数: 3</div>
              <div class="province-markers">发生阻梯电梯数: 3</div>
            </div>`,
						});
						provinceMarker.on("click", () => {
							this.map.setZoomAndCenter(7, [106.278179, 38.46637], {
								animation: true,
							});
						});
						this.markers.push(provinceMarker);
						this.initPro(640000, this.depth);
						break;
					case 2:
						for (const [adcode, data] of Object.entries(this.elevatorData)) {
							const cityMarker = new AMap.Marker({
								position: data.positions[0],
								title: `电梯数: ${data.count}`,
								content: `<div class="province-marker flexdirection">
                <div class='provinceTitle'> ${data.name}</div>
                <div class="province-markers">总电梯数:  ${data.count}</div>
                <div class="province-markers">故障电梯数: 3</div>
                <div class="province-markers">发生困人电梯数: 3</div>
                <div class="province-markers">发生阻梯电梯数: 3</div>
              </div>`,
							});
							cityMarker.on("click", () => {
								this.map.setZoomAndCenter(10, data.positions[0], {
									animation: true,
								});
							});
							this.markers.push(cityMarker);
						}
						this.initPro(640000, this.depth);
						break;
					case 3:
						for (const [adcode, cityData] of Object.entries(this.elevatorData)) {
							for (const [districtAdcode, districtData] of Object.entries(
									cityData.districts
								)) {
								const districtMarker = new AMap.Marker({
									position: districtData.positions[0],
									title: `电梯数: ${districtData.count}`,
									content: `<div class="province-marker flexdirection">
                  <div class='provinceTitle'> ${districtData.name}</div>
                  <div class="province-markers">总电梯数:  ${districtData.count}</div>
                  <div class="province-markers">故障电梯数: 3</div>
                  <div class="province-markers">发生困人电梯数: 3</div>
                  <div class="province-markers">发生阻梯电梯数: 3</div>
                </div>`,
								});
								districtMarker.on("click", () => {
									this.map.setZoomAndCenter(13, districtData.positions[0], {
										animation: true,
									});
								});
								this.markers.push(districtMarker);
							}
						}
						this.initPro(640000, this.depth);
						break;
					case 4:
						for (const [adcode, cityData] of Object.entries(this.elevatorData)) {
							for (const districtData of Object.values(cityData.districts)) {
								districtData.positions.forEach((pos) => {
									const marker = new AMap.Marker({
										position: pos,
										title: "电梯位置",
										content: `<div class="coordinate">1</div>`,
									});
									const infoWindow = new AMap.InfoWindow({
										content: `<div class="coordinate-marker flexdirection">
                    <div class='coordinateTitle'> 电梯详情</div>
                    <div class="province-markers">电梯唯一码:98493849589</div>
                    <div class="province-markers">设备编号: 2347654543534534</div>
                    <div class="province-markers">所在地点: 旅馆</div>
                    <div class="province-markers">检测状态: 未绑定硬件</div>
                  </div>`,
										offset: new AMap.Pixel(0, -30),
										isCustom: true, // 使用自定义样式
									});
									marker.on("mouseover", () => {
										infoWindow.open(this.map, pos);
									});
									marker.on("mouseout", () => {
										infoWindow.close();
									});
									marker.on("click", () => {
										// const maxZoom = this.map.getMaxZoom();
										
										const currentZoom = this.map.getZoom();
										console.log(currentZoom)
										if (currentZoom >= 15) {
											this.$store.commit('elevatorstate', true);
										} else {
											this.map.setZoomAndCenter(15, pos, {
												animation: true,
											});
										}
									});
									this.markers.push(marker);
								});
							}
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