import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'
export const nameValidator = body('name')
   .isString()
   .withMessage('Name must be a string')
   .isLength({ min: 0, max: 15 })
   .withMessage('Name must be less than 15 characters')
export const youtubeUrlValidator = body('youtubeUrl')
   .isString()
   .withMessage('Youtube URL must be a string')
   .isLength({ min: 0, max: 100 })
   .withMessage('Youtube URL must be less than 100 characters')
   .matches(
      /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/
   )
   .withMessage('Youtube URL must be a valid URL')

export const nameValidationMiddleware = (
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
