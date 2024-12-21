<template>
	<div class="pop">
		<div class="popTitle flexcenter">
			{{title}}
			<div class="delect">x</div>
		</div>
		<div class="popcontent flexDirectionCenter">
			<div class="describe flex">
				<div class="describeName">处置时间</div>
				<el-input placeholder="请输入内容" class="describeInput"
					v-model="currentTime"  :disabled="true">
				</el-input>
			</div>
			<div class="describe flex">
				<div class="describeName">备注</div>
				<el-input
				  type="textarea"
				  :rows="2"
				  placeholder="请输入内容"
				   class="describetextarea"
				  v-model="textarea">
				</el-input>
			</div>
		</div>
		<div class="popbutton flexcenter">
			<div class="popbuttons" @click="cancel">取消</div>
			<div class="popbuttons">提交</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pop',
		props: {
			title: {
				type: String
			},
			currentTime: {
				type: String
			}
		},
		  data() {
		    return {
		      input: '',
			  textarea:""
		    }
		  },
		  methods:{
			  cancel(){
				   this.$emit('cancel', { progresssState: false});
			  }
		  }
	}
</script>
<style type="text/css">
	.el-input__inner{
		width: 100% !important;
		text-align: start !important;
	}
</style>
<style lang="scss" scoped>
	.pop {
		width: 30%;
		min-height: 260px;
		padding: 16px;
		background-image: url(../assets/img/largeScreen/popback.png);
		background-size: 100% 100%;
		position: absolute;
		top: -10%;
		left: 15%;
		z-index: 10;

		.popTitle {
			width: 100%;
			height: 41px;
			background-image: url(../assets/img/largeScreen/poptitle.png);
			background-size: 100% 100%;
			position: relative;
			color: #fff;

			.delect {
				position: absolute;
				color: #fff;
				font-size: 20px;
				font-weight: bold;
				top: -3px;
				right: 10px;
			}
		}

		.popcontent {
			width: 100%;
			min-height: 140px;
			color: #fff;
			padding: 0 30px;
			.describe {
				width: 100%;
				height: 23.69%;
				margin-top: 24px;
			
				.describeName {
					width:17%;
					font-weight: 500;
					font-size: 0.78541vw;
					color: #FFFFFF;
					min-width: 12.91%;
				}
				.describeInput{
					width:70%;
					height: 35px !important;
				}
				.describetextarea{
					width:70%;
					height: 55px !important;
				}
			}
		}

		.popbutton {
			width: 100%;
			height: 10%;

			.popbuttons {
				background: #4665BF;
				border-radius: 8px;
				margin-left: 20px;
				padding: 10px 30px;
				font-weight: 500;
				font-size: 17px;
				color: #FFFFFF;
				margin-top: 30px;
			}
		}
	}
</style>