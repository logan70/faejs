import { HttpError } from './HttpError'

/**
 * Exception for 404 HTTP error.
 */
export class NotFoundError extends HttpError {
  name: string = 'NotFoundError'

  constructor(message?: string) {
    super(404)
    Object.setPrototypeOf(this, NotFoundError.prototype)

    if (message) {
      this.message = message
    }
  }
}
