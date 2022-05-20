import { HttpError } from './HttpError'

/**
 * Exception for 500 HTTP error.
 */
export class InternalServerError extends HttpError {
  name: string = 'InternalServerError'

  constructor(message: string) {
    super(500)
    Object.setPrototypeOf(this, InternalServerError.prototype)

    if (message) {
      this.message = message
    }
  }
}
