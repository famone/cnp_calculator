import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import smeta from './smeta'
import auth from './auth'
import preset from './preset'

export default new Vuex.Store({
	modules: {
		smeta,
		auth,
		preset
	}
}) 