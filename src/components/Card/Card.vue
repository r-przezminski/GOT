<template>
	<div class="card" >
		<h3 class="card__title">{{ data.name }}</h3>
		<img class="card__image" alt="card image" :src="data.imageLink">
		<button class="card__button" type="button" @click="triggerModal(data)">More info</button>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	props: ["data"],
	methods: {
		...mapActions([
			"setModalData", 
			"switchModal"
		]),
		triggerModal(data) {
			this.switchModal();
			this.setModalData(data);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.card {
	@include card;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	padding: 10px;
	width: 300px;
	height: 420px;
	margin-bottom: 20px;
	text-align: center;

	.card__title {
		@include title;
	}

	.card__image {
		width: 250px;
		height: 280px;
	}

	.card__button {
		@include button;
	}
}
</style>
