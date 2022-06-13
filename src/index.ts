import { postsRouter } from './routes/posts-router'
import { videosRouter } from './routes/videos-router'
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { bloggersRouter } from './routes/bloggers-router'
import { authMiddleware } from './middleware/auth-middleware'
import { requestCountMiddleware } from './middleware/request-count-middleware'

dotenv.config()
const port = process.env.PORT
const app: Express = express()
app.use(requestCountMiddleware)
app.use(cors())
app.use(authMiddleware)
app.use(express.json())
app.use('/videos', videosRouter)
app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)
app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
