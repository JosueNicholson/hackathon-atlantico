import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import UserController from "../controllers/UserController"

export default class UserRoute implements IRoute {
	private prefix: any
	private routes = Router()
	private userController: UserController

	constructor(prefix: String) {
		this.prefix = prefix
		this.userController = new UserController()
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.post("/", this.userController.signUp))
		app.use(this.prefix, this.routes.put("/", this.userController.login))
	}
}
