<template>
	<div class="index">  
	<top></top>
	<HelloWorld/>
	<left :trappedTotalList="trappedTotalList"></left>
	<center></center>
	<right :maintenanceLists="maintenanceLists" :complaintList="complaintList"></right>
	<Trapped></Trapped>
	<obstacleDetails></obstacleDetails>
	<deviceDetails></deviceDetails>
	<inspectionDetails></inspectionDetails>
	<trappedDispose></trappedDispose>
	<Obstacle></Obstacle>
	<elevatorDetails></elevatorDetails>
	<mytable></mytable>
	</div>
</template>

<script>
	import HelloWorld from '@/components/HelloWorld.vue'
	import top from '@/components/top.vue'
	import left from '@/components/left.vue'
	import right from '@/components/right.vue'
	import center from '@/components/center.vue'
	import Trapped from '../Trapped/index.vue'
	import obstacleDetails from '../obstacleDetails/index.vue'
	import deviceDetails from '../deviceDetails/index.vue'
	import inspectionDetails from '../inspectionDetails/index.vue'
	import trappedDispose from '../trappedDispose/index.vue'
	import Obstacle from '../Obstacle/index.vue'
	import elevatorDetails from '../elevatorDetails/index.vue'
	import mytable from '../mytable/index.vue'
	import {
		indexLdg
	} from '@/api/index';
	export default {
		name: 'index',
	  components: {
	    top,
		HelloWorld,
		left,
		right,
		center,
		Trapped,
		trappedDispose,
		deviceDetails,
		Obstacle,
		inspectionDetails,
		obstacleDetails,
		elevatorDetails,
		mytable
	  },
	  data() {
	    return {
			trappedTotalList:{},
			maintenanceLists:[],
			complaintList:{}
	    };
	  },
	  mounted() {
	  	this.indexLdgList();
	  },
	  methods: {
		  indexLdgList(){
		  // 	indexLdg({sign:this.$route.query.sign}).then((res)=>{
				// this.trappedTotalList=res.data.data.trappedTotal
				// this.maintenanceLists=[res.data.data.maintenance,res.data.data.inspect]
				// this.complaintList=res.data.data.complaint
		  // 	})
		  },
	  }
	}
</script>
<style scoped>
</style>