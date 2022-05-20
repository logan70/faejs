import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts single property from the `Query` object or the whole object
 *
 * Example: `info(@Query('id') id)`
 * Example: `info(@Query() query: Record<string, string>)`
 */
export function Query(property?: string): ParameterDecorator {
  return createParamDecorator<[string?]>(ParamType.query)(property)
}
