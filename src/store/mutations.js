import * as types from './types'

export default {
	[types.RECEIVE_LABEL](state, label) {
		state.results.label = label
	},
}
