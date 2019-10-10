import dotenv from "dotenv"
dotenv.config()

import ServerApplication from "../src/app"

let app: ServerApplication = new ServerApplication()

const port = parseInt(`${process.env.PORT}`) || 3000
app.initApplication(port)
