import Transcribe from "aws-sdk/clients/transcribeservice"
import ITranscribePayload from "./ITranscribePayload"

export default class TranscribeService {
	private transcribe: Transcribe

	constructor() {
		this.transcribe = new Transcribe({ apiVersion: "2017-10-26", region: "us-east-2" })
	}

	public async startTranscriptionJob(payload: ITranscribePayload): Promise<boolean> {
		let response = false
		await this.transcribe
			.startTranscriptionJob(payload)
			.promise()
			.then(data => {
				console.log(data)
				response = true
			})
			.catch(err => {
				console.log(err.message)
			})
		return response
	}
}
