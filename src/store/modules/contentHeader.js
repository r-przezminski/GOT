import * as types from '../types';
import * as globals from '../../config/globals';

const state = {
	label: '',
	all: '',
	matched: ''
}

const getters = {
	label: state => state.label,
	matched: state => state.matched,
	all: state => state.all
}

const actions = {
	getLabel: ({ commit }, label) => commit(types.RECEIVE_LABEL, label),
	updateTitleResultMatched: ({ commit }, value) => commit(types.UPDATE_TITLE_RESULT_MATCHED, value),
}

const mutations = {
	[types.RECEIVE_LABEL]: (state, label) => state.label = label,
	[types.UPDATE_TITLE_RESULT_MATCHED]: (state, matched) => state.matched = matched,
	[types.RECEIVE_TITLE_RESULT_ALL]: (state, all) => state.all = all
}

export default {
	state,
	getters,
	actions,
	mutations
}