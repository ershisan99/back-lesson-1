import { videosRepository } from './../repositories/videos-repository'
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
   try {
      res.send(videos)
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})
videosRouter.get('/videos/:videoId', (req: Request, res: Response) => {
   try {
      const video = videosRepository.getVideos()
      res.send(video)
   } catch (err) {
      res.status(404).json(err)
   }
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
      const newVideo = videosRepository.createVideo(req.body.title)
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
   try {
      const video = videosRepository.updateVideoById(
         parseInt(req.params.videoId),
         req.body.title
      )
      video && res.sendStatus(204)
   } catch (err) {
      res.sendStatus(404)
   }
})
videosRouter.delete('/:videoId', (req: Request, res: Response) => {
   try {
      const deletedVideo = videosRepository.deleteVideoById(
         parseInt(req.params.videoId)
      )
      res.sendStatus(204)
   } catch (err) {
      res.status(404)
   }
})
