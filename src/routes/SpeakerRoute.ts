import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import SpeakerController from "../controllers/SpeakerController"

export default class SpeakerRoute implements IRoute {
	private prefix: any
	private routes = Router()
	private speakerController: SpeakerController

	constructor(prefix: String) {
		this.prefix = prefix
		this.speakerController = new SpeakerController()
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.post("/", this.speakerController.create))
		app.use(this.prefix, this.routes.get("/", this.speakerController.getAll))
		app.use(this.prefix, this.routes.get("/:id", this.speakerController.getById))
	}
}
