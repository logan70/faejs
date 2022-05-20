import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts single property from the `params` object or the whole object
 *
 * Example: `info(@Param('id') id: string)`
 * Example: `info(@Param() params: Record<string, string>)`
 */
export function Param(property?: string): ParameterDecorator {
  return createParamDecorator<[string?]>(ParamType.param)(property)
}
