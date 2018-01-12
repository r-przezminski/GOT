<template>
	<div>
		<content-header-component></content-header-component>
		<div class="container">
			<city-component 
				v-for="city in cities" 
				:key="city._id"
				:city="city"
			>
			</city-component>
		</div>
	</div>
</template>

<script>
import ContentHeader from "@/components/Content/ContentHeader";
import City from "./City";

import Loader from "../../DataLoader/DataLoader";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		"content-header-component": ContentHeader,
		"city-component": City
	},
	data() {
		return {
		cities: []
		};
	},
	computed: {
		...mapGetters(["filteredCities"])
	},
	methods: {
		...mapActions(["getCities", "updateTitleResultMatched"]),
		handleScroll () {
			if (!Loader.shouldLoadData(this.cities)) return;
			this.cities.push(...Loader.load());
		}
	},
	created() {
		this.getCities("cities");
		window.addEventListener("scroll", this.handleScroll);
	},
	watch: {
		filteredCities: function(result) {
			this.updateTitleResultMatched(result.length);
			this.cities = Loader.prepareLoader(result, 9).load();
		}
	}
};
</script>

<style scoped>

</style>