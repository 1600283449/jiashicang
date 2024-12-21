// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 定义共享状态
		WeatherList: [],
		map:"",
		city:"",
		outerVisible:'',
		cityValue:'',
		center:'',
		drawer:'',
		obstacleDrawers:'',
		deviceDrawers:'',
		inspectionDrawers:'',
		trappedDispose:false,
		tableDisposeState:false,
		ObstacleDispose:false,
		elevatorstate:false,
		mytablestate:false
	},
	mutations: {
		WeatherLists(state, payload) {
			state.WeatherList = payload;
		},
		map(state, payload) {
			state.map = payload;
		},
		city(state, payload) {
			state.city = payload;
		},
		outerVisible(state, payload) {
			state.outerVisible = payload;
		},
		cityValue(state, payload) {
			state.cityValue = payload;
		},
		center(state, payload) {
			state.center = payload;
		},
		drawer(state, payload) {
			state.drawer = payload;
		},
		obstacleDrawers(state, payload) {
			state.obstacleDrawers = payload;
		},
		deviceDrawers(state, payload) {
			state.deviceDrawers = payload;
		},
		inspectionDrawers(state, payload) {
			state.inspectionDrawers = payload;
		},
		trappedDispose(state, payload) {
			state.trappedDispose = payload;
		},
		tableDisposeState(state, payload) {
			state.tableDisposeState = payload;
		},
		ObstacleDispose(state, payload) {
			state.ObstacleDispose = payload;
		},
		elevatorstate(state, payload) {
			state.elevatorstate = payload;
		},
		mytablestate(state, payload) {
			state.mytablestate = payload;
		},
	},
	actions: {
		// 可以包含异步操作
	},
	getters: {
		// 使用箭头函数简化代码  
	}
})