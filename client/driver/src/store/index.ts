import Vue from 'vue';
import Vuex, {ModuleTree} from "vuex";
import {IRootState} from "./types";
import {module as userModule} from './user';

Vue.use(Vuex);

const VERSION = '1.0.0';
const state: IRootState = {
	version: VERSION
};
const modules: ModuleTree<IRootState> = {
	user: userModule
};

export default new Vuex.Store<IRootState>({state, modules});
