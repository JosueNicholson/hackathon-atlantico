import IUser from "../models/interfaces/IUser"
import UserModel from "../models/UserModel"

export default class UserRepository {
	public async create(user: IUser): Promise<IUser> {
		const data = new UserModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<IUser> {
		return await UserModel.findById(id)
			.select("-password")
			.catch(err => {
				throw err
			})
	}

	public async findByEmail(email: string): Promise<IUser> {
		return await UserModel.findOne({ email: email }).catch(err => {
			throw err
		})
	}
}
