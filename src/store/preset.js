
import axios from 'axios'
import router from '../router/routes'

const preset = {
	namespaced: true,
	state: {
        presets: null,
        activePreset: [],
        allow: false,
        presetSlugs: {}
  	},
	mutations: {
        SET_PRESETS(state, payload){
            state.presets = payload
        },
        SET_ACTIVE_PRESET(state, preset){
            state.activePreset = preset
        },
        SET_PRES_SLUGS(state, payload){
            state.presetSlugs = payload
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
        },
        setPresetSlugs({commit}, payload){
            commit("SET_PRES_SLUGS", payload)
        }

	},
	getters: {
        getPresets(state){
            return state.presets
        },
        getActivePreset(state){
            return state.activePreset
        },
        getPresetSlugs(state){
            return state.presetSlugs
        }
	}
}

export default preset


