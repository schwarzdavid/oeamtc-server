import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import DashboardComponent from '../components/dashboard/Dashboard.vue';
import AuthComponent from '../components/auth/Auth.vue';
import MapComponent from '../components/map/Map.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	base: '/driver',
	mode: 'history',
	routes: [
		{
			path: '/auth',
			name: 'auth',
			component: AuthComponent
		},
		{
			path: '/',
			component: DashboardComponent,
			beforeEnter(to, from, next){
				if(!store.getters['user/isAuthenticated']){
					return next('/auth');
				}
				return next();
			},
			children: [
				{
					path: '',
					name: 'dashboard',
					component: MapComponent
				}
			]
		},
		{
			path: '*',
			redirect: '/'
		}
	]
});

export default router;
