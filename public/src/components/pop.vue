<template>
	<div class="pop">
		<div class="popTitle flexcenter">
			提示
			<div class="delect" @click="cancel">x</div>
		</div>
		<div class="popcontent flexcenter">
			{{progressContent}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pop',
		props: {
			progressContent: {
				type: String
			}
		},
		methods: {
			cancel() {
				this.$emit('cancel', {
					progresssState: false
				});
			}
		}
	}
</script>

<style lang="scss">
	.pop {
		width: 30%;
		min-height: 241px;
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
				font-size: 19px;
				color: #FFFFFF;
			}
		}
	}
</style>