import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import smeta from './smeta'
import auth from './auth'

export default new Vuex.Store({
	modules: {
		smeta,
		auth
	}
}) 