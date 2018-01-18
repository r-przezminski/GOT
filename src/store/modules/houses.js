import * as types from '../types';
import * as globals from '../../config/globals';
import { stateFilter as filterBy } from './filters';
import http from '../../config/httpApiRequest';

const state = {
	houses: []
}

const getters = {
	filteredHouses: state => {
		return state.houses
			.filter(house => house.name.toLowerCase().match(filterBy.search.toLowerCase()))
			.filter(house => filterBy.imageLink ? house.imageLink !== globals.NO_IMAGE : true)
	}
}

const mutations = {
	[types.RECEIVE_HOUSES]: (state, houses) => state.houses = fetchHouses(houses),
}

const actions = {
	getHouses: ({ commit }, url) => {
		http.get(url)
			.then(response => {
				commit(types.RECEIVE_HOUSES, response.data);
				commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length);
			})
			.catch(error => {
				commit(types.RECEIVE_ERROR, error.response);
			})
	}
}

const fetchHouses = houses => {
	return houses.map((house, index) => {
		return {
			name: house.name,
			imageLink: buildImageUrl(house.imageLink, index),
			title: house.title ? house.title : globals.NO_INFO,
			words: house.words ? house.words : globals.NO_INFO,
			region: house.region ? house.region : globals.NO_INFO,
			currentLord: house.currentLord ? house.currentLord : globals.NO_INFO,
			overlord: house.overlord ? house.overlord : globals.NO_INFO,
			coatOfArms: house.coatOfArms ? house.coatOfArms : globals.NO_INFO,
			cadetBranch: house.cadetBranch ? house.cadetBranch : globals.NO_INFO,
			ancestralWeapon: house.ancestralWeapon.length ? house.ancestralWeapon : [globals.NO_INFO]
		}
	});
}

const buildImageUrl = (imageLink, index) => {
	if ((!imageLink) || (index >= 4 && index <= 104 && index != 5 && index != 7 && index != 64)) {
		return globals.NO_IMAGE;
	}
	return globals.BASE_API_URL + imageLink;
}

export default {
	state,
	getters,
	mutations,
	actions
}
