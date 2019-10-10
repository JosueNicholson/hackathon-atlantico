import S3, { PutObjectRequest } from "aws-sdk/clients/s3"
import IAudioPayload from "./IAudioPayload"

export default class StorageService {
	private storage: S3
	private mainBucket: string

	constructor() {
		this.storage = new S3({ apiVersion: "2006-03-01" })
		this.mainBucket = "hackathon-aws-qxd"
	}

	public async uploadAudio(imgPld: IAudioPayload): Promise<string> {
		let buffer: Buffer = Buffer.from(
			imgPld.baseAudio.replace("data:audio/mp3;base64,", ""),
			"base64"
		)

		let putObject: PutObjectRequest = {
			Bucket: this.mainBucket,
			Key: `audios/${imgPld.lecture_id}`,
			Body: buffer,
			ContentEncoding: "base64",
			ContentType: "audio/mp3"
		}

		return await this.uploadFile(putObject).catch(err => {
			throw new Error(err.message)
		})
	}

	private async uploadFile(putObject: PutObjectRequest): Promise<string> {
		let location: string = ""

		await this.storage
			.upload(putObject)
			.promise()
			.then(data => (location = data.Location))
			.catch(err => {
				throw new Error(err.message)
			})

		return location
	}

	// public async uploadAudioStream(imgPld: IAudioPayload): Promise<string> {
	// 	let buffer: Buffer = Buffer.from(
	// 		imgPld.base64Audio.replace(/^data:image\/\w+;base64,/, ""),
	// 		"base64"
	// 	)

	// 	let putObject: PutObjectRequest = {
	// 		Bucket: this.mainBucket,
	// 		Key: `lectures/${imgPld.lecture_id}/${imgPld.file_id}`,
	// 		Body: buffer,
	// 		ContentEncoding: "base64",
	// 		ContentType: "image/jpeg"
	// 	}

	// 	let location: string = ""

	// 	await this.storage
	// 		.upl(putObject)
	// 		.promise()
	// 		.then(data => (location = data.Location))
	// 		.catch(err => {
	// 			throw new Error(err.message)
	// 		})

	// 	return location
	// }
}
