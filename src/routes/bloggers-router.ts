import {
   nameValidationMiddleware,
   nameValidator,
   youtubeUrlValidator,
} from './bloggers-validators'
import { Router } from 'express'
import { Request, Response } from 'express'

export const bloggersRouter = Router({})

interface Blogger {
   id: number
   name: string
   youtubeUrl: string
}
const bloggers: Array<Blogger> = [
   { id: 1, name: 'it-kamasutra', youtubeUrl: 'youtube.com/it-kamasutra' },
   { id: 2, name: 'it-incubator', youtubeUrl: 'youtube.com/it-incubator' },
]
bloggersRouter.get('/', (req: Request, res: Response) => {
   try {
      res.send(bloggers)
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})
bloggersRouter.get('/:id', (req: Request, res: Response) => {
   try {
      const blogger = bloggers.find(
         (blogger) => blogger.id === parseInt(req.params.id)
      )
      if (!blogger) {
         res.sendStatus(404)
      }
      res.send(blogger)
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})

bloggersRouter.post(
   '/',
   nameValidator,
   youtubeUrlValidator,
   nameValidationMiddleware,
   (req: Request, res: Response) => {
      try {
         const newBlogger: Blogger = {
            id: new Date().getTime(),
            name: req.body.name,
            youtubeUrl: req.body.youtubeUrl,
         }
         res.status(201).json(newBlogger)
      } catch (err) {
         res.sendStatus(500).json(err)
      }
   }
)

bloggersRouter.put(
   '/:bloggerId',
   nameValidator,
   youtubeUrlValidator,
   nameValidationMiddleware,
   (req: Request, res: Response) => {
      try {
         const blogger = bloggers.find(
            (blogger) => blogger.id === parseInt(req.params.bloggerId)
         )
         if (!blogger) {
            res.send(404)
         } else {
            blogger.name = req.body.name
            blogger.youtubeUrl = req.body.youtubeUrl
         }
      } catch (err) {
         res.sendStatus(500).json(err)
      }
   }
)
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
   try {
      const blogger = bloggers.find(
         (blogger) => blogger.id === parseInt(req.params.id)
      )
      if (!blogger) {
         res.sendStatus(404)
      } else {
         bloggers.splice(bloggers.indexOf(blogger), 1)
      }
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})
