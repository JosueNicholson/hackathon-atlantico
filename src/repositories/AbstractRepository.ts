import IAbstract from "../models/interfaces/IAbstract"
import AbstractModel from "../models/AbstractModel"

export default class AbstractRepository {
	public async create(user: IAbstract): Promise<IAbstract> {
		const data = new AbstractModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<IAbstract> {
		return await AbstractModel.findById(id).catch(err => {
			throw err
		})
	}
}
