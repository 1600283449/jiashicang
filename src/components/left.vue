<template>
	<div class="left">
		<!-- 智慧救援模块 -->
		<TrappedContent></TrappedContent>
		<!-- 行为分析模块 -->
		<behaviorContent></behaviorContent>
		<!-- 全局洞察模块 -->
		<ObstacleContent></ObstacleContent>
	</div>
</template>

<script>
	import TrappedContent from '../view/Trapped/homePage/index';
	import behaviorContent from '../view/behavior/homePage/index';
	import ObstacleContent from '../view/Obstacle/homePage/index';
	import {
		convertToDaysHoursMinutesSeconds
	} from '@/utils/time.js';

	export default {
		components: {
			TrappedContent,
			behaviorContent,
			ObstacleContent,
		},
		name: 'behavior',
		data() {
			return {
			}
		},
		props: {
		},
		watch: {
		},
		created() {
		},
		mounted() {
		},
		methods: {
		}
	}
</script>
<style lang="scss" scoped>
	.left {
		width: 21%;
		height: 100%;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0.52083vw;
	}
</style>