import * as types from '../types';
import * as globals from '../../config/globals'
import axios from 'axios';

let cancelRequest;

const state = {
	x: null,
	y: null,
	show: null,
	isLoading: null,
	url: null,
	isSucces: null,
	hasImg: null
}

const getters = {
	toolTip: state => {
		return {
			x: state.x,
			y: state.y,
			show: state.show,
			isLoading: state.isLoading
		}
	},
	toolTipResponse: state => {
		return {
			url: state.url,
			isSucces: state.isSucces,
			hasImg: state.hasImg
		}
	}
}

const mutations = {
	[types.RECEIVE_TOOL_TIP]: (state, toolTip) => {
		state.x = `${ toolTip.x - 85 }px`;
		state.y = toolTip.y >= 300 ? `${ toolTip.y + toolTip.scrollY - 220 }px` : `${ toolTip.y + toolTip.scrollY + 50 }px`;
		state.show = true;
		state.isLoading = true;
	},
	[types.RECEIVE_TOOL_TIP_RESPONSE]: (state, response) => {
		state.url = response.url;
		state.hasImg = response.hasImg;
		state.isSucces = response.succes;
		state.isLoading = false;
	},
	[types.RESET_TOOL_TIP]: state => {
		state.x = null;
		state.y = null;
		state.show = false;
		state.url = null;
		state.isSucces = null;
	}
}

const actions = {
	handleToolTip: ({ commit }, options) => {
		const toolTip = {
			x: options.cursorX,
			y: options.cursorY,
			scrollY: options.scrollY
		}
		commit(types.RECEIVE_TOOL_TIP, toolTip);
	},
	handleToolTipRequest: ({ commit }, name) => {
		const res = {};
		const CancelToken = axios.CancelToken;

		axios.get(`https://api.got.show/api/characters/${ name }`, {
				timeout: 2000,
				cancelToken: new CancelToken(function executor(c) {
					cancelRequest = c;
				})
			})
			.then(response => {
				res.url = response.data.data.imageLink ? globals.IMG_API_URL + response.data.data.imageLink : globals.NO_IMAGE;
				res.hasImg = response.data.data.imageLink ? true : false;
				res.succes = true;
				commit(types.RECEIVE_TOOL_TIP_RESPONSE, res);
			})
			.catch(error => {
				commit(types.RECEIVE_TOOL_TIP_RESPONSE, res);
			})
	},
	handleResetToolTip: ({ commit }) => {
		commit(types.RESET_TOOL_TIP);
		cancelRequest();
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}