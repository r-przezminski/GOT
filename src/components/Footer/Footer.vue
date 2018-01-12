<template>
	<footer class="footer">
		<div class="footer__copy">
			<h2>&copy; Game of thrones</h2>
		</div>
		<div class="footer__links footer__links-api">
			<h3 class="links__title">Api</h3>
			<a class="links__link" target="_blank" href="https://api.got.show/doc/">ApiGotShow</a>
			<a class="links__link" target="_blank" href="https://github.com/Rostlab/JS16_ProjectA/tree/master/app">Github</a>
		</div>
		<div class="footer__links footer__links-official">
			<h3 class="links__title">Official</h3>
			<a class="links__link" target="_blank" href="http://www.hbo.com/game-of-thrones">HBO</a>
			<a class="links__link" target="_blank" href="http://viewers-guide.hbo.com/">Viewers guide</a>
			<a class="links__link" target="_blank" href="http://www.makinggameofthrones.com/">Making</a>
		</div>
		<div class="footer__links footer__links-social">
			<h3 class="links__title">Social</h3>
			<a class="links__link" target="_blank" href="https://www.facebook.com/GameOfThrones/">Facebook</a>
			<a class="links__link" target="_blank" href="https://www.youtube.com/user/GameofThrones">Youtube</a>
			<a class="links__link" target="_blank" href="https://twitter.com/gameofthrones">Twitter</a>
		</div>
	</footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/mixins.scss";

.footer {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: 25px 150px 225px;
	grid-column-gap: 30px;
	background-image: url("../../assets/img/footer.jpg");
	background-attachment: fixed;
	background-position: top;
	background-repeat: no-repeat;
	background-size: cover;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
	height: 400px;
	padding: 30px;
	color: $white;

	@include mq(768px) {
		padding: 0;
	}

	.footer__copy {
		grid-column: 6/13;
		grid-row: 3/4;
		text-align: center;
		align-self: center;

		@include mq(768px) {
			grid-column: 1/13;
			grid-row: 3/4;
			text-align: center;
			align-self: center;
		}
	}

	.footer__links {
		display: flex;
		flex-direction: column;
		
		@include mq(768px) {
			background-color: $black-transparent;
			padding: 10px;
		}
	}

	.footer__links-api {
		grid-column: 7/9;
		grid-row: 2/3;

		@include mq(768px) {
			grid-column: 2/5;
			grid-row: 2/3;
		}
	}

	.footer__links-official {
		grid-column: 9/11;
		grid-row: 2/3;

		@include mq(768px) {
			grid-column: 5/9;
			grid-row: 2/3;
		}
	}

	.footer__links-social {
		grid-column: 11/13;
		grid-row: 2/3;

		@include mq(768px) {
			grid-column: 9/12;
			grid-row: 2/3;
		}
	}

	.links__title {
		margin-bottom: 10px;
		color: $bisque;
		border-bottom: 1px solid $bisque;
	}

	.links__link {
		width: 100%;
		color: $white;
		text-decoration: none;
		font-style: italic;
		font-size: 13px;
		margin: 10px 0;
		transition: 0.2s ease-in-out;

		&:hover {
			color: $bisque;
		}
	}
}
</style>

