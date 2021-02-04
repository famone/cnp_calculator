
import axios from 'axios'

const auth = {
	namespaced: true,
	state: {
		user: null,
		token: null,
        presets: null
  	},
	mutations: {
		SET_USER(state, user){
			state.user = user
		},
		SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_PRESETS(state, payload){
            state.presets = payload
        }
	},
	actions: {
		async AUTH_REQUEST({ commit, dispatch }, payload) {
            try {
                const { data } = await axios.post(`https://nikitapugachev.com/wp-json/jwt-auth/v1/token`, payload)
                console.log(data)
                return dispatch('VALIDATE', data)
            }
            catch (err) {
            	alert('что-то пошло не так')
            	console.log(err)
            	// commit('SNACKBAR')
            }
        },
        async VALIDATE({ commit, state, dispatch }, user) {
            if (user) {
                commit("SET_TOKEN", user.token);
                commit("SET_USER", user);
                dispatch("GET_PRESETS", user.id)
            }
            if (!state.user) {
                return
            }
            try {
                const response = await axios({
                    url: `https://nikitapugachev.com/wp-json/jwt-auth/v1/token/validate`,
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                localStorage.setItem("user", JSON.stringify(user));
                commit("SET_TOKEN", user.token);
                commit("SET_USER", user);
            }
            catch (err) {
                localStorage.removeItem("user");
                commit("SET_TOKEN", null);
                commit("SET_USER", null);
            }
        },
        async SIGN_OUT({ commit }) {
            localStorage.removeItem("user");
            commit("SET_TOKEN", null);
            commit("SET_USER", null);
        },
		addToPreset({commit}, payload){
			// commit('SET_NEW_PRESET', payload)
            axios
            .post('https://nikitapugachev.com/wp-json/np/v1/set/calc/presets', payload)
            .then(res => {
                console.log(res)
            })
		},
        GET_PRESETS({commit}, id){
            axios
            .get('https://nikitapugachev.com/wp-json/np/v1/get/calc/presets?user_id=' + id)
            .then(res =>{
                console.log(res.data)
                commit("SET_PRESETS", res.data)
            })
        }
	},
	getters: {
  		getAuthenticated(state){
  			return state.user
  		},
        getPresets(state){
            return state.presets
        }
	}
}

export default auth


