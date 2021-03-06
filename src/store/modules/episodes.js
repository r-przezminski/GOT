import * as types from '../types';
import * as globals from '../../config/globals';
import { stateFilter as filterBy } from './filters';
import http from '../../config/httpApiRequest';

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

const mutations = {
	[types.RECEIVE_EPISODES]: (state, episodes) => state.episodes = fetchEpisodes(episodes),
	[types.RECEIVE_SEASONS]: (state, episodes) => state.seasons = fetchSeasonsFrom(episodes)
}

const actions = {
	getEpisodes: ({ commit }, url) => {
		http.get(url)
			.then(response => {
				commit(types.RECEIVE_EPISODES, response.data);
				commit(types.RECEIVE_SEASONS, response.data);
				commit(types.RECEIVE_TITLE_RESULT_ALL, response.data.length);
			})
			.catch(error => {
				commit(types.RECEIVE_ERROR, error.response);
			})
	}
}

const fetchEpisodes = episodes => {
	return episodes.map(episode => {
		return {
			name: episode.name,
			season: episode.season,
			totalNr: episode.totalNr,
			director: episode.director,
			characters: episode.characters
		}
	}).sort((a, b) => a.totalNr - b.totalNr);
}

const fetchSeasonsFrom = episodes => {
	let seasons = ['All'];
	episodes.forEach(episode => seasons.push(`Season ${episode.season}`));
	seasons = new Set(seasons);
	return [...seasons];
}

export default {
	state,
	getters,
	mutations,
	actions
}