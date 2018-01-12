<template>
  	<div>
		<content-header-component></content-header-component>
		<character-modal-component v-if="getModalStatus"></character-modal-component>
		<div class="filters">
			<label class="filters__label" for="gender-filter">Filter by gender</label>
			<gender-filter-component class="filters__select" id="gender-filter" 
				:value="genderFilter" 
				:on-change="genderFilterHandler" 
				:options="genderOptions">
			</gender-filter-component>
			<label class="filters__label" for="houses-filter">Filter by houses</label>
			<houses-filter-component class="filters__select" id="houses-filter" 
				multiple 
				:value="housesFilter" 
				:on-change="housesFilterHandler" 
				:options="houses">
			</houses-filter-component>
		</div>
		<div class='container'>
			<character-card-component
				v-for="character in characters" 
				:key="character.index" 
				:data="character">
			</character-card-component>
		</div>
  	</div>
</template>

<script>
import ContentHeader from "@/components/Content/ContentHeader";
import Card from "@/components/Card/Card";
import Modal from "@/components/Modal/Modal";
import vSelect from "vue-select";

import Loader from "../../DataLoader/DataLoader";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		"content-header-component": ContentHeader,
		"character-card-component": Card,
		"character-modal-component": Modal,
		"gender-filter-component": vSelect,
		"houses-filter-component": vSelect
	},
	data() {
		return {
			genderOptions: ["All", "Female", "Male"],
			characters: []
		};
	},
	computed: {
		...mapGetters([
			"filteredCharacters",
			"houses",
			"imageLinkFilterStatus",
			"genderFilter",
			"housesFilter",
			"getModalStatus"
		])
	},
	methods: {
		...mapActions([
			"getCharacters",
			"imageLinkFilterHandler",
			"genderFilterHandler",
			"housesFilterHandler",
			"updateTitleResultMatched"
		]),
		handleScroll() {
			if (!Loader.shouldLoadData(this.characters)) return;
			this.characters.push(...Loader.load());
		}
	},
	created() {
		this.getCharacters({ characters: "characters", houses: "houses" });
		window.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
		Loader.destroyHandler();
	},
	watch: {
		filteredCharacters: function(result) {
			this.updateTitleResultMatched(result.length);
			this.characters = Loader.prepareLoader(result, 9).load();
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.filters {
	@include filter;

	.filters__label {
		font-style: italic;
		padding: 5px;
	}

	.filters__select {
		margin: 10px 0;
	}

	#gender-filter {
		margin-bottom: 30px;
	}
}
</style>
