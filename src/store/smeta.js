
import axios from 'axios'

const smeta = {
	namespaced: true,
	state: {
		user: null,
		page_1: {
			directions : ['Реклама', 'Музыкальный клип', 'Документальный фильм', 'YouTube', 'Instagram', 'Другое'],
			directionVal: '',
			nalog: 13,
			komissiya: 18,
			roliks: [{value: 100}],
			whereChecks: ['Телевидение', 'Интернет', 'Instagram', 'Кинотеатры'],
			whereShow: ['Телевидение'],
			cities: ['Москва', 'Санкт-Петербург', 'Другой'],
			whatCity: ['Москва'],
			whenVideo: ['Вчера', 'Через неделю', 'Через две недели', 'Через месяц'],
			whenRadio: '',
			whyVideo: ['Запуск рекламной компании', 'Поддержка бренда', 'Другое'],
			references: ''
		},
		page_2: {
			statuses: ['Начальный', 'Средний', 'Высокий'],
			socialStatus: 'Начальный',
			advantages: ['Цена', 'Сервис', 'Производство'],
			keyAdv: ['Цена']
		},
		calc: null,
		preloader: true

  	},
	mutations: {
		// page 2
		updateStatus(state, socialStatus){
			state.page_2.socialStatus = socialStatus 
		},
		updateAdv(state, keyAdv){
			state.page_2.keyAdv = keyAdv
		},
		// page 1
	  	updateNalog(state, nalog) {
			state.page_1.nalog = nalog
		},
		updateKomis(state, komissiya) {
			state.page_1.komissiya = komissiya
		},
		updateDirection(state, directionVal) {
			state.page_1.directionVal = directionVal
		},
		updateRoliks(state, roliks) {
			state.page_1.roliks = roliks
		},
		updateWhere(state, whereShow){
			state.page_1.whereShow = whereShow
		},
		updateCity(state, whatCity){
			state.page_1.whatCity = whatCity
		},
		updateWhen(state, whenRadio){
			state.page_1.whenRadio = whenRadio
		},
		updateWhy(state, whyRadio){
			state.page_1.whyRadio = whyRadio 
		},
		updateRefs(state, references){
			state.page_1.references = references
		},
		SET_USER(state, payload){
			state.user = payload.login
		},
		SET_CALC(state, payload){
			state.calc = payload
			state.preloader = false
		}
	},
	actions: {
		
		LOGIN({commit}, payload){
			commit('SET_USER', payload)
		},
		getCalc({commit}){
			axios
			.get('https://nikitapugachev.com/wp-json/np/v1/get/calc')
			.then(res =>{
				console.log(res.data)
				commit('SET_CALC', res.data.data)
			})
		}
	},
	getters: {
  		getRoliks(state){
  			let newArr = []
  			state.page_1.roliks.forEach(item => {
  				newArr.push(item.value)
  			})

  			return newArr.join(', ')
  		},
  		getNalog(state){
  			return state.page_1.nalog
  		},
  		getAuthenticated(state){
  			return state.user
  		},
  		getCalc(state){
  			return state.calc
  		}
	}
}

export default smeta


