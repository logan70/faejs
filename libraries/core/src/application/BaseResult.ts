import { HttpStatus } from '../const/HttpStatus'
import { ResultType } from '../const/ResultType'
import { TResult } from '../interfaces/Result'

/**
 * BaseResult class
 */
export class BaseResult implements Omit<TResult, 'unknown_key'> {
  /**
   * Http status code.
   */
  statusCode?: HttpStatus

  /**
   * Response result type.
   */
  type?: ResultType

  /**
   * Response headers.
   */
  headers?: Record<string, string>

  /**
   * Response data.
   */
  data?: TResult['data']

  /**
   * Response options.
   */
  options?: TResult['options']

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: TResult) {
    this.statusCode = args.statusCode
    this.type = args.type
    this.headers = args.headers
    this.data = args.data
    this.options = args.options
  }
}
