export default {
	chunks: null,
	chunkSize: null,
	loader: null,
	page: null,
	pages: null,
	position: 0,
	height: 100000,

	prepareLoader: function (data, chunkSize) {
		this.chunks = [];
		this.chunkSize = chunkSize;
		this.page = 0;
		this.setPages(this.setChunks(data));
		this.loader = this.chunks[this.page];
		this.initLoader();
		return this;
	},
	setChunks: function (data) {
		for (let i = 0; i < data.length; i += this.chunkSize) {
			this.chunks.push(data.slice(i, i + this.chunkSize));
		}
		return this.chunks.length;
	},
	setPages: function (pages) {
		this.pages = pages;
	},
	changePage: function () {
		this.page += 1;
	},
	initLoader: function () {
		window.onscroll = this.handleData.bind(this);
	},
	initScrollCounter: function () {
		this.position = window.pageYOffset + window.innerHeight;
		this.height = document.documentElement.offsetHeight;
	},
	handleData: function () {
		this.initScrollCounter();
		if (this.isLastPage() || !this.shouldChangePage()) return;
		this.changePage();
		this.loader = this.chunks[this.page];
		},
	load: function () {
		return this.loader;
	},
	isLastPage: function () {
		return this.page === this.pages;
	},
	shouldChangePage: function () {
		return this.position + 400 >= this.height;
	},
	isChunksEquals: function (chunk) {
		return JSON.stringify(chunk) === JSON.stringify(this.loader);
	},
	shouldLoadData: function (chunk) {
		return this.shouldChangePage() && !this.isLastPage() && !this.isChunksEquals(chunk);
	},
	destroyHandler: function () {
		window.onscroll = null;
	}
}
