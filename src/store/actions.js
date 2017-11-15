import * as types from './types'

export const searching = ({ commit }, value) => {
	commit(types.RECEIVE_SEARCH_FILTER, value)
}

export const getLabel = ({ commit }, label) => {
	commit(types.RECEIVE_LABEL, label)
}