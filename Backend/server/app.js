import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN, // get it from .env variables
    credentials:true
}))

// app.use(cors())


app.use(express.json());
// app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.router.js"
import habitsRouter from "./routes/habits.router.js"
// import habitHistoryRouter from "./routes/habitHistory.router.js"
import { userRegister } from "./controllers/user.controller.js"

app.use("/api/users",userRouter)
app.use("/users/habits", habitsRouter);
// app.use("/habitHistory",habitHistoryRouter)

export {app}