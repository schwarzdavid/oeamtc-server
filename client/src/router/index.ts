import Vue from 'vue';
import VueRouter from 'vue-router';

import AuthComponent from '../components/auth/Auth.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'auth',
			component: AuthComponent
		}
	]
});

export default router;
