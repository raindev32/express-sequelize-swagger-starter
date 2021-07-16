import {
   v4 as uuidv4
} from 'uuid'

const keyName = '1b671a64-40d5-491e-00b0-da01ff1f3341';

class ValidationError extends Error {
   constructor(message) {
      super(message)

      this.name = 'Validation Error'
      this.message = message
   }
}

const logException = (err) => {
   let errorId = uuidv4();
   // let errorId = uuidv5('https://www.w3.org/', uuidv5.URL)
   console.error(errorId, err)
   return errorId
}

const errorOnService = (err) => {
   console.log(err, 'error service')
   return false
}

function ApiResponse(res, vcode = 200, vdata = [], vmeta = {}) {
   return res.status(vcode).json({
      success: true,
      meta: vmeta,
      data: vdata
   })
}

export function apiError(res, vcode, vmessage, vdetails = '') {
   return res.status(vcode).json({
      success: false,
      message: vmessage,
      details: vdetails !== '' ? vdetails : vmessage
   })
}

function ApiError(vcode, vmessage, vdetails = '') {
   this.name = 'ApiError'
   this.code = vcode
   this.message = vmessage
   this.details = vdetails !== '' ? vdetails : vmessage
}


export {
   logException,
   errorOnService,
   ApiResponse,
   ApiError,
   ValidationError
}