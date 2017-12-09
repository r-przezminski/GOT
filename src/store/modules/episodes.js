import * as types from '../types'
import * as globals from '../../config/globals'
import { stateFilter as filterBy } from './filters'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	episodes: [],
	seasons: [],
}

const getters = {
	filteredEpisodes: state => state.episodes
		.filter(episode => episode.name.toLowerCase().match(filterBy.search.toLowerCase()))
		.filter(episode => filterBy.season == undefined || filterBy.season == globals.SEASON_ALL ? true : episode.season == filterBy.season.split(' ')[1]),
	seasons: state => state.seasons
}

const actions = {
	getEpisodes: ({ commit }, url) => {
		commit(types.START_LOADING, true)
		http.get(url)
			.then(response => {
				commit(types.RECEIVE_EPISODES, response.data)
				commit(types.RECEIVE_SEASONS, response.data)
				commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length)
				commit(types.END_LOADING, false)
			})
			.catch(error => {
				commit(types.RECEIVE_ERROR, error.response)
				commit(types.END_LOADING, false)
			})
	}
}

const mutations = {
	[types.RECEIVE_EPISODES]: (state, episodes) => state.episodes = fetchEpisodes(episodes),
	[types.RECEIVE_SEASONS]: (state, episodes) => state.seasons = fetchSeasonsFrom(episodes)
}

function fetchEpisodes(episodes) {
	const fetchedEpisodes = []
	episodes.forEach(episode => {
		fetchedEpisodes.push({
			name: episode.name,
			season: episode.season,
			totalNr: episode.totalNr,
			characters: episode.characters
		})
	});
	return sortEpisodes(fetchedEpisodes)
}

function sortEpisodes(episodes) {
	return episodes.sort((a, b) => a.totalNr - b.totalNr)
}

function fetchSeasonsFrom(episodes) {
	let seasons = ['All']
	episodes.forEach(episode => seasons.push(`Season ${episode.season}`))
	seasons = new Set(seasons)
	return [...seasons]
}

export default {
	state,
	getters,
	actions,
	mutations
}