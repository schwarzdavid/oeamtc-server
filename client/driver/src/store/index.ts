import Vue from 'vue';
import Vuex, {ModuleTree} from "vuex";
import {IRootState} from "./typings";

Vue.use(Vuex);

const VERSION = '1.0.0';
const state: IRootState = {
	version: VERSION
};
const modules: ModuleTree<IRootState> = {
	
};

export default new Vuex.Store<IRootState>({state, modules});
