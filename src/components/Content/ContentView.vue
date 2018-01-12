<template>
	<main>
		<app-loading v-if="isLoading"></app-loading>
		<app-error v-show="isError"></app-error>
		<router-view v-show="!isError" :class="[isLoading ? '' : 'show']" class="view"></router-view>
	</main>
</template>

<script>
import Loading from "@/components/Loading/Loading";
import Error from "@/components/Error/Error";

import { mapGetters } from "vuex";

export default {
	name: "app",
	components: {
		"app-loading": Loading,
		"app-error": Error
	},
	computed: {
		...mapGetters(["isLoading", "isError"])
	}
};
</script>

<style lang="scss" scoped>
.view {
	opacity: 0;
	transition: 0.5s linear;
}

.show {
 	 opacity: 1;
}
</style>
