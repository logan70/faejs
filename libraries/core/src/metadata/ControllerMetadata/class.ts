import { ControllerOptions } from '../../interfaces/ControllerOptions'
import { BuildContext } from '../../application/BuildContext'
import { FaeRequestContext } from '../../application/context'
import { RouteMetadata } from '../RouteMetadata'
import { FaeApplicationOptions } from '../../application/options'
import { fixRouteMultiSlash } from '../../utils/route'
import { ControllerMetadataArgs } from '.'

export const CONTROLLER_ID_KEY = 'CONTROLLER_ID'

/**
 * Controller metadata.
 */
export class ControllerMetadata {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Indicates object which is used by this controller.
   */
  target: Function

  /**
   * Base route for all routes registered in this controller.
   */
  routePrefix?: string

  /**
   * Full route prefix for all routes registered in this controller.
   */
  fullRoutePrefix?: string

  /**
   * Controller routes
   */
  routeMetadatas!: RouteMetadata[]

  /**
   * Options that apply to all controller routes.
   */
  options?: ControllerOptions

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(
    args: ControllerMetadataArgs,
    private readonly globalOptions: FaeApplicationOptions
  ) {
    this.target = args.target
    this.routePrefix = args.routePrefix
    this.options = args.options
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  /**
   * Builds everything route metadata needs.
   * Route metadata can be used only after its build.
   */
  build() {
    this.fullRoutePrefix = this.buildFullRoutePrefix()
  }

  /**
   * Gets instance of the controller.
   * @param reqContext Details around the request
   */
  getInstance(reqContext: FaeRequestContext): any {
    return BuildContext.getFromContainer(this.target, reqContext)
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  /**
   * Builds full action route.
   */
  private buildFullRoutePrefix(): string {
    let fullRoutePrefix = ''
    if (this.globalOptions.routePrefix) {
      fullRoutePrefix += `/${this.globalOptions.routePrefix}`
    }
    if (this.routePrefix) {
      fullRoutePrefix += `/${this.routePrefix}`
    }
    return fixRouteMultiSlash(fullRoutePrefix)
  }
}
