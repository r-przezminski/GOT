<template>
	<div class="loading">
		<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>
	</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.loading {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100;
	height: 100vh;
	width: 100vw;
	background-color: $bright-ashen-transparent;
}
</style>

