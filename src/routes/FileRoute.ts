import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import FileController from "../controllers/FileController"

export default class EventRoute implements IRoute {
	private prefix: any
	private routes = Router()
	private fileController: FileController

	constructor(prefix: String) {
		this.prefix = prefix
		this.fileController = new FileController()
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.post("/", this.fileController.create))
	}
}
