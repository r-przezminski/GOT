import * as types from './types'

export const searching = ({ commit }, value) => {
	commit(types.RECEIVE_SEARCH_FILTER, value)
}

export const openModal = ({ commit }, value) => {
	commit(types.OPEN_MODAL, value)
}

export const closeModal = ({ commit }, value) => {
	commit(types.CLOSE_MODAL, value)
}

