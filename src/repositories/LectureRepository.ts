import ILecture from "../models/interfaces/ILecture"
import LectureModel from "../models/LectureModel"

export default class LectureRepository {
	public async create(user: ILecture): Promise<ILecture> {
		const data = new LectureModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<ILecture> {
		return await LectureModel.findById(id).catch(err => {
			throw err
		})
	}

	public async findByEventId(id: string): Promise<ILecture> {
		return await LectureModel.find({ event_id: id }).catch(err => {
			throw err
		})
	}
}
