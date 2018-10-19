import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './components/App.vue';
import router from './router/index';
import store from './store';

Vue.use(Vuetify, {
	iconfont: 'mdi',
	theme: {

	}
});

new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});
