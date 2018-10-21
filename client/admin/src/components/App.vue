<template>
	<v-app>
		<router-view></router-view>

		<v-snackbar v-model="socketOpen" bottom right>
			<span>Verbindung hergestellt</span>
			<v-btn color="pink" flat @click.prevent="socketOpen = false">Schließen</v-btn>
		</v-snackbar>

		<v-snackbar v-model="socketClosed" bottom right>
			<span>Verbindung unterbrochen</span>
			<v-btn color="pink" flat @click.prevent="socketClosed = false">Schließen</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		data() {
			return {
				socketOpen: false,
				socketClosed: false
			};
		},

		created(){
			this.$onSocket('close', () => {
				this.socketClosed = true;
			});

			this.$onSocket('open', () => {
				this.socketOpen = true;
			});
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
