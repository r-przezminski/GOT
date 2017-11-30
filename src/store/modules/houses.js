import * as types from '../types'
import * as globals from '../../config/globals'
import { filterState as filter } from './filters'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	filter,
	houses: []
}

const getters = {
	filteredHouses: state => {
		return state.houses
			.filter(house => house.name.toLowerCase().match(filter.search.toLowerCase()))
			.filter(house => state.filter.imageLink ? house.imageLink != globals.NO_IMAGE : true)
	}
}

const actions = {
	getHouses: ({ commit }, url) => {
		http.get(url).then(response => {
			commit(types.RECEIVE_HOUSES, response.data)
			commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length)
		}).catch(error => {
			commit(types.RECEIVE_ERROR, error)
		})
	}
}

const mutations = {
	[types.RECEIVE_HOUSES]: (state, houses) => {
		state.houses = fetchHouses(houses)
	},
}

function fetchHouses(houses) {
	const fetchedHouses = []
	houses.forEach((house, index) => {
		fetchedHouses.push({
			name: house.name,
			imageLink: buildImageUrl(house.imageLink, index),
			title: house.title ? house.title : globals.NO_INFO,
			words: house.words ? house.words : globals.NO_INFO,
			region: house.region ? house.region : globals.NO_INFO,
			currentLord: house.currentLord ? house.currentLord : globals.NO_INFO,
			overlord: house.overlord ? house.overlord : globals.NO_INFO,
			coatOfArms: house.coatOfArms ? house.coatOfArms : globals.NO_INFO,
			cadetBranch: house.cadetBranch ? house.cadetBranch : globals.NO_INFO,
			ancestralWeapon: house.ancestralWeapon ? house.ancestralWeapon : globals.NO_INFO
		})
	});
	return fetchedHouses
}
function buildImageUrl(imageLink, index) {
	if ((!imageLink) || (index >= 4 && index <= 104 && index != 5 && index != 7 && index != 64)) {
		return globals.NO_IMAGE
	}
	return globals.BASE_API_URL + imageLink
}

export default {
	state,
	getters,
	actions,
	mutations
}