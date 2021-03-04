
import axios from 'axios'
import router from '../router/routes'

const preset = {
	namespaced: true,
	state: {
        presets: null,
        activePreset: [],
        activePresetName: '',
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
                // пресет добавлен
                console.log(res)
            })
		},
        GET_PRESETS({commit}, id){
            axios
            .get('https://nikitapugachev.ru/wp-json/np/v1/get/calc/presets?user_id=' + id)
            .then(res =>{
                commit("SET_PRESETS", res.data)
            })
        },
        loadActivePreset({commit}, preset){
            commit("SET_ACTIVE_PRESET", preset)
        },
        setPresetSlugs({commit}, payload){
            commit("SET_PRES_SLUGS", payload)
        },
        updatePreset({commit}, pres){

            let jsonObj = {
                json: pres.json
            }

            axios
            .post(`https://nikitapugachev.ru/wp-json/np/v1/edit/calc/presets?user_id=${pres.user_id}&playlist_slug=${pres.name}`, jsonObj)
            .then(res =>{
                console.log(res.data)
            })
        },
        clearActivePreset({commit}){
            commit("SET_ACTIVE_PRESET", null)
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


