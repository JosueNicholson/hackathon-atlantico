import * as mongoose from "mongoose"
import IFile from "./interfaces/IFile"

const Schema = new mongoose.Schema({
	_id: {
		type: String
	},
	lecture_id: {
		type: mongoose.Schema.Types.String,
		ref: "Lecture",
		unique: true,
		required: [true, "The field 'lecture_id' is required!"]
	},
	url: {
		type: String,
		required: [true, "The field 'url' is required!"]
	},
	status: {
		type: String,
		enum: ["AVAILABLE", "UNAVAILABLE"]
	},
	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<IFile & mongoose.Document>("Files", Schema)
