import {
   logException
} from '../handling/errorHandling'

const customErrorHandler = (err, req, res, next) => {
   if (err.name === 'ApiError') {
      const errorId = logException(err.details)
      res.status(err.code).json({
         id: errorId,
         success: false,
         message: err.message,
         details: typeof err.details === 'object' ? err.details : err.details.toString().split('\n')[0]
      }).end()
   } else {
      next(err)
   }
}

export default customErrorHandler