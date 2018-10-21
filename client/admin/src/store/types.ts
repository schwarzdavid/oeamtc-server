import {IUserState} from "./user/types";

interface IRootState {
	version: string,
	user?: IUserState
}

export {IRootState}
