<template>
	<v-content class="withBg">

		<!-- CENTERED CARD -->
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 class="withMaxWidth">
					<v-card class="elevation-5">
						<v-card-text class="text-xs-center">

							<!-- CARD CONTENT -->
							<h1 class="mt-5">Select your role</h1>

							<v-layout align-center row justify-space-around fill-height class="my-5">
								<router-link to="/driver">
									<v-btn color="info" large>Driver</v-btn>
								</router-link>
								<router-link to="/admin">
									<v-btn color="info" large>Admin</v-btn>
								</router-link>
							</v-layout>
							<!-- / CARD CONTENT -->

						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>
		<!-- / CENTERED CARD -->

		<!-- FOOTER -->
		<v-footer :app="true" dark class="transparentBg pa-4 my-3">
			<span>Made by <a href="https://schwarzdavid.rocks" target="_blank" rel="noopener">David Schwarz</a></span>
		</v-footer>
		<!-- / FOOTER -->

	</v-content>
</template>

<script lang="ts">
	import Vue from 'vue';

	export default Vue.extend({
		created() {
			this.$onSocket('open', () => {
				this.socketOpen = true;
			});
		}
	});
</script>

<style lang="scss" scoped>
	.withBg {
		background: url('~Assets/start-background.jpg') no-repeat center center;
		background-size: cover;
	}

	.transparentBg {
		background: transparent;

		a {
			color: inherit;
		}
	}

	.withMaxWidth {
		max-width: 500px;
	}
</style>
