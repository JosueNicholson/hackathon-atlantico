import * as mongoose from "mongoose"
import IEvent from "./interfaces/IEvent"

const Schema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	location: {
		address: {
			type: String,
			trim: true,
			default: null
		},
		city: {
			type: String,
			trim: true,
			required: [true, "The field 'location.city' is required!"]
		},
		country: {
			type: String,
			trim: true
			// required: [true, "The field 'location.country' is required!"]
		},
		state: {
			type: String,
			trim: true
			// required: [true, "The field 'location.state' is required!"]
		}
	},
	name: {
		type: String,
		trim: true,
		required: [true, "The field 'name' is required!"]
	},
	description: {
		type: String,
		required: [true, "The field 'description' is required!"]
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model<IEvent & mongoose.Document>("Events", Schema)
