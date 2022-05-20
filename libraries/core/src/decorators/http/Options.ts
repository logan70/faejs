import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP OPTIONS requests to the specified path.
 */
export const Options = createRouteDecorator(RequestMethod.OPTIONS)
