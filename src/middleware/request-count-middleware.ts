import { Request, Response, NextFunction } from 'express'

const bannedIPs: Array<string> = ['']
let requestCount = 0
export const requestCountMiddleware = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   requestCount++
   console.log(`⚡️[request-count-middleware]: ${requestCount}`)
   res.set('count', requestCount.toString())
   next()
}
