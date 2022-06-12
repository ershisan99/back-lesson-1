import { videosRouter } from './routes/videos-router'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
const port = process.env.PORT
const app: Express = express()
app.use(cors())
app.use(express.json())
app.use('/videos', videosRouter)

app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
