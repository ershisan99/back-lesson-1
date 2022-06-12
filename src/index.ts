import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
let videos = [
   { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
   { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
   { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
   { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
   { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
]
const maxLength = 40
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.get('/videos', (req: Request, res: Response) => {
   res.send(videos)
})
app.get('/videos/:videoId', (req: Request, res: Response) => {
   const video = videos.find(
      (video) => video.id === parseInt(req.params.videoId)
   )
   if (!video) {
      res.sendStatus(404)
   }
   res.send(video)
})
app.post('/videos', (req: Request, res: Response) => {
   try {
      if (!req.body.title) {
         res.status(400).json({
            errorsMessages: [
               {
                  message: 'Missing data',
                  field: 'title',
               },
            ],
         })
      }
      if (req.body.title.length > maxLength) {
         res.status(400).json({
            errorsMessages: [
               {
                  message: `title length must be less than ${maxLength}`,
                  field: 'title',
               },
            ],
         })
      }
      const newVideo = {
         id: new Date().getTime(),
         title: req.body.title,
         author: 'it-incubator.eu',
      }
      videos.push(newVideo)
      res.status(201).send(newVideo)
   } catch (err) {
      res.sendStatus(400).send({
         errorsMessages: {
            message: 'Missing data',
            field: 'title',
            err: err,
         },
      })
   }
})
app.put('/videos/:videoId', (req: Request, res: Response) => {
   if (!req.body.title) {
      res.status(400).json({
         errorsMessages: [
            {
               message: 'Missing data',
               field: 'title',
            },
         ],
      })
   }
   if (req.body.title.length > maxLength) {
      res.status(400).json({
         errorsMessages: [
            {
               message: `title length must be less than ${maxLength}`,
               field: 'title',
            },
         ],
      })
   }
   const video = videos.find(
      (video) => video.id === parseInt(req.params.videoId)
   )

   if (!video) {
      res.sendStatus(404)
   } else video.title = req.body.title
   res.sendStatus(204)
})
app.delete('/videos/:videoId', (req: Request, res: Response) => {
   const video = videos.findIndex(
      (video) => video.id === parseInt(req.params.videoId)
   )
   if (video === -1) res.sendStatus(404)
   videos.splice(video, 1)
   res.sendStatus(204)
})
app.listen(port, () => {
   console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
