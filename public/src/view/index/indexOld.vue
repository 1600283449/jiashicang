<template>
	<div>  
	<!-- <top></top>
	<HelloWorld/>
	<left></left>
	<right></right> -->
	<video src="../../assets/add.ts" :autoplay='true'></video>
	</div>
</template>

<script>
	import HelloWorld from '@/components/HelloWorld.vue'
	import top from '@/components/top.vue'
	import left from '@/components/left.vue'
	import right from '@/components/right.vue'
	export default {
		name: 'index',
	  components: {
	    top,
		HelloWorld,
		left,
		right
	  },
	  data() {
	    return {
	    };
	  },
	  methods: {
	  }
	}
</script><style>
</style>