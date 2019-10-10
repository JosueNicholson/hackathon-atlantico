import { Application, Router, Request, Response } from "express"
import IRoute from "../base/IRoute"

export default class RootRoute implements IRoute {
	private prefix: any
	private routes = Router()

	constructor(prefix: String) {
		this.prefix = prefix
	}

	public registerRoute(app: Application): void {
		app.use(this.prefix, this.routes.get("/", this.serverInfo))
	}

	private serverInfo(req: Request, res: Response) {
		return res
			.status(200)
			.send({
				Title: "Hackathon Atlântico AWS",
				Version: "0.5.3"
			})
	}
}
