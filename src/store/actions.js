import * as types from './types';

export const searching = ({ commit }, value) => {
	commit(types.RECEIVE_SEARCH_FILTER, value);
}