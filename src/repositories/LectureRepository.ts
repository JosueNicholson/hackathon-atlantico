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
		return await LectureModel.findById(id)
			.populate("file_id")
			.populate("transcript_id")
			.catch(err => {
				throw err
			})
	}

	public async findByEventId(id: string): Promise<ILecture> {
		return await LectureModel.find({ event_id: id })
			.populate("file_id")
			.populate("transcript_id")
			.catch(err => {
				throw err
			})
	}

	public async updateStatus(id: string, status: string): Promise<ILecture> {
		return await LectureModel.updateOne({ _id: id }, { status: status }).catch(err => {
			throw err
		})
	}

	public async updateFileId(id: string, file_id: string): Promise<ILecture> {
		return await LectureModel.updateOne({ _id: id }, { file_id: file_id }).catch(err => {
			throw err
		})
	}

	public async updateTranscriptionId(id: string, transcription_id: string): Promise<ILecture> {
		return await LectureModel.updateOne({ _id: id }, { transcription_id: transcription_id }).catch(
			err => {
				throw err
			}
		)
	}

	public async updateAbstractId(id: string, abstract_id: string): Promise<ILecture> {
		return await LectureModel.updateOne({ _id: id }, { abstract_id: abstract_id }).catch(err => {
			throw err
		})
	}
}
