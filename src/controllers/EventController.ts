import { Request, Response } from "express"

import EventRepository from "../repositories/EventRepository"
import IEvent from "../models/interfaces/IEvent"

export default class EventController {
	private eventRepository: EventRepository

	constructor() {
		this.eventRepository = new EventRepository()
	}

	create = async (req: Request, res: Response) => {
		console.log("[Event] Create Event...")
		try {
			let event: IEvent = req.body

			let response: IEvent = await this.eventRepository.create(event)

			res.status(201).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	getById = async (req: Request, res: Response) => {
		console.log("[Event] Find By Id...")
		try {
			let { id } = req.params

			let response: IEvent = await this.eventRepository.findById(id)

			res.status(200).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	getByUserId = async (req: Request, res: Response) => {
		console.log("[Event] Find By User...")
		try {
			let { user_id } = req.params

			let response: IEvent = await this.eventRepository.findByUserId(user_id)

			res.status(200).send({ message: "Success!", data: response })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	getAll = async (req: Request, res: Response) => {
		console.log("[Event] Find All...")
		try {
			let response: IEvent[] = await this.eventRepository.findAll()

			res.status(200).send(response)
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}
}
