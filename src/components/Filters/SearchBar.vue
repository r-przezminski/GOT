<template>
	<div class="search">
		<input class="search__input"  type="text" placeholder="Search..." v-model="search" @keyup="searching(search)">
		<i class="search__icon fa fa-search" aria-hidden="true"></i>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	data() {
		return {
			search: ""
		};
	},
	methods: {
		...mapActions(["searching"])
	},
	computed: {
		triggerResults() {
			return {
				"show-result": this.results.visible && window.innerWidth > 700
			};
		}
	},
	filters: {
		firstToUpper: value => {
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.search {
	display: flex;
	justify-content: center;
	position: relative;

	.search__icon {
		position: absolute;
		top: 23px;
		left: 90px;
		color: $white;
		transition: 0.5s ease;
	}

	.search__input {
		position: absolute;
		top: 15px;
		left: 100px;
		height: 35px;
		width: 85px;
		padding: 10px;
		border-radius: 5px;
		font-size: 16px;
		border: none;
		outline: none;
		border-bottom: 1px solid $white;
		background: transparent;
		color: $white;
		transition: 0.5s ease;
	}

	.search__input:focus {
		width: 240px;
		border-bottom: 1px solid $chocolate;

		@include mq(768px) {
			width: 200px;
		}
	}

	.search__input:focus ~ .search__icon {
		color: $chocolate;
	}
}
</style>