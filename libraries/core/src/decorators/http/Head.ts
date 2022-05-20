import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP HEAD requests to the specified path.
 */
export const Head = createRouteDecorator(RequestMethod.HEAD)
