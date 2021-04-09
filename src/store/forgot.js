
import axios from 'axios'

const forgot = {
	namespaced: true,
	state: {
		
  	},
	mutations: {
		SENT_ON_MAIL(state, payload){
			alert(payload)
		}
	},
	actions: {
        async REMEMBER_PASS({commit}, payload){
            
            try {
                const { data } = await axios.get(`https://nikitapugachev.ru/wp-json/np/v1/forgot/user?email=${payload}`)
                console.log(data)   
                return commit('SENT_ON_MAIL', data)       
            }
            catch (err) {
            	return commit('SENT_ON_MAIL', err) 
            }
        }
	},
	getters: {
		
	}
}

export default forgot


