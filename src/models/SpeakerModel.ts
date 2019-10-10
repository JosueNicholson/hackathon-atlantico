import * as mongoose from "mongoose"
import ISpeaker from "./interfaces/ISpeaker"

const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "The field 'name' is required!"]
	},
	profession: {
		type: String,
		required: [true, "The field 'profession' is required!"]
	},
	additional_info: {
		type: String,
		required: [true, "The field 'additional_info' is required!"]
	},
	phone: {
		type: String
	},
	email: {
		type: String,
		required: [true, "The field 'email' is required!"]
	},
	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<ISpeaker & mongoose.Document>("Speakers", Schema)
