import Vue from "vue";
import {SocketPlugin} from '../plugins/socket/types';

declare module "vue/types/vue" {
	interface Vue {
		readonly $socket: SocketPlugin;
	}
}
