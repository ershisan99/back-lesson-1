import { Request, Response, NextFunction } from 'express'

const bannedIPs: Array<string> = ['']

export const authMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   console.log({ haaaaa: req.ip })

   if (bannedIPs.includes(req.ip)) res.sendStatus(403)
   return next()
}
