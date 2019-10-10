import IEvent from "../models/interfaces/IEvent"
import EventModel from "../models/EventModel"

export default class EventRepository {
	public async create(user: IEvent): Promise<IEvent> {
		const data = new EventModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<IEvent> {
		return await EventModel.findById(id)
			.catch(err => {
				throw err
			})
	}

	public async findByUserId(user_id: string): Promise<IEvent> {
		return await EventModel.find({ user: user_id })
			.catch(err => {
				throw err
			})
	}
}
