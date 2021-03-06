import * as types from '../types';
import * as globals from '../../config/globals';
import { stateFilter as filterBy } from './filters';
import http from '../../config/httpApiRequest';

const state = {
	cities: []
}

const getters = {
	filteredCities: state => state.cities.filter(city => city.name.toLowerCase().match(filterBy.search.toLowerCase()))
}

const mutations = {
	[types.RECEIVE_CITIES]: ((state, cities) => state.cities = cities.map(city => {
		return {
			name: city.name,
			link: city.link
		}
	}))
}

const actions = {
	getCities: ({ commit }, url) => {
		http.get(url)
			.then(response => {
				commit(types.RECEIVE_CITIES, response.data);
				commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length);
			})
			.catch(error => {
				commit(types.RECEIVE_ERROR, error.response);
			})
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}