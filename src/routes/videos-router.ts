import { Router } from 'express'
import { Request, Response } from 'express'

const maxLength = 40
let videos = [
   { id: 1, title: 'About JS - 01', author: 'it-incubator.eu' },
   { id: 2, title: 'About JS - 02', author: 'it-incubator.eu' },
   { id: 3, title: 'About JS - 03', author: 'it-incubator.eu' },
   { id: 4, title: 'About JS - 04', author: 'it-incubator.eu' },
   { id: 5, title: 'About JS - 05', author: 'it-incubator.eu' },
]
export const videosRouter = Router({})
videosRouter.get('/', (req: Request, res: Response) => {
   res.send(videos)
})
videosRouter.get('/videos/:videoId', (req: Request, res: Response) => {
   const video = videos.find(
      (video) => video.id === parseInt(req.params.videoId)
   )
   if (!video) {
      res.sendStatus(404)
   }
   res.send(video)
})
videosRouter.post('/', (req: Request, res: Response) => {
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
videosRouter.put('/:videoId', (req: Request, res: Response) => {
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
videosRouter.delete('/:videoId', (req: Request, res: Response) => {
   const video = videos.findIndex(
      (video) => video.id === parseInt(req.params.videoId)
   )
   if (video === -1) res.sendStatus(404)
   videos.splice(video, 1)
   res.sendStatus(204)
})
