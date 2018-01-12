<template>
	<div class="error">
		<h2 class="error__message">{{ code }}, {{ msg }}</h2>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	computed: {
		...mapGetters(["code", "msg"])
	},
	methods: {
		...mapActions(["resetError"])
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.error {
	min-width: 300px;
	min-height: 100px;
	background-color: $danger;
	border: 2px solid $burgundy;
	border-radius: 10px;
	margin: 50px auto;
	padding: 30px;

	.error__message {
		text-align: center;
		color: $burgundy;
	}
}
</style>