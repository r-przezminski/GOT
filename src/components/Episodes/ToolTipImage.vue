<template>
	<div class="image-loader" 
		v-show="toolTip.show" 
		:style="{'top': toolTip.y, 'left': toolTip.x}"
	>
		<i class="image-loader__spinner fa fa-spinner fa-pulse fa-2x fa-fw" 
			v-show="toolTip.isLoading"></i>
		<p class="image-loader__text" 
			v-show="hasNotImage">This character doesn't have image!</p>
		<p class="image-loader__text image-loader__text--error" 
			v-show="hasError">Couldn't load image!</p>
		<img class="image-loader__image" 
			:src="toolTipResponse.url" 
			alt="character image" 
			v-show="hasImage">
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters([
			"toolTip", 
			"toolTipResponse"
		]),
		hasImage() {
			return this.toolTipResponse.isSucces && this.toolTipResponse.hasImg;
		},
		hasNotImage() {
			return !this.toolTip.isLoading && !this.toolTipResponse.hasImg && this.toolTipResponse.isSucces;
		},
		hasError() {
			return !this.toolTip.isLoading && !this.toolTipResponse.isSucces;
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.image-loader {
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	width: 150px;
	height: 200px;
	background-color: $bright-ashen;
	box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.6);

	@include mq(768px) {
		display: none;
	}

	.image-loader__text {
		text-align: center;
		font-weight: bold;
	}

	.image-loader__text--error {
		color: $burgundy;
	}

	.image-loader__text--hidden {
		display: none;
	}

	.image-loader__image {
		width: 100%;
		height: 100%;
	}
}
</style>