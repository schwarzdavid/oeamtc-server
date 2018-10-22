<template>
	<div style="height:100%;">

		<!-- SIDE NAVIGATION -->
		<v-navigation-drawer v-model="drawer" app fixed clipped class="grey lgihten-4">
			Hallo i bims
		</v-navigation-drawer>
		<!-- / SIDE NAVIGATION -->

		<!-- TOOLBAR -->
		<v-toolbar app absolute clipped-left color="light-green darken-2" dark>
			<v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
			<span class="title ml-3 mr-5">Roadpatrol</span>
			<v-text-field solo-inverted flat hide-details label="Suche..." prepend-inner-icon="search"></v-text-field>
			<v-spacer></v-spacer>
			<span>Hallo i bims</span>
		</v-toolbar>
		<!-- / TOOLBAR -->

		<!-- CONTENT -->
		<v-content style="height: inherit;">
			<router-view></router-view>
		</v-content>
		<!-- / CONTENT -->

	</div>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		data() {
			return {
				drawer: null
			}
		},

		created() {
			this.$onSocket('open', () => {
				this.$emitSocket('register:driver', {
					id: this.$store.state.user.id
				});
			});
		},

		destroyed() {
			this.$emitSocket('unregister');
		}
	});
</script>
