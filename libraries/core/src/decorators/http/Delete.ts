import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP DELETE requests to the specified path.
 */
export const Delete = createRouteDecorator(RequestMethod.DELETE)
