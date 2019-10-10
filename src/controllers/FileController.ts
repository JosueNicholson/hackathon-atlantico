import { Request, Response } from "express"
import uuid from "uuid/v4"
import FileRepository from "../repositories/FileRepository"
import LectureRepository from "../repositories/LectureRepository"
import IFile from "../models/interfaces/IFile"
import StorageService from "../services/Storage/StorageService"
import IAudioPayload from "../services/Storage/IAudioPayload"

export default class EventController {
	private fileRepository: FileRepository
	private lectureRepository: LectureRepository
	private storageService: StorageService

	constructor() {
		this.fileRepository = new FileRepository()
		this.lectureRepository = new LectureRepository()
		this.storageService = new StorageService()
	}

	create = async (req: Request, res: Response) => {
		console.log("[File] Create File...")
		try {
			console.log(req.body)
			let { lecture_id, baseAudio } = req.body

			if (!lecture_id) throw new Error("lecture_id is required!")
			if (!baseAudio) throw new Error("baseAudio is required!")

			let file: IFile = {
				_id: uuid(),
				lecture_id: lecture_id,
				status: "AVAILABLE",
				url: ""
			}

			// Save no Storage
			let audio: IAudioPayload = {
				baseAudio: baseAudio,
				lecture_id: lecture_id
			}

			let url = await this.storageService.uploadAudio(audio)
			file["url"] = url

			// Save archive
			let response: IFile = await this.fileRepository.create(file)

			// Update a Lecture
			await this.lectureRepository.updateFileId(lecture_id, `${response._id}`)

			res.status(201).send({ message: "Success!" })
		} catch (e) {
			console.log(e.message)
			res.status(500).send({ message: e.message })
		}
	}
}
