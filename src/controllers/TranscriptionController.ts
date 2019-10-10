import { Request, Response } from "express"
import TranscriptionRepository from "../repositories/TranscriptionRepository"
import ITranscription from "../models/interfaces/ITranscription"
import TranscribeService from "../services/Transcribe/TranscribeService"
import ITranscribePayload from "../services/Transcribe/ITranscribePayload"

export default class TranscriptionController {
	private transcriptionRepository: TranscriptionRepository
	private transcribeService: TranscribeService

	constructor() {
		this.transcriptionRepository = new TranscriptionRepository()
		this.transcribeService = new TranscribeService()
	}

	create = async (req: Request, res: Response) => {
		console.log("[Transcription] Create Transcription...")
		try {
			console.log(req.body)

			const { bucketUrl, key } = req.body
			let lecture_id = key.replace("audios/", "").replace(".mp3", "")

			let payload: ITranscribePayload = {
				LanguageCode: "pt-BR",
				Media: {
					MediaFileUri: `${bucketUrl}${key}`
				},
                MediaFormat: "mp3",
                OutputBucketName: `hackathon-aws-qxd2`,
				TranscriptionJobName: lecture_id
			}

			console.log(payload)
			let jobRes = await this.transcribeService.startTranscriptionJob(payload)

			if (jobRes) {
				let transcription: ITranscription = {
					body: "",
					title: "",
					lecture_id: lecture_id,
					status: "IN_PROGRESS"
				}

				let response: ITranscription = await this.transcriptionRepository.create(transcription)
				res.status(201).send({ message: "Success!", data: response })
			} else {
				res.status(500).send({ message: "Erro ao criar Transcription Job" })
			}
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}
}
