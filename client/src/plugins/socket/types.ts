type Callback = (payload: any) => void;

interface SocketPlugin {
	on: (type: string, callback: Callback) => void,
	off: (type: string, callback: Callback) => void,
	emit: (type: string, payload: any) => void
}

export {SocketPlugin, Callback }
