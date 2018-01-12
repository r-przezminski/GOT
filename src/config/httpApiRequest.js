import axios from "axios";

const httpApiRequest = {
	method: 'get',
	baseURL: 'https://api.got.show/api/',
	responseType: 'json',
	xsrfCookieName: 'XSRF-TOKEN',
	xsrfHeaderName: 'X-XSRF-TOKEN',
	headers: { 'X-Requested-With': 'XMLHttpRequest' },
	maxRedirects: 5,
	// timeout: 1000,
	// maxContentLength: 2000,
	transformRequest: [function (data, headers) {
		return data;
	}],
	transformResponse: [function (data) {
		return data;
	}],
	validateStatus: function (status) {
		return status >= 200 && status < 300;
	},
};

export default axios.create(httpApiRequest);