import ISpeaker from "../models/interfaces/ISpeaker"
import SpeakerModel from "../models/SpeakerModel"

export default class SpeakerRepository {
	public async create(user: ISpeaker): Promise<ISpeaker> {
		const data = new SpeakerModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<ISpeaker> {
		return await SpeakerModel.findById(id).catch(err => {
			throw err
		})
	}

	public async findAll(): Promise<ISpeaker[]> {
		return await SpeakerModel.find().catch(err => {
			throw err
		})
	}
}
