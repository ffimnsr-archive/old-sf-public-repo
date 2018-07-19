declare namespace Express {
    import { default as UserModel } from "../models/user.ts"
    export interface Request {
	id: string
	payload: UserModel
    }
}
