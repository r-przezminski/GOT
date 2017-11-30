import * as types from '../types'
import * as globals from '../../config/globals'
import { filterState as filter } from './filters'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	filter,
	characters: [],
	houses: [],
}

const getters = {
	filteredCharacters: state => {
		console.log(state);
		return state.characters.filter(character => {
			return character.name.toLowerCase().match(state.filter.search.toLowerCase())
		}).filter(character => {
			switch (state.filter.imageLink) {
				case true:
					return character.imageLink != globals.NO_IMAGE
					break
				default:
					return true
			}
		}).filter(character => {
			switch (state.filter.gender) {
				case globals.CHARACTER_MALE:
					return character.male == true
					break;
				case globals.CHARACTER_FEMALE:
					return character.male == false
					break
				default:
					return true
					break;
			}
		}).filter(character => {
			if (state.filter.houses.length > 0) {
				return state.filter.houses.includes(character.house)
			}
			else {
				return true
			}
		})
	},
	houses: state => {
		return state.houses
	},
}

const actions = {
	getCharacters: ({ commit }, url) => {
		http.get(url).then(response => {
			commit(types.RECEIVE_CHARACTERS, response.data)
			commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length)
		}).catch(error => {
			commit(types.RECEIVE_ERROR, error)
		});
	},
	getHouses: ({ commit }, url) => {
		http.get(url).then(response => {
			commit(types.RECEIVE_HOUSES, response.data)
		}).catch(error => {
			commit(types.RECEIVE_ERROR, error)
		});
	},
}

const mutations = {
	[types.RECEIVE_CHARACTERS]: (state, characters) => {
		state.characters = fetchCharacters(characters)
	},
	[types.RECEIVE_HOUSES]: (state, houses) => {
		state.houses = fetchHouses(houses)
	},
}

/**
 * @param {Object} characters - data from API
 * @returns {Object} characters - matched data properties 
 */
const fetchCharacters = characters => {
	const fetchedCharacters = []
	characters.forEach(character => {
		fetchedCharacters.push({
			id: character._id,
			name: character.name,
			male: character.male,
			imageLink: character.imageLink ? globals.BASE_API_URL + character.imageLink : globals.NO_IMAGE,
			house: character.house ? character.house : globals.NO_INFO,
			titles: character.titles.length ? character.titles : [globals.NO_INFO],
			books: character.books.length ? character.books : [globals.NO_INFO],
			culture: character.culture ? character.culture : globals.NO_INFO,
			spouse: character.spouse ? character.spouse : globals.NO_INFO,
			dateOfBirth: character.dateOfBirth ? character.dateOfBirth : globals.NO_INFO,
			dateOfDeath: character.dateOfDeath ? character.dateOfDeath : globals.NO_INFO,
		})
	});
	return fetchedCharacters;
}

/**
 * @param {Object} houses - data from API
 * @returns {array} houses - array of houses name 
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
