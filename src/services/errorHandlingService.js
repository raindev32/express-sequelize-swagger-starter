import uuid from 'uuid'

class ValidationError extends Error {
  constructor (message) {
    super(message)

    this.name = 'Validation Error'
    this.message = message
  }
}

const logException = (err) => {
  let errorId = uuid.v4()
  console.error(errorId, err)
  return errorId
}

const errorOnService = (err) => {
  console.log(err, 'error service')
  return false
}

function ApiResponse (res, vcode = 200, vdata = [], vmeta = {}) {
  res.status(vcode).json({
    success: true,
    meta: vmeta,
    data: vdata
  })
}

function ApiError (vcode, vmessage, vdetails = '') {
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
