<template>
	<v-content>
		<h1>Hallo i bims</h1>
	</v-content>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		created(){
			this.$emitSocket('register:admin', {
				name: 'Demofahrzeug'
			});
		}
	});
</script>
