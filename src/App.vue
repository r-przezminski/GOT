<template>
	<div id="app">
		<app-header></app-header>
		<app-navigation></app-navigation>
		<app-content></app-content>
		<app-footer></app-footer>
	</div>
</template>

<script>
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import ContentView from "@/components/Content/ContentView";
import Footer from "@/components/Footer/Footer";

import http from "./config/httpApiRequest";
export default {
	name: "app",
	components: {
		"app-header": Header,
		"app-navigation": Navigation,
		"app-content": ContentView,
		"app-footer": Footer
	},
	created() {
		http.interceptors.request.use(
		config => {
			this.$store.commit("START_LOADING", true);
			return config;
		},
		error => {
			this.$store.commit("END_LOADING", false);
			return Promise.reject(error);
		});

		http.interceptors.response.use(
		response => {
			this.$store.commit("END_LOADING", false);
			return response;
		},
		error => {
			this.$store.commit("END_LOADING", false);
			return Promise.reject(error);
		});
	},
	computed: {
		route() {
			return this.$route.name;
		}
	},
	watch: {
		route: function() {
			this.$store.commit("RESET_ERROR");
		}
	}
};
</script>

<style lang="scss">
@import "./assets/scss/reset.scss";
@import "./assets/scss/variables.scss";
@import "./assets/scss/main.scss";
</style>

