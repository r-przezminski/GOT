import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import title from './modules/title'
import error from './modules/error'
import modal from './modules/modal'
import filters from './modules/filters'
import characters from './modules/characters'
import houses from './modules/houses'
import cities from './modules/cities'


Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	getters,
	modules: {
		title,
		error,
		modal,
		filters,
		characters,
		houses,
		cities
	},
	strict: true
});

export default store