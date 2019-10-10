import { Application } from "express"

export default interface IRoute {
	registerRoute(app: Application): void
}
