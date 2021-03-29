
import axios from 'axios'
import router from '../router/routes'

const preset = {
	namespaced: true,
	state: {
        presets: null,
        activePreset: null,
        activePresetName: '',
        allow: false,
        presetSlugs: {}
  	},
	mutations: {
        SET_PRESETS(state, payload){
            state.presets = payload
            // console.log(payload.data[0])
            if(payload){
                state.activePreset = payload.data[0].json
                state.activePresetName = payload.data[0].nazvanie
            }
        },
        SET_ACTIVE_PRESET(state, preset){
            state.activePreset = preset
        },
        SET_PRES_SLUGS(state, payload){
            state.presetSlugs = payload
        },
        CLEAR_NAME(state){
             state.activePresetName = ''
        }
	},
	actions: {
        async addToPreset({ commit }, payload) {
            try {
                const { data } = await axios.post('https://nikitapugachev.ru/wp-json/np/v1/set/calc/presets', payload)
                return console.log(data)
            }
            catch (err) {
                console.log('error')
            }
        },
        GET_PRESETS({commit}, user){
            axios
            .get('https://nikitapugachev.ru/wp-json/np/v1/get/calc/presets?user_id=' + user.id)
            .then(res =>{
                
                let clientPres = {
                    login: user.user_nicename,
                    preset: res.data.data[0].slug
                }
                commit("SET_PRES_SLUGS", clientPres)
                commit("SET_PRESETS", res.data)
            })
        },
        loadActivePreset({commit}, preset){
            commit("SET_ACTIVE_PRESET", preset)
        },
        setPresetSlugs({commit}, payload){
            commit("SET_PRES_SLUGS", payload)
        },
        async updatePreset({ commit }, pres) {
            try {
                const { data } = await axios.post(`https://nikitapugachev.ru/wp-json/np/v1/edit/calc/presets?user_id=${pres.user_id}&playlist_slug=${pres.name}`, {json: pres.json})
                return console.log(data)
            }
            catch (err) {
                console.log('error')
            }
        },
        clearActivePreset({commit}){
            commit("SET_ACTIVE_PRESET", null)
        },
        clearActivePresetName({commit}){
            commit("CLEAR_NAME")
        },

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
        },
        getActivePresetName(state){
            return state.activePresetName
        }
	}
}

export default preset


