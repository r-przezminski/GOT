import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import title from './modules/title'
import error from './modules/error'
import modal from './modules/modal'
import characters from './modules/characters'


Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	getters,
	modules: {
		title,
		error,
		characters,
		modal
	},
	strict: true
});

export default store