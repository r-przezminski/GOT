import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import title from './modules/title'
import error from './modules/error'
import loading from './modules/loading'
import modal from './modules/modal'
import filters from './modules/filters'
import characters from './modules/characters'
import houses from './modules/houses'
import cities from './modules/cities'
import episodes from './modules/episodes'

Vue.use(Vuex);

const store = new Vuex.Store({
	actions,
	getters,
	modules: {
		title,
		error,
		loading,
		modal,
		filters,
		characters,
		houses,
		cities,
		episodes
	},
	strict: true
});

export default store