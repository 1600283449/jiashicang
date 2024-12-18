<template>
	<div>
		<el-drawer :visible.sync="drawers" :direction="direction" :before-close="handleClose" :modal="false"
			:withHeader="false" size="93%">
			<div class="Trapped">
				<div class="title flexAlignCenter">
					<img src="@/assets/img/largeScreen/leftreturn.png" alt="" srcset="" class="leftreturn" />
					<div class="titleName">检验检测详细统计</div>
				</div>
				<div class="TrappedSelect justifyBetween">
					<div class="TrappedSelects flexcenter" v-for="(v,i) in 4">
							<div class="name">所属辖区</div>
							<el-select v-model="value" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
							<el-select v-model="value" placeholder="请选择" v-if="i==2" style="margin-left: 0.316vw;">
								<el-option v-for="item in options" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
					</div>
				</div>
				<div class="concent">
					<div class="concenttop justifyBetween">
						<div class="mytrappedStatistics">
							<trappedStatistics></trappedStatistics>
						</div>
						<div class="mytrappedStatistics">
							<rescueStatistics></rescueStatistics>
						</div>
					<!-- 	<div class="myrescueStatistics">
							<rescueStatistics></rescueStatistics>
						</div>
						<div class="mycomplianceStatistics">
							<complianceStatistics></complianceStatistics>
						</div> -->
					</div>
					<div class="concentbottom justifyBetween">
						<div class="myfaultSource">
							<faultSource></faultSource>
						</div>
						<div class="myfaultSource">
							<reasonMalfunction></reasonMalfunction>
						</div>
					</div>
				</div>
			</div>
		</el-drawer>
	</div>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	import trappedStatistics from "./trappedStatistics"
	import rescueStatistics from "./rescueStatistics"
	import complianceStatistics from "./complianceStatistics"
	import faultSource from "./faultSource"
	import reasonMalfunction from "./reasonMalfunction"
	export default {
		name: 'Trapped',
		components: {
		 trappedStatistics,
		 rescueStatistics,
		 complianceStatistics,
		 faultSource,
		 reasonMalfunction
		},
		data() {
			return {
				drawers: false,
				direction: 'btt',
				// direction: 'ltr',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: ''
			}
		},
		computed: {
			...mapState([
				'inspectionDrawers'
			]),
		},
		watch: {
			inspectionDrawers() {
				this.drawers = this.inspectionDrawers
			},
		},
		methods: {
			handleClose() {
				this.drawers = false
				this.$store.commit('inspectionDrawers', this.drawers);
			}
		},
	}
</script>

<style lang="scss" scoped>
	.Trapped {
		width: 100%;
		height: 100%;
		background-color: #0e1d45;

		.title {
			height: 4.992%;;
			width: 100%;

			.leftreturn {
				width:  0.391%;
				height: 27.6%;
				margin-left: 1.0665vw;
			}

			.titleName {
				font-weight: 500;
				font-size: 0.7817vw;
				color: #FFFFFF;
				margin-left: 0.6715vw;
			}
		}

		.TrappedSelect {
			width: 100%;
			// height: 6.456%;
			height: 7%;
			margin-top: 0.552vw;
			background-image: url(../../assets/img/largeScreen/TrappedSelect.png);
			background-size: 100% 100%;
			padding: 0.7505vw 0.948vw 0.711vw 1.975vw;
			box-sizing: border-box;
			.TrappedSelects{
				width: 25%;
				height: 100%;
				.name{
					font-weight: 500;
					font-size: 0.7817vw;
					color: #FFFFFF;
					margin-right: 1.185vw;
				}
			}
		}
	}
	.concent{
		width: 100%;
		height: 85%;
		.concenttop{
			width: 100%;
			height: 49%;
			margin-top: 0.5925vw;
			.mytrappedStatistics{
				width: 49.5%;
				height: 100%;
				padding: 0.3555vw 0.474vw;
				box-sizing: border-box;
			}
			.myrescueStatistics{
				width: 24%;
				height: 100%;
				padding: 0.3555vw 0.474vw;
				box-sizing: border-box;
				margin-right: 0.5925vw;
			}
			.mycomplianceStatistics{
				width: 24%;
				height: 100%;
				padding: 0.3555vw 0.474vw;
				box-sizing: border-box;
			}
		}
		.concentbottom{
			width: 100%;
			height: 49%;
			.myfaultSource{
				width: 49.5%;
				height: 100%;
				padding: 0.3555vw 0.474vw;
				box-sizing: border-box;
			}
		}
	}
</style>