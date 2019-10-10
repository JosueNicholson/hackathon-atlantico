import IFile from "../models/interfaces/IFile"
import FileModel from "../models/FileModel"

export default class FileRepository {
	public async create(user: IFile): Promise<IFile> {
		const data = new FileModel(user)
		return await data.save().catch(err => {
			throw err
		})
	}

	public async findById(id: string): Promise<IFile> {
		return await FileModel.findById(id).catch(err => {
			throw err
		})
	}
}
