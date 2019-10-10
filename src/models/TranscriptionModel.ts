import * as mongoose from "mongoose"
import ITranscription from "./interfaces/ITranscription"

const Schema = new mongoose.Schema({
	lecture_id: {
		type: mongoose.Schema.Types.String,
		ref: "Lecture"
	},
	status: {
		type: String
	},
	title: {
		type: String
	},
	body: {
		type: String
	},
	createdAt: { type: Date, default: Date.now }
})

export default mongoose.model<ITranscription & mongoose.Document>("Transcription", Schema)
