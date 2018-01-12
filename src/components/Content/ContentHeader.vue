<template>
	<header class="content-header">
		<h2 class="content-header__title">{{ label }}</h2>
		<div class="content-header__result-all">
			<p class="result-all__label">All: </p>
			<h4 class="result-all__value">{{ all }}</h4>
		</div>
		<div class="content-header__result-matched">
			<p class="result-matched__label">Matched:</p>
			<h4 class="result-matched__value">{{ matched }}</h4>
		</div>
		<switch-component class="content-header__switch"></switch-component>
	</header>
</template>

<script>
import Switch from "@/components/Filters/Switch";
import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		"switch-component": Switch
	},
	computed: {
		...mapGetters(["label", "matched", "all"])
	},
	methods: {
		...mapActions(["getLabel"])
	},
	created() {
		this.getLabel(this.$route.name);
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.content-header {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-auto-rows: minmax(50px, auto);
	padding: 20px;

	.content-header__title {
		grid-column: 1/13;
		grid-row: 1/2;
		color: $chocolate;
		font-style: italic;
		font-weight: bold;
		border-bottom: solid 1px $chocolate;
		align-self: start;
	}

	.content-header__result-all {
		grid-column: 4/6;
		grid-row: 1/2;
		display: flex;
		margin-top: 5px;

		@include mq(768px) {
			grid-column: 1/6;
			grid-row: 2/3;
			justify-self: center;
		}
	}

	.content-header__result-matched {
		grid-column: 7/9;
		grid-row: 1/2;
		display: flex;
		margin-top: 5px;

		@include mq(768px) {
			grid-column: 7/13;
			grid-row: 2/3;
			justify-self: center;
		}
	}

	.result-all__label,
	.result-matched__label {
		font-style: italic;
	}

	.result-all__value,
	.result-matched__value {
		color: $chocolate;
		margin-left: 10px;
	}

	.content-header__switch {
		grid-column: 10/12;
		grid-row: 1/2;
		margin-top: 5px;

		@include mq(768px) {
			grid-column: 9/12;
		}

		@include mq(480px) {
			grid-column: 8/12;
		}
	}
}
</style>
