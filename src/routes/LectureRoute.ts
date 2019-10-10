import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import LectureController from "../controllers/LectureController"

export default class LectureRoute implements IRoute {
	private prefix: any
	private routes = Router()
	private lectureController: LectureController

	constructor(prefix: String) {
		this.prefix = prefix
		this.lectureController = new LectureController()
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.post("/", this.lectureController.create))
		app.use(this.prefix, this.routes.put("/status", this.lectureController.setStatus))
		app.use(this.prefix, this.routes.get("/:id", this.lectureController.getById))
		app.use(this.prefix, this.routes.get("/event/:event_id", this.lectureController.getByEventId))
	}
}
