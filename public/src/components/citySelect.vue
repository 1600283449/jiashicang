<template>
	<el-dialog :visible.sync="myouterVisibles" width="30%" :before-close="handleClose" :modal="false">
		<div>
			<div class="flexAlignCenter">
				<el-cascader v-model="value" :options="cityDatas" :props="{ expandTrigger: 'hover',value:'label'}"
					@change="handleChange" filterable></el-cascader>
				<div style="width: 10px;"></div>
				<el-button type="primary" @click="positioning">重置</el-button>
			</div>
			<div class="concent">
				<p class="Title">搜索历史</p>
				<div class="city flexAlignCenter">
					<p class="citys flexcenter" v-for="(v,i) in citylist" @click="selectClick(v)">
						{{v[0]}}{{v[1]}}{{v[2]}}</p>
				</div>
				<p class="Title">热门城市</p>
				<div class="city flexAlignCenter">
					<p class="citys flexcenter" v-for="(v,i) in citylist" @click="selectClick(v)">
						{{v[0]}}{{v[1]}}{{v[2]}}</p>
				</div>
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="noCitySelect">取 消</el-button>
			<el-button type="primary" @click="citySelect">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import cityData from "@/assets/JSON/city.json"
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				value: "",
				cityDatas: "",
				citySelectData: [],
				citylist: [],
				cityValue: "",
				myouterVisibles: false,
			};
		},
		props: {
			outerVisibles: Boolean
		},
		computed: {
			...mapState([
				'map','center' // 映射 this.someState 为 this.$store.state.someState  
			]),
		},
		watch: {
			outerVisibles() {
				this.myouterVisibles = this.outerVisibles
			}
		},
		mounted() {
			this.cityDatas = cityData
			let value = localStorage.getItem('citySelectData');
			if (value) {
				this.citylist = JSON.parse(value)
			}
		},
		methods: {
			handleClose(done) {
				this.myouterVisibles = false
				this.$emit("handleClose", this.myouterVisibles)
			},
			handleChange(value) {},
			selectClick(v) {
				this.value = v
			},
			noCitySelect() {
				this.handleClose()
			},
			// 高德暂未开放浏览器不支持 浏览器定位
			positioning() {
				this.cityValue=[]
				this.cityValue.push(this.center.province)
				this.cityValue.push(this.center.city)
				this.cityValue.push(this.center.district)
				this.value=this.cityValue
			},
			citySelect() {
				// 合并城市值
				this.cityValue = this.value;
				// 确保城市值不为空
				if (!this.cityValue || this.cityValue.length === 0) {
					return; // 如果城市值为空，则直接返回
				}
				// 检查城市值是否已存在于列表中
				let exists = this.citylist.some(item =>
					item[0] === this.cityValue[0] && item[1] === this.cityValue[1] && item[2] === this.cityValue[2]
				);

				// 如果城市值不存在于列表中
				if (!exists) {
					// 如果列表长度达到10，移除第二个元素
					if (this.citylist.length >= 10) {
						console.log(12);
						this.citylist.splice(1, 1); // 移除索引为1的元素
					}
					// 将新城市值添加到列表末尾
					this.citylist.push(this.cityValue);
					// 更新本地存储
					localStorage.setItem('citySelectData', JSON.stringify(this.citylist));
				}
				this.$store.commit('cityValue', this.cityValue);
				this.handleClose()
			}
		}
	}
</script>
<style type="text/css" lang="scss">
	.concent {
		.Title {
			margin-top: 10px;
			font-size: 16px;
			font-weight: bold;
		}

		.city {
			flex-wrap: wrap;

			.citys {
				min-width: 135px;
				padding: 3px 15px;
				box-sizing: border-box;
				background: rgba(244, 244, 244, 1.0);
				border-radius: 20px;
				font-weight: 400;
				font-size: 12px;
				margin: 5px 5px 0 0;
			}
		}
	}
</style>
<style>
	.el-cascader {
		max-width: 100%;
	}
</style>