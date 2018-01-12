<template>
	<div class="card">
		<h3 class="card__title">{{ city.name }}</h3>
		<a class="card__link" target="_blank" :href="city.link">See on westeros.org</a>
	</div>
</template>

<script>
export default {
	props: ["city"]
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.card {
	@include card;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	width: 300px;
	height: auto;
	margin-bottom: 20px;
	text-align: center;

	.card__title {
		@include title;
	}

	.card__link {
		@include button;
	}
}
</style>
