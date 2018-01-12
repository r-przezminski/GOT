import * as types from '../types';
import * as globals from '../../config/globals';

const state = {
	error: false,
	code: '',
	msg: '',
}

const getters = {
	isError: state => state.error,
	code: state => state.code,
	msg: state => state.msg
}

const actions = {
	resetError: ({ commit }) => commit(types.RESET_ERROR)
}

const mutations = {
	[types.RECEIVE_ERROR]: (state, error) => {
		console.log(error)
		state.error = true
		if (error && error.status && error.statusText) {
			state.code = error.status
			state.msg = error.data.message ? error.data.message : error.statusText
		} else {
			state.code = globals.ERROR_CODE
			state.msg = globals.ERROR_MSG
		}
	},
	[types.RESET_ERROR]: state => state.error = false
}

export default {
	state,
	getters,
	actions,
	mutations
}