import * as types from '../types'
import * as globals from '../../config/globals'

const state = {
	status: false
}

const getters = {
	getModalStatus: state => state.status
}

const actions = {
	switchModal: ({ commit }) => commit(types.SWITCH_MODAL)
}

const mutations = {
	[types.SWITCH_MODAL]: state => state.status = !state.status
}

export default {
	state,
	getters,
	actions,
	mutations
}