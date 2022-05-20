import * as stream from 'stream'
import { ResultType } from '../const/ResultType'
import { HttpStatus } from '../const/HttpStatus'
import { SendFileOptions } from './SendFileOptions'

export interface ResultType2Data {
  [ResultType.json]: {
    data: Record<string, any>
  }
  [ResultType.jsonp]: {
    data: string
    options: {
      callbackName?: string
    }
  }
  [ResultType.stream]: {
    data: stream.Readable
    options: {
      fileName?: string
    }
  }
  [ResultType.download]: {
    data: string
    options: SendFileOptions
  }
  [ResultType.redirect]: {
    data: string
    options: {
      /** Default to 302 */
      statusCode?: HttpStatus
    }
  }
  [ResultType.render]: {
    /** Template path to render */
    data: string
    options: {
      /**
       * Where your views are located. Must be an absolute path.
       * Default to `process.cwd() + '/views'`
       */
      root?: string
      /**
       * An object whose properties define local variables for the view.
       */
      locals?: Record<string, string>
    }
  }
}

export interface IBaseResult {
  /**
   * Http status code.
   */
  statusCode?: HttpStatus

  /**
   * Response headers.
   */
  headers?: Record<string, string>
}

export type TResult = {
  [K in ResultType]: IBaseResult & {
    type?: K
    data?: ResultType2Data[K]['data']
    options?: ResultType2Data[K] extends { options?: any }
      ? ResultType2Data[K]['options']
      : never
  }
}[ResultType]
