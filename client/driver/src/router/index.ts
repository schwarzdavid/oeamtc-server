import Vue from 'vue';
import VueRouter from 'vue-router';

import AdminComponent from '../components/dashboard/Admin.vue';
import AuthComponent from '../components/auth/Auth.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'auth',
			component: AuthComponent
		},
		{
			path: '/admin',
			name: 'admin',
			component: AdminComponent
		}
	]
});

export default router;
