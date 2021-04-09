import axios from 'axios'

const signup = {
	namespaced: true,
	state: {
		enterAlert: false
  	},
	mutations: {
		ALERT_NO(state){
			state.enterAlert = false
		},
		ALERT(state){
			state.enterAlert = true
		},
		ALERT_OFF(state){
			state.enterAlert = false
		}
	},
	actions: {
        async SIGN_UP({commit}, payload){
            
            try {
                const { data } = await axios.post(`https://nikitapugachev.ru/wp-json/np/v1/add/user`, payload)
                
                if(data.status === 'Вы уже зарегистрированы'){
                	console.log(data.status)
                	commit('ALERT')
                	return 
                }
                commit('ALERT_NO')
                
            
            }
            catch (err) {
            	commit('ALERT')
            }
        }
	},
	getters: {
		getNew(state){
			return state.enterAlert
		}
	}
}

export default signup


