import axios from 'axios';
import store from '../../store';

const api =  axios.create({
	baseURL: location.origin + '/api'
});

api.interceptors.request.use(config => {
	const id = store.state.user.id;
	if(id){
		config.headers.Authorization = id;
	}
	return config;
});

export {api}
