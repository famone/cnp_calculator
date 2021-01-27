
import axios from 'axios'

const auth = {
	namespaced: true,
	state: {
		user: null,
  	},
	mutations: {
		SET_USER(state, payload){
			state.user = payload
		},
		SET_NEW_PRESET(state, payload){
			state.user.presets.push(payload)
		}
	},
	actions: {
		LOGIN({commit}, payload){
			commit('SET_USER', payload)
		},
		addToPreset({commit}, payload){
			commit('SET_NEW_PRESET', payload)
		},
		SIGN_OUT({commit}){
  			commit('SET_USER', null)
  		}
	},
	getters: {
  		getAuthenticated(state){
  			return state.user
  		},
	}
}

export default auth


