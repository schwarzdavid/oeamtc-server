import {ActionTree} from "vuex";
import {IUserState} from "./types";
import {IRootState} from "../types";
import {api} from "../../plugins/rest";

async function login({commit}, credentials: {email:string}){
	const response = await api.post('/admin/login', credentials).then(res => res.data);

	commit('setUser', response);
}

const actions: ActionTree<IUserState, IRootState> = {
	login
};

export {actions};
