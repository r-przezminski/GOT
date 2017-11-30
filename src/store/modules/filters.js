import * as types from '../types'
import * as globals from '../../config/globals'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	search: '',
	imageLink: false,
	gender: globals.CHARACTER_ALL,
	houses: [],
}

const getters = {
	imageLinkFilterStatus: state => {
		return state.imageLink
	},
	genderFilter: state => {
		return state.gender
	},
	housesFilter: state => {
		return state.houses
	},
}

const actions = {
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
	[types.RECEIVE_SEARCH_FILTER]: (state, search) => {
		state.search = search
	},
	[types.SWITCH_IMAGE_FILTER]: (state) => {
		state.imageLink = !state.imageLink
	},
	[types.RECEIVE_GENDER_FILTER]: (state, gender) => {
		state.gender = gender
	},
	[types.RECEIVE_HOUSES_FILTER]: (state, houses) => {
		state.houses = houses
		// console.log(houses);
		// houses.forEach(house => {
		// 	this.state.houses.push(house)
		// })
		// TO DO: Remove Do not mutate vuex store state outside mutation handlers.
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}

export const filterState = state