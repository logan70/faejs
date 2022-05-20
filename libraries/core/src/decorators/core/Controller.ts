import { ControllerOptions } from '../../interfaces/ControllerOptions'
import { getMetadataStorage } from '../../metadata/getMetadataStorage'

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller route.
 * Controller routes are executed when request come.
 *
 * @param routePrefix Extra path you can apply as a base route to all controller routes
 * @param options Extra options that apply to all controller routes
 */
export function Controller(
  routePrefix?: string,
  options?: ControllerOptions
): ClassDecorator {
  return target => {
    getMetadataStorage().collectControllerMetadata(target, {
      type: 'default',
      target,
      routePrefix,
      options,
    })
  }
}
