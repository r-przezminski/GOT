import * as types from '../types'

const state = {
	loading: false
}

const getters = {
	isLoading: state => state.loading
}

const actions = {}

const mutations = {
	[types.START_LOADING]: (state, status) => state.loading = status,
	[types.END_LOADING]: (state, status) => state.loading = status
}

export default {
	state,
	getters,
	actions,
	mutations
}