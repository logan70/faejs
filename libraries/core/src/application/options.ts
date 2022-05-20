import { Middleware } from '../interfaces/Middleware'
import { ContainerGetter, ContainerType } from '../utils/container'
import { ValueOrPromise } from '../interfaces/utils'
import { defaultType, ResultType } from '../const/ResultType'

export type Context<T = Record<string, any>> = T

export type ContextFunction<
  FunctionParams = any,
  ProducedContext = Record<string, any>
> = (context: FunctionParams) => ValueOrPromise<Context<ProducedContext>>

export interface FaeApplicationOptions<ContextFunctionParams = any> {
  /**
   * Global route prefix, for example '/api'.
   */
  routePrefix?: string
  context?: Context | ContextFunction<ContextFunctionParams>

  /**
   * List of controllers to register in the framework or directories from where to import all your controllers.
   */
  controllers?: Function[]

  /**
   * List of middlewares to register in the framework or directories from where to import all your middlewares.
   */
  middlewares?: Middleware<any>[]

  nodeEnv?: string

  /**
   * IOC container
   */
  container?: ContainerType | ContainerGetter<any>

  /**
   * Global result type. Default to json
   */
  type?: ResultType

  /**
   * Indicates if default error handler should be used or not.
   */
  isDefaultErrorHandlingEnabled?: boolean

  /**
   * Map of error overrides.
   */
  errorOverridingMap?: { [key: string]: any }
}

export default FaeApplicationOptions

export function buildServerOptions(
  options: FaeApplicationOptions
): FaeApplicationOptions {
  return {
    type: defaultType,
    ...options,
    nodeEnv: options.nodeEnv ?? process.env.NODE_ENV,
  }
}
