import { RouteOptions } from '../../interfaces/RouteOptions'
import { BuildContext } from '../../application/BuildContext'
import { FaeRequestContext } from '../../application/context'
import FaeApplicationOptions from '../../application/options'
import { ControllerMetadata } from '../ControllerMetadata'
import { ParamMetadata } from '../ParamMetadata/class'
import { RequestMethod } from '../../const/RequestMethod'
import { isRegExp } from '../../utils/typeof'
import { fixRouteMultiSlash } from '../../utils/route'
import { getAroundFnParams } from '../../utils/around'
import { ResultMetadata } from '../ResultMetadata'
import { RouteMetadataArgs } from './args'

/**
 * Route metadata.
 */
export class RouteMetadata {
  // -------------------------------------------------------------------------
  // Static Methods
  // -------------------------------------------------------------------------

  /**
   * Appends base route to a given regexp route.
   */
  static appendRoutePrefix(routePrefix: string, route: RegExp | string) {
    if (!routePrefix || routePrefix === '') {
      return route
    }

    const prefix = `${
      routePrefix.length > 0 && !routePrefix.includes('/') ? '/' : ''
    }${routePrefix}`
    if (typeof route === 'string') {
      return fixRouteMultiSlash(`/${prefix}/${route}`)
    }

    const fullPath = `^${prefix}${route.toString().substr(1)}?$`

    return new RegExp(fullPath, route.flags)
  }

  globalOptions: FaeApplicationOptions
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Route's controller.
   */
  controllerMetadata: ControllerMetadata

  /**
   * Indicates object which is used by this route.
   */
  target: Function

  /**
   * Request method
   */
  requestMethod: RequestMethod

  /**
   * Object's method that will be executed on this route.
   */
  methodName: string

  /**
   * Base route for all routes registered in this controller.
   */
  route?: string | RegExp

  /**
   * Options that apply to all controller routes.
   */
  options?: RouteOptions

  /**
   * Route's parameters.
   */
  params!: ParamMetadata[]

  /**
   * Route's base response
   */
  result!: ResultMetadata

  /**
   * Full route to this route (includes global prefix and controller base route).
   */
  fullRoute!: string | RegExp

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(
    controllerMetadata: ControllerMetadata,
    args: RouteMetadataArgs,
    globalOptions: FaeApplicationOptions
  ) {
    this.controllerMetadata = controllerMetadata
    this.route = args.route
    this.target = args.target
    this.methodName = args.methodName
    this.options = args.options
    this.requestMethod = args.requestMethod
    this.globalOptions = globalOptions
    this.fullRoute = this.buildFullRoute()
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Builds everything route metadata needs.
   * Route metadata can be used only after its build.
   */

  /**
   * Calls route method.
   * Route method is an route defined in a user controller.
   */
  async callMethod(params: any[], reqContext: FaeRequestContext) {
    const controllerInstance = await BuildContext.getFromContainer<any>(
      this.target,
      reqContext
    )

    const paramsToApply = getAroundFnParams(
      controllerInstance[this.methodName],
      reqContext,
      params
    )

    return Reflect.apply(
      controllerInstance[this.methodName],
      controllerInstance,
      paramsToApply
    )
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  /**
   * Builds full route.
   */
  private buildFullRoute(): string | RegExp {
    if (isRegExp(this.route)) {
      if (this.controllerMetadata.fullRoutePrefix) {
        return RouteMetadata.appendRoutePrefix(
          this.controllerMetadata.fullRoutePrefix,
          this.route
        )
      }
      return this.route
    }

    let fullRoute = ''
    if (this.controllerMetadata.fullRoutePrefix) {
      fullRoute += `/${this.controllerMetadata.fullRoutePrefix}`
    }
    if (this.route && typeof this.route === 'string') {
      fullRoute += `/${this.route}`
    }
    return fixRouteMultiSlash(fullRoute)
  }
}
