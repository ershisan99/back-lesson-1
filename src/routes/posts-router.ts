import {
   bloggerIdValidator,
   contentValidator,
   postValidationMiddleware,
   shortDescriptionValidator,
   titleValidator,
} from '../validators/posts-validators'
import { Router } from 'express'
import { Request, Response } from 'express'
import { bloggers } from './bloggers-router'

export const postsRouter = Router({})

interface Post {
   id: number
   title: string
   shortDescription: string
   content: string
   bloggerId: number
   bloggerName: string
}
const posts: Array<Post> = [
   {
      id: 1,
      title: 'new title',
      shortDescription: 'some description',
      content: 'some content',
      bloggerId: 1,
      bloggerName: 'it-kamasutra',
   },
   {
      id: 2,
      title: 'second title',
      shortDescription: 'second description',
      content: 'second content',
      bloggerId: 2,
      bloggerName: 'it-incubator',
   },
]
postsRouter.get('/', (req: Request, res: Response) => {
   try {
      res.send(posts)
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})
postsRouter.get('/:id', (req: Request, res: Response) => {
   try {
      const post = posts.find((post) => post.id === parseInt(req.params.id))
      if (!post) {
         res.sendStatus(404)
      }
      res.send(post)
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})

postsRouter.post(
   '/',
   titleValidator,
   shortDescriptionValidator,
   contentValidator,
   bloggerIdValidator,
   postValidationMiddleware,
   (req: Request, res: Response) => {
      try {
         const blogger = bloggers.find(
            (blogger) => blogger.id === parseInt(req.body.bloggerId)
         )
         if (!blogger) {
            res.sendStatus(404)
         } else {
            const newPost: Post = {
               id: new Date().getTime(),
               title: req.body.title,
               shortDescription: req.body.shortDescription,
               bloggerId: req.body.bloggerId,
               content: req.body.content,
               bloggerName: blogger.name,
            }
            posts.push(newPost)
            res.status(201).json(newPost)
         }
      } catch (err) {
         res.sendStatus(500).json(err)
      }
   }
)

postsRouter.put(
   '/:bloggerId',
   titleValidator,
   shortDescriptionValidator,
   contentValidator,
   bloggerIdValidator,
   postValidationMiddleware,
   (req: Request, res: Response) => {
      try {
         const post = posts.find(
            (post) => post.id === parseInt(req.params.bloggerId)
         )
         const blogger = bloggers.find(
            (blogger) => blogger.id === parseInt(req.body.bloggerId)
         )
         if (!post || !blogger) {
            res.send(404)
         } else {
            post.title = req.body.title
            post.shortDescription = req.body.shortDescription
            post.content = req.body.content
            post.bloggerId = req.body.bloggerId
            post.bloggerName = blogger.name
            res.sendStatus(204)
         }
      } catch (err) {
         res.sendStatus(500).json(err)
      }
   }
)
postsRouter.delete('/:id', (req: Request, res: Response) => {
   try {
      const post = posts.find((post) => post.id === parseInt(req.params.id))
      if (!post) {
         res.sendStatus(404)
      } else {
         posts.splice(posts.indexOf(post), 1)
         res.sendStatus(204)
      }
   } catch (err) {
      res.sendStatus(500).json(err)
   }
})