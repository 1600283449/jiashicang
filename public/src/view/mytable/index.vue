<template>
	<el-dialog :visible.sync="drawers" :show-close="false"  size="93%" width="1200px" @close="close">
		<div class="justifyBetween mytrappedDispose">
			<div class="trappedDispose">
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
					<div class="ul justifyBetween" v-for="(v,i) in 25" :class="[i % 2 === 0 ? 'ul' : 'uls']">
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
							<div class="button flexcenter" @click="dispose()">
								处置
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
	export default {
		name: 'mytable',
		data() {
			return {
				drawers:false,
			}
		},
		computed: {
			...mapState([
				'mytablestate'
			]),
		},
		watch: {
			mytablestate() {
				this.drawers = this.mytablestate
			},
		},
		methods: {
			close() {
				this.drawers = false
				this.$store.commit('mytablestate', this.drawers);
			},
		}
	}
</script>
<style>
	.el-dialog__header{
		padding: 0 !important;
	}
	.el-dialog__body{
		padding: 0 !important;
	}
</style>
<style lang="scss" scoped>
	.mytrappedDispose {
		width: 100%;
		height: 64.8%;
		.trappedDispose {
			width: 100%;
			height: 100%;
			padding: 0.83334vw 0.93748vw;
			box-sizing: border-box;

			.title {
				width: 100%;
				height: 6%;
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
				height:  23px;;
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
						text-align: center;
						padding-left: 42px;
						color: #FFFFFF;
						white-space: nowrap;
						/* 禁止文字换行 */
						overflow: hidden;
						/* 裁剪超出容器的内容 */
						text-overflow: ellipsis;
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
						color: #FFFFFF;
						white-space: nowrap;
						/* 禁止文字换行 */
						overflow: hidden;
						/* 裁剪超出容器的内容 */
						text-overflow: ellipsis;

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
	}
</style>