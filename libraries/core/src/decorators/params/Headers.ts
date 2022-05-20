import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts single property from the `headers` object or the whole `headers`
 *
 * Example: `info(@Headers('Cache-Control') cacheControl: string)`
 * Example: `info(@Headers() headers: Record<string, any>)`
 */
export function Headers(property?: string): ParameterDecorator {
  return createParamDecorator<[string?]>(ParamType.headers)(property)
}
