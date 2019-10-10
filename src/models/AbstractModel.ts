import * as mongoose from "mongoose"
import IAbstract from "./interfaces/IAbstract"

const Schema = new mongoose.Schema({
	lecture_id: {
		type: mongoose.Schema.Types.String,
		ref: "Lecture"
	},
	status: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String
		// required: [true, "The field 'description' is required!"]
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model<IAbstract & mongoose.Document>("Abstracts", Schema)
