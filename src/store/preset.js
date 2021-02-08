
import axios from 'axios'

const preset = {
	namespaced: true,
	state: {
        presets: null,
        activePreset: 123
  	},
	mutations: {
        SET_PRESETS(state, payload){
            state.presets = payload
        },
        SET_ACTIVE_PRESET(state, preset){
            state.activePreset = preset
        }
	},
	actions: {
		addToPreset({commit}, payload){
			// commit('SET_NEW_PRESET', payload)
            axios
            .post('https://nikitapugachev.ru/wp-json/np/v1/set/calc/presets', payload)
            .then(res => {
                console.log(res)
            })
		},
        GET_PRESETS({commit}, id){
            axios
            .get('https://nikitapugachev.ru/wp-json/np/v1/get/calc/presets?user_id=' + id)
            .then(res =>{
                console.log(res.data)
                commit("SET_PRESETS", res.data)
            })
        },
        loadActivePreset({commit}, preset){
            commit("SET_ACTIVE_PRESET", preset)
        }
	},
	getters: {
        getPresets(state){
            return state.presets
        },
        getActivePreset(state){
            return state.activePreset
        }
	}
}

export default preset


