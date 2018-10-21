<template>
	<v-content class="withBg">

		<!-- CENTERED CARD -->
		<v-container fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex xs12 class="withMaxWidth">
					<v-card class="elevation-5">
						<v-img src="~Assets/login_header.png" alt="ÖAMTC Ideathon" draggable="false"></v-img>

						<v-card-text class="text-xs-center">

							<h1 class="display-1 font-weight-light mt-2 mb-4">Admin Login</h1>

							<!-- CARD CONTENT -->
							<v-form v-model="formValid" @submit.prevent="onSubmit">
								<v-container>

									<!-- EMAIL TEXT FIELD -->
									<v-text-field prepend-icon="mdi-email-outline" name="email" label="E-Mail Adresse"
									              type="email" v-model="user.email" autocomplete="email"
									              disabled="true"></v-text-field>
									<!-- / EMAIL TEXT FIELD -->

									<!-- PASSWORD -->
									<v-text-field prepend-icon="mdi-key-variant" name="password" label="Passwort"
									              type="password" autocomplete="password"
									              value="12345678"></v-text-field>
									<!-- / PASSWORD -->

									<!-- LOGIN BUTTON -->
									<v-btn :disabled="!formValid" type="submit" color="primary">Anmelden</v-btn>
									<!-- / LOGIN BUTTON -->

								</v-container>
							</v-form>
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
		data() {
			return {
				formValid: false,
				user: {
					email: 'admin@oeamtc.at'
				}
			};
		},

		methods: {
			async onSubmit(){
				await this.$store.dispatch('user/login', {
					email: this.user.email
				});

				this.$router.path = '/';
			}
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
