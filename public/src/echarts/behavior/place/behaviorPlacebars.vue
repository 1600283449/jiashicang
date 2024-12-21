<template>
	<div :style="{ width: '100%', height: heightData }" class="justifyBetween">
		<div :style="{ width: '25%', height: '94%' }">
			<swiper :options="swiperOptions" ref="mySwiper">
				<swiper-slide v-for="(v, index) in placeDatas" :key="index" class="swiper-slide justifyend">
					<div class="name">{{ v.name }}</div>
					<div class="placeIcon flexcenter">
						<img :src="v.icon" alt="" class="placeIcons" />
					</div>
				</swiper-slide>
			</swiper>
		</div>
		<div id="behaviorPlacebars" :style="{ width: '70%', height: '100%' }"></div>
	</div>
</template>

<script>
	import * as echarts from 'echarts'
	import {
		nextTick
	} from 'vue'
	import VueAwesomeSwiper from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	import placeData from "@/assets/JSON/place.json"
	export default {
		name: 'EChartsComponent',
		props: {
			options: {
				type: Object,
				required: true
			},
			heightData: {
				type: String,
				default: '400px'
			}
		},
		components: {
			swiper: VueAwesomeSwiper.swiper,
			swiperSlide: VueAwesomeSwiper.swiperSlide
		},
		data() {
			return {
				swiperOptions: {
					direction: 'vertical',
					slidesPerView: 5,
					spaceBetween: 30,
					loop: true,
					centeredSlides: true,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false,
					},
					speed: 3000,
					initialSlide: 2,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					slideToClickedSlide: true,
				},
				highlightedIndex: 2, // 初始化为2，因为我们要放大第三个项目
				malfunctionEchart: null,
				resizeHandler: null,
				placeDatas: [],
				trappedList: [{
						name: "电瓶车入梯",
						value: "100"
					},
					{
						name: "煤气罐入梯",
						value: "60"
					},
					{
						name: "扒门报警",
						value: "50"
					},
					{
						name: "蹦跳打闹报警",
						value: "9"
					},
					{
						name: "画面遮挡",
						value: "119"
					}
				],
				activeIndex: 2
			}
		},
		watch: {
			options: {
				handler(newVal, oldVal) {
					this.behaviorPlacebarsChart();
				},
				deep: true,
				immediate: true
			}
		},
		mounted() {
			this.myplaceData()
			this.$nextTick(() => {
				this.behaviorPlacebarsChart();
				// 修正拼写错误
				// 确保在 Swiper 初始化完成后访问其属性
				if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
					// 如果需要在初始化时立即访问属性，可以在这里做
					this.updateHighlightedIndex();
				} else {
					// 否则，使用事件监听器
					this.$refs.mySwiper.swiper.on('init', () => {
						// 现在可以安全地访问 Swiper 的属性了
						this.updateHighlightedIndex();
					});
				}

				// 监听 slideChange 事件
				this.$refs.mySwiper.swiper.on('slideChange', () => {
					this.updateHighlightedIndex();
				});
			});

			this.resizeHandler = () => {
				if (this.malfunctionEchart) {
					this.malfunctionEchart.resize();
				}
			};
			window.addEventListener("resize", this.resizeHandler);
		},
		update() {
			this.myplaceData()
		},
		
		beforeDestroy() {
			if (this.malfunctionEchart) {
				this.malfunctionEchart.dispose();
			}
			if (this.resizeHandler) {
				window.removeEventListener("resize", this.resizeHandler);
			}
		},
		methods: {
			myplaceData() {
				placeData.forEach((v, i) => {
					this.placeDatas.push({
						name: v.name,
						icon: require(`@/assets/img/icon/${v.icon.replace('@/assets/img/icon/', '')}`)
					})
				})
			},
			updateHighlightedIndex() {
				const swiper = this.$refs.mySwiper.swiper;
				const activeIndex = swiper.activeIndex;
				const slidesPerView = this.swiperOptions.slidesPerView;
				this.highlightedIndex = activeIndex;
			},
			behaviorPlacebarsChart() {
				try {
					if (!document.getElementById('behaviorPlacebars')) {
						return;
					}

					this.options.series[0].data = [];
					this.options.yAxis.data = [];

					this.trappedList.forEach((res) => {
						this.options.series[0].data.push(res.value);
						this.options.yAxis.data.push(res.name);
					});

					this.malfunctionEchart = echarts.init(document.getElementById('behaviorPlacebars'), null, {
						devicePixelRatio: 2.5
					});
					this.myplaceData()
					this.malfunctionEchart.setOption(this.options);
				} catch (error) {
					console.error(error);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	.name {
		color: #fff;
		transition: font-size 0.3s ease;
	}

	.swiper-container {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		display: flex;
		height: auto;
	}

	.swiper-pagination {
		top: auto;
		bottom: 10px;
	}

	.name {
		font-size: 12px;
		color: #fff !important;
		display: none;
	}

	.placeIcon {
		width: 33px;
		height: 33px;
		background-image: url(@/assets/img/icon/place.png);
		background-size: 100% 100%;
		margin-right: 10px;

		.placeIcons {
			width: 17px;
			height: 17px;
		}
	}

	.swiper-slide-active {
		.name {
			font-size: 12px;
			color: #fff !important;
			display: block;
			max-width: 35px;
			overflow: hidden;
			margin-right: 4px;
			white-space: nowrap;
			/* 禁止文本换行 */
			overflow: hidden;
			/* 隐藏超出容器的内容 */
			text-overflow: ellipsis;
			/* 使用省略号表示被截断的内容 */
		}

		.placeIcon {
			width: 52px;
			height: 52px;
			background-image: url(@/assets/img/icon/places.png);
			background-size: 100% 100%;
			margin-right: 0;

			.placeIcons {
				width: 24px;
				height: 24px;
			}
		}
	}
</style>