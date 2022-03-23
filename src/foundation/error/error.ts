import axios from 'axios'

/**
 * https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
 */

type ErrorCodeName =
  | 'OK'
  | 'CANCELLED'
  | 'UNKNOWN'
  | 'INVALID_ARGUMENT'
  | 'DEADLINE_EXCEEDED'
  | 'NOT_FOUND'
  | 'ALREADY_EXISTS'
  | 'PERMISSION_DENIED'
  | 'UNAUTHENTICATED'
  | 'RESOURCE_EXHAUSTED'
  | 'FAILED_PRECONDITION'
  | 'ABORTED'
  | 'OUT_OF_RANGE'
  | 'UNIMPLEMENTED'
  | 'INTERNAL'
  | 'UNAVAILABLE'
  | 'DATA_LOSS'
  | 'UNEXPECTED' // Oops, an unexpected error has occurred.

class RpcError extends Error {
  constructor(readonly code: ErrorCodeName, message?: string) {
    super(message)
    this.code = code
  }
}

const httpErrorHandler = (error: unknown) => {
  if (error instanceof RpcError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    let code: ErrorCodeName

    switch (error.response?.status) {
      case 500:
        code = 'UNKNOWN'
        break
      case 400:
        code = 'INVALID_ARGUMENT'
        break
      case 504:
        code = 'DEADLINE_EXCEEDED'
        break
      case 404:
        code = 'NOT_FOUND'
        break
      case 409:
        code = 'ALREADY_EXISTS'
        break
      case 403:
        code = 'PERMISSION_DENIED'
        break
      case 401:
        code = 'UNAUTHENTICATED'
        break
      case 429:
        code = 'RESOURCE_EXHAUSTED'
        break
      case 503:
        code = 'UNAVAILABLE'
        break
      default:
        code = 'UNEXPECTED'
        break
    }

    return new RpcError(code, error.message)
  }

  return new RpcError('UNEXPECTED', 'Oops, an unexpected error has occurred.')
}

export { RpcError, httpErrorHandler }
