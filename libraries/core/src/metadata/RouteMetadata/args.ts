import { RequestMethod } from '../../const/RequestMethod'
import { RouteOptions } from '../../interfaces/RouteOptions'

export interface RouteMetadataArgs {
  /**
   * Route to be registered.
   */
  route?: string | RegExp

  /**
   * Class on which's method this route is attached.
   */
  target: Function

  /**
   * Object's method that will be executed on this route.
   */
  methodName: string

  /**
   * Request method
   */
  requestMethod: RequestMethod

  /**
   * Route-specific options.
   */
  options?: RouteOptions
}
