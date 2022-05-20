import { ParamMetadata } from '../metadata/ParamMetadata/class'
import { RouteMetadata } from '../metadata/RouteMetadata'
import { FaeRequestContext } from '../application/context'
import { TResult } from '../interfaces/Result'
import { HttpError } from '../http-error'
import { FaeApplicationOptions } from '../application'

export abstract class BaseDriver<App = any> {
  /**
   * Reference to the underlying framework app object.
   */
  app: App

  /**
   * Indicates if default error handler should be used or not.
   */
  isDefaultErrorHandlingEnabled: boolean = true

  /**
   * Map of error overrides.
   */
  errorOverridingMap?: { [key: string]: any }

  /**
   * Indicates if routing-controllers should operate in development mode.
   */
  developmentMode?: boolean

  constructor(app: App) {
    this.app = app
  }

  protected processJsonError(error: any) {
    if (!this.isDefaultErrorHandlingEnabled) {
      return error
    }

    if (typeof error.toJSON === 'function') {
      return error.toJSON()
    }

    let processedError: any = {}
    if (error instanceof Error) {
      const name =
        error.name && error.name !== 'Error'
          ? error.name
          : error.constructor.name
      processedError.name = name

      if (error.message) {
        processedError.message = error.message
      }
      if (error.stack && this.developmentMode) {
        processedError.stack = error.stack
      }

      Object.keys(error)
        .filter(
          key =>
            key !== 'stack' &&
            key !== 'name' &&
            key !== 'message' &&
            (!(error instanceof HttpError) || key !== 'httpCode')
        )
        .forEach(key => (processedError[key] = (error as any)[key]))

      if (this.errorOverridingMap) {
        Object.keys(this.errorOverridingMap)
          .filter(key => name === key)
          .forEach(
            key =>
              (processedError = this.merge(
                processedError,
                this.errorOverridingMap?.[key]
              ))
          )
      }

      return Object.keys(processedError).length > 0 ? processedError : undefined
    }

    return error
  }

  protected processTextError(error: any) {
    if (!this.isDefaultErrorHandlingEnabled) {
      return error
    }

    if (error instanceof Error) {
      if (this.developmentMode && error.stack) {
        return error.stack
      } else if (error.message) {
        return error.message
      }
    }
    return error
  }

  protected merge(obj1: any, obj2: any): any {
    const result: any = {}
    for (const i in obj1) {
      if (i in obj2 && typeof obj1[i] === 'object' && i !== null) {
        result[i] = this.merge(obj1[i], obj2[i])
      } else {
        result[i] = obj1[i]
      }
    }
    for (const i in obj2) {
      result[i] = obj2[i]
    }
    return result
  }

  /**
   * hook before routes and middlewares registration
   */
  abstract beforeCreate(options: FaeApplicationOptions): void | Promise<void>

  /**
   * hook after routes and middlewares registration
   */
  abstract created(): void | Promise<void>

  // /**
  //  * Registers given middleware.
  //  */
  //  abstract registerMiddleware(middleware: MiddlewareMetadata): void;

  /**
   * Registers route in the driver.
   */
  abstract registerRoute(
    route: RouteMetadata,
    executeCallback: (reqContext: FaeRequestContext) => any
  ): void

  /**
   * 具体框架集成时实现各类型参数的解析
   * @param reqContext fae请求上下文
   * @param param 要解析的参数元信息
   */
  abstract getParam(reqContext: FaeRequestContext, param: ParamMetadata): any

  /**
   * How to handle error during executing controller route.
   */
  abstract handleError(
    error: any,
    routeMetadata: RouteMetadata,
    reqContext: FaeRequestContext
  ): void

  /**
   * How to handle success result of executing controller route.
   */
  abstract handleSuccess(
    result: TResult,
    routeMetadata: RouteMetadata,
    reqContext: FaeRequestContext
  ): void
}
