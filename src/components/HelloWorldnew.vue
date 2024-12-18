<template>
	<div id="container"></div>
</template>
<script>
	import AMapLoader from "@amap/amap-jsapi-loader";
	import {
		mapState
	} from 'vuex';
	import {
		elevator,
		indexLdg
	} from '@/api/index';
	export default {
		name: 'mymap',
		data() {
			return {
				markers: [],
				cmust: [],
				cluster: [],
				map: {},
				renderMarker: null,
				offset: 0, //全部数据从第几条开始查
				total: 0,
				weatherList: [],
				params: {
					sign:"6834736d4666436f4a54566d7658336b7751445346773d3d",
					limit: 500,
					offset: 0,
					searchText: '',
					searchArea: '',
					useStatus: '-1',
					monitorStatus: '0',
					installUnit: '-1',
					maiUnit: '-1',
					ownerUnit: '-1',
					useUnit: '-1',
					vendorUnit: '-1',
					ladderAgeStatus: '-1',
					usePlace: '',
				}
			}
		},
		mounted() {
			this.elevators()
			this.initMap();
			this.renderMarkers()
		},
		unmounted() {
			this.map?.destroy();
		},
		computed: {
			...mapState([
				'cityValue' // 映射 this.someState 为 this.$store.state.someState  
			]),
		},
		watch: {
			markers: {
				handler(newVal, oldVal) {
					console.log('Markers have changed:');
					// 在这里可以添加你的逻辑，例如重新渲染地图上的标记
				},
				deep: true // 开启深度监听
			},
			cityValue() {
				var address = this.cityValue[0] + this.cityValue[1] + this.cityValue[2]
				this.geocodeAddress(address)
			},
		},
		methods: {
			indexLdgList(){
				indexLdg({sign:"6834736d4666436f4a54566d7658336b7751445346773d3d"}).then((res)=>{
					console.log(res)
				})
			},
			//电梯全部数据
			elevators() {
				let beers = []
				let nbvc = []
				elevator(this.params).then(response => {
					this.total = this.total + 500
					if (response.rows != []) {
						if (this.params.offset < response.total) {
							response.rows.forEach((item) => {
								item.center = [item.longitude, item.latitude]
								item.nuers = {
									item,
									lnglat: [item.longitude, item.latitude]
								}

								if (this.markers.length < response.total) {
									beers.push(item.nuers)
									this.markers.push(item.nuers)
									// this.cluster.addData(beers)
									if (this.markers.length == this.total) {
										this.params.offset = this.markers.length + 1
										this.points();
										// 继续查询
										// this.elevators()
									}
								} else {
									nbvc.push(item.nuers)
									this.cmust.push(item.nuers)
								}
							})
						} else {
							if (this.markers.length == response.total) {
								if (this.cmust.length == response.total) {
									this.cluster.setData(this.cmust)
									this.params.offset = 0
									this.cmust = []
								} else {
									this.params.offset = 0
								}
							}
						}

					} else {
						return
					}

				}, (err) => {
					console.log(err)
				})

			},
			renderMarkers() {
				var that = this
				this.renderMarker = function(context) {
					var ec = context.data[0].item
					if (ec.iotType !== 2) {
						that.content =
							'<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>'
					} else {
						that.content =
							'<div style="background-color: Orange; height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>'
					}
					// var content = '<div style="background-color: hsla(180, 100%, 50%, 0.3); height: 18px; width: 18px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 3px;"></div>';
					var offset = new AMap.Pixel(-9, -9);
					context.marker.setOffset(offset)
					context.marker.setContent(that.content)
					context.marker.on('mouseover', ev => {
						let extData = context.data[0].item
						if (extData.monitorStatus == 0) {
							if (extData.iotType !== 2) {
								that.vex = '正常'
							} else {
								that.vex = '未绑硬件'
							}
						} else if (extData.monitorStatus == 1) {
							that.vex = '硬件离线'
						} else if (extData.monitorStatus == 2) {
							that.vex = '正常'
						} else if (extData.monitorStatus == 3) {
							that.vex = '故障中'
						} else if (extData.monitorStatus == 4) {
							that.vex = '困人中'
						} else if (extData.monitorStatus == 5) {
							that.vex = '维保中'
						}
						//信息窗体的内容
						var content = [
							"电梯唯一码:" + extData.unqNo,
							"设备编号 :" + extData.regNo,
							"所在地点 : " +extData.areaIdName+extData.addr,
							"检测状态 : " + that.vex
						];

						//创建 infoWindow 实例
						that.infoWindow = new AMap.InfoWindow({
							content: content.join("<br>"), //传入字符串拼接的 DOM 元素
						});

						//打开信息窗体
						that.infoWindow.open(that.map, [ev.lnglat.lng, ev.lnglat
							.lat
						]); //map 为当前地图的实例，map.getCenter() 用于获取地图中心点坐标。
					})
					context.marker.on('mouseout', () => {
						// console.log(890,e)
						that.infoWindow.close()
					})
					context.marker.on('click', () => {
						console.log(that.$data, '我们')
						that.Beluser = context.data[0].item
						console.log(that.Beluser, '我们')
						if (context.data[0].item.isVideo == 0) {
							that.videof = false
						} else {
							that.videof = true
						}
						if (context.data[0].item.iotType == 2) {
							that.$message.error('此设备未绑定智能硬件!!!');
						} else {
							// that.sendDataMsg = that.Beluser.s2TerminalRegid
							// that.terminal(that.Beluser)
							that.show_floorDes = JSON.parse(that.Beluser.iemsElevatorPolicy.runset)
								.floorDes
							// that.init()    
							that.$data.indexk = true
						}
					})
				}
			},
			points() {
				var that = this
				var markers = this.markers
				that.sts = [{
					url: "//a.amap.com/jsapi_demos/static/images/blue.png",
					size: new AMap.Size(32, 32),
					offset: new AMap.Pixel(-16, -16)
				}, {
					url: "//a.amap.com/jsapi_demos/static/images/green.png",
					size: new AMap.Size(32, 32),
					offset: new AMap.Pixel(-16, -16)
				}, {
					url: "//a.amap.com/jsapi_demos/static/images/orange.png",
					size: new AMap.Size(36, 36),
					offset: new AMap.Pixel(-18, -18)
				}, {
					url: "//a.amap.com/jsapi_demos/static/images/red.png",
					size: new AMap.Size(48, 48),
					offset: new AMap.Pixel(-24, -24)
				}, {
					url: "//a.amap.com/jsapi_demos/static/images/darkRed.png",
					size: new AMap.Size(48, 48),
					offset: new AMap.Pixel(-24, -24)
				}];
				if (that.map) {
					that.map.plugin("AMap.MarkerCluster", function() {
						that.cluster = new AMap.MarkerCluster(that.map, markers, {
							styles: that.sts,
							gridSize: 100,
							renderMarker: that.renderMarker
						});
					});
				} else {}
				that.cluster.on('click', (item) => {
					console.log(item)
					//此处是通过包含点的数量判断是否是聚合点，不是聚合点就执行上方单个点的点击方式
					if (item.clusterData.length <= 1) {
						return;
					}
					//这里是计算所有聚合点的中心点
					let alllng = 0,
						alllat = 0;
					for (const mo of item.clusterData) {
						alllng += mo.lnglat.lng;
						alllat += mo.lnglat.lat;
					}
					const lat = alllat / item.clusterData.length;
					const lng = alllng / item.clusterData.length;
					//这里是放大地图，此处写死了每次点击放大的级别，可以根据点的数量和当前大小适应放大，体验更佳
					this.map.setZoomAndCenter(this.map.getZoom() + 2, [lng, lat]);
				});
			},
			positioning() {
				AMap.plugin('AMap.Geolocation', function() {
					var geolocation = new AMap.Geolocation({
						enableHighAccuracy: true, //是否使用高精度定位，默认:true
						timeout: 10000, //超过10秒后停止定位，默认：5s
						position: 'RB', //定位按钮的停靠位置
						offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
						zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点

					});
					this.map.addControl(geolocation);
					geolocation.getCurrentPosition(function(status, result) {
						if (status == 'complete') {
							this.onComplete(result)
						} else {
							this.onError(result)
						}
					});
				});
			},
			//解析定位结果
			onComplete(data) {
				// document.getElementById('status').innerHTML='定位成功'
				var str = [];
				str.push('定位结果：' + data.position);
				str.push('定位类别：' + data.location_type);
				if (data.accuracy) {
					str.push('精度：' + data.accuracy + ' 米');
				} //如为IP精确定位结果则没有精度信息
				str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
				console.log(str)
				// document.getElementById('result').innerHTML = str.join('<br>');
			},
			//解析定位错误信息
			onError(data) {
				console.log(data)
				// document.getElementById('status').innerHTML='定位失败'
				// document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message+'</br>浏览器返回信息：'+data.originMessage;
			},
			// 天气
			Weather(e) {
				var that = this
				AMap.plugin('AMap.Weather', function() {
					var weather = new AMap.Weather();
					//未来4天天气预报
					weather.getForecast(e.district, function(err, data) {
						that.weatherList = data.forecasts
						that.$store.commit('WeatherLists', data.forecasts);
					});
				});
			},
			geocodeAddress(address) {
				console.log(address)
				var geocoder = new AMap.Geocoder();
				geocoder.getLocation(address, (status, result) => {
					console.log(address, 123)
					if (status === 'complete' && result.geocodes.length) {
						const location = result.geocodes[0].location;
						this.map.setCenter(location); // 设置地图中心点  
						this.map.setZoom(11); // 可以根据需要调整缩放级别  
					} else {
						console.error('未找到对应的经纬度', result);
					}
				});
			},
			// 当前区域定位
			logMapinfo() {
				var that = this
				this.map.getCity(function(info) {
					that.$store.commit('city', info);
					if (info.district) {
						that.Weather(info)
					}
				});
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
						that.map = new AMap.Map("container", {
							resizeEnable: true,
							zoom: 10,
							center: ['120.16110568','30.8544832'],
							mapStyle: 'amap://styles/d3ca347c6fedaa405fedcd482fb7336f'
						});
						that.map.on('moveend', that.logMapinfo);
						that.logMapinfo()
						that.$store.commit('map', that.map);
						that.map.setDefaultCursor("pointer");

						that.map.getCity(function(info) {
							that.$store.commit('center',info);
						});
					})
					.catch(e => {
						console.log(e);
					});
			},

		},
	};
</script>
<style scoped>
	#container {
		width: 100%;
		height: 100vh;
	}
</style>