import req from "supertest"
import RootRoute from "../../routes/RootRoute"
import express = require("express")

test("[GET] /", async () => {
	let app = express()

	let route: RootRoute = new RootRoute("/")
	route.registerRoute(app)

	const res = await req(app).get("/")

	expect(JSON.stringify(res.body)).toBe(
		JSON.stringify({
			Title: "Folium Work Web Services",
			Version: "0.5.3",
			environment: `${process.env.NODE_ENV}`,
			documentation: "https://documenter.getpostman.com/view/2381170/SVfJWCSb"
		})
	)
})
