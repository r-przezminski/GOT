<template>
	<div>
		<content-header-component></content-header-component>
		<house-modal-component v-if="getModalStatus"></house-modal-component>
		<div class="container">
			<house-card-component 
				v-for="house in houses" 
				:key="house._id" 
				:data="house">
			</house-card-component>
		</div>
	</div>
</template>

<script>
import ContentHeader from "@/components/Content/ContentHeader";
import Modal from "@/components/Modal/Modal";
import Card from "@/components/Card/Card";

import Loader from "../../DataLoader/DataLoader";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		"content-header-component": ContentHeader,
		"house-modal-component": Modal,
		"house-card-component": Card
	},
	data() {
		return {
			house: {},
			houses: []
		};
	},
	computed: {
		...mapGetters([
			"filteredHouses",
			"getModalStatus"
		])
	},
	methods: {
		...mapActions([
			"getHouses",
			"updateTitleResultMatched"
		]),
		handleScroll() {
			if (!Loader.shouldLoadData(this.houses)) return;
			this.houses.push(...Loader.load());
		}
	},
	created() {
		this.getHouses("houses");
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
		Loader.destroyHandler();
	},
	watch: {
		filteredHouses: function(result) {
			this.updateTitleResultMatched(result.length);
			this.houses = Loader.prepareLoader(result, 9).load();
		}
	}
};
</script>

<style lang="scss" scoped>

</style>
