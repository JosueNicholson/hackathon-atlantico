import express, { Application } from "express"
import * as bodyParser from "body-parser"
import helmet from "helmet"
import cors from "cors"

import MongoConnection from "./config/MongoConnection"
import Index from "./routes/Index"
import IRoute from "./base/IRoute"

export default class ServerApplication {
	private app: Application

	constructor() {
		this.app = express()
	}

	public initApplication(port: Number): void {
		this.connectDatabase()
		this.initMiddlewares()
		this.initRoutes()

		this.app.listen(port, () => {
			console.log(`[SERVER] Listening on port ${port}`)
		})
	}

	private connectDatabase(): void {
		let mongo: MongoConnection = new MongoConnection(
			`${process.env.MONGO_USER}`,
			`${process.env.MONGO_PASSWORD}`,
			`${process.env.MONGO_HOST}`,
			`${process.env.MONGO_DATABASE}`
		)
		mongo.connect()
	}

	private initMiddlewares(): void {
		this.app.use(cors())
		this.app.use(helmet())
		this.app.use(bodyParser.json({ limit: "10mb" }))
		this.app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }))
	}

	private initRoutes(): void {
		let routes: IRoute[] = Index.initRoutes()

		routes.forEach(route => {
			route.registerRoute(this.app)
		})
	}
}
