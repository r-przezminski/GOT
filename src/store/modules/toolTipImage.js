import * as types from '../types';
import * as globals from '../../config/globals'
import axios from 'axios';

let cancelRequest;

const state = {
	response: {},
	toolTip: {}
}

const getters = {
	toolTip: state => state.toolTip,
	toolTipResponse: state => state.response 
}

const mutations = {
	[types.RECEIVE_TOOL_TIP]: (state, toolTip) => {
		state.toolTip = {
			x: `${ toolTip.cursorX - 85 }px`,
			y: toolTip.cursorY >= 300 ? `${ toolTip.cursorY + toolTip.scrollY - 220 }px` : `${ toolTip.cursorY + toolTip.scrollY + 50 }px`,
			show: true,
			isLoading: true
		}
	},
	[types.RECEIVE_TOOL_TIP_RESPONSE]: (state, response) => {
		state.response = {
			url: response.url,
			hasImg: response.hasImg,
			isSucces: response.succes,
		};
		state.toolTip.isLoading = false;
	},
	[types.RESET_TOOL_TIP]: state => {
		state.response = {},
		state.toolTip = {}
	}
}

const actions = {
	handleToolTip: ({ commit }, options) => {
		commit(types.RECEIVE_TOOL_TIP, options);
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