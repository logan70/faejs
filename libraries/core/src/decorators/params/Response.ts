import { ParamType } from '../../const/ParamType'
import { createParamDecorator } from './createParamDecorator'

/**
 * Route handler parameter decorator. Extracts the `Response`
 *
 * Example: `info(@Response() res)`
 */
export function Response(): ParameterDecorator {
  return createParamDecorator(ParamType.response)()
}
/**
 * Route handler parameter decorator. Extracts the `Response`
 *
 * Example: `info(@Res() res)`
 */
export const Res = Response
