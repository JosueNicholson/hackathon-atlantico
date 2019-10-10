import * as mongoose from "mongoose"
import IUser from "./interfaces/IUser"
import { validateEmail } from "../utils/validateEmail"

const Schema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "The field 'email' is required!"],
		unique: true,
		lowercase: true,
		validate: [validateEmail, "Please fill a valid 'email' address!"]
	},
	name: {
		type: String,
		trim: true,
		required: [true, "The field 'name' is required!"]
	},
	password: {
		type: String,
		required: [true, "The field 'password' is required!"]
	},
	createdAt: { type: Date, default: Date.now }
})

Schema.index({ geo_loc: "2dsphere" })
export default mongoose.model<IUser & mongoose.Document>("Users", Schema)
