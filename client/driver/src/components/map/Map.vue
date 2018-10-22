<template>
	<v-container fluid fill-height class="pa-0">
		<div id="map" style="width:100%;height:100%;min-height:400px;"></div>
	</v-container>
</template>

<script lang="ts">
	import Vue from 'vue';

	declare const google: any;

	export default Vue.extend({
		mounted() {
			const mapContainer = this.$el.querySelector('#map');
			const options = {
				zoom: 14,
				center: new google.maps.LatLng(51, -0.2),
			};
			const map = new google.maps.Map(mapContainer, options);
		}
	});
</script>
