import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import EventController from "../controllers/EventController"

export default class EventRoute implements IRoute {
	private prefix: any
	private routes = Router()
	private eventController: EventController

	constructor(prefix: String) {
		this.prefix = prefix
		this.eventController = new EventController()
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.post("/", this.eventController.create))
		app.use(this.prefix, this.routes.get("/:id", this.eventController.getById))
		app.use(this.prefix, this.routes.get("/", this.eventController.getAll))
		app.use(this.prefix, this.routes.get("/user/:user_id", this.eventController.getByUserId))
	}
}
