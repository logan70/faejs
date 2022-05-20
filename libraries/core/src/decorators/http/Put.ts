import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP PUT requests to the specified path.
 */
export const Put = createRouteDecorator(RequestMethod.PUT)
