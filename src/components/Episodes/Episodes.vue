<template>
	<div>
		<content-header-component></content-header-component>
		<div class="seasons-filter">
			<label for="seasons-filter">Seasons: </label>
			<v-select 
				id="seasons-filter"
				:value="seasonFilter" 
				:on-change="seasonFilterHandler" 
				:options="seasons">
			</v-select>
		</div>
		<div class="container">
			<episode-component 
				v-for="episode in filteredEpisodes" 
				:key="episode._id"
				:episode ="episode">
			</episode-component>
			<tool-tip-image-component></tool-tip-image-component>
		</div>
	</div>
</template>

<script>
import ContentHeader from "@/components/Content/ContentHeader";
import Episode from "@/components/Episodes/Episode";
import ToolTip from "@/components/Episodes/ToolTipImage";
import vSelect from "vue-select";

import { mapGetters, mapActions } from "vuex";

export default {
	components: {
		"content-header-component": ContentHeader,
		"episode-component": Episode,
		"tool-tip-image-component": ToolTip,
		"v-select": vSelect
	},
	computed: {
		...mapGetters([
			"filteredEpisodes", 
			"seasons", 
			"seasonFilter"
		])
	},
	methods: {
		...mapActions([
			"getEpisodes",
			"updateTitleResultMatched",
			"seasonFilterHandler"
		])
	},
	created() {
		this.getEpisodes("episodes");
	},
	watch: {
		filteredEpisodes: function(result) {
		this.updateTitleResultMatched(result.length);
		}
	}
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins.scss";

.seasons-filter {
	@include filter;
}

</style>
