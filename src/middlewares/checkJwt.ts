import { Request, Response, NextFunction } from "express"
import * as jwt from "jsonwebtoken"

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
	let token = <string>req.headers["authorization"] || <string>req.headers["x-access-token"]

	if (!token) return res.status(401).send({ message: "Auth token is not supplied" })

	if (token.startsWith("Bearer ")) token = token.slice(7, token.length)

	let jwtPayload

	try {
		jwtPayload = <any>jwt.verify(token, `${process.env.JWT_SECRET}`)
		res.locals.jwtPayload = jwtPayload
	} catch (error) {
		res.status(401).send({ message: "Token is not valid" })
		return
	}

	const { _id, email, name, image_url, is_worker } = jwtPayload
	const data = { _id, email, name, image_url, is_worker }

	const newToken = jwt.sign(data, `${process.env.JWT_SECRET}`, { expiresIn: "6h" })
	res.setHeader("X-Access-Token", newToken)

	next()
}
