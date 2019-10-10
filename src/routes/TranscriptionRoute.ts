import { Application, Router } from "express"
import IRoute from "../base/IRoute"
import TranscriptionController from "../controllers/TranscriptionController"

export default class TranscriptionRoute implements IRoute {
    private prefix: any
    private routes = Router()
    private transcriptionController: TranscriptionController

    constructor(prefix: String) {
        this.prefix = prefix
        this.transcriptionController = new TranscriptionController()
    }

    public registerRoute(app: Application): void {
        app.use(this.prefix, this.routes.post("/", this.transcriptionController.create))
        app.use(this.prefix, this.routes.put("/", this.transcriptionController.updateTranscriptionBody))
    }
}