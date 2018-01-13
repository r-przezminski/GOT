import * as types from '../types';
import * as globals from '../../config/globals';

const state = {
	status: false,
	data: {}
}

const getters = {
	getModalStatus: state => state.status,
	modalData: state => state.data
}

const actions = {
	switchModal: ({ commit }) => commit(types.SWITCH_MODAL),
	setModalData: ({ commit }, data) => commit(types.RECEIVE_MODAL_DATA, data),
}

const mutations = {
	[types.SWITCH_MODAL]: state => state.status = !state.status,
	[types.RECEIVE_MODAL_DATA]: (state, data) => state.data = fetchData(data)
}

function fetchData(data) {
	const info = { name: data.name, imageLink: data.imageLink };
	const { name, imageLink, male, kupka, ...details } = data;
	return {
		info: info,
		details: details
	};
}
export default {
	state,
	getters,
	actions,
	mutations
}