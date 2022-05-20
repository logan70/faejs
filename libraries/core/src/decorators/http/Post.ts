import { RequestMethod } from '../../const/RequestMethod'
import { createRouteDecorator } from './createRouteDecorator'

/**
 * Route handler (method) Decorator. Routes HTTP POST requests to the specified path.
 */
export const Post = createRouteDecorator(RequestMethod.POST)
