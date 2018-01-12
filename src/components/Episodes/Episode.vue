<template>
	<div class="card">
		<div class="card__header">
			<h3 class="header__title">{{ episode.name }}</h3>
			<div class="header__info">
				<p>Season {{ episode.season }}, Episode {{ episode.totalNr }}</p>
				<p>Director: {{ episode.director }}</p>
			</div>
		</div>
		<div class="card__body">
			<p class="body__title">Characters in episode:</p>
			<p class="body__item" v-for="character in episode.characters" :key="character.index" @mouseover="showImage" @mouseout="hideImage">{{ character }}</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	props: ['episode'],
	methods: {
		...mapActions([
			"handleToolTip", 
			"handleToolTipRequest", 
			"handleResetToolTip"
		]),
		showImage(e) {
			const options = {
				cursorX: e.clientX,
				cursorY: e.clientY,
				scrollY: window.scrollY
			};
			const name = e.target.textContent;
			this.handleToolTip(options);
			this.handleToolTipRequest(name);
		},
		hideImage(e) {
			this.handleResetToolTip()
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.card {
	@include card;
	padding: 0 20px;
	width: 450px;
	min-height: 700px;
	margin: 20px auto;

	.card__header {
		border-bottom: 1px solid $bisque;
		width: 100%;
		height: 120px;
		padding: 10px;
	}

	.header__title {
		color: $chocolate;
		font-style: italic;
		text-align: center;
		margin-bottom: 20px;
	}

	.header__info {
		color: $chocolate;
	}

	.header__info p {
		margin: 10px 0;
	}

	.card__body {
		padding: 5px;
	}

	.body__title {
		margin: 10px 0;
		font-weight: bold;
		color: $bisque;
	}

	.body__item {
		display: inline-block;
		margin: 10px 0;
		padding: 0 5px;
		color: $bisque;
		font-style: italic;

		&:hover {
			cursor: pointer;
		}
	}

	.body__item:after {
		content: ',';
	}

	.body__item:last-child:after {
		content: '.';
	}
}
</style>
