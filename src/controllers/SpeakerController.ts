import { Request, Response } from "express"

import SpeakerRepository from "../repositories/SpeakerRepository"
import ISpeaker from "../models/interfaces/ISpeaker"

export default class SpeakerController {
	private speakerRepository: SpeakerRepository

	constructor() {
		this.speakerRepository = new SpeakerRepository()
	}

	create = async (req: Request, res: Response) => {
		console.log("[Speaker] Create Speaker...")
		try {
			let speaker: ISpeaker = req.body

			let response: ISpeaker = await this.speakerRepository.create(speaker)

			res.status(201).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
  }
}
