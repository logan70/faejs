import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP PATCH requests to the specified path.
 */
export const Patch = createRouteDecorator(RequestMethod.PATCH)
