import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

import smeta from './smeta'
import auth from './auth'
import preset from './preset'
import signup from './signup'
import forgot from './forgot'

export default new Vuex.Store({
	// plugins: [createPersistedState()],
	modules: {
		smeta,
		auth,
		preset,
		signup,
		forgot
	}
}) 