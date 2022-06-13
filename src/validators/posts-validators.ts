import { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
export const titleValidator = body('title')
   .trim()
   .notEmpty()
   .withMessage('Title is required')
   .isLength({ min: 0, max: 30 })
   .withMessage('Title must be less than 30 characters')
export const shortDescriptionValidator = body('shortDescription')
   .trim()
   .notEmpty()
   .withMessage('Short description is required')
   .isLength({ min: 0, max: 100 })
   .withMessage('Short description must be less than 100 characters')

export const contentValidator = body('content')
   .trim()
   .notEmpty()
   .withMessage('Short description is required')
   .isLength({ min: 0, max: 1000 })
   .withMessage('Short description must be less than 1000 characters')

export const bloggerIdValidator = body('bloggerId')
   .isInt()
   .withMessage('Blogger ID must be an integer')

export const postValidationMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      const newErrorsMessages = errors
         .array()
         .map((error) => ({ message: error.msg, field: error.param }))
      return res.status(400).json({ errorsMessages: newErrorsMessages })
   } else next()
}
