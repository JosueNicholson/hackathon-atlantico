import { Request, Response } from "express"
import axios from "axios"
import TranscriptionRepository from "../repositories/TranscriptionRepository"
import LectureRepository from "../repositories/LectureRepository"
import ITranscription from "../models/interfaces/ITranscription"
import TranscribeService from "../services/Transcribe/TranscribeService"
import ITranscribePayload from "../services/Transcribe/ITranscribePayload"

export default class TranscriptionController {
	private transcriptionRepository: TranscriptionRepository
	private lectureRepository: LectureRepository
	private transcribeService: TranscribeService

	constructor() {
		this.transcriptionRepository = new TranscriptionRepository()
		this.lectureRepository = new LectureRepository()
		this.transcribeService = new TranscribeService()
	}

	create = async (req: Request, res: Response) => {
		console.log("[Transcription] Create Transcription...")
		try {

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
				await this.lectureRepository.updateTranscriptionId(lecture_id, `${response._id}`)
				res.status(201).send({ message: "Success!" })
			} else {
				res.status(500).send({ message: "Erro ao criar Transcription Job" })
			}
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	updateTranscriptionBody = async (req: Request, res: Response) => {
		console.log("[Transcription] Update Transcription Body...")
		try {
			console.log(req.body)

			const { bucketUrl, key } = req.body
			let lecture_id = key.replace(".json", "")

			await axios
				.get(`${bucketUrl}${key}`)
				.then(resJson => {
					console.log(resJson.data.results.transcripts[0].transcript)
					this.transcriptionRepository.updateBody(
						lecture_id,
						resJson.data.results.transcripts[0].transcript,
						"AVAILABLE"
					)
					res.status(201).send({ message: "Success!" })
				})
				.catch(err => {
					this.transcriptionRepository.updateBody(lecture_id, "", "UNAVAILABLE")
					console.log(err.message)
					res.status(500).send({ message: err.message })
				})
		} catch (e) {
			console.log(e.message)
			res.status(500).send({ message: e.message })
		}
	}
}
