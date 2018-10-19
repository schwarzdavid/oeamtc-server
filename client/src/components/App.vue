<template>
	<v-app>
		<router-view></router-view>


	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		data() {
			return {

			};
		}
	});
</script>

<style src="~/mdi/css/materialdesignicons.min.css"></style>
<style src="~/vuetify/dist/vuetify.min.css"></style>

<style lang="scss">
	html, body {
		height: 100%;
	}

	#app, .application--wrap {
		min-height: 100%;
	}
</style>
