import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import contentHeader from './modules/contentHeader';
import error from './modules/error';
import loading from './modules/loading';
import modal from './modules/modal';
import filters from './modules/filters';
import characters from './modules/characters';
import houses from './modules/houses';
import cities from './modules/cities';
import episodes from './modules/episodes';
import toolTipImage from './modules/toolTipImage';

Vue.use(Vuex);

export default new Vuex.Store({
	actions,
	modules: {
		contentHeader,
		error,
		loading,
		modal,
		filters,
		characters,
		houses,
		cities,
		episodes,
		toolTipImage
	},
	strict: true
});