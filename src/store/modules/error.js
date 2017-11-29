import * as types from '../types'
import * as globals from '../../config/globals'
import axios from 'axios'
import xhr from '../../config/xhr'

const http = axios.create(xhr)

const state = {
	status: false,
	code: '',
	msg: '',
	length: []
}

const getters = {

}

const actions = {

}

const mutations = {
	[types.RECEIVE_ERROR]: (state, error) => {
		state.status = true
		console.log(error);
		state.msg = 'errrrrrrrroooooorrrrrr!'
		state.code = 123123
		state.length.push({ error })
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}