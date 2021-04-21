
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
		clearCalc({commit}){
			commit('SET_CALC', null)
		},
		getCalc({commit}){
			axios
			.get('https://nikitapugachev.ru/wp-json/np/v1/get/calc')
			.then(res =>{
				console.log(res.data)
				localStorage.setItem("calc", JSON.stringify(res.data.data));
				commit('SET_CALC', res.data.data)
				commit('SET_NALOG', res.data.data)
			})
		},
		async GET_CALC({commit, state, dispatch }, calc){
			if (calc) {
                commit("SET_CALC", calc);
                commit("SET_NALOG", calc);
            }
            if(!state.calc){
            	return dispatch('getCalc')
            }
		}
	},
	getters: {
  		
  		getCalc(state){
  			return state.calc
  		}
	}
}

export default smeta


