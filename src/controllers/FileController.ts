import { Request, Response } from "express"
import uuid from "uuid/v4"
import FileRepository from "../repositories/FileRepository"
import IFile from "../models/interfaces/IFile"
import StorageService from "../services/Storage/StorageService"
import IAudioPayload from "../services/Storage/IAudioPayload"

export default class EventController {
	private fileRepository: FileRepository
	private storageService: StorageService

	constructor() {
		this.fileRepository = new FileRepository()
		this.storageService = new StorageService()
	}

	create = async (req: Request, res: Response) => {
		console.log("[File] Create File...")
		try {
			let { lecture_id, base64Audio } = req.body

			let file: IFile = {
        _id: uuid(),
				lecture_id: lecture_id,
				status: "AVAILABLE",
				url: ""
			}

			// Save no Storage
			let audio: IAudioPayload = {
				base64Audio: base64Audio,
				file_id: file["_id"],
				lecture_id: lecture_id
			}

			let url = await this.storageService.uploadAudio(audio)
			file["url"] = url

			// Save archive
			let response: IFile = await this.fileRepository.create(file)

			// Update a Lecture

			res.status(201).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}
}
