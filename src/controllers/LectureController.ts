import { Request, Response } from "express"

import LectureRepository from "../repositories/LectureRepository"
import ILecture from "../models/interfaces/ILecture"

export default class LectureController {
	private lectureRepository: LectureRepository

	constructor() {
		this.lectureRepository = new LectureRepository()
	}

	create = async (req: Request, res: Response) => {
		console.log("[Lecture] Create Lecture...")
		try {
			let lecture: ILecture = req.body

			lecture.status = "NOT_STARTED"
			lecture.file_id = ""
			lecture.transcription_id = ""
			lecture.abstract_id = ""

			let response: ILecture = await this.lectureRepository.create(lecture)

			res.status(201).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	getById = async (req: Request, res: Response) => {
		console.log("[Lecture] Get By Id...")
		try {
			let { id } = req.params

			let response: ILecture = await this.lectureRepository.findById(id)

			res.status(200).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	getByEventId = async (req: Request, res: Response) => {
		console.log("[Lecture] Get By Id...")
		try {
			let { event_id } = req.params

			let response: ILecture = await this.lectureRepository.findByEventId(event_id)

			res.status(200).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	setStatus = async (req: Request, res: Response) => {
		console.log("[Lecture] Set Status...")
		try {
			let { id, status } = req.body
			console.log(req.body)
			if (!id || !status) throw new Error("ID or Status not informed")

			let response: ILecture = await this.lectureRepository.updateStatus(id, status)

			res.status(200).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	setFileId = async (req: Request, res: Response) => {}

	setTranscriptionId = async (req: Request, res: Response) => {}

	setAbstractId = async (req: Request, res: Response) => {}
}
