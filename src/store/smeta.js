
import axios from 'axios'

const smeta = {
	namespaced: true,
	state: {
		calc: null,
		preloader: true,
		nalog: null

  	},
	mutations: {
		SET_CALC(state, payload){
			state.calc = payload
			state.preloader = false
		},
		SET_NALOG(state, payload){
			state.calc[0].fields[7].value
		}
	},
	actions: {
		
		getCalc({commit}){
			axios
			.get('https://nikitapugachev.ru/wp-json/np/v1/get/calc')
			.then(res =>{
				commit('SET_CALC', res.data.data)
				commit('SET_NALOG', res.data.data)
			})
		}
	},
	getters: {
  		
  		getCalc(state){
  			return state.calc
  		}
	}
}

export default smeta


