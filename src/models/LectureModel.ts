import * as mongoose from "mongoose"
import ILecture from "./interfaces/ILecture"

const Schema = new mongoose.Schema({
	event_id: {
		type: mongoose.Schema.Types.String,
		ref: "Events"
	},
	speaker_id: {
		type: mongoose.Schema.Types.String,
		ref: "Speakers",
		required: [true, "The field 'speaker_id' is required"]
	},
	file_id: {
		type: mongoose.Schema.Types.String,
		ref: "Files"
	},
	transcription_id: {
		type: mongoose.Schema.Types.String,
		ref: "Transcriptions"
	},
	abstract_id: {
		type: mongoose.Schema.Types.String,
		ref: "Abstracts"
	},
	date: {
		type: Date,
		required: [true, "The field 'date' is required!"]
	},
	title: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ["NOT_STARTED", "STARTED", "CANCELED", "FINISHED"]
	},
	description: {
		type: String
		// required: [true, "The field 'description' is required!"]
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model<ILecture & mongoose.Document>("Lectures", Schema)
