import {socket} from "./socket";
import {Callback as SocketCallback} from "./types";

const Socket = {
	install(Vue) {
		Vue.prototype.$onSocket = function (type: string, callback: SocketCallback) {
			this.$data.$_listener.push({type, callback});
			socket.on(type, callback);
		};

		Vue.prototype.$offSocket = function (type: string, callback: SocketCallback) {
			this.$data.$_listener.splice(this.$data.$_listener.findIndex(ln => ln === {type, callback}), 1);
			socket.off(type, callback);
		};

		Vue.prototype.$emitSocket = function (type: string, payload: any) {
			socket.emit(type, payload);
		};

		Vue.mixin({
			data() {
				return {
					$_listener: []
				}
			},

			destroyed() {
				for (let {type, callback} of this.$data.$_listener) {
					socket.off(type, callback);
				}
			}
		});
	}
};

export {Socket}
