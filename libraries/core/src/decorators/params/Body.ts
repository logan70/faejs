import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts single property from the `Body` object or the whole `Body`
 *
 * Example: `info(@Body('id') id)`
 * Example: `info(@Body() body)`
 */
export function Body(property?: string): ParameterDecorator {
  return createParamDecorator<[string?]>(ParamType.body)(property)
}
