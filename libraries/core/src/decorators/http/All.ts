import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP ALL requests to the specified path.
 */
export const All = createRouteDecorator(RequestMethod.ALL)
