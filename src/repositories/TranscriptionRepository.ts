import ITranscription from "../models/interfaces/ITranscription"
import TranscriptionModel from "../models/TranscriptionModel"

export default class TranscriptionRepository {
	public async create(user: ITranscription): Promise<ITranscription> {
		const data = new TranscriptionModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<ITranscription> {
		return await TranscriptionModel.findById(id).catch(err => {
			throw err
		})
	}
}
