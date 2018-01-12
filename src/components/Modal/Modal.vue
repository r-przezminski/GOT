<template>
	<div class="modal">
		<div class="modal__mask" :class="{ 'hide-mask': hideMask }">
			<header class="modal__header">
				<h2 class="modal__header-title" 
					:class="{ 'hide-title': hideTitle }"
				>{{ modalData.info.name }}</h2>
				<i class="modal__close-icon fa fa-times-circle-o fa-2x" 
					aria-hidden="true" 
					:class="{ 'hide-close-icon': hideIcon }" 
					@click="closeModal"
				></i> 
			</header>
			<div class="modal__body" :class="{ 'hide-body': hideBody }">
				<img class="modal__body-image" :class="{ 'hidden': hidden && mqS }"
					:src="modalData.info.imageLink" 
					alt=""
				>
				<section class="modal__body-details" :class="{ 'hidden': !hidden && mqS }">
					<ul class="modal__details-title" 
						v-for="(data, index) in modalData.details" 
						:key="index"
					>{{ index }}:
						<li class="modal__details-info" 
							v-if="typeof data !== 'object'"
						>{{ data }}</li>
						<li class="modal__details-info" 
							v-else 
							v-for="info in data" 
							:key="info"
						>{{ info }}</li>
					</ul>
				</section>
			</div>
			<button class="mask__button" type="button" @click="change">{{ btnVal }}</button>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	data() {
		return {
			hideTitle: false,
			hideIcon: false,
			hideBody: false,
			hideMask: false,
			btnVal: 'Show image',
			hidden: true,
		};
	},
	computed: {
		...mapGetters(["modalData"]),
		mqS() {
			return window.innerWidth <= 480
		}
	},
	methods: {
		...mapActions(["switchModal"]),
		closeModal() {
			this.hideTitle = true;
			this.hideIcon = true;
			this.hideBody = true;
			this.hideMask = true;
			setTimeout(() => {
				this.switchModal();
			}, 3000);
		},
		change() {
			this.btnVal = this.btnVal === 'Show image' ? 'Show info' : 'Show image';
			this.hidden =  !this.hidden;
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.modal {
	.modal__mask {
		position: fixed;
		z-index: 10;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: $black-transparent;
		animation-duration: 1s;
		animation-name: show-modal-mask;
		animation-direction: alternate;
		animation-fill-mode: forwards;
	}

	.mask__button {
		display: none;

		@include mq(480px) {
			@include button;
			margin: 35px auto;
		}
	}

	.modal__header {
		margin: 20px;
	}

	.modal__header-title {
		width: 70%;
		margin: 10px auto;
		color: $chocolate;
		font-style: italic;
		text-align: center;
		opacity: 0;
		animation-duration: 1.5s;
		animation-name: show-modal-title;
		animation-direction: alternate;
		animation-fill-mode: forwards;
	}

	.modal__close-icon {
		position: absolute;
		top: -30px;
		left: 93%;
		color: $bright-ashen;
		transition: 0.2s ease-in-out;
		position: absolute;
		opacity: 0;
		animation-duration: 0.75s;
		animation-name: bounce-modal-close-icon;
		animation-direction: alternate;
		animation-fill-mode: forwards;
		animation-delay: 1.25s;

		&:hover {
			color: $chocolate;
			cursor: pointer;
		}
	}

	.modal__body {
		max-width: 800px;
		height: 500px;
		margin: 0 auto;
		transform: scale(0);
		display: flex;
		background-color: $bright-ashen;
		justify-content: space-around;
		animation-duration: 0.5s;
		animation-name: show-modal-body;
		animation-fill-mode: forwards;
		animation-delay: 1s;

		@include mq(768px) {
			height: 300px;
			overflow: scroll;
		}

		@include mq(480px) {
			height: 500px;
		}
	}

	.modal__body-image {
		margin-top: 25px;
		max-width: 300px;
		height: 450px;
		padding: 0 20px;

		@include mq(768px) {
			height: 250px;
		}

		@include mq(480px) {
			position: absolute;
			height: 450px;
			transition: .3s ease-in-out;
		}
	}

	.modal__body-details {
		margin-top: 25px;
		height: 350px;
		padding: 0 20px;

		@include mq(480px) {
			position: absolute;
			transition: .3s ease-in-out;
		}
	}

	.modal__details-title {
		color: $black;
		font-weight: 900;
		list-style: none;
	}

	.modal__details-info {
		color: $chocolate;
		font-weight: 800;
		font-style: italic;
		margin-left: 20px;
	}

	.hide-title {
		opacity: 1;
		animation-duration: 1s;
		animation-name: hide-title;
		animation-fill-mode: forwards;
	}

	.hide-close-icon {
		opacity: 1;
		transform: translateY(48px);
		animation-duration: 0.3s;
		animation-name: hide-close-icon;
		animation-fill-mode: forwards;
		animation-delay: 0.5s;
	}

	.hide-body {
		transform: scale(1);
		animation-duration: 1.5s;
		animation-name: hide-body;
		animation-fill-mode: forwards;
		animation-delay: 1s;
	}

	.hide-mask {
		animation-duration: 1s;
		animation-name: hide-mask;
		animation-delay: 2s;
	}

	.hidden {
		opacity: 0;
	}

	@keyframes hide-title {
		15% { transform: scale(0.5, 1); }
		35% { transform: translateX(0); }
		100% { transform: translateX(-150%); }
	}

	@keyframes hide-close-icon {
		from { left: 93%; }
		to { left: 110%; }
	}

	@keyframes hide-body {
		from { transform: scale(1) rotate(0deg); }
		to { transform: scale(0) rotate(450deg); }
	}

	@keyframes hide-mask {
		from { opacity: 1; }
		to { opacity: 0; }
	}

	@keyframes show-modal-mask {
		0% { left: 50%; top: 50%; width: 1%; height: 20%; }
		25% { left: 0; width: 100%; }
		50% { height: 12%; top: 50%; }
		70% { top: 0; height: 100%; }
		75% { transform: scale(1.1); }
		90% { transform: scale(0.8); }
		100% { height: 100%; width: 100%; }
	}

	@keyframes show-modal-title {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes show-modal-body {
		0% { transform: scale(0); }
		5% { transform: scale(0.5); }
		25% { transform: scale(1.1); }
		50% { transform: scale(1); }
		75% { transform: scale(1.03); }
		100% { transform: scale(1); }
	}

	@keyframes bounce-modal-close-icon {
		0% { opacity: 0; transform: translateY(-30px); }
		20% { transform: translateY(48px); }
		50% { transform: translateY(35px); }
		70% { transform: translateY(48px); }
		90% { transform: translateY(42px); }
		100% { opacity: 1; transform: translateY(48px); }
	}
}

</style>

