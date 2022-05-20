import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP GET requests to the specified path.
 */
export const Get = createRouteDecorator(RequestMethod.GET)
