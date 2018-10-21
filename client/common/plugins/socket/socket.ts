import {Callback, SocketPlugin} from "./types";

const listener: {
	[key: string]: Callback[]
} = {};

let retry = 0;
let _socket = openSocket();

function openSocket() {
	const ws = new WebSocket((location.protocol === 'https:' ? 'wss' : 'ws') + '://' + location.host);
	retry++;

	ws.onopen = () => {
		retry = 0;
		console.info('Socket connection established');
		trigger('open');
	};

	ws.onmessage = (message: MessageEvent) => {
		console.log('Message received', message);
	};

	ws.onerror = (err: ErrorEvent) => {
		console.info('Socket error occured', err);
	};

	ws.onclose = () => {
		console.info('Socket closed');

		if(retry < 3){
			console.log(`Trying to reconnect... ${retry+1}`);
			_socket = openSocket();
		} else {
			console.log('Connection dead');
			trigger('close');
		}
	};

	return ws;
}

function on(type: string, callback: Callback) {
	if (!listener[type]) {
		listener[type] = [];
	}

	listener[type].push(callback);
}

function off(type: string, callback: Callback) {
	if(!Array.isArray(listener[type])){
		return;
	}

	for(let i = 0; i < listener[type].length; i++){
		if(listener[type][i] === callback){
			listener[type].splice(i, 1);
		}
	}
}

function emit(type: string, payload: any) {
	const message = JSON.stringify({type, payload});
	_socket.send(message);
}

function trigger(type: string, payload?: any){
	if(!Array.isArray(listener[type])){
		return;
	}

	for(let callback of listener[type]){
		callback(payload);
	}
}

const socket: SocketPlugin = {
	on, off, emit
};

export {socket}
