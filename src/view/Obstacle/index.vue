<template>
	<div class="justifyBetween mytrappedDispose" v-if="ObstacleDisposeState==true">
		<div class="trappedDispose">
			<div class="title justifyBetween">
				<div class="titles flexcenter">
					<img src="@/assets/img/largeScreen/Trapped.png" alt="" class="titleIcon" />
					<div class="titleContent">
						阻梯故障统计
					</div>
				</div>
				<div class="details" @click="close()">x</div>
			</div>

			<div class="tables">
				<div class="ul justifyBetween ulTitle">
					<div class="li flexcenter">
						电梯编号
					</div>
					<div class="li flexcenter">
						详细地址
					</div>
					<div class="li flexcenter">
						被困时间
					</div>
					<div class="li flexcenter">
						操作
					</div>
				</div>
			</div>
			<div class="table">
				<div class="ul justifyBetween" v-for="(v,i) in 30" :class="[i % 2 === 0 ? 'ul' : 'uls']">
					<div class="li flexcenter">
						1234456456
					</div>
					<div class="li flexcenter">
						银川市-兴庆区-望湖路
					</div>
					<div class="li flexcenter">
						2024-11-07-05:08:45
					</div>
					<div class="li flexcenter" style="width: 22%;">
						<div class="button flexcenter">
							处置
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content">
			<div class="select flexAlignCenter">
				<div class="selects flexcenter">故障与处置</div>
				<div class="selects noselect flexcenter">电梯档案</div>
			</div>
			<div class="dispose">
				<dispose></dispose>
			</div>
		</div>
	</div>
</template>

<script>
	import dispose from "./dispose"
	import {
		mapState
	} from 'vuex';
	export default {
		name: 'trappedDispose',
		components: {
			dispose
		},
		data() {
			return {
				ObstacleDisposeState: false,
				trappedList: [{
						name: "电梯停止运行",
						value: "100",
						proportion: "30.21%",
					},
					{
						name: "门机故障",
						value: "60",
						proportion: "15.21%",
					},
					{
						name: "厅门锁失效",
						value: "50",
						proportion: "12.21%",
					},
					{
						name: "控制主板失效",
						value: "9",
						proportion: "5.21%",
					},
					{
						name: "其他人为原因",
						value: "6",
						proportion: "5.21%",
					},
					{
						name: "待确认",
						value: "3",
						proportion: "5.21%",
					},
					{
						name: "电梯重启故障",
						value: "2",
						proportion: "5.21%",
					},
					{
						name: "导靴磨损",
						value: "2",
						proportion: "5.21%",
					},
					{
						name: "门触点失效",
						value: "2",
						proportion: "5.21%",
					},
					{
						name: "装修垃圾导致",
						value: "2",
						proportion: "5.21%",
					},
				],
			}
		},
		computed: {
			...mapState([
				'ObstacleDispose'
			]),
		},
		watch: {
			ObstacleDispose() {
				this.ObstacleDisposeState = this.ObstacleDispose
			}
		},
		methods: {
			close() {
				this.ObstacleDisposeState = false
				this.$store.commit('ObstacleDispose', this.ObstacleDisposeState);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mytrappedDispose {
		width: 100%;
		height: 64.8%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 3;

		.trappedDispose {
			width: 28%;
			height: 100%;
			background-image: url(../../assets/img/largeScreen/trappedDisposeBack.png);
			background-size: 100% 100%;
			padding: 0.83334vw 0.93748vw;
			box-sizing: border-box;

			.title {
				width: 100%;
				height: 6%;
				background-image: url(../../assets/img/largeScreen/trappedDisposeTop.png);
				background-size: 100% 100%;
				padding-right: 0.78125vw;
				box-sizing: border-box;

				.titles {
					.titleIcon {
						width: 11.8%;
					}

					.titleContent {
						font-weight: bold;
						font-size: 0.8vw;
						color: #FFFFFF;
						margin-left: 0.5242vw;
					}
				}

				.details {
					font-weight: 500;
					font-size: 1.04166vw;
					color: #FFFFFF;
					margin-bottom: 0.8vw;
				}
			}

			.tables {
				width: 100%;
				height: 3.9%;
				margin-top: 0.3950vw;
				border: 0.05208vw solid #1F3570;

				.ul {
					width: 100%;
					height: 100%;

					.li {
						width: 26%;
						height: 100%;
						font-weight: 500;
						font-size: 0.5925vw;
						margin-left: 1px;
						color: #FFFFFF;
						white-space: nowrap;
						/* 禁止文字换行 */
						overflow: hidden;
						/* 裁剪超出容器的内容 */
						text-overflow: ellipsis;
						/* 用省略号表示被裁剪的内容 */
					}
				}

				.ulTitle {
					background-image: url(../../assets/img/largeScreen/tableTitle.png);
					background-size: 100% 100%;
				}
			}

			.table {
				width: 100%;
				height: 90%;
				border: 0.05208vw solid #1F3570;
				overflow: auto;
				scrollbar-width: none;

				.ul {
					width: 100%;
					height: 6%;

					.li {
						width: 26%;
						height: 100%;
						font-weight: 500;
						font-size: 0.5925vw;
						margin:0 5px;
						color: #FFFFFF;
						white-space: nowrap;
						/* 禁止文字换行 */
						overflow: hidden;
						/* 裁剪超出容器的内容 */
						text-overflow: ellipsis;

						/* 用省略号表示被裁剪的内容 */
						.button {
							padding: 0.15625vw 0.67708vw;
							background: #4665BF;
							border-radius: 0.20833vw;
							font-weight: 500;
							font-size: 0.729167vw;
							color: #FFFFFF;
						}
					}
				}

				.ulTitle {
					background-image: url(../../assets/img/largeScreen/tableTitle.png);
					background-size: 100% 100%;
				}

				.uls {
					background: rgba(23, 42, 92, 0.75);
					border-top: 0.05208vw solid #1F3570;
					/* 顶部边框 */
					border-right: 0;
					/* 右边框（实际上没有边框） */
					border-bottom: 0.05208vw solid #1F3570;
					/* 底部边框 */
					border-left: 0;
				}
			}

			.table::-webkit-scrollbar {
				display: none;
				/* 对于 Chrome, Safari 和 Opera */
			}
		}

		.content {
			width: 72.2%;
			height: 100%;
			background-image: url(../../assets/img/largeScreen/trappedDisposecontentBack.png);
			background-size: 100% 100%;
			position: absolute;
			padding: 0.83334vw 0.88541vw;
			box-sizing: border-box;
			left: 27.7%;

			.select {
				width: 100%;
				height: 6.782%;

				.selects {
					width: 10.354%;
					height: 100%;
					background-image: url(../../assets/img/largeScreen/trappedDisposeSelect.png);
					background-size: 100% 100%;
					font-weight: bold;
					font-size: 0.9375vw;
					color: #FFFFFF;
				}

				.noselect {
					width: 10.354%;
					height: 100%;
					background-image: url(../../assets/img/largeScreen/notrappedDisposeSelect.png);
					background-size: 100% 100%;
					font-weight: bold;
					font-size: 0.9375vw;
					color: #477BB1;
				}
			}

			.dispose {
				width: 100%;
				height: 92%;
				margin-top: 0.41667vw;
			}
		}
	}
</style>