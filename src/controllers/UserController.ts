import { Request, Response } from "express"
import bcryptjs from "bcryptjs"

import UserRepository from "../repositories/UserRepository"
import IUser from "../models/interfaces/IUser"

export default class AuthController {
	private userRepository: UserRepository

	constructor() {
		this.userRepository = new UserRepository()
	}

	signUp = async (req: Request, res: Response) => {
		console.log("[Auth] Create User...")
		try {
			let user: IUser = req.body

			// Encrypt the user password
			let userPassword = `${process.env.ENCRYPT_TEXT}-${user.password}`
			let salt = bcryptjs.genSaltSync(parseInt(`${process.env.SALT_ROUNDS}`))
			let hash = bcryptjs.hashSync(userPassword, salt)
			user["password"] = hash

			let response: IUser = await this.userRepository.create(user)

			let data = {
				_id: response["_id"],
				email: response["email"]
			}

			res.status(201).send({ message: "User successfully saved!", data: data })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}

	login = async (req: Request, res: Response) => {
		console.log("[Auth] Login User...")
		try {
			let { email, password } = req.body

			let user: IUser = await this.userRepository.findByEmail(email)

			if (!user) throw { message: "User not found!" }

			// Check if encrypted password match
			let informedPassword = `${process.env.ENCRYPT_TEXT}-${password}`
			if (!bcryptjs.compareSync(informedPassword, user.password.toString()))
				throw { message: "[Unauthorized] - Password don't match." }

			let data = {
				_id: user["_id"],
				email: user["email"]
			}

			res.status(200).send({ message: "User successfully logged!", data: data })
		} catch (e) {
			res.status(500).send({ message: e.message })
		}
	}
}
