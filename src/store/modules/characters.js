import * as types from '../types'
import * as globals from '../../config/globals'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	characters: [],
	houses: [],
	filterBy: {
		search: '',
		imageLink: false,
		gender: globals.CHARACTER_ALL,
		houses: [],
	},
}

const getters = {
	filteredCharacters: state => {
		return state.characters.filter(character => {
			return character.name.toLowerCase().match(state.filterBy.search.toLowerCase())
		}).filter(character => {
			switch (state.filterBy.imageLink) {
				case true:
					return character.imageLink != globals.NO_IMAGE
					break
				default:
					return character
			}
		}).filter(character => {
			switch (state.filterBy.gender) {
				case globals.CHARACTER_MALE:
					return character.male == true
					break;
				case globals.CHARACTER_FEMALE:
					return character.male == false
					break
				default:
					return character
					break;
			}
		}).filter(character => {
			if (state.filterBy.houses.length > 0) {
				return state.filterBy.houses.includes(character.house)
			}
			else {
				return character
			}
		})
	},
	houses: state => {
		return state.houses
	},
	imageLinkFilterStatus: state => {
		return state.filterBy.imageLink
	},
	genderFilter: state => {
		return state.filterBy.gender
	},
	housesFilter: state => {
		return state.filterBy.houses
	}
}

const actions = {
	getCharacters: ({ commit }, url) => {
		http.get(url).then(response => {
			commit(types.RECEIVE_CHARACTERS, response.data)
		}).catch(error => {
			console.log(error);
			//TO DO: Error handling
		});
	},
	getHouses: ({ commit }, url) => {
		http.get(url).then(response => {
			commit(types.RECEIVE_HOUSES, response.data)
		}).catch(error => {
			console.log(error);
			//TO DO: Error handling
		});
	},
	imageLinkFilterHandler: ({ commit }) => {
		commit(types.SWITCH_IMAGE_FILTER)
	},
	genderFilterHandler: ({ commit }, gender) => {
		commit(types.RECEIVE_GENDER_FILTER, gender)
	},
	housesFilterHandler: ({ commit }, houses) => {
		commit(types.RECEIVE_HOUSES_FILTER, houses)
	}
}

const mutations = {
	[types.RECEIVE_CHARACTERS](state, characters) {
		state.characters = fetchCharacters(characters)
	},
	[types.RECEIVE_HOUSES](state, houses) {
		state.houses = fetchHouses(houses)
	},
	[types.RECEIVE_SEARCH_FILTER](state, search) {
		state.filterBy.search = search
	},
	[types.SWITCH_IMAGE_FILTER](state) {
		state.filterBy.imageLink = !state.filterBy.imageLink
	},
	[types.RECEIVE_GENDER_FILTER](state, gender) {
		state.filterBy.gender = gender
	},
	[types.RECEIVE_HOUSES_FILTER](state, houses) {
		state.filterBy.houses = houses
		// TO DO: Remove Do not mutate vuex store state outside mutation handlers.
	}
}

/**
 * @param {Object} characters - data from API
 * @returns {Object} characters - matched data properties 
 */

const fetchCharacters = characters => {
	const fetchedCharacters = []
	characters.forEach(character => {
		fetchedCharacters.push({
			name: character.name,
			// titles: character.titles.length ? character.titles : [globals.NO_INFO],
			// books: character.books.length ? character.books : [globals.NO_INFO],
			male: character.male,
			imageLink: character.imageLink ? globals.BASE_API_URL + character.imageLink : globals.NO_IMAGE,
			house: character.house ? character.house : globals.NO_INFO,
			// culture: character.culture ? character.culture : globals.NO_INFO,
			// spouse: character.spouse ? character.spouse : globals.NO_INFO,
			// dateOfBirth: character.dateOfBirth ? character.dateOfBirth : globals.NO_INFO,
			// dateOfDeath: character.dateOfDeath ? character.dateOfDeath : globals.NO_INFO,
		})
	});
	return fetchedCharacters;
}

/**
 * 
 * @param {Object} houses - data from API
 * @returns {array} houses - array of house names 
 */

const fetchHouses = houses => {
	const fetchedHouses = []
	houses.forEach(house => {
		fetchedHouses.push(house.name)
	});
	return fetchedHouses;
}

export default {
	state,
	getters,
	actions,
	mutations
}
