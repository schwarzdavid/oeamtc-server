import {MutationTree} from "vuex";
import {IUserState} from "./types";

function setUser(state: IUserState, user){
	state.id = user.id;
	state.name = user.name;
	state.email = user.email;
	state.location = user.location;
}

const mutations: MutationTree<IUserState> = {
	setUser
};

export {mutations}
