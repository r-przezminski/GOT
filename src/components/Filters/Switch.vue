<template>
	<div class="switch">
		<label for="switch">
			<p>Images:</p>
		</label>
		<input class="switch__slider" type="checkbox" id="switch" 
			:checked="imageLinkFilterStatus" 
			@click="imageLinkFilterHandler"
		>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	computed: {
		...mapGetters(["imageLinkFilterStatus"])
	},
	methods: {
		...mapActions(["imageLinkFilterHandler"])
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.switch {
	display: flex;
	justify-content: space-around;
	font-style: italic;

	.switch__slider {
		font-size: 20px;
		appearance: none;
		width: 2em;
		height: 1em;
		background-color: $dim-gray;
		border-radius: 3em;
		position: relative;
		cursor: pointer;
		outline: none;
		transition: all 0.2s ease-in-out;
	}

	.switch__slider:checked {
		background-color: $chocolate;
	}

	.switch__slider:after {
		position: absolute;
		content: "";
		width: 1em;
		height: 1em;
		border-radius: 50%;
		background-color: $bright-ashen;
		box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
		transform: scale(0.7);
		left: 0;
		transition: all 0.2s ease-in-out;
	}

	.switch__slider:checked:after {
		left: calc(100% - 1em);
	}
}

</style>
