import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts single cookie
 *
 * Example: `info(@Cookie('id') id: string)`
 */
export function Cookie(name: string): ParameterDecorator {
  return createParamDecorator<[string]>(ParamType.cookies)(name)
}
