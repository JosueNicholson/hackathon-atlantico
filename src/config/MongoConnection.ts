import mongoose from "mongoose"

export default class MongoConnection {
	private user: string
	private password: string
	private host: string
	private database: string

	constructor(user: string, password: string, host: string, database: string) {
		this.user = user
		this.password = password
		this.host = host
		this.database = database
	}

	public async connect(): Promise<void> {
		console.log("[MONGO] Connecting to MongoDB...")
		await mongoose
			.connect(
				`mongodb://${this.user}:${this.password}@${this.host}/${this.database}`,
				{ useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
			)
			.then(() => console.log("[MONGO] Connected to MongoDB"))
			.catch(err => console.error(err))
	}
}
