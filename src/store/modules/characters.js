import * as types from '../types';
import * as globals from '../../config/globals';
import { stateFilter as filterBy } from './filters';
import http from '../../config/httpApiRequest';

const state = {
	characters: [],
	houses: [],
}

const getters = {
	filteredCharacters: state => {
		return state.characters
			.filter(character => character.name.toLowerCase().match(filterBy.search.toLowerCase()))
			.filter(character => filterBy.imageLink ? character.imageLink !== globals.NO_IMAGE : true)
			.filter(character => filterBy.houses.length > 0 ? filterBy.houses.includes(character.house) : true)
			.filter(character => {
				if (!filterBy.gender || filterBy.gender === globals.CHARACTER_ALL) {
					return true;
				} else if (filterBy.gender === globals.CHARACTER_MALE) {
					return character.male === true;
				} else {
					return character.male === false;
				}
			})
	},
	houses: state => state.houses
}

const mutations = {
	[types.RECEIVE_CHARACTERS]: (state, characters) => state.characters = fetchCharacters(characters),
	[types.RECEIVE_HOUSES_OPTIONS_FILTER]: (state, houses) => state.houses = houses.map(house => house.name)
}

const actions = {
	getCharacters: ({ commit }, url) => {
		http.get(url.houses)
			.then(response => {
				commit(types.RECEIVE_HOUSES_OPTIONS_FILTER, response.data);
				return http.get(url.characters);
			})
			.then(response => {
				commit(types.RECEIVE_CHARACTERS, response.data);
				commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length);
			})
			.catch(error => {
				commit(types.RECEIVE_ERROR, error.response);
			});
	}
}

const fetchCharacters = characters => {
	return characters.map(character => {
		return {
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
		}
	});
}

export default {
	state,
	getters,
	mutations,
	actions
}
